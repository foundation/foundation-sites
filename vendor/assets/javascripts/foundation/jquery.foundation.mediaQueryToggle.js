(function ($) {
  
  $.fn.foundationMediaQueryViewer = function (options) {
    
    var settings  = $.extend(options,{toggleKey:77}); // Press 'M'
    
    $(document).keyup(function(e) {
      var $mqViewer = $('#FoundationQueryViewer');

      if (e.keyCode == settings.toggleKey) { 
        if ($mqViewer.length > 0) {
          $mqViewer.remove();
        } else {
          $('body').prepend('<div id="FoundationQueryViewer"><strong class="show-for-xlarge">Media: Extra Large</strong><strong class="show-for-large">Media: Large</strong><strong class="show-for-medium">Media: Medium</strong><strong class="show-for-small">Media: Small</strong><strong class="show-for-landscape">Media: Landscape</strong><strong class="show-for-portrait">Media: Portrait</strong><strong class="show-for-touch">Media: Touch</strong></div>');
        }
      }
    });

  };

})(jQuery);