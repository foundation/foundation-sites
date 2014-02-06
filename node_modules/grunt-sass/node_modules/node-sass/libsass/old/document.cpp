#ifdef _WIN32
#define S_ISDIR(mode) (((mode) & S_IFMT) == S_IFDIR)
#endif

#include <cstdio>
#include <cstring>
#include "document.hpp"
#include "eval_apply.hpp"
#include "error.hpp"
#include <iostream>
#include <sstream>
#include <sys/stat.h>

namespace Sass {

  Document::Document(Context& ctx) : context(ctx)
  { ++context.ref_count; }

  Document::Document(const Document& doc)
  : path(doc.path),
    source(doc.source),
    position(doc.position),
    end(doc.end),
    line(doc.line),
    own_source(doc.own_source),
    context(doc.context),
    root(doc.root),
    lexed(doc.lexed)
  { ++doc.context.ref_count; }

  Document::~Document()
  { --context.ref_count; }

  Document Document::make_from_file(Context& ctx, string path)
  {
    std::FILE *f;
    const char* path_str = path.c_str();
    struct stat st;
    string tmp;

    // Resolution order for ambiguous imports:
    // (1) filename as given
    // (2) underscore + given
    // (3) underscore + given + extension
    // (4) given + extension

    // if the file as given isn't found ...
    if (stat(path_str, &st) == -1 || S_ISDIR(st.st_mode)) {
      // then try "_" + given
      const char *full_path_str = path.c_str();
      const char *file_name_str = Prelexer::folders(full_path_str);
      string folder(Token::make(full_path_str, file_name_str).to_string());
      string partial_filename("_" + string(file_name_str));
      tmp = folder + partial_filename;
      path_str = tmp.c_str();
      // if "_" + given isn't found ...
      if (stat(path_str, &st) == -1 || S_ISDIR(st.st_mode)) {
        // then try "_" + given + ".scss"
        tmp += ".scss";
        path_str = tmp.c_str();
        // if "_" + given + ".scss" isn't found ...
        if (stat(path_str, &st) == -1 || S_ISDIR(st.st_mode)) {
          // then try given + ".scss"
          string non_partial_filename(string(file_name_str) + ".scss");
          tmp = folder + non_partial_filename;
          path_str = tmp.c_str();
          // if we still can't find the file, then throw an error
          if (stat(path_str, &st) == -1 || S_ISDIR(st.st_mode)) {
            throw path;
          }
        }
      }
    }
    f = std::fopen(path_str, "rb");
    size_t len = st.st_size;
    char* source = new char[len + 1];
    size_t bytes_read = std::fread(source, sizeof(char), len, f);
    if (bytes_read != len) {
      std::cerr << "Warning: possible error reading from " << path << std::endl;
    }
    if (std::ferror(f)) throw path;
    source[len] = '\0';
    char* end = source + len;
    if (std::fclose(f)) throw path;
    const char *file_name_str = Prelexer::folders(path_str);
    string include_path(path_str, file_name_str - path_str);

    Document doc(ctx);
    doc.path        = path_str;
    doc.line        = 1;
    doc.root        = ctx.new_Node(Node::root, path, 1, 0);
    doc.lexed       = Token::make();
    doc.own_source  = true;
    doc.source      = source;
    doc.end         = end;
    doc.position    = source;
    doc.context.source_refs.push_back(source);

    return doc;
  }

  Document Document::make_from_source_chars(Context& ctx, const char* src, string path, bool own_source)
  {
    Document doc(ctx);
    doc.path = path;
    doc.line = 1;
    doc.root = ctx.new_Node(Node::root, path, 1, 0);
    doc.lexed = Token::make();
    doc.own_source = own_source;
    doc.source = src;
    doc.end = src + std::strlen(src);
    doc.position = src;
    if (own_source) doc.context.source_refs.push_back(src);

    return doc;
  }

  Document Document::make_from_token(Context& ctx, Token t, string path, size_t line_number)
  {
    Document doc(ctx);
    doc.path = path;
    doc.line = line_number;
    doc.root = ctx.new_Node(Node::root, path, 1, 0);
    doc.lexed = Token::make();
    doc.own_source = false;
    doc.source = t.begin;
    doc.end = t.end;
    doc.position = doc.source;

    return doc;
  }
  
  void Document::throw_syntax_error(string message, size_t ln)
  { throw Error(Error::syntax, path, ln ? ln : line, message); }
  
  void Document::throw_read_error(string message, size_t ln)
  { throw Error(Error::read, path, ln ? ln : line, message); }
  
  using std::string;
  using std::stringstream;
  using std::endl;
  
  string Document::emit_css(CSS_Style style) {
    stringstream output;
    switch (style) {
    case echo:
      root.echo(output);
      break;
    case nested:
      root.emit_nested_css(output, 0, true, false, context.source_comments);
      break;
    case expanded:
      root.emit_expanded_css(output, "");
      break;
    case compressed:
      root.emit_compressed_css(output);
      break;
    default:
      break;
    }
    string retval(output.str());
    // trim trailing whitespace
    if (!retval.empty()) {
      size_t newlines = 0;
      size_t i = retval.length();
      while (i--) {
        if (retval[i] == '\n') {
          ++newlines;
          continue;
        }
        else {
          break;
        }
      }
      retval.resize(retval.length() - newlines);
      retval += "\n";
    }
    return retval;
  }
}
