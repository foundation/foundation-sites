;(function ($, window, undefined) {
  'use strict';

  $.fn.foundationButtons = function (options) {

    var config = $.extend({
        dropdownAsToggle:true,
        activeClass:'active'
      }, options),
      closeDropdowns,
      resetToggles;

    // Only bind events during initialization
    if(this.is(document)) {
      // close all dropdowns except for the dropdown passed
      closeDropdowns = function (dropdown) {
        // alert(dropdown.html());
        $('.button.dropdown').find('ul').not(dropdown).removeClass('show-dropdown');
      };

      // reset all toggle states except for the button passed
      resetToggles = function (button) {
        // alert(button.html());
        var buttons = $('.button.dropdown').not(button);
        buttons.add($('> span.' + config.activeClass, buttons)).removeClass(config.activeClass);
      };

      // Prevent event propagation on disabled buttons
      this.on('click.fndtn', '.button.disabled', function (e) {
        e.preventDefault();
      });

      // reset other active states
      this.on('click.fndtn', '.button.dropdown:not(.split), .button.dropdown.split span', function (e) {
        var $el = $(this),
          button = $el.closest('.button.dropdown'),
          dropdown = $('> ul', button);

        // If the click is registered on an actual link or descendent of a link then
        // do not preventDefault which stops the browser from following the link
        if (!$(e.target).closest('a').length) {
          e.preventDefault();
        }

        // close other dropdowns
        closeDropdowns(config.dropdownAsToggle ? dropdown : '');
        dropdown.toggleClass('show-dropdown');

        if (config.dropdownAsToggle) {
          resetToggles(button);
          $el.toggleClass(config.activeClass);
        }
      });

      // close all dropdowns and deactivate all buttons
      this.on('click.fndtn', 'body, html', function (e) {
        // check original target instead of stopping event propagation to play nice with other events
        if (!$(e.originalEvent.target).is('.button.dropdown:not(.split), .button.dropdown.split span')) {
          closeDropdowns();
          if (config.dropdownAsToggle) {
            resetToggles();
          }
        }
      });
    }

    $('.button.dropdown > ul', this).addClass('no-hover');

    // Make sure we calculate size of hidden elements properly.
    var outerHeightHelper = $.foundation.utils.hiddenFix();
    outerHeightHelper.adjust($('.button.dropdown'));

    var normalButtonHeight  = $('.button.dropdown:not(.large):not(.small):not(.tiny)', this).outerHeight() - 1,
        largeButtonHeight   = $('.button.large.dropdown', this).outerHeight() - 1,
        smallButtonHeight   = $('.button.small.dropdown', this).outerHeight() - 1,
        tinyButtonHeight    = $('.button.tiny.dropdown', this).outerHeight() - 1;

    outerHeightHelper.reset();

    // Position flyout lists appropriately
    $('.button.dropdown:not(.large):not(.small):not(.tiny) > ul', this).css('top', normalButtonHeight);
    $('.button.dropdown.large > ul', this).css('top', largeButtonHeight);
    $('.button.dropdown.small > ul', this).css('top', smallButtonHeight);
    $('.button.dropdown.tiny > ul', this).css('top', tinyButtonHeight);

    $('.button.dropdown.up:not(.large):not(.small):not(.tiny) > ul', this).css('top', 'auto').css('bottom', normalButtonHeight - 2);
    $('.button.dropdown.up.large > ul', this).css('top', 'auto').css('bottom', largeButtonHeight - 2);
    $('.button.dropdown.up.small > ul', this).css('top', 'auto').css('bottom', smallButtonHeight - 2);
    $('.button.dropdown.up.tiny > ul', this).css('top', 'auto').css('bottom', tinyButtonHeight - 2);
  };

})( jQuery, this );
