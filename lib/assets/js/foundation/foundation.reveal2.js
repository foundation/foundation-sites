/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.sectioned = {
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
      this.scope = this.scope || scope;
      Foundation.inherit(this, 'data_options');

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

      $(this.scope).on('click', 'a[data-reveal-id]', function (e) {
        var modalLocation = $(this).attr('data-reveal-id');

        e.preventDefault();
        self.reveal($('#' + modalLocation), self.data_options($(this)));
      });
    },

    reveal : function (modal, options) {
      $.extend(true, this.settings, options);

      var topMeasure = parseInt( modal.css( 'top' ), 10 ),
          topOffset = modal.height() + topMeasure,
          locked = false,
          modalBg = $( '.reveal-modal-bg' ),
          cssOpts = {
            open : {
              'top': 0,
              'opacity': 0,
              'visibility': 'visible',
              'display': 'block'
            },
            close : {
              'top': topMeasure,
              'opacity': 1,
              'visibility': 'hidden',
              'display': 'none'
            }

          },
          $closeButton;

      if ( modalBg.length === 0 ) {
        modalBg = $( '<div />', { 'class' : 'reveal-modal-bg' } )
        .insertAfter( modal );
        modalBg.fadeTo( 'fast', 0.8 );
      }

    },

    unbind : function () {
      $(this.scope).off('.fndtn.sectioned');
      $(window).off('.fndtn.sectioned');
    }
  };
}(Foundation.zj, this, this.document));
