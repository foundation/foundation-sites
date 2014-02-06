#include <iostream>
#include <string>
#include <map>
#include <algorithm>

#ifndef SASS_NODE
#include "node.hpp"
#endif

#include "node_factory.hpp"

int main()
{
  using namespace Sass;
  using namespace std;
  
  cout << sizeof(Node_Impl*) << endl;
  cout << sizeof(Node) << endl;
  cout << sizeof(Node_Impl) << endl << endl;
  
  Node_Factory new_Node = Node_Factory();
  
  Node interior(new_Node(Node::block, "", 0, 3));
  
  cout << interior.size() << endl;
  cout << interior.has_children() << endl;
  cout << interior.should_eval() << endl << endl;
  
  Node num(new_Node("", 0, 255, 123, 32));
  Node num2(new_Node("", 0, 255, 123, 32));
  Node num3(new_Node("", 0, 255, 122, 20, .75));
  
  cout << num.size() << endl;
  cout << num.has_children() << endl;
  cout << num.has_statements() << endl << endl;
  
  cout << num[1].is_numeric() << endl;
  cout << num[1].numeric_value() << endl << endl;
  
  cout << (num == num2) << endl;
  cout << (num == num3) << endl << endl;
  
  cout << (num3[2] < num2[2]) << endl;
  cout << (num2[3] < num3[3]) << endl << endl;
  
  cout << (num2[2] >= num3[2]) << endl;
  cout << (num2[3] != num3[3]) << endl << endl;

  Node num4(new_Node(num3));
  cout << num3[3].numeric_value() << endl;
  cout << num4[3].numeric_value() << endl;
  num4[3] = new_Node("", 0, 0.4567);
  cout << num3[3].numeric_value() << endl;
  cout << num4[3].numeric_value() << endl << endl;

  Node block1(new_Node(Node::block, "block", 1, 2));
  block1 << num2 << num4;

  Node block2(new_Node(block1));

  cout << (block1 == block2) << endl;
  cout << block1[1][3].numeric_value() << endl;
  cout << block2[1][3].numeric_value() << endl;
  block2[1][3] = new_Node("", 0, .9876);
  cout << block1[1][3].numeric_value() << endl;
  cout << block2[1][3].numeric_value() << endl << endl;

  map<Node, string> dict;

  Node n(new_Node("", 0, 42));
  Node m(new_Node("", 0, 41));

  dict[n] = "hello";
  dict[m] = "goodbye";

  cout << dict[m] << " " << dict[n] << endl;

  cout << "Lexicographical comparison: " << endl;
  cout << lexicographical_compare(num2.begin(), num2.end(),
                                  num3.begin(), num3.end())
       << endl;
  cout << lexicographical_compare(num.begin(), num.end(),
                                  num2.begin(), num2.end())
       << endl;
  cout << lexicographical_compare(num3.begin(), num3.end(),
                                  num.begin(), num.end())
       << endl << endl;




  new_Node.free();
  return 0;
}