#include <set>

#include "selector.hpp"

namespace Sass {
  using namespace std;

  Node normalize_selector(Node s, Node_Factory& new_Node)
  {
    switch (s.type())
    {
      case Node::selector_group: {
        Node normalized(new_Node(Node::selector_group, s.path(), s.line(), 1));
        set<Node> normalizer;
        for (size_t i = 0, S = s.size(); i < S; ++i)
          normalizer.insert(normalize_selector(s[i], new_Node));
        for (set<Node>::iterator i = normalizer.begin(); i != normalizer.end(); ++i)
          normalized << *i;
        return normalized;
      } break;

      case Node::selector: {
        Node normalized(new_Node(Node::selector, s.path(), s.line(), s.size()));
        for (size_t i = 0, S = s.size(); i < S; ++i)
          normalized << normalize_selector(s[i], new_Node);
        return normalized;
      } break;

      case Node::simple_selector_sequence: {
        Node normalized(new_Node(Node::simple_selector_sequence, s.path(), s.line(), 1));
        set<Node> normalizer;
        size_t i = 0;
        if (!selector_is_qualifier(s[0])) {
          normalized << s[0];
          i = 1;
        }
        for (size_t S = s.size(); i < S; ++i)
          normalizer.insert(normalize_selector(s[i], new_Node));
        for (set<Node>::iterator i = normalizer.begin(); i != normalizer.end(); ++i)
          normalized << *i;
        return normalized;
      } break;

      default: {
        return s;
      } break;
    }
    return s;
  }

  // Remove duplicate selectors from a selector group. Used when extending.
  Node remove_duplicate_selectors(Node group, Node_Factory& new_Node)
  {
    if (group.type() != Node::selector_group) return group;

    Node filtered(new_Node(Node::selector_group, group.path(), group.line(), 1));
    for (size_t i = 0, S = group.size(); i < S; ++i) {
      bool found_dup = false;
      for (size_t j = 0; j < filtered.size(); ++j) {
        if (group[i] == filtered[j]) {
          found_dup = true;
          break;
        }
      }
      if (!found_dup) filtered << group[i];
    }

    return filtered;
  }

  bool selector_is_qualifier(Node s)
  {
    switch (s.type())
    {
      case Node::pseudo:
      case Node::pseudo_negation:
      case Node::functional_pseudo:
      case Node::attribute_selector: {
        return true;
      } break;

      case Node::simple_selector: {
        if ((*s.token().begin == '.') || (*s.token().begin == '#')) return true;
      } break;

      default: {
        return false;
      } break;
    }
    return false;
  }

  // Node selector_is_specialization_of(Node s, Node t)
  // {

  // }
}