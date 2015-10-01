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
    animInFromRight: 'slideInRight',
    animOutToRight: 'slideOutRight',
    animInFromLeft: 'slideInLeft',
    animOutToLeft: 'slideOutLeft',
    autoPlay: true,
    timerDelay: 5000,
    infiniteWrap: true,
    swipe: true,
    // pauseOnHover: true,//need to figure this out...
    nextOnClick: true,
    accessible: true
  };
  Orbit.prototype._init = function(){
    this.$wrapper = this.$element.find('.orbit-container');
    this.$slides = this.$element.find('.orbit-slide');

    this._prepareForOrbit();

    if(this.options.bullets){
      this.loadBullets();
    }

    this._events();

    if(this.options.autoPlay){
      this.geoSync();
    }
  };
  Orbit.prototype.loadBullets = function(){
    var _this = this;
    this.$bullets = this.$element.find('.orbit-bullets-container > button');


  };
  Orbit.prototype.geoSync = function(){
    if(this.interval){ clearInterval(this.interval); }
    var _this = this;
    this.interval = setInterval(function(){
      _this.changeSlide(true);
    }, _this.options.timerDelay);
  };
  Orbit.prototype._prepareForOrbit = function(){
    var _this = this;
    this.setWrapperHeight(function(max){
      // _this.setSlideHeight(max);
    });
  }
  Orbit.prototype.setWrapperHeight = function(cb){//rewrite this to `for` loop
    var max = 0, temp, counter = 0;

    this.$slides.each(function(){
      temp = this.getBoundingClientRect().height;

      if(counter){//if not the first slide, set css position and display property
        $(this).css({'position': 'relative', 'display': 'none'});
      }
      max = temp > max ? temp : max;
      counter++;
    });

    if(counter === this.$slides.length){
      this.$wrapper.css({'height': max});//only change the wrapper height property once.
      cb(max);//fire callback with max height dimension.
    }
  };
  Orbit.prototype.setSlideHeight = function(height){
    var counter = 0;
    this.$slides.each(function(){
      // $(this).css('max-height', height);
    });
  };
  Orbit.prototype._events = function(){
    var _this = this;

    if(this.options.navButtons){
      var $controls = this.$element.find('.orbit-control');
      if(this.options.accessible){
        $controls.attr('tabindex', 0);
        //also need to handle enter/return and spacebar key presses
      }
      $controls.on('click.zf.orbit touchend.zf.orbit', function(){
        if($(this).hasClass('orbit-next')){
          _this.changeSlide(true);
        }else{
          _this.changeSlide(false);
        }
      });
    }
    if(this.options.bullets){
      this.$bullets.on('click.zf.orbit touchend.zf.orbit', function(){
        // $(this).find()
        // console.log($(_this.$slides[$(this).data('slide')]));
        var idx = $(this).data('slide');
        var ltr = idx > _this.$slides.index($('.active'));
        var $slide = $(_this.$slides[idx]);
        console.log(ltr);
        _this.changeSlide(ltr, $slide);
      });
    }
  };
  Orbit.prototype.changeSlide = function(isLTR, chosenSlide){
    var $curSlide = this.$element.find('.orbit-slide.active');

    if(/mui/g.test($curSlide[0].className)){ return false; }//if the slide is currently animating, kick out of the function
    // console.log(this.$slides.index($curSlide));
    var $firstSlide = this.$slides.first(),
        $lastSlide = this.$slides.last(),

        $nextSlide = (this.options.infiniteWrap ? $curSlide.next('.orbit-slide').length ? $curSlide.next('.orbit-slide') : $firstSlide : $curSlide.next('.orbit-slide')),

        $prevSlide = (this.options.infiniteWrap ? $curSlide.prev('.orbit-slide').length ? $curSlide.prev('.orbit-slide') : $lastSlide : $curSlide.prev('.orbit-slide')),

        dirIn = isLTR ? 'Right' : 'Left',
        dirOut = isLTR ? 'Left' : 'Right',
        $newSlide = isLTR ? $nextSlide : $prevSlide;
    if(chosenSlide){ $newSlide = chosenSlide; }

    if($newSlide.length){

      Foundation.Motion.animateIn(
        $newSlide.addClass('active').css({'position': 'absolute', 'top': 0}),
        this.options['animInFrom' + dirIn],
        function(){
          $newSlide.css({'position': 'relative', 'display': 'block'})
                   .attr('aria-live', 'polite');
        });

      Foundation.Motion.animateOut(
        $curSlide.removeClass('active'),
        this.options['animOutTo' + dirOut],
        function(){
          $curSlide.removeAttr('aria-live');
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

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);
