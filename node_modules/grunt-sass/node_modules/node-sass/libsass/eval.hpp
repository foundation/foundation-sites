#define SASS_EVAL

#include <iostream>

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

#ifndef SASS_ENVIRONMENT
#include "environment.hpp"
#endif

#ifndef SASS
#include "sass.h"
#endif

namespace Sass {
  using namespace std;

  class Context;
  typedef Environment<AST_Node*> Env;
  struct Backtrace;

  class Eval : public Operation_CRTP<Expression*, Eval> {

    Context&   ctx;

    Expression* fallback_impl(AST_Node* n);

  public:
    Env*       env;
    Backtrace* backtrace;
    Eval(Context&, Env*, Backtrace*);
    virtual ~Eval();
    Eval* with(Env* e, Backtrace* bt); // for setting the env before eval'ing an expression
    using Operation<Expression*>::operator();

    // for evaluating function bodies
    Expression* operator()(Block*);
    Expression* operator()(Assignment*);
    Expression* operator()(If*);
    Expression* operator()(For*);
    Expression* operator()(Each*);
    Expression* operator()(While*);
    Expression* operator()(Return*);
    Expression* operator()(Warning*);

    Expression* operator()(List*);
    Expression* operator()(Binary_Expression*);
    Expression* operator()(Unary_Expression*);
    Expression* operator()(Function_Call*);
    Expression* operator()(Function_Call_Schema*);
    Expression* operator()(Variable*);
    Expression* operator()(Textual*);
    Expression* operator()(Number*);
    Expression* operator()(Boolean*);
    Expression* operator()(String_Schema*);
    Expression* operator()(String_Constant*);
    Expression* operator()(Media_Query*);
    Expression* operator()(Media_Query_Expression*);
    Expression* operator()(Null*);
    Expression* operator()(Argument*);
    Expression* operator()(Arguments*);

    template <typename U>
    Expression* fallback(U x) { return fallback_impl(x); }
  };

  Expression* cval_to_astnode(Sass_Value v, Context& ctx, Backtrace* backtrace, string path = "", size_t line = 0);

  bool eq(Expression*, Expression*, Context&);
  bool lt(Expression*, Expression*, Context&);
}
