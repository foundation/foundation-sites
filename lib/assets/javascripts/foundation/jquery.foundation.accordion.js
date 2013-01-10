;(function ($, window, undefined){
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.accordion = {
    version : '4.0.0.alpha',

    settings : {},

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
      $('.accordion li', this.scope).on({
        'mouseenter.fndtn.accordion' : function () {
          var p = $(this).parent(),
              flyout = $(this).children('.content').first();
          if (p.hasClass('hover') && !Modernizr.touch) {
            $('.content', p).not(flyout).hide().parent('li').removeClass('active');
            flyout.show(0, function () {
              flyout.parent('li').addClass('active');
            });
          }
        }
      });

      $('.accordion li', this.scope).on('click.fndtn.accordion', function () {
        var li = $(this),
            p = $(this).parent(),
            flyout = $(this).children('.content').first();
        if (!p.hasClass('hover')) {
          if (li.hasClass('active')) {
            p.find('li').removeClass('active').end().find('.content').hide();
          } else {
            $('.content', p).not(flyout).hide().parent('li').removeClass('active'); //changed this
            flyout.show(0, function () {
              flyout.parent('li').addClass('active');
            });
          }
        }
      });
      
      this.settings.init = true;
    },

    unbind : function () {
      $(this.scope).off('.fndtn.accordion');
    }
  };
}(Foundation.zj, this, this.document));