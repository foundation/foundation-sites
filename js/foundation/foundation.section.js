/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.section = {
    name: 'section',

    version : '4.0.5',

    settings : {
      deep_linking: false,
      one_up: true,
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;
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
      }, 30)).trigger('resize');

      $('[data-section] .content').on('click.fndtn.section', function (e) {
        e.stopPropagation();
      });

      $('*, html, body').on('click.fndtn.section', function (e) {
        if ($(e.target).closest('.title').length < 1) {
          $('[data-section].vertical-nav, [data-section].horizontal-nav')
            .find('section, .section')
            .removeClass('active')
            .attr('style', '');
        }
      });

      this.settings.init = true;
    },

    toggle_active : function (e, self) {
      var $this = $(this),
          section = $this.closest('section, .section'),
          content = section.find('.content'),
          parent = section.closest('[data-section]'),
          self = Foundation.libs.section;

      if (!self.settings.deep_linking && content.length > 0) {
        e.preventDefault();
      }

      if (section.hasClass('active')) {
        if (self.small(parent)
          || self.is_vertical(parent)
          || self.is_horizontal(parent)
          || self.is_accordion(parent)) {
          section
            .removeClass('active')
            .attr('style', '');
        }
      } else {
        if (self.small(parent) || self.settings.one_up) {
          $this
            .closest('[data-section]')
            .find('section, .section')
            .removeClass('active')
            .attr('style', '');

          section.css('padding-top', self.outerHeight(section.find('.title')));
        }

        $('[data-section].vertical-nav, [data-section].horizontal-nav')
            .find('section, .section')
            .removeClass('active')
            .attr('style', '');

        if (self.small(parent)) {
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
        var $this = $(this),
            active_section = $this.find('section.active, .section.active');
        if (active_section.length > 1) {
          active_section
            .not(':first')
            .removeClass('active')
            .attr('style', '');
        } else if (active_section.length < 1
          && !self.is_vertical($this)
          && !self.is_horizontal($this)
          && !self.is_accordion($this)) {
          var first = $this.find('section, .section').first();
          first.addClass('active');

          if (self.small($this)) {
            first.attr('style', '');
          } else {
            first.css('padding-top', self.outerHeight(first.find('.title')));
          }
        }

        if (self.small($this)) {
          active_section.attr('style', '');
        } else {
          active_section.css('padding-top', self.outerHeight(active_section.find('.title')));
        }
        self.position_titles($this);

        if (self.is_horizontal($this) && !self.small($this)) {
          self.position_content($this);
        } else {
          self.position_content($this, false);
        }
      });
    },

    is_vertical : function (el) {
      return el.hasClass('vertical-nav');
    },

    is_horizontal : function (el) {
      return el.hasClass('horizontal-nav');
    },

    is_accordion : function (el) {
      return el.hasClass('accordion');
    },

    set_active_from_hash : function () {
      var hash = window.location.hash.substring(1),
          sections = $('[data-section]'),
          self = this;

      sections.each(function () {
        var section = $(this);
        $.extend(true, self.settings, self.data_options(section));

        if (hash.length > 0 && self.settings.deep_linking) {
          section
            .find('.content[data-slug="' + hash + '"]')
            .closest('section, .section')
            .addClass('active');
        }
      });
    },

    position_titles : function (section, off) {
      var titles = section.find('.title'),
          previous_width = 0,
          self = this;

      if (typeof off === 'boolean') {
        titles.attr('style', '');

      } else {
        titles.each(function () {
          $(this).css('left', previous_width);
          previous_width += self.outerWidth($(this));
        });
      }
    },

    position_content : function (section, off) {
      var titles = section.find('.title'),
          content = section.find('.content'),
          self = this;

      if (typeof off === 'boolean') {
        content.attr('style', '');
        section.attr('style', '');
      } else {
        section.find('section, .section').each(function () {
          var title = $(this).find('.title'),
              content = $(this).find('.content');

          content.css({left: title.position().left - 1, top: self.outerHeight(title) - 2});
        });

        // temporary work around for Zepto outerheight calculation issues.
        if (typeof Zepto === 'function') {
          section.height(this.outerHeight(titles.first()));
        } else {
          section.height(this.outerHeight(titles.first()) - 2);
        }
      }

    },

    small : function (el) {
      if (el && this.is_accordion(el)) {
        return true;
      }
      if ($('html').hasClass('lt-ie9')) {
        return true;
      }
      if ($('html').hasClass('ie8compat')) {
        return true;
      }
      return $(this.scope).width() < 768;
    },

    off : function () {
      $(this.scope).off('.fndtn.section');
      $(window).off('.fndtn.section');
      this.settings.init = false;
    }
  };
}(Foundation.zj, this, this.document));
