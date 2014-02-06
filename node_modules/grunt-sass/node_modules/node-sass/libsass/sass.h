#define SASS

#include <stddef.h>

#ifdef __cplusplus
extern "C" {
#endif

#define SASS_OUTPUT_NESTED     0
#define SASS_OUTPUT_EXPANDED   1
#define SASS_OUTPUT_COMPACT    2
#define SASS_OUTPUT_COMPRESSED 3
#define SASS_OUTPUT_FORMATTED  4

struct Sass_Context {
  const char*  input_path;
  const char*  input_string;
  char*        output_string;

  int          error_status;
  char*        error_message;

  int          output_style;
  int          source_comments;
  int          source_maps;
  const char*  image_path;
  const char*  include_paths_string;
  const char** include_paths_array;
};

struct Sass_Context* make_sass_context   ();
void                 free_sass_context   (struct Sass_Context*);
void                 compile_sass_file   (struct Sass_Context*);
void                 compile_sass_string (struct Sass_Context*);

// type tags for Sass values
enum Sass_Tag {
  SASS_BOOLEAN,
  SASS_NUMBER,
  SASS_COLOR,
  SASS_STRING,
  SASS_LIST,
  SASS_NULL,
  SASS_ERROR
};

// tags for denoting Sass list separators
enum Sass_Separator {
  SASS_COMMA,
  SASS_SPACE
};

// Component structs for the Sass value union type.
// Not meant to be used directly.
struct Sass_Unknown {
  enum Sass_Tag tag;
};

struct Sass_Boolean {
  enum Sass_Tag tag;
  int           value;
};

struct Sass_Number {
  enum Sass_Tag tag;
  double        value;
  char*         unit;
};

struct Sass_Color {
  enum Sass_Tag tag;
  double        r;
  double        g;
  double        b;
  double        a;
};

struct Sass_String {
  enum Sass_Tag tag;
  char*         value;
};

union Sass_Value;

struct Sass_List {
  enum Sass_Tag       tag;
  enum Sass_Separator separator;
  size_t              length;
  union Sass_Value*   values;
};

struct Sass_Null {
  enum Sass_Tag tag;
};

struct Sass_Error {
  enum Sass_Tag tag;
  char*         message;
};

// represention of Sass values in C
union Sass_Value {
  struct Sass_Unknown unknown;
  struct Sass_Boolean boolean;
  struct Sass_Number  number;
  struct Sass_Color   color;
  struct Sass_String  string;
  struct Sass_List    list;
  struct Sass_Null    null;
  struct Sass_Error   error;
};

union Sass_Value make_sass_boolean (int val);
union Sass_Value make_sass_number  (double val, const char* unit);
union Sass_Value make_sass_color   (double r, double g, double b, double a);
union Sass_Value make_sass_string  (const char* val);
union Sass_Value make_sass_list    (size_t len, enum Sass_Separator sep);
union Sass_Value make_sass_null    ();
union Sass_Value make_sass_error   (const char* msg);

typedef union Sass_Value(*Sass_C_Function)(union Sass_Value);

struct Sass_C_Function_Descriptor {
  const char*     signature;
  Sass_C_Function function;
};

#ifdef __cplusplus
}
#endif
