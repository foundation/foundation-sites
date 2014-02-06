ACLOCAL_AMFLAGS = -I m4

lib_LTLIBRARIES = libsass.la
libsass_la_SOURCES = ast.cpp bind.cpp constants.cpp context.cpp contextualize.cpp \
  copy_c_str.cpp error_handling.cpp eval.cpp expand.cpp extend.cpp file.cpp \
  functions.cpp inspect.cpp output_compressed.cpp output_nested.cpp \
  parser.cpp prelexer.cpp sass.cpp sass_interface.cpp to_c.cpp to_string.cpp \
  units.cpp
libsass_la_LDFLAGS = -no-undefined -version-info 0:0:0

include_HEADERS = sass_interface.h sass.h

bin_PROGRAMS = sassc++

sassc___SOURCES = sassc++.cpp
sassc___LDADD = libsass.la

