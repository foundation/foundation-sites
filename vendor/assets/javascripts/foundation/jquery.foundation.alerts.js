(function ($) {
  
  $.fn.foundationAlerts = function (options) {
    var settings = $.extend({
      callback: $.noop
    }, options);
    
    $(document).on("click", ".alert-box a.close", function (event) {
      event.preventDefault();
      $(this).closest(".alert-box").fadeOut(function (event) {
        $(this).remove();
        // Do something else after the alert closes
        settings.callback();
      });
    });
    
  };

})(jQuery);
