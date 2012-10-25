/*
 * jQuery Foundation Clearing 1.0
 * http://foundation.zurb.com
 * Copyright 2012, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/

/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, undefined) {
  'use strict';

  var defaults = {
        thumb_width : 200,
        templates : {
          viewing : '<a href="#" class="clearing-close">&times;</a>' +
            '<div class="visible-img" style="display: none"><img src="#">' +
            '<p class="clearing-caption"></p><a href="#" class="clearing-main-left"></a>' +
            '<a href="#" class="clearing-main-right"></a></div>'
        },
        prev_index : 0, // needs to be reset on close
        locked : false
      },

      superMethods = {},

      methods = {
        init : function (options, extendMethods) {
          return this.find('ul[data-clearing]').each(function () {
            var $el = $(this),
                options = options || {},
                extendMethods = extendMethods || {},
                settings = $el.data('fndtn.clearing.settings');

            if (!settings) {
              options.$parent = $el.parent();

              $el.data('fndtn.clearing.settings', $.extend({}, defaults, options));

              // developer goodness experiment
              methods.extend(methods, extendMethods);

              // if the gallery hasn't been built yet...build it
              methods.assemble($el.find('li'));

              methods.events();
            }
          });
        },

        events : function () {
          var doc = $(document);

          doc.on('click.fndtn.clearing', 'ul[data-clearing] li', function (e, current, target) {
            var current = current || $(this),
                target = target || current;

            e.preventDefault();

            // set current and target to the clicked li if not otherwise defined.
            methods.open($(e.target), current, target);
          });

          $(window).on('resize.fndtn.clearing', function () {
            var image = $('.clearing-blackout .visible-img').find('img');

            if (image.length > 0) {
              methods.center(image);
            } 
          });

          doc.on('click.fndtn.clearing', '.clearing-main-right', function (e) {
            var clearing = $('.clearing-blackout').find('ul[data-clearing]');

            e.preventDefault();
            methods.go(clearing, 'next');
          });

          doc.on('click.fndtn.clearing', '.clearing-main-left', function (e) {
            var clearing = $('.clearing-blackout').find('ul[data-clearing]');

            e.preventDefault();
            methods.go(clearing, 'prev');
          });

          doc.on('click.fndtn.clearing', 'a.clearing-close, div.clearing-blackout', function (e) {
            var root = (function (target) {
              if (/blackout/.test(target.selector)) {
                return target;
              } else {
                return target.closest('.clearing-blackout');
              }
            }($(this))), container, visible_image;

            if (this === e.target && root) {
              container = root.find('div:first'),
              visible_image = container.find('.visible-img');

              defaults.prev_index = 0;

              root.removeClass('clearing-blackout');
              container.removeClass('clearing-container');
              visible_image.hide();
            }

            return false;
          });

          // should specify a target selector
          doc.on('keydown.fndtn.clearing', function (e) {
            var clearing = $('.clearing-blackout').find('ul[data-clearing]');

            // right
            if (e.which === 39) {
              methods.go(clearing, 'next');
            }

            // left
            if (e.which === 37) {
              methods.go(clearing, 'prev');
            }
          });
        },

        assemble : function ($li, target) {
          var $el = $li.parent(),
              settings = $el.data('fndtn.clearing.settings'),
              grid = $el.detach(),
              data = {
                grid: this.outerHTML(grid[0]),
                viewing: settings.templates.viewing
              },
              wrapper = '<div class="clearing-assembled"><div>' + data.viewing + data.grid + '</div></div>';

          return settings.$parent.append(wrapper);
        },

        open : function ($image, current, target) {
          // needs to open the relative gallery
          var root = $('.clearing-assembled'),
              container = root.find('div:first'),
              visible_image = container.find('.visible-img'),
              image = visible_image.find('img').not($image);

          if (!methods.locked()) {

            // set the image to the selected thumbnail
            image.attr('src', this.load($image));

            image.is_good(function () {
              // toggle the gallery if not visible
              root.addClass('clearing-blackout');
              container.addClass('clearing-container');
              methods.caption(visible_image.find('.clearing-caption'), $image);
              visible_image.show();

              methods.center(image);

              // shift the thumbnails if necessary
              methods.shift(current, target, function () {
                target.siblings().removeClass('visible');
                target.addClass('visible');
              });
            });
          }
        },

        load : function ($image) {
          var href = $image.parent().attr('href');

          if (href) {
            return href;
          }

          return $image.attr('src');
        },

        caption : function (container, $image) {
          var caption = $image.data('caption');

          if (caption) {
            container.text(caption).show();
          } else {
            container.text('').hide();
          }
        },

        go : function ($ul, direction) {
          var current = $ul.find('.visible'),
              target = current[direction]();

          if (target.length > 0) {
            target.find('img').trigger('click', [current, target]);
          }
        },

        shift : function (current, target, callback) {
          var clearing = target.parent(),
              container = clearing.closest('.clearing-container'),
              target_offset = target.position().left,
              thumbs_offset = clearing.position().left,
              direction = this.direction(clearing, current, target),
              left = parseInt(clearing.css('left'), 10),
              skip_shift;

          if (/left/.test(direction)) {
            methods.lock();
            clearing.animate({left : left + target.outerWidth()}, 300, methods.unlock);
          } else if (/right/.test(direction)) {
            methods.lock();
            clearing.animate({left : left - target.outerWidth()}, 300, methods.unlock);
          } else if (/skip/.test(direction)) {
            skip_shift = target.index() - defaults.up_count;

            if (skip_shift > 0) {
              clearing.css({left : -(skip_shift * target.outerWidth())});
            }
          }

          callback();
        },

        lock : function () {
          defaults.locked = true;
        },

        unlock : function () {
          defaults.locked = false;
        },

        locked : function () {
          return defaults.locked;
        },

        direction : function ($el, current, target) {
          var lis = $el.find('li'),
              li_width = lis.outerWidth(),
              container = $('.clearing-container'),
              up_count = Math.floor(container.outerWidth() / li_width) - 1,
              shift_count = lis.length - up_count,
              target_index = lis.index(target),
              current_index = lis.index(current),
              response;

          defaults.up_count = up_count;

          if (this.adjacent(defaults.prev_index, target_index)) {
            if ((target_index > up_count) && target_index > defaults.prev_index) {
              response = 'right';
            } else if ((target_index > up_count - 1) && target_index <= defaults.prev_index) {
              response = 'left';
            } else {
              response = false;
            }
          } else {
            response = 'skip';
          }

          defaults.prev_index = target_index;

          return response;
        },

        adjacent : function (current_index, target_index) {
          if (target_index - 1 === current_index) {
            return true;
          } else if (target_index + 1 === current_index) {
            return true;
          } else if (target_index === current_index) {
            return true;
          }

          return false;
        },

        center : function (target) {
          target.css({
            marginLeft : -(target.outerWidth() / 2),
            marginTop : -(target.outerHeight() / 2)
          });
        },

        outerHTML : function (el) {
          // support FireFox < 11
          return el.outerHTML || new XMLSerializer().serializeToString(el);
        },

        // experimental functionality for overwriting or extending
        // clearing methods during initialization.
        //
        // ex $doc.foundationClearing({}, {
        //      shift : function (current, target, callback) {
        //        // modify arguments, etc.
        //        this._super('shift', [current, target, callback]);
        //        // do something else here.
        //      }
        //    });

        extend : function (supers, extendMethods) {
          $.each(supers, function (name, method) {
            if (extendMethods.hasOwnProperty(name)) {
              superMethods[name] = method;
            }
          });

          $.extend(methods, extendMethods);
        },

        // you can call this._super('methodName', [args]) to call
        // the original method and wrap it in your own code

        _super : function (method, args) {
          return superMethods[method].apply(this, args);
        }
      };

  $.fn.foundationClearing = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.foundationClearing');
    }
  };

  // jquery.imageready.js
  // @weblinc, @jsantell, (c) 2012

  (function( $ ) {
    $.fn.is_good = function ( callback, userSettings ) {
      var
        options = $.extend( {}, $.fn.is_good.defaults, userSettings ),
        $images = this.find( 'img' ).add( this.filter( 'img' ) ),
        unloadedImages = $images.length;

      function loaded () {
        unloadedImages -= 1;
        !unloadedImages && callback();
      }

      function bindLoad () {
        this.one( 'load', loaded );
        if ( $.browser.msie ) {
          var
            src   = this.attr( 'src' ),
            param = src.match( /\?/ ) ? '&' : '?';
          param  += options.cachePrefix + '=' + ( new Date() ).getTime();
          this.attr( 'src', src + param );
        }
      }

      return $images.each(function () {
        var $this = $( this );
        if ( !$this.attr( 'src' ) ) {
          loaded();
          return;
        }
        this.complete || this.readyState === 4 ?
          loaded() :
          bindLoad.call( $this );
      });
    };

    $.fn.is_good.defaults = {
      cachePrefix: 'random'
    };

  }(jQuery));

}(jQuery, this));
