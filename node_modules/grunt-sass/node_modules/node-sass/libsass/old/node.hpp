#define SASS_NODE

#include <cstring>
#include <string>
#include <vector>
#include <iostream>

union Sass_Value;
namespace Sass {
  using namespace std;

  // Token type for representing lexed chunks of text
  struct Token {
    const char* begin;
    const char* end;

    // Need Token::make(...) because tokens are union members, and hence they
    // can't have non-trivial constructors.
    static Token make()
    {
      Token t;
      t.begin = 0;
      t.end = 0;
      return t;
    }

    static Token make(const char* s)
    {
      Token t;
      t.begin = s;
      t.end = s + std::strlen(s);
      return t;
    }

    static Token make(const char* b, const char* e)
    {
      Token t;
      t.begin = b;
      t.end = e;
      return t;
    }

    size_t length() const
    { return end - begin; }

    string to_string() const
    { return string(begin, end - begin); }

    string unquote() const;
    void   unquote_to_stream(std::stringstream& buf) const;

    operator bool()
    { return begin && end && begin >= end; }

    bool operator<(const Token& rhs) const;
    bool operator==(const Token& rhs) const;
  };

  struct Dimension {
    double numeric;
    Token unit;
  };

  struct Node_Impl;

  // Node type for representing SCSS expression nodes. Really just a handle.
  class Node {
  private:
    friend class Node_Factory;
    Node_Impl* ip_;

  public:
   enum Type {
      none,
      any,
      numeric,  // number, numeric_percentage, or numeric_dimension
      string_t, // string_constant, identifier, concatenation, schemata
      comment,

      root,
      ruleset,
      propset,
      media_query,

      keyframes,
      keyframe,

      selector_group,
      selector,
      selector_combinator,
      simple_selector_sequence,
      backref,
      simple_selector,
      type_selector,
      class_selector,
      id_selector,
      pseudo,
      pseudo_negation,
      functional_pseudo,
      attribute_selector,
      selector_schema,

      media_expression_group,
      media_expression,

      block,
      rule,
      property,

      list,

      disjunction,
      conjunction,

      relation,
      eq,
      neq,
      gt,
      gte,
      lt,
      lte,

      expression,
      add,
      sub,

      term,
      mul,
      div,
      mod,

      factor,
      unary_plus,
      unary_minus,
      values,
      value,
      identifier,
      uri,
      textual_percentage,
      textual_dimension,
      textual_number,
      textual_hex,
      color_name,
      string_constant,
      concatenation,
      number,
      numeric_percentage,
      numeric_dimension,
      numeric_color,
      ie_hex_str,
      boolean,
      important,

      value_schema,
      string_schema,
      identifier_schema,

      css_import,
      function,
      function_call,
      mixin,
      mixin_call,
      mixin_content,
      parameters,
      arguments,
      rest,

      extend_directive,

      if_directive,
      for_through_directive,
      for_to_directive,
      each_directive,
      while_directive,
      return_directive,
      content_directive,

      warning,

      block_directive,
      blockless_directive,

      variable,
      assignment
    };

    Node(Node_Impl* ip = 0);

    Type type() const;
    Type type(Type);

    bool has_children() const;
    bool has_statements() const;
    bool has_comments() const;
    bool has_blocks() const;
    bool has_expansions() const;
    bool has_backref() const;
    bool from_variable() const;
    bool& should_eval() const;
    bool& is_quoted() const;
    bool is_numeric() const;
    bool is_string() const; // for all string-like types
    bool is_schema() const; // for all interpolated data
    bool is_guarded() const;
    bool& has_been_extended() const;
    bool is_false() const;
    bool& is_comma_separated() const;
    bool& is_arglist() const;
    bool& is_splat() const;

    string& path() const;
    string debug_info_path() const;
    size_t line() const;
    size_t size() const;
    bool empty() const;

    Node& at(size_t i) const;
    Node& back() const;
    Node& operator[](size_t i) const;
    void  pop_back();
    void  pop_all();
    Node& push_back(Node n);
    Node& push_front(Node n);
    Node& operator<<(Node n);
    Node& operator+=(Node n);

    vector<Node>::iterator begin() const;
    vector<Node>::iterator end() const;
    void insert(vector<Node>::iterator position,
                vector<Node>::iterator first,
                vector<Node>::iterator last);

    bool   boolean_value() const;
    double numeric_value() const;
    Token  token() const;
    Token  unit() const;

    bool is_null() const { return !ip_; }
    bool is(Node n) const { return ip_ == n.ip_; }

    void flatten();

    string unquote() const;

    bool operator==(Node rhs) const;
    bool operator!=(Node rhs) const;
    bool operator<(Node rhs) const;
    bool operator<=(Node rhs) const;
    bool operator>(Node rhs) const;
    bool operator>=(Node rhs) const;

    string to_string(Type inside_of = none, const string space = " ", const bool in_media_feature = false) const;
    void emit_nested_css(stringstream& buf, size_t depth, bool at_toplevel = false, bool in_media_query = false, int source_comments = false);
    void emit_propset(stringstream& buf, size_t depth, const string& prefix, const bool compressed = false);
    void echo(stringstream& buf, size_t depth = 0);
    void emit_expanded_css(stringstream& buf, const string& prefix);
    void emit_compressed_css(stringstream& buf);

    Sass_Value to_c_val();
  };

  // The actual implementation object for Nodes; Node handles point at these.
  struct Node_Impl {
    union value_t {
      bool         boolean;
      double       numeric;
      Token        token;
      Dimension    dimension;
    } value;

    // TO DO: look into using a custom allocator in the Node_Factory class
    vector<Node> children; // Can't be in the union because it has non-trivial constructors!

    string path;
    size_t line;

    Node::Type type;

    bool has_children;
    bool has_statements;
    bool has_comments;
    bool has_blocks;
    bool has_expansions;
    bool has_backref;
    bool from_variable;
    bool should_eval;
    bool is_quoted;
    bool has_been_extended;
    bool is_comma_separated;
    bool is_arglist;
    bool is_splat;

    Node_Impl()
    : /* value(value_t()),
      children(vector<Node>()),
      path(string()),
      line(0),
      type(Node::none), */
      has_children(false),
      has_statements(false),
      has_comments(false),
      has_blocks(false),
      has_expansions(false),
      has_backref(false),
      from_variable(false),
      should_eval(false),
      is_quoted(false),
      has_been_extended(false),
      is_comma_separated(false),
      is_arglist(false),
      is_splat(false)
    { }

    bool is_numeric()
    { return type >= Node::number && type <= Node::numeric_dimension; }

    bool is_string()
    {
      switch (type)
      {
        case Node::string_t:
        case Node::identifier:
        case Node::value_schema:
        case Node::identifier_schema:
        case Node::string_constant:
        case Node::string_schema:
        case Node::concatenation: {
          return true;
        } break;

        default: {
          return false;
        } break;
      }
      return false;
    }

    bool is_schema()
    {
      switch (type)
      {
        case Node::selector_schema:
        case Node::value_schema:
        case Node::string_schema:
        case Node::identifier_schema: {
          return true;
        } break;

        default: {
          return false;
        } break;
      }
      return false;
    }

    size_t size()
    { return children.size(); }

    bool empty()
    { return children.empty(); }

    Node& at(size_t i)
    { return children.at(i); }

    Node& back()
    { return children.back(); }

    void push_back(const Node& n)
    {
      children.push_back(n);
      has_children = true;
      if (n.is_null()) return;
      switch (n.type())
      {
        case Node::comment: {
          has_comments = true;
        } break;

        case Node::css_import:
        case Node::rule:
        case Node::propset:
        case Node::warning:
        case Node::keyframe:
        case Node::block_directive:
        case Node::blockless_directive: {
          has_statements = true;
        } break;

        case Node::media_query:
        case Node::keyframes:
        case Node::ruleset: {
          has_blocks = true;
        } break;

        case Node::block:
        case Node::if_directive:
        case Node::for_through_directive:
        case Node::for_to_directive:
        case Node::each_directive:
        case Node::while_directive:
        case Node::mixin_call:
        case Node::mixin_content: {
          has_expansions = true;
        } break;

        case Node::backref: {
          has_backref = true;
        } break;

        default: break;
      }
      if (n.has_backref()) has_backref = true;
    }

    void push_front(const Node& n)
    {
      children.insert(children.begin(), n);
      has_children = true;
      switch (n.type())
      {
        case Node::comment:       has_comments   = true; break;

        case Node::css_import:
        case Node::rule:
        case Node::propset:       has_statements = true; break;

        case Node::media_query:
        case Node::keyframes:
        case Node::ruleset:       has_blocks     = true; break;

        case Node::if_directive:
        case Node::for_through_directive:
        case Node::for_to_directive:
        case Node::each_directive:
        case Node::while_directive:
        case Node::mixin_call:
        case Node::mixin_content: has_expansions = true; break;

        case Node::backref:       has_backref    = true; break;

        default:                                         break;
      }
      if (n.has_backref()) has_backref = true;
    }

    void pop_back()
    { children.pop_back(); }

    void pop_all()
    { for (size_t i = 0, S = size(); i < S; ++i) pop_back(); }

    bool& boolean_value()
    { return value.boolean; }

    double numeric_value();
    Token  unit();
  };


  // ------------------------------------------------------------------------
  // Node method implementations
  // -- in the header file so they can easily be declared inline
  // -- outside of their class definition to get the right declaration order
  // ------------------------------------------------------------------------

  inline Node::Node(Node_Impl* ip) : ip_(ip) { }

  inline Node::Type Node::type() const    { return ip_->type; }
  inline Node::Type Node::type(Type t)    { return ip_->type = t; }

  inline bool Node::has_children() const   { return ip_->has_children; }
  inline bool Node::has_statements() const { return ip_->has_statements; }
  inline bool Node::has_comments() const   { return ip_->has_comments; }
  inline bool Node::has_blocks() const     { return ip_->has_blocks; }
  inline bool Node::has_expansions() const { return ip_->has_expansions; }
  inline bool Node::has_backref() const    { return ip_->has_backref; }
  inline bool Node::from_variable() const  { return ip_->from_variable; }
  inline bool& Node::should_eval() const   { return ip_->should_eval; }
  inline bool& Node::is_quoted() const     { return ip_->is_quoted; }
  inline bool Node::is_numeric() const     { return ip_->is_numeric(); }
  inline bool Node::is_string() const      { return ip_->is_string(); }
  inline bool Node::is_schema() const      { return ip_->is_schema(); }
  inline bool Node::is_guarded() const     { return (type() == assignment) && (size() == 3); }
  inline bool& Node::has_been_extended() const { return ip_->has_been_extended; }
  inline bool Node::is_false() const       { return (type() == boolean) && (boolean_value() == false); }
  inline bool& Node::is_comma_separated() const { return ip_->is_comma_separated; }
  inline bool& Node::is_arglist() const    { return ip_->is_arglist; }
  inline bool& Node::is_splat() const      { return ip_->is_splat; }

  inline string& Node::path() const  { return ip_->path; }
  inline size_t  Node::line() const  { return ip_->line; }
  inline size_t  Node::size() const  { return ip_->size(); }
  inline bool    Node::empty() const { return ip_->empty(); }

  inline Node& Node::at(size_t i) const         { return ip_->at(i); }
  inline Node& Node::back() const               { return ip_->back(); }
  inline Node& Node::operator[](size_t i) const { return at(i); }
  inline void  Node::pop_back()                 { ip_->pop_back(); }
  inline void  Node::pop_all()                  { ip_->pop_all(); }
  inline Node& Node::push_back(Node n)
  {
    ip_->push_back(n);
    return *this;
  }
  inline Node& Node::push_front(Node n)
  {
    ip_->push_front(n);
    return *this;
  }
  inline Node& Node::operator<<(Node n)         { return push_back(n); }
  inline Node& Node::operator+=(Node n)
  {
    for (size_t i = 0, L = n.size(); i < L; ++i) push_back(n[i]);
    return *this;
  }

  inline vector<Node>::iterator Node::begin() const
  { return ip_->children.begin(); }
  inline vector<Node>::iterator Node::end() const
  { return ip_->children.end(); }
  inline void Node::insert(vector<Node>::iterator position,
                           vector<Node>::iterator first,
                           vector<Node>::iterator last)
  { ip_->children.insert(position, first, last); }

  inline bool   Node::boolean_value() const { return ip_->boolean_value(); }
  inline double Node::numeric_value() const { return ip_->numeric_value(); }
  inline Token  Node::token() const         { return ip_->value.token; }
  inline Token  Node::unit() const          { return ip_->unit(); }
}
