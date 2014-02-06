#define SASS_BIND

#ifndef SASS_ENVIRONMENT
#include "environment.hpp"
#endif

#include <string>

namespace Sass {
  class   AST_Node;
  class   Parameters;
  class   Arguments;
  class   Context;
  class   Eval;
  typedef Environment<AST_Node*> Env;

  void bind(string caller, Parameters*, Arguments*, Context&, Env*, Eval*);
}