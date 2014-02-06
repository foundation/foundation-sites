#include "eval_apply.hpp"
#include "selector.hpp"
#include "constants.hpp"
#include "prelexer.hpp"
#include "document.hpp"
#include "error.hpp"
#include <cctype>
#include <cmath>
#include <iostream>
#include <sstream>
#include <cstdlib>
#include <cstring>

namespace Sass {
  using namespace Constants;
  using std::cerr; using std::endl;

  static void throw_eval_error(Backtrace& bt, string message, string path, size_t line)
  {
    if (!path.empty() && Prelexer::string_constant(path.c_str()))
      path = path.substr(1, path.size() - 1);

    Backtrace top(&bt, path, line, "");
    message += top.to_string();

    throw Error(Error::evaluation, path, line, message);
  }

  // Expansion function for nodes in an expansion context.
  void expand(Node expr, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool function_name, const Node content)
  {
    switch (expr.type())
    {
      case Node::root: {
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
            if (i == 19) {

          expand(expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
            }
            else {
          expand(expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
            }
        }
      } break;

      case Node::mixin: { // mixin definition
        env[expr[0].token()] = expr;
      } break;

      case Node::function: { // function definition
        f_env[expr[0].to_string()] = Function(expr);
      } break;

      case Node::mixin_call: { // mixin invocation
        Token name(expr[0].token());
        Node args(expr[1]);
        Node this_content = expr.size() == 3 ? expr[2] : Node();
        if (!this_content.is_null()) expand(this_content, prefix, env, f_env, new_Node, ctx, bt, false, content);
        if (!env.query(name)) throw_eval_error(bt, "mixin " + name.to_string() + " is undefined", expr.path(), expr.line());
        Node mixin(env[name]);
        Backtrace here(&bt, expr.path(), expr.line(), ", in mixin '" + name.to_string() + "'");
        Node expansion(apply_mixin(mixin, args, this_content, prefix, env, f_env, new_Node, ctx, here));
        expr.pop_all();   // pop the mixin metadata
        expr += expansion; // push the expansion
      } break;

      case Node::mixin_content: {
        if (!content.is_null()) {
          expr += new_Node(content);
          for (size_t i = 0, S = expr.size(); i < S; ++i) {
            re_expand(expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
          }
        }
      } break;

      case Node::propset: {
        // TO DO: perform the property expansion here, rather than in the emitter (also requires the parser to allow interpolants in the property names)
        expr[0] = eval(expr[0], prefix, env, f_env, new_Node, ctx, bt);
        expand(expr[1], prefix, env, f_env, new_Node, ctx, bt, false, content);

        // Node block(expr[1]);
        // for (size_t i = 0, S = block.size(); i < S; ++i) {
        //   Node stm(block[i]);
        //   switch (stm.type())
        //   {
        //     case Node::propset:
        //     case Node::mixin_call:
        //     case Node::if_directive:
        //     case Node::for_through_directive:
        //     case Node::for_to_directive:
        //     case Node::each_directive:
        //     case Node::while_directive:
        //     case Node::warning: {
        //       expand(stm, prefix, env, f_env, new_Node, ctx, bt, false, content);
        //     } break;
        //   }
        // }
      } break;

      case Node::ruleset: {
        // if the selector contains interpolants, eval it and re-parse
        if (!expr[0].is_null() && expr[0].type() == Node::selector_schema) {
          Node schema(expr[0]);
          string expansion;
          for (size_t i = 0, S = schema.size(); i < S; ++i) {
            schema[i] = eval(schema[i], prefix, env, f_env, new_Node, ctx, bt);
            if (schema[i].type() == Node::string_constant) {
              expansion += schema[i].token().unquote();
            }
            else {
              expansion += schema[i].to_string();
            }
          }
          // need to re-parse the selector because its structure may have changed
          expansion += " {"; // the parser looks for an lbrace to end a selector
          char* expn_src = new char[expansion.size() + 1];
          strcpy(expn_src, expansion.c_str());
          Document needs_reparsing(Document::make_from_source_chars(ctx, expn_src, schema.path(), true));
          needs_reparsing.line = schema.line(); // set the line number to the original node's line
          expr[0] = needs_reparsing.parse_selector_group();
        }

        // Expand the selector with the prefix and save it in expr[2].
        expr << expand_selector(expr[0], prefix, new_Node);

        expand(expr[1], expr.back(), env, f_env, new_Node, ctx, bt, false, content);
      } break;

      case Node::media_query: {
        Node id(expr[0]);
        if( id.is_schema() || id.should_eval()) {
          expr[0] = eval(id, prefix, env, f_env, new_Node, ctx, bt);
        } else {
          expand(expr[0], prefix, env, f_env, new_Node, ctx, bt, false, content);
        }
        expand(expr[1], prefix, env, f_env, new_Node, ctx, bt, false, content);
        expr << prefix;
      } break;

      case Node::media_expression_group: {
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          expand(expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
        }
      } break;

      case Node::media_expression: {
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          if (expr[i].type() == Node::rule) {
            expand(expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
          }
          else {
            expr[i] = eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
          }
        }
      } break;

      case Node::keyframes: {
        Node id(expr[1]);
        if (id.is_schema() || id.should_eval()) {
          expr[1] = eval(id, prefix, env, f_env, new_Node, ctx, bt);
        }
        expand(expr[2], prefix, env, f_env, new_Node, ctx, bt, false, content);
      } break;

      case Node::keyframe: {
        expand(expr[0], prefix, env, f_env, new_Node, ctx, bt, false, content);
        expand(expr[1], prefix, env, f_env, new_Node, ctx, bt, false, content);
      } break;

      case Node::block: {
        Environment new_frame;
        new_frame.link(env);
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
            if (i == 8) {
                expand(expr[i], prefix, new_frame, f_env, new_Node, ctx, bt, false, content);
            } else {
                expand(expr[i], prefix, new_frame, f_env, new_Node, ctx, bt, false, content);
            }
        }
      } break;

      case Node::assignment: {
        Node var(expr[0]);
        if (expr.is_guarded() && env.query(var.token())) return;
        Node val(expr[1]);
        if (val.type() == Node::list) {
          for (size_t i = 0, S = val.size(); i < S; ++i) {
            if (val[i].should_eval()) val[i] = eval(val[i], prefix, env, f_env, new_Node, ctx, bt);
          }
        }
        else {
          val = eval(val, prefix, env, f_env, new_Node, ctx, bt);
        }

        // If a binding exists (possibly upframe), then update it.
        // Otherwise, make a new on in the current frame.
        if (env.query(var.token())) {
          env[var.token()] = val;
        }
        else {
          env.current_frame[var.token()] = val;
        }
      } break;

      case Node::rule: {
        Node lhs(expr[0]);
        if (lhs.is_schema()) {
          expr[0] = eval(lhs, prefix, env, f_env, new_Node, ctx, bt);
        }
        Node rhs(expr[1]);
        if (rhs.type() == Node::list) {
          for (size_t i = 0, S = rhs.size(); i < S; ++i) {
            if (rhs[i].should_eval()) {
              rhs[i] = eval(rhs[i], prefix, env, f_env, new_Node, ctx, bt);
            }
          }
        }
        else if (rhs.is_schema() || rhs.should_eval()) {
          expr[1] = eval(rhs, prefix, env, f_env, new_Node, ctx, bt);
        }
        if (expr[1].type() == Node::list && expr[1].empty()) {
          throw_eval_error(bt, "the value of a style property may not be empty", expr[1].path(), expr[1].line());
        }
      } break;

      case Node::extend_directive: {
        if (prefix.is_null()) throw_eval_error(bt, "@extend directive may only be used within rules", expr.path(), expr.line());

        // if the extendee contains interpolants, eval it and re-parse
        if (expr[0].type() == Node::selector_schema) {
          Node schema(expr[0]);
          string expansion;
          for (size_t i = 0, S = schema.size(); i < S; ++i) {
            schema[i] = eval(schema[i], prefix, env, f_env, new_Node, ctx, bt);
            if (schema[i].type() == Node::string_constant) {
              expansion += schema[i].token().unquote();
            }
            else {
              expansion += schema[i].to_string();
            }
          }
          // need to re-parse the selector because its structure may have changed
          expansion += " {"; // the parser looks for an lbrace to end a selector
          char* expn_src = new char[expansion.size() + 1];
          strcpy(expn_src, expansion.c_str());
          Document needs_reparsing(Document::make_from_source_chars(ctx, expn_src, schema.path(), true));
          needs_reparsing.line = schema.line(); // set the line number to the original node's line
          expr[0] = needs_reparsing.parse_selector_group();
        }

        // only simple selector sequences may be extended
        switch (expr[0].type())
        {
          case Node::selector_group:
            throw_eval_error(bt, "selector groups may not be extended", expr[0].path(), expr[0].line());
            break;
          case Node::selector:
            throw_eval_error(bt, "nested selectors may not be extended", expr[0].path(), expr[0].line());
            break;
          default:
            break;
        }

        // each extendee maps to a set of extenders: extendee -> { extenders }

        // if it's a single selector, just add it to the set
        if (prefix.type() != Node::selector_group) {
          ctx.extensions.insert(pair<Node, Node>(expr[0], prefix));
        }
        // otherwise add each member of the selector group separately
        else {
          for (size_t i = 0, S = prefix.size(); i < S; ++i) {
            ctx.extensions.insert(pair<Node, Node>(expr[0], prefix[i]));
          }
        }
        ctx.has_extensions = true;
      } break;

      case Node::if_directive: {
        Node expansion = Node();
        for (size_t i = 0, S = expr.size(); i < S; i += 2) {
          if (expr[i].type() != Node::block) {
            Node predicate_val(eval(expr[i], prefix, env, f_env, new_Node, ctx, bt));
            if (!predicate_val.is_false()) {
              expand(expansion = expr[i+1], prefix, env, f_env, new_Node, ctx, bt, false, content);
              break;
            }
          }
          else {
            expand(expansion = expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
            break;
          }
        }
        expr.pop_all();
        if (!expansion.is_null()) expr += expansion;
      } break;

      case Node::for_through_directive:
      case Node::for_to_directive: {
        Node fake_mixin(new_Node(Node::mixin, expr.path(), expr.line(), 3));
        Node fake_param(new_Node(Node::parameters, expr.path(), expr.line(), 1));
        fake_mixin << new_Node(Node::identifier, "", 0, Token::make(for_kwd)) // stub name for debugging
                   << (fake_param << expr[0])                                 // iteration variable
                   << expr[3];                                                // body
        Node lower_bound(eval(expr[1], prefix, env, f_env, new_Node, ctx, bt));
        Node upper_bound(eval(expr[2], prefix, env, f_env, new_Node, ctx, bt));
        if (!(lower_bound.is_numeric() && upper_bound.is_numeric())) {
          throw_eval_error(bt, "bounds of @for directive must be numeric", expr.path(), expr.line());
        }
        expr.pop_all();
        for (double i = lower_bound.numeric_value(),
                    U = upper_bound.numeric_value() + ((expr.type() == Node::for_to_directive) ? 0 : 1);
             i < U;
             ++i) {
          Node i_node(new_Node(expr.path(), expr.line(), i));
          Node fake_arg(new_Node(Node::arguments, expr.path(), expr.line(), 1));
          fake_arg << i_node;
          expr += apply_mixin(fake_mixin, fake_arg, content, prefix, env, f_env, new_Node, ctx, bt, true);
        }
      } break;

      case Node::each_directive: {
        Node fake_mixin(new_Node(Node::mixin, expr.path(), expr.line(), 3));
        Node fake_param(new_Node(Node::parameters, expr.path(), expr.line(), 1));
        fake_mixin << new_Node(Node::identifier, "", 0, Token::make(each_kwd)) // stub name for debugging
                   << (fake_param << expr[0])                                  // iteration variable
                   << expr[2];                                                 // body
        Node list(eval(expr[1], prefix, env, f_env, new_Node, ctx, bt));
        // If the list isn't really a list, make a singleton out of it.
        if (list.type() != Node::list) {
          list = (new_Node(Node::list, list.path(), list.line(), 1) << list);
        }
        expr.pop_all();
        for (size_t i = 0, S = list.size(); i < S; ++i) {
          Node fake_arg(new_Node(Node::arguments, expr.path(), expr.line(), 1));
          list[i].should_eval() = true;
          fake_arg << eval(list[i], prefix, env, f_env, new_Node, ctx, bt);
          expr += apply_mixin(fake_mixin, fake_arg, content, prefix, env, f_env, new_Node, ctx, bt, true);
        }
      } break;

      case Node::while_directive: {
        Node fake_mixin(new_Node(Node::mixin, expr.path(), expr.line(), 3));
        Node fake_param(new_Node(Node::parameters, expr.path(), expr.line(), 0));
        Node fake_arg(new_Node(Node::arguments, expr.path(), expr.line(), 0));
        fake_mixin << new_Node(Node::identifier, "", 0, Token::make(while_kwd))  // stub name for debugging
                   << fake_param                                                 // no iteration variable
                   << expr[1];                                                   // body
        Node pred(expr[0]);
        expr.pop_back();
        expr.pop_back();
        Node ev_pred(eval(pred, prefix, env, f_env, new_Node, ctx, bt));
        while (!ev_pred.is_false()) {
          expr += apply_mixin(fake_mixin, fake_arg, content, prefix, env, f_env, new_Node, ctx, bt, true);
          ev_pred = eval(pred, prefix, env, f_env, new_Node, ctx, bt);
        }
      } break;

      case Node::block_directive: {
        // TO DO: eval the directive name for interpolants
        expand(expr[1], new_Node(Node::none, expr.path(), expr.line(), 0), env, f_env, new_Node, ctx, bt, false, content);
      } break;

      case Node::warning: {
        Node contents(eval(expr[0], Node(), env, f_env, new_Node, ctx, bt));

        string prefix("WARNING: ");
        string indent("         ");
        string result(contents.to_string());
        if (contents.type() == Node::string_constant || contents.type() == Node::string_schema) {
          result = result.substr(1, result.size()-2); // unquote if it's a single string
        }
        // These cerrs aren't log lines! They're supposed to be here!
        cerr << prefix << result;
        // cerr << indent << "on line " << expr.line() << " of " << expr.path();
        Backtrace top(&bt, expr.path(), expr.line(), "");
        cerr << top.to_string(true);
        cerr << endl << endl;
      } break;

      default: {
        // do nothing
      } break;

    }
  }

  void re_expand(Node expr, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool function_name, const Node content)
  {
    switch (expr.type())
    {
      case Node::ruleset: {
        expr[2] = expand_selector(expr[0], prefix, new_Node);
        re_expand(expr[1], expr[2], env, f_env, new_Node, ctx, bt, false, content);
      } break;

      case Node::block:
      case Node::mixin_call:
      case Node::mixin_content:
      case Node::if_directive:
      case Node::for_through_directive:
      case Node::for_to_directive:
      case Node::each_directive:
      case Node::while_directive: {
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          re_expand(expr[i], prefix, env, f_env, new_Node, ctx, bt, false, content);
        }
      } break;

      case Node::media_query: {
        expr[2] = prefix;
        re_expand(expr[1], prefix, env, f_env, new_Node, ctx, bt, false, content);
      } break;

      case Node::block_directive: {
        re_expand(expr[1], prefix, env, f_env, new_Node, ctx, bt, false, content);
      } break;

      default: {
        return;
      } break;
    }
    return;
  }

  void expand_list(Node list, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt)
  {
    for (size_t i = 0, S = list.size(); i < S; ++i) {
      list[i].should_eval() = true;
      list[i] = eval(list[i], prefix, env, f_env, new_Node, ctx, bt);
    }
  }

  // Evaluation function for nodes in a value context.
  Node eval(Node expr, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool function_name)
  {
    Node result = Node();
    switch (expr.type())
    {
      case Node::list: {
        // cerr << string(bt.depth(), '\t') << "about to eval a list: " << expr.to_string() << "::" << expr.is_arglist() << endl;
        bool is_arglist = expr.is_arglist();
        bool is_splat = expr.is_splat();
        if (expr.should_eval() && expr.size() > 0) {
          result = new_Node(Node::list, expr.path(), expr.line(), expr.size());
          result.is_comma_separated() = expr.is_comma_separated();
          for(size_t i = 0, S = expr.size(); i < S; i++) {
            result << eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
          }
          result.is_arglist() = is_arglist;
          result.is_splat() = is_splat;
          // cerr << string(bt.depth(), '\t') << "evaluated a list: " << result.to_string() << "::" << result.is_arglist() << endl;
        }
        // else cerr << string(bt.depth(), '\t') << "evaluated a list (sort of): " << expr.to_string() << "::" << expr.is_arglist() << endl;
      } break;

      case Node::disjunction: {
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          result = eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
          if (result.is_false()) continue;
          else                   break;
        }
      } break;

      case Node::conjunction: {
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          result = eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
          if (result.is_false()) break;
        }
      } break;

      case Node::relation: {
        Node lhs(new_Node(Node::arguments, expr[0].path(), expr[0].line(), 1));
        Node rhs(new_Node(Node::arguments, expr[2].path(), expr[2].line(), 1));
        Node rel(expr[1]);

        lhs << expr[0];
        rhs << expr[2];
        lhs = eval_arguments(lhs, prefix, env, f_env, new_Node, ctx, bt);
        rhs = eval_arguments(rhs, prefix, env, f_env, new_Node, ctx, bt);
        lhs = lhs[0];
        rhs = rhs[0];
        if (lhs.type() == Node::list) expand_list(lhs, prefix, env, f_env, new_Node, ctx, bt);
        if (rhs.type() == Node::list) expand_list(rhs, prefix, env, f_env, new_Node, ctx, bt);

        Node T(new_Node(Node::boolean, lhs.path(), lhs.line(), true));
        Node F(new_Node(Node::boolean, lhs.path(), lhs.line(), false));

        switch (rel.type())
        {
          case Node::eq:  result = ((lhs == rhs) ? T : F); break;
          case Node::neq: result = ((lhs != rhs) ? T : F); break;
          case Node::gt:  result = ((lhs > rhs)  ? T : F); break;
          case Node::gte: result = ((lhs >= rhs) ? T : F); break;
          case Node::lt:  result = ((lhs < rhs)  ? T : F); break;
          case Node::lte: result = ((lhs <= rhs) ? T : F); break;
          default:
            throw_eval_error(bt, "unknown comparison operator " + expr.token().to_string(), expr.path(), expr.line());
        }
      } break;

      case Node::expression: {
        Node list(new_Node(Node::expression, expr.path(), expr.line(), expr.size()));
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          list << eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
        }
        result = reduce(list, 1, list[0], new_Node, bt);
      } break;

      case Node::term: {
        if (expr.should_eval()) {
          Node list(new_Node(Node::term, expr.path(), expr.line(), expr.size()));
          for (size_t i = 0, S = expr.size(); i < S; ++i) {
            list << eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
          }
          result = reduce(list, 1, list[0], new_Node, bt);
        }
      } break;

      case Node::textual_percentage: {
        result = new_Node(expr.path(), expr.line(), std::atof(expr.token().begin), Node::numeric_percentage);
      } break;

      case Node::textual_dimension: {
        result = new_Node(expr.path(), expr.line(),
                          std::atof(expr.token().begin),
                          Token::make(Prelexer::number(expr.token().begin),
                                      expr.token().end));
      } break;

      case Node::textual_number: {
        result = new_Node(expr.path(), expr.line(), std::atof(expr.token().begin));
      } break;

      case Node::textual_hex: {
        result = new_Node(Node::numeric_color, expr.path(), expr.line(), 4);
        Token hext(Token::make(expr.token().begin+1, expr.token().end));
        if (hext.length() == 6) {
          for (int i = 0; i < 6; i += 2) {
            result << new_Node(expr.path(), expr.line(), static_cast<double>(std::strtol(string(hext.begin+i, 2).c_str(), NULL, 16)));
          }
        }
        else {
          for (int i = 0; i < 3; ++i) {
            result << new_Node(expr.path(), expr.line(), static_cast<double>(std::strtol(string(2, hext.begin[i]).c_str(), NULL, 16)));
          }
        }
        result << new_Node(expr.path(), expr.line(), 1.0);
      } break;

      case Node::variable: {
        if (!env.query(expr.token())) throw_eval_error(bt, "reference to unbound variable " + expr.token().to_string(), expr.path(), expr.line());
        result = env[expr.token()];
        // cerr << string(bt.depth(), '\t') << "evaluated a lookup: " << expr.to_string() << " -> " << result.to_string() << "::" << result.is_arglist() << endl;
      } break;

      case Node::uri: {
        result = new_Node(Node::uri, expr.path(), expr.line(), 1);
        result << eval(expr[0], prefix, env, f_env, new_Node, ctx, bt);
      } break;

      case Node::function_call: {
        // TO DO: default-constructed Function should be a generic callback (maybe)

        // eval the function name in case it's interpolated
        Node name_node(eval(expr[0], prefix, env, f_env, new_Node, ctx, bt, true));
        string name(name_node.to_string());
        if (!f_env.count(name)) {
          // no definition available; just pass it through (with evaluated args)
          Node args(expr[1]);
          Node evaluated_args(new_Node(Node::arguments, args.path(), args.line(), args.size()));
          for (size_t i = 0, S = args.size(); i < S; ++i) {
            evaluated_args << eval(args[i], prefix, env, f_env, new_Node, ctx, bt);
            if (evaluated_args.back().type() == Node::list) {
              Node arg_list(evaluated_args.back());
              for (size_t j = 0, S = arg_list.size(); j < S; ++j) {
                if (arg_list[j].should_eval()) arg_list[j] = eval(arg_list[j], prefix, env, f_env, new_Node, ctx, bt);
              }
            }
          }
          result = new_Node(Node::function_call, expr.path(), expr.line(), 2);
          result << name_node << evaluated_args;
        }
        else {
          // check to see if the function is an overloaded primitive
          Function f(f_env[name]);
          if (f.overloaded) {
            stringstream s;
            s << name << " " << expr[1].size();
            string resolved_name(s.str());
            if (!f_env.count(resolved_name)) throw_eval_error(bt, "wrong number of arguments to " + name, expr.path(), expr.line());
            f = f_env[resolved_name];
          }
          Backtrace here(&bt, expr.path(), expr.line(), ", in function '" + name + "'");
          result = apply_function(f, expr[1], prefix, env, f_env, new_Node, ctx, here, expr.path(), expr.line());
        }
      } break;

      case Node::unary_plus: {
        Node arg(eval(expr[0], prefix, env, f_env, new_Node, ctx, bt));
        if (arg.is_numeric()) {
          result = arg;
        }
        else {
          result = new_Node(Node::unary_plus, expr.path(), expr.line(), 1);
          result << arg;
        }
      } break;

      case Node::unary_minus: {
        Node arg(eval(expr[0], prefix, env, f_env, new_Node, ctx, bt));
        if (arg.is_numeric()) {
          double neg_val = -arg.numeric_value();
          Node::Type t = arg.type();
          switch (t)
          {
            case Node::number:
            case Node::numeric_percentage: {
              result = new_Node(expr.path(), expr.line(), neg_val, t);
            } break;

            case Node::numeric_dimension: {
              result = new_Node(expr.path(), expr.line(), neg_val, arg.unit());
            } break;

            default: {
              // unreachable
              result = arg;
            } break;
          }
        }
        else {
          result = new_Node(Node::unary_minus, expr.path(), expr.line(), 1);
          result << arg;
        }
      } break;

      case Node::identifier: {
        string id_str(expr.to_string());
        to_lowercase(id_str);
        if (!function_name && ctx.color_names_to_values.count(id_str)) {
          Node color_orig(ctx.color_names_to_values[id_str]);
          Node r(color_orig[0]);
          Node g(color_orig[1]);
          Node b(color_orig[2]);
          Node a(color_orig[3]);
          result = new_Node(expr.path(), expr.line(),
                            r.numeric_value(),
                            g.numeric_value(),
                            b.numeric_value(),
                            a.numeric_value());
        }
      } break;

      case Node::string_schema:
      case Node::value_schema:
      case Node::identifier_schema: {
        result = new_Node(expr.type(), expr.path(), expr.line(), expr.size());
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          result << eval(expr[i], prefix, env, f_env, new_Node, ctx, bt);
        }
        result.is_quoted() = expr.is_quoted();
      } break;

      case Node::css_import: {
        result = new_Node(Node::css_import, expr.path(), expr.line(), 1);
        result << eval(expr[0], prefix, env, f_env, new_Node, ctx, bt);
      } break;

      default: {
        result = expr;
      } break;
    }
    if (result.is_null()) result = expr;
    return result;
  }

  // Reduce arithmetic operations. Arithmetic expressions are stored as vectors
  // of operands with operators interspersed, rather than as the usual binary
  // tree. (This function is essentially a left fold.)
  Node reduce(Node list, size_t head, Node acc, Node_Factory& new_Node, Backtrace& bt)
  {
    if (head >= list.size()) return acc;
    Node op(list[head]);
    Node rhs(list[head + 1]);
    Node::Type optype = op.type();
    Node::Type ltype = acc.type();
    Node::Type rtype = rhs.type();
    if (ltype == Node::number && rtype == Node::number) {
      acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt));
    }
    else if (ltype == Node::number && rtype == Node::numeric_dimension) {
      acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt), rhs.unit());
    }
    else if (ltype == Node::number && rtype == Node::numeric_percentage) {
      acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt), Node::numeric_percentage);
    }
    else if (ltype == Node::numeric_dimension && rtype == Node::number) {
      acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt), acc.unit());
    }
    else if (ltype == Node::numeric_percentage && rtype == Node::number) {
      acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt), Node::numeric_percentage);
    }
    else if (ltype == Node::numeric_dimension && rtype == Node::numeric_dimension) {
      // TO DO: TRUE UNIT ARITHMETIC
      if (optype == Node::div) {
        acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt));
      }
      else {
        acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt), acc.unit());
      }
    }
    else if (ltype == Node::numeric_percentage && rtype == Node::numeric_percentage) {
      // TO DO: TRUE UNIT ARITHMETIC
      if (optype == Node::div) {
        acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt));
      }
      else {
        acc = new_Node(list.path(), list.line(), operate(op, acc.numeric_value(), rhs.numeric_value(), bt), Node::numeric_percentage);
      }
    }
    else if (ltype == Node::number && rtype == Node::numeric_color) {
      if (optype == Node::add || optype == Node::mul) {
        double r = operate(op, acc.numeric_value(), rhs[0].numeric_value(), bt);
        double g = operate(op, acc.numeric_value(), rhs[1].numeric_value(), bt);
        double b = operate(op, acc.numeric_value(), rhs[2].numeric_value(), bt);
        double a = rhs[3].numeric_value();
        acc = new_Node(list.path(), list.line(), r, g, b, a);
      }
      else {
        acc = (new_Node(Node::value_schema, list.path(), list.line(), 3) << acc);
        acc << op;
        acc << rhs;
      }
    }
    else if (ltype == Node::numeric_color && rtype == Node::number) {
      double r = operate(op, acc[0].numeric_value(), rhs.numeric_value(), bt);
      double g = operate(op, acc[1].numeric_value(), rhs.numeric_value(), bt);
      double b = operate(op, acc[2].numeric_value(), rhs.numeric_value(), bt);
      double a = acc[3].numeric_value();
      acc = new_Node(list.path(), list.line(), r, g, b, a);
    }
    else if (ltype == Node::numeric_color && rtype == Node::numeric_color) {
      if (acc[3].numeric_value() != rhs[3].numeric_value()) throw_eval_error(bt, "alpha channels must be equal for " + acc.to_string() + " + " + rhs.to_string(), acc.path(), acc.line());
      double r = operate(op, acc[0].numeric_value(), rhs[0].numeric_value(), bt);
      double g = operate(op, acc[1].numeric_value(), rhs[1].numeric_value(), bt);
      double b = operate(op, acc[2].numeric_value(), rhs[2].numeric_value(), bt);
      double a = acc[3].numeric_value();
      acc = new_Node(list.path(), list.line(), r, g, b, a);
    }
    else if (ltype == Node::concatenation && rtype == Node::concatenation) {
      if (optype != Node::add) acc << op;
      acc += rhs;
    }
    else if (ltype == Node::concatenation) {
      if (optype != Node::add) acc << op;
      acc << rhs;
    }
    else if (rtype == Node::concatenation) {
      acc = (new_Node(Node::concatenation, list.path(), list.line(), 2) << acc);
      if (optype != Node::add) acc << op;
      acc += rhs;
      acc.is_quoted() = acc[0].is_quoted();
    }
    else if (acc.is_string() || rhs.is_string()) {
      acc = (new_Node(Node::concatenation, list.path(), list.line(), 2) << acc);
      if (optype != Node::add) acc << op;
      acc << rhs;
      if (acc[0].is_quoted() || (ltype == Node::number && rhs.is_quoted())) {
        acc.is_quoted() = true;
      }
      else {
        acc.is_quoted() = false;
      }
    }
    else { // lists or schemas
      if (acc.is_schema() && rhs.is_schema()) {
        if (optype != Node::add) acc << op;
        acc += rhs;
      }
      else if (acc.is_schema()) {
        if (optype != Node::add) acc << op;
        acc << rhs;
      }
      else if (rhs.is_schema()) {
        acc = (new_Node(Node::value_schema, list.path(), list.line(), 2) << acc);
        if (optype != Node::add) acc << op;
        acc += rhs;
      }
      else {
        acc = (new_Node(Node::value_schema, list.path(), list.line(), 2) << acc);
        if (optype != Node::add) acc << op;
        acc << rhs;
      }
      acc.is_quoted() = false;
    }
    return reduce(list, head + 2, acc, new_Node, bt);
  }

  // Helper for doing the actual arithmetic.
  double operate(Node op, double lhs, double rhs, Backtrace& bt)
  {
    switch (op.type())
    {
      case Node::add: return lhs + rhs; break;
      case Node::sub: return lhs - rhs; break;
      case Node::mul: return lhs * rhs; break;
      case Node::div: {
        if (rhs == 0) throw_eval_error(bt, "divide by zero", op.path(), op.line());
        return lhs / rhs;
      } break;
      case Node::mod: {
        if (rhs == 0) throw_eval_error(bt, "divide by zero", op.path(), op.line());
        return std::fmod(lhs, rhs);
      } break;
      default:        return 0;         break;
    }
  }

  Node eval_arguments(Node args, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt)
  {
    // cerr << string(bt.depth(), '\t') << "evaluating arguments" << endl;
    Node evaluated_args(new_Node(Node::arguments, args.path(), args.line(), args.size()));
    for (size_t i = 0, S = args.size(); i < S; ++i) {
      if (args[i].type() != Node::assignment) {
        // bool is_arglist = args[i].is_arglist();
        bool is_splat = args[i].is_splat();
        evaluated_args << eval(args[i], prefix, env, f_env, new_Node, ctx, bt);
        // cerr << string(bt.depth(), '\t') << "just pushed an evaluated arg: " << evaluated_args[i].to_string() << "::" << evaluated_args[i].is_arglist() << endl;
        // if (evaluated_args[i].type() == Node::list) {
        //   Node arg_list(evaluated_args[i]);
        //   Node new_arg_list(new_Node(Node::list, arg_list.path(), arg_list.line(), arg_list.size()));
        //   new_arg_list.is_arglist() = arg_list.is_arglist();
        //   for (size_t j = 0, S = arg_list.size(); j < S; ++j) {
        //     if (arg_list[j].should_eval()) new_arg_list << eval(arg_list[j], prefix, env, f_env, new_Node, ctx, bt);
        //     else                           new_arg_list << arg_list[j];
        //   }
        //   evaluated_args[i] = new_arg_list;
        // }
        // evaluated_args[i].is_arglist() = is_arglist;
        // evaluated_args[i].is_arglist() = is_arglist;
        evaluated_args[i].is_splat() = is_splat;
        // cerr << string(bt.depth(), '\t') << "after first arg evaluation: " << evaluated_args[i].to_string() << "::" << evaluated_args[i].is_arglist() << endl;
      }
      else {
        // cerr << "shouldn't be taking this branch!" << endl;
        Node kwdarg(new_Node(Node::assignment, args[i].path(), args[i].line(), 2));
        kwdarg << args[i][0];
        kwdarg << eval(args[i][1], prefix, env, f_env, new_Node, ctx, bt);
        if (kwdarg.back().type() == Node::list) {
          Node arg_list(kwdarg.back());
          Node new_arg_list(new_Node(Node::list, arg_list.path(), arg_list.line(), arg_list.size()));
          for (size_t j = 0, S = arg_list.size(); j < S; ++j) {
            if (arg_list[j].should_eval()) new_arg_list << eval(arg_list[j], prefix, env, f_env, new_Node, ctx, bt);
            else                           new_arg_list << arg_list[j];
          }
          kwdarg[1] = new_arg_list;
        }
        evaluated_args << kwdarg;
      }
    }
    // cerr << string(bt.depth(), '\t') << "after first arg evaluation: " << evaluated_args.back().to_string() << "::" << evaluated_args.back().is_arglist() << endl;
    // eval twice because args may be delayed
    for (size_t i = 0, S = evaluated_args.size(); i < S; ++i) {
      if (evaluated_args[i].type() != Node::assignment) {
        // bool is_arglist = evaluated_args[i].is_arglist();
        bool is_splat = evaluated_args[i].is_splat();
        evaluated_args[i].should_eval() = true;
        evaluated_args[i] = eval(evaluated_args[i], prefix, env, f_env, new_Node, ctx, bt);
        if (evaluated_args[i].type() == Node::list) {
          Node arg_list(evaluated_args[i]);
          for (size_t j = 0, S = arg_list.size(); j < S; ++j) {
            if (arg_list[j].should_eval()) arg_list[j] = eval(arg_list[j], prefix, env, f_env, new_Node, ctx, bt);
          }
        }
        // evaluated_args[i].is_arglist() = is_arglist;
        evaluated_args[i].is_splat() = is_splat;
      }
      else {
        Node kwdarg(evaluated_args[i]);
        kwdarg[1].should_eval() = true;
        kwdarg[1] = eval(kwdarg[1], prefix, env, f_env, new_Node, ctx, bt);
        if (kwdarg[1].type() == Node::list) {
          Node arg_list(kwdarg[1]);
          for (size_t j = 0, S = arg_list.size(); j < S; ++j) {
            if (arg_list[j].should_eval()) arg_list[j] = eval(arg_list[j], prefix, env, f_env, new_Node, ctx, bt);
          }
        }
        evaluated_args[i] = kwdarg;
      }
    }
    // cerr << string(bt.depth(), '\t') << "after second arg evaluation: " << evaluated_args.back().to_string() << "::" << evaluated_args.back().is_arglist() << endl;
    return evaluated_args;
  }

  // Helper function for binding arguments in function and mixin calls.
  // Needs the environment containing the bindings to be passed in by the
  // caller. Also expects the caller to have pre-evaluated the arguments.
  void bind_arguments(string callee_name, const Node params, const Node args, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt)
  {
    // populate the env with the names of the parameters so we can check for
    // correctness further down
    bool has_rest_params = false;
    for (size_t i = 0, S = params.size(); i < S; ++i) {
      Node param(params[i]);
      // env.current_frame[param.type() == Node::assignment ? param[0].token() : param.token()] = Node();
      if (param.type() == Node::variable) {
        env.current_frame[param.token()] = Node();
      }
      else if (param.type() == Node::assignment) {
        env.current_frame[param[0].token()] = Node();
      }
      else {
        Node arglist(new_Node(Node::list, args.path(), args.line(), 0));
        arglist.is_arglist() = true;
        arglist.is_comma_separated() = true;
        env.current_frame[param.token()] = arglist;
        has_rest_params = true;
      }
    }

    // now do the actual binding
    size_t args_bound = 0, num_params = params.size();
    for (size_t i = 0, j = 0, S = args.size(); i < S; ++i) {
      if (j == num_params-1 && has_rest_params) {
        Node arglist(env[params[j].token()]);
        // collect rest-args
        if (args[i].type() == Node::list && args[i].is_splat()) {
          arglist += args[i];
          arglist.is_comma_separated() = args[i].is_comma_separated();
        }
        else {
          for (size_t k = i; k < S; ++k) {
            arglist << args[k];
          }
        }
        break;
      }
      else if (j >= num_params) {
        stringstream msg;
        msg << callee_name << " only takes " << num_params << " arguments";
        throw_eval_error(bt, msg.str(), args.path(), args.line());
      }
      // ordinal argument; just bind it and keep going
      else if (args[i].type() != Node::assignment) {
        // if it's a splat
        if (args[i].type() == Node::list && args[i].is_splat()) {
          // loop through the splatted list and bind each element to the remaining parameters
          for (size_t rest_i = 0, rest_length = args[i].size(); rest_i < rest_length; ++rest_i) {
            // if we're binding the last parameter
            if (j == num_params-1) {
              Node leftovers;
              if (has_rest_params) {
                leftovers = env[params[j].token()];
                leftovers.is_comma_separated() = args[i].is_comma_separated();
                for (; rest_i < rest_length; ++rest_i) {
                  leftovers << args[i][rest_i];
                }
              }
              else {
                leftovers = args[i][rest_i];
              }
              Node param(params[j]);
              env[param.type() != Node::assignment ? param.token() : param[0].token()] = leftovers;
              break;
            }
            // otherwise keep going normally
            else {
              Node param(params[j]);
              Token name = ((param.type() == Node::variable) ? param.token() : param[0].token());
              env[name] = args[i][rest_i];
              ++j;
            }
          }
        }
        else {
          Node arg(args[i]), param(params[j]);
          env[param.type() == Node::variable ? param.token() : param[0].token()] = arg;
          ++j;
        }
      }
      // keyword argument -- need to check for correctness
      else {
        Node arg(args[i]), param(params[j]);
        Token arg_name(arg[0].token());
        Node arg_value(arg[1]);
        if (!env.query(arg_name)) {
          throw_eval_error(bt, callee_name + " has no parameter named " + arg_name.to_string(), arg.path(), arg.line());
        }
        if (!env[arg_name].is_null()) {
          throw_eval_error(bt, callee_name + " was passed argument " + arg_name.to_string() + " both by position and by name", arg.path(), arg.line());
        }
        env[arg_name] = arg_value;
        ++args_bound;
      }
    }
    // now plug in the holes with default values, if any
    for (size_t i = 0, S = params.size(); i < S; ++i) {
      Node param(params[i]);
      Token param_name((param.type() == Node::assignment ? param[0] : param).token());
      if (env[param_name].is_null()) {
        if (param.type() != Node::assignment) {
          throw_eval_error(bt, callee_name + " is missing argument " + param_name.to_string(), args.path(), args.line());
        }
        // eval default values in an environment where the previous vals have already been evaluated
        env[param_name] = eval(param[1], prefix, env, f_env, new_Node, ctx, bt);
      }
    }
  }

  // Apply a mixin -- bind the arguments in a new environment, link the new
  // environment to the current one, then copy the body and eval in the new
  // environment.
  Node apply_mixin(Node mixin, const Node args, const Node content, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool dynamic_scope)
  {
    stringstream mixin_name;
    mixin_name << "mixin";
    if (!mixin[0].is_null()) mixin_name << " " << mixin[0].to_string();
    // cerr << string(bt.depth(), '\t') << "applying " << mixin_name.str() << endl;
    Node params(mixin[1]);
    Node body(new_Node(mixin[2])); // clone the body
    Node evaluated_args(eval_arguments(args, prefix, env, f_env, new_Node, ctx, bt));
    // Create a new environment for the mixin and link it to the appropriate parent
    Environment bindings;
    if (dynamic_scope) {
      bindings.link(env);
    }
    else {
      // C-style scope for now (current/global, nothing in between). May need
      // to implement full lexical scope someday.
      bindings.link(env.global ? *env.global : env);
    }
    // bind arguments in the extended environment
    // stringstream mixin_name;
    // mixin_name << "mixin";
    // if (!mixin[0].is_null()) mixin_name << " " << mixin[0].to_string();
    bind_arguments(mixin_name.str(), params, evaluated_args, prefix, bindings, f_env, new_Node, ctx, bt);
    // cerr << string(bt.depth(), '\t') << "last binding: " << params.back().to_string() << " -> " << bindings[params.back().token()].to_string() << "::" << bindings[params.back().token()].is_arglist() << endl;
    // evaluate the mixin's body
    expand(body, prefix, bindings, f_env, new_Node, ctx, bt, false, content);
    return body;
  }

  // Apply a function -- bind the arguments and pass them to the underlying
  // primitive function implementation, then return its value.
  Node apply_function(const Function& f, const Node args, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, string& path, size_t line)
  {
    // cerr << string(bt.depth(), '\t') << "applying " << f.name << endl;
    // cerr << string(bt.depth(), '\t') << "last pre-evaluated arg: " << args.back().to_string() << endl;
    Node evaluated_args(eval_arguments(args, prefix, env, f_env, new_Node, ctx, bt));
    // cerr << string(bt.depth(), '\t') << "last evaluated arg: " << evaluated_args.back().to_string() << "::" << evaluated_args.back().is_arglist() << endl;
    // bind arguments
    Environment bindings;
    Node params(f.primitive || f.c_func ? f.parameters : f.definition[1]);
    bindings.link(env.global ? *env.global : env);
    bind_arguments("function " + f.name, params, evaluated_args, prefix, bindings, f_env, new_Node, ctx, bt);

    // cerr << string(bt.depth(), '\t') << "last binding: " << params.back().to_string() << " -> " << bindings[params.back().token()].to_string() << "::" << bindings[params.back().token()].is_arglist() << endl;

    if (f.primitive) {
      return f.primitive(f.parameter_names, bindings, new_Node, bt, path, line);
    }
    else if (f.c_func) {
      size_t num_params = f.parameter_names.size();
      union Sass_Value c_args = new_sass_c_list(num_params, SASS_COMMA);
      for (size_t i = 0; i < num_params; ++i) {
        c_args.list.values[i] = bindings[f.parameter_names[i].token()].to_c_val();
      }
      c_args.list.length = num_params;
      union Sass_Value c_val = f.c_func(c_args, f.cookie);
      if (c_val.unknown.tag == SASS_ERROR) {
        throw_eval_error(bt, "error in C function " + f.name + ": " + c_val.error.message, path, line);
      }
      Node val(c_val_to_node(c_val, ctx, bt, path, line));
      free_sass_value(c_val);
      return val;
    }
    else {
      // TO DO: consider cloning the function body?
      return eval_function(f.name, f.definition[2], bindings, new_Node, ctx, bt, true);
    }
  }

  // Special function for evaluating pure Sass functions. The evaluation
  // algorithm is different in this case because the body needs to be
  // executed and a single value needs to be returned directly, rather than
  // styles being expanded and spliced in place.
  Node eval_function(string name, Node body, Environment& bindings, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool at_toplevel)
  {
    for (size_t i = 0, S = body.size(); i < S; ++i) {
      Node stm(body[i]);
      switch (stm.type())
      {
        case Node::assignment: {
          Node val(stm[1]);
          Node newval;
          if (val.type() == Node::list) {
            newval = new_Node(Node::list, val.path(), val.line(), val.size());
            newval.is_comma_separated() = val.is_comma_separated();
            for (size_t i = 0, S = val.size(); i < S; ++i) {
              if (val[i].should_eval()) newval << eval(val[i], Node(), bindings, ctx.function_env, new_Node, ctx, bt);
              else                      newval << val[i];
            }
          }
          else {
            newval = eval(val, Node(), bindings, ctx.function_env, new_Node, ctx, bt);
          }
          Node var(stm[0]);
          if (stm.is_guarded() && bindings.query(var.token())) continue;
          // If a binding exists (possibly upframe), then update it.
          // Otherwise, make a new one in the current frame.
          if (bindings.query(var.token())) {
            bindings[var.token()] = newval;
          }
          else {
            bindings.current_frame[var.token()] = newval;
          }
        } break;

        case Node::if_directive: {
          for (size_t j = 0, S = stm.size(); j < S; j += 2) {
            if (stm[j].type() != Node::block) {
              Node predicate_val(eval(stm[j], Node(), bindings, ctx.function_env, new_Node, ctx, bt));
              if (!predicate_val.is_false()) {
                Node v(eval_function(name, stm[j+1], bindings, new_Node, ctx, bt));
                if (v.is_null()) break;
                else             return v;
              }
            }
            else {
              Node v(eval_function(name, stm[j], bindings, new_Node, ctx, bt));
              if (v.is_null()) break;
              else             return v;
            }
          }
        } break;

        case Node::for_through_directive:
        case Node::for_to_directive: {
          Node::Type for_type = stm.type();
          Node iter_var(stm[0]);
          Node lower_bound(eval(stm[1], Node(), bindings, ctx.function_env, new_Node, ctx, bt));
          Node upper_bound(eval(stm[2], Node(), bindings, ctx.function_env, new_Node, ctx, bt));
          Node for_body(stm[3]);
          Environment for_env; // re-use this env for each iteration
          for_env.link(bindings);
          for (double j = lower_bound.numeric_value(), T = upper_bound.numeric_value() + ((for_type == Node::for_to_directive) ? 0 : 1);
               j < T;
               j += 1) {
            for_env.current_frame[iter_var.token()] = new_Node(lower_bound.path(), lower_bound.line(), j);
            Node v(eval_function(name, for_body, for_env, new_Node, ctx, bt));
            if (v.is_null()) continue;
            else             return v;
          }
        } break;

        case Node::each_directive: {
          Node iter_var(stm[0]);
          Node list(eval(stm[1], Node(), bindings, ctx.function_env, new_Node, ctx, bt));
          if (list.type() != Node::list) {
            list = (new_Node(Node::list, list.path(), list.line(), 1) << list);
          }
          Node each_body(stm[2]);
          Environment each_env; // re-use this env for each iteration
          each_env.link(bindings);
          for (size_t j = 0, T = list.size(); j < T; ++j) {
            list[j].should_eval() = true;
            each_env.current_frame[iter_var.token()] = eval(list[j], Node(), bindings, ctx.function_env, new_Node, ctx, bt);
            Node v(eval_function(name, each_body, each_env, new_Node, ctx, bt));
            if (v.is_null()) continue;
            else             return v;
          }
        } break;

        case Node::while_directive: {
          Node pred_expr(stm[0]);
          Node while_body(stm[1]);
          Environment while_env; // re-use this env for each iteration
          while_env.link(bindings);
          Node pred_val(eval(pred_expr, Node(), bindings, ctx.function_env, new_Node, ctx, bt));
          while (!pred_val.is_false()) {
            Node v(eval_function(name, while_body, while_env, new_Node, ctx, bt));
            if (v.is_null()) {
              pred_val = eval(pred_expr, Node(), bindings, ctx.function_env, new_Node, ctx, bt);
              continue;
            }
            else return v;
          }
        } break;

        case Node::warning: {
          string prefix("WARNING: ");
          string indent("         ");
          Node contents(eval(stm[0], Node(), bindings, ctx.function_env, new_Node, ctx, bt));
          string result(contents.to_string());
          if (contents.type() == Node::string_constant || contents.type() == Node::string_schema) {
            result = result.substr(1, result.size()-2); // unquote if it's a single string
          }
          // These cerrs aren't log lines! They're supposed to be here!
          cerr << prefix << result;
          // cerr << indent << "on line " << stm.line() << " of " << stm.path();
          Backtrace top(&bt, stm.path(), stm.line(), "");
          cerr << top.to_string(true);
          cerr << endl << endl;
        } break;

        case Node::return_directive: {
          Node retval(eval(stm[0], Node(), bindings, ctx.function_env, new_Node, ctx, bt));
          if (retval.type() == Node::list) {
            Node new_list(new_Node(Node::list, retval.path(), retval.line(), retval.size()));
            new_list.is_comma_separated() = retval.is_comma_separated();
            for (size_t i = 0, S = retval.size(); i < S; ++i) {
              new_list << eval(retval[i], Node(), bindings, ctx.function_env, new_Node, ctx, bt);
            }
            retval = new_list;
          }
          return retval;
        } break;

        default: {

        } break;
      }
    }
    if (at_toplevel) throw_eval_error(bt, "function finished without @return", body.path(), body.line());
    return Node();
  }

  // Expand a selector with respect to its prefix/context. Two separate cases:
  // when the selector has backrefs, substitute the prefix for each occurrence
  // of a backref. When the selector doesn't have backrefs, just prepend the
  // prefix. This function needs multiple subsidiary cases in order to properly
  // combine the various kinds of selectors.
  Node expand_selector(Node sel, Node pre, Node_Factory& new_Node)
  {
    if (pre.is_null() || sel.is_null()) return sel;

    if (sel.has_backref()) {
      if ((pre.type() == Node::selector_group) && (sel.type() == Node::selector_group)) {
        Node group(new_Node(Node::selector_group, sel.path(), sel.line(), pre.size() * sel.size()));
        for (size_t i = 0, S = pre.size(); i < S; ++i) {
          for (size_t j = 0, T = sel.size(); j < T; ++j) {
            if (sel[j].has_backref()) {
              group << expand_backref(new_Node(sel[j]), pre[i]);
            }
            else {
              Node new_sel(new_Node(Node::selector, sel.path(), sel.line(), 2));
              if (pre[i].type() == Node::selector) new_sel += pre[i];
              else                                 new_sel << pre[i];
              if (sel[j].type() == Node::selector) new_sel += sel[j];
              else                                 new_sel << sel[j];
              group << new_sel;
            }
          }
        }
        return group;
      }
      else if ((pre.type() == Node::selector_group) && (sel.type() != Node::selector_group)) {
        Node group(new_Node(Node::selector_group, sel.path(), sel.line(), pre.size()));
        for (size_t i = 0, S = pre.size(); i < S; ++i) {
          group << expand_backref(new_Node(sel), pre[i]);
        }
        return group;
      }
      else if ((pre.type() != Node::selector_group) && (sel.type() == Node::selector_group)) {
        Node group(new_Node(Node::selector_group, sel.path(), sel.line(), sel.size()));
        for (size_t i = 0, S = sel.size(); i < S; ++i) {
          if (sel[i].has_backref()) {
            group << expand_backref(new_Node(sel[i]), pre);
          }
          else {
            Node new_sel(new_Node(Node::selector, sel.path(), sel.line(), 2));
            if (pre.type() == Node::selector)    new_sel += pre;
            else                                 new_sel << pre;
            if (sel[i].type() == Node::selector) new_sel += sel[i];
            else                                 new_sel << sel[i];
            group << new_sel;
          }
        }
        return group;
      }
      else {
        return expand_backref(new_Node(sel), pre);
      }
    }

    if ((pre.type() == Node::selector_group) && (sel.type() == Node::selector_group)) {
      Node group(new_Node(Node::selector_group, sel.path(), sel.line(), pre.size() * sel.size()));
      for (size_t i = 0, S = pre.size(); i < S; ++i) {
        for (size_t j = 0, T = sel.size(); j < T; ++j) {
          Node new_sel(new_Node(Node::selector, sel.path(), sel.line(), 2));
          if (pre[i].type() == Node::selector) new_sel += pre[i];
          else                                 new_sel << pre[i];
          if (sel[j].type() == Node::selector) new_sel += sel[j];
          else                                 new_sel << sel[j];
          group << new_sel;
        }
      }
      return group;
    }
    else if ((pre.type() == Node::selector_group) && (sel.type() != Node::selector_group)) {
      Node group(new_Node(Node::selector_group, sel.path(), sel.line(), pre.size()));
      for (size_t i = 0, S = pre.size(); i < S; ++i) {
        Node new_sel(new_Node(Node::selector, sel.path(), sel.line(), 2));
        if (pre[i].type() == Node::selector) new_sel += pre[i];
        else                                 new_sel << pre[i];
        if (sel.type() == Node::selector)    new_sel += sel;
        else                                 new_sel << sel;
        group << new_sel;
      }
      return group;
    }
    else if ((pre.type() != Node::selector_group) && (sel.type() == Node::selector_group)) {
      Node group(new_Node(Node::selector_group, sel.path(), sel.line(), sel.size()));
      for (size_t i = 0, S = sel.size(); i < S; ++i) {
        Node new_sel(new_Node(Node::selector, sel.path(), sel.line(), 2));
        if (pre.type() == Node::selector)    new_sel += pre;
        else                                 new_sel << pre;
        if (sel[i].type() == Node::selector) new_sel += sel[i];
        else                                 new_sel << sel[i];
        group << new_sel;
      }
      return group;
    }
    else {
      Node new_sel(new_Node(Node::selector, sel.path(), sel.line(), 2));
      if (pre.type() == Node::selector) new_sel += pre;
      else                              new_sel << pre;
      if (sel.type() == Node::selector) new_sel += sel;
      else                              new_sel << sel;
      return new_sel;
    }
    // unreachable statement
    return Node();
  }

  // Helper for expanding selectors with backrefs.
  Node expand_backref(Node sel, Node pre)
  {
    switch (sel.type())
    {
      case Node::backref: {
        return pre;
      } break;

      case Node::simple_selector_sequence:
      case Node::selector: {
        for (size_t i = 0, S = sel.size(); i < S; ++i) {
          sel[i] = expand_backref(sel[i], pre);
        }
        return sel;
      } break;

      default: {
        return sel;
      } break;
    }
    // unreachable statement
    return Node();
  }

  // Resolve selector extensions. Walk through the document tree and check each
  // selector to see whether it's the base of an extension. Needs to be a
  // separate pass after evaluation because extension requests may be located
  // within mixins, and their targets may be interpolated.
  void extend(Node expr, multimap<Node, Node>& extension_requests, Node_Factory& new_Node)
  {
    switch (expr.type())
    {
      case Node::ruleset: {
        if (!expr[2].has_been_extended()) {
          // check single selector
          if (expr[2].type() != Node::selector_group) {
            Node sel(selector_base(expr[2]));
            // if this selector has extenders ...
            size_t num_requests = extension_requests.count(sel);
            if (num_requests) {
              Node group(new_Node(Node::selector_group, sel.path(), sel.line(), 1 + num_requests));
              group << expr[2];
              // for each of its extenders ...
              for (multimap<Node, Node>::iterator request = extension_requests.lower_bound(sel);
                   request != extension_requests.upper_bound(sel);
                   ++request) {
                Node ext(generate_extension(expr[2], request->second, new_Node));
                if (ext.type() == Node::selector_group) group += ext;
                else                                    group << ext;
              }
              group = remove_duplicate_selectors(group, new_Node);
              group.has_been_extended() = true;
              expr[2] = group;
            }
          }
          // individually check each selector in a group
          else {
            Node group(expr[2]);
            Node new_group(new_Node(Node::selector_group, group.path(), group.line(), group.size()));
            // for each selector in the group ...
            for (size_t i = 0, S = group.size(); i < S; ++i) {
              new_group << group[i];
              Node sel(selector_base(group[i]));
              // if it has extenders ...
              if (!group[i].has_been_extended() && extension_requests.count(sel)) {
                // for each of its extenders ...
                for (multimap<Node, Node>::iterator request = extension_requests.lower_bound(sel);
                     request != extension_requests.upper_bound(sel);
                     ++request) {
                  Node ext(generate_extension(group[i], request->second, new_Node));
                  if (ext.type() == Node::selector_group) new_group += ext;
                  else                                    new_group << ext;
                }
                group[i].has_been_extended() = true;
              }
            }
            if (new_group.size() > 0) {
              group.has_been_extended() = true;
              new_group = remove_duplicate_selectors(new_group, new_Node);
              new_group.has_been_extended() = true;
              expr[2] = new_group;
            }
          }
        }
        extend(expr[1], extension_requests, new_Node);
      } break;

      case Node::root:
      case Node::block:
      case Node::mixin_call:
      case Node::if_directive:
      case Node::for_through_directive:
      case Node::for_to_directive:
      case Node::each_directive:
      case Node::while_directive: {
        // at this point, all directives have been expanded into style blocks,
        // so just recursively process their children
        for (size_t i = 0, S = expr.size(); i < S; ++i) {
          extend(expr[i], extension_requests, new_Node);
        }
      } break;

      default: {
        // do nothing
      } break;
    }
    return;
  }

  void extend_selectors(vector<pair<Node, Node> >& pending, multimap<Node, Node>& extension_table, Node_Factory& new_Node)
  {
    for (size_t i = 0, S = pending.size(); i < S; ++i) {
      // Node extender(pending[i].second[2]);
      // Node original_extender(pending[i].second[0]);
      Node ruleset_to_extend(pending[i].first);
      Node extendee(ruleset_to_extend[2]);

      if (extendee.type() != Node::selector_group && !extendee.has_been_extended()) {
        Node extendee_base(selector_base(extendee));
        Node extender_group(new_Node(Node::selector_group, extendee.path(), extendee.line(), 1));
        for (multimap<Node, Node>::iterator i = extension_table.lower_bound(extendee_base), E = extension_table.upper_bound(extendee_base);
             i != E;
             ++i) {
          if (i->second.size() <= 2) continue; // TODO: UN-HACKIFY THIS
          if (i->second[2].type() == Node::selector_group)
            extender_group += i->second[2];
          else
            extender_group << i->second[2];
        }
        Node extended_group(new_Node(Node::selector_group, extendee.path(), extendee.line(), extender_group.size() + 1));
        extendee.has_been_extended() = true;
        extended_group << extendee;
        for (size_t i = 0, S = extender_group.size(); i < S; ++i) {
          extended_group << generate_extension(extendee, extender_group[i], new_Node);
        }
        ruleset_to_extend[2] = extended_group;
      }
      else {
        Node extended_group(new_Node(Node::selector_group, extendee.path(), extendee.line(), extendee.size() + 1));
        for (size_t i = 0, S = extendee.size(); i < S; ++i) {
          Node extendee_i(extendee[i]);
          Node extendee_i_base(selector_base(extendee_i));
          extended_group << extendee_i;
          if (!extendee_i.has_been_extended() && extension_table.count(extendee_i_base)) {
            Node extender_group(new_Node(Node::selector_group, extendee.path(), extendee.line(), 1));
            for (multimap<Node, Node>::iterator i = extension_table.lower_bound(extendee_i_base), E = extension_table.upper_bound(extendee_i_base);
                 i != E;
                 ++i) {
              if (i->second.size() <= 2) continue; // TODO: UN-HACKIFY THIS
              if (i->second[2].type() == Node::selector_group)
                extender_group += i->second[2];
              else
                extender_group << i->second[2];
            }
            for (size_t j = 0, S = extender_group.size(); j < S; ++j) {
              extended_group << generate_extension(extendee_i, extender_group[j], new_Node);
            }
            extendee_i.has_been_extended() = true;
          }
        }
        ruleset_to_extend[2] = extended_group;
      }
    }
  }

  // Helper for generating selector extensions; called for each extendee and
  // extender in a pair of selector groups.
  Node generate_extension(Node extendee, Node extender, Node_Factory& new_Node)
  {
    Node new_group(new_Node(Node::selector_group, extendee.path(), extendee.line(), 1));
    if (extendee.type() != Node::selector) {
      switch (extender.type())
      {
        case Node::simple_selector:
        case Node::attribute_selector:
        case Node::simple_selector_sequence:
        case Node::selector: {
          new_group << extender;
          return new_group;
        } break;
        default: {
          // not sure why selectors sometimes get wrapped in a singleton group
          return generate_extension(extendee, extender[0], new_Node);
        } break;
      }
    }
    else {
      switch (extender.type())
      {
        case Node::simple_selector:
        case Node::attribute_selector:
        case Node::simple_selector_sequence: {
          Node new_ext(new_Node(Node::selector, extendee.path(), extendee.line(), extendee.size()));
          for (size_t i = 0, S = extendee.size() - 1; i < S; ++i) {
            new_ext << extendee[i];
          }
          new_ext << extender;
          new_group << new_ext;
          return new_group;
        } break;

        case Node::selector: {
          Node new_ext1(new_Node(Node::selector, extendee.path(), extendee.line(), extendee.size() + extender.size() - 1));
          Node new_ext2(new_Node(Node::selector, extendee.path(), extendee.line(), extendee.size() + extender.size() - 1));
          new_ext1 += selector_prefix(extendee, new_Node);
          new_ext1 += extender;
          new_ext2 += selector_prefix(extender, new_Node);
          new_ext2 += selector_prefix(extendee, new_Node);
          new_ext2 << extender.back();
          new_group << new_ext1 << new_ext2;
          return new_group;
        } break;

        default: {
          // something
        } break;
      }
    }
    return Node();
  }

  // Helpers for extracting subsets of selectors
  Node selector_prefix(Node sel, Node_Factory& new_Node)
  {
    switch (sel.type())
    {
      case Node::selector: {
        Node pre(new_Node(Node::selector, sel.path(), sel.line(), sel.size() - 1));
        for (size_t i = 0, S = sel.size() - 1; i < S; ++i) {
          pre << sel[i];
        }
        return pre;
      } break;

      default: {
        return new_Node(Node::selector, sel.path(), sel.line(), 0);
      } break;
    }
  }

  Node selector_base(Node sel)
  {
    switch (sel.type())
    {
      case Node::selector: {
        return sel.back();
      } break;

      default: {
        return sel;
      } break;
    }
  }

  static Node selector_but(Node sel, Node_Factory& new_Node, size_t start, size_t from_end)
  {
    switch (sel.type())
    {
      case Node::selector: {
        Node bf(new_Node(Node::selector, sel.path(), sel.line(), sel.size() - 1));
        for (size_t i = start, S = sel.size() - from_end; i < S; ++i) {
          bf << sel[i];
        }
        return bf;
      } break;

      default: {
        return new_Node(Node::selector, sel.path(), sel.line(), 0);
      } break;
    }
  }

  Node selector_butfirst(Node sel, Node_Factory& new_Node)
  { return selector_but(sel, new_Node, 1, 0); }

  Node selector_butlast(Node sel, Node_Factory& new_Node)
  { return selector_but(sel, new_Node, 0, 1); }

  void to_lowercase(string& s)
  { for (size_t i = 0, L = s.length(); i < L; ++i) s[i] = tolower(s[i]); }

  Node c_val_to_node(Sass_Value v, Context& ctx, Backtrace& bt, string path = "", size_t line = 0)
  {
    using std::strlen;
    using std::strcpy;
    Node node;
    switch (v.unknown.tag)
    {
      case SASS_BOOLEAN: {
        node = ctx.new_Node(Node::boolean, path, line, v.boolean.value);
      } break;
      case SASS_NUMBER: {
        node = ctx.new_Node(path, line, v.number.value, Node::number);
      } break;
      case SASS_PERCENTAGE: {
        node = ctx.new_Node(path, line, v.percentage.value, Node::numeric_percentage);
      } break;
      case SASS_DIMENSION: {
        char* copy = new char[strlen(v.dimension.unit)+1];
        strcpy(copy, v.dimension.unit);
        ctx.source_refs.push_back(copy);
        node = ctx.new_Node(path, line, v.dimension.value, Token::make(copy));
      } break;
      case SASS_COLOR: {
        node = ctx.new_Node(path, line, v.color.r, v.color.g, v.color.b, v.color.a);
      } break;
      case SASS_STRING: {
        char* copy = new char[strlen(v.string.value)+1];
        strcpy(copy, v.string.value);
        ctx.source_refs.push_back(copy);
        node = ctx.new_Node(Node::string_constant, path, line, Token::make(copy));
      } break;
      case SASS_LIST: {
        node = ctx.new_Node(Node::list, path, line, v.list.length);
        node.is_comma_separated() = v.list.separator == SASS_COMMA;
        for (size_t i = 0; i < v.list.length; ++i) {
          node << c_val_to_node(v.list.values[i], ctx, bt, path, line);
        }
      } break;
      case SASS_ERROR: {
        throw_eval_error(bt, "error in C function: " + string(v.error.message), path, line);
      } break;
    }
    return node;
  }

}
