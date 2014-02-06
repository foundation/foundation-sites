#define SASS_INTERFACE

#ifdef __cplusplus
extern "C" {
#endif

#define SASS_STYLE_NESTED     0
#define SASS_STYLE_EXPANDED   1
#define SASS_STYLE_COMPACT    2
#define SASS_STYLE_COMPRESSED 3

#define SASS_SOURCE_COMMENTS_NONE 0
#define SASS_SOURCE_COMMENTS_DEFAULT 1
#define SASS_SOURCE_COMMENTS_MAP 2

struct sass_options {
  int output_style;
  int source_comments; // really want a bool, but C doesn't have them
  char* include_paths;
  char* image_path;
};

struct sass_context {
  const char* source_string;
  char* output_string;
  struct sass_options options;
  int error_status;
  char* error_message;
  struct Sass_C_Function_Data* c_functions;
};

struct sass_file_context {
  char* input_path;
  char* output_string;
  struct sass_options options;
  int error_status;
  char* error_message;
  struct Sass_C_Function_Data* c_functions;
};

struct sass_folder_context {
  char* search_path;
  char* output_path;
  struct sass_options options;
  int error_status;
  char* error_message;
  struct Sass_C_Function_Data* c_functions;
};

struct sass_context*        sass_new_context        (void);
struct sass_file_context*   sass_new_file_context   (void);
struct sass_folder_context* sass_new_folder_context (void);

void sass_free_context        (struct sass_context* ctx);
void sass_free_file_context   (struct sass_file_context* ctx);
void sass_free_folder_context (struct sass_folder_context* ctx);

int sass_compile            (struct sass_context* ctx);
int sass_compile_file       (struct sass_file_context* ctx);
int sass_compile_folder     (struct sass_folder_context* ctx);

#ifdef __cplusplus
}
#endif
