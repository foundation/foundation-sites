#include <iostream>
#include <fstream>
#include "file.hpp"
#include "context.hpp"

namespace Sass {
	namespace File {
		using namespace std;

		string base_name(string path)
		{
			size_t pos = path.find_last_of('/');
			if (pos == string::npos) return path;
			else                     return path.substr(pos+1);
		}

		string dir_name(string path)
		{
			size_t pos = path.find_last_of('/');
			if (pos == string::npos) return "";
			else                     return path.substr(0, pos+1);
		}

		string join_paths(string l, string r)
		{
			if (l.empty()) return r;
			if (r.empty()) return l;
			if (r[0] == '/') return r;

			if (l[l.length()-1] != '/') l += '/';
			return l + r;
		}

		char* resolve_and_load(string path)
		{
	    // Resolution order for ambiguous imports:
	    // (1) filename as given
	    // (2) underscore + given
	    // (3) underscore + given + extension
	    // (4) given + extension
			char* contents = 0;
			// if the file isn't found with the given filename ...
			if (!(contents = read_file(path))) {
				string dir(dir_name(path));
				string base(base_name(path));
				string _base("_" + base);
				// if the file isn't found with '_' + filename ...
				if (!(contents = read_file(dir + _base))) {
					string _base_scss(_base + ".scss");
					// if the file isn't found with '_' + filename + ".scss" ...
					if (!(contents = read_file(dir + _base_scss))) {
						string base_scss(base + ".scss");
						// try filename + ".scss" as the last resort
						contents = read_file(dir + base_scss);
					}
				}
			}
			return contents;
		}

		char* read_file(string path)
		{
			ifstream file(path.c_str(), ios::in | ios::binary | ios::ate);
			char* contents = 0;
			if (file.is_open()) {
				size_t size = file.tellg();
				contents = new char[size + 1]; // extra byte for the null char
				file.seekg(0, ios::beg);
				file.read(contents, size);
				contents[size] = '\0';
				file.close();
			}
			return contents;
		}

	}
}