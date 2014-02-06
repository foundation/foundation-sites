#define SASS_FUNCTIONS

#include <cstring>
#include <map>

#ifndef SASS_NODE
#include "node.hpp"
#endif

#ifndef SASS_BACKTRACE
#include "backtrace.hpp"
#endif

namespace Sass {
  struct Environment;
  struct Context;
  struct Node_Factory;

  using std::map;

  typedef Node (*Primitive)(const Node, Environment&, Node_Factory&, Backtrace& bt, string&, size_t);
  typedef Sass_Value (*C_Function)(Sass_Value, void*);
  typedef const char Signature[];

  struct Function {

    string name;
    Node parameters;
    Node parameter_names;
    Node definition;
    Primitive primitive;
    C_Function c_func;
    void *cookie;
    bool overloaded;

    Function()
    { /* TO DO: set up the generic callback here */ }

    // for user-defined functions
    Function(Node def)
    : name(def[0].to_string()),
      parameters(def[1]),
      definition(def),
      primitive(0),
      c_func(0),
      cookie(0),
      overloaded(false)
    { }

    // Stub for overloaded primitives
    Function(string name, bool overloaded = true)
    : name(name),
      parameters(Node()),
      definition(Node()),
      primitive(0),
      c_func(0),
      cookie(0),
      overloaded(overloaded)
    { }

    Function(char* signature, Primitive ip, Context& ctx);
    Function(char* signature, C_Function ip, void *cookie, Context& ctx);

    // Node operator()(Environment& bindings, Node_Factory& new_Node, Backtrace& bt, string& path, size_t line) const
    // {
    //   if (primitive) {
    //     return primitive(parameters, bindings, new_Node, bt, path, line);
    //   }
    //   else {
    //     return Node();
    //   }
    // }

  };

  namespace Functions {

    // RGB Functions ///////////////////////////////////////////////////////

    extern Signature rgb_sig;
    Node rgb(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature rgba_4_sig;
    Node rgba_4(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature rgba_2_sig;
    Node rgba_2(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature red_sig;
    Node red(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature green_sig;
    Node green(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature blue_sig;
    Node blue(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature mix_sig;
    Node mix(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // HSL Functions ///////////////////////////////////////////////////////

    extern Signature hsl_sig;
    Node hsl(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature hsla_sig;
    Node hsla(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature hue_sig;
    Node hue(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature saturation_sig;
    Node saturation(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature lightness_sig;
    Node lightness(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature adjust_hue_sig;
    Node adjust_hue(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature lighten_sig;
    Node lighten(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature darken_sig;
    Node darken(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature saturate_sig;
    Node saturate(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature desaturate_sig;
    Node desaturate(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature grayscale_sig;
    Node grayscale(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature complement_sig;
    Node complement(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature invert_sig;
    Node invert(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // Opacity Functions ///////////////////////////////////////////////////

    extern Signature alpha_sig;
    Node alpha(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature opacity_sig;
    Node opacity(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature opacify_sig;
    Node opacify(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature fade_in_sig;
    Node fade_in(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature transparentize_sig;
    Node transparentize(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature fade_out_sig;
    Node fade_out(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // Other Color Functions ///////////////////////////////////////////////

    extern Signature adjust_color_sig;
    Node adjust_color(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature scale_color_sig;
    Node scale_color(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature change_color_sig;
    Node change_color(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature ie_hex_str_sig;
    Node ie_hex_str(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // String Functions ////////////////////////////////////////////////////

    extern Signature unquote_sig;
    Node unquote(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature quote_sig;
    Node quote(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // Number Functions ////////////////////////////////////////////////////

    extern Signature percentage_sig;
    Node percentage(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature round_sig;
    Node round(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature ceil_sig;
    Node ceil(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature floor_sig;
    Node floor(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature abs_sig;
    Node abs(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature min_sig;
    Node min(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature max_sig;
    Node max(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // List Functions //////////////////////////////////////////////////////

    extern Signature length_sig;
    Node length(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature nth_sig;
    Node nth(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature index_sig;
    Node index(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature join_sig;
    Node join(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature append_sig;
    Node append(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature compact_1_sig;
    Node compact_1(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature compact_n_sig;
    Node compact_n(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // Introspection Functions /////////////////////////////////////////////

    extern Signature type_of_sig;
    Node type_of(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature unit_sig;
    Node unit(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature unitless_sig;
    Node unitless(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature comparable_sig;
    Node comparable(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // Boolean Functions ///////////////////////////////////////////////////

    extern Signature not_sig;
    Node not_impl(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    extern Signature if_sig;
    Node if_impl(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);

    // Path Functions //////////////////////////////////////////////////////

    extern Signature image_url_sig;
    Node image_url(const Node, Environment&, Node_Factory&, Backtrace&, string& path, size_t line);
  }
}
