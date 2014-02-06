#include "output_compressed.hpp"
#include "inspect.hpp"
#include "ast.hpp"
#include "context.hpp"

namespace Sass {
  using namespace std;

  Output_Compressed::Output_Compressed(Context* ctx) : buffer(""), ctx(ctx) { }
  Output_Compressed::~Output_Compressed() { }

  inline void Output_Compressed::fallback_impl(AST_Node* n)
  {
    Inspect i;
    n->perform(&i);
    buffer += i.get_buffer();
  }

  void Output_Compressed::operator()(Block* b)
  {
    if (!b->is_root()) return;
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      (*b)[i]->perform(this);
    }
  }

  void Output_Compressed::operator()(Ruleset* r)
  {
    Selector* s     = r->selector();
    Block*    b     = r->block();

    if (s->has_placeholder()) return;

    if (b->has_non_hoistable()) {
      s->perform(this);
      buffer += "{";
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        Statement* stm = (*b)[i];
        if (!stm->is_hoistable()) {
          stm->perform(this);
        }
      }
      buffer += "}";
    }

    if (b->has_hoistable()) {
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        Statement* stm = (*b)[i];
        if (stm->is_hoistable()) {
          stm->perform(this);
        }
      }
    }
  }

  void Output_Compressed::operator()(Media_Block* m)
  {
    List*  q     = m->media_queries();
    Block* b     = m->block();

    buffer += "@media ";
    q->perform(this);
    buffer += "{";

    Selector* e = m->enclosing_selector();
    bool hoisted = false;
    if (e && b->has_non_hoistable()) {
      hoisted = true;
      e->perform(this);
      buffer += "{";
    }

    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (!stm->is_hoistable()) {
        stm->perform(this);
      }
    }

    if (hoisted) {
      buffer += "}";
    }

    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (stm->is_hoistable()) {
        stm->perform(this);
      }
    }

    buffer += "}";
  }

  void Output_Compressed::operator()(At_Rule* a)
  {
    string    kwd   = a->keyword();
    Selector* s     = a->selector();
    Block*    b     = a->block();

    buffer += kwd;
    if (s) {
      buffer += ' ';
      s->perform(this);
    }

    if (!b) {
      buffer += ';';
      return;
    }

    buffer += "{";
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (!stm->is_hoistable()) {
        stm->perform(this);
      }
    }

    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (stm->is_hoistable()) {
        stm->perform(this);
      }
    }

    buffer += "}";
  }

  void Output_Compressed::operator()(Declaration* d)
  {
    d->property()->perform(this);
    buffer += ":";
    d->value()->perform(this);
    if (d->is_important()) buffer += "!important";
    buffer += ';';
  }

  void Output_Compressed::operator()(Comment* c)
  {
    return;
  }

  void Output_Compressed::operator()(List* list)
  {
    string sep(list->separator() == List::SPACE ? " " : ",");
    if (list->empty()) return;
    Expression* first = (*list)[0];
    bool first_invisible = first->is_invisible();
    if (!first_invisible) first->perform(this);
    for (size_t i = 1, L = list->length(); i < L; ++i) {
      Expression* next = (*list)[i];
      bool next_invisible = next->is_invisible();
      if (i == 1 && !first_invisible && !next_invisible) buffer += sep;
      else if (!next_invisible)                          buffer += sep;
      next->perform(this);
    }
  }

  void Output_Compressed::operator()(Media_Query_Expression* mqe)
  {
    if (mqe->is_interpolated()) {
      mqe->feature()->perform(this);
    }
    else {
      buffer += "(";
      mqe->feature()->perform(this);
      if (mqe->value()) {
        buffer += ":";
        mqe->value()->perform(this);
      }
      buffer += ')';
    }
  }

  void Output_Compressed::operator()(Argument* a)
  {
    if (!a->name().empty()) {
      buffer += a->name();
      buffer += ":";
    }
    a->value()->perform(this);
    if (a->is_rest_argument()) {
      buffer += "...";
    }
  }

  void Output_Compressed::operator()(Arguments* a)
  {
    buffer += '(';
    if (!a->empty()) {
      (*a)[0]->perform(this);
      for (size_t i = 1, L = a->length(); i < L; ++i) {
        buffer += ",";
        (*a)[i]->perform(this);
      }
    }
    buffer += ')';
  }

  void Output_Compressed::operator()(Selector_Combination* c)
  {
    Simple_Selector_Sequence*        head = c->head();
    Selector_Combination*            tail = c->tail();
    Selector_Combination::Combinator comb = c->combinator();
    if (head) head->perform(this);
    switch (comb) {
      case Selector_Combination::ANCESTOR_OF: buffer += ' '; break;
      case Selector_Combination::PARENT_OF:   buffer += '>'; break;
      case Selector_Combination::PRECEDES:    buffer += '~'; break;
      case Selector_Combination::ADJACENT_TO: buffer += '+'; break;
    }
    if (tail) tail->perform(this);
  }

  void Output_Compressed::operator()(Selector_Group* g)
  {
    if (g->empty()) return;
    (*g)[0]->perform(this);
    for (size_t i = 1, L = g->length(); i < L; ++i) {
      buffer += ",";
      (*g)[i]->perform(this);
    }
  }

}