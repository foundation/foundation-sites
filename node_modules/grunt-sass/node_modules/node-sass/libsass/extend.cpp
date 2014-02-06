#include "extend.hpp"
#include "context.hpp"
#include "contextualize.hpp"
#include "to_string.hpp"
#include "backtrace.hpp"
#include <iostream>

namespace Sass {

  Extend::Extend(Context& ctx, multimap<Simple_Selector_Sequence, Selector_Combination*>& extensions, Backtrace* bt)
  : ctx(ctx), extensions(extensions), backtrace(bt)
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
    Selector_Group* ng = 0;
    bool extended = false;
    if (sg->has_placeholder()) {
      // To_String to_string;
      Simple_Selector_Sequence* placeholder = new (ctx.mem) Simple_Selector_Sequence(sg->path(), sg->line(), 1);
      *placeholder << sg->find_placeholder();
      // cerr << "placeholder: " << placeholder->perform(&to_string) << endl;
      // if the placeholder needs to be subbed
      if (extensions.count(*placeholder)) {
        // cerr << "need to sub " << placeholder->perform(&to_string) << " " << extensions.count(*placeholder) << " times" << endl;
        // perform each substitution and append it to the selector group of the ruleset
        ng = new (ctx.mem) Selector_Group(sg->path(), sg->line(), extensions.count(*placeholder));
        for (multimap<Simple_Selector_Sequence, Selector_Combination*>::iterator extender = extensions.lower_bound(*placeholder), E = extensions.upper_bound(*placeholder);
             extender != E;
             ++extender) {
          // cerr << "performing a substitution: " << placeholder->perform(&to_string) << " -> " << extender->second->perform(&to_string) << endl;
          Contextualize sub_plc(ctx, 0, 0, backtrace, placeholder, extender->second);
          Selector_Group* subbed = static_cast<Selector_Group*>(sg->perform(&sub_plc));
          // if (subbed) cerr << "subbed: " << subbed->perform(&to_string) << endl;
          *ng += subbed;
          extended = true;
        }
        ng->has_placeholder(false);
      }
      // otherwise prevent it from rendering
      else {
        // r->selector(0);
      }
    }
    else {
      ng = new (ctx.mem) Selector_Group(sg->path(), sg->line(), sg->length());
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