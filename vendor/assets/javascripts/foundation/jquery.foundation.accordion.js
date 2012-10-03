;(function ($, window, undefined){
  'use strict';

  $.fn.foundationAccordion = function (options) {
    var $accordions = $('.accordion');

    $accordions.each(function(i, accordion) {
      if ($(accordion).hasClass('hover') && !Modernizr.touch) {
        $(accordion).children('li').on({
          mouseenter : function () {
            var p = $(this).parent(),
                flyout = $(this).children('.content').first();

            $('.content', p).not(flyout).hide().parent('li').removeClass('active'); //changed this
            flyout.show(0, function () {
              flyout.parent('li').addClass('active');
            });
          }
        });
      }

      if ($(accordion).hasClass('collapsible')) {
        $(accordion).children('li').children('.title').on({
          click : function () {
            var flyout = $(this).next('.content');

            if($(this).parent('li').hasClass('active')) {
              flyout.hide().parent('li').removeClass('active');
            } else {
              $(accordion).children('li').children('.content').not(flyout).hide().parent('li').removeClass('active');
              flyout.show(0, function() {
                  flyout.parent('li').addClass('active');
                });
            }
          }
        });
      }

      if ( $(accordion).hasClass('hover') === $(accordion).hasClass('collapsible') === false || Modernizr.touch) {
        $('.accordion li', this).on('click.fndtn', function () {
          var p = $(this).parent(),
              flyout = $(this).children('.content').first();

          $('.content', p).not(flyout).hide().parent('li').removeClass('active'); //changed this
          flyout.show(0, function () {
            flyout.parent('li').addClass('active');
          });
        });
      }
    });

  };

})( jQuery, this );