;(function ($, window, undefined) {
  'use strict';

  $.fn.foundationNavigation = function (options) {

    var lockNavBar = false;
    // Windows Phone, sadly, does not register touch events :(
    if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
      $(document).on('click.fndtn touchstart.fndtn', '.nav-bar a.flyout-toggle', function (e) {
        e.preventDefault();
        var flyout = $(this).siblings('.flyout').first();
        if (lockNavBar === false) {
          $('.nav-bar .flyout').not(flyout).slideUp(500);
          flyout.slideToggle(500, function () {
            lockNavBar = false;
          });
        }
        lockNavBar = true;
      });
      $('.nav-bar>li.has-flyout', this).addClass('is-touch');
    } else {
      $('.nav-bar>li.has-flyout', this).on('mouseenter mouseleave', function (e) {
        if (e.type == 'mouseenter') {
          $('.nav-bar').find('.flyout').hide();
          $(this).children('.flyout').show();
        }

        if (e.type == 'mouseleave') {
          var flyout = $(this).children('.flyout'),
              inputs = flyout.find('input'),
              hasFocus = function (inputs) {
                var focus;
                if (inputs.length > 0) {
                  inputs.each(function () {
                    if ($(this).is(":focus")) {
                      focus = true;
                    }
                  });
                  return focus;
                }

                return false;
              };

          if (!hasFocus(inputs)) {
            $(this).children('.flyout').hide();
          }
        }

      });
    }

  };

})( jQuery, this );
