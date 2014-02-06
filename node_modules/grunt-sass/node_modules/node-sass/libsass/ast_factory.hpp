#define SASS_AST_FACTORY

#include <vector>

#ifndef SASS_AST
#include "ast.hpp"
#endif

namespace Sass {
	using namespace std;

	class AST_Factory {
		vector<AST_Node*> nodes;
	public:
		// statements
		Block* new_Block(string p, size_t l, size_t s = 0, bool r = false);
		Ruleset* new_Ruleset(string p, size_t l, Selector* s, Block* b);
		Propset* new_Propset(string p, size_t l, String* pf, Block* b);
		Media_Query* new_Media_Query(string p, size_t l, List* q, Block* b);
		At_Rule* new_At_Rule(string p, size_t l, string kwd, Selector* sel, Block* b);
		Declaration* new_Declaration(string p, size_t l, String* prop, List* vals);
		Assignment* new_Assignment(string p, size_t l, string var, Expression* val, bool guarded = false);
		Import<Function_Call*>* new_CSS_Import(string p, size_t l, Function_Call* loc);
		Import<String*>* new_SASS_Import(string p, size_t l, String* loc);
		Warning* new_Warning(string p, size_t l, Expression* msg);
		Comment* new_Comment(string p, size_t l, String* txt);
		If* new_If(string p, size_t l, Expression* pred, Block* con, Block* alt = 0);
		For* new_For(string p, size_t l, string var, Expression* lo, Expression* hi, Block* b, bool inc);
		Each* new_Each(string p, size_t l, string var, Expression* lst, Block* b);
		While* new_While(string p, size_t l, Expression* pred, Block* b);
		Extension* new_Extension(string p, size_t l, Selector* s);
		Definition<MIXIN>* new_Mixin_Definition(string p, size_t l, string n, Parameters* params, Block* b);
		Definition<FUNCTION>* new_Function_Definition(string p, size_t l, string n, Parameters* params, Block* b);
		Mixin_Call* new_Mixin_Call(string p, size_t l, string n, Arguments* args, Block* b = 0);
		// expressions
		List* new_List(string p, size_t l, size_t size = 0, List::Separator sep = List::space, bool argl = false);
		Binary_Expression<AND>* new_And(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<OR>* new_Or(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<EQ>* new_Eq(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<NEQ>* new_Neq(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<GT>* new_Gt(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<GTE>* new_Gte(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<LT>* new_Lt(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<LTE>* new_Lte(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<ADD>* new_Add(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<SUB>* new_Sub(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<MUL>* new_Mul(string p, size_t l, Expression* lhs, Expression* rhs);
		Binary_Expression<DIV>* new_Div(string p, size_t l, Expression* lhs, Expression* rhs);
		Negation* new_Negation(string p, size_t l, Expression* o);
		Function_Call* new_Function_Call(string p, size_t l, String* n, Arguments* args);
		Variable* new_Variable(string p, size_t l, string n);
		Textual<NUMBER>* new_Textual_Number(string p, size_t l, string val);
		Textual<PERCENTAGE>* new_Textual_Percentage(string p, size_t l, string val);
		Textual<DIMENSION>* new_Textual_Dimension(string p, size_t l, string val);
		Textual<HEX>* new_Textual_Hex(string p, size_t l, string val);
		Number* new_Number(string p, size_t l, double val);
		Percentage* new_Percentage(string p, size_t l, double val);
		Dimension* new_Dimension(string p, size_t l, double val, string unit);
		Color* new_Color(string p, size_t l, double r, double g, double b, double a = 1);
		Boolean* new_Boolean(string p, size_t l, bool val);
		String_Schema* new_String_Schema(string p, size_t l, size_t size = 0);
		String_Constant* new_String_Constant(string p, size_t l, string val);
		String_Constant* new_String_Constant(string p, size_t l, const char* beg);
		String_Constant* new_String_Constant(string p, size_t l, const char* beg, const char* end);
		Media_Expression* new_Media_Expression(string p, size_t l, String* f, Expression* v);
		// parameters and arguments
		Parameter* new_Parameter(string p, size_t l, string n, Expression* def = 0, bool rest = false);
		Parameters* new_Parameters(string p, size_t l);
		Argument* new_Argument(string p, size_t l, Expression* val, string n = "", bool rest = false);
		Arguments* new_Arguments(string p, size_t l);
		// selectors
		Selector_Schema* new_Selector_Schema(string p, size_t l, String* c);
		Simple_Selector* new_Simple_Selector(string p, size_t l, string c);
		Reference_Selector* new_Reference_Selector(string p, size_t l);
		Placeholder_Selector* new_Placeholder_Selector(string p, size_t l, string n);
		Pseudo_Selector* new_Pseudo_Selector(string p, size_t l, string n, Expression* expr = 0);
		Negated_Selector* new_Negated_Selector(string p, size_t l, Simple_Base* sel);
		Simple_Selector_Sequence* new_Simple_Selector_Sequence(string p, size_t l, size_t s = 0);
		Selector_Combination* new_Selector_Combination(string p, size_t l, Selector_Combination::Combinator c, Selector_Combination* ctx, Simple_Selector_Sequence* sel);
		Selector_Group* new_Selector_Group(string p, size_t l, size_t s = 0);
	};
}