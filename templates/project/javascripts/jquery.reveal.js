/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
/*globals jQuery */

(function ($) {
  $('a[data-reveal-id]').live('click', function (event) {
    event.preventDefault();
    var modalLocation = $(this).attr('data-reveal-id');
    $('#' + modalLocation).reveal($(this).data());
  });

  $.fn.reveal = function (options) {
    var defaults = {
      animation: 'fadeAndPop',                // fade, fadeAndPop, none
      animationSpeed: 300,                    // how fast animtions are
      closeOnBackgroundClick: true,           // if you click background will modal close?
      dismissModalClass: 'close-reveal-modal', // the class of a button or element that will close an open modal
      open: $.noop,
      opened: $.noop,
      close: $.noop,
      closed: $.noop
    };
    options = $.extend({}, defaults, options);

    return this.each(function () {
      var modal    = $(this),
        topMeasure = parseInt(modal.css('top'), 10),
        topOffset  = modal.height() + topMeasure,
        locked     = false,
        modalBg    = $('.reveal-modal-bg'),
        closeButton;

      if (modalBg.length === 0) {
        modalBg = $('<div class="reveal-modal-bg" />').insertAfter(modal);
        modalBg.fadeTo('fast', 0.8);
      }
      
      function unlockModal() {
        locked = false;
      }

      function lockModal() {
        locked = true;
      }

      function openAnimation() {
        if (!locked) {
          lockModal();
          if (options.animation === "fadeAndPop") {
            modal.css({'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'visibility': 'visible'});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "top": $(document).scrollTop() + topMeasure + 'px',
              "opacity": 1
            }, options.animationSpeed, function () {
              modal.trigger('reveal:opened');
            });

          }
          if (options.animation === "fade") {
            modal.css({'opacity': 0, 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "opacity": 1
            }, options.animationSpeed, function () {
              modal.trigger('reveal:opened');
            });

          }
          if (options.animation === "none") {
            modal.css({'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.css({"display": "block"});
            modal.trigger('reveal:opened');
          }
        }
      }
      modal.bind('reveal:open.reveal', openAnimation);

      function closeAnimation() {
        if (!locked) {
          lockModal();
          if (options.animation === "fadeAndPop") {
            modal.animate({
              "top":  $(document).scrollTop() - topOffset + 'px',
              "opacity": 0
            }, options.animationSpeed / 2, function () {
              modal.css({'top': topMeasure, 'opacity': 1, 'visibility': 'hidden'});
            });
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed, function () {
              modal.trigger('reveal:closed');
            });
          }
          if (options.animation === "fade") {
            modal.animate({
              "opacity" : 0
            }, options.animationSpeed, function () {
              modal.css({'opacity': 1, 'visibility': 'hidden', 'top': topMeasure});
            });
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed, function () {
              modal.trigger('reveal:closed');
            });
          }
          if (options.animation === "none") {
            modal.css({'visibility': 'hidden', 'top': topMeasure});
            modalBg.css({'display': 'none'});
            modal.trigger('reveal:closed');
          }
        }
      }

      function destroy() {
        modal.unbind('.reveal');
        modalBg.unbind('.reveal');
        $('.' + options.dismissModalClass).unbind('.reveal');
        $('body').unbind('.reveal');
      }

      modal.bind('reveal:close.reveal', closeAnimation);
      modal.bind('reveal:opened.reveal reveal:closed.reveal', unlockModal);
      modal.bind('reveal:closed.reveal', destroy);
      
      modal.bind('reveal:open.reveal', options.open);
      modal.bind('reveal:opened.reveal', options.opened);
      modal.bind('reveal:close.reveal', options.close);
      modal.bind('reveal:closed.reveal', options.closed);
      
      modal.trigger('reveal:open');

      closeButton = $('.' + options.dismissModalClass).bind('click.reveal', function () {
        modal.trigger('reveal:close');
      });

      if (options.closeOnBackgroundClick) {
        modalBg.css({"cursor": "pointer"});
        modalBg.bind('click.reveal', function () {
          modal.trigger('reveal:close');
        });
      }

      $('body').bind('keyup.reveal', function (event) {
        if (event.which === 27) { // 27 is the keycode for the Escape key
          modal.trigger('reveal:close');
        }
      });
    });
  };
} (jQuery));
