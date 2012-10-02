;(function ($, window, undefined){
  'use strict';

  $.fn.foundationAccordion = function (options) {
    var $accordion = $('.accordion');

    if ($accordion.hasClass('hover') && !Modernizr.touch) {
      $('.accordion li', this).on({
        mouseenter : function () {
          console.log('due');
          var p = $(this).parent(),
            flyout = $(this).children('.content').first();

          $('.content', p).not(flyout).hide().parent('li').removeClass('active'); //changed this
          flyout.show(0, function () {
            flyout.parent('li').addClass('active');
          });
        }
      });
    } else {
      $('.accordion li', this).on('click.fndtn', function () {
        var p = $(this).parent(),
            flyout = $(this).children('.content').first();

        $('.content', p).not(flyout).hide().parent('li').removeClass('active'); //changed this
        flyout.show(0, function () {
          flyout.parent('li').addClass('active');
        });
      });
    }

  };

})( jQuery, this );