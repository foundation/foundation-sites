{
  'targets': [
    {
      'target_name': 'binding',
      'sources': [
        'binding.cpp',
        'sass_context_wrapper.cpp',
        'libsass/ast.cpp',
        'libsass/bind.cpp',
        'libsass/constants.cpp',
        'libsass/context.cpp',
        'libsass/contextualize.cpp',
        'libsass/copy_c_str.cpp',
        'libsass/error_handling.cpp',
        'libsass/eval.cpp',
        'libsass/expand.cpp',
        'libsass/extend.cpp',
        'libsass/file.cpp',
        'libsass/functions.cpp',
        'libsass/inspect.cpp',
        'libsass/output_compressed.cpp',
        'libsass/output_nested.cpp',
        'libsass/parser.cpp',
        'libsass/prelexer.cpp',
        'libsass/sass.cpp',
        'libsass/sass_interface.cpp',
        'libsass/to_c.cpp',
        'libsass/to_string.cpp',
        'libsass/units.cpp'
      ],
      'cflags!'   : [ '-fno-exceptions' ],
      'cflags_cc!': [ '-fno-exceptions' ],
      'cflags_cc' : [ '-fexceptions', '-frtti' ],
      'conditions': [
        ['OS=="mac"', {
          'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES',
            'GCC_ENABLE_CPP_RTTI': 'YES',
            'MACOSX_DEPLOYMENT_TARGET': '10.7'
          }
         }]
      ]
    }
  ]
}
