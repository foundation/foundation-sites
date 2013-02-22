/*jslint unparam: true, browser: true, indent: 2 */

/* TODO
    - make responsive
    - add animation support
*/

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.reveal = {
    name: 'reveal',

    version : '4.0.0.alpha',

    settings : {
      animation: 'fadeAndPop',
      animationSpeed: 300,
      closeOnBackgroundClick: true,
      dismissModalClass: 'close-reveal-modal',
      bgClass: 'reveal-modal-bg',
      open: function(){},
      opened: function(){},
      close: function(){},
      closed: function(){},
      bg : $('.reveal-modal-bg'),
      // top_measure : parseInt(modal.css('top'), 10),
      // top_offset : $('[data-modal].open').height() + this.settings.top_measure,
      css : {
        open : {
          // 'top': 0,
          'opacity': 1,
          'visibility': 'visible',
          'display' : 'block'
        },
        close : {
          // 'top': this.settings.top_measure,
          'opacity': 0,
          'visibility': 'hidden',
          'display': 'none'
        }
      }
    },

    init : function (scope, method, options) {
      this.scope = scope || this.scope;
      Foundation.inherit(this, 'data_options delay');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;
      $(this.scope)
        .on('click.fndtn.reveal', '[data-reveal-id]', function (e) {
          e.preventDefault();
          self.open($(this));
        })
        .on('click.fndtn.reveal', this.close_targets(), function (e) {
          self.close($(this).closest('.reveal-modal'));
        });
    },

    open : function (target) {
      var modal = $('#' + target.data('reveal-id')),
          open_modal = $('.reveal-modal.open');

      if (open_modal.length < 1) {
        this.toggle_bg(modal);
      }
      
      this.toggle_modals(open_modal, modal);
    },

    close : function (modal) {
      var open_modal = $('.reveal-modal.open').not(modal);
      this.toggle_bg(modal);
      this.toggle_modals(open_modal, modal);
    },

    close_targets : function () {
      var base = '.' + this.settings.dismissModalClass;

      if (this.settings.closeOnBackgroundClick) {
        return base + ', .' + this.settings.bgClass;
      }

      return base;
    },

    toggle_modals : function (open_modal, modal) {
      if (open_modal.length > 0) {
        this.hide(open_modal, this.settings.css.close);
      }

      if (modal.filter(':visible').length > 0) {
        this.hide(modal, this.settings.css.close);
      } else {
        this.show(modal, this.settings.css.open);
      }
    },

    toggle_bg : function (modal) {
      if (this.settings.bg.length === 0) {
        this.settings.bg = $('<div />', {'class': this.settings.bgClass})
          .insertAfter(modal);
      }

      if (this.settings.bg.filter(':visible').length > 0) {
        this.hide(this.settings.bg);
      } else {
        this.show(this.settings.bg);
      }
    },

    show : function (el, css) {
      // do animation here, use this.animate(el, css, callback)
      if (css) {
        return el.show().css(css).addClass('open');
      }

      return el.show();
    },

    hide : function (el, css) {
      // do animation here, use this.animate(el, css, callback)
      if (css) {
        return el.hide().css(css).removeClass('open');
      }

      return el.hide();
    },

    animate : function (el, css, callback) {
      // handle fadeAndPop, fade, and no animation here

    },

    off : function () {

    }
  };
}(Foundation.zj, this, this.document));