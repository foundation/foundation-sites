!function($, Foundation){

  /******************************************************************
  /** A very simple timer for animated elements within Foundation. **
  /** Feel free to add features, comments, or use case examples.   **
  /*****************************************************************/

  function Timer(elem, options, cb){
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
      remain = remain < 0 ? duration : remain;
      elem.data('paused', false);
      start = Date.now();
      timer = setTimeout(function(){
        _this.restart();//rerun the timer.
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
  }

  Foundation.NanuNanu = Timer;

}(jQuery, window.Foundation);
