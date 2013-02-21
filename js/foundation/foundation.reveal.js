/*jslint unparam: true, browser: true, indent: 2 */

/* TODO:
    - Background flashes with chained modals.
    - Some issues with event bindings.
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
      open: function (){},
      opened: function(){},
      close: function(){},
      closed: function(){}
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
        .on('click.reveal', 'a[data-reveal-id]', function (e) {
          var modalLocation = $(this).data('reveal-id');

          e.preventDefault();
          self.open.call(self, 
            $('#' + modalLocation), self.data_options($(this)));
        })
        .on('reveal:open.reveal', '.reveal-modal',
          this.open_animation.bind(this))
        .on('reveal:open.reveal', '.reveal-modal',
          this.open_videos.bind(this))
        .on('reveal:close.reveal', '.reveal-modal',
          this.close_animation.bind(this))
        .on('reveal:closed.reveal', '.reveal-modal',
          this.close_videos.bind(this))
        .on('reveal:opened.reveal reveal:closed.reveal', '.reveal-modal',
          this.unlock.bind(this))

        // bind callbacks
        .on('reveal:open.reveal', '.reveal-modal', 
          this.settings.open)
        .on('reveal:opened.reveal', '.reveal-modal', 
          this.settings.opened)
        .on('reveal:close.reveal', '.reveal-modal', 
          this.settings.close)
        .on('reveal:closed.reveal', '.reveal-modal', 
          this.settings.closed)

        .on('keyup.reveal', function (e) {
          if (e.which === 27) { // on escape
            self.active.modal.trigger('reveal:close');
          }
        });

      this.settings.init = true;
    },

    active_object : function (modal) {
      var top_measure = parseInt(modal.css('top'), 10);

      return {
        modal : modal,
        modal_queued : false,
        top_measure : top_measure,
        top_offset : modal.height() + top_measure,
        locked : false,
        bg : $('.reveal-modal-bg'),
        css : {
          open : {
            'top': 0,
            'opacity': 0,
            'visibility': 'visible',
            'display' : 'block'
          },
          close : {
            'top': top_measure,
            'opacity': 1,
            'visibility': 'hidden',
            'display': 'none'
          }
        }
      }
    },

    open : function (modal, options) {
      $.extend(true, this.settings, options);

      if (this.active && !this.active.locked) {
        this.lock();
        this.close_modals();
      }

      // cache active modal
      if (!this.active) this.active = this.active_object(modal);

      this.active.close_button = $('.' + this.settings.dismissModalClass)
        .on('click.reveal', function () {
          this.active.modal.trigger('reveal:close');
        }.bind(this));

      if (this.settings.closeOnBackgroundClick) {
        this.active.bg.css('cursor', 'pointer');
        this.active.bg.off('click.reveal').on('click.reveal', function () {
          this.active.modal.trigger('reveal:close');
        }.bind(this));
      }

      this.active.modal.trigger('reveal:open');
      
      this.show_background();
    },

    show_background : function () {
      if ( this.active.bg.length === 0 ) {
        this.active.bg = $('<div />', {'class': 'reveal-modal-bg'})
          .insertAfter(this.active.modal);

        this.active.bg.fadeIn(this.settings.animationSpeed);
      }
    },

    close_modals : function () {
      var open_modals = $('.reveal-modal.open');

      if (open_modals.length === 1) {
        this.active.modal_queued = true;
        open_modals.trigger('reveal:close');
      }

      this.active = undefined;
    },

    open_animation : function () {
      if (!this.active.locked) {
        this.active.modal.addClass('open');

        this.active.css.open.top = $(this.scope).scrollTop() - this.active.top_offset;
        this.active.css.open.opacity = 0;
        this.active.modal.css(this.active.css.open);

        this.active.animate_obj = {'opacity': 1}

        if (this.settings.animation === 'fadeAndPop') {
          this.active.animate_obj.top = $(this.scope).scrollTop() + this.active.top_measure;
        }

        if (this.settings.animation === 'none') {
          this.active.modal.css(this.active.css.open)
          this.active.bg.css('display', 'block');
          this.active.modal.trigger('reveal:opened');
        } else {
          this.animate_in();
        }
      }

    },

    animate_in : function () {
      this.active.bg.fadeIn(this.settings.animationSpeed / 2);
      this.delay(function () {
        this.active.modal
          .animate(this.active.animate_obj,
          this.settings.animationSpeed,
          function () {
            this.active.modal.trigger('reveal:opened');
          });
      }.bind(this), this.settings.animationSpeed / 2);
    },

    open_videos : function () {
      var video = this.active.modal.find('.flex-video'),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        iframe.attr('src', iframe.data('src'));
        video.fadeIn(100);
      }
    },

    close_animation : function () {
      this.active.modal.removeClass('open');
      this.active.animate_obj = {
        'opacity': 0
      };

      if (this.settings.animation === 'fadeAndPop') {
        this.active.animate_obj.top = $(window).scrollTop() - this.active.top_offset + 'px';
      }

      if (this.settings.animation === 'none') {
        this.active.modal.css(this.active.css.close);

        if (!this.active.modal_queued) {
          this.active.bg.css('display', 'none');
        }

        this.active.modal.trigger('reveal:closed');
      } else { 
        this.animate_out();
      }

      this.active.modal_queued = false;
    },

    animate_out : function () {
      this.active.modal.animate(this.active.animate_obj,
      this.settings.animationSpeed / 2, function () {
        this.active.modal.css(this.active.css.close);
      });

      this.hide_and_trigger_close();
    },

    hide_and_trigger_close : function () {
      if (!this.active.modal_queued) {
        this.delay(function () {
          this.active.bg
            .fadeOut(this.settings.animationSpeed, function () {
              this.active.modal.trigger('reveal:closed');
            }.bind(this));
          }.bind(this), this.settings.animationSpeed);
      } else {
        this.active.modal.trigger('reveal:closed');
      }
    },

    close_videos : function () {
      var video = this.active.modal.find('.flex-video'),
          iframe = video.find('iframe');

      if (iframe.length > 0) {
        iframe.data('src', iframe.attr('src'));
        iframe.attr('src', '');
        video.fadeOut(100);
      }
    },

    unlock : function () {
      return this.active.locked = false;
    },

    lock : function () {
      return this.active.locked = true;
    },

    off : function () {
      this.active.modal.off('.reveal');
      this.active.bg.off('.reveal');
      this.active.close_button.off('.reveal');
      $(this.scope).off('.reveal');
      this.settings.init = false;
    }
  };
}(Foundation.zj, this, this.document));