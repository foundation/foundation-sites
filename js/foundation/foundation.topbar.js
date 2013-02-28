/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.topbar = {
    name : 'topbar',

    version : '4.0.0',

    settings : {
      index : 0,
      stickyClass : 'sticky',
      init : false
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        this.settings.$w = $(window);
        this.settings.$topbar = $('nav.top-bar');
        this.settings.$section = this.settings.$topbar.find('section');
        this.settings.$titlebar = this.settings.$topbar.children('ul').first();

        var breakpoint = $("<div class='top-bar-js-breakpoint'/>").appendTo("body");
        this.settings.breakPoint = breakpoint.width();
        breakpoint.remove();

        if (!this.settings.init) {
          this.events();
          this.assemble();
        }

        if (!this.settings.height) this.largestUL();

        if (this.settings.$topbar.parent().hasClass('fixed')) {
          $('body').css('padding-top', this.outerHeight(this.settings.$topbar));
        }

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      $(this.scope)
        .on('click.fndtn.topbar', '.top-bar .toggle-topbar', function (e) {
          e.preventDefault();

          if (this.breakpoint()) {
            this.settings.$topbar.toggleClass('expanded');
            this.settings.$topbar.css('min-height', '');
          }

          if (!this.settings.$topbar.hasClass('expanded')) {
            this.settings.$section.css({left: '0%'});
            this.settings.$section.find('>.name').css({left: '100%'});
            this.settings.$section.find('li.moved').removeClass('moved');
            this.settings.index = 0;
          }
        }.bind(this))

        .on('click.fndtn.topbar', '.top-bar .has-dropdown>a', function (e) {
          var self = Foundation.libs.topbar;

          if (Modernizr.touch || self.breakpoint())
            e.preventDefault();

          if (self.breakpoint()) {
            var $this = $(this),
                $selectedLi = $this.closest('li');

            self.settings.index += 1;
            $selectedLi.addClass('moved');
            self.settings.$section.css({left: -(100 * self.settings.index) + '%'});
            self.settings.$section.find('>.name').css({left: 100 * self.settings.index + '%'});

            $this.siblings('ul')
              .height(self.settings.height + self.outerHeight(self.settings.$titlebar, true));
            self.settings.$topbar
              .css('min-height', self.settings.height + self.outerHeight(self.settings.$titlebar, true) * 2)
          }
      });

      $(window).on('resize.fndtn.topbar', function () {
        if (!this.breakpoint()) {
          this.settings.$topbar.css('min-height', '');
        }
      }.bind(this));

      // Go up a level on Click
      $(this.scope).on('click.fndtn', '.top-bar .has-dropdown .back', function (e) {
        e.preventDefault();

        var $this = $(this),
            self = Foundation.libs.topbar,
            $movedLi = $this.closest('li.moved'),
            $previousLevelUl = $movedLi.parent();

        self.settings.index -= 1;
        self.settings.$section.css({left: -(100 * self.settings.index) + '%'});
        self.settings.$section.find('>.name').css({'left': 100 * self.settings.index + '%'});

        if (self.settings.index === 0) {
          self.settings.$topbar.css('min-height', 0);
        }

        setTimeout(function () {
          $movedLi.removeClass('moved');
        }, 300);
      });
    },

    breakpoint : function () {
      return this.settings.$w.width() <= this.settings.breakPoint || $('html').hasClass('lt-ie9');
    },

    assemble : function () {
      // Pull element out of the DOM for manipulation
      this.settings.$section.detach();

      this.settings.$section.find('.has-dropdown>a').each(function () {
        var $link = $(this),
            $dropdown = $link.siblings('.dropdown'),
            $titleLi = $('<li class="title back js-generated"><h5><a href="#">&laquo; Back</a></h5></li>');
        // Copy link to subnav
        $dropdown.prepend($titleLi);
      });

      // Put element back in the DOM
      this.settings.$section.appendTo(this.settings.$topbar);

      // check for sticky
      this.sticky();
    },

    largestUL : function () {
      var uls = this.settings.$topbar.find('section ul ul'),
          largest = uls.first(),
          total = 0,
          self = this;

      uls.each(function () {
        if ($(this).children('li').length > largest.children('li').length) {
          largest = $(this);
        }
      });

      largest.children('li').each(function () { total += self.outerHeight($(this), true); });

      this.settings.height = total;
    },

    sticky : function () {
      var klass = '.' + this.stickyClass;
      if ($(klass).length > 0) {
        var distance = $(klass).length ? $(klass).offset().top: 0,
            $window = $(window);
            var offst = this.outerHeight($('nav.top-bar'))+20;

          $window.scroll(function() {
            if ($window.scrollTop() >= (distance)) {
               $(klass).addClass("fixed");
                 $('body').css('padding-top',offst);
            }

           else if ($window.scrollTop() < distance) {
              $(klass).removeClass("fixed");
              $('body').css('padding-top','0');
           }
        });
      }
    },

    off : function () {
      $(this.scope).off('.fndtn.topbar');
      $(window).off('.fndtn.topbar');
    }
  };
}(Foundation.zj, this, this.document));
