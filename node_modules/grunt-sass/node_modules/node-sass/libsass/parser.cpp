#include <cstdlib>
#include <iostream>
#include "parser.hpp"
#include "file.hpp"
#include "inspect.hpp"
#include "to_string.hpp"
#include "constants.hpp"

#ifndef SASS_PRELEXER
#include "prelexer.hpp"
#endif

#include <typeinfo>

namespace Sass {
  using namespace std;
  using namespace Constants;

  Parser Parser::from_c_str(const char* str, Context& ctx, string path, size_t line)
  {
    Parser p(ctx, path, line);
    p.source   = str;
    p.position = p.source;
    p.end      = str + strlen(str);
    return p;
  }

  Parser Parser::from_token(Token t, Context& ctx, string path, size_t line)
  {
    Parser p(ctx, path, line);
    p.source   = t.begin;
    p.position = p.source;
    p.end      = t.end;
    return p;
  }

  Block* Parser::parse()
  {
    Block* root = new (ctx.mem) Block(path, line);
    root->is_root(true);
    read_bom();
    lex< optional_spaces >();
    Selector_Lookahead lookahead_result;
    while (position < end) {
      if (lex< block_comment >()) {
        String_Constant* contents = new (ctx.mem) String_Constant(path, line, lexed);
        Comment*     comment  = new (ctx.mem) Comment(path, line, contents);
        (*root) << comment;
      }
      else if (peek< import >()) {
        Import* imp = parse_import();
        if (!imp->urls().empty()) (*root) << imp;
        if (!imp->files().empty()) {
          for (size_t i = 0, S = imp->files().size(); i < S; ++i) {
            (*root) << new (ctx.mem) Import_Stub(path, line, imp->files()[i]);
          }
        }
        if (!lex< exactly<';'> >()) error("top-level @import directive must be terminated by ';'");
      }
      else if (peek< mixin >() || peek< function >()) {
        (*root) << parse_definition();
      }
      else if (peek< variable >()) {
        (*root) << parse_assignment();
        if (!lex< exactly<';'> >()) error("top-level variable binding must be terminated by ';'");
      }
      else if (peek< sequence< optional< exactly<'*'> >, alternatives< identifier_schema, identifier >, optional_spaces, exactly<':'>, optional_spaces, exactly<'{'> > >(position)) {
        (*root) << parse_propset();
      }
      else if (peek< include >() /* || peek< exactly<'+'> >() */) {
        Mixin_Call* mixin_call = parse_mixin_call();
        (*root) << mixin_call;
        if (!mixin_call->block() && !lex< exactly<';'> >()) error("top-level @include directive must be terminated by ';'");
      }
      else if (peek< if_directive >()) {
        (*root) << parse_if_directive();
      }
      else if (peek< for_directive >()) {
        (*root) << parse_for_directive();
      }
      else if (peek< each_directive >()) {
        (*root) << parse_each_directive();
      }
      else if (peek< while_directive >()) {
        (*root) << parse_while_directive();
      }
      else if (peek< media >()) {
        (*root) << parse_media_block();
      }
      else if (peek< warn >()) {
        (*root) << parse_warning();
        if (!lex< exactly<';'> >()) error("top-level @warn directive must be terminated by ';'");
      }
      // ignore the @charset directive for now
      else if (lex< exactly< charset_kwd > >()) {
        lex< string_constant >();
        lex< exactly<';'> >();
      }
      else if (peek< at_keyword >()) {
        At_Rule* at_rule = parse_at_rule();
        (*root) << at_rule;
        if (!at_rule->block() && !lex< exactly<';'> >()) error("top-level directive must be terminated by ';'");
      }
      else if ((lookahead_result = lookahead_for_selector(position)).found) {
        (*root) << parse_ruleset(lookahead_result);
      }
      else {
        lex< spaces_and_comments >();
        if (position >= end) break;
        error("invalid top-level expression");
      }
      lex< optional_spaces >();
    }
    return root;
  }

  Import* Parser::parse_import()
  {
    lex< import >();
    Import* imp = new (ctx.mem) Import(path, line);
    bool first = true;
    do {
      if (lex< string_constant >()) {
        string import_path(lexed);
        size_t dot = import_path.find_last_of('.');
        if (dot != string::npos && import_path.substr(dot, 4) == ".css") {
          String_Constant* loc = new (ctx.mem) String_Constant(path, line, import_path);
          Argument* loc_arg = new (ctx.mem) Argument(path, line, loc);
          Arguments* loc_args = new (ctx.mem) Arguments(path, line);
          (*loc_args) << loc_arg;
          Function_Call* new_url = new (ctx.mem) Function_Call(path, line, "url", loc_args);
          imp->urls().push_back(new_url);
        }
        else {
          string current_dir = File::dir_name(path);
          // string resolved(ctx.add_file(File::join_paths(current_dir, unquote(import_path))));
          string resolved(ctx.add_file(current_dir, unquote(import_path)));
          if (resolved.empty()) error("file to import not found or unreadable: " + import_path);
          imp->files().push_back(resolved);
        }
      }
      else if (peek< uri_prefix >()) {
        imp->urls().push_back(parse_value());
      }
      else {
        if (first) error("@import directive requires a url or quoted path");
        else error("expecting another url or quoted path in @import list");
      }
      first = false;
    } while (lex< exactly<','> >());
    return imp;
  }

  Definition* Parser::parse_definition()
  {
    Definition::Type which_type = Definition::MIXIN;
    if      (lex< mixin >())    which_type = Definition::MIXIN;
    else if (lex< function >()) which_type = Definition::FUNCTION;
    string which_str(lexed);
    if (!lex< identifier >()) error("invalid name in " + which_str + " definition");
    string name(lexed);
    size_t line_of_def = line;
    Parameters* params = parse_parameters();
    if (!peek< exactly<'{'> >()) error("body for " + which_str + " " + name + " must begin with a '{'");
    if (which_type == Definition::MIXIN) stack.push_back(mixin_def);
    else stack.push_back(function_def);
    Block* body = parse_block();
    stack.pop_back();
    Definition* def = new (ctx.mem) Definition(path, line_of_def, name, params, body, which_type);
    return def;
  }

  Parameters* Parser::parse_parameters()
  {
    string name(lexed); // for the error message
    Parameters* params = new (ctx.mem) Parameters(path, line);
    if (lex< exactly<'('> >()) {
      // if there's anything there at all
      if (!peek< exactly<')'> >()) {
        do (*params) << parse_parameter();
        while (lex< exactly<','> >());
      }
      if (!lex< exactly<')'> >()) error("expected a variable name (e.g. $x) or ')' for the parameter list for " + name);
    }
    return params;
  }

  Parameter* Parser::parse_parameter()
  {
    lex< variable >();
    string name(lexed);
    Expression* val = 0;
    bool is_rest = false;
    if (lex< exactly<':'> >()) { // there's a default value
      val = parse_space_list();
      val->is_delayed(false);
    }
    else if (lex< exactly< ellipsis > >()) {
      is_rest = true;
    }
    Parameter* p = new (ctx.mem) Parameter(path, line, name, val, is_rest);
    return p;
  }

  Mixin_Call* Parser::parse_mixin_call()
  {
    lex< include >() /* || lex< exactly<'+'> >() */;
    if (!lex< identifier >()) error("invalid name in @include directive");
    size_t line_of_call = line;
    string name(lexed);
    Arguments* args = parse_arguments();
    Block* content = 0;
    if (peek< exactly<'{'> >()) {
      content = parse_block();
    }
    Mixin_Call* the_call = new (ctx.mem) Mixin_Call(path, line_of_call, name, args, content);
    return the_call;
  }

  Arguments* Parser::parse_arguments()
  {
    string name(lexed);
    Arguments* args = new (ctx.mem) Arguments(path, line);

    if (lex< exactly<'('> >()) {
      // if there's anything there at all
      if (!peek< exactly<')'> >()) {
        do (*args) << parse_argument();
        while (lex< exactly<','> >());
      }
      if (!lex< exactly<')'> >()) error("expected a variable name (e.g. $x) or ')' for the parameter list for " + name);
    }

    return args;
  }

  Argument* Parser::parse_argument()
  {
    Argument* arg;
    if (peek< sequence < variable, spaces_and_comments, exactly<':'> > >()) {
      lex< variable >();
      string name(lexed);
      lex< exactly<':'> >();
      Expression* val = parse_space_list();
      val->is_delayed(false);
      arg = new (ctx.mem) Argument(path, line, val, name);
    }
    else {
      bool is_arglist = false;
      Expression* val = parse_space_list();
      val->is_delayed(false);
      if (lex< exactly< ellipsis > >()) {
        is_arglist = true;
      }
      arg = new (ctx.mem) Argument(path, line, val, "", is_arglist);
    }
    return arg;
  }

  Assignment* Parser::parse_assignment()
  {
    lex< variable >();
    string name(lexed);
    size_t var_line = line;
    if (!lex< exactly<':'> >()) error("expected ':' after " + name + " in assignment statement");
    Expression* val = parse_list();
    val->is_delayed(false);
    bool is_guarded = lex< default_flag >();
    Assignment* var = new (ctx.mem) Assignment(path, var_line, name, val, is_guarded);
    return var;
  }

  Propset* Parser::parse_propset()
  {
    String* property_segment;
    if (peek< sequence< optional< exactly<'*'> >, identifier_schema > >()) {
      property_segment = parse_identifier_schema();
    }
    else {
      lex< sequence< optional< exactly<'*'> >, identifier > >();
      property_segment = new (ctx.mem) String_Constant(path, line, lexed);
    }
    Propset* propset = new (ctx.mem) Propset(path, line, property_segment);
    lex< exactly<':'> >();

    if (!peek< exactly<'{'> >()) error("expected a '{' after namespaced property");

    propset->block(parse_block());

    return propset;
  }

  Ruleset* Parser::parse_ruleset(Selector_Lookahead lookahead)
  {
    Selector* sel;
    if (lookahead.has_interpolants) {
      sel = parse_selector_schema(lookahead.found);
    }
    else {
      sel = parse_selector_group();
    }
    size_t r_line = line;
    if (!peek< exactly<'{'> >()) error("expected a '{' after the selector");
    Block* block = parse_block();
    Ruleset* ruleset = new (ctx.mem) Ruleset(path, r_line, sel, block);
    return ruleset;
  }

  Selector_Schema* Parser::parse_selector_schema(const char* end_of_selector)
  {
    const char* i = position;
    const char* p;
    String_Schema* schema = new (ctx.mem) String_Schema(path, line);

    while (i < end_of_selector) {
      p = find_first_in_interval< exactly<hash_lbrace> >(i, end_of_selector);
      if (p) {
        // accumulate the preceding segment if there is one
        if (i < p) (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, p));
        // find the end of the interpolant and parse it
        const char* j = find_first_in_interval< exactly<rbrace> >(p, end_of_selector);
        Expression* interp_node = Parser::from_token(Token(p+2, j), ctx, path, line).parse_list();
        interp_node->is_interpolant(true);
        (*schema) << interp_node;
        i = j + 1;
      }
      else { // no interpolants left; add the last segment if there is one
        if (i < end_of_selector) (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, end_of_selector));
        break;
      }
    }
    position = end_of_selector;
    return new (ctx.mem) Selector_Schema(path, line, schema);
  }

  Selector_Group* Parser::parse_selector_group()
  {
    To_String to_string;
    Selector_Group* group = new (ctx.mem) Selector_Group(path, line);
    do {
      Selector_Combination* comb = parse_selector_combination();
      if (!comb->has_reference()) {
        size_t sel_line = line;
        Selector_Reference* ref = new (ctx.mem) Selector_Reference(path, sel_line);
        Simple_Selector_Sequence* ref_wrap = new (ctx.mem) Simple_Selector_Sequence(path, sel_line);
        (*ref_wrap) << ref;
        if (!comb->head()) {
          comb->head(ref_wrap);
          comb->has_reference(true);
        }
        else {
          comb = new (ctx.mem) Selector_Combination(path, sel_line, Selector_Combination::ANCESTOR_OF, ref_wrap, comb);
          comb->has_reference(true);
        }
      }
      (*group) << comb;
    }
    while (lex< exactly<','> >());
    return group;
  }

  Selector_Combination* Parser::parse_selector_combination()
  {
    size_t sel_line = 0;
    Simple_Selector_Sequence* lhs;
    if (peek< exactly<'+'> >() ||
        peek< exactly<'~'> >() ||
        peek< exactly<'>'> >()) {
      // no selector before the combinator
      lhs = 0;
    }
    else {
      lhs = parse_simple_selector_sequence();
      sel_line = line;
    }

    Selector_Combination::Combinator cmb;
    if      (lex< exactly<'+'> >()) cmb = Selector_Combination::ADJACENT_TO;
    else if (lex< exactly<'~'> >()) cmb = Selector_Combination::PRECEDES;
    else if (lex< exactly<'>'> >()) cmb = Selector_Combination::PARENT_OF;
    else                            cmb = Selector_Combination::ANCESTOR_OF;

    Selector_Combination* rhs;
    if (peek< exactly<','> >() ||
        peek< exactly<')'> >() ||
        peek< exactly<'{'> >() ||
        peek< exactly<';'> >()) {
      // no selector after the combinator
      rhs = 0;
    }
    else {
      rhs = parse_selector_combination();
      sel_line = line;
    }
    if (!sel_line) sel_line = line;
    return new (ctx.mem) Selector_Combination(path, sel_line, cmb, lhs, rhs);
  }

  Simple_Selector_Sequence* Parser::parse_simple_selector_sequence()
  {
    Simple_Selector_Sequence* seq = new (ctx.mem) Simple_Selector_Sequence(path, line);
    // check for backref or type selector, which are only allowed at the front
    if (lex< exactly<'&'> >()) {
      (*seq) << new (ctx.mem) Selector_Reference(path, line);
    }
    else if (lex< sequence< negate< functional >, alternatives< type_selector, universal, string_constant, dimension, percentage, number > > >()) {
      (*seq) << new (ctx.mem) Type_Selector(path, line, lexed);
    }
    else {
      (*seq) << parse_simple_selector();
    }

    while (!peek< spaces >(position) &&
           !(peek < exactly<'+'> >(position) ||
             peek < exactly<'~'> >(position) ||
             peek < exactly<'>'> >(position) ||
             peek < exactly<','> >(position) ||
             peek < exactly<')'> >(position) ||
             peek < exactly<'{'> >(position) ||
             peek < exactly<';'> >(position))) {
      (*seq) << parse_simple_selector();
    }
    return seq;
  }

  Simple_Selector* Parser::parse_simple_selector()
  {
    if (lex< id_name >() || lex< class_name >()) {
      return new (ctx.mem) Selector_Qualifier(path, line, lexed);
    }
    else if (lex< string_constant >() || lex< number >()) {
      return new (ctx.mem) Type_Selector(path, line, lexed);
    }
    else if (peek< pseudo_not >()) {
      return parse_negated_selector();
    }
    else if (peek< exactly<':'> >(position) || peek< functional >()) {
      return parse_pseudo_selector();
    }
    else if (peek< exactly<'['> >(position)) {
      return parse_attribute_selector();
    }
    else if (lex< placeholder >()) {
      return new (ctx.mem) Selector_Placeholder(path, line, lexed);
    }
    else {
      error("invalid selector after " + lexed.to_string());
    }
    // unreachable statement
    return 0;
  }

  Negated_Selector* Parser::parse_negated_selector()
  {
    lex< pseudo_not >();
    size_t nline = line;
    Selector* negated = parse_selector_group();
    if (!lex< exactly<')'> >()) {
      error("negated selector is missing ')'");
    }
    return new (ctx.mem) Negated_Selector(path, nline, negated);
  }

  Pseudo_Selector* Parser::parse_pseudo_selector() {
    if (lex< sequence< pseudo_prefix, functional > >() || lex< functional >()) {
      string name(lexed);
      String* expr = 0;
      if (lex< alternatives< even, odd > >()) {
        expr = new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (peek< binomial >(position)) {
        lex< sequence< optional< coefficient >, exactly<'n'> > >();
        String_Constant* var_coef = new (ctx.mem) String_Constant(path, line, lexed);
        lex< sign >();
        String_Constant* op = new (ctx.mem) String_Constant(path, line, lexed);
        // Binary_Expression::Type op = (lexed == "+" ? Binary_Expression::ADD : Binary_Expression::SUB);
        lex< digits >();
        String_Constant* constant = new (ctx.mem) String_Constant(path, line, lexed);
        // expr = new (ctx.mem) Binary_Expression(path, line, op, var_coef, constant);
        String_Schema* schema = new (ctx.mem) String_Schema(path, line, 3);
        *schema << var_coef << op << constant;
        expr = schema;
      }
      else if (lex< sequence< optional<sign>,
                              optional<digits>,
                              exactly<'n'> > >()) {
        expr = new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (lex< sequence< optional<sign>, digits > >()) {
        expr = new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (lex< identifier >()) {
        expr = new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (lex< string_constant >()) {
        expr = new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (peek< exactly<')'> >()) {
        expr = new (ctx.mem) String_Constant(path, line, "");
      }
      else {
        error("invalid argument to " + name + "...)");
      }
      if (!lex< exactly<')'> >()) error("unterminated argument to " + name + "...)");
      return new (ctx.mem) Pseudo_Selector(path, line, name, expr);
    }
    else if (lex < sequence< pseudo_prefix, identifier > >()) {
      return new (ctx.mem) Pseudo_Selector(path, line, lexed);
    }
    else {
      error("unrecognized pseudo-class or pseudo-element");
    }
    // unreachable statement
    return 0;
  }

  Attribute_Selector* Parser::parse_attribute_selector()
  {
    lex< exactly<'['> >();
    if (!lex< type_selector >()) error("invalid attribute name in attribute selector");
    string name(lexed);
    if (lex< exactly<']'> >()) return new (ctx.mem) Attribute_Selector(path, line, name, "", "");
    if (!lex< alternatives< exact_match, class_match, dash_match,
                            prefix_match, suffix_match, substring_match > >()) {
      error("invalid operator in attribute selector for " + name);
    }
    string matcher(lexed);
    if (!lex< string_constant >() && !lex< identifier >()) error("expected a string constant or identifier in attribute selector for " + name);
    string value(lexed);
    if (!lex< exactly<']'> >()) error("unterminated attribute selector for " + name);
    return new (ctx.mem) Attribute_Selector(path, line, name, matcher, value);
  }

  Block* Parser::parse_block()
  {
    lex< exactly<'{'> >();
    bool semicolon = false;
    Selector_Lookahead lookahead_result;
    Block* block = new (ctx.mem) Block(path, line);
    while (!lex< exactly<'}'> >()) {
      if (semicolon) {
        if (!lex< exactly<';'> >()) {
          error("non-terminal statement or declaration must end with ';'");
        }
        semicolon = false;
        while (lex< block_comment >()) {
          String_Constant* contents = new (ctx.mem) String_Constant(path, line, lexed);
          Comment*         comment  = new (ctx.mem) Comment(path, line, contents);
          (*block) << comment;
        }
        if (lex< exactly<'}'> >()) break;
      }
      if (lex< block_comment >()) {
        String_Constant* contents = new (ctx.mem) String_Constant(path, line, lexed);
        Comment*         comment  = new (ctx.mem) Comment(path, line, contents);
        (*block) << comment;
      }
      else if (peek< import >(position)) {
        if (stack.back() == mixin_def || stack.back() == function_def) {
          lex< import >(); // to adjust the line number
          error("@import directives are not allowed inside mixins and functions");
        }
        Import* imp = parse_import();
        if (!imp->urls().empty()) (*block) << imp;
        if (!imp->files().empty()) {
          for (size_t i = 0, S = imp->files().size(); i < S; ++i) {
            (*block) << new (ctx.mem) Import_Stub(path, line, imp->files()[i]);
          }
        }
        semicolon = true;
      }
      else if (lex< variable >()) {
        (*block) << parse_assignment();
        semicolon = true;
      }
      else if (peek< if_directive >()) {
        (*block) << parse_if_directive();
      }
      else if (peek< for_directive >()) {
        (*block) << parse_for_directive();
      }
      else if (peek< each_directive >()) {
        (*block) << parse_each_directive();
      }
      else if (peek < while_directive >()) {
        (*block) << parse_while_directive();
      }
      else if (lex < return_directive >()) {
        (*block) << new (ctx.mem) Return(path, line, parse_list());
        semicolon = true;
      }
      else if (peek< warn >()) {
        (*block) << parse_warning();
        semicolon = true;
      }
      else if (stack.back() == function_def) {
        error("only variable declarations and control directives are allowed inside functions");
      }
      else if (peek< mixin >() || peek< function >()) {
        (*block) << parse_definition();
      }
      else if (peek< include >(position)) {
        Mixin_Call* the_call = parse_mixin_call();
        (*block) << the_call;
        // don't need a semicolon after a content block
        semicolon = (the_call->block()) ? false : true;
      }
      else if (lex< content >()) {
        if (stack.back() != mixin_def) {
          error("@content may only be used within a mixin");
        }
        (*block) << new (ctx.mem) Content(path, line);
        semicolon = true;
      }
      /*
      else if (peek< exactly<'+'> >()) {
        (*block) << parse_mixin_call();
        semicolon = true;
      }
      */
      else if (lex< extend >()) {
        Selector_Lookahead lookahead = lookahead_for_extension_target(position);
        if (!lookahead.found) error("invalid selector for @extend");
        Selector* target;
        if (lookahead.has_interpolants) target = parse_selector_schema(lookahead.found);
        else                            target = parse_selector_group();
        (*block) << new (ctx.mem) Extension(path, line, target);
        semicolon = true;
      }
      else if (peek< media >()) {
        (*block) << parse_media_block();
      }
      // ignore the @charset directive for now
      else if (lex< exactly< charset_kwd > >()) {
        lex< string_constant >();
        lex< exactly<';'> >();
      }
      else if (peek< at_keyword >()) {
        At_Rule* at_rule = parse_at_rule();
        (*block) << at_rule;
        if (!at_rule->block()) semicolon = true;
      }
      else if ((lookahead_result = lookahead_for_selector(position)).found) {
        (*block) << parse_ruleset(lookahead_result);
      }
      else if (peek< sequence< optional< exactly<'*'> >, alternatives< identifier_schema, identifier >, optional_spaces, exactly<':'>, optional_spaces, exactly<'{'> > >(position)) {
        (*block) << parse_propset();
      }
      else if (!peek< exactly<';'> >()) {
        if (peek< sequence< optional< exactly<'*'> >, identifier_schema, exactly<':'>, exactly<'{'> > >()) {
          (*block) << parse_propset();
        }
        else if (peek< sequence< optional< exactly<'*'> >, identifier, exactly<':'>, exactly<'{'> > >()) {
          (*block) << parse_propset();
        }
        else {
          Declaration* decl = parse_declaration();
          (*block) << decl;
          if (peek< exactly<'{'> >()) {
            // parse a propset that rides on the declaration's property
            Propset* ps = new (ctx.mem) Propset(path, line, decl->property(), parse_block());
            (*block) << ps;
          }
          else {
            // finish and let the semicolon get munched
            semicolon = true;
          }
        }
      }
      else lex< exactly<';'> >();
      while (lex< block_comment >()) {
        String_Constant* contents = new (ctx.mem) String_Constant(path, line, lexed);
        Comment*         comment  = new (ctx.mem) Comment(path, line, contents);
        (*block) << comment;
      }
    }
    return block;
  }

  Declaration* Parser::parse_declaration() {
    String* prop = 0;
    if (peek< sequence< optional< exactly<'*'> >, identifier_schema > >()) {
      prop = parse_identifier_schema();
    }
    else if (lex< sequence< optional< exactly<'*'> >, identifier > >()) {
      prop = new (ctx.mem) String_Constant(path, line, lexed);
    }
    else {
      error("invalid property name");
    }
    if (!lex< exactly<':'> >()) error("property \"" + string(lexed) + "\" must be followed by a ':'");
    if (peek< exactly<';'> >()) error("style declaration must contain a value");
    Expression* list = parse_list();
    return new (ctx.mem) Declaration(path, prop->line(), prop, list/*, lex<important>()*/);
  }

  Expression* Parser::parse_list()
  {
    return parse_comma_list();
  }

  Expression* Parser::parse_comma_list()
  {
    if (//peek< exactly<'!'> >(position) ||
        peek< exactly<';'> >(position) ||
        peek< exactly<'}'> >(position) ||
        peek< exactly<'{'> >(position) ||
        peek< exactly<')'> >(position) ||
        //peek< exactly<':'> >(position) ||
        peek< exactly<ellipsis> >(position))
    { return new (ctx.mem) List(path, line, 0); }
    Expression* list1 = parse_space_list();
    // if it's a singleton, return it directly; don't wrap it
    if (!peek< exactly<','> >(position)) return list1;

    List* comma_list = new (ctx.mem) List(path, line, 2, List::COMMA);
    (*comma_list) << list1;

    while (lex< exactly<','> >())
    {
      Expression* list = parse_space_list();
      (*comma_list) << list;
    }

    return comma_list;
  }

  Expression* Parser::parse_space_list()
  {
    Expression* disj1 = parse_disjunction();
    // if it's a singleton, return it directly; don't wrap it
    if (//peek< exactly<'!'> >(position) ||
        peek< exactly<';'> >(position) ||
        peek< exactly<'}'> >(position) ||
        peek< exactly<'{'> >(position) ||
        peek< exactly<')'> >(position) ||
        peek< exactly<','> >(position) ||
        // peek< exactly<':'> >(position) ||
        peek< exactly<ellipsis> >(position) ||
        peek< default_flag >(position))
    { return disj1; }

    List* space_list = new (ctx.mem) List(path, line, 2, List::SPACE);
    (*space_list) << disj1;

    while (!(//peek< exactly<'!'> >(position) ||
             peek< exactly<';'> >(position) ||
             peek< exactly<'}'> >(position) ||
             peek< exactly<'{'> >(position) ||
             peek< exactly<')'> >(position) ||
             peek< exactly<','> >(position) ||
             // peek< exactly<':'> >(position) ||
             peek< exactly<ellipsis> >(position) ||
             peek< default_flag >(position)))
    {
      (*space_list) << parse_disjunction();
    }

    return space_list;
  }

  Expression* Parser::parse_disjunction()
  {
    Expression* conj1 = parse_conjunction();
    // if it's a singleton, return it directly; don't wrap it
    if (!peek< sequence< or_op, negate< identifier > > >()) return conj1;

    vector<Expression*> operands;
    while (lex< sequence< or_op, negate< identifier > > >())
      operands.push_back(parse_conjunction());

    return fold_operands(conj1, operands, Binary_Expression::OR);
  }

  Expression* Parser::parse_conjunction()
  {
    Expression* rel1 = parse_relation();
    // if it's a singleton, return it directly; don't wrap it
    if (!peek< sequence< and_op, negate< identifier > > >()) return rel1;

    vector<Expression*> operands;
    while (lex< sequence< and_op, negate< identifier > > >())
      operands.push_back(parse_relation());

    return fold_operands(rel1, operands, Binary_Expression::AND);
  }

  Expression* Parser::parse_relation()
  {
    Expression* expr1 = parse_expression();
    // if it's a singleton, return it directly; don't wrap it
    if (!(peek< eq_op >(position)  ||
          peek< neq_op >(position) ||
          peek< gte_op >(position) ||
          peek< gt_op >(position)  ||
          peek< lte_op >(position) ||
          peek< lt_op >(position)))
    { return expr1; }

    Binary_Expression::Type op
    = lex<eq_op>()  ? Binary_Expression::EQ
    : lex<neq_op>() ? Binary_Expression::NEQ
    : lex<gte_op>() ? Binary_Expression::GTE
    : lex<lte_op>() ? Binary_Expression::LTE
    : lex<gt_op>()  ? Binary_Expression::GT
    : lex<lt_op>()  ? Binary_Expression::LT
    :                 Binary_Expression::LT; // whatever

    Expression* expr2 = parse_expression();

    return new (ctx.mem) Binary_Expression(path, expr1->line(), op, expr1, expr2);
  }

  Expression* Parser::parse_expression()
  {
    Expression* term1 = parse_term();
    // if it's a singleton, return it directly; don't wrap it
    if (!(peek< exactly<'+'> >(position) ||
          peek< sequence< negate< number >, exactly<'-'> > >(position)))
    { return term1; }

    vector<Expression*> operands;
    vector<Binary_Expression::Type> operators;
    while (lex< exactly<'+'> >() || lex< sequence< negate< number >, exactly<'-'> > >()) {
      operators.push_back(lexed == "+" ? Binary_Expression::ADD : Binary_Expression::SUB);
      operands.push_back(parse_term());
    }

    return fold_operands(term1, operands, operators);
  }

  Expression* Parser::parse_term()
  {
    Expression* fact1 = parse_factor();
    // if it's a singleton, return it directly; don't wrap it
    if (!(peek< exactly<'*'> >(position) ||
          peek< exactly<'/'> >(position) ||
          peek< exactly<'%'> >(position)))
    { return fact1; }

    vector<Expression*> operands;
    vector<Binary_Expression::Type> operators;
    while (lex< exactly<'*'> >() || lex< exactly<'/'> >() || lex< exactly<'%'> >()) {
      if      (lexed == "*") operators.push_back(Binary_Expression::MUL);
      else if (lexed == "/") operators.push_back(Binary_Expression::DIV);
      else                   operators.push_back(Binary_Expression::MOD);
      operands.push_back(parse_factor());
    }

    return fold_operands(fact1, operands, operators);
  }

  Expression* Parser::parse_factor()
  {
    if (lex< exactly<'('> >()) {
      Expression* value = parse_comma_list();
      if (!lex< exactly<')'> >()) error("unclosed parenthesis");
      value->is_delayed(false);
      if (value->concrete_type() == Expression::LIST) {
        List* l = static_cast<List*>(value);
        if (!l->empty()) (*l)[0]->is_delayed(false);
      }
      return value;
    }
    else if (peek< ie_stuff >()) {
      return parse_ie_stuff();
    }
    else if (peek< ie_keyword_arg >()) {
      String_Schema* kwd_arg = new (ctx.mem) String_Schema(path, line, 3);
      if (lex< variable >()) *kwd_arg << new (ctx.mem) Variable(path, line, lexed);
      else {
        lex< alternatives< identifier_schema, identifier > >();
        *kwd_arg << new (ctx.mem) String_Constant(path, line, lexed);
      }
      lex< exactly<'='> >();
      *kwd_arg << new (ctx.mem) String_Constant(path, line, lexed);
      if (lex< variable >()) *kwd_arg << new (ctx.mem) Variable(path, line, lexed);
      else {
        lex< alternatives< identifier_schema, identifier > >();
        *kwd_arg << new (ctx.mem) String_Constant(path, line, lexed);
      }
      return kwd_arg;
    }
    else if (peek< functional_schema >()) {
      return parse_function_call_schema();
    }
    else if (peek< identifier_schema >()) {
      return parse_identifier_schema();
    }
    else if (peek< functional >() && !peek< uri_prefix >()) {
      return parse_function_call();
    }
    else if (lex< sequence< exactly<'+'>, spaces_and_comments, negate< number > > >()) {
      return new (ctx.mem) Unary_Expression(path, line, Unary_Expression::PLUS, parse_factor());
    }
    else if (lex< sequence< exactly<'-'>, spaces_and_comments, negate< number> > >()) {
      return new (ctx.mem) Unary_Expression(path, line, Unary_Expression::MINUS, parse_factor());
    }
    else {
      return parse_value();
    }
  }

  Expression* Parser::parse_value()
  {
    if (lex< uri_prefix >()) {
      // TODO: really need to clean up this chunk
      Arguments* args = new (ctx.mem) Arguments(path, line);
      Function_Call* result = new (ctx.mem) Function_Call(path, line, "url", args);
      // gah, gonna have to use exception handling to do backtracking ...
      const char* here = position;
      try {
        try {
          if (peek< string_constant >()) {
            // cerr << "parsing a url string" << endl;
            String* str = parse_string();
            (*args) << new (ctx.mem) Argument(path, line, str);
            // cerr << "done" << endl;
          }
          else if (peek< sequence< url_schema, spaces_and_comments, exactly<')'> > >()) {
            // cerr << "url schema" << endl;
            lex< url_schema >();
            String_Schema* the_url = Parser::from_token(lexed, ctx, path, line).parse_url_schema();
            (*args) << new (ctx.mem) Argument(path, line, the_url);
            // cerr << "done" << endl;
          }
          else if (peek< sequence< url_value, spaces_and_comments, exactly<')'> > >()) {
            // cerr << "url value" << endl;
            lex< url_value >();
            String_Constant* the_url = new (ctx.mem) String_Constant(path, line, lexed);
            (*args) << new (ctx.mem) Argument(path, line, the_url);
            // cerr << "done" << endl;
          }
          else {
            // cerr << "stuff" << endl;
            const char* value = position;
            const char* rparen = find_first< exactly<')'> >(position);
            if (!rparen) error("URI is missing ')'");
            Token content_tok(Token(value, rparen));
            String_Constant* content_node = new (ctx.mem) String_Constant(path, line, content_tok);
            (*args) << new (ctx.mem) Argument(path, line, content_node);
            position = rparen;
            // cerr << "done" << endl;
          }
        }
        catch (Error& e) {
          // cerr << "expression" << endl;
          position = here;
          Expression* expr = parse_list();
          (*args) << new (ctx.mem) Argument(path, line, expr);
          // cerr << "done" << endl;
        }
      }
      catch (Error& e) {
        error("unable to parse URL");
      }
      if (!lex< exactly<')'> >()) error("URI is missing ')'");
      return result;
    }

    if (lex< important >())
    { return new (ctx.mem) String_Constant(path, line, "!important"); }

    if (lex< value_schema >())
    { return Parser::from_token(lexed, ctx, path, line).parse_value_schema(); }

    if (lex< sequence< true_val, negate< identifier > > >())
    { return new (ctx.mem) Boolean(path, line, true); }

    if (lex< sequence< false_val, negate< identifier > > >())
    { return new (ctx.mem) Boolean(path, line, false); }

    if (lex< sequence< null, negate< identifier > > >())
    { return new (ctx.mem) Null(path, line); }

    if (lex< identifier >()) {
      String_Constant* str = new (ctx.mem) String_Constant(path, line, lexed);
      str->is_delayed(true);
      return str;
    }

    if (lex< percentage >())
    { return new (ctx.mem) Textual(path, line, Textual::PERCENTAGE, lexed); }

    if (lex< dimension >())
    { return new (ctx.mem) Textual(path, line, Textual::DIMENSION, lexed); }

    if (lex< number >())
    { return new (ctx.mem) Textual(path, line, Textual::NUMBER, lexed); }

    if (lex< hex >())
    { return new (ctx.mem) Textual(path, line, Textual::HEX, lexed); }

    if (peek< string_constant >())
    { return parse_string(); }

    if (lex< variable >())
    { return new (ctx.mem) Variable(path, line, lexed); }

    error("error reading values after " + lexed.to_string());

    // unreachable statement
    return 0;
  }

  String* Parser::parse_string()
  {
    lex< string_constant >();
    Token str(lexed);
    const char* i = str.begin;
    // see if there any interpolants
    const char* p = find_first_in_interval< sequence< negate< exactly<'\\'> >, exactly<hash_lbrace> > >(str.begin, str.end);
    if (!p) {
      String_Constant* str_node = new (ctx.mem) String_Constant(path, line, str);
      str_node->is_delayed(true);
      return str_node;
    }

    String_Schema* schema = new (ctx.mem) String_Schema(path, line);
    schema->quote_mark(*str.begin);
    while (i < str.end) {
      p = find_first_in_interval< sequence< negate< exactly<'\\'> >, exactly<hash_lbrace> > >(i, str.end);
      if (p) {
        if (i < p) {
          (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, p)); // accumulate the preceding segment if it's nonempty
        }
        const char* j = find_first_in_interval< exactly<rbrace> >(p, str.end); // find the closing brace
        if (j) {
          // parse the interpolant and accumulate it
          Expression* interp_node = Parser::from_token(Token(p+2, j), ctx, path, line).parse_list();
          interp_node->is_interpolant(true);
          (*schema) << interp_node;
          i = j+1;
        }
        else {
          // throw an error if the interpolant is unterminated
          error("unterminated interpolant inside string constant " + str.to_string());
        }
      }
      else { // no interpolants left; add the last segment if nonempty
        if (i < str.end) (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, str.end));
        break;
      }
    }
    return schema;
  }

  String* Parser::parse_ie_stuff()
  {
    lex< ie_stuff >();
    Token str(lexed);
    --str.end;
    --position;
    const char* i = str.begin;
    // see if there any interpolants
    const char* p = find_first_in_interval< sequence< negate< exactly<'\\'> >, exactly<hash_lbrace> > >(str.begin, str.end);
    if (!p) {
      String_Constant* str_node = new (ctx.mem) String_Constant(path, line, str);
      str_node->is_delayed(true);
      return str_node;
    }

    String_Schema* schema = new (ctx.mem) String_Schema(path, line);
    while (i < str.end) {
      p = find_first_in_interval< sequence< negate< exactly<'\\'> >, exactly<hash_lbrace> > >(i, str.end);
      if (p) {
        if (i < p) {
          (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, p)); // accumulate the preceding segment if it's nonempty
        }
        const char* j = find_first_in_interval< exactly<rbrace> >(p, str.end); // find the closing brace
        if (j) {
          // parse the interpolant and accumulate it
          Expression* interp_node = Parser::from_token(Token(p+2, j), ctx, path, line).parse_list();
          interp_node->is_interpolant(true);
          (*schema) << interp_node;
          i = j+1;
        }
        else {
          // throw an error if the interpolant is unterminated
          error("unterminated interpolant inside IE function " + str.to_string());
        }
      }
      else { // no interpolants left; add the last segment if nonempty
        if (i < str.end) (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, str.end));
        break;
      }
    }
    return schema;
  }

  String_Schema* Parser::parse_value_schema()
  {
    String_Schema* schema = new (ctx.mem) String_Schema(path, line);
    size_t num_items = 0;
    while (position < end) {
      if (lex< interpolant >()) {
        Token insides(Token(lexed.begin + 2, lexed.end - 1));
        Expression* interp_node = Parser::from_token(insides, ctx, path, line).parse_list();
        interp_node->is_interpolant(true);
        (*schema) << interp_node;
      }
      else if (lex< identifier >()) {
        (*schema) << new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (lex< percentage >()) {
        (*schema) << new (ctx.mem) Textual(path, line, Textual::PERCENTAGE, lexed);
      }
      else if (lex< dimension >()) {
        (*schema) << new (ctx.mem) Textual(path, line, Textual::DIMENSION, lexed);
      }
      else if (lex< number >()) {
        (*schema) << new (ctx.mem) Textual(path, line, Textual::NUMBER, lexed);
      }
      else if (lex< hex >()) {
        (*schema) << new (ctx.mem) Textual(path, line, Textual::HEX, lexed);
      }
      else if (lex< string_constant >()) {
        (*schema) << new (ctx.mem) String_Constant(path, line, lexed);
        if (!num_items) schema->quote_mark(*lexed.begin);
      }
      else if (lex< variable >()) {
        (*schema) << new (ctx.mem) Variable(path, line, lexed);
      }
      else {
        error("error parsing interpolated value");
      }
      ++num_items;
    }
    return schema;
  }

  String_Schema* Parser::parse_url_schema()
  {
    String_Schema* schema = new (ctx.mem) String_Schema(path, line);

    while (position < end) {
      if (position[0] == '/') {
        lexed = Token(position, position+1);
        (*schema) << new (ctx.mem) String_Constant(path, line, lexed);
        ++position;
      }
      else if (lex< interpolant >()) {
        Token insides(Token(lexed.begin + 2, lexed.end - 1));
        Expression* interp_node = Parser::from_token(insides, ctx, path, line).parse_list();
        interp_node->is_interpolant(true);
        (*schema) << interp_node;
      }
      else if (lex< sequence< identifier, exactly<':'> > >()) {
        (*schema) << new (ctx.mem) String_Constant(path, line, lexed);
      }
      else if (lex< filename >()) {
        (*schema) << new (ctx.mem) String_Constant(path, line, lexed);
      }
      else {
        error("error parsing interpolated url");
      }
    }
    return schema;
  }

  String* Parser::parse_identifier_schema()
  {
    lex< sequence< optional< exactly<'*'> >, identifier_schema > >();
    Token id(lexed);
    const char* i = id.begin;
    // see if there any interpolants
    const char* p = find_first_in_interval< sequence< negate< exactly<'\\'> >, exactly<hash_lbrace> > >(id.begin, id.end);
    if (!p) {
      return new (ctx.mem) String_Constant(path, line, id);
    }

    String_Schema* schema = new (ctx.mem) String_Schema(path, line);
    while (i < id.end) {
      p = find_first_in_interval< sequence< negate< exactly<'\\'> >, exactly<hash_lbrace> > >(i, id.end);
      if (p) {
        if (i < p) {
          (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, p)); // accumulate the preceding segment if it's nonempty
        }
        const char* j = find_first_in_interval< exactly<rbrace> >(p, id.end); // find the closing brace
        if (j) {
          // parse the interpolant and accumulate it
          Expression* interp_node = Parser::from_token(Token(p+2, j), ctx, path, line).parse_list();
          interp_node->is_interpolant(true);
          (*schema) << interp_node;
          i = j+1;
        }
        else {
          // throw an error if the interpolant is unterminated
          error("unterminated interpolant inside interpolated identifier " + id.to_string());
        }
      }
      else { // no interpolants left; add the last segment if nonempty
        if (i < id.end) (*schema) << new (ctx.mem) String_Constant(path, line, Token(i, id.end));
        break;
      }
    }
    return schema;
  }

  Function_Call* Parser::parse_function_call()
  {
    lex< identifier >();
    string name(lexed);
    size_t line_of_call = line;

    Function_Call* the_call = new (ctx.mem) Function_Call(path, line_of_call, name, parse_arguments());
    return the_call;
  }

  Function_Call_Schema* Parser::parse_function_call_schema()
  {
    String* name = parse_identifier_schema();
    size_t line_of_call = line;

    Function_Call_Schema* the_call = new (ctx.mem) Function_Call_Schema(path, line_of_call, name, parse_arguments());
    return the_call;
  }

  If* Parser::parse_if_directive(bool else_if)
  {
    lex< if_directive >() || (else_if && lex< exactly<if_after_else_kwd> >());
    size_t if_line = line;
    Expression* predicate = parse_list();
    predicate->is_delayed(false);
    if (!peek< exactly<'{'> >()) error("expected '{' after the predicate for @if");
    Block* consequent = parse_block();
    Block* alternative = 0;
    if (lex< else_directive >()) {
      if (peek< exactly<if_after_else_kwd> >()) {
        alternative = new (ctx.mem) Block(path, line);
        (*alternative) << parse_if_directive(true);
      }
      else if (!peek< exactly<'{'> >()) {
        error("expected '{' after @else");
      }
      else {
        alternative = parse_block();
      }
    }
    return new (ctx.mem) If(path, if_line, predicate, consequent, alternative);
  }

  For* Parser::parse_for_directive()
  {
    lex< for_directive >();
    size_t for_line = line;
    if (!lex< variable >()) error("@for directive requires an iteration variable");
    string var(lexed);
    if (!lex< from >()) error("expected 'from' keyword in @for directive");
    Expression* lower_bound = parse_expression();
    lower_bound->is_delayed(false);
    bool inclusive = false;
    if (lex< through >()) inclusive = true;
    else if (lex< to >()) inclusive = false;
    else                  error("expected 'through' or 'to' keywod in @for directive");
    Expression* upper_bound = parse_expression();
    upper_bound->is_delayed(false);
    if (!peek< exactly<'{'> >()) error("expected '{' after the upper bound in @for directive");
    Block* body = parse_block();
    return new (ctx.mem) For(path, for_line, var, lower_bound, upper_bound, body, inclusive);
  }

  Each* Parser::parse_each_directive()
  {
    lex < each_directive >();
    size_t each_line = line;
    if (!lex< variable >()) error("@each directive requires an iteration variable");
    string var(lexed);
    if (!lex< in >()) error("expected 'in' keyword in @each directive");
    Expression* list = parse_list();
    list->is_delayed(false);
    if (list->concrete_type() == Expression::LIST) {
      List* l = static_cast<List*>(list);
      for (size_t i = 0, L = l->length(); i < L; ++i) {
        (*l)[i]->is_delayed(false);
      }
    }
    if (!peek< exactly<'{'> >()) error("expected '{' after the upper bound in @each directive");
    Block* body = parse_block();
    return new (ctx.mem) Each(path, each_line, var, list, body);
  }

  While* Parser::parse_while_directive()
  {
    lex< while_directive >();
    size_t while_line = line;
    Expression* predicate = parse_list();
    predicate->is_delayed(false);
    Block* body = parse_block();
    return new (ctx.mem) While(path, while_line, predicate, body);
  }

  Media_Block* Parser::parse_media_block()
  {
    lex< media >();
    size_t media_line = line;

    List* media_queries = parse_media_queries();

    if (!peek< exactly<'{'> >()) {
      error("expected '{' in media query");
    }
    Block* block = parse_block();

    return new (ctx.mem) Media_Block(path, media_line, media_queries, block);
  }

  List* Parser::parse_media_queries()
  {
    List* media_queries = new (ctx.mem) List(path, line, 0, List::COMMA);
    if (!peek< exactly<'{'> >()) (*media_queries) << parse_media_query();
    while (lex< exactly<','> >()) (*media_queries) << parse_media_query();
    return media_queries;
  }

  // Expression* Parser::parse_media_query()
  Media_Query* Parser::parse_media_query()
  {
    Media_Query* media_query = new (ctx.mem) Media_Query(path, line);

    if (lex< exactly< not_kwd > >()) media_query->is_negated(true);
    else if (lex< exactly< only_kwd > >()) media_query->is_restricted(true);

    if (peek< identifier_schema >()) media_query->media_type(parse_identifier_schema());
    else if (lex< identifier >())    media_query->media_type(new (ctx.mem) String_Constant(path, line, lexed));
    else                             (*media_query) << parse_media_expression();

    while (lex< exactly< and_kwd > >()) (*media_query) << parse_media_expression();

    return media_query;
  }

  Media_Query_Expression* Parser::parse_media_expression()
  {
    if (peek< identifier_schema >()) {
      String* ss = parse_identifier_schema();
      return new (ctx.mem) Media_Query_Expression(path, line, ss, 0, true);
    }
    if (!lex< exactly<'('> >()) {
      error("media query expression must begin with '('");
    }
    Expression* feature = 0;
    if (peek< exactly<')'> >()) {
      error("media feature required in media query expression");
    }
    feature = parse_expression();
    Expression* expression = 0;
    if (lex< exactly<':'> >()) {
      expression = parse_list();
    }
    if (!lex< exactly<')'> >()) {
      error("unclosed parenthesis in media query expression");
    }
    return new (ctx.mem) Media_Query_Expression(path, feature->line(), feature, expression);
  }

  At_Rule* Parser::parse_at_rule()
  {
    lex<at_keyword>();
    string kwd(lexed);
    size_t at_line = line;
    Selector* sel = 0;
    Selector_Lookahead lookahead = lookahead_for_extension_target(position);
    if (lookahead.found) {
      if (lookahead.has_interpolants) {
        sel = parse_selector_schema(lookahead.found);
      }
      else {
        sel = parse_selector_group();
      }
    }
    Block* body = 0;
    if (peek< exactly<'{'> >()) body = parse_block();
    return new (ctx.mem) At_Rule(path, at_line, kwd, sel, body);
  }

  Warning* Parser::parse_warning()
  {
    lex< warn >();
    return new (ctx.mem) Warning(path, line, parse_list());
  }

  Selector_Lookahead Parser::lookahead_for_selector(const char* start)
  {
    const char* p = start ? start : position;
    const char* q;
    bool saw_interpolant = false;

    while ((q = peek< identifier >(p))                             ||
           (q = peek< type_selector >(p))                          ||
           (q = peek< id_name >(p))                                ||
           (q = peek< class_name >(p))                             ||
           (q = peek< sequence< pseudo_prefix, identifier > >(p))  ||
           (q = peek< percentage >(p))                             ||
           (q = peek< dimension >(p))                              ||
           (q = peek< string_constant >(p))                        ||
           (q = peek< exactly<'*'> >(p))                           ||
           (q = peek< exactly<'('> >(p))                           ||
           (q = peek< exactly<')'> >(p))                           ||
           (q = peek< exactly<'['> >(p))                           ||
           (q = peek< exactly<']'> >(p))                           ||
           (q = peek< exactly<'+'> >(p))                           ||
           (q = peek< exactly<'~'> >(p))                           ||
           (q = peek< exactly<'>'> >(p))                           ||
           (q = peek< exactly<','> >(p))                           ||
           (q = peek< binomial >(p))                               ||
           (q = peek< sequence< optional<sign>,
                                optional<digits>,
                                exactly<'n'> > >(p))               ||
           (q = peek< sequence< optional<sign>,
                                digits > >(p))                     ||
           (q = peek< number >(p))                                 ||
           (q = peek< exactly<'&'> >(p))                           ||
           (q = peek< exactly<'%'> >(p))                           ||
           (q = peek< alternatives<exact_match,
                                   class_match,
                                   dash_match,
                                   prefix_match,
                                   suffix_match,
                                   substring_match> >(p))          ||
           (q = peek< sequence< exactly<'.'>, interpolant > >(p))  ||
           (q = peek< sequence< exactly<'#'>, interpolant > >(p))  ||
           (q = peek< sequence< exactly<'-'>, interpolant > >(p))  ||
           (q = peek< sequence< pseudo_prefix, interpolant > >(p)) ||
           (q = peek< interpolant >(p))) {
      p = q;
      if (*(p - 1) == '}') saw_interpolant = true;
    }

    Selector_Lookahead result;
    result.found            = peek< exactly<'{'> >(p) ? p : 0;
    result.has_interpolants = saw_interpolant;

    return result;
  }

  Selector_Lookahead Parser::lookahead_for_extension_target(const char* start)
  {
    const char* p = start ? start : position;
    const char* q;
    bool saw_interpolant = false;
    bool saw_stuff = false;

    while ((q = peek< identifier >(p))                             ||
           (q = peek< type_selector >(p))                          ||
           (q = peek< id_name >(p))                                ||
           (q = peek< class_name >(p))                             ||
           (q = peek< sequence< pseudo_prefix, identifier > >(p))  ||
           (q = peek< percentage >(p))                             ||
           (q = peek< dimension >(p))                              ||
           (q = peek< string_constant >(p))                        ||
           (q = peek< exactly<'*'> >(p))                           ||
           (q = peek< exactly<'('> >(p))                           ||
           (q = peek< exactly<')'> >(p))                           ||
           (q = peek< exactly<'['> >(p))                           ||
           (q = peek< exactly<']'> >(p))                           ||
           (q = peek< exactly<'+'> >(p))                           ||
           (q = peek< exactly<'~'> >(p))                           ||
           (q = peek< exactly<'>'> >(p))                           ||
           (q = peek< exactly<','> >(p))                           ||
           (q = peek< binomial >(p))                               ||
           (q = peek< sequence< optional<sign>,
                                optional<digits>,
                                exactly<'n'> > >(p))               ||
           (q = peek< sequence< optional<sign>,
                                digits > >(p))                     ||
           (q = peek< number >(p))                                 ||
           (q = peek< exactly<'&'> >(p))                           ||
           (q = peek< exactly<'%'> >(p))                           ||
           (q = peek< alternatives<exact_match,
                                   class_match,
                                   dash_match,
                                   prefix_match,
                                   suffix_match,
                                   substring_match> >(p))          ||
           (q = peek< sequence< exactly<'.'>, interpolant > >(p))  ||
           (q = peek< sequence< exactly<'#'>, interpolant > >(p))  ||
           (q = peek< sequence< exactly<'-'>, interpolant > >(p))  ||
           (q = peek< sequence< pseudo_prefix, interpolant > >(p)) ||
           (q = peek< interpolant >(p))) {
      p = q;
      if (*(p - 1) == '}') saw_interpolant = true;
      saw_stuff = true;
    }

    Selector_Lookahead result;
    result.found            = peek< alternatives< exactly<';'>, exactly<'}'>, exactly<'{'> > >(p) && saw_stuff ? p : 0;
    result.has_interpolants = saw_interpolant;

    return result;
  }

  void Parser::read_bom()
  {
    size_t skip = 0;
    string encoding;
    bool utf_8 = false;
    switch ((unsigned char) source[0]) {
    case 0xEF:
      skip = check_bom_chars(source, utf_8_bom, 3);
      encoding = "UTF-8";
      utf_8 = true;
      break;
    case 0xFE:
      skip = check_bom_chars(source, utf_16_bom_be, 2);
      encoding = "UTF-16 (big endian)";
      break;
    case 0xFF:
      skip = check_bom_chars(source, utf_16_bom_le, 2);
      skip += (skip ? check_bom_chars(source, utf_32_bom_le, 4) : 0);
      encoding = (skip == 2 ? "UTF-16 (little endian)" : "UTF-32 (little endian)");
      break;
    case 0x00:
      skip = check_bom_chars(source, utf_32_bom_be, 4);
      encoding = "UTF-32 (big endian)";
      break;
    case 0x2B:
      skip = check_bom_chars(source, utf_7_bom_1, 4)
           | check_bom_chars(source, utf_7_bom_2, 4)
           | check_bom_chars(source, utf_7_bom_3, 4)
           | check_bom_chars(source, utf_7_bom_4, 4)
           | check_bom_chars(source, utf_7_bom_5, 5);
      encoding = "UTF-7";
      break;
    case 0xF7:
      skip = check_bom_chars(source, utf_1_bom, 3);
      encoding = "UTF-1";
      break;
    case 0xDD:
      skip = check_bom_chars(source, utf_ebcdic_bom, 4);
      encoding = "UTF-EBCDIC";
      break;
    case 0x0E:
      skip = check_bom_chars(source, scsu_bom, 3);
      encoding = "SCSU";
      break;
    case 0xFB:
      skip = check_bom_chars(source, bocu_1_bom, 3);
      encoding = "BOCU-1";
      break;
    case 0x84:
      skip = check_bom_chars(source, gb_18030_bom, 4);
      encoding = "GB-18030";
      break;
    }
    if (skip > 0 && !utf_8) error("only UTF-8 documents are currently supported; your document appears to be " + encoding);
    position += skip;
  }

  size_t check_bom_chars(const char* src, const unsigned char* bom, size_t len)
  {
    size_t skip = 0;
    for (size_t i = 0; i < len; ++i, ++skip) {
      if ((unsigned char) src[i] != bom[i]) return 0;
    }
    return skip;
  }


  Expression* Parser::fold_operands(Expression* base, vector<Expression*>& operands, Binary_Expression::Type op)
  {
    for (size_t i = 0, S = operands.size(); i < S; ++i) {
      base = new (ctx.mem) Binary_Expression(path, line, op, base, operands[i]);
      Binary_Expression* b = static_cast<Binary_Expression*>(base);
      if (op == Binary_Expression::DIV && b->left()->is_delayed() && b->right()->is_delayed()) {
        base->is_delayed(true);
      }
      else {
        b->left()->is_delayed(false);
        b->right()->is_delayed(false);
      }
    }
    return base;
  }

  Expression* Parser::fold_operands(Expression* base, vector<Expression*>& operands, vector<Binary_Expression::Type>& ops)
  {
    for (size_t i = 0, S = operands.size(); i < S; ++i) {
      base = new (ctx.mem) Binary_Expression(path, line, ops[i], base, operands[i]);
      Binary_Expression* b = static_cast<Binary_Expression*>(base);
      if (ops[i] == Binary_Expression::DIV && b->left()->is_delayed() && b->right()->is_delayed()) {
        base->is_delayed(true);
      }
      else {
        b->left()->is_delayed(false);
        b->right()->is_delayed(false);
      }
    }
    return base;
  }

  void Parser::error(string msg, size_t ln)
  {
    throw Error(Error::syntax, path, ln ? ln : line, msg);
  }

}
