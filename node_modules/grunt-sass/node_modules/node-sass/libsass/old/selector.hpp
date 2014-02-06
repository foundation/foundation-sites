#ifndef SASS_NODE
#include "node.hpp"
#endif

#ifndef SASS_NODE_FACTORY
#include "node_factory.hpp"
#endif

namespace Sass {
  Node normalize_selector(Node s, Node_Factory& new_Node);
  Node remove_duplicate_selectors(Node group, Node_Factory& new_Node);
  bool selector_is_qualifier(Node s);
}