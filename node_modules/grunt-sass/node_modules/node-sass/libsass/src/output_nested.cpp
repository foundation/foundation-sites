#include "output_nested.hpp"
#include "inspect.hpp"
#include "ast.hpp"

namespace Sass {
  using namespace std;

  Output_Nested::Output_Nested() : buffer(""), indentation(0) { }
  Output_Nested::~Output_Nested() { }

  inline void Output_Nested::fallback_impl(AST_Node* n)
  {
    Inspect i;
    n->perform(&i);
    buffer += i.get_buffer();
  }

  void Output_Nested::operator()(Ruleset* r)
  {
    Selector* s     = r->selector();
    Block*    b     = r->block();
    bool      decls = false;

    if (b->has_non_hoistable()) {
      decls = true;
      indent();
      s->perform(this);
      buffer += " {\n";
      ++indentation;
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        Statement* stm = (*b)[i];
        if (!stm->is_hoistable()) {
          if (!stm->block()) indent();
          stm->perform(this);
          buffer += '\n';
        }
      }
      --indentation;
      buffer.erase(buffer.length()-1);
      buffer += " }\n";
    }

    if (b->has_hoistable()) {
      if (decls) ++indentation;
      // indent();
      for (size_t i = 0, L = b->length(); i < L; ++i) {
        Statement* stm = (*b)[i];
        if (stm->is_hoistable()) {
          stm->perform(this);
        }
      }
      if (decls) --indentation;
    }
  }

  void Output_Nested::operator()(Media_Block* m)
  {
    List*  q     = m->media_queries();
    Block* b     = m->block();
    bool   decls = false;

    indent();
    buffer += "@media ";
    q->perform(this);
    buffer += " {\n";

    Selector* e = m->enclosing_selector();
    bool hoisted = false;
    if (e && b->has_non_hoistable()) {
      hoisted = true;
      ++indentation;
      indent();
      e->perform(this);
      buffer += " {\n";
    }

    ++indentation;
    decls = true;
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (!stm->is_hoistable()) {
        if (!stm->block()) indent();
        stm->perform(this);
        buffer += '\n';
      }
    }
    --indentation;

    if (hoisted) {
      buffer.erase(buffer.length()-1);
      buffer += " }\n";
      --indentation;
    }

    if (decls) ++indentation;
    if (hoisted) ++indentation;
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (stm->is_hoistable()) {
        stm->perform(this);
      }
    }
    if (hoisted) --indentation;
    if (decls) --indentation;

    buffer.erase(buffer.length()-1);
    buffer += " }\n";
  }

  void Output_Nested::operator()(At_Rule* a)
  {
    string    kwd   = a->keyword();
    Selector* s     = a->selector();
    Block*    b     = a->block();
    bool      decls = false;

    // indent();
    buffer += kwd;
    if (s) {
      buffer += ' ';
      s->perform(this);
    }

    if (!b) {
      buffer += ';';
      return;
    }

    buffer += " {\n";
    ++indentation;
    decls = true;
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (!stm->is_hoistable()) {
        if (!stm->block()) indent();
        stm->perform(this);
        buffer += '\n';
      }
    }
    --indentation;

    if (decls) ++indentation;
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      Statement* stm = (*b)[i];
      if (stm->is_hoistable()) {
        stm->perform(this);
        buffer += '\n';
      }
    }
    if (decls) --indentation;

    buffer.erase(buffer.length()-1);
    if (b->has_hoistable()) {
      buffer.erase(buffer.length()-1);
    }
    buffer += " }\n";
  }

  void Output_Nested::operator()(Block* b)
  {
    if (!b->is_root()) return;
    for (size_t i = 0, L = b->length(); i < L; ++i) {
      (*b)[i]->perform(this);
      if (i < L-1) buffer += '\n';
    }
  }

  void Output_Nested::indent()
  { buffer += string(2*indentation, ' '); }

}