#define SASS_CONTEXTUALIZE

#ifndef SASS_ENVIRONMENT
#include "environment.hpp"
#endif

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

namespace Sass {
  class AST_Node;
  class Selector;
  class Selector_Schema;
  class Selector_Group;
  class Selector_Combination;
  class Simple_Selector_Sequence;
  class Negated_Selector;
  class Pseudo_Selector;
  class Attribute_Selector;
  class Selector_Qualifier;
  class Type_Selector;
  class Selector_Placeholder;
  class Selector_Reference;
  class Simple_Selector;
  class Context;
  class Eval;
  class Backtrace;

  typedef Environment<AST_Node*> Env;

  class Contextualize : public Operation_CRTP<Selector*, Contextualize> {

    Context&   ctx;
    Eval*      eval;
    Env*       env;
    Selector*  parent;
    Backtrace* backtrace;

    Selector* fallback_impl(AST_Node* n);

  public:
    Contextualize(Context&, Eval*, Env*, Backtrace*);
    virtual ~Contextualize();
    Contextualize* with(Selector*, Env*, Backtrace*);
    using Operation<Selector*>::operator();

    Selector* operator()(Selector_Schema*);
    Selector* operator()(Selector_Group*);
    Selector* operator()(Selector_Combination*);
    Selector* operator()(Simple_Selector_Sequence*);
    Selector* operator()(Negated_Selector*);
    Selector* operator()(Pseudo_Selector*);
    Selector* operator()(Attribute_Selector*);
    Selector* operator()(Selector_Qualifier*);
    Selector* operator()(Type_Selector*);
    Selector* operator()(Selector_Placeholder*);
    Selector* operator()(Selector_Reference*);

    template <typename U>
    Selector* fallback(U x) { return fallback_impl(x); }
  };
}