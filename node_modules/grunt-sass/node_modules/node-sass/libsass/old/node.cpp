#include <sstream>
#include <algorithm>
#include <iostream>
#include <cstring>
#include "node.hpp"
#include "constants.hpp"
#include "error.hpp"
#include "sass_values.h"

#ifdef _WIN32
#include <stdlib.h>
#define realpath(N,R) _fullpath((R),(N),_MAX_PATH)
#endif

namespace Sass {
  using namespace std;
  using namespace Constants;
  using std::strlen;
  using std::strcpy;

  // ------------------------------------------------------------------------
  // Node method implementations
  // ------------------------------------------------------------------------

  void Node::flatten()
  {
    switch (type())
    {
      case block:
      case mixin_call:
      case mixin_content:
      case root:
      case if_directive:
      case for_through_directive:
      case for_to_directive:
      case each_directive:
      case while_directive:
        break;

      default:
        return;
    }
    // size can change during flattening, so we need to call size() on each pass
    for (size_t i = 0; i < size(); ++i) {
      switch (at(i).type())
      {
        case mixin_call:
        case mixin_content:
        case block:
        case if_directive:
        case for_through_directive:
        case for_to_directive:
        case each_directive:
        case while_directive: {
          Node expn(at(i));
          if (expn.has_expansions()) expn.flatten();
          ip_->has_statements |= expn.has_statements();
          ip_->has_comments   |= expn.has_comments();
          ip_->has_blocks     |= expn.has_blocks();
          ip_->has_expansions |= expn.has_expansions();
          // TO DO: make this more efficient -- replace with a dummy node instead of erasing
          ip_->children.erase(begin() + i);
          insert(begin() + i, expn.begin(), expn.end());
          // skip over what we just spliced in
          i += expn.size() - 1;
        } break;

        default: {
        } break;
      }
    }
  }

  string Node::unquote() const
  {
    switch (type())
    {
      case string_constant:
      case identifier: {
        return token().unquote();
      } break;

      default: {
        // do nothing; fall though to the rest
      } break;
    }

    string intermediate(to_string());
    if (!intermediate.empty() && (intermediate[0] == '"' || intermediate[0] == '\'')) {
      return intermediate.substr(1, intermediate.length() - 2);
    }
    else {
      return intermediate;
    }
  }

  string Node::debug_info_path() const
  {
    char* c_abs_path = realpath( path().c_str(), NULL);
    string abs_path(c_abs_path);
    delete c_abs_path;
    return abs_path;
  }

  bool Node::operator==(Node rhs) const
  {
    Type t = type(), u = rhs.type();

    // if ((t == identifier || t == string_constant || t == string_schema || t == concatenation) &&
    //     (u == identifier || u == string_constant || u == string_schema || u == concatenation)) {
    //   return unquote() == rhs.unquote();
    // }
    if (is_string() && rhs.is_string()) {
      return unquote() == rhs.unquote();
    }
    else if (t != u) {
      return false;
    }

    switch (t)
    {
      case list:
      case expression:
      case term:
      case numeric_color: {
        if (size() != rhs.size()) return false;
        if ((t == list) && (is_comma_separated() != rhs.is_comma_separated())) return false;
        for (size_t i = 0, L = size(); i < L; ++i) {
          if (at(i) == rhs[i]) continue;
          else return false;
        }
        return true;
      } break;

      case variable:
      case identifier:
      case uri:
      case textual_percentage:
      case textual_dimension:
      case textual_number:
      case textual_hex:
      case string_constant: {
        return token().unquote() == rhs.token().unquote();
      } break;

      case number:
      case numeric_percentage: {
        return numeric_value() == rhs.numeric_value();
      } break;

      case numeric_dimension: {
        if (unit() == rhs.unit()) {
          return numeric_value() == rhs.numeric_value();
        }
        else {
          return false;
        }
      } break;

      case boolean: {
        return boolean_value() == rhs.boolean_value();
      } break;

      case selector: {
        if (has_children() && rhs.has_children() && (size() == rhs.size())) {
          for (size_t i = 0, S = size(); i < S; ++i) {
            if (at(i) == rhs[i]) continue;
            else                 return false;
          }
          return true;
        }
        else {
          return false;
        }
      } break;

      case simple_selector: {
        if (token() == rhs.token()) return true;
      } break;

      default: {
        return false;
      } break;
    }
    return false;
  }

  bool Node::operator!=(Node rhs) const
  { return !(*this == rhs); }

  bool Node::operator<(Node rhs) const
  {
    Type lhs_type = type();
    Type rhs_type = rhs.type();

    // comparing atomic numbers
    if ((lhs_type == number             && rhs_type == number) ||
        (lhs_type == numeric_percentage && rhs_type == numeric_percentage)) {
      return numeric_value() < rhs.numeric_value();
    }

    // comparing numbers with units
    else if (lhs_type == numeric_dimension && rhs_type == numeric_dimension) {
      if (unit() == rhs.unit()) {
        return numeric_value() < rhs.numeric_value();
      }
      else {
        throw Error(Error::evaluation, path(), line(), "incompatible units");
      }
    }

    // comparing colors
    else if (lhs_type == numeric_color && rhs_type == numeric_color) {
      return lexicographical_compare(begin(), end(), rhs.begin(), rhs.end());
    }

    // comparing identifiers and strings (treat them as comparable)
    else if ((is_string() && rhs.is_string()) ||
             (lhs_type == value && rhs_type == value)) {
      return unquote() < rhs.unquote();
    }

    // else if ((lhs_type == identifier || lhs_type == string_constant || lhs_type == value) &&
    //          (rhs_type == identifier || lhs_type == string_constant || rhs_type == value)) {
    //   return token().unquote() < rhs.token().unquote();
    // }

    // COMPARING SELECTORS -- IMPORTANT FOR ORDERING AND NORMALIZING
    else if ((type()     >= selector_group && type()     <=selector_schema) &&
             (rhs.type() >= selector_group && rhs.type() <=selector_schema)) {

      // if they're not the same kind, just compare type tags
      if (type() != rhs.type()) return type() < rhs.type();

      // otherwise we have to do more work
      switch (type())
      {
        case simple_selector:
        case pseudo: {
          return token() < rhs.token();
        } break;

        // assumes selectors are normalized by the time they're compared
        case selector:
        case simple_selector_sequence:
        case attribute_selector:
        case functional_pseudo:
        case pseudo_negation: {
          return lexicographical_compare(begin(), end(), rhs.begin(), rhs.end());
        } break;

        default: {
          return false;
        } break;

      }
    }
    // END OF SELECTOR COMPARISON

    // catch-all
    else {
      throw Error(Error::evaluation, path(), line(), "incomparable types");
    }
  }

  bool Node::operator<=(Node rhs) const
  { return *this < rhs || *this == rhs; }

  bool Node::operator>(Node rhs) const
  { return !(*this <= rhs); }

  bool Node::operator>=(Node rhs) const
  { return !(*this < rhs); }


  // Converting nodes to C-structs, for C callbacks. Allocates memory with
  // malloc in the case of strings and lists. (Strings don't strictly need to
  // be malloc'ed at this point, but it's better to do it for consistency,
  // because clients of the C-structs will need to malloc their own strings too.
  Sass_Value Node::to_c_val()
  {
    Sass_Value v;
    switch (type())
    {
      case boolean: {
        v.boolean.tag = SASS_BOOLEAN;
        v.boolean.value = boolean_value();
      } break;
      case number: {
        v.number.tag = SASS_NUMBER;
        v.number.value = numeric_value();
      } break;
      case numeric_percentage: {
        v.percentage.tag = SASS_PERCENTAGE;
        v.percentage.value = numeric_value();
      } break;
      case numeric_dimension: {
        v.dimension.tag = SASS_DIMENSION;
        v.dimension.value = numeric_value();
        v.dimension.unit = strdup(string(unit().begin, unit().end - unit().begin).c_str());
      } break;
      case numeric_color: {
        v.color.tag = SASS_COLOR;
        v.color.r = at(0).numeric_value();
        v.color.g = at(1).numeric_value();
        v.color.b = at(2).numeric_value();
        v.color.a = at(3).numeric_value();
      } break;
      case list: {
        v.list.tag = SASS_LIST;
        v.list.separator = is_comma_separated() ? SASS_COMMA : SASS_SPACE;
        size_t S = size();
        v.list.length = S;
        v.list.values = (Sass_Value*) malloc(sizeof(Sass_Value)*S);
        Sass_Value* values = v.list.values;
        for (size_t i = 0; i < S; ++i) {
          values[i] = at(i).to_c_val();
        }
      } break;
      default: { // should only be string-like things at this point
        v.string.tag = SASS_STRING;
        v.string.value = strdup(to_string().c_str());
      } break;
    }
    return v;
  }

  // ------------------------------------------------------------------------
  // Token method implementations
  // ------------------------------------------------------------------------

  string Token::unquote() const
  {
    string result;
    const char* p = begin;
    if (*begin == '\'' || *begin == '"') {
      ++p;
      while (p < end) {
        if (*p == '\\') {
          switch (*(++p)) {
            case 'n':  result += '\n'; break;
            case 't':  result += '\t'; break;
            case 'b':  result += '\b'; break;
            case 'r':  result += '\r'; break;
            case 'f':  result += '\f'; break;
            case 'v':  result += '\v'; break;
            case 'a':  result += '\a'; break;
            case '\\': result += '\\'; break;
            default: result += *p; break;
          }
        }
        else if (p == end - 1) {
          return result;
        }
        else {
          result += *p;
        }
        ++p;
      }
      return result;
    }
    else {
      while (p < end) {
        result += *(p++);
      }
      return result;
    }
  }

  void Token::unquote_to_stream(std::stringstream& buf) const
  {
    const char* p = begin;
    if (*begin == '\'' || *begin == '"') {
      ++p;
      while (p < end) {
        if (*p == '\\') {
          switch (*(++p)) {
            case 'n':  buf << '\n'; break;
            case 't':  buf << '\t'; break;
            case 'b':  buf << '\b'; break;
            case 'r':  buf << '\r'; break;
            case 'f':  buf << '\f'; break;
            case 'v':  buf << '\v'; break;
            case 'a':  buf << '\a'; break;
            case '\\': buf << '\\'; break;
            default: buf << *p; break;
          }
        }
        else if (p == end - 1) {
          return;
        }
        else {
          buf << *p;
        }
        ++p;
      }
      return;
    }
    else {
      while (p < end) {
        buf << *(p++);
      }
      return;
    }
  }

  bool Token::operator<(const Token& rhs) const
  {
    const char* first1 = begin;
    const char* last1  = end;
    const char* first2 = rhs.begin;
    const char* last2  = rhs.end;
    while (first1!=last1)
    {
      if (first2 == last2 || *first2 < *first1) return false;
      else if (*first1 < *first2) return true;
      ++first1; ++first2;
    }
    return (first2 != last2);
  }

  bool Token::operator==(const Token& rhs) const
  {
    if (length() != rhs.length()) return false;

    if ((begin[0]     == '"' || begin[0]     == '\'') &&
        (rhs.begin[0] == '"' || rhs.begin[0] == '\''))
    { return unquote() == rhs.unquote(); }

    const char* p = begin;
    const char* q = rhs.begin;
    for (; p < end; ++p, ++q) if (*p != *q) return false;
    return true;
  }


  // ------------------------------------------------------------------------
  // Node_Impl method implementations
  // ------------------------------------------------------------------------

  double Node_Impl::numeric_value()
  {
    switch (type)
    {
      case Node::number:
      case Node::numeric_percentage:
        return value.numeric;
      case Node::numeric_dimension:
        return value.dimension.numeric;
      default:
        break;
        // throw an exception?
    }
    // if you reach this point, you've got a logic error somewhere
    return 0;
  }

  Token Node_Impl::unit()
  {
    switch (type)
    {
      case Node::numeric_percentage: {
        return Token::make(percent_str);
      } break;

      case Node::numeric_dimension: {
        return value.dimension.unit;
      } break;

      default: break;
    }
    return Token::make(empty_str);
  }

}