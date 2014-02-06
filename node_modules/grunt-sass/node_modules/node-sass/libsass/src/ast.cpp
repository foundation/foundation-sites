#include "ast.hpp"
#include "context.hpp"
#include "to_string.hpp"
#include <iostream>

namespace Sass {
  using namespace std;

  bool Simple_Selector_Sequence::operator<(const Simple_Selector_Sequence& rhs) const
  {
    To_String to_string;
    // ugly
    return const_cast<Simple_Selector_Sequence*>(this)->perform(&to_string) <
           const_cast<Simple_Selector_Sequence&>(rhs).perform(&to_string);
  }

  Simple_Selector_Sequence* Selector_Combination::base()
  {
    if (!tail()) return head();
    else return tail()->base();
  }

  Selector_Combination* Selector_Combination::context(Context& ctx)
  {
    if (!tail()) return 0;
    if (!head()) return tail()->context(ctx);
    return new (ctx.mem) Selector_Combination(path(), line(), combinator(), head(), tail()->context(ctx));
  }

  Selector_Combination* Selector_Combination::innermost()
  {
    if (!tail()) return this;
    else return tail()->innermost();
  }

}