/**
 * Motion module.
 * @module foundation.motion
 */
!function($, Foundation) {

var initClasses   = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];

function animate(isIn, element, animation, cb) {
  element = $(element).eq(0);

  if (!element.length) return;

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();
  element.addClass(animation)
         .css('transition', 'none');
        //  .addClass(initClass);
  // if(isIn) element.show();
  requestAnimationFrame(function() {
    element.addClass(initClass);
    if (isIn) element.show();
  });
  // Start the animation
  requestAnimationFrame(function() {
    element[0].offsetWidth;
    element.css('transition', '');
    element.addClass(activeClass);
  });
  // Move(500, element, function(){
  //   // element[0].offsetWidth;
  //   element.css('transition', '');
  //   element.addClass(activeClass);
  // });

  // Clean up the animation when it finishes
  element.one(Foundation.transitionend(element), finish);//.one('finished.zf.animate', finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
  }
}

var Motion = {
  animateIn: function(element, animation, /*duration,*/ cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function(element, animation, /*duration,*/ cb) {
    animate(false, element, animation, cb);
  }
};

var Move = function(duration, elem, fn){
  var anim, prog, start = null;
  // console.log('called');

  function move(ts){
    if(!start) start = window.performance.now();
    // console.log(start, ts);
    prog = ts - start;
    fn.apply(elem);

    if(prog < duration){ anim = window.requestAnimationFrame(move, elem); }
    else{
      window.cancelAnimationFrame(anim);
      elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
    }
  }
  anim = window.requestAnimationFrame(move);
};

Foundation.Move = Move;
Foundation.Motion = Motion;

}(jQuery, Foundation);
