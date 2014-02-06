#ifdef _WIN32
#include <io.h>
#else
#include <unistd.h>
#endif

#include "sass_interface.h"
#include "context.hpp"
#include "error_handling.hpp"

#include <iostream>
#include <sstream>
#include <string>
#include <cstdlib>
#include <cstring>
#include <iostream>

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

  int sass_compile(sass_context* c_ctx)
  {
    using namespace Sass;
    try {
      Context cpp_ctx(
        Context::Data().source_c_str(c_ctx->source_string)
                       .entry_point("")
                       .output_style((Output_Style) c_ctx->options.output_style)
                       .source_comments(c_ctx->options.source_comments)
                       .source_maps(c_ctx->options.source_comments) // fix this
                       .image_path(c_ctx->options.image_path)
                       .include_paths_c_str(c_ctx->options.include_paths)
                       .include_paths_array(0)
                       .include_paths(vector<string>())
      );
      c_ctx->output_string = cpp_ctx.compile_string();
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
    try {
      Context cpp_ctx(
        Context::Data().entry_point(c_ctx->input_path)
                       .output_style((Output_Style) c_ctx->options.output_style)
                       .source_comments(c_ctx->options.source_comments)
                       .source_maps(c_ctx->options.source_comments) // fix this
                       .image_path(c_ctx->options.image_path)
                       .include_paths_c_str(c_ctx->options.include_paths)
                       .include_paths_array(0)
                       .include_paths(vector<string>())
      );
      c_ctx->output_string = cpp_ctx.compile_file();
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
