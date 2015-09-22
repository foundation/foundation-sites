!function(){
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
    debounce: 150
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

    $(window).on('scroll', function(e){
      setTimeout(function(){
        var scroll = $(window).scrollTop();
        // if(scroll >= _this.$anchorDims.offset.top){
        //   _this.$element.addClass('stuck top').removeClass('anchored bottom').css('top', 0);
        // }
        if(scroll + _this.$element.height() >= _this.$anchorDims.offset.top + _this.$anchorDims.height){
          _this.$element.removeClass('stuck').addClass('anchored bottom')
          .css('top', 1064 - 213 + 'px');
          // .css({'top': _this.$anchorDims.height + _this.$anchorDims.offset.top - size.height * 2});
        }
        if(scroll <= _this.$anchorDims.offset.top){
          _this.$element.addClass('anchored top').removeClass('stuck');
        }
      }, 150);
    });
  };
  Sticky.prototype._events = function(){
    var _this = this;
    $(window).on('scroll.zf.sticky', function(e){
      _this.timer = setTimeout(function(){
        var scroll = $(window).scrollTop();
        console.log(scroll);
        if(scroll >= _this.start){
          _this.$element.addClass('stuck top').removeClass('anchored bottom')/*.css('top', 0)*/;
        }
        // if(scroll){}
      }, _this.options.debounce)
    });
  };

  //*********************************************************************
  Sticky.prototype.setBreakPoints = function(){
    var styles = window.getComputedStyle(this.$element[0], null);
    this.start = this.$anchorDims.offset.top - parseFloat(styles.marginTop.split('px'));
    this.end = this.options.breakAt ? '' : this.$anchorDims.offset.top + this.$anchorDims.height;
    console.log(this.start, this.end);
  };
  Sticky.prototype.getDimensions = function(){
    this.$elemDims = Foundation.GetDimensions(this.$element);
    this.$anchorDims = Foundation.GetDimensions(this.$anchor);
  };
  Sticky.prototype.setElementAttr = function(){
    this.$element.offset({'top': this.$container.offset().top})
        .css({'max-width': this.$elemDims.width, 'min-height': this.$elemDims.height});
  };
  Sticky.prototype.setContainerSize = function(){
    this.$container.css({'min-height': this.$elemDims.height});
  };
  //*********************************************************************
  Foundation.plugin(Sticky);
}(jQuery, window.Foundation);
