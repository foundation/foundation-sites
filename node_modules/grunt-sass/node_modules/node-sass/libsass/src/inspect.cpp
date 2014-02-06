#include "inspect.hpp"
#include "ast.hpp"
#include <cmath>
#include <iostream>
#include <iomanip>

namespace Sass {
  using namespace std;

  Inspect::Inspect() : buffer(""), indentation(0) { }
  Inspect::~Inspect() { }

  // statements
  void Inspect::operator()(Block* block)
  {
    if (!block->is_root()) {
      buffer += " {\n";
      ++indentation;
    }
    for (size_t i = 0, L = block->length(); i < L; ++i) {
      indent();
      (*block)[i]->perform(this);
      // extra newline at the end of top-level statements
      if (block->is_root()) buffer += '\n';
      buffer += '\n';
    }
    if (!block->is_root()) {
      --indentation;
      indent();
      buffer += "}";
    }
    // remove extra newline that gets added after the last top-level block
    if (block->is_root()) {
      size_t l = buffer.length();
      if (l > 2 && buffer[l-1] == '\n' && buffer[l-2] == '\n')
        buffer.erase(l-1);
    }
  }

  void Inspect::operator()(Ruleset* ruleset)
  {
    ruleset->selector()->perform(this);
    ruleset->block()->perform(this);
  }

  void Inspect::operator()(Propset* propset)
  {
    propset->property_fragment()->perform(this);
    buffer += ": ";
    // ++indentation;
    // for (size_t i = 0, S = propset->declarations().size(); i < S; ++i) {
    //   indent();
    //   propset->declarations()[i]->perform(this);
    //   buffer += '\n';
    // }
    // for (size_t i = 0, S = propset->propsets().size(); i < S; ++i) {
    //   indent();
    //   propset->propsets()[i]->perform(this);
    //   buffer += '\n';
    // }
    // --indentation;
    // buffer += "}";
    propset->block()->perform(this);
  }

  void Inspect::operator()(Media_Block* media_block)
  {
    buffer += "@media ";
    media_block->media_queries()->perform(this);
    media_block->block()->perform(this);
  }

  void Inspect::operator()(At_Rule* at_rule)
  {
    buffer += at_rule->keyword();
    if (at_rule->selector()) {
      buffer += ' ';
      at_rule->selector()->perform(this);
    }
    if (at_rule->block()) {
      at_rule->block()->perform(this);
    }
    else {
      buffer += ';';
    }
  }

  void Inspect::operator()(Declaration* dec)
  {
    dec->property()->perform(this);
    buffer += ": ";
    dec->value()->perform(this);
    if (dec->is_important()) buffer += " !important";
    buffer += ';';
  }

  void Inspect::operator()(Assignment* assn)
  {
    buffer += assn->variable();
    buffer += ": ";
    assn->value()->perform(this);
    if (assn->is_guarded()) buffer += " !default";
    buffer += ';';
  }

  void Inspect::operator()(Import* import)
  {
    if (!import->urls().empty()) {
      buffer += "@import ";
      import->urls().front()->perform(this);
      buffer += ';';
      for (size_t i = 1, S = import->urls().size(); i < S; ++i) {
        buffer += "\n@import ";
        import->urls()[i]->perform(this);
        buffer += ';';
      }
    }
  }

  void Inspect::operator()(Import_Stub* import)
  {
    buffer += "@import ";
    buffer += import->file_name();
    buffer += ';';
  }

  void Inspect::operator()(Warning* warning)
  {
    buffer += "@warn ";
    warning->message()->perform(this);
    buffer += ';';
  }

  void Inspect::operator()(Comment* comment)
  {
    comment->text()->perform(this);
  }

  void Inspect::operator()(If* cond)
  {
    buffer += "@if ";
    cond->predicate()->perform(this);
    cond->consequent()->perform(this);
    if (cond->alternative()) {
      buffer += '\n';
      indent();
      buffer += "else";
      cond->alternative()->perform(this);
    }
  }

  void Inspect::operator()(For* loop)
  {
    buffer += string("@for ");
    buffer += loop->variable();
    buffer += " from ";
    loop->lower_bound()->perform(this);
    buffer += (loop->is_inclusive() ? " through " : " to ");
    loop->upper_bound()->perform(this);
    loop->block()->perform(this);
  }

  void Inspect::operator()(Each* loop)
  {
    buffer += string("@each ");
    buffer += loop->variable();
    buffer += " in ";
    loop->list()->perform(this);
    loop->block()->perform(this);
  }

  void Inspect::operator()(While* loop)
  {
    buffer += "@while ";
    loop->predicate()->perform(this);
    loop->block()->perform(this);
  }

  void Inspect::operator()(Return* ret)
  {
    buffer += "@return ";
    ret->value()->perform(this);
    buffer += ';';
  }

  void Inspect::operator()(Extension* extend)
  {
    buffer += "@extend ";
    extend->selector()->perform(this);
    buffer += ';';
  }

  void Inspect::operator()(Definition* def)
  {
    if (def->type() == Definition::MIXIN) buffer += "@mixin ";
    else                                  buffer += "@function ";
    buffer += def->name();
    def->parameters()->perform(this);
    def->block()->perform(this);
  }

  void Inspect::operator()(Mixin_Call* call)
  {
    buffer += string("@include ") += call->name();
    if (call->arguments()) {
      call->arguments()->perform(this);
    }
    if (call->block()) {
      buffer += ' ';
      call->block()->perform(this);
    }
    if (!call->block()) buffer += ';';
  }

  void Inspect::operator()(Content* content)
  {
    buffer += "@content;";
  }

  void Inspect::operator()(List* list)
  {
    string sep(list->separator() == List::SPACE ? " " : ", ");
    if (list->empty()) return;
    Expression* first = (*list)[0];
    bool first_invisible = first->is_invisible();
    if (!first_invisible) first->perform(this);
    for (size_t i = 1, L = list->length(); i < L; ++i) {
      Expression* next = (*list)[i];
      bool next_invisible = next->is_invisible();
      if (i == 1 && !first_invisible && !next_invisible) buffer += sep;
      else if (!next_invisible)                          buffer += sep;
      next->perform(this);
    }
  }

  void Inspect::operator()(Binary_Expression* expr)
  {
    expr->left()->perform(this);
    switch (expr->type()) {
      case Binary_Expression::AND: buffer += " and "; break;
      case Binary_Expression::OR:  buffer += " or ";  break;
      case Binary_Expression::EQ:  buffer += " == ";  break;
      case Binary_Expression::NEQ: buffer += " != ";  break;
      case Binary_Expression::GT:  buffer += " > ";   break;
      case Binary_Expression::GTE: buffer += " >= ";  break;
      case Binary_Expression::LT:  buffer += " < ";   break;
      case Binary_Expression::LTE: buffer += " <= ";  break;
      case Binary_Expression::ADD: buffer += " + ";   break;
      case Binary_Expression::SUB: buffer += " - ";   break;
      case Binary_Expression::MUL: buffer += " * ";   break;
      case Binary_Expression::DIV: buffer += "/";     break;
      case Binary_Expression::MOD: buffer += " % ";   break;
      default: break; // shouldn't get here
    }
    expr->right()->perform(this);
  }

  void Inspect::operator()(Unary_Expression* expr)
  {
    if (expr->type() == Unary_Expression::PLUS) buffer += '+';
    else                                        buffer += '-';
    expr->operand()->perform(this);
  }

  void Inspect::operator()(Function_Call* call)
  {
    buffer += call->name();
    call->arguments()->perform(this);
  }

  void Inspect::operator()(Function_Call_Schema* call)
  {
    call->name()->perform(this);
    call->arguments()->perform(this);
  }

  void Inspect::operator()(Variable* var)
  {
    buffer += var->name();
  }

  void Inspect::operator()(Textual* txt)
  {
    buffer += txt->value();
  }

  // helper functions for serializing numbers
  string frac_to_string(double f, size_t p) {
    stringstream ss;
    ss.setf(ios::fixed, ios::floatfield);
    ss.precision(p);
    ss << f;
    string result(ss.str().substr(f < 0 ? 2 : 1));
    size_t i = result.size() - 1;
    while (result[i] == '0') --i;
    result = result.substr(0, i+1);
    return result;
  }
  string double_to_string(double d, size_t p) {
    stringstream ss;
    double ipart;
    double fpart = std::modf(d, &ipart);
    ss << ipart;
    if (fpart != 0) ss << frac_to_string(fpart, 5);
    return ss.str();
  }

  void Inspect::operator()(Number* n)
  {
    // buffer += double_to_string(n->value(), 5);
    // buffer += n->unit();
    stringstream ss;
    ss.precision(5);
    ss << fixed << n->value();
    string d(ss.str());
    for (size_t i = d.length()-1; i >= 0; --i) {
      if (d[i] == '0') d.resize(d.length()-1);
      else break;
    }
    if (d[d.length()-1] == '.') d.resize(d.length()-1);
    if (n->numerator_units().size() > 1 || n->denominator_units().size() > 0) {
      error(d + n->unit() + " is not a valid CSS value", n->path(), n->line());
    }
    buffer += d;
    buffer += n->unit();
  }

  // helper function for serializing colors
  template <size_t range>
  static double cap_channel(double c) {
    if      (c > range) return range;
    else if (c < 0)     return 0;
    else                return c;
  }

  void Inspect::operator()(Color* c)
  {
    stringstream ss;
    double r = cap_channel<0xff>(c->r());
    double g = cap_channel<0xff>(c->g());
    double b = cap_channel<0xff>(c->b());
    double a = cap_channel<1>   (c->a());
    // int numval = r * 0x10000;
    // numval += g * 0x100;
    // numval += b;
    // if (a >= 1 && ctx.colors_to_names.count(numval)) {
    //   ss << ctx.colors_to_names[numval];
    // }
    // else
    if (a >= 1) {
      ss << '#' << setw(2) << setfill('0');
      ss << hex << setw(2) << static_cast<unsigned long>(floor(r+0.5));
      ss << hex << setw(2) << static_cast<unsigned long>(floor(g+0.5));
      ss << hex << setw(2) << static_cast<unsigned long>(floor(b+0.5));
    }
    else {
      ss << "rgba(";
      ss << static_cast<unsigned long>(r) << ", ";
      ss << static_cast<unsigned long>(g) << ", ";
      ss << static_cast<unsigned long>(b) << ", ";
      ss << static_cast<unsigned long>(a) << ')';
    }
    buffer += ss.str();
  }

  void Inspect::operator()(Boolean* b)
  {
    buffer += (b->value() ? "true" : "false");
  }

  void Inspect::operator()(String_Schema* ss)
  {
    // Evaluation should turn these into String_Constants, so this method is
    // only for inspection purposes.
    for (size_t i = 0, L = ss->length(); i < L; ++i) {
      if ((*ss)[i]->is_interpolant()) buffer += "#{";
      (*ss)[i]->perform(this);
      if ((*ss)[i]->is_interpolant()) buffer += '}';
    }
  }

  void Inspect::operator()(String_Constant* s)
  {
    buffer += (s->needs_unquoting() ? unquote(s->value()) : s->value());
  }

  void Inspect::operator()(Media_Query* mq)
  {
    size_t i = 0;
    if (mq->media_type()) {
      if      (mq->is_negated())    buffer += "not ";
      else if (mq->is_restricted()) buffer += "only ";
      mq->media_type()->perform(this);
    }
    else {
      (*mq)[i++]->perform(this);
    }
    for (size_t L = mq->length(); i < L; ++i) {
      buffer += " and ";
      (*mq)[i]->perform(this);
    }
  }

  void Inspect::operator()(Media_Query_Expression* mqe)
  {
    if (mqe->is_interpolated()) {
      mqe->feature()->perform(this);
    }
    else {
      buffer += "(";
      mqe->feature()->perform(this);
      if (mqe->value()) {
        buffer += ": ";
        mqe->value()->perform(this);
      }
      buffer += ')';
    }
  }

  // void Inspect::operator()(Null* n)
  // {
  //   buffer += "null";
  // }

  // parameters and arguments
  void Inspect::operator()(Parameter* p)
  {
    buffer += p->name();
    if (p->default_value()) {
      buffer += ": ";
      p->default_value()->perform(this);
    }
    else if (p->is_rest_parameter()) {
      buffer += "...";
    }
  }

  void Inspect::operator()(Parameters* p)
  {
    buffer += '(';
    if (!p->empty()) {
      (*p)[0]->perform(this);
      for (size_t i = 1, L = p->length(); i < L; ++i) {
        buffer += ", ";
        (*p)[i]->perform(this);
      }
    }
    buffer += ')';
  }

  void Inspect::operator()(Argument* a)
  {
    if (!a->name().empty()) {
      buffer += a->name();
      buffer += ": ";
    }
    a->value()->perform(this);
    if (a->is_rest_argument()) {
      buffer += "...";
    }
  }

  void Inspect::operator()(Arguments* a)
  {
    buffer += '(';
    if (!a->empty()) {
      (*a)[0]->perform(this);
      for (size_t i = 1, L = a->length(); i < L; ++i) {
        buffer += ", ";
        (*a)[i]->perform(this);
      }
    }
    buffer += ')';
  }

  // selectors
  void Inspect::operator()(Selector_Schema* s)
  {
    s->contents()->perform(this);
  }

  void Inspect::operator()(Selector_Reference* ref)
  {
    if (ref->selector()) ref->selector()->perform(this);
    else                 buffer += '&';
  }

  void Inspect::operator()(Selector_Placeholder* s)
  {
    buffer += s->name();
  }

  void Inspect::operator()(Type_Selector* s)
  {
    buffer += s->name();
  }

  void Inspect::operator()(Selector_Qualifier* s)
  {
    buffer += s->name();
  }

  void Inspect::operator()(Attribute_Selector* s)
  {
    buffer += '[';
    buffer += s->name();
    if (!s->matcher().empty()) {
      buffer += s->matcher();
      buffer += s->value();
    }
    buffer += ']';
  }

  void Inspect::operator()(Pseudo_Selector* s)
  {
    buffer += s->name();
    if (s->expression()) {
      s->expression()->perform(this);
      buffer += ')';
    }
  }

  void Inspect::operator()(Negated_Selector* s)
  {
    buffer += ":not(";
    s->selector()->perform(this);
    buffer += ')';
  }

  void Inspect::operator()(Simple_Selector_Sequence* s)
  {
    for (size_t i = 0, L = s->length(); i < L; ++i) {
      (*s)[i]->perform(this);
    }
  }

  void Inspect::operator()(Selector_Combination* c)
  {
    Simple_Selector_Sequence*        head = c->head();
    Selector_Combination*            tail = c->tail();
    Selector_Combination::Combinator comb = c->combinator();
    if (head) head->perform(this);
    if (head && tail) buffer += ' ';
    switch (comb) {
      case Selector_Combination::ANCESTOR_OF:                break;
      case Selector_Combination::PARENT_OF:   buffer += '>'; break;
      case Selector_Combination::PRECEDES:    buffer += '~'; break;
      case Selector_Combination::ADJACENT_TO: buffer += '+'; break;
    }
    if (head && tail && comb != Selector_Combination::ANCESTOR_OF) {
      buffer += ' ';
    }
    if (tail) tail->perform(this);
  }

  void Inspect::operator()(Selector_Group* g)
  {
    if (g->empty()) return;
    (*g)[0]->perform(this);
    for (size_t i = 1, L = g->length(); i < L; ++i) {
      buffer += ", ";
      (*g)[i]->perform(this);
    }
  }

  inline void Inspect::fallback_impl(AST_Node* n)
  { }

  void Inspect::indent()
  { buffer += string(2*indentation, ' '); }

  string unquote(const string& s)
  {
    if (s.empty()) return "";
    char q;
    if      (*s.begin() == '"'  && *s.rbegin() == '"')  q = '"';
    else if (*s.begin() == '\'' && *s.rbegin() == '\'') q = '\'';
    else                                                return s;
    string t;
    t.reserve(s.length()-2);
    for (size_t i = 1, L = s.length()-1; i < L; ++i) {
      // if we see a quote, we need to remove the preceding backslash from u
      if (s[i] == q) t.erase(t.length()-1);
      t.push_back(s[i]);
    }
    return t;
  }

  string quote(const string& s, char q)
  {
    if (s.empty()) return string(2, q);
    if (!q || s[0] == '"' || s[0] == '\'') return s;
    string t;
    t.reserve(s.length()+2);
    t.push_back(q);
    for (size_t i = 0, L = s.length(); i < L; ++i) {
      if (s[i] == q) t.push_back('\\');
      t.push_back(s[i]);
    }
    t.push_back(q);
    return t;
  }

}