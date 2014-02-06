#define SASS_DOCUMENT

#include <map>

#ifndef SASS_PRELEXER
#include "prelexer.hpp"
#endif

#ifndef SASS_NODE
#include "node.hpp"
#endif

#ifndef SASS_CONTEXT
#include "context.hpp"
#endif

struct Selector_Lookahead {
  const char* found;
  bool has_interpolants;
};

namespace Sass {
  using std::string;
  using std::vector;
  using std::map;
  using namespace Prelexer;

  struct Document {
    enum CSS_Style { nested, expanded, compact, compressed, echo };

    string path;
    const char* source;
    const char* position;
    const char* end;
    size_t line;
    bool own_source;

    Context& context;

    Node root;
    Token lexed;

  private:
    // force the use of the "make_from_..." factory funtions
    Document(Context& ctx);
  public:
    Document(const Document& doc);
    ~Document();

    static Document make_from_file(Context& ctx, string path);
    static Document make_from_source_chars(Context& ctx, const char* src, string path = "", bool own_source = false);
    static Document make_from_token(Context& ctx, Token t, string path = "", size_t line_number = 1);

    template <prelexer mx>
    const char* peek(const char* start = 0)
    {
      if (!start) start = position;
      const char* after_whitespace;
      if (mx == block_comment) {
        after_whitespace = // start;
          zero_plus< alternatives<spaces, line_comment> >(start);
      }
      else if (/*mx == ancestor_of ||*/ mx == no_spaces) {
        after_whitespace = position;
      }
      else if (mx == spaces || mx == ancestor_of) {
        after_whitespace = mx(start);
        if (after_whitespace) {
          return after_whitespace;
        }
        else {
          return 0;
        }
      }
      else if (mx == optional_spaces) {
        after_whitespace = optional_spaces(start);
      }
      else {
        after_whitespace = spaces_and_comments(start);
      }
      const char* after_token = mx(after_whitespace);
      if (after_token) {
        return after_token;
      }
      else {
        return 0;
      }
    }

    template <prelexer mx>
    const char* lex()
    {
      const char* after_whitespace;
      if (mx == block_comment) {
        after_whitespace = // position;
          zero_plus< alternatives<spaces, line_comment> >(position);
      }
      else if (mx == ancestor_of || mx == no_spaces) {
        after_whitespace = position;
      }
      else if (mx == spaces) {
        after_whitespace = spaces(position);
        if (after_whitespace) {
          line += count_interval<'\n'>(position, after_whitespace);
          lexed = Token::make(position, after_whitespace);
          return position = after_whitespace;
        }
        else {
          return 0;
        }
      }
      else if (mx == optional_spaces) {
        after_whitespace = optional_spaces(position);
      }
      else {
        after_whitespace = spaces_and_comments(position);
      }
      const char* after_token = mx(after_whitespace);
      if (after_token) {
        line += count_interval<'\n'>(position, after_token);
        lexed = Token::make(after_whitespace, after_token);
        return position = after_token;
      }
      else {
        return 0;
      }
    }

    void read_bom();

    void parse_scss();
    Node parse_import();
    Node parse_include();
    Node parse_mixin_definition();
    Node parse_function_definition();
    Node parse_parameters();
    Node parse_parameter(Node::Type);
    Node parse_mixin_call(Node::Type inside_of = Node::none);
    Node parse_arguments();
    Node parse_argument(Node::Type);
    Node parse_assignment();
    Node parse_propset();
    Node parse_ruleset(Selector_Lookahead lookahead, Node::Type inside_of = Node::none);
    Node parse_selector_schema(const char* end_of_selector);
    Node parse_selector_group();
    Node parse_selector();
    Node parse_selector_combinator();
    Node parse_simple_selector_sequence();
    Node parse_simple_selector();
    Node parse_pseudo();
    Node parse_attribute_selector();
    Node parse_block(Node surrounding_ruleset, Node::Type inside_of = Node::none);
    Node parse_rule();
    Node parse_values();
    Node parse_list();
    Node parse_comma_list();
    Node parse_space_list();
    Node parse_disjunction();
    Node parse_conjunction();
    Node parse_relation();
    Node parse_expression();
    Node parse_term();
    Node parse_factor();
    Node parse_value();
    Node parse_function_call();
    Node parse_string();
    Node parse_value_schema();
    Node parse_identifier_schema();
    Node parse_url_schema();
    Node parse_if_directive(Node surrounding_ruleset, Node::Type inside_of = Node::none);
    Node parse_for_directive(Node surrounding_ruleset, Node::Type inside_of = Node::none);
    Node parse_each_directive(Node surrounding_ruleset, Node::Type inside_of = Node::none);
    Node parse_while_directive(Node surrounding_ruleset, Node::Type inside_of = Node::none);
    Node parse_directive(Node surrounding_ruleset, Node::Type inside_of = Node::none);
    Node parse_keyframes(Node::Type inside_of = Node::none);
    Node parse_keyframe(Node::Type inside_of = Node::none);
    Node parse_media_query(Node::Type inside_of = Node::none);
    Node parse_media_expression();
    Node parse_warning();

    Selector_Lookahead lookahead_for_selector(const char* start = 0);
    Selector_Lookahead lookahead_for_extension_target(const char* start = 0);

    void throw_syntax_error(string message, size_t ln = 0);
    void throw_read_error(string message, size_t ln = 0);

    string emit_css(CSS_Style style);

  };

  size_t check_bom_chars(const char* src, const unsigned char* bom, size_t len);
}
