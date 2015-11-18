!function($, Foundation){
  'use strict';
  var Timer = function(elem, options, cb){
    var _this = this,
        duration = options.duration,//options is an object for easily adding features later.
        nameSpace = Object.keys(elem.data())[0] || 'timer',
        remain = -1,
        start,
        timer;

    this.restart = function(){
      remain = -1;
      clearTimeout(timer);
      this.start();
    };

    this.start = function(){
      // if(!elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
      clearTimeout(timer);
      remain = remain <= 0 ? duration : remain;
      elem.data('paused', false);
      start = Date.now();
      timer = setTimeout(function(){
        if(options.infinite){
          _this.restart();//rerun the timer.
        }
        cb();
      }, remain);
      elem.trigger('timerstart.zf.' + nameSpace);
    };

    this.pause = function(){
      //if(elem.data('paused')){ return false; }//maybe implement this sanity check if used for other things.
      clearTimeout(timer);
      elem.data('paused', true);
      var end = Date.now();
      remain = remain - (end - start);
      elem.trigger('timerpaused.zf.' + nameSpace);
    };
  };
  /**
   * Runs a callback function when images are fully loaded.
   * @param {Object} images - Image(s) to check if loaded.
   * @param {Func} callback - Function to execute when image is fully loaded.
   */
  var onImagesLoaded = function(images, callback){
    var self = this,
        unloaded = images.length;

    if (unloaded === 0) {
      callback();
    }

    var singleImageLoaded = function() {
      unloaded--;
      if (unloaded === 0) {
        callback();
      }
    };

    images.each(function() {
      if (this.complete) {
        singleImageLoaded();
      }
      else if (typeof this.naturalWidth !== 'undefined' && this.naturalWidth > 0) {
        singleImageLoaded();
      }
      else {
        $(this).one('load', function() {
          singleImageLoaded();
        });
      }
    });
  };

  Foundation.Timer = Timer;
  Foundation.onImagesLoaded = onImagesLoaded;
}(jQuery, window.Foundation);
