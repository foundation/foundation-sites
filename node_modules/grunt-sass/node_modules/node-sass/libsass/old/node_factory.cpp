#include "node_factory.hpp"

namespace Sass {
  
  Node_Impl* Node_Factory::alloc_Node_Impl(Node::Type type, string path, size_t line)
  {
    Node_Impl* ip = new Node_Impl();
    ip->type = type;
    if (type == Node::backref) ip->has_backref = true;
    ip->path = path;
    ip->line = line;
    pool_.push_back(ip);
    return ip;
  }

  // returns a deep-copy of its argument
  Node_Impl* Node_Factory::alloc_Node_Impl(Node_Impl* ip)
  {
    Node_Impl* ip_cpy = new Node_Impl(*ip);
    pool_.push_back(ip_cpy);
    if (ip_cpy->has_children) {
      for (size_t i = 0, S = ip_cpy->size(); i < S; ++i) {
        Node n(ip_cpy->at(i));
        ip_cpy->at(i) = (*this)(n);
      }
    }
    return ip_cpy;
  }

  // returns a deep-copy of its argument, but uses the path and line that are passed in
  Node_Impl* Node_Factory::alloc_Node_Impl(string& path, size_t line, Node_Impl* ip)
  {
    Node_Impl* ip_cpy = new Node_Impl(*ip);
    pool_.push_back(ip_cpy);
    if (ip_cpy->has_children) {
      for (size_t i = 0, S = ip_cpy->size(); i < S; ++i) {
        Node n(ip_cpy->at(i));
        ip_cpy->at(i) = (*this)(path, line, n);
      }
    }
    return ip_cpy;
  }


  // for cloning nodes
  Node Node_Factory::operator()(const Node& n1)
  {
    Node_Impl* ip_cpy = alloc_Node_Impl(n1.ip_); // deep-copy the implementation object
    return Node(ip_cpy);
  }

  // for cloning nodes and resetting their path and line-number fields
  Node Node_Factory::operator()(string& path, size_t line, const Node& n1)
  {
    Node_Impl* ip_cpy = alloc_Node_Impl(path, line, n1.ip_); // deep-copy the implementation object
    ip_cpy->path = path;
    ip_cpy->line = line;
    return Node(ip_cpy);
  }

  // for making leaf nodes out of terminals/tokens
  Node Node_Factory::operator()(Node::Type type, string path, size_t line, Token t)
  {
    Node_Impl* ip = alloc_Node_Impl(type, path, line);
    ip->value.token = t;
    return Node(ip);
  }

  // for making boolean values or interior nodes that have children
  Node Node_Factory::operator()(Node::Type type, string path, size_t line, size_t size)
  {
    Node_Impl* ip = alloc_Node_Impl(type, path, line);

    if (type == Node::boolean) ip->value.boolean = size;
    else                       ip->children.reserve(size);

    return Node(ip);
  }

  // for making nodes representing numbers
  Node Node_Factory::operator()(string path, size_t line, double v, Node::Type type)
  {
    Node_Impl* ip = alloc_Node_Impl(type, path, line);
    ip->value.numeric = v;
    return Node(ip);
  }

  // for making nodes representing numeric dimensions (e.g. 5px, 3em)
  Node Node_Factory::operator()(string path, size_t line, double v, const Token& t)
  {
    Node_Impl* ip = alloc_Node_Impl(Node::numeric_dimension, path, line);
    ip->value.dimension.numeric = v;
    ip->value.dimension.unit = t;
    return Node(ip);
  }
  
  // for making nodes representing rgba color quads
  Node Node_Factory::operator()(string path, size_t line, double r, double g, double b, double a)
  {
    Node color((*this)(Node::numeric_color, path, line, 4));
    color << (*this)(path, line, r)
          << (*this)(path, line, g)
          << (*this)(path, line, b)
          << (*this)(path, line, a);
    return color;
  }

  void Node_Factory::free()
  { for (size_t i = 0, S = pool_.size(); i < S; ++i) delete pool_[i]; }

}