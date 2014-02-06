#include "to_c.hpp"
#include "ast.hpp"

namespace Sass {
  using namespace std;

  Sass_Value To_C::fallback_impl(AST_Node* n)
  { return make_sass_null(); }

  Sass_Value To_C::operator()(Boolean* b)
  { return make_sass_boolean(b->value()); }

  Sass_Value To_C::operator()(Number* n)
  { return make_sass_number(n->value(), n->unit().c_str()); }

  Sass_Value To_C::operator()(Color* c)
  { return make_sass_color(c->r(), c->g(), c->b(), c->a()); }

  Sass_Value To_C::operator()(String_Constant* s)
  { return make_sass_string(s->value().c_str()); }

  Sass_Value To_C::operator()(List* l)
  {
    Sass_Value v = make_sass_list(l->length(), l->separator() == List::COMMA ? SASS_COMMA : SASS_SPACE);
    for (size_t i = 0, L = l->length(); i < L; ++i) {
      v.list.values[i] = (*l)[i]->perform(this);
    }
    return v;
  }

  Sass_Value To_C::operator()(Arguments* a)
  {
    Sass_Value v = make_sass_list(a->length(), SASS_COMMA);
    for (size_t i = 0, L = a->length(); i < L; ++i) {
      v.list.values[i] = (*a)[i]->perform(this);
    }
    return v;
  }

  Sass_Value To_C::operator()(Argument* a)
  { return a->value()->perform(this); }

  // not strictly necessary because of the fallback
  Sass_Value To_C::operator()(Null* n)
  { return make_sass_null(); }

};