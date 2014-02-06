#define SASS_EXTEND

#include <vector>
#include <map>
#include <iostream>

#ifndef SASS_AST
#include "ast.hpp"
#endif

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

namespace Sass {
  using namespace std;

  class Context;
  class Backtrace;

  class Extend : public Operation_CRTP<void, Extend> {

    Context&          ctx;
    multimap<Simple_Selector_Sequence, Selector_Combination*>& extensions;
    Backtrace*        backtrace;

    void fallback_impl(AST_Node* n) { };

  public:
    Extend(Context&, multimap<Simple_Selector_Sequence, Selector_Combination*>&, Backtrace*);
    virtual ~Extend() { }

    using Operation<void>::operator();

    void operator()(Block*);
    void operator()(Ruleset*);
    void operator()(Media_Block*);
    void operator()(At_Rule*);

    Selector_Group* generate_extension(Selector_Combination*, Selector_Combination*);

    template <typename U>
    void fallback(U x) { return fallback_impl(x); }
  };


}