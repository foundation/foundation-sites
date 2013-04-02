/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.section = {
    name: 'section',

    version : '4.0.9',

    settings : {
      deep_linking: false,
      one_up: true,
      callback: function (){}
    },

    init : function (scope, method, options) {
      var self = this;

      this.scope = scope || this.scope;
      Foundation.inherit(this, 'throttle data_options');

      if (typeof method != 'string') {
        this.set_active_from_hash();
        this.events();

        return true;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope)
        .on('click.fndtn.section', '[data-section] .title', function (e) {
          var $this = $(this),
              section = $this.closest('[data-section]');

          self.toggle_active.call(this, e, self);
        });

      $(window)
        .on('resize.fndtn.section', self.throttle(function () {
          self.resize.call(this);
        }, 30))
        .on('hashchange', function () {
          if (!self.settings.toggled){
            self.set_active_from_hash();
            $(this).trigger('resize');
          }
        }).trigger('resize');

      $(document)
        .on('click.fndtn.section', function (e) {
          if ($(e.target).closest('.title').length < 1) {
            $('[data-section="vertical-nav"], [data-section="horizontal-nav"]')
              .find('section, .section')
              .removeClass('active')
              .attr('style', '');
          }
        });

    },

    toggle_active : function (e, self) {
      var $this = $(this),
          section = $this.closest('section, .section'),
          content = section.find('.content'),
          parent = section.closest('[data-section]'),
          self = Foundation.libs.section,
          settings = $.extend({}, self.settings, self.data_options(parent));

      self.settings.toggled = true;

      if (!settings.deep_linking && content.length > 0) {
        e.preventDefault();
      }

      if (section.hasClass('active')) {
        if (self.small(parent)
          || self.is_vertical_nav(parent)
          || self.is_horizontal_nav(parent)
          || self.is_accordion(parent)) {
          section
            .removeClass('active')
            .attr('style', '');
        }
      } else {
        var prev_active_section = null,
            title_height = self.outerHeight(section.find('.title'));

        if (self.small(parent) || settings.one_up) {
          prev_active_section = $this.closest('[data-section]').find('section.active, .section.active');

          if (self.small(parent)) {
            prev_active_section.attr('style', '');
          } else {
            prev_active_section.attr('style', 'visibility: hidden; padding-top: '+title_height+'px;');
          }
        }

        if (self.small(parent)) {
          section.attr('style', '');
        } else {
          section.css('padding-top', title_height);
        }

        section.addClass('active');

        if (prev_active_section !== null) {
          prev_active_section.removeClass('active').attr('style', '');
        }

        // Toggle the content display attribute. This is done to
        // ensure accurate outerWidth measurements that account for
        // the scrollbar.
        if (self.is_vertical_tabs(parent)) {
          content.css('display', 'block');

          if (prev_active_section !== null) {
            prev_active_section
              .find('.content')
              .css('display', 'none');
          }
        }
      }

      setTimeout(function () {
        self.settings.toggled = false;
      }, 300);

      settings.callback();
    },

    resize : function () {
      var sections = $('[data-section]'),
          self = Foundation.libs.section;

      sections.each(function() {
        var $this = $(this),
            active_section = $this.find('section.active, .section.active'),
            settings = $.extend({}, self.settings, self.data_options($this));

        if (active_section.length > 1) {
          active_section
            .not(':first')
            .removeClass('active')
            .attr('style', '');
        } else if (active_section.length < 1
          && !self.is_vertical_nav($this)
          && !self.is_horizontal_nav($this)
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

        if ( (self.is_horizontal_nav($this) && !self.small($this))
          || self.is_vertical_tabs($this)) {
          self.position_content($this);
        } else {
          self.position_content($this, false);
        }
      });
    },

    is_vertical_nav : function (el) {
      return /vertical-nav/i.test(el.data('section'));
    },

    is_horizontal_nav : function (el) {
      return /horizontal-nav/i.test(el.data('section'));
    },

    is_accordion : function (el) {
      return /accordion/i.test(el.data('section'));
    },

    is_horizontal_tabs : function (el) {
      return /^tabs$/i.test(el.data('section'));
    },

    is_vertical_tabs : function (el) {
      return /vertical-tabs/i.test(el.data('section'));
    },

    set_active_from_hash : function () {
      var hash = window.location.hash.substring(1),
          sections = $('[data-section]'),
          self = this;

      sections.each(function () {
        var section = $(this),
            settings = $.extend({}, self.settings, self.data_options(section));

        if (hash.length > 0 && settings.deep_linking) {
          section
            .find('section, .section')
            .attr('style', '')
            .removeClass('active');
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
          previous_height = 0,
          self = this;

      if (typeof off === 'boolean') {
        titles.attr('style', '');

      } else {
        titles.each(function () {
          if (self.is_vertical_tabs(section)) {
            $(this).css('top', previous_height);
            previous_height += self.outerHeight($(this));
          } else {
            $(this).css('left', previous_width);
            previous_width += self.outerWidth($(this));
          }
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
        if (self.is_vertical_tabs(section)
            && !self.small(section)) {
          var content_min_height = 0,
              content_min_width = Number.MAX_VALUE,
              title_width = null;

          section.find('section, .section').each(function () {
            var title = $(this).find('.title'),
                content = $(this).find('.content'),
                content_width = 0;

            title_width = self.outerWidth(title);
            content_width = self.outerWidth(section) - title_width;
            if (content_width < content_min_width) {
              content_min_width = content_width;
            }

            // Increment the minimum height of the content region
            // to align with the height of the titles.
            content_min_height += self.outerHeight(title);

            // Set all of the inactive tabs to 'display: none'
            // The CSS sets all of the tabs as 'display: block'
            // in order to account for scrollbars when measuring the width
            // of the content regions.
            if (!$(this).hasClass('active')) {
              content.css('display', 'none');
            }
          });

          section.find('section, .section').each(function () {
            var content = $(this).find('.content');
            content.css('minHeight', content_min_height);

            // Remove 2 pixels to account for the right-shift in the CSS
            content.css('maxWidth', content_min_width - 2);
          });

          // Adjust the outer section container width to match
          // the width of the title and content
          section.css('maxWidth', title_width + content_min_width);
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
      }
    },

    small : function (el) {
      var settings = $.extend({}, this.settings, this.data_options(el));
      if (this.is_horizontal_tabs(el)) {
        return false;
      }
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
      $(document).off('.fndtn.section')
    }
  };
}(Foundation.zj, this, this.document));
