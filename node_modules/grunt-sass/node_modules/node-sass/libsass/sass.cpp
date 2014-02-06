#include <cstdlib>
#include <cstring>
#include <vector>
#include <sstream>

#ifndef SASS
#include "sass.h"
#endif

#include "context.hpp"
#include "error_handling.hpp"

extern "C" {
  using namespace std;

  struct Sass_Context* make_sass_context()
  { return (Sass_Context*) calloc(1, sizeof(Sass_Context)); }

  void free_sass_context(struct Sass_Context* ctx)
  {
    if (ctx->output_string) free(ctx->output_string);
    if (ctx->error_message) free(ctx->error_message);
    free(ctx);
  }

  namespace Sass {
    enum Sass_Source { FILE_SOURCE, STRING_SOURCE };

    static void compile_sass(struct Sass_Context* c_ctx,
                             Sass::Sass_Source src_option)
    {
      using namespace Sass;
      try {
        Context cpp_ctx(
          Context::Data().source_c_str        (c_ctx->input_string)

                         .entry_point         (c_ctx->input_path ?
                                               c_ctx->input_path :
                                               "")

                         .output_style        ((Output_Style)
                                               c_ctx->output_style)

                         .source_comments     (c_ctx->source_comments)
                         .source_maps         (c_ctx->source_maps)

                         .image_path          (c_ctx->image_path ?
                                               c_ctx->image_path :
                                               "")

                         .include_paths_c_str (c_ctx->include_paths_string)
                         .include_paths_array (/*c_ctx->include_paths_array*/0)
                         .include_paths       (vector<string>())
        );
        if (src_option == FILE_SOURCE) cpp_ctx.compile_file();
        else                           cpp_ctx.compile_string();
        c_ctx->error_message = 0;
        c_ctx->error_status = 0;
      }
      catch (Error& e) {
        stringstream msg_stream;
        msg_stream << e.path << ":" << e.line << ": error: " << e.message << endl;
        string msg(msg_stream.str());
        char* msg_str = (char*) malloc(msg.size() + 1);
        strcpy(msg_str, msg.c_str());
        c_ctx->error_status = 1;
        c_ctx->output_string = 0;
        c_ctx->error_message = msg_str;
      }
      catch (bad_alloc& ba) {
        stringstream msg_stream;
        msg_stream << "Unable to allocate memory: " << ba.what() << endl;
        string msg(msg_stream.str());
        char* msg_str = (char*) malloc(msg.size() + 1);
        strcpy(msg_str, msg.c_str());
        c_ctx->error_status = 1;
        c_ctx->output_string = 0;
        c_ctx->error_message = msg_str;
      }
    }
  }

  void compile_sass_file(struct Sass_Context* c_ctx)
  { Sass::compile_sass(c_ctx, Sass::FILE_SOURCE); }

  void compile_sass_string(struct Sass_Context* c_ctx)
  { Sass::compile_sass(c_ctx, Sass::STRING_SOURCE); }


  union Sass_Value make_sass_boolean(int val)
  {
    union Sass_Value v;
    v.boolean.tag = SASS_BOOLEAN;
    v.boolean.value = val;
    return v;
  }

  union Sass_Value make_sass_number(double val, const char* unit)
  {
    union Sass_Value v;
    v.number.tag = SASS_NUMBER;
    v.number.value = val;
    v.number.unit = strdup(unit);
    return v;
  }

  union Sass_Value make_sass_color(double r, double g, double b, double a)
  {
    union Sass_Value v;
    v.color.tag = SASS_COLOR;
    v.color.r = r;
    v.color.g = g;
    v.color.b = b;
    v.color.a = a;
    return v;
  }

  union Sass_Value make_sass_string(const char* val)
  {
    union Sass_Value v;
    v.string.tag = SASS_STRING;
    v.string.value = strdup(val);
    return v;
  }

  union Sass_Value make_sass_list(size_t len, enum Sass_Separator sep)
  {
    union Sass_Value v;
    v.list.tag = SASS_LIST;
    v.list.length = len;
    v.list.separator = sep;
    v.list.values = (union Sass_Value*) malloc(sizeof(union Sass_Value)*len);
    return v;
  }

  union Sass_Value make_sass_null()
  {
    union Sass_Value v;
    v.null.tag = SASS_NULL;
    return v;
  }

  union Sass_Value make_sass_error(const char* msg)
  {
    union Sass_Value v;
    v.error.tag = SASS_ERROR;
    v.error.message = strdup(msg);
    return v;
  }

}