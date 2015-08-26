!function($, Foundation){
  'use strict';
  function Orbit(element){
    this.$element = element;
    this.options = $.extend({}, Orbit.defaults, this.$element.data());

    this._init();
  }
  Orbit.defaults = {
    bullets: true,
    navButtons: true,
    animation: 'slide',
    timer: true,
    timerDelay: 5000,
    animationSpeed: 500,
    infiniteWrap: true,
    // swipe: true,
    slideNumber: true,
    pauseOnHover: true,
    nextOnClick: true,
    expandOnClick: false

  };
  Orbit.prototype._init = function(){
    this.$element.find('li').not('.active').css('visibility', 'hidden');
  };
  Orbit.prototype.registerBullets = function(){

  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);
