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
    animInFromRight: 'slideInRight',
    animOutToRight: 'slideOutRight',
    animInFromLeft: 'slideInLeft',
    animOutToLeft: 'slideOutLeft',
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
    this.$wrapper = this.$element.find('.orbit-container');
    this.$slides = this.$element.find('.orbit-slide');

    this._prepareForOrbit();
    this._events();
  };
  Orbit.prototype._prepareForOrbit = function(){
    var _this = this;
    this.setWrapperHeight(function(max){
      _this.setSlideHeight(max);
    });
  }
  Orbit.prototype.setWrapperHeight = function(cb){
    var max = 0, temp, counter = 0;

    this.$slides.each(function(){
      console.log($(this));
      temp = this.getBoundingClientRect().height;
      // temp = $(this).outerHeight();
      if(counter){ $(this).css({'position': 'relative', 'display': 'none'}); }
      console.log(temp);
      max = temp > max ? temp : max;
      counter++;
    });

    if(counter === this.$slides.length){
      this.$wrapper.css({'height': max});
      cb(max);
    }
  };
  Orbit.prototype.setSlideHeight = function(height){
    var counter = 0;
    this.$slides.each(function(){
      $(this).css('height', height);
    });
  };
  Orbit.prototype._events = function(){
    var _this = this;
    var controls = this.$element.find('.orbit-control');
    // var firstSlide = this.$slides.first();
    // var lastSlide = this.$slides.last();

    // var curSlide, nextSlide, prevSlide;
    controls.on('click.zf.orbit', function(){
      // curSlide = _this.$element.find('li.active');

      // if(curSlide[0].className.match(/mui/g)){
      //   return false;
      // }

      // nextSlide = curSlide.next('li').length ? curSlide.next('li') : firstSlide;
      // prevSlide = curSlide.prev('li').length ? curSlide.prev('li') : lastSlide;
      // console.log(this);
      if($(this).hasClass('orbit-next')){
        _this.changeSlide(true);
        // _this._nextSlide(curSlide, nextSlide);
      }
      else{
        _this.changeSlide(false);
        // _this._prevSlide(curSlide, prevSlide);
      }
    })
  };
  Orbit.prototype.changeSlide = function(isLTR){
    var $curSlide = this.$element.find('.orbit-slide.active');

    if(/mui/g.test($curSlide[0].className)){ return false; }//if the slide is currently animating, kick out of the function

    var $firstSlide = this.$slides.first(),
        $lastSlide = this.$slides.last(),

        $nextSlide = (this.options.infiniteWrap ? $curSlide.next('.orbit-slide').length ? $curSlide.next('.orbit-slide') : $firstSlide : $curSlide.next('.orbit-slide')),

        $prevSlide = (this.options.infiniteWrap ? $curSlide.prev('.orbit-slide').length ? $curSlide.prev('.orbit-slide') : $lastSlide : $curSlide.prev('.orbit-slide')),

        dirIn = isLTR ? 'Right' : 'Left',
        dirOut = isLTR ? 'Left' : 'Right',
        $newSlide = isLTR ? $nextSlide : $prevSlide;

    if($newSlide.length){
      Foundation.Motion.animateIn(
        $newSlide.addClass('active').css({'position': 'absolute', 'top': 0}),
        this.options['animInFrom' + dirIn],
        function(){
          $newSlide.css({'position': 'relative', 'display': 'block'});
        });
      Foundation.Motion.animateOut(
        $curSlide.removeClass('active'),
        this.options['animOutTo' + dirOut],
        function(){
          //do stuff?
        });
    }
  };


  // Orbit.prototype._nextSlide = function(curSlide, newSlide){
  //   Foundation.Motion.animateOut(
  //     curSlide.removeClass('active'),
  //     this.options.animOutToLeft,
  //     function(){
  //       //do stuff?
  //   });
  //   Foundation.Motion.animateIn(
  //     newSlide.addClass('active').css({'position': 'absolute', 'top': 0}),
  //     this.options.animInFromRight,
  //     function(){
  //       newSlide.css({'position': 'relative', 'display': 'block'});
  //   });
  //
  // };
  // Orbit.prototype._prevSlide = function(curSlide, newSlide){
  //   Foundation.Motion.animateOut(
  //     curSlide.removeClass('active'),
  //     this.options.animOutToRight,
  //     function(){
  //       //do stuff?
  //   });
  //   Foundation.Motion.animateIn(
  //     newSlide.addClass('active').css({'position': 'absolute', 'top': 0}),
  //     this.options.animInFromLeft,
  //     function(){
  //       newSlide.css({'position': 'relative', 'display': 'block'});
  //   });
  //
  // };
  Orbit.prototype.registerBullets = function(){

  };

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);
