!function($, Foundation, window){
  'use strict';

  function Sticky(element){
    this.$element = element;
    this.options = $.extend({}, Sticky.defaults, this.$element.data());

    this._init();
  }
  Sticky.defaults = {
    stickToWindow: false,
    container: '<div></div>',
    stickTo: 'top',
    breakAt: '',
    stickAt: '',
    debounce: 150,
    marginTop: 1,
    marginBottom: 1
  };
  Sticky.prototype._init = function(){
    var _this = this;

    this.$container = this.$element.parents('[data-sticky-container]') || this.$element.wrap($(this.options.container));
    this.$container.addClass('sticky-container');
    this.$anchor = $(this.options.stickAt) || $(window);

    this.getDimensions();
    this.setContainerSize();
    this.setElementAttr();
    this.setBreakPoints();

    this._events();
  };

  Sticky.prototype._events = function(){
    var _this = this;
    $(window).on('resize.zf.sticky', function(e){
      setTimeout(function(){
        _this.doThings();
      }, 100)
    });
    $(window).on('scroll.zf.sticky', function(e){
      _this.timer = setTimeout(function(){
        var scroll = $(window).scrollTop();

        if(_this.options.stickTo === 'bottom'){
          console.log('check',(scroll + _this.$anchorDims.windowDims.height >= _this.start), 'check this', (scroll + _this.$elemDims.windowDims.height <= _this.end), 'and this', _this.$element.offset().top + _this.$elemDims.height >= _this.end);
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
            console.log(_this.start, scroll);
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


        else{//both top & bottom sticky
          //stick to top on scrolldown, stick to bottom on scrollup from bottom
        }


      }, _this.options.debounce)
    });
  };

  //*********************************************************************
  Sticky.prototype.doThings = function(){
    this.getDimensions();
    this.setContainerSize();
    this.setElementAttr();
    this.setBreakPoints();
  };
  Sticky.prototype.setBreakPoints = function(){
    this.fontSize = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0], null).fontSize.split('px'));
    this.styles = window.getComputedStyle(this.$element[0], null);
    this.start = this.options.stickTo === 'bottom' ? this.$anchorDims.offset.top + this.$elemDims.height + (this.options.marginBottom * this.fontSize) : this.$anchorDims.offset.top - (this.options.marginTop * this.fontSize);
    // this.start = this.$anchorDims.offset.top - parseFloat(this.styles.marginTop.split('px'));
    this.end = this.options.breakAt ? '' : this.$anchorDims.offset.top + this.$anchorDims.height  - (this.options.marginBottom * this.fontSize) - (this.options.marginTop * this.fontSize) - this.$elemDims.height;
    if(this.options.stickTo === 'bottom'){
      this.end = this.$anchorDims.offset.top + this.$anchorDims.height + (this.options.marginBottom * this.fontSize);
      console.log(this.$anchorDims.offset.top + this.$anchorDims.height/* - ((this.options.marginBottom * this.fontSize) + this.$elemDims.height)*/);
    }
    console.log('start',this.start, 'end',this.end);
  };
  Sticky.prototype.getDimensions = function(){
    this.$elemDims = Foundation.GetDimensions(this.$element);
    this.$anchorDims = Foundation.GetDimensions(this.$anchor);
  };
  Sticky.prototype.setElementAttr = function(){
    this.$element/*.offset({'top': this.$container.offset().top})*/
        .css({'max-width': this.$elemDims.width/*, 'min-height': this.$elemDims.height*/});
  };
  Sticky.prototype.setContainerSize = function(){
    this.$container.css({'min-height': this.$elemDims.height});
  };
  //*********************************************************************
  Foundation.plugin(Sticky);
}(jQuery, window.Foundation, window);
