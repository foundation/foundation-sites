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

      $(this.scope).on('click.fndtn.dropdown', '[data-dropdown]', function (e) {
        e.preventDefault();
        self.toggle($(this));
      });

      $(window).on('resize.fndtn.section', self.throttle(function () {
        self.resize.call(self);
      }, 75));

      this.settings.init = true;
    },

    toggle : function (target, resize) {
      var dropdown = $('#' + target.data('dropdown')),
          offset = this.offset(dropdown, target);

      $('[data-dropdown-content]').not(dropdown);

      if (this.visible(dropdown)) {
        dropdown.hide();
      } else {
        this.css(dropdown.show(), target);
      }
    },

    resize : function () {
      var dropdown = $('[data-dropdown-content]:visible'),
          target = $("[data-dropdown='" + dropdown.attr('id') + "']");

      if (dropdown.length && target.length) {
        this.css(dropdown, target);
      }
    },

    css : function (dropdown, target) {
      var offset = this.offset(dropdown, target);

      return dropdown.css({
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

    visible : function (dropdown) {
      return !!(dropdown.width() || dropdown.height()) && dropdown.css("display") !== "none";
    },

    off: function () {
      $(this.scope).off('.fndtn.dropdown');
    }
  };
}(Foundation.zj, this, this.document));
