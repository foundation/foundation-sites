#define SASS_TO_C

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

#ifndef SASS
#include "sass.h"
#endif

namespace Sass {
  using namespace std;

  class AST_Node;
  class Boolean;
  class Number;
  class String_Constant;
  class List;
  class Null;

  class To_C : public Operation_CRTP<Sass_Value, To_C> {

    Sass_Value fallback_impl(AST_Node* n);

  public:

    To_C() { }
    virtual ~To_C() { }
    using Operation<Sass_Value>::operator();

    Sass_Value operator()(Boolean*);
    Sass_Value operator()(Number*);
    Sass_Value operator()(Color*);
    Sass_Value operator()(String_Constant*);
    Sass_Value operator()(List*);
    Sass_Value operator()(Null*);
    Sass_Value operator()(Arguments*);
    Sass_Value operator()(Argument*);

    template <typename U>
    Sass_Value fallback(U x) { return fallback_impl(x); }
  };

}