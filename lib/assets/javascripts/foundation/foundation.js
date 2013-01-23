;(function (window, document, undefined) {
  'use strict';

  window.Foundation = {
    name : 'Foundation',

    cache : {},

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
        for (var lib in this.libs) {
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

    init_lib : function (lib, args) {
      try {
        if (this.libs.hasOwnProperty(lib)) {
          return this.libs[lib].init.apply(this.libs[lib], args);
        }
      } catch (e) {
        return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
      }
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' ');

      for (var i = methods_arr.length; i >= 0; i--) {
        if (this.hasOwnProperty(methods_arr[i])) {
          Foundation.libs[scope.name][methods_arr[i]] = this[methods_arr[i]];
        }
      }
    },

    // cache management

    set_data : function (node, data) {
      var id = this.name + (+new Date());

      Foundation.cache[id] = data;
      node.attr('data-' + this.name + '-id', id);
    },

    get_data : function (node) {
      return Foundation.cache[node.attr('data-' + this.name + '-id')];
    },

    remove_data : function (node) {
      if (node) {
        delete Foundation.cache[node.attr('data-' + this.name + '-id')];
        node.attr('data-' + this.name + '-id', '');
      } else {
        $('[data-' + this.name + '-id]').each(function () {
          delete Foundation.cache[$(this).attr('data-' + this.name + '-id')];
          $(this).attr('data-' + this.name + '-id', '');
        });
      }
    },

    error : function (error) {
      return 'Foundation error: ' + error.name + ' ' + error.message + '; ' + error.more;
    },

    zj : function () {
      try {
        return Zepto;
      } catch (e) {
        return jQuery;
      }
    }()
  };

  $.fn.foundation = function () {
    var args = [this].concat(Array.prototype.slice.call(arguments, 0));

    return this.each(function () {
      Foundation.init.apply(Foundation, args);

      return this;
    });
  };

}(this, this.document));