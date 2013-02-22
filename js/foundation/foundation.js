/*
 * Foundation Responsive Library 4.0.0alpha
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

/* TODO & NOTES:
  - Test error return, since some of this code has changed slightly.
  - scrollTo is not working
  - move each libs init function into here
*/

(function () {
  // add dusty browser stuff
  if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp */) {
      "use strict";
   
      if (this == null) {
        throw new TypeError();
      }
   
      var t = Object(this),
          len = t.length >>> 0;
      if (typeof fun != "function") {
        throw new TypeError();
      }
   
      var res = [],
          thisp = arguments[1];
      for (var i = 0; i < len; i++) {
        if (i in t) {
          var val = t[i]; // in case fun mutates this
          if (fun.call(thisp, val, i, t)) {
            res.push(val);
          }
        }
      }
   
      return res;
    };
  }
}());

;(function (window, document, undefined) {
  'use strict';

  window.Foundation = {
    name : 'Foundation',

    // global Foundation cache object,
    // used for data store on nodes
    cache : {},

    init : function (scope, libraries, method, options, response, /* internal */ nc) {
      var library_arr,
          args = [scope, method, options, response],
          responses = [],
          nc = nc || false;

      // disable library error catching,
      // used for development only
      if (nc) this.nc = nc;

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
            error: response_arr.filter(function (s) {
              if (typeof s === 'string') return s;
            })
          });
        }
      }

      return response_arr;
    },

    init_lib : function (lib, args) {
      return this.catch(function () {
        // hasOwnProperty needs a polyfill
        if (this.libs.hasOwnProperty(lib)) {
          return this.libs[lib].init.apply(this.libs[lib], args);
        }
      }.bind(this), lib);
    },

    catch : function (fun, lib) {
      if (!this.nc) {
        try {
          return fun();
        } catch (e) {
          return this.error({name: lib, message: 'could not be initialized', more: e.name + ' ' + e.message});
        }
      }

      return fun();
    },

    inherit : function (scope, methods) {
      var methods_arr = methods.split(' ');

      for (var i = methods_arr.length; i >= 0; i--) {
        if (this.lib_methods.hasOwnProperty(methods_arr[i])) {
          this.libs[scope.name][methods_arr[i]] = this.lib_methods[methods_arr[i]];
        }
      }
    },

    libs : {},

    // methods that can be inherited in libraries
    lib_methods: {
      set_data : function (node, data) {
        // this.name references the name of the library calling this method
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

      throttle : function(fun, delay) {
        var timer = null;
        return function () {
          var context = this, args = arguments;
          clearTimeout(timer);
          timer = setTimeout(function () {
            fun.apply(context, args);
          }, delay);
        };
      },

      data_options : function (el) {
        var opts = {}, ii, p,
            opts_arr = (el.attr('data-options') || ':').split(';'),
            opts_len = opts_arr.length;

        function trim(str) {
          if (typeof str === 'string') return $.trim(str);
          return str;
        }

        // parse options
        for (ii = opts_len - 1; ii >= 0; ii--) {
          p = opts_arr[ii].split(':');

          if (/true/i.test(p[1])) p[1] = true;
          if (/false/i.test(p[1])) p[1] = false;

          if (p.length === 2) {
            opts[trim(p[0])] = trim(p[1]);
          }
        }

        return opts;
      },

      delay : function (fun, delay) {
        return setTimeout(fun, delay);
      },

      // animated scrolling
      scrollTo : function (el, to, duration) {
        if (duration < 0) return;
        var difference = to - el.scrollTop;
        var perTick = difference / duration * 10;

        clearTimeout(this.scrollToTimerCache);

        this.scrollToTimerCache = setTimeout(function() {
            el.scrollTop = el.scrollTop + perTick;
            this.scrollTo(el, to, duration - 10);
        }, 10);
      },

      // not supported in core Zepto
      scrollLeft : function(el) {
        if (!el.length) return;
        return ('scrollLeft' in el[0]) ? el[0].scrollLeft : el[0].scrollX;
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
  },

  $.fn.foundation = function () {
    var args = Array.prototype.slice.call(arguments, 0);

    return this.each(function () {
      Foundation.init.apply(Foundation, [this].concat(args));
      return this;
    });
  };

}(this, this.document));