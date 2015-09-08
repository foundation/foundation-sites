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
    // console.log(this.$element.find('li').not('.active'));
    this.$element.find('li').not('.active').hide();
    this._events();
  };
  Orbit.prototype._events = function(){
    var _this = this;
    var controls = this.$element.find('.orbit-control');
    var curSlide;
    controls.on('click', function(){
      curSlide = _this.$element.find('li.active');
      // console.log(this);
      if($(this).hasClass('orbit-next')){
        // curSlide = _this.$element.find('li.active');
        console.log(slide.offset());
        Foundation.Motion.animateOut(curSlide, 'slideOutLeft', function(){
          console.log('animation away');
        });
        Foundation.Motion.animateIn(curSlide.next(), 'slideInRight', function(){
          console.log('animating yo');
        });
        // slide.removeClass('active').next().offset({
        //   'top': slide.offset().top,
        //   'left': slide.offset().left + slide.outerWidth()
        // }).addClass('active');
      }
      else{
        Foundation.Motion.animateOut(curSlide, 'slideOutRight', function(){
          console.log('');
        });
        Foundation.Motion.animateIn(curSlide.prev(), 'slideInLeft', function(){

        });
      }
    })
    // controls.each(function(){
    //   var $this = this;
    //   this.on('click.zf.orbit', function(){
    //     if($this.hasClass('orbit-next')){
    //       console.log(_this.$element.find('li.active').next());
    //     }
    //   })
    // })
  };
  Orbit.prototype.registerBullets = function(){

  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);
