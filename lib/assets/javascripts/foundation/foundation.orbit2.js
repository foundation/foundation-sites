/*
 * jQuery Foundation Orbit 2.0.alpha
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

// Core functionality (others expanded through orbit plugins)
// timer
// change slide
// captions
// navigation arrows

(function($){
  var defaults = {
    timer: false // False, or time in ms
  },

  methods = {
    assemble: function($el) {
      var wrapper = $el.wrap('<div class="orbit2-wrapper"></div>').parent();
      $el.data('wrapper', wrapper);
      $el.addClass('orbit2');
      wrapper.append('<a href="#" class="orbit2-prev">Prev</a>')
      wrapper.append('<a href="#" class="orbit2-next">Next</a>')
      $el.children().wrap('<div class="orbit2-slide"></div>');
      $el.children().first().addClass('active');
    },

    events: function($el) {
      //var settings = $el.data('settings') || {};
    }
  };

  $.fn.foundationOrbit = function(options) {
    var settings = $.extend({}, defaults, options);
    return this.each(function(){
      var $el = $(this);
      $el.data('settings', settings);
      methods.assemble($el);
    });
  };
})(jQuery);


// ;(function ($, window, undefined) {
//   'use strict';

//   var defaults = {
//     templates: {
//       wrapper: '<div class="orbit2-wrapper"></div>'
//     }
//   },

//   methods = {
//     init: function (options) {
//       return this.find('[data-orbit]').each( function () {
//         var $container = $(this),
//             options = options || {};

//         $container.data('settings', $.extend({}, defaults, options));

//         methods.assemble($container);
//       });
//     },

//     assemble: function ($container) {
//       var settings = $container.data('settings');

//     }
//   };

//   // $(document).foundationOrbit()
//   // $(document).foundationOrbit('destroy')
//   $.fn.foundationOrbit = function (method) {
//     if (methods[method]) {
//       return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
//     } else if (typeof method === 'object' || !method) {
//       return methods.init.apply(this, arguments);
//     } else {
//       $.error('Method ' +  method + ' does not exist on jQuery.foundationOrbit');
//     }
//   };

// }(jQuery, this));

// // .orbit2-wrapper      <- wrapper
// //   data-orbit .orbit2 <- container
// //     .orbit2-slide    <- slide