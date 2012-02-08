/*
 * jQuery Reveal Plugin 1.0
 * www.ZURB.com
 * Copyright 2010, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/


(function ($) {
  $('a[data-reveal-id]').live('click', function (event) {
    event.preventDefault();
    var modalLocation = $(this).attr('data-reveal-id');
    $('#' + modalLocation).reveal($(this).data());
  });

  $.fn.reveal = function (options) {
    var defaults = {
      animation: 'fadeAndPop',                  // fade, fadeAndPop, none
      animationSpeed: 300,                      // how fast animtions are
      closeOnBackgroundClick: true,             // if you click background will modal close?
      dismissModalClass: 'close-reveal-modal',  // the class of a button or element that will close an open modal
      onOpening:  $.noop,                       // Callback when modal is ready to open
      onOpened:   $.noop,                       // Callback when modal is fully opened
      onClosing:  $.noop,                       // Callback when modal is preparing to close
      onClosed:   $.noop                        // Callback when modal is closed
    };
    var options = $.extend({}, defaults, options);

    return this.each(function () {
      var modal    = $(this),
        topMeasure = parseInt(modal.css('top')),
        topOffset  = modal.height() + topMeasure,
        locked     = false,
        modalBg    = $('.reveal-modal-bg');

      if (modalBg.length == 0) {
        modalBg = $('<div class="reveal-modal-bg" />').insertAfter(modal);
        modalBg.fadeTo('fast', 0.8);
      }

      /* ---- Internal helper functions ---- */
      
      function unlockModal() {
        locked = false;
      }

      function lockModal() {
        locked = true;
      }

      /* ---- Internal callback helpers ---- */      

      /**
       *  @func: modalOpening
       *  @desc: calls the lockModal method. Then executes the onOpening callback.
       */
      function modalOpening() {
        lockModal();
        options.onOpening.call( [], modal ); // Execute the onOpening callback - modal is preparing to open
      }

      /**
       *  @func: modalOpened
       *  @desc: calls the unlockModal method. Then executes the onOpened callback.
       */
      function modalOpened() {
        unlockModal();
        options.onOpened.call( [], modal ); // Execute the onOpened callback - modal is fully visible
      }
      
      /**
       *  @func: modalClosing
       *  @desc: calls the lockModal method. Then executes the onClosing callback.
       */
      function modalClosing() {
        lockModal();
        options.onClosing.call( [], modal ); // Execute the onClosing callback - modal is preparing to close
      }

      /**
       *  @func: modalClosed
       *  @desc: calls the unlockModal method. Then executes the onClosed callback.
       */
      function modalClosed() {
        unlockModal();
        options.onClosed.call( [], modal ); // Execute the onClosed callback - Modal is closed
      }



      function openAnimation() {
        modalBg.unbind('click.modalEvent');
        $('.' + options.dismissModalClass).unbind('click.modalEvent');
        if (!locked) {
          
          modalOpening(); // Modal is preparing to open

          if (options.animation == "fadeAndPop") {
            modal.css({'top': $(document).scrollTop() - topOffset, 'opacity': 0, 'visibility': 'visible'});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "top": $(document).scrollTop() + topMeasure + 'px',
              "opacity": 1
            }, options.animationSpeed, modalOpened /* Modal has opened */);
          }
          if (options.animation == "fade") {
            modal.css({'opacity': 0, 'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.fadeIn(options.animationSpeed / 2);
            modal.delay(options.animationSpeed / 2).animate({
              "opacity": 1
            }, options.animationSpeed, modalOpened /* Modal has opened */);
          }
          if (options.animation == "none") {
            modal.css({'visibility': 'visible', 'top': $(document).scrollTop() + topMeasure});
            modalBg.css({"display": "block"});
            modalOpened(); /* Modal has opened */
          }
        }
        modal.unbind('reveal:open', openAnimation);
      }
      modal.bind('reveal:open', openAnimation);

      function closeAnimation() {
        if (!locked) {
          
          modalClosing(); // Modal is preparing to close

          if (options.animation == "fadeAndPop") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "top":  $(document).scrollTop() - topOffset + 'px',
              "opacity": 0
            }, options.animationSpeed / 2, function () {
              modal.css({'top': topMeasure, 'opacity': 1, 'visibility': 'hidden'});
              modalClosed(); /* Modal has finished closing */
            });
          }
          if (options.animation == "fade") {
            modalBg.delay(options.animationSpeed).fadeOut(options.animationSpeed);
            modal.animate({
              "opacity" : 0
            }, options.animationSpeed, function () {
              modal.css({'opacity': 1, 'visibility': 'hidden', 'top': topMeasure});
              modalClosed(); /* Modal has finished closing */
            });
          }
          if (options.animation == "none") {
            modal.css({'visibility': 'hidden', 'top': topMeasure});
            modalBg.css({'display': 'none'});
            modalClosed(); /* Modal has finished closing */
          }
        }
        modal.unbind('reveal:close', closeAnimation);
      }
      modal.bind('reveal:close', closeAnimation);
      modal.trigger('reveal:open');

      var closeButton = $('.' + options.dismissModalClass).bind('click.modalEvent', function () {
        modal.trigger('reveal:close');
      });

      if (options.closeOnBackgroundClick) {
        modalBg.css({"cursor": "pointer"});
        modalBg.bind('click.modalEvent', function () {
          modal.trigger('reveal:close');
        });
      }

      $('body').keyup(function (event) {
        if (event.which === 27) { // 27 is the keycode for the Escape key
          modal.trigger('reveal:close');
        }
      });

      
    });
  };
})(jQuery);