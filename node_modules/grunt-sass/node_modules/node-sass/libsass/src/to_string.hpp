#define SASS_TO_STRING

#include <string>

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

namespace Sass {
  using namespace std;

  class To_String : public Operation_CRTP<string, To_String> {
    // import all the class-specific methods and override as desired
    using Operation<string>::operator();
    // override this to define a catch-all
    string fallback_impl(AST_Node* n);

  public:
    To_String();
    virtual ~To_String();

    template <typename U>
    string fallback(U n) { return fallback_impl(n); }
  };
}