;(function ($, window, document, undefined) {
  'use strict';

  var Foundation = {
    init : function (libraries, methods, options, response) {
      var library_arr;

      if (libraries && typeof libraries === 'string') {
        
        library_arr = libraries.split(' ');

        if (library_arr.length > 1) {
          for (var i = library_arr.length; i >= 0; i--) {
            var method = library_arr[i];

            if (Foundation.hasOwnProperty(method)) {
              Foundation[library_arr[i]].apply(null, [methods, options, response]);
            } else {
              // throw error
            }
          }
        } else {
          if (Foundation.hasOwnProperty(libraries)) {
            return Foundation[libraries].apply(null, [methods, options, response]);
          } else {
            // throw error
          }
        }

      } else {
        return Foundation.init.all.apply(null, arguments);
      }
    }
  };

  Foundation.init.all = function () {
    for (var method in Foundation) {
      if (typeof Foundation[method] == "function" && Foundation.hasOwnProperty(method)) {
        Foundation[method].apply(null, arguments);
      } else {
        // throw error
      }
    }
  };

  $.foundation = function () {
    return Foundation.init.apply(null, arguments);
  };

}(jQuery, this, this.document));