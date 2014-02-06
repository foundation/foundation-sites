#ifdef _WIN32
#include <direct.h>
#define getcwd _getcwd
#define PATH_SEP ';'
#else
#include <unistd.h>
#define PATH_SEP ':'
#endif

#include <cstring>
#include <iostream>
#include <sstream>
#include "context.hpp"
#include "constants.hpp"
#include "parser.hpp"
#include "file.hpp"
#include "inspect.hpp"
#include "output_nested.hpp"
#include "output_compressed.hpp"
#include "expand.hpp"
#include "eval.hpp"
#include "contextualize.hpp"
#include "extend.hpp"
#include "copy_c_str.hpp"
#include "color_names.hpp"
#include "functions.hpp"
#include "backtrace.hpp"

#ifndef SASS_PRELEXER
#include "prelexer.hpp"
#endif

#include <iomanip>
#include <iostream>

namespace Sass {
  using namespace Constants;
  using std::cerr;
  using std::endl;

  Context::Context(Context::Data initializers)
  : mem(Memory_Manager<AST_Node*>()),
    source_c_str    (initializers.source_c_str()),
    sources         (vector<const char*>()),
    include_paths   (initializers.include_paths()),
    queue           (vector<pair<string, const char*> >()),
    style_sheets    (map<string, Block*>()),
    image_path      (initializers.image_path()),
    source_comments (initializers.source_comments()),
    source_maps     (initializers.source_maps()),
    output_style    (initializers.output_style()),
    names_to_colors (map<string, Color*>()),
    colors_to_names (map<int, string>())
  {
    collect_include_paths(initializers.include_paths_c_str());
    collect_include_paths(initializers.include_paths_array());

    setup_color_map();

    string entry_point = initializers.entry_point();
    if (!entry_point.empty()) {
      string result(add_file(entry_point));
      if (result.empty()) {
        throw entry_point;
      }
    }
  }

  Context::~Context()
  { for (size_t i = 0; i < sources.size(); ++i) delete[] sources[i]; }

  void Context::setup_color_map()
  {
    size_t i = 0;
    while (color_names[i]) {
      string name(color_names[i]);
      Color* value = new (mem) Color("[COLOR TABLE]", 0,
                                     color_values[i*3],
                                     color_values[i*3+1],
                                     color_values[i*3+2]);
      names_to_colors[name] = value;
      int numval = color_values[i*3]*0x10000;
      numval += color_values[i*3+1]*0x100;
      numval += color_values[i*3+2];
      colors_to_names[numval] = name;
      ++i;
    }
  }

  void Context::collect_include_paths(const char* paths_str)
  {
    const size_t wd_len = 1024;
    char wd[wd_len];
    include_paths.push_back(getcwd(wd, wd_len));
    if (*include_paths.back().rbegin() != '/') include_paths.back() += '/';

    if (paths_str) {
      const char* beg = paths_str;
      const char* end = Prelexer::find_first<PATH_SEP>(beg);

      while (end) {
        string path(beg, end - beg);
        if (!path.empty()) {
          if (*path.rbegin() != '/') path += '/';
          include_paths.push_back(path);
        }
        beg = end + 1;
        end = Prelexer::find_first<PATH_SEP>(beg);
      }

      string path(beg);
      if (!path.empty()) {
        if (*path.rbegin() != '/') path += '/';
        include_paths.push_back(path);
      }
    }
  }

  void Context::collect_include_paths(const char* paths_array[])
  {
    const size_t wd_len = 1024;
    char wd[wd_len];
    include_paths.push_back(getcwd(wd, wd_len));
    if (*include_paths.back().rbegin() != '/') include_paths.back() += '/';

    // if (paths_array) {
    //   for (size_t i = 0; paths_array[i]; ++i) {
    //     string path(paths_array[i]);
    //     if (!path.empty()) {
    //       if (*path.rbegin() != '/') path += '/';
    //       include_paths.push_back(path);
    //     }
    //   }
    // }
  }

  string Context::add_file(string path)
  {
    using namespace File;
    char* contents = 0;
    for (size_t i = 0, S = include_paths.size(); i < S; ++i) {
      string full_path(join_paths(include_paths[i], path));
      if (style_sheets.count(full_path)) return full_path;
      contents = resolve_and_load(full_path);
      if (contents) {
        sources.push_back(contents);
        queue.push_back(make_pair(full_path, contents));
        style_sheets[full_path] = 0;
        return full_path;
      }
    }
    return string();
  }

  void register_function(Context&, Signature sig, Native_Function f, Env* env);
  void register_function(Context&, Signature sig, Native_Function f, size_t arity, Env* env);
  void register_overload_stub(Context&, string name, Env* env);
  void register_built_in_functions(Context&, Env* env);
  void register_c_functions(Context&, Env* env, Sass_C_Function_Descriptor*);
  void register_c_function(Context&, Env* env, Sass_C_Function_Descriptor);

  char* Context::compile_file()
  {
    Block* root = 0;
    for (size_t i = 0; i < queue.size(); ++i) {
      Parser p(Parser::from_c_str(queue[i].second, *this, queue[i].first));
      Block* ast = p.parse();
      if (i == 0) root = ast;
      style_sheets[queue[i].first] = ast;
    }

    Env tge;
    Backtrace backtrace(0, "", 0, "");
    register_built_in_functions(*this, &tge);
    Eval eval(*this, &tge, &backtrace);
    Contextualize contextualize(*this, &eval, &tge, &backtrace);
    Expand expand(*this, &eval, &contextualize, &tge, &backtrace);
    Inspect inspect;
    Output_Nested output_nested;

    root = root->perform(&expand)->block();
    if (expand.extensions.size()) {
      Extend extend(*this, expand.extensions);
      root->perform(&extend);
    }
    char* result = 0;
    switch (output_style) {
      case COMPRESSED: {
        Output_Compressed output_compressed;
        root->perform(&output_compressed);
        result = copy_c_str(output_compressed.get_buffer().c_str());
      } break;

      default: {
        Output_Nested output_nested;
        root->perform(&output_nested);
        result = copy_c_str(output_nested.get_buffer().c_str());
      } break;
    }

    return result;
  }

  char* Context::compile_string()
  {
    if (!source_c_str) return 0;
    queue.clear();
    queue.push_back(make_pair("source string", source_c_str));
    return compile_file();
  }

  void register_function(Context& ctx, Signature sig, Native_Function f, Env* env)
  {
    Definition* def = make_native_function(sig, f, ctx);
    def->environment(env);
    (*env)[def->name() + "[f]"] = def;
  }

  void register_function(Context& ctx, Signature sig, Native_Function f, size_t arity, Env* env)
  {
    Definition* def = make_native_function(sig, f, ctx);
    stringstream ss;
    ss << def->name() << "[f]" << arity;
    def->environment(env);
    (*env)[ss.str()] = def;
  }

  void register_overload_stub(Context& ctx, string name, Env* env)
  {
    Definition* stub = new (ctx.mem) Definition("[built-in function]",
                                            0,
                                            0,
                                            name,
                                            0,
                                            0,
                                            true);
    (*env)[name + "[f]"] = stub;
  }


  void register_built_in_functions(Context& ctx, Env* env)
  {
    using namespace Functions;
    // RGB Functions
    register_function(ctx, rgb_sig,  rgb, env);
    register_overload_stub(ctx, "rgba", env);
    register_function(ctx, rgba_4_sig, rgba_4, 4, env);
    register_function(ctx, rgba_2_sig, rgba_2, 2, env);
    register_function(ctx, red_sig, red, env);
    register_function(ctx, green_sig, green, env);
    register_function(ctx, blue_sig, blue, env);
    register_function(ctx, mix_sig, mix, env);
    // HSL Functions
    register_function(ctx, hsl_sig, hsl, env);
    register_function(ctx, hsla_sig, hsla, env);
    register_function(ctx, hue_sig, hue, env);
    register_function(ctx, saturation_sig, saturation, env);
    register_function(ctx, lightness_sig, lightness, env);
    register_function(ctx, adjust_hue_sig, adjust_hue, env);
    register_function(ctx, lighten_sig, lighten, env);
    register_function(ctx, darken_sig, darken, env);
    register_function(ctx, saturate_sig, saturate, env);
    register_function(ctx, desaturate_sig, desaturate, env);
    register_function(ctx, grayscale_sig, grayscale, env);
    register_function(ctx, complement_sig, complement, env);
    register_function(ctx, invert_sig, invert, env);
    // Opacity Functions
    register_function(ctx, alpha_sig, alpha, env);
    register_function(ctx, opacity_sig, alpha, env);
    register_function(ctx, opacify_sig, opacify, env);
    register_function(ctx, fade_in_sig, opacify, env);
    register_function(ctx, transparentize_sig, transparentize, env);
    register_function(ctx, fade_out_sig, transparentize, env);
    // Other Color Functions
    register_function(ctx, adjust_color_sig, adjust_color, env);
    register_function(ctx, scale_color_sig, scale_color, env);
    register_function(ctx, change_color_sig, change_color, env);
    register_function(ctx, ie_hex_str_sig, ie_hex_str, env);
    // String Functions
    register_function(ctx, unquote_sig, sass_unquote, env);
    register_function(ctx, quote_sig, sass_quote, env);
    // Number Functions
    register_function(ctx, percentage_sig, percentage, env);
    register_function(ctx, round_sig, round, env);
    register_function(ctx, ceil_sig, ceil, env);
    register_function(ctx, floor_sig, floor, env);
    register_function(ctx, abs_sig, abs, env);
    register_function(ctx, min_sig, min, env);
    register_function(ctx, max_sig, max, env);
    // List Functions
    register_function(ctx, length_sig, length, env);
    register_function(ctx, nth_sig, nth, env);
    register_function(ctx, index_sig, index, env);
    register_function(ctx, join_sig, join, env);
    register_function(ctx, append_sig, append, env);
    register_function(ctx, compact_sig, compact, env);
    register_function(ctx, zip_sig, zip, env);
    // Introspection Functions
    register_function(ctx, type_of_sig, type_of, env);
    register_function(ctx, unit_sig, unit, env);
    register_function(ctx, unitless_sig, unitless, env);
    register_function(ctx, comparable_sig, comparable, env);
    // Boolean Functions
    register_function(ctx, not_sig, sass_not, env);
    register_function(ctx, if_sig, sass_if, env);
    // Path Functions
    register_function(ctx, image_url_sig, image_url, env);
  }

  void register_c_functions(Context& ctx, Env* env, Sass_C_Function_Descriptor* descrs)
  {
    while (descrs->signature && descrs->function) {
      register_c_function(ctx, env, *descrs);
      ++descrs;
    }
  }
  void register_c_function(Context& ctx, Env* env, Sass_C_Function_Descriptor descr)
  {
    Definition* def = make_c_function(descr.signature, descr.function, ctx);
    def->environment(env);
    (*env)[def->name() + "[f]"] = def;
  }


}