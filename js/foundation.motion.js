!function(Foundation, $) {
  var motion = {};

  var initClasses   = ['ng-enter', 'ng-leave'];
  var activeClasses = ['ng-enter-active', 'ng-leave-active'];
  var events = [
    'webkitAnimationEnd', 'mozAnimationEnd',
    'MSAnimationEnd', 'oanimationend',
    'animationend', 'webkitTransitionEnd',
    'otransitionend', 'transitionend'
  ];

  function animate(isIn, element, animation) {
    element = $(element);

    if (!element.length) return;

    reset(element);

    var initClass = isIn ? initClasses[0] : initClasses[1];
    var activeClass = isIn ? activeClasses[0] : activeClasses[1];

    // Set up animation
    reset();
    element.addClass(animation);
    element.css('transition', 'none');  
    element.addClass(initClass);

    // Force a tick
    reflow();

    // Start the animation
    Foundation.requestAnimationFrame(function() {
      element.css('transition', '');
      element.addClass(activeClass);
    });

    // Clean up the animation when it finishes
    element.one(events.join(' '), function() {
      console.log("Motion done.");
      reset();
      element[0].style.transitionDuration = '';
      if (!isIn) element.hide(0);
    });

    function reflow() {
      return element[0].offsetWidth;
    }

    function reset() {
      element[0].style.transitionDuration = 0;
      element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
    }
  }

  motion.animateIn = function(element, animation) { 
    animate(true, element, animation);
  }

  motion.animateOut = function(element, animation) {
    animate(false, element, animation);
  }

  Foundation.Motion = motion;
}(Foundation, jQuery)