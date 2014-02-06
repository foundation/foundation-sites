#include <string>

namespace Sass {
	using namespace std;
	class Context;
	namespace File {
		string base_name(string);
		string dir_name(string);
		string join_paths(string, string);
		char* resolve_and_load(string path);
		char* read_file(string path);
	}
}