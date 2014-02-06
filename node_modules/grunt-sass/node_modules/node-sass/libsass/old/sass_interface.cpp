#ifdef _WIN32
#include <io.h>
#else
#include <unistd.h>
#endif

#include <iostream>
#include <sstream>
#include <string>
#include <cstdlib>
#include <iostream>
#include "document.hpp"
#include "eval_apply.hpp"
#include "error.hpp"
#include "sass_interface.h"

extern "C" {
  using namespace std;

  sass_context* sass_new_context()
  { return (sass_context*) calloc(1, sizeof(sass_context)); }

  void sass_free_context(sass_context* ctx)
  {
    if (ctx->output_string) free(ctx->output_string);
    if (ctx->error_message) free(ctx->error_message);

    free(ctx);
  }

  sass_file_context* sass_new_file_context()
  { return (sass_file_context*) calloc(1, sizeof(sass_file_context)); }

  void sass_free_file_context(sass_file_context* ctx)
  {
    if (ctx->output_string) free(ctx->output_string);
    if (ctx->error_message) free(ctx->error_message);

    free(ctx);
  }

  sass_folder_context* sass_new_folder_context()
    { return (sass_folder_context*) calloc(1, sizeof(sass_folder_context)); }

  void sass_free_folder_context(sass_folder_context* ctx)
    { free(ctx); }

  static char* process_document(Sass::Document& doc, int style)
  {
    using namespace Sass;
    Backtrace root_trace(0, "", 0, "");
    doc.parse_scss();
    expand(doc.root,
           Node(),
           doc.context.global_env,
           doc.context.function_env,
           doc.context.new_Node,
           doc.context,
           root_trace);
    // extend_selectors(doc.context.pending_extensions, doc.context.extensions, doc.context.new_Node);
    if (doc.context.has_extensions) extend(doc.root, doc.context.extensions, doc.context.new_Node);
    string output(doc.emit_css(static_cast<Document::CSS_Style>(style)));
    return strdup(output.c_str());
  }

  int sass_compile(sass_context* c_ctx)
  {
    using namespace Sass;
    try {
      Context cpp_ctx(c_ctx->options.include_paths, c_ctx->options.image_path, c_ctx->options.source_comments);
      if (c_ctx->c_functions) {
        struct Sass_C_Function_Data* this_func_data = c_ctx->c_functions;
        while (this_func_data->signature && this_func_data->function) {
          cpp_ctx.c_function_list.push_back(*this_func_data);
          ++this_func_data;
        }
      }
      cpp_ctx.register_c_functions();
      Document doc(Document::make_from_source_chars(cpp_ctx, c_ctx->source_string));
      c_ctx->output_string = process_document(doc, c_ctx->options.output_style);
      c_ctx->error_message = 0;
      c_ctx->error_status = 0;
    }
    catch (Error& e) {
      stringstream msg_stream;
      msg_stream << e.path << ":" << e.line << ": error: " << e.message << endl;
      c_ctx->error_message = strdup(msg_stream.str().c_str());
      c_ctx->error_status = 1;
      c_ctx->output_string = 0;
    }
    catch(bad_alloc& ba) {
      stringstream msg_stream;
      msg_stream << "Unable to allocate memory: " << ba.what() << endl;
      c_ctx->error_message = strdup(msg_stream.str().c_str());
      c_ctx->error_status = 1;
      c_ctx->output_string = 0;
    }
    // TO DO: CATCH EVERYTHING ELSE
    return 0;
  }

  int sass_compile_file(sass_file_context* c_ctx)
  {
    using namespace Sass;
    Context cpp_ctx(c_ctx->options.include_paths, c_ctx->options.image_path, c_ctx->options.source_comments);
    if (c_ctx->c_functions) {
      struct Sass_C_Function_Data* this_func_data = c_ctx->c_functions;
      while (this_func_data->signature && this_func_data->function) {
        cpp_ctx.c_function_list.push_back(*this_func_data);
        ++this_func_data;
      }
    }
    cpp_ctx.register_c_functions();
    try {
      Document doc(Document::make_from_file(cpp_ctx, string(c_ctx->input_path)));
      c_ctx->output_string = process_document(doc, c_ctx->options.output_style);
      c_ctx->error_message = 0;
      c_ctx->error_status = 0;
    }
    catch (Error& e) {
      stringstream msg_stream;
      msg_stream << e.path << ":" << e.line << ": error: " << e.message << endl;
      c_ctx->error_message = strdup(msg_stream.str().c_str());
      c_ctx->error_status = 1;
      c_ctx->output_string = 0;
    }
    catch(bad_alloc& ba) {
      stringstream msg_stream;
      msg_stream << "Unable to allocate memory: " << ba.what() << endl;
      c_ctx->error_message = strdup(msg_stream.str().c_str());
      c_ctx->error_status = 1;
      c_ctx->output_string = 0;
    }
    catch(string& bad_path) {
      for (vector<string>::iterator path = cpp_ctx.include_paths.begin(); path < cpp_ctx.include_paths.end(); ++path) {
        try {
          Document doc(Document::make_from_file(cpp_ctx, *path + string(c_ctx->input_path)));
          c_ctx->output_string = process_document(doc, c_ctx->options.output_style);
          c_ctx->error_message = 0;
          c_ctx->error_status = 0;
          return 0;
        }
        catch (string& bad_path) {
          // continue looping
        }
      }
      // couldn't find the specified file in the include paths; report an error
      stringstream msg_stream;
      msg_stream << "error reading file \"" << bad_path << "\"" << endl;
      c_ctx->error_message = strdup(msg_stream.str().c_str());
      c_ctx->error_status = 1;
      c_ctx->output_string = 0;
    }
    // TO DO: CATCH EVERYTHING ELSE
    return 0;
  }

  int sass_compile_folder(sass_folder_context* c_ctx)
  {
    return 1;
  }

}
