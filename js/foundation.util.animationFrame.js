!function($, Foundation, window){
  function Move(duration, elem, fn){
    var anim, prog, start = null, _this = this;
    this.dont = function(){
      if(anim !== undefined){
        window.cancelAnimationFrame(anim);
        duration = 0;
        return true;
      }
      return false;
    };
    this.do = function(ts){//timestamp returned from requestAnimationFrame
      if(!ts || !start){ start = ts = window.performance.now(); }
      prog = ts - start;
      // console.log(prog, ts, start);
      fn.apply(elem);//call the cb
      if(prog < duration){
        anim = window.requestAnimationFrame(_this.do, elem);
      }else{
        window.cancelAnimationFrame(anim);
        elem.trigger('finished.zf.animate', [elem]);
      }
    };
    window.requestAnimationFrame(this.do);
  }
  Foundation.Move = Move;
}(jQuery, window.Foundation, window);
