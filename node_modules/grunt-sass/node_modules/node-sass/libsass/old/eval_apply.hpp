#define SASS_EVAL_APPLY

#include <map>

#ifndef SASS_NODE
#include "node.hpp"
#endif

#ifndef SASS_CONTEXT
#include "context.hpp"
#endif

#ifndef SASS_BACKTRACE
#include "backtrace.hpp"
#endif

namespace Sass {
  using std::map;

  void expand(Node expr, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool function_name = false, const Node content = Node());
  void re_expand(Node expr, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool function_name, const Node content);
  Node eval(Node expr, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool function_name = false);
  Node eval_arguments(Node args, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt);
  Node eval_function(string name, Node stm, Environment& bindings, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool toplevel = false);
  Node reduce(Node list, size_t head, Node acc, Node_Factory& new_Node, Backtrace& bt);
  double operate(Node op, double lhs, double rhs, Backtrace& bt);

  Node apply_mixin(Node mixin, const Node args, const Node content, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, bool dynamic_scope = false);
  Node apply_function(const Function& f, const Node args, Node prefix, Environment& env, map<string, Function>& f_env, Node_Factory& new_Node, Context& ctx, Backtrace& bt, string& path, size_t line);
  Node expand_selector(Node sel, Node pre, Node_Factory& new_Node);
  Node expand_backref(Node sel, Node pre);
  void extend(Node expr, multimap<Node, Node>& extension_requests, Node_Factory& new_Node);
  void extend_selectors(vector<pair<Node, Node> >&, multimap<Node, Node>&, Node_Factory&);
  Node generate_extension(Node extendee, Node extender, Node_Factory& new_Node);

  Node selector_prefix(Node sel, Node_Factory& new_Node);
  Node selector_base(Node sel);

  Node selector_butfirst(Node sel, Node_Factory& new_Node);
  Node selector_butlast(Node sel, Node_Factory& new_Node);

  void to_lowercase(string& s);

  Node c_val_to_node(union Sass_Value, Context&, Backtrace& bt, string, size_t);
}