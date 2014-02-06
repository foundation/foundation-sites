#include "bind.hpp"
#include "ast.hpp"
#include "context.hpp"
#include "eval.hpp"
#include <map>
#include <iostream>
#include <sstream>
#include "to_string.hpp"

namespace Sass {
  using namespace std;

  void bind(string callee, Parameters* ps, Arguments* as, Context& ctx, Env* env, Eval* eval)
  {
    map<string, Parameter*> param_map;

    // Set up a map to ensure named arguments refer to actual parameters. Also
    // eval each default value left-to-right, wrt env, populating env as we go.
    for (size_t i = 0, L = ps->length(); i < L; ++i) {
      Parameter*  p = (*ps)[i];
      param_map[p->name()] = p;
      // if (p->default_value()) {
      //   env->current_frame()[p->name()] = p->default_value()->perform(eval->with(env));
      // }
    }

    // plug in all args; if we have leftover params, deal with it later
    size_t ip = 0, LP = ps->length();
    size_t ia = 0, LA = as->length();
    while (ia < LA) {
      if (ip >= LP) {
        stringstream msg;
        msg << callee << " only takes " << LP << " arguments; "
            << "given " << LA;
        error(msg.str(), as->path(), as->line());
      }
      Parameter* p = (*ps)[ip];
      Argument*  a = (*as)[ia];

      if (a->is_rest_argument() && p->is_rest_parameter()) {
        // rest param and rest arg -- just add one to the other
        if (env->current_frame_has(p->name())) {
          *static_cast<List*>(env->current_frame()[p->name()])
                              += static_cast<List*>(a->value());
        }
        else {
          env->current_frame()[p->name()] = a->value();
        }
        ++ia;
        ++ip;
      }
      else if (p->is_rest_parameter()) {
        List* arglist = 0;
        if (!env->current_frame_has(p->name())) {
          arglist = new (ctx.mem) List(p->path(),
                                       p->line(),
                                       0,
                                       List::COMMA,
                                       true);
          env->current_frame()[p->name()] = arglist;
        }
        else {
          arglist = static_cast<List*>(env->current_frame()[p->name()]);
        }
        *arglist << a->value(); // TODO: named args going into rest-param?
        ++ia;
      }
      else if (a->is_rest_argument()) {
        // normal param and rest arg
        if (env->current_frame_has(p->name())) {
          stringstream msg;
          msg << "parameter " << p->name()
              << " provided more than once in call to " << callee;
          error(msg.str(), a->path(), a->line());
        }
        List* arglist = static_cast<List*>(a->value());
        // if it's the last param, move the whole arglist into it
        if (ip == LP-1) {
          env->current_frame()[p->name()] = arglist;
          ++ia;
        }
        // otherwise move one of the rest args into the param and loop
        else {
          env->current_frame()[p->name()] = (*arglist)[0];
          arglist->elements().erase(arglist->elements().begin());
        }
        ++ip;
      }
      else if (a->name().empty()) {
        // ordinal arg -- bind it to the next param
        env->current_frame()[p->name()] = a->value();
        ++ip;
        ++ia;
      }
      else {
        // named arg -- bind it to the appropriately named param
        if (!param_map.count(a->name())) {
          stringstream msg;
          msg << callee << " has no parameter named " << a->name();
          error(msg.str(), a->path(), a->line());
        }
        if (param_map[a->name()]->is_rest_parameter()) {
          stringstream msg;
          msg << "argument " << a->name() << " of " << callee
              << "cannot be used as named argument";
          error(msg.str(), a->path(), a->line());
        }
        if (env->current_frame_has(a->name())) {
          stringstream msg;
          msg << "parameter " << p->name()
              << "provided more than once in call to " << callee;
          error(msg.str(), a->path(), a->line());
        }
        env->current_frame()[a->name()] = a->value();
        ++ia;
      }
    }

    // If we make it here, we're out of args but may have leftover params.
    // That's only okay if they have default values, or were already bound by
    // named arguments, or if it's a single rest-param.
    for (size_t i = ip; i < LP; ++i) {
      To_String to_string;
      Parameter* leftover = (*ps)[i];
      // cerr << "env for default params:" << endl;
      // env->print();
      // cerr << "********" << endl;
      if (!env->current_frame_has(leftover->name())) {
        if (leftover->is_rest_parameter()) {
          env->current_frame()[leftover->name()] = new (ctx.mem) List(leftover->path(),
                                                                      leftover->line(),
                                                                      0,
                                                                      List::COMMA,
                                                                      true);
        }
        else if (leftover->default_value()) {
          // make sure to eval the default value in the env that we've been populating
          Env* old_env = eval->env;
          Backtrace* old_bt = eval->backtrace;
          Expression* dv = leftover->default_value()->perform(eval->with(env, eval->backtrace));
          eval->env = old_env;
          eval->backtrace = old_bt;
          // dv->perform(&to_string);
          env->current_frame()[leftover->name()] = dv;
        }
        else {
          // param is unbound and has no default value -- error
          stringstream msg;
          msg << "required parameter " << leftover->name()
              << " is missing in call to " << callee;
          error(msg.str(), as->path(), as->line());
        }
      }
    }

    return;
  }


}