#include "error_handling.hpp"
#include "backtrace.hpp"
#include "prelexer.hpp"

namespace Sass {

  Error::Error(Type type, string path, size_t line, string message)
  : type(type), path(path), line(line), message(message)
  { }

  void error(string msg, string path, size_t line)
  { throw Error(Error::syntax, path, line, msg); }

  void error(string msg, string path, size_t line, Backtrace* bt)
  {
    if (!path.empty() && Prelexer::string_constant(path.c_str()))
      path = path.substr(1, path.size() - 1);

    Backtrace top(bt, path, line, "");
    msg += top.to_string();

    throw Error(Error::syntax, path, line, msg);
  }

}