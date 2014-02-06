#define SASS_EXPAND

#include <vector>
#include <map>
#include <iostream>

#ifndef SASS_AST
#include "ast.hpp"
#endif

#ifndef SASS_OPERATION
#include "operation.hpp"
#endif

#ifndef SASS_ENVIRONMENT
#include "environment.hpp"
#endif

namespace Sass {
	using namespace std;

	class Context;
	class Eval;
	class Contextualize;
	typedef Environment<AST_Node*> Env;
	struct Backtrace;

	class Expand : public Operation_CRTP<Statement*, Expand> {

		Context&          ctx;
		Eval*             eval;
		Contextualize*    contextualize;
		Env*              env;
		vector<Block*>    block_stack;
		vector<String*>   property_stack;
		vector<Selector*> selector_stack;
		Backtrace*        backtrace;

		Statement* fallback_impl(AST_Node* n);

	public:
		Expand(Context&, Eval*, Contextualize*, Env*, Backtrace*);
		virtual ~Expand() { }

		using Operation<Statement*>::operator();

		Statement* operator()(Block*);
		Statement* operator()(Ruleset*);
		Statement* operator()(Propset*);
		Statement* operator()(Media_Block*);
		Statement* operator()(At_Rule*);
		Statement* operator()(Declaration*);
		Statement* operator()(Assignment*);
		Statement* operator()(Import*);
		Statement* operator()(Import_Stub*);
		Statement* operator()(Warning*);
		Statement* operator()(Comment*);
		Statement* operator()(If*);
		Statement* operator()(For*);
		Statement* operator()(Each*);
		Statement* operator()(While*);
		Statement* operator()(Return*);
		Statement* operator()(Extension*);
		Statement* operator()(Definition*);
		Statement* operator()(Mixin_Call*);
		Statement* operator()(Content*);

		template <typename U>
		Statement* fallback(U x) { return fallback_impl(x); }

		void append_block(Block*);

		multimap<Simple_Selector_Sequence, Selector_Combination*> extensions;
	};

}