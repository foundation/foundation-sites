#define SASS_CONTEXT

#include <string>
#include <vector>
#include <map>
#include "kwd_arg_macros.hpp"

#ifndef SASS_MEMORY_MANAGER
#include "memory_manager.hpp"
#endif

#ifndef SASS_ENVIRONMENT
#include "environment.hpp"
#endif

namespace Sass {
  using namespace std;
  class AST_Node;
  class Block;
  class Expression;
  class Color;
  class Backtrace;
  // typedef const char* Signature;
  // struct Context;
  // typedef Environment<AST_Node*> Env;
  // typedef Expression* (*Native_Function)(Env&, Context&, Signature, string, size_t);

  enum Output_Style { NESTED, EXPANDED, COMPACT, COMPRESSED, FORMATTED };

  struct Context {
    Memory_Manager<AST_Node*> mem;

    const char* source_c_str;
    vector<const char*> sources; // c-strs containing Sass file contents
    vector<string> include_paths;
    vector<pair<string, const char*> > queue; // queue of files to be parsed
    map<string, Block*> style_sheets; // map of paths to ASTs

    string       image_path; // for the image-url Sass function
    bool         source_comments;
    bool         source_maps;
    Output_Style output_style;

    map<string, Color*> names_to_colors;
    map<int, string>    colors_to_names;

    KWD_ARG_SET(Data) {
      KWD_ARG(Data, const char*,     source_c_str);
      KWD_ARG(Data, string,          entry_point);
      KWD_ARG(Data, string,          image_path);
      KWD_ARG(Data, const char*,     include_paths_c_str);
      KWD_ARG(Data, const char**,    include_paths_array);
      KWD_ARG(Data, vector<string>,  include_paths);
      KWD_ARG(Data, bool,            source_comments);
      KWD_ARG(Data, bool,            source_maps);
      KWD_ARG(Data, Output_Style,    output_style);
    };

    Context(Data);
    ~Context();
    void collect_include_paths(const char* paths_str);
    void collect_include_paths(const char* paths_array[]);
    void setup_color_map();
    string add_file(string);
    string add_file(string, string);
    char* compile_string();
    char* compile_file();

    // void register_built_in_functions(Env* env);
    // void register_function(Signature sig, Native_Function f, Env* env);
    // void register_function(Signature sig, Native_Function f, size_t arity, Env* env);
    // void register_overload_stub(string name, Env* env);

  };

}