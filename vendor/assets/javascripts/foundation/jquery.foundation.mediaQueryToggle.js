(function ($) {
  
  $.fn.foundationMediaQueryViewer = function (options) {
    
    var settings  = $.extend(options,{toggleKey:77}); // // Press 'M'
    $(document).on("keyup.mediaQueryViewer", ":input", function(e){
      if (e.which === settings.toggleKey) {
        e.stopPropagation();
      }
    });
    $(document).on("keyup.mediaQueryViewer", function(e) {
      var $mqViewer = $('#fqv');

      if (e.which === settings.toggleKey) { 
        if ($mqViewer.length > 0) {
          $mqViewer.remove();
        } else {
          $('body').prepend('<div id="fqv" style="position:fixed;top:4px;left:4px;z-index:999;color:#fff;"><p style="font-size:12px;background:rgba(0,0,0,0.75);padding:5px;margin-bottom:1px;line-height:1.2;"><span class="left">Media:</span> <span style="font-weight:bold;" class="show-for-xlarge">Extra Large</span><span style="font-weight:bold;" class="show-for-large">Large</span><span style="font-weight:bold;" class="show-for-medium">Medium</span><span style="font-weight:bold;" class="show-for-small">Small</span><span style="font-weight:bold;" class="show-for-landscape">Landscape</span><span style="font-weight:bold;" class="show-for-portrait">Portrait</span><span style="font-weight:bold;" class="show-for-touch">Touch</span></p></div>');
        }
      }
    });

  };

})(jQuery);