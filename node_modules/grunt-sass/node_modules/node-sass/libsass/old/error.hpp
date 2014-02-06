#define SASS_ERRORS

namespace Sass {

  struct Error {
    enum Type { read, write, syntax, evaluation };

    Type type;
    string path;
    size_t line;
    string message;

    Error(Type type, string path, size_t line, string message)
    : type(type), path(path), line(line), message(message)
    { }

  };

}