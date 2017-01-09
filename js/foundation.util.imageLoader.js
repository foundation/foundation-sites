'use strict';

!function($) {

/**
 * Runs a callback function when images are fully loaded.
 * @param {Object} images - Image(s) to check if loaded.
 * @param {Func} callback - Function to execute when image is fully loaded.
 */
function onImagesLoaded(images, callback){
  var self = this,
      unloaded = images.length;

  if (unloaded === 0) {
    callback();
  }

  images.each(function() {
    // Check if image is loaded
    if (this.complete || (this.readyState === 4) || (this.readyState === 'complete')) {
      singleImageLoaded();
    }
    // Force load the image
    else {
      // fix for IE. See https://css-tricks.com/snippets/jquery/fixing-load-in-ie-for-cached-images/
      var src = $(this).attr('src');
      $(this).attr('src', src + (src.indexOf('?') >= 0 ? '&' : '?') + (new Date().getTime()));
      $(this).one('load', function() {
        singleImageLoaded();
      });
    }
  });

  function singleImageLoaded() {
    unloaded--;
    if (unloaded === 0) {
      callback();
    }
  }
}

Foundation.onImagesLoaded = onImagesLoaded;

}(jQuery);
