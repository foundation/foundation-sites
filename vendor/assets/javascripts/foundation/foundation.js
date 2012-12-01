;(function ($, window, document, undefined) {
  'use strict';

  window.Foundation = {
    init : function (libraries, methods, options, response) {
      var library_arr,
          args = [methods, options, response],
          responses = [];

      if (libraries && typeof libraries === 'string') {
        library_arr = libraries.split(' ');

        if (library_arr.length > 0) {
          for (var i = library_arr.length; i >= 0; i--) {
            responses.push(this.init_lib(library_arr[i], args));
          }
        }
      } else {
        for (var i = Foundation.libs.length; i >= 0; i--) {
          responses.push(this.init_lib(Foundation.libs[i], args));
        }
      }

      return this.response_obj(responses, args);

    },

    response_obj : function (response_arr, args) {
      for (var arg in args) {
        if (typeof arg === 'function') {
          // i'm just jamming all the responses into a concatenated string for 
          // now and passing off to the callback
          return arg(response_arr.join(' '));
        }
      }

      return response_arr.join(' ');
    },

    init_lib : function(lib, args) {
      if (Foundation.libs.hasOwnProperty(lib)) {
        return Foundation.libs[lib].init.apply(Foundation.libs[lib], args);
      }
    }
  };

  $.foundation = function () {
    return Foundation.init.apply(Foundation, arguments);
  };

}(jQuery, this, this.document));