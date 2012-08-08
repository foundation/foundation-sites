(function ($){

  $.fn.foundationAccordion = function (options) {

    $(document).on('click.fndtn', '.accordion li', function () {
      var flyout = $(this).children('.content').first();
      $('.accordion .content').not(flyout).hide().parent('li').removeClass('active');
      flyout.show(0, function () {
        flyout.parent('li').addClass('active');
      });
    });

  };

})( jQuery );
