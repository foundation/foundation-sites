(function ($){
  
  $.fn.foundationNavigation = function (options) {
    
    var lockNavBar = false;
    // Windows Phone, sadly, does not register touch events :(
    if (Modernizr.touch || navigator.userAgent.match(/Windows Phone/i)) {
      $('.nav-bar a.flyout-toggle', this).on('click.fndtn touchstart.fndtn', function (e) {
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
      $('.nav-bar>li.has-flyout', this).hover(function () {
        $(this).children('.flyout').show();
      }, function () {
        $(this).children('.flyout').hide();
      });
    }
    
  };

})( jQuery );
