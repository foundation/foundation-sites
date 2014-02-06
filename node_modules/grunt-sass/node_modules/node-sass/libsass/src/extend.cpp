#include "extend.hpp"
#include "context.hpp"
#include "to_string.hpp"
#include <iostream>

namespace Sass {

  Extend::Extend(Context& ctx, multimap<Simple_Selector_Sequence, Selector_Combination*>& extensions)
  : ctx(ctx), extensions(extensions)
  { }

  void Extend::operator()(Block* b)
  {
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      (*b)[i]->perform(this);
    }
  }

  void Extend::operator()(Ruleset* r)
  {
    Selector_Group* sg = static_cast<Selector_Group*>(r->selector());
    Selector_Group* ng = new (ctx.mem) Selector_Group(sg->path(), sg->line(), sg->length());
    bool extended = false;
    // for each selector in the group
    for (size_t i = 0, L = sg->length(); i < L; ++i) {
      Selector_Combination* sel = (*sg)[i];
      *ng << sel;
      // if it's supposed to be extended
      Simple_Selector_Sequence* sel_base = sel->base();
      To_String to_string;
      if (sel_base && extensions.count(*sel_base)) {
        // extend it wrt each of its extenders
        for (multimap<Simple_Selector_Sequence, Selector_Combination*>::iterator extender = extensions.lower_bound(*sel_base), E = extensions.upper_bound(*sel_base);
             extender != E;
             ++extender) {
          *ng += generate_extension(sel, extender->second);
          extended = true;
        }
      }
    }
    if (extended) r->selector(ng);
    r->block()->perform(this);
  }

  void Extend::operator()(Media_Block* m)
  {
    m->block()->perform(this);
  }

  void Extend::operator()(At_Rule* a)
  {
    if (a->block()) a->block()->perform(this);
  }

  Selector_Group* Extend::generate_extension(Selector_Combination* extendee, Selector_Combination* extender)
  {
    To_String to_string;
    Selector_Group* new_group = new (ctx.mem) Selector_Group(extendee->path(), extendee->line());
    Selector_Combination* extendee_context = extendee->context(ctx);
    Selector_Combination* extender_context = extender->context(ctx);
    if (extendee_context && extender_context) {
      Selector_Combination* base = new (ctx.mem) Selector_Combination(new_group->path(), new_group->line(), Selector_Combination::ANCESTOR_OF, extender->base(), 0);
      extendee_context->innermost()->tail(extender);
      *new_group << extendee_context;
      // make another one so we don't erroneously share tails
      extendee_context = extendee->context(ctx);
      extendee_context->innermost()->tail(base);
      extender_context->innermost()->tail(extendee_context);
      *new_group << extender_context;
    }
    else if (extendee_context) {
      extendee_context->innermost()->tail(extender);
      *new_group << extendee_context;
    }
    else if (extender_context) {
      *new_group << extender;
    }
    else {
      *new_group << extender;
    }
    return new_group;
  }

}