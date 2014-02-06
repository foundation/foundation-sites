#define SASS_AST

#define ATTACH_OPERATION(type) \
virtual type perform(Operation<type>* op) { return (*op)(this); }

#define ADD_PROPERTY(type, name)\
private:\
  type name##_;\
public:\
  type name() const        { return name##_; }\
  type name(type name##__) { return name##_ = name##__; }\
private:

#include <string>
#include <sstream>
#include <vector>

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

namespace Sass {
  using namespace std;

  //////////////////////////////////////////////////////////
  // Abstract base class for all abstract syntax tree nodes.
  //////////////////////////////////////////////////////////
  struct AST_Node {
    string path;
    size_t line;

    AST_Node(string p, size_t l) : path(p), line(l) { }
    virtual ~AST_Node() = 0;
    ATTACH_OPERATIONS();
  };
  inline AST_Node::~AST_Node() { }

  /////////////////////////////////////////////////////////////////////////
  // Abstract base class for statements. This side of the AST hierarchy
  // represents elements in expansion contexts, which exist primarily to be
  // rewritten and macro-expanded.
  /////////////////////////////////////////////////////////////////////////
  struct Statement : public AST_Node {
    Statement(string p, size_t l)
    : AST_Node(p, l) { }
    virtual ~Statement() = 0;
    // needed for rearranging nested rulesets during CSS emission
    virtual bool hoistable() { return false; }
  };
  inline Statement::~Statement() { }

  ////////////////////////
  // Blocks of statements.
  ////////////////////////
  struct Block : public Statement {
    vector<Statement*> statements;
    bool               is_root;
    // needed for properly formatted CSS emission
    bool               has_hoistable;
    bool               has_non_hoistable;

    Block(string p, size_t l, size_t size = 0, bool root = false)
    : Statement(p, l), statements(vector<Statement*>()), is_root(root)
    { statements.reserve(size); }

    size_t length() const
    { return statements.size(); }
    Statement*& operator[](size_t i)
    { return statements[i]; }
    Block& operator<<(Statement* s)
    {
      statements.push_back(s);
      if (s->hoistable()) has_hoistable     = true;
      else                has_non_hoistable = true;
      return *this;
    }
    Block& operator+=(Block* b)
    {
      for (size_t i = 0, L = b->length(); i < L; ++i) *this << (*b)[i];
      return *this;
    }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////
  // Abstract base class for statements that contain blocks of statements.
  ////////////////////////////////////////////////////////////////////////
  struct Has_Block : public Statement {
    Block* block;
    Has_Block(string p, size_t l, Block* b)
    : Statement(p, l), block(b)
    { }
    virtual ~Has_Block() = 0;
  };
  inline Has_Block::~Has_Block() { }

  /////////////////////////////////////////////////////////////////////////////
  // Rulesets (i.e., sets of styles headed by a selector and containing a block
  // of style declarations.
  /////////////////////////////////////////////////////////////////////////////
  struct Selector;
  struct Ruleset : public Has_Block {
    Selector* selector;

    Ruleset(string p, size_t l, Selector* s, Block* b)
    : Has_Block(p, l, b), selector(s)
    { }
    // nested rulesets need to be hoisted out of their enclosing blocks
    bool hoistable() { return true; }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////
  // Nested declaration sets (i.e., namespaced properties).
  /////////////////////////////////////////////////////////
  struct String;
  struct Propset : public Has_Block {
    String* property_fragment;

    Propset(string p, size_t l, String* pf, Block* b)
    : Has_Block(p, l, b), property_fragment(pf)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////
  // Media queries.
  /////////////////
  struct List;
  struct Media_Query : public Has_Block {
    List* query_list;

    Media_Query(string p, size_t l, List* q, Block* b)
    : Has_Block(p, l, b), query_list(q)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////////////////////////
  // Directives -- arbitrary rules beginning with "@" that may have an optional
  // statement block.
  /////////////////////////////////////////////////////////////////////////////
  struct Directive : public Has_Block {
    string    keyword;
    Selector* selector;

    Directive(string p, size_t l,
              string kwd, Selector* sel, Block* b)
    : Has_Block(p, l, b), keyword(kwd), selector(sel)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////
  // Declarations -- style rules consisting of a property name and values.
  ////////////////////////////////////////////////////////////////////////
  struct Declaration : public Statement {
    String* property;
    List*   values;

    Declaration(string p, size_t l, String* prop, List* vals)
    : Statement(p, l), property(prop), values(vals)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////
  // Assignments -- variable and value.
  /////////////////////////////////////
  struct Variable;
  struct Expression;
  struct Assignment : public Statement {
    string variable;
    Expression* value;
    bool   is_guarded;

    Assignment(string p, size_t l,
               string var, Expression* val, bool guarded = false)
    : Statement(p, l), variable(var), value(val), is_guarded(guarded)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////////////////////////
  // CSS import directives. CSS url imports need to be distinguished from Sass
  // file imports. T should be instantiated with Function_Call or String.
  /////////////////////////////////////////////////////////////////////////////
  template <typename T>
  struct Import : public Statement {
    T* location;

    Import(string p, size_t l, T* loc)
    : Statement(p, l), location(loc)
    { }
    ATTACH_OPERATIONS();
  };

  //////////////////////////////
  // The Sass `@warn` directive.
  //////////////////////////////
  struct Warning : public Statement {
    Expression* message;

    Warning(string p, size_t l, Expression* msg)
    : Statement(p, l), message(msg)
    { }
    ATTACH_OPERATIONS();
  };

  ///////////////////////////////////////////
  // CSS comments. These may be interpolated.
  ///////////////////////////////////////////
  struct Comment : public Statement {
    String* text;

    Comment(string p, size_t l, String* txt)
    : Statement(p, l), text(txt)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////
  // The Sass `@if` control directive.
  ////////////////////////////////////
  struct If : public Statement {
    Expression* predicate;
    Block* consequent;
    Block* alternative;

    If(string p, size_t l, Expression* pred, Block* con, Block* alt = 0)
    : Statement(p, l), predicate(pred), consequent(con), alternative(alt)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////
  // The Sass `@for` control directive.
  /////////////////////////////////////
  struct For : public Has_Block {
    string variable;
    Expression* lower_bound;
    Expression* upper_bound;
    bool   is_inclusive;

    For(string p, size_t l,
        string var, Expression* lo, Expression* hi, Block* b, bool inc)
    : Has_Block(p, l, b),
      variable(var), lower_bound(lo), upper_bound(hi), is_inclusive(inc)
    { }
    ATTACH_OPERATIONS();
  };

  //////////////////////////////////////
  // The Sass `@each` control directive.
  //////////////////////////////////////
  struct Each : public Has_Block {
    string variable;
    Expression* list;

    Each(string p, size_t l, string var, Expression* lst, Block* b)
    : Has_Block(p, l, b), variable(var), list(lst)
    { }
    ATTACH_OPERATIONS();
  };

  ///////////////////////////////////////
  // The Sass `@while` control directive.
  ///////////////////////////////////////
  struct While : public Has_Block {
    Expression* predicate;

    While(string p, size_t l, Expression* pred, Block* b)
    : Has_Block(p, l, b), predicate(pred)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////
  // The Sass `@extend` directive.
  ////////////////////////////////
  struct Extend : public Statement {
    Selector* selector;

    Extend(string p, size_t l, Selector* s)
    : Statement(p, l), selector(s)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////////
  // Definitions for both mixins and functions. Templatized to avoid type-tags
  // and unnecessary subclassing.
  ////////////////////////////////////////////////////////////////////////////
  struct Parameters;
  enum Definition_Type { MIXIN, FUNCTION };
  template <Definition_Type t>
  struct Definition : public Has_Block {
    string      name;
    Parameters* parameters;

    Definition(string p, size_t l,
               string n, Parameters* params, Block* b)
    : Has_Block(p, l, b), name(n), parameters(params)
    { }
    ATTACH_OPERATIONS();
  };

  //////////////////////////////////////
  // Mixin calls (i.e., `@include ...`).
  //////////////////////////////////////
  struct Arguments;
  struct Mixin_Call : public Has_Block {
    string name;
    Arguments* arguments;

    Mixin_Call(string p, size_t l, string n, Arguments* args, Block* b = 0)
    : Has_Block(p, l, b), name(n), arguments(args)
    { }
    ATTACH_OPERATIONS();
  };

  //////////////////////////////////////////////////////////////////////
  // Abstract base class for expressions. This side of the AST hierarchy
  // represents elements in value contexts, which exist primarily to be
  // evaluated and returned.
  //////////////////////////////////////////////////////////////////////
  struct Expression : public AST_Node {
    bool delayed;       // expressions in some contexts shouldn't be evaluated
    bool parenthesized; // for media features, if I recall

    Expression(string p, size_t l)
    : AST_Node(p, l), delayed(false), parenthesized(false)
    { }
    virtual ~Expression() = 0;
    virtual string type() { return ""; /* TODO: raise an error */ }
  };
  inline Expression::~Expression() { }

  ///////////////////////////////////////////////////////////////////////
  // Lists of values, both comma- and space-separated (distinguished by a
  // type-tag.) Also used to represent variable-length argument lists.
  ///////////////////////////////////////////////////////////////////////
  struct List : public Expression {
    enum Separator { space, comma };
    vector<Expression*> values;
    Separator           separator;
    bool                is_arglist;

    List(string p, size_t l,
         size_t size = 0, Separator sep = space, bool argl = false)
    : Expression(p, l),
      values(vector<Expression*>()), separator(sep), is_arglist(argl)
    { values.reserve(size); }

    size_t length() const
    { return values.size(); }
    Expression*& operator[](size_t i)
    { return values[i]; }
    List& operator<<(Expression* v)
    {
      values.push_back(v);
      return *this;
    }
    List& operator+=(List* l)
    {
      for (size_t i = 0, L = l->length(); i < L; ++i)
        values.push_back((*l)[i]);
      return *this;
    }
    string type() { return is_arglist ? "arglist" : "list"; }
    ATTACH_OPERATIONS();
  };

  //////////////////////////////////////////////////////////////////////////
  // Binary expressions. Represents logical, relational, and arithmetic
  // operations. Templatized to avoid large switch statements and repetitive
  // subclassing.
  //////////////////////////////////////////////////////////////////////////
  enum Binary_Operator {
    AND, OR,                   // logical connectives
    EQ, NEQ, GT, GTE, LT, LTE, // arithmetic relations
    ADD, SUB, MUL, DIV         // arithmetic functions
  };
  template<Binary_Operator oper>
  struct Binary_Expression : public Expression {
    Expression* left;
    Expression* right;

    Binary_Expression(string p, size_t l, Expression* lhs, Expression* rhs)
    : Expression(p, l), left(lhs), right(rhs)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////////
  // Arithmetic negation (logical negation is just an ordinary function call).
  ////////////////////////////////////////////////////////////////////////////
  struct Negation : public Expression {
    Expression* operand;
    Negation(string p, size_t l, Expression* o)
    : Expression(p, l), operand(o)
    { }
    ATTACH_OPERATIONS();
  };

  //////////////////
  // Function calls.
  //////////////////
  struct Function_Call : public Expression {
    String*    name;
    Arguments* arguments;

    Function_Call(string p, size_t l, String* n, Arguments* args)
    : Expression(p, l), name(n), arguments(args)
    { }
    ATTACH_OPERATIONS();
  };

  ///////////////////////
  // Variable references.
  ///////////////////////
  struct Variable : public Expression {
    string name;

    Variable(string p, size_t l, string n)
    : Expression(p, l), name(n)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////////////////////////
  // Textual (i.e., unevaluated) numeric data. Templated to avoid type-tags and
  // repetitive subclassing.
  /////////////////////////////////////////////////////////////////////////////
  enum Textual_Type { NUMBER, PERCENTAGE, DIMENSION, HEX };
  template <Textual_Type t>
  struct Textual : public Expression {
    string value;

    Textual(string p, size_t l, string val)
    : Expression(p, l), value(val)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////
  // Numbers, percentages, dimensions, and colors.
  ////////////////////////////////////////////////
  struct Numeric : public Expression {
    double value;
    Numeric(string p, size_t l, double val) : Expression(p, l), value(val) { }
    virtual ~Numeric() = 0;
    string type() { return "number"; }
  };
  inline Numeric::~Numeric() { }
  struct Number : public Numeric {
    Number(string p, size_t l, double val) : Numeric(p, l, val) { }
    ATTACH_OPERATIONS();
  };
  struct Percentage : public Numeric {
    Percentage(string p, size_t l, double val) : Numeric(p, l, val) { }
    ATTACH_OPERATIONS();
  };
  struct Dimension : public Numeric {
    vector<string> numerator_units;
    vector<string> denominator_units;
    Dimension(string p, size_t l, double val, string unit)
    : Numeric(p, l, val),
      numerator_units(vector<string>()),
      denominator_units(vector<string>())
    { numerator_units.push_back(unit); }
    ATTACH_OPERATIONS();
  };

  //////////
  // Colors.
  //////////
  struct Color : public Expression {
    double r, g, b, a;
    Color(string p, size_t l, double r, double g, double b, double a = 1)
    : Expression(p, l), r(r), g(g), b(b), a(a)
    { }
    string type() { return "color"; }
    ATTACH_OPERATIONS();
  };

  ////////////
  // Booleans.
  ////////////
  struct Boolean : public Expression {
    bool value;
    Boolean(string p, size_t l, bool val) : Expression(p, l), value(val) { }
    string type() { return "bool"; }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////
  // Abstract base class for Sass string values. Includes interpolated and
  // "flat" strings.
  ////////////////////////////////////////////////////////////////////////
  struct String : public Expression {
    String(string p, size_t l) : Expression(p, l) { }
    virtual ~String() = 0;
  };
  inline String::~String() { };

  ///////////////////////////////////////////////////////////////////////
  // Interpolated strings. Meant to be reduced to flat strings during the
  // evaluation phase.
  ///////////////////////////////////////////////////////////////////////
  struct String_Schema : public String {
    vector<Expression*> fragments;

    String_Schema(string p, size_t l, size_t size = 0)
    : String(p, l), fragments(vector<Expression*>())
    { fragments.reserve(size); }

    size_t length() const
    { return fragments.size(); }
    Expression*& operator[](size_t i)
    { return fragments[i]; }
    String_Schema& operator<<(Expression* v)
    {
      fragments.push_back(v);
      return *this;
    }
    String_Schema& operator+=(String_Schema* s)
    {
      for (size_t i = 0, L = s->length(); i < L; ++i)
        fragments.push_back((*s)[i]);
      return *this;
    }
    string type() { return "string"; }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////
  // Flat strings -- the lowest level of raw textual data.
  ////////////////////////////////////////////////////////
  struct String_Constant : public String {
    string value;

    String_Constant(string p, size_t l, string val)
    : String(p, l), value(val)
    { }
    String_Constant(string p, size_t l, const char* beg)
    : String(p, l), value(string(beg))
    { }
    String_Constant(string p, size_t l, const char* beg, const char* end)
    : String(p, l), value(string(beg, end-beg))
    { }
    string type() { return "string"; }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////
  // Individual parameter objects for mixins and functions.
  /////////////////////////////////////////////////////////
  struct Parameter : public AST_Node {
    string name;
    Expression* default_value;
    bool is_rest_parameter;

    Parameter(string p, size_t l,
              string n, Expression* def = 0, bool rest = false)
    : AST_Node(p, l), name(n), default_value(def), is_rest_parameter(rest)
    { /* TO-DO: error if default_value && is_packed */ }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////////////////////
  // Parameter lists -- in their own class to facilitate context-sensitive
  // error checking (e.g., ensuring that all optional parameters follow all
  // required parameters).
  /////////////////////////////////////////////////////////////////////////
  struct Parameters : public AST_Node {
    vector<Parameter*> list;
    bool has_optional_parameters, has_rest_parameter;

    Parameters(string p, size_t l)
    : AST_Node(p, l),
      has_optional_parameters(false), has_rest_parameter(false)
    { }

    size_t length() { return list.size(); }
    Parameter*& operator[](size_t i) { return list[i]; }

    Parameters& operator<<(Parameter* p)
    {
      if (p->default_value) {
        if (has_rest_parameter)
          ; // error
        has_optional_parameters = true;
      }
      else if (p->is_rest_parameter) {
        if (has_rest_parameter)
          ; // error
        if (has_optional_parameters)
          ; // different error
        has_rest_parameter = true;
      }
      else {
        if (has_rest_parameter)
          ; // error
        if (has_optional_parameters)
          ; // different error
      }
      list.push_back(p);
      return *this;
    }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////
  // Individual argument objects for mixin and function calls.
  ////////////////////////////////////////////////////////////
  struct Argument : public AST_Node {
    Expression* value;
    string name;
    bool is_rest_argument;

    Argument(string p, size_t l, Expression* val, string n = "", bool rest = false)
    : AST_Node(p, l), value(val), name(n), is_rest_argument(rest)
    { if (name != "" && is_rest_argument) { /* error */ } }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////
  // Argument lists -- in their own class to facilitate context-sensitive
  // error checking (e.g., ensuring that all ordinal arguments precede all
  // named arguments).
  ////////////////////////////////////////////////////////////////////////
  struct Arguments : public AST_Node {
    vector<Argument*> list;
    bool has_named_arguments, has_rest_argument;

    Arguments(string p, size_t l)
    : AST_Node(p, l),
      has_named_arguments(false), has_rest_argument(false)
    { }

    size_t length() { return list.size(); }
    Argument*& operator[](size_t i) { return list[i]; }

    Arguments& operator<<(Argument* a)
    {
      if (!a->name.empty()) {
        if (has_rest_argument)
          ; // error
        has_named_arguments = true;
      }
      else if (a->is_rest_argument) {
        if (has_rest_argument)
          ; // error
        if (has_named_arguments)
          ; // different error
        has_rest_argument = true;
      }
      else {
        if (has_rest_argument)
          ; // error
        if (has_named_arguments)
          ; // error
      }
      list.push_back(a);
      return *this;
    }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////
  // Abstract base class for CSS selectors.
  /////////////////////////////////////////
  struct Selector : public AST_Node {
    Selector(string p, size_t l) : AST_Node(p, l) { }
    virtual ~Selector() = 0;
  };
  inline Selector::~Selector() { }

  /////////////////////////////////////////////////////////////////////////
  // Interpolated selectors -- the interpolated String will be expanded and
  // re-parsed into a normal selector structure.
  /////////////////////////////////////////////////////////////////////////
  struct Interpolated : Selector {
    String* selector;

    Interpolated(string p, size_t l, String* cont)
    : Selector(p, l), selector(cont)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////
  // Abstract base class for atomic selectors.
  ////////////////////////////////////////////
  struct Simple_Base : public Selector {
    Simple_Base(string p, size_t l) : Selector(p, l) { }
    virtual ~Simple_Base() = 0;
  };
  inline Simple_Base::~Simple_Base() { }

  //////////////////////////////////////////////////////////////////////
  // Normal simple selectors (e.g., "div", ".foo", ":first-child", etc).
  //////////////////////////////////////////////////////////////////////
  struct Simple : public Simple_Base {
    string selector;

    Simple(string p, size_t l, string cont)
    : Simple_Base(p, l), selector(cont)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////
  // Parent references (i.e., the "&").
  /////////////////////////////////////
  struct Reference : public Simple_Base {
    Reference(string p, size_t l) : Simple_Base(p, l) { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////////////////////////////
  // Placeholder selectors (e.g., "%foo") for use in extend-only selectors.
  /////////////////////////////////////////////////////////////////////////
  struct Placeholder : public Simple_Base {
    Placeholder(string p, size_t l) : Simple_Base(p, l) { }
    ATTACH_OPERATIONS();
  };

  //////////////////////////////////////////////////////////////////
  // Pseudo selectors -- e.g., :first-child, :nth-of-type(...), etc.
  //////////////////////////////////////////////////////////////////
  struct Pseudo : public Simple_Base {
    string name;
    Expression* expression;
    Pseudo(string p, size_t l, string n, Expression* expr = 0)
    : Simple_Base(p, l), name(n), expression(expr)
    { }
    ATTACH_OPERATIONS();
  };

  /////////////////////////////////////////////////
  // Negated selector -- e.g., :not(:first-of-type)
  /////////////////////////////////////////////////
  struct Negated : public Simple_Base {
    Simple_Base* selector;
    Negated(string p, size_t l, Simple_Base* sel)
    : Simple_Base(p, l), selector(sel)
    { }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////////
  // Simple selector sequences. Maintains flags indicating whether it contains
  // any parent references or placeholders, to simplify expansion.
  ////////////////////////////////////////////////////////////////////////////
  struct Sequence : Selector {
    vector<Simple_Base*> selectors;
    bool                 has_reference;
    bool                 has_placeholder;

    Sequence(string p, size_t l, size_t s)
    : Selector(p, l),
      selectors(vector<Simple_Base*>()),
      has_reference(false),
      has_placeholder(false)
    { selectors.reserve(s); }

    size_t length()
    { return selectors.size(); }
    Simple_Base*& operator[](size_t i)
    { return selectors[i]; }
    Sequence& operator<<(Simple_Base* s)
    {
      selectors.push_back(s);
      return *this;
    }
    Sequence& operator<<(Reference* s)
    {
      has_reference = true;
      return (*this) << s;
    }
    Sequence& operator<<(Placeholder* p)
    {
      has_placeholder = true;
      return (*this) << p;
    }
    Sequence& operator+=(Sequence* seq)
    {
      for (size_t i = 0, L = seq->length(); i < L; ++i) *this << (*seq)[i];
      return *this;
    }
    ATTACH_OPERATIONS();
  };

  ////////////////////////////////////////////////////////////////////////////
  // General selectors -- i.e., simple sequences combined with one of the four
  // CSS selector combinators (">", "+", "~", and whitespace). Isomorphic to a
  // left-associative linked list.
  ////////////////////////////////////////////////////////////////////////////
  struct Combination : Selector {
    enum Combinator { ANCESTOR_OF, PARENT_OF, PRECEDES, ADJACENT_TO };
    Combinator   combinator;
    Combination* context;
    Sequence*    selector;
    bool         has_reference;
    bool         has_placeholder;

    Combination(string p, size_t l,
                Combinator c, Combination* ctx, Sequence* sel)
    : Selector(p, l),
      combinator(c),
      context(ctx),
      selector(sel),
      has_reference(ctx && ctx->has_reference ||
                    sel && sel->has_reference),
      has_placeholder(ctx && ctx->has_placeholder ||
                      sel && sel->has_placeholder)
    { }
    ATTACH_OPERATIONS();
  };

  ///////////////////////////////////
  // Comma-separated selector groups.
  ///////////////////////////////////
  struct Group : Selector {
    vector<Combination*> selectors;
    bool                 has_reference;
    bool                 has_placeholder;

    Group(string p, size_t l, size_t s = 0)
    : Selector(p, l),
      selectors(vector<Combination*>()),
      has_reference(false),
      has_placeholder(false)
    { selectors.reserve(s); }

    size_t length()
    { return selectors.size(); }
    Combination*& operator[](size_t i)
    { return selectors[i]; }
    Group& operator<<(Combination* c)
    {
      selectors.push_back(c);
      has_reference   |= c->has_reference;
      has_placeholder |= c->has_placeholder;
      return *this;
    }
    Group& operator+=(Group* g)
    {
      for (size_t i = 0, L = g->length(); i < L; ++i) *this << (*g)[i];
      return *this;
    }
    ATTACH_OPERATIONS();
  };
}