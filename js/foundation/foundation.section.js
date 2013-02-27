/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.section = {
    name: 'section',

    version : '4.0.0.alpha',

    settings : {
      deep_linking: false,
      one_up: true,
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.scope = this.scope || scope;
      Foundation.inherit(this, 'throttle data_options');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        this.set_active_from_hash();
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;
      $(this.scope).on('click.fndtn.section', '[data-section] .title', function (e) {
        $.extend(true, self.settings, self.data_options($(this).closest('[data-section]')));
        self.toggle_active.call(this, e, self);
      });

      $(window).on('resize.fndtn.section', self.throttle(function () {
        self.resize.call(this);
      }, 40)).trigger('resize');

      this.settings.init = true;
    },

    toggle_active : function (e, self) {
      var $this = $(this),
          section = $this.closest('section, .section'),
          content = section.find('.content'),
          self = Foundation.libs.section;

      if (!self.settings.deep_linking && content.length > 0) {
          e.preventDefault();
      }

      if (section.hasClass('active')) {
        if (self.small()) {
          section
            .removeClass('active')
            .attr('style', '');
        }
      } else {
        if (self.small() || self.settings.one_up) {
          $this
            .closest('[data-section]')
            .find('section, .section')
            .removeClass('active')
            .attr('style', '');

          section.css('padding-top', section.find('.title').outerHeight() - 3);
        }

        if (self.small()) {
          section.attr('style', '');
        }

        section.addClass('active');
      }

      self.settings.callback();
    },

    resize : function () {
      var sections = $('[data-section]'),
          self = Foundation.libs.section;

        sections.each(function() {
          var active_section = $(this).find('section.active, .section.active');
          if (active_section.length > 1) {
            active_section
              .not(':first')
              .removeClass('active')
              .attr('style', '');
          } else if (active_section.length < 1) {
            var first = $(this).find('section, .section').first();
            first.addClass('active');

            if (self.small()) {
              first.attr('style', '');
            } else {
              first.css('padding-top', first.find('.title').outerHeight() - 3);
            }
          }

          if (self.small()) {
            active_section.attr('style', '');
          } else {
            active_section.css('padding-top', active_section.find('.title').outerHeight() - 3);
          }
          self.position_titles($(this));
        });
    },

    set_active_from_hash : function () {
      var hash = window.location.hash.substring(1);

      if (hash.length > 0 && this.settings.deep_linking) {
        $(this.scope)
          .find('[data-section]')
          .find('.content[data-slug=' + hash + ']')
          .closest('section, .section')
          .addClass('active');
      }
    },

    position_titles : function (section, off) {
      var titles = section.find('.title'),
          previous_width = 0;

      if (typeof off === 'boolean') {
        titles.attr('style', '');
      } else {
        titles.each(function () {
          $(this).css('left', previous_width);
          previous_width += $(this).outerWidth();
        });
      }
    },

    small : function () {
      return $(this.scope).width() < 769;
    },

    off : function () {
      $(this.scope).off('.fndtn.section');
      $(window).off('.fndtn.section');
      this.settings.init = false;
    }
  };
}(Foundation.zj, this, this.document));
