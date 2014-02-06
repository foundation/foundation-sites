#define SASS_ENVIRONMENT

#include <map>

#ifndef SASS_NODE
#include "node.hpp"
#endif

namespace Sass {
  using std::map;

  struct Environment {
    map<Token, Node> current_frame;
    Environment* parent;
    Environment* global;
    
    Environment()
    : current_frame(map<Token, Node>()), parent(0), global(0)
    { }
    
    void link(Environment& env)
    {
      parent = &env;
      global = parent->global ? parent->global : parent;
    }
    
    bool query(const Token& key) const
    {
      if (current_frame.count(key)) return true;
      else if (parent)              return parent->query(key);
      else                          return false;
    }
    
    Node& operator[](const Token& key)
    {
      if (current_frame.count(key)) return current_frame[key];
      else if (parent)              return (*parent)[key];
      else                          return current_frame[key];
    }

    void print()
    {
      for (map<Token, Node>::iterator i = current_frame.begin(); i != current_frame.end(); ++i) {
        cerr << i->first.to_string() << ": " << i->second.to_string() << endl;
      }
      if (parent) {
        cerr << "---" << endl;
        parent->print();
      }
    }
  };
}