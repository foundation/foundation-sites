#include "contextualize.hpp"
#include "ast.hpp"
#include "eval.hpp"
#include "backtrace.hpp"
#include "to_string.hpp"
#include "parser.hpp"

namespace Sass {

  Contextualize::Contextualize(Context& ctx, Eval* eval, Env* env, Backtrace* bt, Selector* placeholder, Selector* extender)
  : ctx(ctx), eval(eval), env(env), parent(0), backtrace(bt), placeholder(placeholder), extender(extender)
  { }

  Contextualize::~Contextualize() { }

  Selector* Contextualize::fallback_impl(AST_Node* n)
  { return parent; }

  Contextualize* Contextualize::with(Selector* s, Env* e, Backtrace* bt, Selector* p, Selector* ex)
  {
    parent = s;
    env = e;
    backtrace = bt;
    placeholder = p;
    extender = ex;
    return this;
  }

  Selector* Contextualize::operator()(Selector_Schema* s)
  {
    To_String to_string;
    string result_str(s->contents()->perform(eval->with(env, backtrace))->perform(&to_string));
    result_str += '{'; // the parser looks for a brace to end the selector
    Selector* result_sel = Parser::from_c_str(result_str.c_str(), ctx, s->path(), s->line()).parse_selector_group();
    return result_sel->perform(this);
  }

  Selector* Contextualize::operator()(Selector_Group* s)
  {
    Selector_Group* p = static_cast<Selector_Group*>(parent);
    Selector_Group* ss = 0;
    if (p) {
      ss = new (ctx.mem) Selector_Group(s->path(), s->line(), p->length() * s->length());
      for (size_t i = 0, L = p->length(); i < L; ++i) {
        for (size_t j = 0, L = s->length(); j < L; ++j) {
          parent = (*p)[i];
          Selector_Combination* comb = static_cast<Selector_Combination*>((*s)[j]->perform(this));
          if (comb) *ss << comb;
        }
      }
    }
    else {
      ss = new (ctx.mem) Selector_Group(s->path(), s->line(), s->length());
      for (size_t j = 0, L = s->length(); j < L; ++j) {
        Selector_Combination* comb = static_cast<Selector_Combination*>((*s)[j]->perform(this));
        if (comb) *ss << comb;
      }
    }
    return ss->length() ? ss : 0;
  }

  Selector* Contextualize::operator()(Selector_Combination* s)
  {
    To_String to_string;
    Selector_Combination* ss = new (ctx.mem) Selector_Combination(*s);
    if (ss->head()) {
      ss->head(static_cast<Simple_Selector_Sequence*>(s->head()->perform(this)));
    }
    if (ss->tail()) {
      ss->tail(static_cast<Selector_Combination*>(s->tail()->perform(this)));
    }
    if (!ss->head() && ss->combinator() == Selector_Combination::ANCESTOR_OF) {
      return ss->tail();
    }
    else {
      return ss;
    }
  }

  Selector* Contextualize::operator()(Simple_Selector_Sequence* s)
  {
    To_String to_string;
    if (placeholder && extender && s->perform(&to_string) == placeholder->perform(&to_string)) {
      return extender;
    }
    Simple_Selector_Sequence* ss = new (ctx.mem) Simple_Selector_Sequence(s->path(), s->line(), s->length());
    for (size_t i = 0, L = s->length(); i < L; ++i) {
      Simple_Selector* simp = static_cast<Simple_Selector*>((*s)[i]->perform(this));
      if (simp) *ss << simp;
    }
    return ss->length() ? ss : 0;
  }

  Selector* Contextualize::operator()(Negated_Selector* s)
  {
    Selector* old_parent = parent;
    parent = 0;
    Negated_Selector* neg = new (ctx.mem) Negated_Selector(s->path(),
                                                           s->line(),
                                                           s->selector()->perform(this));
    parent = old_parent;
    return neg;
  }

  Selector* Contextualize::operator()(Pseudo_Selector* s)
  { return s; }

  Selector* Contextualize::operator()(Attribute_Selector* s)
  { return s; }

  Selector* Contextualize::operator()(Selector_Qualifier* s)
  { return s; }

  Selector* Contextualize::operator()(Type_Selector* s)
  { return s; }

  Selector* Contextualize::operator()(Selector_Placeholder* s)
  {
    To_String to_string;
    if (placeholder && extender && s->perform(&to_string) == placeholder->perform(&to_string)) {
      return extender;
    }
    else {
      return s;
    }
  }

  Selector* Contextualize::operator()(Selector_Reference* s)
  {
    if (!parent) return 0;
    Selector_Reference* ss = new (ctx.mem) Selector_Reference(*s);
    ss->selector(parent);
    return ss;
  }


}