#include "functions.hpp"
#include "ast.hpp"
#include "context.hpp"
#include "backtrace.hpp"
#include "parser.hpp"
#include "constants.hpp"
#include "to_string.hpp"
#include "inspect.hpp"
#include "eval.hpp"

#include <cmath>
#include <cctype>
#include <sstream>
#include <iomanip>
#include <iostream>

#define ARG(argname, argtype) get_arg<argtype>(argname, env, sig, path, line, backtrace)
#define ARGR(argname, argtype, lo, hi) get_arg_r(argname, env, sig, path, line, lo, hi, backtrace)

namespace Sass {
  using std::stringstream;
  using std::endl;

  Definition* make_native_function(Signature sig, Native_Function f, Context& ctx)
  {
    Parser sig_parser = Parser::from_c_str(sig, ctx, "[built-in function]", 0);
    sig_parser.lex<Prelexer::identifier>();
    string name(sig_parser.lexed);
    Parameters* params = sig_parser.parse_parameters();
    return new (ctx.mem) Definition("[built-in function]",
                                    0,
                                    sig,
                                    name,
                                    params,
                                    f,
                                    false);
  }

  Definition* make_c_function(Signature sig, Sass_C_Function f, Context& ctx)
  {
    Parser sig_parser = Parser::from_c_str(sig, ctx, "[c function]", 0);
    sig_parser.lex<Prelexer::identifier>();
    string name(sig_parser.lexed);
    Parameters* params = sig_parser.parse_parameters();
    return new (ctx.mem) Definition("[c function]",
                                    0,
                                    sig,
                                    name,
                                    params,
                                    f,
                                    false, true);
  }

  namespace Functions {

    template <typename T>
    T* get_arg(const string& argname, Env& env, Signature sig, const string& path, size_t line, Backtrace* backtrace)
    {
      // Minimal error handling -- the expectation is that built-ins will be written correctly!
      T* val = dynamic_cast<T*>(env[argname]);
      if (!val) {
        string msg("argument `");
        msg += argname;
        msg += "` of `";
        msg += sig;
        msg += "` must be a ";
        msg += T::type_name();
        error(msg, path, line, backtrace);
      }
      return val;
    }

    Number* get_arg_r(const string& argname, Env& env, Signature sig, const string& path, size_t line, double lo, double hi, Backtrace* backtrace)
    {
      // Minimal error handling -- the expectation is that built-ins will be written correctly!
      Number* val = get_arg<Number>(argname, env, sig, path, line, backtrace);
      double v = val->value();
      if (!(lo <= v && v <= hi)) {
        stringstream msg;
        msg << "argument `" << argname << "` of `" << sig << "` must be between ";
        msg << lo << " and " << hi;
        error(msg.str(), path, line, backtrace);
      }
      return val;
    }

    ////////////////
    // RGB FUNCTIONS
    ////////////////

    Signature rgb_sig = "rgb($red, $green, $blue)";
    BUILT_IN(rgb)
    {
      return new (ctx.mem) Color(path,
                                 line,
                                 ARGR("$red",   Number, 0, 255)->value(),
                                 ARGR("$green", Number, 0, 255)->value(),
                                 ARGR("$blue",  Number, 0, 255)->value());
    }

    Signature rgba_4_sig = "rgba($red, $green, $blue, $alpha)";
    BUILT_IN(rgba_4)
    {
      return new (ctx.mem) Color(path,
                                 line,
                                 ARGR("$red",   Number, 0, 255)->value(),
                                 ARGR("$green", Number, 0, 255)->value(),
                                 ARGR("$blue",  Number, 0, 255)->value(),
                                 ARGR("$alpha", Number, 0, 1)->value());
    }

    Signature rgba_2_sig = "rgba($color, $alpha)";
    BUILT_IN(rgba_2)
    {
      Color* c_arg = ARG("$color", Color);
      Color* new_c = new (ctx.mem) Color(*c_arg);
      new_c->a(ARGR("$alpha", Number, 0, 1)->value());
      return new_c;
    }

    Signature red_sig = "red($color)";
    BUILT_IN(red)
    { return new (ctx.mem) Number(path, line, ARG("$color", Color)->r()); }

    Signature green_sig = "green($color)";
    BUILT_IN(green)
    { return new (ctx.mem) Number(path, line, ARG("$color", Color)->g()); }

    Signature blue_sig = "blue($color)";
    BUILT_IN(blue)
    { return new (ctx.mem) Number(path, line, ARG("$color", Color)->b()); }

    Signature mix_sig = "mix($color-1, $color-2, $weight: 50%)";
    BUILT_IN(mix)
    {
      Color*  color1 = ARG("$color-1", Color);
      Color*  color2 = ARG("$color-2", Color);
      Number* weight = ARGR("$weight", Number, 0, 100);

      double p = weight->value()/100;
      double w = 2*p - 1;
      double a = color1->a() - color2->a();

      double w1 = (((w * a == -1) ? w : (w + a)/(1 + w*a)) + 1)/2.0;
      double w2 = 1 - w1;

      return new (ctx.mem) Color(path,
                                 line,
                                 std::floor(w1*color1->r() + w2*color2->r()),
                                 std::floor(w1*color1->g() + w2*color2->g()),
                                 std::floor(w1*color1->b() + w2*color2->b()),
                                 color1->a()*p + color2->a()*(1-p));
    }

    ////////////////
    // HSL FUNCTIONS
    ////////////////

    // RGB to HSL helper function
    struct HSL { double h; double s; double l; };
    HSL rgb_to_hsl(double r, double g, double b)
    {
      r /= 255.0; g /= 255.0; b /= 255.0;

      double max = std::max(r, std::max(g, b));
      double min = std::min(r, std::min(g, b));
      double del = max - min;

      double h = 0, s = 0, l = (max + min)/2;

      if (max == min) {
        h = s = 0; // achromatic
      }
      else {
        if (l < 0.5) s = del / (max + min);
        else         s = del / (2.0 - max - min);

        double dr = (((max - r)/6.0) + (del/2.0))/del;
        double dg = (((max - g)/6.0) + (del/2.0))/del;
        double db = (((max - b)/6.0) + (del/2.0))/del;

        if      (r == max) h = db - dg;
        else if (g == max) h = (1.0/3.0) + dr - db;
        else if (b == max) h = (2.0/3.0) + dg - dr;

        if      (h < 0) h += 1;
        else if (h > 1) h -= 1;
      }
      HSL hsl_struct;
      hsl_struct.h = static_cast<int>(h*360)%360;
      hsl_struct.s = s*100;
      hsl_struct.l = l*100;
      return hsl_struct;
    }

    // hue to RGB helper function
    double h_to_rgb(double m1, double m2, double h) {
      if (h < 0) h += 1;
      if (h > 1) h -= 1;
      if (h*6.0 < 1) return m1 + (m2 - m1)*h*6;
      if (h*2.0 < 1) return m2;
      if (h*3.0 < 2) return m1 + (m2 - m1) * (2.0/3.0 - h)*6;
      return m1;
    }

    Color* hsla_impl(double h, double s, double l, double a, Context& ctx, const string& path, size_t line)
    {
      h = static_cast<double>(((static_cast<int>(h) % 360) + 360) % 360) / 360.0;
      s = (s < 0)   ? 0 :
          (s > 100) ? 100 :
          s;
      l = (l < 0)   ? 0 :
          (l > 100) ? 100 :
          l;
      s /= 100.0;
      l /= 100.0;

      double m2;
      if (l <= 0.5) m2 = l*(s+1.0);
      else m2 = l+s-l*s;
      double m1 = l*2-m2;
      // round the results -- consider moving this into the Color constructor
      double r = std::floor(h_to_rgb(m1, m2, h+1.0/3.0) * 255.0 + 0.5);
      double g = std::floor(h_to_rgb(m1, m2, h) * 255.0 + 0.5);
      double b = std::floor(h_to_rgb(m1, m2, h-1.0/3.0) * 255.0 + 0.5);

      return new (ctx.mem) Color(path, line, r, g, b, a);
    }

    Signature hsl_sig = "hsl($hue, $saturation, $lightness)";
    BUILT_IN(hsl)
    {
      return hsla_impl(ARG("$hue", Number)->value(),
                       ARGR("$saturation", Number, 0, 100)->value(),
                       ARGR("$lightness", Number, 0, 100)->value(),
                       1.0,
                       ctx,
                       path,
                       line);
    }

    Signature hsla_sig = "hsla($hue, $saturation, $lightness, $alpha)";
    BUILT_IN(hsla)
    {
      return hsla_impl(ARG("$hue", Number)->value(),
                       ARGR("$saturation", Number, 0, 100)->value(),
                       ARGR("$lightness", Number, 0, 100)->value(),
                       ARGR("$alpha", Number, 0, 1)->value(),
                       ctx,
                       path,
                       line);
    }

    Signature hue_sig = "hue($color)";
    BUILT_IN(hue)
    {
      Color* rgb_color = ARG("$color", Color);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return new (ctx.mem) Number(path, line, hsl_color.h, "deg");
    }

    Signature saturation_sig = "saturation($color)";
    BUILT_IN(saturation)
    {
      Color* rgb_color = ARG("$color", Color);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return new (ctx.mem) Number(path, line, hsl_color.s, "%");
    }

    Signature lightness_sig = "lightness($color)";
    BUILT_IN(lightness)
    {
      Color* rgb_color = ARG("$color", Color);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return new (ctx.mem) Number(path, line, hsl_color.l, "%");
    }

    Signature adjust_hue_sig = "adjust-hue($color, $degrees)";
    BUILT_IN(adjust_hue)
    {
      Color* rgb_color = ARG("$color", Color);
      Number* degrees = ARG("$degrees", Number);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h + degrees->value(),
                       hsl_color.s,
                       hsl_color.l,
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature lighten_sig = "lighten($color, $amount)";
    BUILT_IN(lighten)
    {
      Color* rgb_color = ARG("$color", Color);
      Number* amount = ARGR("$amount", Number, 0, 100);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h,
                       hsl_color.s,
                       hsl_color.l + amount->value(),
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature darken_sig = "darken($color, $amount)";
    BUILT_IN(darken)
    {
      Color* rgb_color = ARG("$color", Color);
      Number* amount = ARGR("$amount", Number, 0, 100);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h,
                       hsl_color.s,
                       hsl_color.l - amount->value(),
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature saturate_sig = "saturate($color, $amount)";
    BUILT_IN(saturate)
    {
      Color* rgb_color = ARG("$color", Color);
      Number* amount = ARGR("$amount", Number, 0, 100);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h,
                       hsl_color.s + amount->value(),
                       hsl_color.l,
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature desaturate_sig = "desaturate($color, $amount)";
    BUILT_IN(desaturate)
    {
      Color* rgb_color = ARG("$color", Color);
      Number* amount = ARGR("$amount", Number, 0, 100);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h,
                       hsl_color.s - amount->value(),
                       hsl_color.l,
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature grayscale_sig = "grayscale($color)";
    BUILT_IN(grayscale)
    {
      Color* rgb_color = ARG("$color", Color);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h,
                       0.0,
                       hsl_color.l,
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature complement_sig = "complement($color)";
    BUILT_IN(complement)
    {
      Color* rgb_color = ARG("$color", Color);
      HSL hsl_color = rgb_to_hsl(rgb_color->r(),
                                 rgb_color->g(),
                                 rgb_color->b());
      return hsla_impl(hsl_color.h - 180.0,
                       hsl_color.s,
                       hsl_color.l,
                       rgb_color->a(),
                       ctx,
                       path,
                       line);
    }

    Signature invert_sig = "invert($color)";
    BUILT_IN(invert)
    {
      Color* rgb_color = ARG("$color", Color);
      return new (ctx.mem) Color(path,
                                 line,
                                 255 - rgb_color->r(),
                                 255 - rgb_color->g(),
                                 255 - rgb_color->b(),
                                 rgb_color->a());
    }

    ////////////////////
    // OPACITY FUNCTIONS
    ////////////////////
    Signature alpha_sig = "alpha($color)";
    Signature opacity_sig = "opacity($color)";
    BUILT_IN(alpha)
    {
      String_Constant* ie_kwd = dynamic_cast<String_Constant*>(env["$color"]);
      if (ie_kwd) {
        return new (ctx.mem) String_Constant(path, line, "alpha(" + ie_kwd->value() + ")");
      }
      else {
        return new (ctx.mem) Number(path, line, ARG("$color", Color)->a());
      }
    }

    Signature opacify_sig = "opacify($color, $amount)";
    Signature fade_in_sig = "fade-in($color, $amount)";
    BUILT_IN(opacify)
    {
      Color* color = ARG("$color", Color);
      double alpha = color->a() + ARGR("$amount", Number, 0, 1)->value();
      return new (ctx.mem) Color(path,
                                 line,
                                 color->r(),
                                 color->g(),
                                 color->b(),
                                 alpha > 1.0 ? 1.0 : alpha);
    }

    Signature transparentize_sig = "transparentize($color, $amount)";
    Signature fade_out_sig = "fade-out($color, $amount)";
    BUILT_IN(transparentize)
    {
      Color* color = ARG("$color", Color);
      double alpha = color->a() - ARGR("$amount", Number, 0, 1)->value();
      return new (ctx.mem) Color(path,
                                 line,
                                 color->r(),
                                 color->g(),
                                 color->b(),
                                 alpha < 0.0 ? 0.0 : alpha);
    }

    ////////////////////////
    // OTHER COLOR FUNCTIONS
    ////////////////////////

    Signature adjust_color_sig = "adjust-color($color, $red: false, $green: false, $blue: false, $hue: false, $saturation: false, $lightness: false, $alpha: false)";
    BUILT_IN(adjust_color)
    {
      Color* color = ARG("$color", Color);
      Number* r = dynamic_cast<Number*>(env["$red"]);
      Number* g = dynamic_cast<Number*>(env["$green"]);
      Number* b = dynamic_cast<Number*>(env["$blue"]);
      Number* h = dynamic_cast<Number*>(env["$hue"]);
      Number* s = dynamic_cast<Number*>(env["$saturation"]);
      Number* l = dynamic_cast<Number*>(env["$lightness"]);
      Number* a = dynamic_cast<Number*>(env["$alpha"]);

      bool rgb = r || g || b;
      bool hsl = h || s || l;

      if (rgb && hsl) {
        error("cannot specify both RGB and HSL values for `adjust-color`", path, line);
      }
      if (rgb) {
        return new (ctx.mem) Color(path,
                                   line,
                                   color->r() + (r ? r->value() : 0),
                                   color->g() + (g ? g->value() : 0),
                                   color->b() + (b ? b->value() : 0),
                                   color->a() + (a ? a->value() : 0));
      }
      if (hsl) {
        HSL hsl_struct = rgb_to_hsl(color->r(), color->g(), color->b());
        return hsla_impl(hsl_struct.h + (h ? h->value() : 0),
                         hsl_struct.s + (s ? s->value() : 0),
                         hsl_struct.l + (l ? l->value() : 0),
                         color->a() + (a ? a->value() : 0),
                         ctx,
                         path,
                         line);
      }
      if (a) {
        return new (ctx.mem) Color(path,
                                   line,
                                   color->r(),
                                   color->g(),
                                   color->b(),
                                   color->a() + (a ? a->value() : 0));
      }
      error("not enough arguments for `adjust-color`", path, line);
      // unreachable
      return color;
    }

    Signature scale_color_sig = "scale-color($color, $red: false, $green: false, $blue: false, $hue: false, $saturation: false, $lightness: false, $alpha: false)";
    BUILT_IN(scale_color)
    {
      Color* color = ARG("$color", Color);
      Number* r = dynamic_cast<Number*>(env["$red"]);
      Number* g = dynamic_cast<Number*>(env["$green"]);
      Number* b = dynamic_cast<Number*>(env["$blue"]);
      Number* h = dynamic_cast<Number*>(env["$hue"]);
      Number* s = dynamic_cast<Number*>(env["$saturation"]);
      Number* l = dynamic_cast<Number*>(env["$lightness"]);
      Number* a = dynamic_cast<Number*>(env["$alpha"]);

      bool rgb = r || g || b;
      bool hsl = h || s || l;

      if (rgb && hsl) {
        error("cannot specify both RGB and HSL values for `scale-color`", path, line);
      }
      if (rgb) {
        double rscale = (r ? ARGR("$red",   Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        double gscale = (g ? ARGR("$green", Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        double bscale = (b ? ARGR("$blue",  Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        double ascale = (a ? ARGR("$alpha", Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        return new (ctx.mem) Color(path,
                                   line,
                                   color->r() + rscale * (rscale > 0.0 ? 255 - color->r() : color->r()),
                                   color->g() + gscale * (gscale > 0.0 ? 255 - color->g() : color->g()),
                                   color->b() + bscale * (bscale > 0.0 ? 255 - color->b() : color->b()),
                                   color->a() + ascale * (ascale > 0.0 ? 1.0 - color->a() : color->a()));
      }
      if (hsl) {
        double hscale = (h ? ARGR("$hue",        Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        double sscale = (s ? ARGR("$saturation", Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        double lscale = (l ? ARGR("$lightness",  Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        double ascale = (a ? ARGR("$alpha",      Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        HSL hsl_struct = rgb_to_hsl(color->r(), color->g(), color->b());
        hsl_struct.h += hscale * (hscale > 0.0 ? 360.0 - hsl_struct.h : hsl_struct.h);
        hsl_struct.s += sscale * (sscale > 0.0 ? 100.0 - hsl_struct.s : hsl_struct.s);
        hsl_struct.l += lscale * (lscale > 0.0 ? 100.0 - hsl_struct.l : hsl_struct.l);
        double alpha = color->a() + ascale * (ascale > 0.0 ? 1.0 - color->a() : color->r());
        return hsla_impl(hsl_struct.h, hsl_struct.s, hsl_struct.l, alpha, ctx, path, line);
      }
      if (a) {
        double ascale = (a ? ARGR("$alpha", Number, -100.0, 100.0)->value() : 0.0) / 100.0;
        return new (ctx.mem) Color(path,
                                   line,
                                   color->r(),
                                   color->g(),
                                   color->b(),
                                   color->a() + ascale * (ascale > 0.0 ? 1.0 - color->a() : color->a()));
      }
      error("not enough arguments for `scale-color`", path, line);
      // unreachable
      return color;
    }

    Signature change_color_sig = "change-color($color, $red: false, $green: false, $blue: false, $hue: false, $saturation: false, $lightness: false, $alpha: false)";
    BUILT_IN(change_color)
    {
      Color* color = ARG("$color", Color);
      Number* r = dynamic_cast<Number*>(env["$red"]);
      Number* g = dynamic_cast<Number*>(env["$green"]);
      Number* b = dynamic_cast<Number*>(env["$blue"]);
      Number* h = dynamic_cast<Number*>(env["$hue"]);
      Number* s = dynamic_cast<Number*>(env["$saturation"]);
      Number* l = dynamic_cast<Number*>(env["$lightness"]);
      Number* a = dynamic_cast<Number*>(env["$alpha"]);

      bool rgb = r || g || b;
      bool hsl = h || s || l;

      if (rgb && hsl) {
        error("cannot specify both RGB and HSL values for `change-color`", path, line);
      }
      if (rgb) {
        return new (ctx.mem) Color(path,
                                   line,
                                   r ? ARGR("$red",   Number, 0, 255)->value() : color->r(),
                                   g ? ARGR("$green", Number, 0, 255)->value() : color->g(),
                                   b ? ARGR("$blue",  Number, 0, 255)->value() : color->b(),
                                   a ? ARGR("$alpha", Number, 0, 255)->value() : color->a());
      }
      if (hsl) {
        HSL hsl_struct = rgb_to_hsl(color->r(), color->g(), color->b());
        if (h) hsl_struct.h = static_cast<double>(((static_cast<int>(h->value()) % 360) + 360) % 360) / 360.0;
        if (s) hsl_struct.s = ARGR("$saturation", Number, 0, 100)->value();
        if (l) hsl_struct.l = ARGR("$lightness",  Number, 0, 100)->value();
        double alpha = a ? ARGR("$alpha", Number, 0, 1.0)->value() : color->a();
        return hsla_impl(hsl_struct.h, hsl_struct.s, hsl_struct.l, alpha, ctx, path, line);
      }
      if (a) {
        double alpha = a ? ARGR("$alpha", Number, 0, 1.0)->value() : color->a();
        return new (ctx.mem) Color(path,
                                   line,
                                   color->r(),
                                   color->g(),
                                   color->b(),
                                   alpha);
      }
      error("not enough arguments for `change-color`", path, line);
      // unreachable
      return color;
    }

    template <size_t range>
    static double cap_channel(double c) {
      if      (c > range) return range;
      else if (c < 0)     return 0;
      else                return c;
    }

    Signature ie_hex_str_sig = "ie-hex-str($color)";
    BUILT_IN(ie_hex_str)
    {
      Color* c = ARG("$color", Color);
      double r = cap_channel<0xff>(c->r());
      double g = cap_channel<0xff>(c->g());
      double b = cap_channel<0xff>(c->b());
      double a = cap_channel<1>   (c->a()) * 255;

      stringstream ss;
      ss << '#' << std::setw(2) << std::setfill('0');
      ss << std::hex << std::setw(2) << static_cast<unsigned long>(std::floor(a+0.5));
      ss << std::hex << std::setw(2) << static_cast<unsigned long>(std::floor(r+0.5));
      ss << std::hex << std::setw(2) << static_cast<unsigned long>(std::floor(g+0.5));
      ss << std::hex << std::setw(2) << static_cast<unsigned long>(std::floor(b+0.5));

      string result(ss.str());
      for (size_t i = 0, L = result.length(); i < L; ++i) {
        result[i] = std::toupper(result[i]);
      }
      return new (ctx.mem) String_Constant(path, line, result);
    }

    ///////////////////
    // STRING FUNCTIONS
    ///////////////////

    Signature unquote_sig = "unquote($string)";
    BUILT_IN(sass_unquote)
    {
      To_String to_string;
      AST_Node* arg = env["$string"];
      string str(unquote(arg->perform(&to_string)));
      String_Constant* result = new (ctx.mem) String_Constant(path, line, str);
      result->is_delayed(true);
      return result;
    }

    Signature quote_sig = "quote($string)";
    BUILT_IN(sass_quote)
    {
      To_String to_string;
      AST_Node* arg = env["$string"];
      string str(quote(arg->perform(&to_string), '"'));
      String_Constant* result = new (ctx.mem) String_Constant(path, line, str);
      result->is_delayed(true);
      return result;
    }

    ///////////////////
    // NUMBER FUNCTIONS
    ///////////////////

    Signature percentage_sig = "percentage($value)";
    BUILT_IN(percentage)
    {
      Number* n = ARG("$value", Number);
      if (!n->is_unitless()) error("argument $value of `" + string(sig) + "` must be unitless", path, line);
      return new (ctx.mem) Number(path, line, n->value() * 100, "%");
    }

    Signature round_sig = "round($value)";
    BUILT_IN(round)
    {
      Number* n = ARG("$value", Number);
      Number* r = new (ctx.mem) Number(*n);
      r->path(path);
      r->line(line);
      r->value(std::floor(r->value() + 0.5));
      return r;
    }

    Signature ceil_sig = "ceil($value)";
    BUILT_IN(ceil)
    {
      Number* n = ARG("$value", Number);
      Number* r = new (ctx.mem) Number(*n);
      r->path(path);
      r->line(line);
      r->value(std::ceil(r->value()));
      return r;
    }

    Signature floor_sig = "floor($value)";
    BUILT_IN(floor)
    {
      Number* n = ARG("$value", Number);
      Number* r = new (ctx.mem) Number(*n);
      r->path(path);
      r->line(line);
      r->value(std::floor(r->value()));
      return r;
    }

    Signature abs_sig = "abs($value)";
    BUILT_IN(abs)
    {
      Number* n = ARG("$value", Number);
      Number* r = new (ctx.mem) Number(*n);
      r->path(path);
      r->line(line);
      r->value(std::abs(r->value()));
      return r;
    }

    Signature min_sig = "min($x1, $x2...)";
    BUILT_IN(min)
    {
      Number* x1 = ARG("$x1", Number);
      List* arglist = ARG("$x2", List);
      Number* least = x1;
      for (size_t i = 0, L = arglist->length(); i < L; ++i) {
        Number* xi = dynamic_cast<Number*>((*arglist)[i]);
        if (!xi) error("`" + string(sig) + "` only takes numeric arguments", path, line);
        if (lt(xi, least, ctx)) least = xi;
      }
      return least;
    }

    Signature max_sig = "max($x2, $x2...)";
    BUILT_IN(max)
    {
      Number* x1 = ARG("$x1", Number);
      List* arglist = ARG("$x2", List);
      Number* greatest = x1;
      for (size_t i = 0, L = arglist->length(); i < L; ++i) {
        Number* xi = dynamic_cast<Number*>((*arglist)[i]);
        if (!xi) error("`" + string(sig) + "` only takes numeric arguments", path, line);
        if (lt(greatest, xi, ctx)) greatest = xi;
      }
      return greatest;
    }

    /////////////////
    // LIST FUNCTIONS
    /////////////////

    Signature length_sig = "length($list)";
    BUILT_IN(length)
    {
      List* list = dynamic_cast<List*>(env["$list"]);
      return new (ctx.mem) Number(path,
                                  line,
                                  list ? list->length() : 1);
    }

    Signature nth_sig = "nth($list, $n)";
    BUILT_IN(nth)
    {
      List* l = dynamic_cast<List*>(env["$list"]);
      Number* n = ARG("$n", Number);
      if (!l) {
        l = new (ctx.mem) List(path, line, 1);
        *l << ARG("$list", Expression);
      }
      if (l->empty()) error("argument `$list` of `" + string(sig) + "` must not be empty", path, line);
      if (n->value() < 1) error("argument `$n` of `" + string(sig) + "` must be greater than or equal to 1", path, line);
      return (*l)[std::floor(n->value() - 1)];
    }

    Signature index_sig = "index($list, $value)";
    BUILT_IN(index)
    {
      List* l = dynamic_cast<List*>(env["$list"]);
      Expression* v = ARG("$value", Expression);
      if (!l) {
        l = new (ctx.mem) List(path, line, 1);
        *l << ARG("$list", Expression);
      }
      for (size_t i = 0, L = l->length(); i < L; ++i) {
        if (eq((*l)[i], v, ctx)) return new (ctx.mem) Number(path, line, i+1);
      }
      return new (ctx.mem) Boolean(path, line, false);
    }

    Signature join_sig = "join($list1, $list2, $separator: auto)";
    BUILT_IN(join)
    {
      List* l1 = dynamic_cast<List*>(env["$list1"]);
      List* l2 = dynamic_cast<List*>(env["$list2"]);
      String_Constant* sep = ARG("$separator", String_Constant);
      List::Separator sep_val = (l1 ? l1->separator() : List::SPACE);
      if (!l1) {
        l1 = new (ctx.mem) List(path, line, 1);
        *l1 << ARG("$list1", Expression);
        sep_val = (l2 ? l2->separator() : List::SPACE);
      }
      if (!l2) {
        l2 = new (ctx.mem) List(path, line, 1);
        *l2 << ARG("$list2", Expression);
      }
      size_t len = l1->length() + l2->length();
      string sep_str = unquote(sep->value());
      if (sep_str == "space") sep_val = List::SPACE;
      else if (sep_str == "comma") sep_val = List::COMMA;
      else if (sep_str != "auto") error("argument `$separator` of `" + string(sig) + "` must be `space`, `comma`, or `auto`", path, line);
      List* result = new (ctx.mem) List(path, line, len, sep_val);
      *result += l1;
      *result += l2;
      return result;
    }

    Signature append_sig = "append($list, $val, $separator: auto)";
    BUILT_IN(append)
    {
      List* l = dynamic_cast<List*>(env["$list"]);
      Expression* v = ARG("$val", Expression);
      String_Constant* sep = ARG("$separator", String_Constant);
      if (!l) {
        l = new (ctx.mem) List(path, line, 1);
        *l << ARG("$list", Expression);
      }
      List* result = new (ctx.mem) List(path, line, l->length() + 1);
      string sep_str(unquote(sep->value()));
      if (sep_str == "space") result->separator(List::SPACE);
      else if (sep_str == "comma") result->separator(List::COMMA);
      else if (sep_str != "auto") error("argument `$separator` of `" + string(sig) + "` must be `space`, `comma`, or `auto`", path, line);
      *result += l;
      *result << v;
      return result;
    }

    Signature zip_sig = "zip($lists...)";
    BUILT_IN(zip)
    {
      List* arglist = new (ctx.mem) List(*ARG("$lists", List));
      size_t shortest = 0;
      for (size_t i = 0, L = arglist->length(); i < L; ++i) {
        List* ith = dynamic_cast<List*>((*arglist)[i]);
        if (!ith) {
          ith = new (ctx.mem) List(path, line, 1);
          *ith << (*arglist)[i];
          (*arglist)[i] = ith;
        }
        shortest = (i ? std::min(shortest, ith->length()) : ith->length());
      }
      List* zippers = new (ctx.mem) List(path, line, shortest, List::COMMA);
      size_t L = arglist->length();
      for (size_t i = 0; i < shortest; ++i) {
        List* zipper = new (ctx.mem) List(path, line, L);
        for (size_t j = 0; j < L; ++j) {
          *zipper << (*static_cast<List*>((*arglist)[j]))[i];
        }
        *zippers << zipper;
      }
      return zippers;
    }

    Signature compact_sig = "compact($values...)";
    BUILT_IN(compact)
    {
      List* arglist = ARG("$values", List);
      if (arglist->length() == 1) {
        Expression* the_arg = (*arglist)[0];
        arglist = dynamic_cast<List*>(the_arg);
        if (!arglist) {
          List* result = new (ctx.mem) List(path, line, 1, List::COMMA);
          *result << the_arg;
          return result;
        }
      }
      List* result = new (ctx.mem) List(path, line, 0, List::COMMA);
      for (size_t i = 0, L = arglist->length(); i < L; ++i) {
        Boolean* ith = dynamic_cast<Boolean*>((*arglist)[i]);
        if (ith && ith->value() == false) continue;
        *result << (*arglist)[i];
      }
      return result;
    }

    //////////////////////////
    // INTROSPECTION FUNCTIONS
    //////////////////////////

    Signature type_of_sig = "type-of($value)";
    BUILT_IN(type_of)
    {
      Expression* v = ARG("$value", Expression);
      if (v->concrete_type() == Expression::STRING) {
        To_String to_string;
        string str(v->perform(&to_string));
        if (ctx.names_to_colors.count(str)) {
          return new (ctx.mem) String_Constant(path, line, "color");
        }
      }
      return new (ctx.mem) String_Constant(path, line, ARG("$value", Expression)->type());
    }

    Signature unit_sig = "unit($number)";
    BUILT_IN(unit)
    { return new (ctx.mem) String_Constant(path, line, quote(ARG("$number", Number)->unit(), '"')); }

    Signature unitless_sig = "unitless($number)";
    BUILT_IN(unitless)
    { return new (ctx.mem) Boolean(path, line, ARG("$number", Number)->is_unitless()); }

    Signature comparable_sig = "comparable($number-1, $number-2)";
    BUILT_IN(comparable)
    {
      Number* n1 = ARG("$number-1", Number);
      Number* n2 = ARG("$number-2", Number);
      if (n1->is_unitless() || n2->is_unitless()) {
        return new (ctx.mem) Boolean(path, line, true);
      }
      Number tmp_n2(*n2);
      tmp_n2.normalize(n1->find_convertible_unit());
      return new (ctx.mem) Boolean(path, line, n1->unit() == tmp_n2.unit());
    }

    ////////////////////
    // BOOLEAN FUNCTIONS
    ////////////////////

    Signature not_sig = "not($value)";
    BUILT_IN(sass_not)
    { return new (ctx.mem) Boolean(path, line, ARG("$value", Expression)->is_false()); }

    Signature if_sig = "if($condition, $if-true, $if-false)";
    BUILT_IN(sass_if)
    { return ARG("$condition", Expression)->is_false() ? ARG("$if-false", Expression) : ARG("$if-true", Expression); }

    ////////////////
    // URL FUNCTIONS
    ////////////////

    Signature image_url_sig = "image-url($path, $only-path: false, $cache-buster: false)";
    BUILT_IN(image_url)
    {
      String_Constant* ipath = ARG("$path", String_Constant);
      bool only_path = !ARG("$only-path", Expression)->is_false();
      string full_path(quote(ctx.image_path + "/" + unquote(ipath->value()), '"'));
      if (!only_path) full_path = "url(" + full_path + ")";
      return new (ctx.mem) String_Constant(path, line, full_path);
    }

  }
}