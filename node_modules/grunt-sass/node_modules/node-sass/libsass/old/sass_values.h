#define SASS_VALUES

enum Sass_Tag {
  SASS_BOOLEAN,
  SASS_NUMBER,
  SASS_PERCENTAGE,
  SASS_DIMENSION,
  SASS_COLOR,
  SASS_STRING,
  SASS_LIST,
  SASS_ERROR
};

enum Sass_Separator {
  SASS_COMMA,
  SASS_SPACE
};

union Sass_Value;

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
};

struct Sass_Percentage {
  enum Sass_Tag tag;
  double        value;
};

struct Sass_Dimension {
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

struct Sass_List {
  enum Sass_Tag       tag;
  enum Sass_Separator separator;
  size_t              length;
  union Sass_Value*   values;
};

struct Sass_Error {
  enum Sass_Tag tag;
  char*         message;
};

union Sass_Value {
  struct Sass_Unknown    unknown;
  struct Sass_Boolean    boolean;
  struct Sass_Number     number;
  struct Sass_Percentage percentage;
  struct Sass_Dimension  dimension;
  struct Sass_Color      color;
  struct Sass_String     string;
  struct Sass_List       list;
  struct Sass_Error      error;
};

// C++ linkage; internal use only (will need to move these, obviously)
union Sass_Value new_sass_c_boolean(int val);
union Sass_Value new_sass_c_number(double val);
union Sass_Value new_sass_c_percentage(double val);
union Sass_Value new_sass_c_dimension(double val, const char* unit);
union Sass_Value new_sass_c_color(double r, double g, double b, double a);
union Sass_Value new_sass_c_string(const char* val);
union Sass_Value new_sass_c_list(size_t len, enum Sass_Separator sep);
union Sass_Value new_sass_c_error(const char* msg);

// C linkage
#ifdef __cplusplus
extern "C" {
#endif
  union Sass_Value make_sass_boolean(int val);
  union Sass_Value make_sass_number(double val);
  union Sass_Value make_sass_percentage(double val);
  union Sass_Value make_sass_dimension(double val, const char* unit);
  union Sass_Value make_sass_color(double r, double g, double b, double a);
  union Sass_Value make_sass_string(const char* val);
  union Sass_Value make_sass_list(size_t len, enum Sass_Separator sep);
  union Sass_Value make_sass_error(const char* msg);
#ifdef __cplusplus
}
#endif

void free_sass_value(union Sass_Value);

typedef union Sass_Value(*C_Function)(union Sass_Value, void *cookie);

struct Sass_C_Function_Data {
  const char* signature;
  C_Function function;
  void *cookie;
};
