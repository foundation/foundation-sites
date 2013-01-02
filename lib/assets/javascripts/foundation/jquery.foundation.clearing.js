/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.clearing = {
    version : '4.0.0.alpha',

    settings : {
      templates : {
        viewing : '<a href="#" class="clearing-close">&times;</a>' +
          '<div class="visible-img" style="display: none"><img src="#">' +
          '<p class="clearing-caption"></p><a href="#" class="clearing-main-left"></a>' +
          '<a href="#" class="clearing-main-right"></a></div>'
      },

      // comma delimited list of selectors that, on click, will close clearing, 
      // add 'div.clearing-blackout, div.visible-img' to close on background click
      close_selectors : 'a.clearing-close',

      // event initializers and locks
      init : false,
      locked : false
    },

    cache : {},

    init : function (scope, method, options) {
      this.scope = this.scope || scope;

      if (typeof method === 'object') {
        options = $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        $(this.scope).find('ul[data-clearing]').each(function () {
          var self = Foundation.libs.clearing,
              $el = $(this),
              options = options || {},
              settings = self.get_data($el);

          if (!settings) {
            options.$parent = $el.parent();

            self.set_data($el, $.extend(true, self.settings, options));

            self.assemble($el.find('li'));

            if (!self.settings.init) {
              self.events();

              // replace with Zepto swipe events
              // if (Modernizr.touch) self.swipe_events();
            }
          }
        });

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    // cache management

    set_data : function (node, data) {
      var id = 'clearing' + (+new Date());

      this.cache[id] = data;
      node.attr('data-clearing-id', id);
    },

    get_data : function (node) {
      return this.cache[node.attr('data-clearing-id')];
    },

    remove_data : function (node) {
      var self = this;

      if (node) {
        delete self.cache[node.attr('data-clearing-id')];
        node.attr('data-clearing-id', '');
      } else {
        $('ul[data-clearing]').each(function () {
          delete self.cache[$(this).attr('data-clearing-id')];
          $(this).attr('data-clearing-id', '');
        });
      }
    },

    // event binding and initial setup

    events : function (el) {
      $(this.scope)
        .on('click.fndtn.clearing', 'ul[data-clearing] li', 
          function (e, current, target) {
            var self = Foundation.libs.clearing,
                current = current || $(this),
                target = target || current,
                settings = self.get_data(current.parent());

            e.preventDefault();
            if (!settings) self.init();

            // set current and target to the clicked li if not otherwise defined.
            self.open($(e.target), current, target);
            self.update_paddles(target);
          })

        .on('click.fndtn.clearing', '.clearing-main-right',
          function (e) { this.nav(e, 'next') }.bind(this))
        .on('click.fndtn.clearing', '.clearing-main-left',
          function (e) { this.nav(e, 'prev') }.bind(this))
        .on('click.fndtn.clearing', this.settings.close_selectors, 
          function (e) { this.close(e) }.bind(this))
        .on('keydown.fndtn.clearing', 
          function (e) { this.keydown(e) }.bind(this));

      $(window).on('resize.fndtn.clearing', 
        function (e) { this.resize() }.bind(this));

      this.settings.init = true;
    },

    swipe_events : function () {
      $(this.scope)
        .bind('swipeLeft', 'ul[data-clearing]', 
          function (e) { this.nav(e, 'next') }.bind(this))
        .bind('swipeRight', 'ul[data-clearing]', 
          function (e) { this.nav(e, 'prev') }.bind(this));
    },

    assemble : function ($li) {
      var $el = $li.parent(),
          settings = this.get_data($el),
          grid = $el.detach(),
          data = {
            grid: '<div class="carousel">' + this.outerHTML(grid[0]) + '</div>',
            viewing: settings.templates.viewing
          },
          wrapper = '<div class="clearing-assembled"><div>' + data.viewing + 
            data.grid + '</div></div>';

      return settings.$parent.append(wrapper);
    },

    // event callbacks

    open : function ($image, current, target) {
      var root = target.closest('.clearing-assembled'),
          container = root.find('div').first(),
          visible_image = container.find('.visible-img'),
          image = visible_image.find('img').not($image);

      if (!this.locked()) {
        // set the image to the selected thumbnail
        image.attr('src', this.load($image));

        this.loaded(image, function () {
          // toggle the gallery
          root.addClass('clearing-blackout');
          container.addClass('clearing-container');
          this.caption(visible_image.find('.clearing-caption'), $image);
          visible_image.show();
          this.fix_height(target);
          this.center(image);

          // shift the thumbnails if necessary
          this.shift(current, target, function () {
            target.siblings().removeClass('visible');
            target.addClass('visible');
          });
        }.bind(this));
      }
    },

    close : function (e) {
      e.preventDefault();

      var root = (function (target) {
            if (/blackout/.test(target.selector)) {
              return target;
            } else {
              return target.closest('.clearing-blackout');
            }
          }($(this))), container, visible_image;

      if (this === e.target && root) {
        container = root.find('div').first(),
        visible_image = container.find('.visible-img');

        this.settings.prev_index = 0;

        root.find('ul[data-clearing]')
          .attr('style', '').removeClass('clearing-blackout');
        container.removeClass('clearing-container');
        visible_image.hide();
      }

      return false;
    },

    keydown : function (e) {
      var clearing = $('.clearing-blackout').find('ul[data-clearing]');

      if (e.which === 39) this.go(clearing, 'next');
      if (e.which === 37) this.go(clearing, 'prev');
      if (e.which === 27) $('a.clearing-close').trigger('click');
    },

    nav : function (e, direction) {
      var clearing = $('.clearing-blackout').find('ul[data-clearing]');

      e.preventDefault();
      this.go(clearing, direction);
    },

    resize : function () {
      var image = $('.clearing-blackout .visible-img').find('img');

      if (image.length) {
        this.center(image);
      }
    },

    // visual adjustments

    fix_height : function (target) {
      var lis = target.siblings();

      lis.each(function () {
          var li = $(this),
              image = li.find('img');

          if (li.height() > image.outerHeight()) {
            li.addClass('fix-height');
          }
        })
        .closest('ul').width(lis.length * 100 + '%');
    },

    update_paddles : function (target) {
      var visible_image = target.closest('.carousel').siblings('.visible-img');

      if (target.next().length) {
        visible_image.find('.clearing-main-right').removeClass('disabled');
      } else {
        visible_image.find('.clearing-main-right').addClass('disabled');
      }

      if (target.prev().length) {
        visible_image.find('.clearing-main-left').removeClass('disabled');
      } else {
        visible_image.find('.clearing-main-left').addClass('disabled');
      }
    },

    center : function (target) {
      target.css({
        marginLeft : -(target.outerWidth() / 2),
        marginTop : -(target.outerHeight() / 2)
      });
    },

    // image loading and preloading

    load : function ($image) {
      var href = $image.parent().attr('href');

      this.preload($image);

      if (href) return href;
      return $image.attr('src');
    },

    preload : function ($image) {
      this.img($image.closest('li').next());
      this.img($image.closest('li').prev());
    },

    loaded : function (image, callback) {
      // based on jquery.imageready.js
      // @weblinc, @jsantell, (c) 2012

      function loaded () {
        callback();
      }

      function bindLoad () {
        this.one('load', loaded);

        if ($.browser.msie) {
          var src = this.attr( 'src' ),
              param = src.match( /\?/ ) ? '&' : '?';
          
          param += 'random=' + (new Date()).getTime();
          this.attr('src', src + param);
        }
      }

      if (!image.attr('src')) {
        loaded();
        return;
      }

      if (this.complete || this.readyState === 4) {
        loaded();
      } else {
        bindLoad.call(image);
      }
    },

    img : function (img) {
      if (img.length) {
        var new_img = new Image(),
            new_a = img.find('a');

        if (new_a.length) {
          new_img.src = new_a.attr('href');
        } else {
          new_img.src = img.find('img').attr('src');
        }
      }
    },

    // image caption

    caption : function (container, $image) {
      var caption = $image.data('caption');

      if (caption) {
        container.text(caption).show();
      } else {
        container.text('').hide();
      }
    },

    // directional methods

    go : function ($ul, direction) {
      var current = $ul.find('.visible'),
          target = current[direction]();

      if (target.length) {
        target.find('img').trigger('click', [current, target]);
      }
    },

    shift : function (current, target, callback) {
      var clearing = target.parent(),
          old_index = this.settings.prev_index || target.index(),
          direction = this.direction(clearing, current, target),
          left = parseInt(clearing.css('left'), 10),
          width = target.outerWidth(),
          skip_shift;

      // we use jQuery animate instead of CSS transitions because we
      // need a callback to unlock the next animation
      if (target.index() !== old_index && !/skip/.test(direction)){
        if (/left/.test(direction)) {
          this.lock();
          clearing.animate({left : left + width}, 300, this.unlock());
        } else if (/right/.test(direction)) {
          this.lock();
          clearing.animate({left : left - width}, 300, this.unlock());
        }
      } else if (/skip/.test(direction)) {
        // the target image is not adjacent to the current image, so
        // do we scroll right or not
        skip_shift = target.index() - this.settings.up_count;
        this.lock();

        if (skip_shift > 0) {
          clearing.animate({left : -(skip_shift * width)}, 300, this.unlock());
        } else {
          clearing.animate({left : 0}, 300, this.unlock());
        }
      }

      callback();
    },

    direction : function ($el, current, target) {
      var lis = $el.find('li'),
          li_width = lis.outerWidth() + (lis.outerWidth() / 4),
          up_count = Math.floor($('.clearing-container')
            .outerWidth() / li_width) - 1,
          target_index = lis.index(target),
          response;

      this.settings.up_count = up_count;

      if (this.adjacent(this.settings.prev_index, target_index)) {
        if ((target_index > up_count) 
          && target_index > this.settings.prev_index) {
          response = 'right';
        } else if ((target_index > up_count - 1)
          && target_index <= this.settings.prev_index) {
          response = 'left';
        } else {
          response = false;
        }
      } else {
        response = 'skip';
      }

      this.settings.prev_index = target_index;

      return response;
    },

    adjacent : function (current_index, target_index) {
      for (var i = target_index + 1; i >= target_index - 1; i--) {
        if (i === current_index) return true;
      }
      return false;
    },

    // lock management

    lock : function () {
      this.settings.locked = true;
    },

    unlock : function () {
      this.settings.locked = false;
    },

    locked : function () {
      return this.settings.locked;
    },

    // plugin management/browser quirks

    outerHTML : function (el) {
      // support FireFox < 11
      return el.outerHTML || new XMLSerializer().serializeToString(el);
    },

    unbind : function () {
      $(this.scope).off('.fndtn.clearing');
      $(window).off('.fndtn.clearing');
      this.remove_data(); // empty settings cache
    }
  };

}(Foundation.zj, this, this.document));
