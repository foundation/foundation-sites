#include <string>

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

namespace Sass {
  using namespace std;

  class Output_Compressed : public Operation_CRTP<void, Output_Compressed> {
    // import all the class-specific methods and override as desired
    using Operation_CRTP<void, Output_Compressed>::operator();

    string buffer;

    void fallback_impl(AST_Node* n);

  public:
    Output_Compressed();
    virtual ~Output_Compressed();

    string get_buffer() { return buffer; }

    // statements
    virtual void operator()(Block*);
    virtual void operator()(Ruleset*);
    // virtual void operator()(Propset*);
    virtual void operator()(Media_Block*);
    virtual void operator()(At_Rule*);
    virtual void operator()(Declaration*);
    // virtual void operator()(Assignment*);
    // virtual void operator()(Import*);
    // virtual void operator()(Import_Stub*);
    // virtual void operator()(Warning*);
    // virtual void operator()(Comment*);
    // virtual void operator()(If*);
    // virtual void operator()(For*);
    // virtual void operator()(Each*);
    // virtual void operator()(While*);
    // virtual void operator()(Return*);
    // virtual void operator()(Extension*);
    // virtual void operator()(Definition*);
    // virtual void operator()(Mixin_Call*);
    // virtual void operator()(Content*);
    // // expressions
    virtual void operator()(List*);
    // virtual void operator()(Binary_Expression*);
    // virtual void operator()(Unary_Expression*);
    // virtual void operator()(Function_Call*);
    // virtual void operator()(Function_Call_Schema*);
    // virtual void operator()(Variable*);
    // virtual void operator()(Textual*);
    // virtual void operator()(Number*);
    // virtual void operator()(Color*);
    // virtual void operator()(Boolean*);
    // virtual void operator()(String_Schema*);
    // virtual void operator()(String_Constant* x);
    // virtual void operator()(Media_Query*);
    virtual void operator()(Media_Query_Expression*);
    // // parameters and arguments
    // virtual void operator()(Parameter*);
    // virtual void operator()(Parameters*);
    virtual void operator()(Argument*);
    virtual void operator()(Arguments*);
    // // selectors
    // virtual void operator()(Selector_Schema*);
    // virtual void operator()(Selector_Reference*);
    // virtual void operator()(Selector_Placeholder*);
    // virtual void operator()(Type_Selector*);
    // virtual void operator()(Selector_Qualifier*);
    // virtual void operator()(Attribute_Selector*);
    // virtual void operator()(Pseudo_Selector*);
    // virtual void operator()(Negated_Selector*);
    // virtual void operator()(Simple_Selector_Sequence*);
    virtual void operator()(Selector_Combination*);
    virtual void operator()(Selector_Group*);

    template <typename U>
    void fallback(U x) { fallback_impl(x); }
  };

}