#include "expand.hpp"
#include "bind.hpp"
#include "eval.hpp"
#include "contextualize.hpp"
#include "to_string.hpp"
#include "backtrace.hpp"

#include <iostream>
#include <typeinfo>

#ifndef SASS_CONTEXT
#include "context.hpp"
#endif

namespace Sass {

  Expand::Expand(Context& ctx, Eval* eval, Contextualize* contextualize, Env* env, Backtrace* bt)
  : ctx(ctx),
    eval(eval),
    contextualize(contextualize),
    env(env),
    block_stack(vector<Block*>()),
    property_stack(vector<String*>()),
    selector_stack(vector<Selector*>()),
    backtrace(bt),
    extensions(multimap<Simple_Selector_Sequence, Selector_Combination*>())
  { selector_stack.push_back(0); }

  Statement* Expand::operator()(Block* b)
  {
    Env new_env;
    new_env.link(*env);
    env = &new_env;
    Block* bb = new (ctx.mem) Block(b->path(), b->line(), b->length(), b->is_root());
    block_stack.push_back(bb);
    append_block(b);
    block_stack.pop_back();
    env = env->parent();
    return bb;
  }

  Statement* Expand::operator()(Ruleset* r)
  {
    To_String to_string;
    // if (selector_stack.back()) cerr << "expanding " << selector_stack.back()->perform(&to_string) << " and " << r->selector()->perform(&to_string) << endl;
    Selector* sel_ctx = r->selector()->perform(contextualize->with(selector_stack.back(), env, backtrace));
    selector_stack.push_back(sel_ctx);
    Ruleset* rr = new (ctx.mem) Ruleset(r->path(),
                                        r->line(),
                                        sel_ctx,
                                        r->block()->perform(this)->block());
    selector_stack.pop_back();
    return rr;
  }

  Statement* Expand::operator()(Propset* p)
  {
    property_stack.push_back(p->property_fragment());
    Block* expanded_block = p->block()->perform(this)->block();

    Block* current_block = block_stack.back();
    for (size_t i = 0, L = expanded_block->length(); i < L; ++i) {
      Statement* stm = (*expanded_block)[i];
      if (typeid(*stm) == typeid(Declaration)) {
        Declaration* dec = static_cast<Declaration*>(stm);
        String_Schema* combined_prop = new (ctx.mem) String_Schema(p->path(), p->line());
        if (!property_stack.empty()) {
          *combined_prop << property_stack.back()
                         << new (ctx.mem) String_Constant(p->path(), p->line(), "-")
                         << dec->property(); // TODO: eval the prop into a string constant
        }
        else {
          *combined_prop << dec->property();
        }
        dec->property(combined_prop);
        *current_block << dec;
      }
      else {
        error("contents of namespaced properties must result in style declarations only", stm->path(), stm->line(), backtrace);
      }
    }

    property_stack.pop_back();

    return 0;
  }

  Statement* Expand::operator()(Media_Block* m)
  {
    Expression* media_queries = m->media_queries()->perform(eval->with(env, backtrace));
    Media_Block* mm = new (ctx.mem) Media_Block(m->path(),
                                                m->line(),
                                                static_cast<List*>(media_queries),
                                                m->block()->perform(this)->block());
    mm->enclosing_selector(selector_stack.back());
    return mm;
  }

  Statement* Expand::operator()(At_Rule* a)
  {
    Block* ab = a->block();
    selector_stack.push_back(0);
    Selector* as = a->selector();
    if (as) as = as->perform(contextualize->with(0, env, backtrace));
    Block* bb = ab ? ab->perform(this)->block() : 0;
    At_Rule* aa = new (ctx.mem) At_Rule(a->path(),
                                        a->line(),
                                        a->keyword(),
                                        as,
                                        bb);
    selector_stack.pop_back();
    return aa;
  }

  Statement* Expand::operator()(Declaration* d)
  {
    String* old_p = d->property();
    String* new_p = static_cast<String*>(old_p->perform(eval->with(env, backtrace)));
    return new (ctx.mem) Declaration(d->path(),
                                     d->line(),
                                     new_p,
                                     d->value()->perform(eval->with(env, backtrace)),
                                     d->is_important());
  }

  Statement* Expand::operator()(Assignment* a)
  {
    string var(a->variable());
    if (env->has(var)) {
      if(!a->is_guarded()) (*env)[var] = a->value()->perform(eval->with(env, backtrace));
    }
    else {
      env->current_frame()[var] = a->value()->perform(eval->with(env, backtrace));
    }
    return 0;
  }

  Statement* Expand::operator()(Import* i)
  {
    return i; // TODO: eval i->urls()
  }

  Statement* Expand::operator()(Import_Stub* i)
  {
    append_block(ctx.style_sheets[i->file_name()]);
    return 0;
  }

  Statement* Expand::operator()(Warning* w)
  {
    // eval handles this too, because warnings may occur in functions
    w->perform(eval->with(env, backtrace));
    return 0;
  }

  Statement* Expand::operator()(Comment* c)
  {
    // TODO: eval the text, once we're parsing/storing it as a String_Schema
    return c;
  }

  Statement* Expand::operator()(If* i)
  {
    if (*i->predicate()->perform(eval->with(env, backtrace))) {
      append_block(i->consequent());
    }
    else {
      Block* alt = i->alternative();
      if (alt) append_block(alt);
    }
    return 0;
  }

  Statement* Expand::operator()(For* f)
  {
    string variable(f->variable());
    Expression* low = f->lower_bound()->perform(eval->with(env, backtrace));
    if (low->concrete_type() != Expression::NUMBER) {
      error("lower bound of `@for` directive must be numeric", low->path(), low->line(), backtrace);
    }
    Expression* high = f->upper_bound()->perform(eval->with(env, backtrace));
    if (high->concrete_type() != Expression::NUMBER) {
      error("upper bound of `@for` directive must be numeric", high->path(), high->line(), backtrace);
    }
    double lo = static_cast<Number*>(low)->value();
    double hi = static_cast<Number*>(high)->value();
    if (f->is_inclusive()) ++hi;
    Env new_env;
    new_env[variable] = new (ctx.mem) Number(low->path(), low->line(), lo);
    new_env.link(env);
    env = &new_env;
    Block* body = f->block();
    for (size_t i = lo;
         i < hi;
         (*env)[variable] = new (ctx.mem) Number(low->path(), low->line(), ++i)) {
      append_block(body);
    }
    env = new_env.parent();
    return 0;
  }

  Statement* Expand::operator()(Each* e)
  {
    string variable(e->variable());
    Expression* expr = e->list()->perform(eval->with(env, backtrace));
    List* list = 0;
    if (expr->concrete_type() != Expression::LIST) {
      list = new (ctx.mem) List(expr->path(), expr->line(), 1, List::COMMA);
      *list << expr;
    }
    else {
      list = static_cast<List*>(expr);
    }
    Env new_env;
    new_env[variable] = 0;
    new_env.link(env);
    env = &new_env;
    Block* body = e->block();
    for (size_t i = 0, L = list->length(); i < L; ++i) {
      (*env)[variable] = (*list)[i]->perform(eval->with(env, backtrace));
      append_block(body);
    }
    env = new_env.parent();
    return 0;
  }

  Statement* Expand::operator()(While* w)
  {
    Expression* pred = w->predicate();
    Block* body = w->block();
    while (*pred->perform(eval->with(env, backtrace))) {
      append_block(body);
    }
    return 0;
  }

  Statement* Expand::operator()(Return* r)
  {
    error("@return may only be used within a function", r->path(), r->line(), backtrace);
    return 0;
  }

  Statement* Expand::operator()(Extension* e)
  {
    Selector_Group* extender = static_cast<Selector_Group*>(selector_stack.back());
    if (!extender) return 0;
    Selector_Group* extendee = static_cast<Selector_Group*>(e->selector()->perform(contextualize->with(0, env, backtrace)));
    if (extendee->length() != 1) {
      error("selector groups may not be extended", extendee->path(), extendee->line(), backtrace);
    }
    Selector_Combination* c = (*extendee)[0];
    if (!c->head() || c->tail()) {
      error("nested selectors may not be extended", c->path(), c->line(), backtrace);
    }
    Simple_Selector_Sequence* s = c->head();
    for (size_t i = 0, L = extender->length(); i < L; ++i) {
      extensions.insert(make_pair(*s, (*extender)[i]));
      To_String to_string;
    }
    return 0;
  }

  Statement* Expand::operator()(Definition* d)
  {
    env->current_frame()[d->name() +
                        (d->type() == Definition::MIXIN ? "[m]" : "[f]")] = d;
    // set the static link so we can have lexical scoping
    d->environment(env);
    return 0;
  }

  Statement* Expand::operator()(Mixin_Call* c)
  {
    string full_name(c->name() + "[m]");
    if (!env->has(full_name)) {
      error("no mixin named " + c->name(), c->path(), c->line(), backtrace);
    }
    Definition* def = static_cast<Definition*>((*env)[full_name]);
    Block* body = def->block();
    Parameters* params = def->parameters();
    Arguments* args = static_cast<Arguments*>(c->arguments()
                                               ->perform(eval->with(env, backtrace)));
    Backtrace here(backtrace, c->path(), c->line(), ", in mixin `" + c->name() + "`");
    backtrace = &here;
    Env new_env;
    new_env.link(def->environment());
    if (c->block()) {
      // reprsent mixin content blocks as thunks/closures
      Definition* thunk = new (ctx.mem) Definition(c->path(),
                                                   c->line(),
                                                   "@content",
                                                   new (ctx.mem) Parameters(c->path(), c->line()),
                                                   c->block(),
                                                   Definition::MIXIN);
      thunk->environment(env);
      new_env.current_frame()["@content[m]"] = thunk;
    }
    bind("mixin " + c->name(), params, args, ctx, &new_env, eval);
    Env* old_env = env;
    env = &new_env;
    append_block(body);
    env = old_env;
    backtrace = here.parent;
    return 0;
  }

  Statement* Expand::operator()(Content* c)
  {
    // convert @content directives into mixin calls to the underlying thunk
    if (!env->has("@content[m]")) return 0;
    Mixin_Call* call = new (ctx.mem) Mixin_Call(c->path(),
                                                c->line(),
                                                "@content",
                                                new (ctx.mem) Arguments(c->path(), c->line()));
    return call->perform(this);
  }

  inline Statement* Expand::fallback_impl(AST_Node* n)
  {
    error("unknown internal error; please contact the LibSass maintainers", n->path(), n->line(), backtrace);
    String_Constant* msg = new (ctx.mem) String_Constant("", 0, string("`Expand` doesn't handle ") + typeid(*n).name());
    return new (ctx.mem) Warning("", 0, msg);
  }

  inline void Expand::append_block(Block* b)
  {
    Block* current_block = block_stack.back();
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* ith = (*b)[i]->perform(this);
      if (ith) *current_block << ith;
    }
  }
}