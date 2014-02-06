#define SASS_TOKEN

#include <cstring>
#include <string>
#include <sstream>

namespace Sass {
	using namespace std;

  // Token type for representing lexed chunks of text
  struct Token {

    const char* begin;
    const char* end;

    Token()                             : begin(0), end(0)             { }
    Token(const char* s)                : begin(s), end(s + strlen(s)) { }
    Token(const char* b, const char* e) : begin(b), end(e)             { }

    size_t length()    const { return end - begin; }
    string to_string() const { return string(begin, end - begin); }

    string unquote() const;
    void   unquote_to_stream(stringstream& buf) const;

    operator bool()   { return begin && end && begin >= end; }
    operator string() { return to_string(); }

    bool operator==(Token t)  { return to_string() == t.to_string(); }
  };

}