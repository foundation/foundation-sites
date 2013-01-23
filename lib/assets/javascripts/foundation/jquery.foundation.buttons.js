/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.buttons = {
    version : '4.0.0.alpha',

    settings : {
      dropdownAsToggle: true,
      activeClass: 'active'
    },

    init : function (scope, method, options) {
      this.scope = this.scope || scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) {
          this.events().assemble();
        }

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      // Prevent event propagation on disabled buttons
      $(this.scope).on('click.fndtn', '.button.disabled', function (e) {
        e.preventDefault();
      });

      // reset other active states
      $(this.scope).on('click.fndtn', '.button.dropdown:not(.split), .button.dropdown.split span', function (e) {
        var $el = $(this),
            button = $el.closest('.button.dropdown'),
            dropdown = $('> ul', button);

          // If the click is registered on an actual link then do not preventDefault which stops the browser from following the link
          if (e.target.nodeName !== "A"){
            e.preventDefault();
          }

        // close other dropdowns
        self.close_dropdowns(self.settings.dropdownAsToggle ? dropdown : '');
        dropdown.toggleClass('show-dropdown');

        if (self.settings.dropdownAsToggle) {
          self.reset_toggles(button);
          $el.toggleClass(self.settings.activeClass);
        }
      });

      // close all dropdowns and deactivate all buttons
      $(this.scope).on('click.fndtn', 'body, html', function (e) {
        if (undefined == e.originalEvent) { return; }
        // check original target instead of stopping event propagation to play nice with other events
        if (!$(e.originalEvent.target).is('.button.dropdown:not(.split), .button.dropdown.split span')) {
          this.close_dropdowns();
          if (this.settings.dropdownAsToggle) {
            this.reset_toggles();
          }
        }
      }.bind(this));
      
      this.settings.init = true;

      return this;
    },

    assemble: function () {
      $('.button.dropdown > ul', this).addClass('no-hover');

      // Positioning the Flyout List
      var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny):visible', this).outerHeight() - 1,
          largeButtonHeight   = $('.button.large.dropdown:visible', this).outerHeight() - 1,
          smallButtonHeight   = $('.button.small.dropdown:visible', this).outerHeight() - 1,
          tinyButtonHeight    = $('.button.tiny.dropdown:visible', this).outerHeight() - 1;

      $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul', this).css('top', normalButtonHeight);
      $('.button.dropdown.large > ul', this).css('top', largeButtonHeight);
      $('.button.dropdown.small > ul', this).css('top', smallButtonHeight);
      $('.button.dropdown.tiny > ul', this).css('top', tinyButtonHeight);

      $('.button.dropdown.up:not(.large):not(.small):not(.tiny) > ul', this).css('top', 'auto').css('bottom', normalButtonHeight - 2);
      $('.button.dropdown.up.large > ul', this).css('top', 'auto').css('bottom', largeButtonHeight - 2);
      $('.button.dropdown.up.small > ul', this).css('top', 'auto').css('bottom', smallButtonHeight - 2);
      $('.button.dropdown.up.tiny > ul', this).css('top', 'auto').css('bottom', tinyButtonHeight - 2);
    },

    close_dropdowns: function (dropdown) {
      $('.button.dropdown').find('ul').not(dropdown).removeClass('show-dropdown');
    },

    reset_toggles: function (button) {
      var buttons = $('.button.dropdown').not(button);
      buttons.add($('> span.' + self.settings.activeClass, buttons)).removeClass(self.settings.activeClass);
    },

    unbind: function () {
      $(this.scope).off('.fndtn.tabs');
    }
  };
}(Foundation.zj, this, this.document));
