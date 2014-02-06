#define SASS_BACKTRACE

#include <sstream>

namespace Sass {

  using namespace std;

  struct Backtrace {

    Backtrace* parent;
    string     path;
    size_t     line;
    string     caller;

    Backtrace(Backtrace* prn, string pth, size_t ln, string c)
    : parent(prn),
      path(pth),
      line(ln),
      caller(c)
    { }

    string to_string(bool warning = false)
    {
      stringstream ss;
      Backtrace* this_point = this;

      if (!warning) ss << endl << "Backtrace:";
      // the first tracepoint (which is parent-less) is an empty placeholder
      while (this_point->parent) {
        ss << endl
           << "\t"
           << (warning ? " " : "")
           << this_point->path
           << ":"
           << this_point->line
           << this_point->parent->caller;
        this_point = this_point->parent;
      }

      return ss.str();
    }

    size_t depth()
    {
      size_t d = 0;
      Backtrace* p = parent;
      while (p) {
        ++d;
        p = p->parent;
      }
      return d-1;
    }

  };

}