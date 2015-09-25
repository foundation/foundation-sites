!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Reveal.
   * @class
   * @fires Reveal#init
   * @param {Object} element - jQuery object to use for the modal.
   */

  function Reveal(element) {
    this.$element = element;
    this.options = $.extend({}, Reveal.defaults, this.$element.data());
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Reveal#init
     */
    this.$element.trigger('init.zf.reveal');
  }

  Reveal.defaults = {
    animationIn: '',
    animationOut: '',
    showDelay: 0,
    hideDelay: 0,
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

  /**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */
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
      this.$overlay = this._makeOverlay(this.id);
    }

    this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'aria-labelledby': anchorId,
        'data-yeti-box': this.id
    });

    if(this.options.closeBtn || this.options.fullScreen){
      this.$closeBtn = this._makeButton();
      this.$element.append(this.$closeBtn);
    }

    this.options.height = this.$element.outerHeight();
    this.options.width = this.$element.outerWidth();

    this._events();
  };

  /**
   * Creates an overlay div to display behind the modal.
   * @private
   */
  Reveal.prototype._makeOverlay = function(id){
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

  /**
   * Creates a button to display in the top-right corner of the modal.
   * @private
   */
  Reveal.prototype._makeButton = function(){
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
  /**
   * Adds event handlers for the modal.
   * @private
   */
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
      this.$closeBtn.on('click.zf.reveal mouseup.zf.reveal tap.zf.reveal touchend.zf.reveal', this.close.bind(this));
    }
  };
  /**
   * Sets the position of the modal before opening
   * @param {Function} cb - a callback function to execute when positioning is complete.
   * @private
   */
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

  /**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @fires Reveal#closeAll
   * @fires Reveal#open
   */
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
                   .css({'visibility': ''});
      if(!_this.options.multiOpened){
        /**
         * Fires immediately before the modal opens.
         * Closes any other modals that are currently open
         * @event Reveal#closeAll
         */
        _this.$element.trigger('closeme.zf.reveal', _this.id);
      }
      if(_this.options.animationIn){
        if(_this.options.overlay){
          Foundation.Motion.animateIn(_this.$overlay, 'fadeIn', function(){
            Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
            });
          });
        }else{
          Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
          });
        }
      }else{
        if(_this.options.overlay){
          _this.$overlay.show(0, function(){
            _this.$element.show(_this.options.showDelay, function(){
            });
          });
        }else{
          _this.$element.show(_this.options.showDelay, function(){
          });
        }
      }
    });
    this.$element.attr({'aria-hidden': false})
    /**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */
                 .trigger('open.zf.reveal');

    $('body').addClass('is-reveal-open')
             .attr({'aria-hidden': (this.options.overlay || this.options.fullScreen) ? true : false});
    setTimeout(function(){
      _this._extraHandlers();
      Foundation.reflow();
    }, 0);
  };

  /**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */
  Reveal.prototype._extraHandlers = function(){
    var _this = this;
    if(!this.options.overlay && this.options.closeOnClick){
      this.$element.on('click.zf.reveal', function(e){
        e.preventDefault();
        return false;
      });
      $('body').on('click.zf.reveal', function(e){
          _this.close();
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

  /**
   * Closes the modal
   * @fires Reveal#close
   */
  Reveal.prototype.close = function(){
    if(!this.isActive){
      return false;
    }
    var _this = this;

    if(this.options.animationOut){
      Foundation.Motion.animateOut(this.$element, this.options.animationOut, function(){
        if(_this.options.overlay){
          Foundation.Motion.animateOut(_this.$overlay, 'fadeOut', function(){
          });
        }
      });
    }else{
      this.$element.hide(_this.options.hideDelay, function(){
        if(_this.options.overlay){
          _this.$overlay.hide(0, function(){
          });
        }
      });
    }
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
    this.$element.attr({'aria-hidden': true})
    /**
     * Fires when the modal is done closing.
     * @event Reveal#close
     */
                 .trigger('close.zf.reveal');
  };

  Reveal.prototype.toggle = function(){
    if(this.isActive){
      this.close();
    }else{
      this.open();
    }
  };

  /**
   * Destroys an instance of a modal.
   * @fires Reveal#destroyed
   */
  Reveal.prototype.destroy = function() {
    if(this.options.overlay){
      this.$overlay.hide().off();
    }
    this.$element.hide();
    this.$anchor.off();

    /**
     * Fires when the plugin has been destroyed.
     * @event Reveal#destroyed
     */
    this.$element.trigger('destroyed.zf.reveal');
  }

  Foundation.plugin(Reveal);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Reveal;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Reveal;
    });

}(Foundation, jQuery);
