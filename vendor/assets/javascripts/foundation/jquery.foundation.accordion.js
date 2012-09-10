;(function ($, window, undefined){
  'use strict';

  $.fn.foundationAccordion = function (options) {

    $('.accordion li', this).on('click.fndtn', function () {
    var p = $(this).parent(); //changed this
      var flyout = $(this).children('.content').first();
      $('.content', p).not(flyout).hide().parent('li').removeClass('active'); //changed this
      flyout.show(0, function () {
        flyout.parent('li').addClass('active');
      });
    });

  };

})( jQuery, this );