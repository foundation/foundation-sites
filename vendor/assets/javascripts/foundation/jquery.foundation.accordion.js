(function( $ ){
  
  $.fn.foundationAccordion = function(options) {
    
    $('.accordion li', this).on('click.fndtn', function() {
      var flyout = $(this).children('.content').first();
      $('.accordion .content').not(flyout).hide().parent('li').removeClass('active');
      flyout.show(0, function() {
        flyout.parent('li').addClass('active');
      });
    });
        
  };

})( jQuery );
