!function($, Foundation, window){
  'use strict';

  /**
   * Creates a new instance of a sticky thing.
   * @class
   * @fires Sticky#init
   * @param {jQuery} element - jQuery object to make sticky.
   */
  function Sticky(element){
    this.$element = element;
    this.options = $.extend({}, Sticky.defaults, this.$element.data());
    if(Foundation.MediaQuery.atLeast(this.options.stickyOn)){
      this._init();
    }

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Sticky#init
     */
    this.$element.trigger('init.zf.sticky');
  }


  Sticky.defaults = {
    stickToWindow: false,
    container: '<div></div>',
    stickTo: 'top',
    breakAt: '',
    stickAt: '',
    debounce: 150,
    marginTop: 1,
    marginBottom: 1,
    stickyOn: 'medium',
    watchResize: true
  };

  /**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @private
   */
  Sticky.prototype._init = function(){
    var _this = this;

    this.$container = this.$element.parents('[data-sticky-container]').length ? this.$element.parents('[data-sticky-container]') : $(this.options.container);
    this.$element.addClass('sticky');
    // this.$element.wrap(this.$container);
    this.$container.addClass('sticky-container');
    this.$anchor = $(this.options.stickAt).length ? $(this.options.stickAt) : $('body');
    if(this.options.watchResize){
      this.$element.attr('data-resize', Foundation.GetYoDigits(6, 'sticky'));
      // this.$element.data('resize', Foundation.GetYoDigits(6, 'sticky'));
      // console.log($('[data-resize]'));
    }

    this.getDimensions();
    this.setContainerSize();
    this.setElementAttr();
    this.setBreakPoints();

    this._events();
  };

  /**
   * Adds event handlers for the scrolling element.
   * TODO set this within the Foundation.util.triggers api so there's only one global listener
   * @private
   */
  Sticky.prototype._events = function(){
    var _this = this,
        $window = $(window);
    this.$element.on('resizeme.zf.trigger', this.doThings.bind(this));

    $window.on('scroll.zf.sticky', function(e){
      e.stopPropagation();
      _this.timer = setTimeout(function(){
        var scroll = $window.scrollTop();

        if(_this.options.stickTo === 'bottom'){
          if((scroll + _this.$anchorDims.windowDims.height >= _this.start) && (scroll + _this.$elemDims.windowDims.height <= _this.end)){//between bottom & top breakpoint
            _this.$element.removeClass('anchored').addClass('stuck bottom').css({'marginBottom': _this.options.marginBottom + 'em', 'bottom': 0, 'top': 'auto'})
          }

          if(_this.$element.offset().top + _this.$elemDims.height + (_this.options.marginBottom * _this.fontSize) >= _this.end){//hits bottom breakpoint
            _this.$element.removeClass('stuck').addClass('anchored')
            .css({
              'marginBottom': 0,
              'top':(_this.$anchorDims.height  - _this.$elemDims.height)
            });
          }

          if(scroll + _this.$anchorDims.windowDims.height <= _this.start){
            _this.$element.addClass('anchored bottom').removeClass('stuck').css('marginBottom', 0);
          }
        }

        else if(_this.options.stickTo === 'top'){
          if(scroll >= _this.start && scroll <= _this.end){//in between breakpoints, sticky top
              _this.$element.addClass('stuck top').removeClass('anchored bottom').css({'marginTop': _this.options.marginTop + 'em', 'top': 0});
          }
          if(scroll <= _this.start){//start at page load, + what to do when scrolling to top
            _this.$element.addClass('anchored top').removeClass('stuck').css('marginTop', 0)/*.css('marginTop', _this.options.marginTop + 'em')*/;
          }
          if(scroll >= _this.end){//bottom edge and stop
            _this.$element.removeClass('stuck top')
                  .addClass('anchored bottom')
                  .css({
                    'marginTop': 0,
                    'top': _this.end - (_this.$container.offset().top) + (_this.options.marginBottom * _this.fontSize) + 'px'
                  });
                  // console.log('end', _this.end, 'height', _this.$elemDims.height, '\ntotal', (_this.end - _this.$elemDims.height) - 32);
          }
        }

        /**
         * TODO break these different scroll options into separate methods
         * TODO create sticky-at='both' method
         */
        else{//both top & bottom sticky
          //stick to top on scrolldown from top, stick to bottom on scrollup from bottom
        }


      }, _this.options.debounce)
    });
  };

  //*********************************************************************
  /**
   * Fires several functions after resize events and on _init
   * @private
   */
  Sticky.prototype.doThings = function(){
    this.getDimensions();
    this.setContainerSize();
    this.setElementAttr();
    this.setBreakPoints();
  };
  /**
   * Sets top and bottom break points for sticky element.
   * @private
   */
  Sticky.prototype.setBreakPoints = function(){
    this.fontSize = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0], null).fontSize.split('px'), 10);
    this.styles = window.getComputedStyle(this.$element[0], null);
    this.start = this.options.stickTo === 'bottom' ? this.$anchorDims.offset.top + this.$elemDims.height + (this.options.marginBottom * this.fontSize) : this.$anchorDims.offset.top - (this.options.marginTop * this.fontSize);
    // this.start = this.$anchorDims.offset.top - parseFloat(this.styles.marginTop.split('px'));
    this.end = this.options.breakAt ? '' : this.$anchorDims.offset.top + this.$anchorDims.height  - (this.options.marginBottom * this.fontSize) - (this.options.marginTop * this.fontSize) - this.$elemDims.height;
    if(this.options.stickTo === 'bottom'){
      this.end = this.$anchorDims.offset.top + this.$anchorDims.height + (this.options.marginBottom * this.fontSize);
    }
  };
  /**
   * Gets the dimensions for the sticky element and it's anchor
   * @private
   */
  Sticky.prototype.getDimensions = function(){
    this.$element.css({'max-width': '', 'max-height': ''});
    this.$elemDims = Foundation.GetDimensions(this.$element);
    this.$anchorDims = Foundation.GetDimensions(this.$anchor);
  };
  /**
   * Sets the sticky element's max-width to prevent resize on position: fixed;
   * @private
   */
  Sticky.prototype.setElementAttr = function(){
    this.$element/*.offset({'top': this.$container.offset().top})*/
        .css({'max-width': this.$elemDims.width/*, 'min-height': this.$elemDims.height*/});
  };
  /**
   * Sets the sticky element's container min-height to match that of the element's height to prevent alignment issues on position: fixed;
   * @private
   */
  Sticky.prototype.setContainerSize = function(){
    this.$container.css({'min-height': this.$elemDims.height});
  };
  //*********************************************************************
  Foundation.plugin(Sticky);
}(jQuery, window.Foundation, window);
