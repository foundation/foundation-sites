#define SASS_PRELEXER

namespace Sass {
  namespace Prelexer {

    typedef int (*ctype_predicate)(int);
    typedef const char* (*prelexer)(const char*);

    // Match a single character literal.
    template <char pre>
    const char* exactly(const char* src) {
      return *src == pre ? src + 1 : 0;
    }

    // Match a string constant.
    template <const char* prefix>
    const char* exactly(const char* src) {
      const char* pre = prefix;
      while (*pre && *src == *pre) ++src, ++pre;
      return *pre ? 0 : src;
    }

    // Match a single character that satifies the supplied ctype predicate.
    template <ctype_predicate pred>
    const char* class_char(const char* src) {
      return pred(*src) ? src + 1 : 0;
    }

    // Match a single character that is a member of the supplied class.
    template <const char* char_class>
    const char* class_char(const char* src) {
      const char* cc = char_class;
      while (*cc && *src != *cc) ++cc;
      return *cc ? src + 1 : 0;
    }

    // Match a sequence of characters that all satisfy the supplied ctype predicate.
    template <ctype_predicate pred>
    const char* class_chars(const char* src) {
      const char* p = src;
      while (pred(*p)) ++p;
      return p == src ? 0 : p;
    }

    // Match a sequence of characters that are all members of the supplied class.
    template <const char* char_class>
    const char* class_chars(const char* src) {
      const char* p = src;
      while (class_char<char_class>(p)) ++p;
      return p == src ? 0 : p;
    }

    // Match a sequence of characters up to the next newline.
    template <const char* prefix>
    const char* to_endl(const char* src) {
      if (!(src = exactly<prefix>(src))) return 0;
      while (*src && *src != '\n') ++src;
      return src;
    }

    // Match a sequence of characters delimited by the supplied chars.
    template <char beg, char end, bool esc>
    const char* delimited_by(const char* src) {
      src = exactly<beg>(src);
      if (!src) return 0;
      const char* stop;
      while (1) {
        if (!*src) return 0;
        stop = exactly<end>(src);
        if (stop && (!esc || *(src - 1) != '\\')) return stop;
        src = stop ? stop : src + 1;
      }
    }

    // Match a sequence of characters delimited by the supplied strings.
    template <const char* beg, const char* end, bool esc>
    const char* delimited_by(const char* src) {
      src = exactly<beg>(src);
      if (!src) return 0;
      const char* stop;
      while (1) {
        if (!*src) return 0;
        stop = exactly<end>(src);
        if (stop && (!esc || *(src - 1) != '\\')) return stop;
        src = stop ? stop : src + 1;
      }
    }

    // Match any single character.
    const char* any_char(const char* src);
    // Match any single character except the supplied one.
    template <char c>
    const char* any_char_except(const char* src) {
      return (*src && *src != c) ? src+1 : 0;
    }

    // Matches zero characters (always succeeds without consuming input).
    const char* epsilon(const char*);

    // Matches the empty string.
    const char* empty(const char*);

    // Succeeds of the supplied matcher fails, and vice versa.
    template <prelexer mx>
    const char* negate(const char* src) {
      return mx(src) ? 0 : src;
    }

    // Tries the matchers in sequence and returns the first match (or none)
    template <prelexer mx1, prelexer mx2>
    const char* alternatives(const char* src) {
      const char* rslt;
      (rslt = mx1(src)) || (rslt = mx2(src));
      return rslt;
    }

    // Same as above, but with 3 arguments.
    template <prelexer mx1, prelexer mx2, prelexer mx3>
    const char* alternatives(const char* src) {
      const char* rslt;
      (rslt = mx1(src)) || (rslt = mx2(src)) || (rslt = mx3(src));
      return rslt;
    }

    // Same as above, but with 4 arguments.
    template <prelexer mx1, prelexer mx2, prelexer mx3, prelexer mx4>
    const char* alternatives(const char* src) {
      const char* rslt;
      (rslt = mx1(src)) || (rslt = mx2(src)) ||
      (rslt = mx3(src)) || (rslt = mx4(src));
      return rslt;
    }

    // Same as above, but with 5 arguments.
    template <prelexer mx1, prelexer mx2, prelexer mx3,
              prelexer mx4, prelexer mx5>
    const char* alternatives(const char* src) {
      const char* rslt;
      (rslt = mx1(src)) || (rslt = mx2(src)) || (rslt = mx3(src)) ||
      (rslt = mx4(src)) || (rslt = mx5(src));
      return rslt;
    }

    // Same as above, but with 6 arguments.
    template <prelexer mx1, prelexer mx2, prelexer mx3,
              prelexer mx4, prelexer mx5, prelexer mx6>
    const char* alternatives(const char* src) {
      const char* rslt;
      (rslt = mx1(src)) || (rslt = mx2(src)) || (rslt = mx3(src)) ||
      (rslt = mx4(src)) || (rslt = mx5(src)) || (rslt = mx6(src));
      return rslt;
    }

    // Same as above, but with 7 arguments.
    template <prelexer mx1, prelexer mx2,
              prelexer mx3, prelexer mx4,
              prelexer mx5, prelexer mx6,
              prelexer mx7>
    const char* alternatives(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) || (rslt = mx2(rslt)) ||
      (rslt = mx3(rslt)) || (rslt = mx4(rslt)) ||
      (rslt = mx5(rslt)) || (rslt = mx6(rslt)) ||
      (rslt = mx7(rslt));
      return rslt;
    }

    // Same as above, but with 8 arguments.
    template <prelexer mx1, prelexer mx2,
              prelexer mx3, prelexer mx4,
              prelexer mx5, prelexer mx6,
              prelexer mx7, prelexer mx8>
    const char* alternatives(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) || (rslt = mx2(rslt)) ||
      (rslt = mx3(rslt)) || (rslt = mx4(rslt)) ||
      (rslt = mx5(rslt)) || (rslt = mx6(rslt)) ||
      (rslt = mx7(rslt)) || (rslt = mx8(rslt));
      return rslt;
    }

    // Tries the matchers in sequence and succeeds if they all succeed.
    template <prelexer mx1, prelexer mx2>
    const char* sequence(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) && (rslt = mx2(rslt));
      return rslt;
    }

    // Same as above, but with 3 arguments.
    template <prelexer mx1, prelexer mx2, prelexer mx3>
    const char* sequence(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) && (rslt = mx2(rslt)) && (rslt = mx3(rslt));
      return rslt;
    }

    // Same as above, but with 4 arguments.
    template <prelexer mx1, prelexer mx2, prelexer mx3, prelexer mx4>
    const char* sequence(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) && (rslt = mx2(rslt)) &&
      (rslt = mx3(rslt)) && (rslt = mx4(rslt));
      return rslt;
    }

    // Same as above, but with 5 arguments.
    template <prelexer mx1, prelexer mx2,
              prelexer mx3, prelexer mx4,
              prelexer mx5>
    const char* sequence(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) && (rslt = mx2(rslt)) &&
      (rslt = mx3(rslt)) && (rslt = mx4(rslt)) &&
      (rslt = mx5(rslt));
      return rslt;
    }

    // Same as above, but with 6 arguments.
    template <prelexer mx1, prelexer mx2,
              prelexer mx3, prelexer mx4,
              prelexer mx5, prelexer mx6>
    const char* sequence(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) && (rslt = mx2(rslt)) &&
      (rslt = mx3(rslt)) && (rslt = mx4(rslt)) &&
      (rslt = mx5(rslt)) && (rslt = mx6(rslt));
      return rslt;
    }

    // Same as above, but with 7 arguments.
    template <prelexer mx1, prelexer mx2,
              prelexer mx3, prelexer mx4,
              prelexer mx5, prelexer mx6,
              prelexer mx7>
    const char* sequence(const char* src) {
      const char* rslt = src;
      (rslt = mx1(rslt)) && (rslt = mx2(rslt)) &&
      (rslt = mx3(rslt)) && (rslt = mx4(rslt)) &&
      (rslt = mx5(rslt)) && (rslt = mx6(rslt)) &&
      (rslt = mx7(rslt));
      return rslt;
    }

    // Match a pattern or not. Always succeeds.
    template <prelexer mx>
    const char* optional(const char* src) {
      const char* p = mx(src);
      return p ? p : src;
    }

    // Match zero or more of the supplied pattern
    template <prelexer mx>
    const char* zero_plus(const char* src) {
      const char* p = mx(src);
      while (p) src = p, p = mx(src);
      return src;
    }

    // Match one or more of the supplied pattern
    template <prelexer mx>
    const char* one_plus(const char* src) {
      const char* p = mx(src);
      if (!p) return 0;
      while (p) src = p, p = mx(src);
      return src;
    }

    // Match a single character satisfying the ctype predicates.
    const char* space(const char* src);
    const char* alpha(const char* src);
    const char* digit(const char* src);
    const char* xdigit(const char* src);
    const char* alnum(const char* src);
    const char* punct(const char* src);
    // Match multiple ctype characters.
    const char* spaces(const char* src);
    const char* alphas(const char* src);
    const char* digits(const char* src);
    const char* xdigits(const char* src);
    const char* alnums(const char* src);
    const char* puncts(const char* src);

    // Match a line comment.
    const char* line_comment(const char* src);
    // Match a block comment.
    const char* block_comment(const char* src);
    // Match either.
    const char* comment(const char* src);
    // Match double- and single-quoted strings.
    const char* double_quoted_string(const char* src);
    const char* single_quoted_string(const char* src);
    const char* string_constant(const char* src);
    // Match interpolants.
    const char* interpolant(const char* src);

    // Whitespace handling.
    const char* optional_spaces(const char* src);
    const char* optional_comment(const char* src);
    const char* spaces_and_comments(const char* src);
    const char* no_spaces(const char* src);

    const char* backslash_something(const char* src);

    // Match a CSS identifier.
    const char* identifier(const char* src);
    // Match selector names.
    const char* sel_ident(const char* src);
    // Match interpolant schemas
    const char* identifier_schema(const char* src);
    const char* value_schema(const char* src);
    const char* filename(const char* src);
    const char* filename_schema(const char* src);
    const char* url_schema(const char* src);
    const char* url_value(const char* src);
    const char* vendor_prefix(const char* src);
    // Match CSS '@' keywords.
    const char* at_keyword(const char* src);
    const char* import(const char* src);
    const char* media(const char* src);
    const char* keyframes(const char* src);
    const char* keyf(const char* src);
    const char* mixin(const char* src);
    const char* function(const char* src);
    const char* return_directive(const char* src);
    const char* include(const char* src);
    const char* content(const char* src);
    const char* extend(const char* src);

    const char* if_directive(const char* src);
    const char* else_directive(const char* src);
    const char* elseif_directive(const char* src);

    const char* for_directive(const char* src);
    const char* from(const char* src);
    const char* to(const char* src);
    const char* through(const char* src);

    const char* each_directive(const char* src);
    const char* in(const char* src);

    const char* while_directive(const char* src);

    const char* warn(const char* src);

    const char* directive(const char* src);
    const char* at_keyword(const char* src);

    const char* null(const char* src);

    // Match CSS type selectors
    const char* namespace_prefix(const char* src);
    const char* type_selector(const char* src);
    const char* universal(const char* src);
    // Match CSS id names.
    const char* id_name(const char* src);
    // Match CSS class names.
    const char* class_name(const char* src);
    // Match CSS numeric constants.
    const char* sign(const char* src);
    const char* unsigned_number(const char* src);
    const char* number(const char* src);
    const char* coefficient(const char* src);
    const char* binomial(const char* src);
    const char* percentage(const char* src);
    const char* dimension(const char* src);
    const char* hex(const char* src);
    const char* rgb_prefix(const char* src);
    // Match CSS uri specifiers.
    const char* uri_prefix(const char* src);
    const char* uri(const char* src);
    const char* url(const char* src);
    // Match CSS "!important" keyword.
    const char* important(const char* src);
    // Match Sass "!default" keyword.
    const char* default_flag(const char* src);
    // Match CSS pseudo-class/element prefixes
    const char* pseudo_prefix(const char* src);
    // Match CSS function call openers.
    const char* functional(const char* src);
    const char* functional_schema(const char* src);
    const char* pseudo_not(const char* src);
    // Match CSS 'odd' and 'even' keywords for functional pseudo-classes.
    const char* even(const char* src);
    const char* odd(const char* src);
    // Match CSS attribute-matching operators.
    const char* exact_match(const char* src);
    const char* class_match(const char* src);
    const char* dash_match(const char* src);
    const char* prefix_match(const char* src);
    const char* suffix_match(const char* src);
    const char* substring_match(const char* src);
    // Match CSS combinators.
    const char* adjacent_to(const char* src);
    const char* precedes(const char* src);
    const char* parent_of(const char* src);
    const char* ancestor_of(const char* src);

    // Match SCSS variable names.
    const char* variable(const char* src);

    // Match Sass boolean keywords.
    const char* true_val(const char* src);
    const char* false_val(const char* src);
    const char* and_op(const char* src);
    const char* or_op(const char* src);
    const char* not_op(const char* src);
    const char* eq_op(const char* src);
    const char* neq_op(const char* src);
    const char* gt_op(const char* src);
    const char* gte_op(const char* src);
    const char* lt_op(const char* src);
    const char* lte_op(const char* src);

    // Path matching functions.
    const char* folder(const char* src);
    const char* folders(const char* src);

    // Utility functions for finding and counting characters in a string.
    template<char c>
    const char* find_first(const char* src) {
      while (*src && *src != c) ++src;
      return *src ? src : 0;
    }
    template<prelexer mx>
    const char* find_first(const char* src) {
      while (*src && !mx(src)) ++src;
      return *src ? src : 0;
    }
    template<prelexer mx>
    const char* find_first_in_interval(const char* beg, const char* end) {
      while ((beg < end) && *beg) {
        if (mx(beg)) return beg;
        ++beg;
      }
      return 0;
    }
    template <char c>
    unsigned int count_interval(const char* beg, const char* end) {
      unsigned int counter = 0;
      while (beg < end && *beg) {
        if (*beg == c) ++counter;
        ++beg;
      }
      return counter;
    }
    template <prelexer mx>
    unsigned int count_interval(const char* beg, const char* end) {
      unsigned int counter = 0;
      while (beg < end && *beg) {
        const char* p;
        if (p = mx(beg)) {
          ++counter;
          beg = p;
        }
        else {
          ++beg;
        }
      }
      return counter;
    }

    const char* chunk(const char* src);
  }
}
