!function(Foundation, $) {
  'use strict';

  function Reveal(element) {
    this.$element = element;
    this.options = $.extend({}, Reveal.defaults, this.$element.data());
    if(this.options.animationIn){
      console.log(this.$element.data());
      console.log(this.options.animationIn, this.options.animationOut);
    }
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
    closeText: '✖',
    overlay: true
  };
  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Reveal.prototype._init = function(){
    var anchorId = randomIdGen(6);

    //************ better check for animation **************
    // this.hasAnimation = this.$element.data('toggler-animate');
    // console.log(this.hasAnimation);
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
    var btn = $('<a><i class="fi-x"></i></a>')
              .addClass('close-button')
              .attr({
                'data-toggle': this.id,
                'title': 'Close.',
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
    // $(window).on('resize.zf.reveal', function(){
    //   Foundation.util.throttle(checkStuff, 250);
    //   // var timer = setTimeout(function(){
    //   //   console.log(Foundation.MediaQuery.atLeast('medium'));
    //   // }, 250);
    // });
  // function checkStuff(){
  //   // $(window).on('resize.zf.whatever', function(){
  //     console.log(Foundation.MediaQuery.atLeast('medium'));
  //   // });
  // }
  };

  Reveal.prototype._addGlobalClickHandler = function(){
    var _this = this;
    this.$element.on('click.zf.reveal', function(e){
      e.preventDefault();
      return false;
    });
    $('body').on('click.zf.reveal', function(e){
      _this.close();
    });
  };

  Reveal.prototype._addKeyHandler = function(){
    var _this = this;
    $(window).on('keyup.zf.reveal', function(e){
      e.preventDefault();
      e.stopPropagation();
      if(e.which === 27){
        _this.close();
      }
    });
  };

  //open and close functions
  Reveal.prototype.open = function(){
    var _this = this;

    //global event emitter to close any other open modals
    this.$element.trigger('closeme.zf.reveal', this.id);

    this.isActive = true;

    //make element invisible, but remove display: none so we can get size and positioning
    this.$element
        .css({'visibility': 'hidden'})
        .show()
        .scrollTop(0);

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
    //display: none and remove visiblity attr before animation.
    this.$element.hide()
                 .css({'visibility': ''})

    if(this.options.animationIn){
      this.animateIn();
    }else{
      this.noAnimationShow()
    }

    //bring in the overlay first
    if(this.options.overlay){
      this.$overlay.fadeIn(_this.options.animationInDelay).attr({'aria-hidden': false});
      $('body').attr({'aria-hidden': true});
    }
    if(this.options.animationIn){
      this.timer = setTimeout(function(){
        Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
          clearTimeout(_this.timer);
        });
      }, 0);
    }else{
      this.$element
          .fadeIn('fast', function(){
            _this.$element.attr({'aria-hidden': false});
          });
    }
    this._extraHandlers();
    $('body').addClass('is-reveal-open');
    Foundation.reflow();
    // $.fn.foundation();
  };

  Reveal.prototype._extraHandlers = function(){
    if(!this.options.overlay && this.options.closeOnClick){
      this._addGlobalClickHandler();
    }
    if(this.options.closeOnEsc){
      this._addKeyHandler();
    }
  }

  Reveal.prototype.close = function(){
    var _this = this;
    this.isActive = false;

    if(this.options.animationOut){
      clearTimeout(this.timer);
      this.timer = setTimeout(function(){
        Foundation.Motion.animateOut(_this.$element, _this.options.animationOut, function(){
          console.log('closing', this);
          clearTimeout(_this.timer);
        });
      }, this.options.animationOutDelay);
    }else{
      this.$element.fadeOut(this.options.animationOutDelay).attr({'aria-hidden': true}).css({'height': '', 'width': ''});
    }



    //conditionals to remove extra event listeners added on open
    if(this.options.overlay){
      this.$overlay.fadeOut(this.options.animationOutDelay).attr({'aria-hidden': true});
    }
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
