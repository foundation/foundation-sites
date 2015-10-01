!function($, Foundation){
  'use strict';
  function Orbit(element){
    this.$element = element;
    this.options = $.extend({}, Orbit.defaults, this.$element.data());
    // console.log(this.$element);
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
    swipe: true,
    fixedHeight: true,
    // slideNumber: true,
    pauseOnHover: true,
    nextOnClick: true
    // expandOnClick: false,
    // wrapper: '<div></div>'

  };
  Orbit.prototype._init = function(){
    var _this = this;

    this.$slides = this.$element.find('.orbit-container > li');
    this.$wrapper = this.$element.find('.orbit-container');
    this.setWrapperHeight(function(max){
      // _this.setSlideHeight(max);

    });
    var a = this.$slides.not('.active');
    // var b = this.$element.find('.active');
    // a.css('visibility', 'hidden');
    // a.offset({'top': b.offset().top}).hide();
    this._events();
  };
  Orbit.prototype.setWrapperHeight = function(cb){
    var max = 0, temp, counter = 0;

    this.$slides.each(function(){
      console.log($(this));
      // temp = this.getBoundingClientRect().height;
      temp = $(this).outerHeight();
      if(counter){ $(this).css({'position': 'relative', 'display': 'none'}); }
      console.log(temp);
      max = temp > max ? temp : max;
      counter++;
    });
    this.$wrapper.css({'max-height': max/*, 'height': max*/});

    if(counter === this.$slides.length){ cb(max); }
  };
  Orbit.prototype._events = function(){
    var _this = this;
    var controls = this.$element.find('.orbit-control');
    var firstSlide = this.$slides.first();
    var lastSlide = this.$slides.last();
    console.log(lastSlide);

    var curSlide, nextSlide, prevSlide;
    controls.on('click', function(){
      curSlide = _this.$element.find('li.active');
      nextSlide = curSlide.next('li').length ? curSlide.next('li') : firstSlide;
      prevSlide = curSlide.prev('li').length ? curSlide.prev('li') : lastSlide;
      // console.log(this);
      if($(this).hasClass('orbit-next')){

        Foundation.Motion.animateOut(
          curSlide.removeClass('active'),
          'slideOutLeft',
          function(){
            //do stuff?
        });
          // nextSlide.addClass('active').css({'position': 'absolute', 'top': 0});
        Foundation.Motion.animateIn(
          nextSlide.addClass('active').css({'position': 'absolute', 'top': 0}),
          'slideInRight',
          function(){
            nextSlide.css({'position': 'relative', 'display': 'block'});
        });
      }
      else{
        // _this._changeSlide(curSlide, prevSlide, 'right');

        Foundation.Motion.animateOut(
          curSlide.removeClass('active'),
          'slideOutRight',
          function(){

        });
        Foundation.Motion.animateIn(
          prevSlide.addClass('active').css({'position': 'absolute', 'top': 0}),
          'slideInLeft',
          function(){
            prevSlide.css({'position': 'relative', 'display': 'block'});
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
  // Orbit.prototype.setSlideHeight = function(height){
  //   var counter = 0;
  //   this.$slides.each(function(){
  //     if(counter){
  //       console.log('yo');
  //       $(this).offset('top', -(counter * height));
  //     }else{
  //       console.log('first');
  //     }
  //   })
  // };
  Orbit.prototype._changeSlide = function(curSlide, newSlide, dir){
    // if(dir === 'left'){
    //   curSlide.css({
    //     transform: 'translateX(-100%)'
    //   }).removeClass('active');
    //   newSlide.show().css({
    //     transform: 'translateX(0)'
    //   }).addClass('active');
    // }else{
    //   curSlide.css({
    //     transform: 'translateX(100%)'
    //   }).removeClass('active');
    //   newSlide.show().css({
    //     transform: 'translateX(0)'
    //   }).addClass('active');
    // }
  };
  Orbit.prototype.registerBullets = function(){

  };

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);
