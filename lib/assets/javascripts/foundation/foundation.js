;(function ($, window, document, undefined) {
  'use strict';

  window.Foundation = {
    init : function (scope, libraries, method, options, response) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [];

      if (libraries && typeof libraries === 'string') {
        library_arr = libraries.split(' ');

        if (library_arr.length > 0) {
          for (var i = library_arr.length; i >= 0; i--) {
            responses.push(this.init_lib(library_arr[i], args));
          }
        }
      } else {
        for (var lib in Foundation.libs) {
          responses.push(this.init_lib(lib, args));
        }
      }

      return this.response_obj(responses, args);
    },

    response_obj : function (response_arr, args) {
      for (var callback in args) {
        if (typeof args[callback] === 'function') {
          return args[callback]({
            // only supported in IE9+
            error: response_arr.filter(function (s) {
              if (typeof s === 'string') return s;
            })
          });
        }
      }

      return response_arr;
    },

    init_lib : function(lib, args) {
      try {
        if (Foundation.libs.hasOwnProperty(lib)) {
          return Foundation.libs[lib].init.apply(Foundation.libs[lib], args);
        }
      } catch (e) {
        return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
      }
    },

    error : function(error) {
      return 'Foundation error: ' + error.name + ' ' + error.message + '; ' + error.more;
    },

    zj : (function () {
      try {
        return Zepto;
      } catch (e) {
        return jQuery
      }
    }())
  };

  $.fn.foundation = function () {
    var args = [this].concat(Array.prototype.slice.call(arguments, 0));

    return this.each(function () {
      Foundation.init.apply(Foundation, args);

      return this;
    });
  };

}(jQuery, this, this.document));