#define SASS_MEMORY_MANAGER

#include <vector>
#include <iostream>
using namespace std;

namespace Sass {
	/////////////////////////////////////////////////////////////////////////////
	// A class for tracking allocations of AST_Node objects. The intended usage
	// is something like: Some_Node* n = new (mem_mgr) Some_Node(...);
	// Then, at the end of the program, the memory manager will delete all of the
	// allocated nodes that have been passed to it.
	// In the future, this class may implement a custom allocator.
	/////////////////////////////////////////////////////////////////////////////
	template <typename T>
	class Memory_Manager {
		vector<T*> nodes;

	public:
		Memory_Manager(size_t size = 0) : nodes(vector<T*>())
		{ nodes.reserve(size); }

		~Memory_Manager()
		{
			for (size_t i = 0, S = nodes.size(); i < S; ++i) {
				// cout << "deleting " << typeid(*nodes[i]).name() << endl;
				delete nodes[i];
			}
		}

		T* operator()(T* np)
		{
			nodes.push_back(np);
			// cout << "registering " << typeid(*np).name() << endl;
			return np;
		}
	};
}

template <typename T>
inline void* operator new(size_t size, Sass::Memory_Manager<T>& mem_mgr)
{ return mem_mgr(static_cast<T*>(operator new(size))); }