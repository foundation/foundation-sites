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
    // swipe: true,
    slideNumber: true,
    pauseOnHover: true,
    nextOnClick: true,
    expandOnClick: false,
    wrapper: '<div></div>'

  };
  Orbit.prototype._init = function(){
    // console.log(this.$element.find('li').not('.active'));
    this.$element.find('li').not('.active');
    this.$slides = this.$element.find('.orbit-container > li');

    this.$wrapper = $(this.options.wrapper).addClass('wrapper').css({'max-height': this.getMaxHeight(), 'min-height': this.getMaxHeight()});
    this.$element.find('.orbit-container').wrap(this.$wrapper);
    this._events();
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
        // curSlide = _this.$element.find('li.active');
        // console.log(slide.offset());
        _this._changeSlide(curSlide, nextSlide, 'left');
        // Foundation.Motion.animateOut(curSlide, 'slideOutLeft', function(){
        //   curSlide.removeClass('active');
        //   // console.log('animation away');
        // });
        // Foundation.Motion.animateIn(nextSlide, 'slideInRight', function(){
        //   nextSlide.addClass('active')
        //   // console.log('animating yo');
        // });
        // slide.removeClass('active').next().offset({
        //   'top': slide.offset().top,
        //   'left': slide.offset().left + slide.outerWidth()
        // }).addClass('active');
      }
      else{
        _this._changeSlide(curSlide, prevSlide, 'right');

        // Foundation.Motion.animateOut(curSlide, 'slideOutRight', function(){
        //   curSlide.removeClass('active');
        //   // console.log('');
        // });
        // Foundation.Motion.animateIn(prevSlide, 'slideInLeft', function(){
        //   prevSlide.addClass('active');
        // });
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
  Orbit.prototype._changeSlide = function(curSlide, newSlide, dir){
    if(dir === 'left'){
      curSlide.css({
        transform: 'translateX(-100%)'
      }).removeClass('active');
      newSlide.show().css({
        transform: 'translateX(0)'
      }).addClass('active');
    }else{
      curSlide.css({
        transform: 'translateX(100%)'
      }).removeClass('active');
      newSlide.show().css({
        transform: 'translateX(0)'
      }).addClass('active');
    }
  };
  Orbit.prototype.registerBullets = function(){

  };
  Orbit.prototype.getMaxHeight = function(){
    var max = 0, temp;
    this.$slides.each(function(){
      temp = this.getBoundingClientRect().height
      // if(max){
      //   // $(this).css('left', $(this).prev('li').width());
      //   $(this).css({
      //     transform: 'translateX(100%)',
      //     transform: 'translateY(-100%)'
      //   });
      // }
      max = temp > max ? temp : max;



    });
    return max + 'px';
  };

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);
