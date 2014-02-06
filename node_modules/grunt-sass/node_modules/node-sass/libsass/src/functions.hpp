#define SASS_FUNCTIONS

#ifndef SASS_ENVIRONMENT
#include "environment.hpp"
#endif

#ifndef SASS
#include "sass.h"
#endif

#include <string>

#define BUILT_IN(name) Expression*\
name(Env& env, Context& ctx, Signature sig, const string& path, size_t line, Backtrace* backtrace)

namespace Sass {
  class Context;
  class Backtrace;
  class AST_Node;
  class Expression;
  class Definition;
  typedef Environment<AST_Node*> Env;
  typedef const char* Signature;
  typedef Expression* (*Native_Function)(Env&, Context&, Signature, const string&, size_t, Backtrace*);

  Definition* make_native_function(Signature, Native_Function, Context&);
  Definition* make_c_function(Signature sig, Sass_C_Function f, Context& ctx);

  namespace Functions {

    extern Signature rgb_sig;
    extern Signature rgba_4_sig;
    extern Signature rgba_2_sig;
    extern Signature red_sig;
    extern Signature green_sig;
    extern Signature blue_sig;
    extern Signature mix_sig;
    extern Signature hsl_sig;
    extern Signature hsla_sig;
    extern Signature hue_sig;
    extern Signature saturation_sig;
    extern Signature lightness_sig;
    extern Signature adjust_hue_sig;
    extern Signature lighten_sig;
    extern Signature darken_sig;
    extern Signature saturate_sig;
    extern Signature desaturate_sig;
    extern Signature grayscale_sig;
    extern Signature complement_sig;
    extern Signature invert_sig;
    extern Signature alpha_sig;
    extern Signature opacity_sig;
    extern Signature opacify_sig;
    extern Signature fade_in_sig;
    extern Signature transparentize_sig;
    extern Signature fade_out_sig;
    extern Signature adjust_color_sig;
    extern Signature scale_color_sig;
    extern Signature change_color_sig;
    extern Signature ie_hex_str_sig;
    extern Signature unquote_sig;
    extern Signature quote_sig;
    extern Signature percentage_sig;
    extern Signature round_sig;
    extern Signature ceil_sig;
    extern Signature floor_sig;
    extern Signature abs_sig;
    extern Signature min_sig;
    extern Signature max_sig;
    extern Signature length_sig;
    extern Signature nth_sig;
    extern Signature index_sig;
    extern Signature join_sig;
    extern Signature append_sig;
    extern Signature zip_sig;
    extern Signature compact_sig;
    extern Signature type_of_sig;
    extern Signature unit_sig;
    extern Signature unitless_sig;
    extern Signature comparable_sig;
    extern Signature not_sig;
    extern Signature if_sig;
    extern Signature image_url_sig;

    BUILT_IN(rgb);
    BUILT_IN(rgba_4);
    BUILT_IN(rgba_2);
    BUILT_IN(red);
    BUILT_IN(green);
    BUILT_IN(blue);
    BUILT_IN(mix);
    BUILT_IN(hsl);
    BUILT_IN(hsla);
    BUILT_IN(hue);
    BUILT_IN(saturation);
    BUILT_IN(lightness);
    BUILT_IN(adjust_hue);
    BUILT_IN(lighten);
    BUILT_IN(darken);
    BUILT_IN(saturate);
    BUILT_IN(desaturate);
    BUILT_IN(grayscale);
    BUILT_IN(complement);
    BUILT_IN(invert);
    BUILT_IN(alpha);
    BUILT_IN(opacify);
    BUILT_IN(transparentize);
    BUILT_IN(adjust_color);
    BUILT_IN(scale_color);
    BUILT_IN(change_color);
    BUILT_IN(ie_hex_str);
    BUILT_IN(sass_unquote);
    BUILT_IN(sass_quote);
    BUILT_IN(percentage);
    BUILT_IN(round);
    BUILT_IN(ceil);
    BUILT_IN(floor);
    BUILT_IN(abs);
    BUILT_IN(min);
    BUILT_IN(max);
    BUILT_IN(length);
    BUILT_IN(nth);
    BUILT_IN(index);
    BUILT_IN(join);
    BUILT_IN(append);
    BUILT_IN(zip);
    BUILT_IN(compact);
    BUILT_IN(type_of);
    BUILT_IN(unit);
    BUILT_IN(unitless);
    BUILT_IN(comparable);
    BUILT_IN(sass_not);
    BUILT_IN(sass_if);
    BUILT_IN(image_url);

  }
}