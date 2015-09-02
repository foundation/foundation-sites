!function(Foundation, $) {
  'use strict';

  function Reveal(element) {
    this.$element = element;
    this.options = $.extend({}, Reveal.defaults, this.$element.data());
    // if(this.options.animationIn){
    //   console.log(this.$element.data());
    //   console.log(this.options.animationIn, this.options.animationOut);
    // }
    this._init();

    this.$element.trigger('init.zf.reveal');
  }

  Reveal.defaults = {
    animationIn: '',
    animationOut: '',
    animationInDelay: 250,
    animationOutDelay: 250,
    closeOnClick: true,
    closeOnEsc: true,
    multiOpened: false,
    closeBtn: true,
    closeBtnTemplate: '',
    vOffset: 100,
    hOffset: 0,
    fullScreen: false,
    btmOffsetPct: 10,
    closeBtnText: '<i class="fi-x"></i>',
    closeText: 'Click to close.',
    overlay: true
  };
  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Reveal.prototype._init = function(){
    var anchorId = randomIdGen(6);

    this.id = this.$element.attr('id');

    this.$anchor = $('[data-open=' + this.id + ']') || $('[data-toggle=' + this.id + ']');

    this.$anchor.attr({
      'data-close': this.id,
      'aria-controls': this.id,
      'id': anchorId
    });

    this.options.fullScreen = this.$element.hasClass('full');
    if(this.options.fullScreen){
      this.options.overlay = false;
    }

    if(this.options.overlay){
      this.$overlay = this.makeOverlay(this.id);
    }

    this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'aria-labelledby': anchorId,
        'data-yeti-box': this.id
    });

    if(this.options.closeBtn || this.options.fullScreen){
      this.$closeBtn = this.makeButton(this.id);
      this.$element.append(this.$closeBtn);
    }

    this.options.height = this.$element.outerHeight();
    this.options.width = this.$element.outerWidth();

    this._events();
  };

  //overlay and button elements to be added to the body/modal
  Reveal.prototype.makeOverlay = function(id){
    var $overlay = $('<div></div>')
                    .addClass('reveal-overlay')
                    .attr({'tabindex': -1, 'aria-hidden': true})
                    .appendTo('body');
    if(this.options.closeOnClick){
      $overlay.attr({
        'data-close': id
      });
    }
    return $overlay;
  };
  Reveal.prototype.makeButton = function(id){
    var btn = $('<a>' + this.options.closeBtnText + '</a>')
              .addClass('close-button')
              .attr({
                'data-toggle': this.id,
                'title': this.options.closeText,
                'aria-controls': this.id,
                'aria-hidden': true
              });
    return btn;
  };


  //event listeners and additional triggers that need to be managed
  Reveal.prototype._events = function(){
    var _this = this;

    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });

    if(this.options.closeOnClick && this.options.overlay){
      this.$overlay.on('click.zf.reveal', this.close.bind(this));
    }
    if(this.$closeBtn){
      this.$closeBtn.on('click.zf.reveal', this.close.bind(this));
    }
  };


  Reveal.prototype._setPosition = function(cb){
    var eleDims = Foundation.GetDimensions(this.$element);
    var elePos = this.options.fullScreen ? 'reveal full' : (eleDims.height >= (0.5 * eleDims.windowDims.height)) ? 'reveal' : 'center';


    if(elePos === 'reveal full'){
      //set to full height/width
      this.$element
          .offset(Foundation.GetOffsets(this.$element, null, elePos, this.options.vOffset))
          .css({
            'height': eleDims.windowDims.height,
            'width': eleDims.windowDims.width
          });
    }else if(!Foundation.MediaQuery.atLeast('medium')){
      //if smaller than medium, resize to 100% width minus any custom L/R margin
      this.$element
          .css({
            'width': eleDims.windowDims.width - (this.options.hOffset * 2)
          })
          .offset(Foundation.GetOffsets(this.$element, null, 'center', this.options.vOffset, this.options.hOffset));
      //flag a boolean so we can reset the size after the element is closed.
      this.changedSize = true;
    }else{
      this.$element
          .offset(Foundation.GetOffsets(this.$element, null, elePos, this.options.vOffset))
          //the max height based on a percentage of vertical offset plus vertical offset
          .css({
            'max-height': eleDims.windowDims.height - (this.options.vOffset * (this.options.btmOffsetPct / 100 + 1))
          });
    }

    cb();
  };
  //open and close functions
  Reveal.prototype.open = function(){
    var _this = this;
    this.isActive = true;


    //make element invisible, but remove display: none so we can get size and positioning
    this.$element
        .css({'visibility': 'hidden'})
        .show()
        .scrollTop(0);


    this._setPosition(function(){
      _this.$element.hide()
                   .css({'visibility': ''})
                   .trigger('closeme.zf.reveal', _this.id);
    //global event emitter to close any other open modals
    // _this.$element.trigger('closeme.zf.reveal', _this.id);

      if(_this.options.animationIn){
        _this.animationShow();
      }else{
        _this.noAnimationShow();
      }
    });

    //display: none and remove visiblity attr before animation.
    // this.$element.hide()
    //              .css({'visibility': ''})
    //
    // if(this.options.animationIn){
    //   this.animateIn();
    // }else{
    //   this.noAnimationShow()
    // }
    //
    //bring in the overlay first
    // if(this.options.overlay){
    //   this.$overlay.fadeIn(_this.options.animationInDelay).attr({'aria-hidden': false});
    //   $('body').attr({'aria-hidden': true});
    // }
    // if(this.options.animationIn){
    //   this.timer = setTimeout(function(){
    //     Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
    //       clearTimeout(_this.timer);
    //     });
    //   }, 0);
    // }else{
    //   this.$element
    //       .fadeIn('fast', function(){
    //         _this.$element.attr({'aria-hidden': false});
    //       });
    // }
    setTimeout(function(){
      _this._extraHandlers();
    }, 0);
    this.$element.attr({'aria-hidden': false});
    $('body').addClass('is-reveal-open')
             .attr({'aria-hidden': (this.options.overlay || this.options.fullScreen) ? true : false});
    // this._extraHandlers();
    Foundation.reflow();
    // $.fn.foundation();
  };
  Reveal.prototype.noAnimationShow = function(){
    var _this = this;
    if(this.options.overlay){
      this.$overlay.show(0, function(){
        _this.$element.show('fast', function(){
          _this.$element.trigger('open.zf.reveal');
        });
      });
    }else{
      // this.$element.show();
      // this.$element.css('display', 'block');
      // debugger;
      this.$element.show('fast', function(){
        _this.$element.trigger('open.zf.reveal');
      });
    }
  };

  Reveal.prototype.animationShow = function(){
    var _this = this;
    if(this.options.overlay){
      Foundation.Motion.animateIn(this.$overlay, 'fadeIn', function(){
        Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
          _this.$element.trigger('open.zf.reveal');
        });
      });
    }else{
      Foundation.Motion.animateIn(this.$element, this.options.animationIn, function(){
        _this.$element.trigger('open.zf.reveal');
      });
    }
  };
  Reveal.prototype.noAnimationClose = function(){
    console.log('closing w/o anim');
    var _this = this;
    this.$element.hide('fast', function(){
      console.log('closed w/o anim');
      if(_this.options.overlay){
        _this.$overlay.hide(0, function(){
        });
      }
    });
  };

  Reveal.prototype.animationClose = function(){
    var _this = this;
    Foundation.Motion.animateOut(this.$element, this.options.animationOut, function(){
      if(_this.options.overlay){
        Foundation.Motion.animateOut(_this.$overlay, 'fadeOut', function(){
          console.log('all done closing sir');
        });
      }
    });
  };

  Reveal.prototype._extraHandlers = function(){
    var _this = this;
    if(!this.options.overlay && this.options.closeOnClick){
      this.$element.on('click.zf.reveal', function(e){
        e.preventDefault();
        return false;
      });
      $('body').on('click.zf.reveal', function(e){
        // if(_this.isActive){
          _this.close();
        // }
        // return false;
      });
    }

    if(this.options.closeOnEsc){
      $(window).on('keyup.zf.reveal', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.which === 27){
          _this.close();
        }
      });
    }
  };

  Reveal.prototype.close = function(){
    if(!this.isActive){
      return false;
    }
    var _this = this;

    if(this.options.animationOut){
      this.animationClose();
    }else{
      this.noAnimationClose();
    }

    // if(this.options.animationOut){
    //   clearTimeout(this.timer);
    //   this.timer = setTimeout(function(){
    //     Foundation.Motion.animateOut(_this.$element, _this.options.animationOut, function(){
    //       clearTimeout(_this.timer);
    //     });
    //   }, this.options.animationOutDelay);
    // }else{
    //   this.$element.fadeOut(this.options.animationOutDelay).attr({'aria-hidden': true}).css({'height': '', 'width': ''});
    // }



    //conditionals to remove extra event listeners added on open
    if(this.options.closeOnEsc){
      $(window).off('keyup.zf.reveal');
    }
    if(!this.options.overlay && this.options.closeOnClick){
      $('body').off('click.zf.reveal');
    }

    //if the modal changed size, reset it
    if(this.changedSize){
      this.$element.css({
        'height': this.options.height,
        'width': this.options.width
      });
    }

    $('body').removeClass('is-reveal-open').attr({'aria-hidden': false});

    this.isActive = false;
    this.$element.trigger('close.zf.reveal');
  };


  Reveal.prototype.toggle = function(){
    if(this.isActive){
      this.close();
    }else{
      this.open();
    }
  };
  Foundation.plugin(Reveal);

  // // Exports for AMD/Browserify
  // if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
  //   module.exports = Reveal;
  // if (typeof define === 'function')
  //   define(['foundation'], function() {
  //     return Reveal;
  //   });
  //
}(Foundation, jQuery);
