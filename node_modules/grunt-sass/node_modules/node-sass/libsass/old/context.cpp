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
#include "color_names.hpp"
#include "prelexer.hpp"

namespace Sass {
  using namespace Constants;
  using std::pair; using std::cerr; using std::endl;

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

    // for (int i = 0; i < include_paths.size(); ++i) {
    //   cerr << include_paths[i] << endl;
    // }
  }

  Context::Context(const char* paths_str, const char* img_path_str, int sc)
  : global_env(Environment()),
    function_env(map<string, Function>()),
    c_function_list(vector<Sass_C_Function_Data>()),
    extensions(multimap<Node, Node>()),
    pending_extensions(vector<pair<Node, Node> >()),
    source_refs(vector<const char*>()),
    include_paths(vector<string>()),
    color_names_to_values(map<string, Node>()),
    color_values_to_names(map<Node, string>()),
    new_Node(Node_Factory()),
    image_path(0),
    ref_count(0),
    has_extensions(false),
    source_comments(sc)
  {
    register_functions();
    collect_include_paths(paths_str);
    setup_color_map();

    string path_string(img_path_str ? img_path_str : "");
    path_string = "'" + path_string + "/'";
    image_path = new char[path_string.length() + 1];
    std::strcpy(image_path, path_string.c_str());

    // stash this hidden variable for the image-url built-in to use
    global_env[Token::make(image_path_var)] = new_Node(Node::string_constant, "[IMAGE PATH]", 0, Token::make(image_path));
  }

  Context::~Context()
  {
    for (size_t i = 0; i < source_refs.size(); ++i) {
      delete[] source_refs[i];
    }
    delete[] image_path;
    new_Node.free();
  }

  inline void Context::register_function(Signature sig, Primitive ip)
  {
    Function f(const_cast<char*>(sig), ip, *this);
    function_env[f.name] = f;
  }

  inline void Context::register_function(Signature sig, Primitive ip, size_t arity)
  {
    Function f(const_cast<char*>(sig), ip, *this);
    std::stringstream stub;
    stub << f.name << " " << arity;
    function_env[stub.str()] = f;
  }

  inline void Context::register_c_function(Signature sig, C_Function ip, void *cookie)
  {
    Function f(const_cast<char*>(sig), ip, cookie, *this);
    function_env[f.name] = f;
  }

  inline void Context::register_c_function(Signature sig, C_Function ip, void *cookie, size_t arity)
  {
    Function f(const_cast<char*>(sig), ip, cookie, *this);
    std::stringstream stub;
    stub << f.name << " " << arity;
    function_env[stub.str()] = f;
  }

  inline void Context::register_overload_stub(string name)
  {
    function_env[name] = Function(name, true);
  }

  void Context::register_functions()
  {
    using namespace Functions;

    // RGB Functions
    register_function(rgb_sig,  rgb);
    register_overload_stub("rgba");
    register_function(rgba_4_sig, rgba_4, 4);
    register_function(rgba_2_sig, rgba_2, 2);
    register_function(red_sig, red);
    register_function(green_sig, green);
    register_function(blue_sig, blue);
    register_function(mix_sig, mix);
    // HSL Functions
    register_function(hsl_sig, hsl);
    register_function(hsla_sig, hsla);
    register_function(hue_sig, hue);
    register_function(saturation_sig, saturation);
    register_function(lightness_sig, lightness);
    register_function(adjust_hue_sig, adjust_hue);
    register_function(lighten_sig, lighten);
    register_function(darken_sig, darken);
    register_function(saturate_sig, saturate);
    register_function(desaturate_sig, desaturate);
    register_function(grayscale_sig, grayscale);
    register_function(complement_sig, complement);
    register_function(invert_sig, invert);
    // Opacity Functions
    register_function(alpha_sig, alpha);
    register_function(opacity_sig, opacity);
    register_function(opacify_sig, opacify);
    register_function(fade_in_sig, fade_in);
    register_function(transparentize_sig, transparentize);
    register_function(fade_out_sig, fade_out);
    // Other Color Functions
    register_function(adjust_color_sig, adjust_color);
    register_function(scale_color_sig, scale_color);
    register_function(change_color_sig, change_color);
    register_function(ie_hex_str_sig, ie_hex_str);
    // String Functions
    register_function(unquote_sig, unquote);
    register_function(quote_sig, quote);
    // Number Functions
    register_function(percentage_sig, percentage);
    register_function(round_sig, round);
    register_function(ceil_sig, ceil);
    register_function(floor_sig, floor);
    register_function(abs_sig, abs);
    register_function(min_sig, min);
    register_function(max_sig, max);
    // List Functions
    register_function(length_sig, length);
    register_function(nth_sig, nth);
    register_function(index_sig, index);
    register_function(join_sig, join);
    register_function(append_sig, append);
    register_overload_stub("compact");
    register_function(compact_1_sig, compact_1, 1);
    register_function(compact_n_sig, compact_n, 0);
    register_function(compact_n_sig, compact_n, 2);
    register_function(compact_n_sig, compact_n, 3);
    register_function(compact_n_sig, compact_n, 4);
    register_function(compact_n_sig, compact_n, 5);
    register_function(compact_n_sig, compact_n, 6);
    register_function(compact_n_sig, compact_n, 7);
    register_function(compact_n_sig, compact_n, 8);
    register_function(compact_n_sig, compact_n, 9);
    register_function(compact_n_sig, compact_n, 10);
    register_function(compact_n_sig, compact_n, 11);
    register_function(compact_n_sig, compact_n, 12);
    // Introspection Functions
    register_function(type_of_sig, type_of);
    register_function(unit_sig, unit);
    register_function(unitless_sig, unitless);
    register_function(comparable_sig, comparable);
    // Boolean Functions
    register_function(not_sig, not_impl);
    register_function(if_sig, if_impl);
    // Path Functions
    register_function(image_url_sig, image_url);
  }

  void Context::register_c_functions()
  {
    for (size_t i = 0, S = c_function_list.size(); i < S; ++i) {
      Sass_C_Function_Data f_data = c_function_list[i];
      register_c_function(f_data.signature, f_data.function, f_data.cookie);
    }
  }

  void Context::setup_color_map()
  {
    size_t i = 0;
    while (color_names[i]) {
      string name(color_names[i]);
      Node value(new_Node("[COLOR TABLE]", 0,
                          color_values[i*3],
                          color_values[i*3+1],
                          color_values[i*3+2],
                          1));
      color_names_to_values[name] = value;
      color_values_to_names[value] = name;
      ++i;
    }
  }

}
