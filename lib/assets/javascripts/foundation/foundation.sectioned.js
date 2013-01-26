/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.sectioned = {
    name: 'sectioned',

    version : '4.0.0.alpha',

    settings : {
    },

    init : function (scope, method, options) {
      this.scope = this.scope || scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      $(this.scope).on('click.fndtn.sectioned', '.sectioned .title', function (e) {
        var $this = $(this),
            section = $this.closest('section, .section');

        e.preventDefault();

        if (section.hasClass('active')) {
          if ($(window).width() < 769) {
            section.removeClass('active');
          }
        } else {
          if ($(window).width() > 768) {
            $('.sectioned').find('section, .section').removeClass('active');
          }
          section.addClass('active');
        }
      });

      $(window).on('resize.fndtn.sectioned', function () {
        var sections = $('.sectioned');
        if ($(this).width() > 768) {
          sections.each(function() {
            var active_section = $(this).find('section.active, .section.active');
            if (active_section.length > 1) {
              active_section.not(':first').removeClass('active');
            } else if (active_section.length < 1) {
              $(this).find('section, .section').first().addClass('active');
            }
            Foundation.libs.sectioned.position_titles($(this));
          });
        } else {
          sections.each(function() {
            Foundation.libs.sectioned.position_titles($(this), false);
          });
        }
      }).trigger('resize');
      
      this.settings.init = true;
    },

    position_titles : function (section, off) {
      var titles = section.find('.title'),
          previous_width = 0;

      if (typeof off === 'boolean') {
        titles.attr('style', '');
      } else {
        titles.each(function () {
          $(this).css('left', previous_width);
          previous_width += $(this).width();
        });
      }
    },

    unbind : function () {
      $(this.scope).off('.fndtn.sectioned');
      $(window).off('.fndtn.sectioned');
    }
  };
}(Foundation.zj, this, this.document));
