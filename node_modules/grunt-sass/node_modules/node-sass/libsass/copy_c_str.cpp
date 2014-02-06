#include <cstdlib>
#include <cstring>

namespace Sass {
	using namespace std;

	char* copy_c_str(const char* orig)
	{
		char* copy = (char*) malloc(sizeof(char) * strlen(orig) + 1);
		strcpy(copy, orig);
		return copy;
	}
}