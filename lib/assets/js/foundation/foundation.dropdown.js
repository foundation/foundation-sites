/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.dropdown = {
    name : 'dropdown',

    version : '4.0.0.alpha',

    settings : {
      dropdownAsToggle: true,
      activeClass: 'active'
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;
      Foundation.inherit(this, 'throttle');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
  
        if (!this.settings.init) {
          this.events();
        }

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.dropdown', '[data-dropdown]', function (e) {
          e.preventDefault();
          e.stopPropagation();
          self.toggle($(this));
        });

      $('body').on('click.fndtn.dropdown', function (e) {
        $('[data-dropdown-content]:visible').hide();
      });

      $('[data-dropdown-content]').on('click.fndtn.dropdown', function (e) {
        e.stopPropagation();
      });

      $(window).on('resize.fndtn.dropdown', self.throttle(function () {
        self.resize.call(self);
      }, 75));

      this.settings.init = true;
    },

    toggle : function (target, resize) {
      var dropdown = $('#' + target.data('dropdown')),
          offset = this.offset(dropdown, target);

      $('[data-dropdown-content]').not(dropdown).hide();

      if (dropdown.hasClass('open')) {
        dropdown
          .hide()
          .removeClass('open');
      } else {
        this.css(dropdown.show().addClass('open'), target);
      }
    },

    resize : function () {
      var dropdown = $('[data-dropdown-content].open'),
          target = $("[data-dropdown='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      var offset = this.offset(dropdown, target);

      return dropdown.css({
        position : 'absolute',
        width: target.width(),
        top: offset.top + target.height(),
        left: offset.left
      });
    },

    offset : function (dropdown, target) {
      if (/body/i.test(dropdown.parent().selector)) {
        return target.offset();
      }

      return target.position();
    },

    off: function () {
      $(this.scope).off('.fndtn.dropdown');
    }
  };
}(Foundation.zj, this, this.document));
