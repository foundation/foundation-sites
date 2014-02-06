#include <cctype>
#include <iostream>
#include "constants.hpp"
#include "prelexer.hpp"


namespace Sass {
  using namespace Constants;

  namespace Prelexer {
    using std::cerr; using std::endl;
    // Matches zero characters (always succeeds without consuming input).
    const char* epsilon(char *src) {
      return src;
    }
    // Matches the empty string.
    const char* empty(char *src) {
      return *src ? 0 : src;
    }

    // Match any single character.
    const char* any_char(const char* src) { return *src ? src+1 : src; }

    // Match a single character satisfying the ctype predicates.
    const char* space(const char* src) { return std::isspace(*src) ? src+1 : 0; }
    const char* alpha(const char* src) { return std::isalpha(*src) ? src+1 : 0; }
    const char* digit(const char* src) { return std::isdigit(*src) ? src+1 : 0; }
    const char* xdigit(const char* src) { return std::isxdigit(*src) ? src+1 : 0; }
    const char* alnum(const char* src) { return std::isalnum(*src) ? src+1 : 0; }
    const char* punct(const char* src) { return std::ispunct(*src) ? src+1 : 0; }
    // Match multiple ctype characters.
    const char* spaces(const char* src) { return one_plus<space>(src); }
    const char* alphas(const char* src) { return one_plus<alpha>(src); }
    const char* digits(const char* src) { return one_plus<digit>(src); }
    const char* xdigits(const char* src) { return one_plus<xdigit>(src); }
    const char* alnums(const char* src) { return one_plus<alnum>(src); }
    const char* puncts(const char* src) { return one_plus<punct>(src); }

    // Match a line comment.

    const char* line_comment(const char* src) { return to_endl<slash_slash>(src); }
    // Match a block comment.


    const char* block_comment(const char* src) {
      return sequence< optional_spaces, delimited_by<slash_star, star_slash, false> >(src);
    }
    // Match either comment.
    const char* comment(const char* src) {
      return alternatives<block_comment, line_comment>(src);
    }
    // Match double- and single-quoted strings.
    const char* double_quoted_string(const char* src) {
      return delimited_by<'"', '"', true>(src);
    }
    const char* single_quoted_string(const char* src) {
      return delimited_by<'\'', '\'', true>(src);
    }
    const char* string_constant(const char* src) {
      return alternatives<double_quoted_string, single_quoted_string>(src);
    }
    // Match interpolants.


    const char* interpolant(const char* src) {
      return delimited_by<hash_lbrace, rbrace, false>(src);
    }

    // Whitespace handling.
    const char* optional_spaces(const char* src) { return optional<spaces>(src); }
    const char* optional_comment(const char* src) { return optional<comment>(src); }
    const char* spaces_and_comments(const char* src) {
      return zero_plus< alternatives<spaces, comment> >(src);
    }
    const char* no_spaces(const char* src) {
      return negate< spaces >(src);
    }

    const char* backslash_something(const char* src) {
      return sequence< exactly<'\\'>, any_char >(src);
    }

    // Match CSS identifiers.
    const char* identifier(const char* src) {
      return sequence< optional< exactly<'-'> >,
                       alternatives< alpha, exactly<'_'>, backslash_something >,
                       zero_plus< alternatives< alnum,
                                                exactly<'-'>,
                                                exactly<'_'>,
                                                backslash_something > > >(src);
    }

    // Match CSS selectors.
    const char* sel_ident(const char* src) {
      return sequence< optional< alternatives< exactly<'-'>, exactly<'|'> > >,
                       alternatives< alpha, exactly<'_'>, backslash_something, exactly<'|'> >,
                       zero_plus< alternatives< alnum,
                                                exactly<'-'>,
                                                exactly<'_'>,
                                                exactly<'|'>,
                                                backslash_something > > >(src);
    }

    // Match interpolant schemas
    const char* identifier_schema(const char* src) {
      // follows this pattern: (x*ix*)+ ... well, not quite
      return one_plus< sequence< zero_plus< alternatives< identifier, exactly<'-'> > >,
                                 interpolant,
                                 zero_plus< alternatives< identifier, number, exactly<'-'> > > > >(src);
    }
    const char* value_schema(const char* src) {
      // follows this pattern: ([xyz]*i[xyz]*)+
      return one_plus< sequence< zero_plus< alternatives< identifier, percentage, dimension, hex, number, string_constant > >,
                                 interpolant,
                                 zero_plus< alternatives< identifier, percentage, dimension, hex, number, string_constant > > > >(src);
    }
    const char* filename_schema(const char* src) {
      return one_plus< sequence< zero_plus< alternatives< identifier, number, exactly<'.'>, exactly<'/'> > >,
                                 interpolant,
                                 zero_plus< alternatives< identifier, number, exactly<'.'>, exactly<'/'> > > > >(src);
    }

    const char* filename(const char* src) {
      return one_plus< alternatives< identifier, number, exactly<'.'> > >(src);
    }

    // Match CSS '@' keywords.
    const char* at_keyword(const char* src) {
      return sequence<exactly<'@'>, identifier>(src);
    }

    const char* import(const char* src) {
      return exactly<import_kwd>(src);
    }

    const char* media(const char* src) {
      return exactly<media_kwd>(src);
    }

    const char* keyframes(const char* src) {
      return sequence< exactly<'@'>, optional< vendor_prefix >, exactly< keyframes_kwd > >(src);
    }

    const char* vendor_prefix(const char* src) {
      return alternatives< exactly< vendor_opera_kwd >, exactly< vendor_webkit_kwd >, exactly< vendor_mozilla_kwd >, exactly< vendor_ms_kwd >, exactly< vendor_khtml_kwd > >(src);
    }

    const char* keyf(const char* src) {
      return one_plus< alternatives< to, from, percentage > >(src);
    }

    const char* mixin(const char* src) {
      return exactly<mixin_kwd>(src);
    }

    const char* function(const char* src) {
      return exactly<function_kwd>(src);
    }

    const char* return_directive(const char* src) {
      return exactly<return_kwd>(src);
    }

    const char* include(const char* src) {
      return exactly<include_kwd>(src);
    }

    const char* content(const char* src) {
      return exactly<content_kwd>(src);
    }

    const char* extend(const char* src) {
      return exactly<extend_kwd>(src);
    }


    const char* if_directive(const char* src) {
      return exactly<if_kwd>(src);
    }

    const char* else_directive(const char* src) {
      return exactly<else_kwd>(src);
    }
    const char* elseif_directive(const char* src) {
      return sequence< else_directive,
                       spaces_and_comments,
                       exactly< if_after_else_kwd > >(src);
    }

    const char* for_directive(const char* src) {
      return exactly<for_kwd>(src);
    }

    const char* from(const char* src) {
      return exactly<from_kwd>(src);
    }

    const char* to(const char* src) {
      return exactly<to_kwd>(src);
    }

    const char* through(const char* src) {
      return exactly<through_kwd>(src);
    }

    const char* each_directive(const char* src) {
      return exactly<each_kwd>(src);
    }

    const char* in(const char* src) {
      return exactly<in_kwd>(src);
    }

    const char* while_directive(const char* src) {
      return exactly<while_kwd>(src);
    }

    const char* name(const char* src) {
      return one_plus< alternatives< alnum,
                                     exactly<'-'>,
                                     exactly<'_'> > >(src);
    }

    const char* warn(const char* src) {
      return exactly<warn_kwd>(src);
    }

    const char* directive(const char* src) {
      return sequence< exactly<'@'>, identifier >(src);
    }

    const char* null(const char* src) {
      return exactly<null_kwd>(src);
    }

    // Match CSS type selectors
    const char* namespace_prefix(const char* src) {
      return sequence< optional< alternatives< identifier, exactly<'*'> > >,
                       exactly<'|'> >(src);
    }
    const char* type_selector(const char* src) {
      return sequence< optional<namespace_prefix>, identifier>(src);
    }
    const char* universal(const char* src) {
      return sequence< optional<namespace_prefix>, exactly<'*'> >(src);
    }
    // Match CSS id names.
    const char* id_name(const char* src) {
      return sequence<exactly<'#'>, name>(src);
    }
    // Match CSS class names.
    const char* class_name(const char* src) {
      return sequence<exactly<'.'>, identifier>(src);
    }
    // Match CSS numeric constants.

    const char* sign(const char* src) {
      return class_char<sign_chars>(src);
    }
    const char* unsigned_number(const char* src) {
      return alternatives<sequence< zero_plus<digits>,
                                    exactly<'.'>,
                                    one_plus<digits> >,
                          digits>(src);
    }
    const char* number(const char* src) {
      return sequence< optional<sign>, unsigned_number>(src);
    }
    const char* coefficient(const char* src) {
      return alternatives< sequence< optional<sign>, digits >,
                           sign >(src);
    }
    const char* binomial(const char* src) {
      return sequence< optional<sign>,
                       optional<digits>,
                       exactly<'n'>, optional_spaces,
                       sign, optional_spaces,
                       digits >(src);
    }
    const char* percentage(const char* src) {
      return sequence< number, exactly<'%'> >(src);
    }

    const char* em(const char* src) {
      return sequence< number, exactly<em_kwd> >(src);
    }
    const char* dimension(const char* src) {
      return sequence<number, identifier>(src);
    }
    const char* hex(const char* src) {
      const char* p = sequence< exactly<'#'>, one_plus<xdigit> >(src);
      int len = p - src;
      return (len != 4 && len != 7) ? 0 : p;
    }

    const char* rgb_prefix(const char* src) {
      return exactly<rgb_kwd>(src);
    }
    // Match CSS uri specifiers.

    const char* uri_prefix(const char* src) {
      return exactly<url_kwd>(src);
    }
    // TODO: rename the following two functions
    const char* uri(const char* src) {
      return sequence< exactly<url_kwd>,
                       optional<spaces>,
                       string_constant,
                       optional<spaces>,
                       exactly<')'> >(src);
    }
    const char* url_value(const char* src) {
      return sequence< optional< sequence< identifier, exactly<':'> > >, // optional protocol
                       one_plus< sequence< zero_plus< exactly<'/'> >, filename > >, // one or more folders and/or trailing filename
                       optional< exactly<'/'> > >(src);
    }
    const char* url_schema(const char* src) {
      return sequence< optional< sequence< identifier, exactly<':'> > >, // optional protocol
                       filename_schema >(src); // optional trailing slash
    }
    // Match CSS "!important" keyword.
    const char* important(const char* src) {
      return sequence< exactly<'!'>,
                       spaces_and_comments,
                       exactly<important_kwd> >(src);
    }
    // Match Sass "!default" keyword.
    const char* default_flag(const char* src) {
      return sequence< exactly<'!'>,
                       spaces_and_comments,
                       exactly<default_kwd> >(src);
    }
    // Match CSS pseudo-class/element prefixes.
    const char* pseudo_prefix(const char* src) {
      return sequence< exactly<':'>, optional< exactly<':'> > >(src);
    }
    // Match CSS function call openers.
    const char* functional_schema(const char* src) {
      return sequence< identifier_schema, exactly<'('> >(src);
    }
    const char* functional(const char* src) {
      return sequence< identifier, exactly<'('> >(src);
    }
    // Match the CSS negation pseudo-class.
    const char* pseudo_not(const char* src) {
      return exactly< pseudo_not_kwd >(src);
    }
    // Match CSS 'odd' and 'even' keywords for functional pseudo-classes.
    const char* even(const char* src) {
      return exactly<even_kwd>(src);
    }
    const char* odd(const char* src) {
      return exactly<odd_kwd>(src);
    }
    // Match CSS attribute-matching operators.
    const char* exact_match(const char* src) { return exactly<'='>(src); }
    const char* class_match(const char* src) { return exactly<tilde_equal>(src); }
    const char* dash_match(const char* src) { return exactly<pipe_equal>(src); }
    const char* prefix_match(const char* src) { return exactly<caret_equal>(src); }
    const char* suffix_match(const char* src) { return exactly<dollar_equal>(src); }
    const char* substring_match(const char* src) { return exactly<star_equal>(src); }
    // Match CSS combinators.
    const char* adjacent_to(const char* src) {
      return sequence< optional_spaces, exactly<'+'> >(src);
    }
    const char* precedes(const char* src) {
      return sequence< optional_spaces, exactly<'~'> >(src);
    }
    const char* parent_of(const char* src) {
      return sequence< optional_spaces, exactly<'>'> >(src);
    }
    const char* ancestor_of(const char* src) {
      return sequence< spaces, negate< exactly<'{'> > >(src);
    }

    // Match SCSS variable names.
    const char* variable(const char* src) {
      return sequence<exactly<'$'>, name>(src);
    }

    // Match Sass boolean keywords.
    const char* true_val(const char* src) {
      return exactly<true_kwd>(src);
    }
    const char* false_val(const char* src) {
      return exactly<false_kwd>(src);
    }
    const char* and_op(const char* src) {
      return exactly<and_kwd>(src);
    }
    const char* or_op(const char* src) {
      return exactly<or_kwd>(src);
    }
    const char* not_op(const char* src) {
      return exactly<not_kwd>(src);
    }
    const char* eq_op(const char* src) {
      return exactly<eq>(src);
    }
    const char* neq_op(const char* src) {
      return exactly<neq>(src);
    }
    const char* gt_op(const char* src) {
      return exactly<gt>(src);
    }
    const char* gte_op(const char* src) {
      return exactly<gte>(src);
    }
    const char* lt_op(const char* src) {
      return exactly<lt>(src);
    }
    const char* lte_op(const char* src) {
      return exactly<lte>(src);
    }

    // Path matching functions.
    const char* folder(const char* src) {
      return sequence< zero_plus< any_char_except<'/'> >,
                       exactly<'/'> >(src);
    }
    const char* folders(const char* src) {
      return zero_plus< folder >(src);
    }

    const char* chunk(const char* src) {
      char inside_str = 0;
      const char* p = src;
      size_t depth = 0;
      while (true) {
        if (!*p) {
          return 0;
        }
        else if (!inside_str && (*p == '"' || *p == '\'')) {
          inside_str = *p;
        }
        else if (*p == inside_str && *(p-1) != '\\') {
          inside_str = 0;
        }
        else if (*p == '(' && !inside_str) {
          ++depth;
        }
        else if (*p == ')' && !inside_str) {
          if (depth == 0) return p;
          else            --depth;
        }
        ++p;
      }
      // unreachable
      return 0;
    }
  }
}
