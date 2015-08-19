!function($, Foundation){
  'use strict';

  function Dropdown(element, options){
    this.$element = element;
    this.options = $.extend({}, this.defaults, options || {});
    this._init();
  }

  Dropdown.prototype.defaults = {
    activeClass: 'open',
    hoverDelay: 250,
    disableHover: false,
    dropdownClass: 'dropdown-pane',
    vOffset: 1,
    hOffset: 1,
    positionClass: ''
    // defaultAction: 'toggle'
  };
  Dropdown.prototype._init = function(){
    var $id = this.$element.attr('id');

    this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]');
    this.$anchor.attr({'aria-controls': $id, 'data-is-focus': 'false'});
    this.options.positionClass = this.getPositionClass();
    console.log(this.options.positionClass);
    // console.log($('[data-toggle="' + this.$element.attr('id') + '"]'));

    this.$element.attr({
      'aria-hidden': 'true'
    });
    this._events();
  };
  Dropdown.prototype.getPositionClass = function(){
    var position = this.$element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };
  Dropdown.prototype.setPosition = function(){
    var position = this.$element.attr('class').match(/top|left|right/g),
        $eleDims = Foundation.GetDimensions(this.$element),
        $anchorDims = Foundation.GetDimensions(this.$anchor),
        _this = this;
    position = position ? position[0] : '';
    var direction = position ? (position === ('left' || 'right') ? 'left' : 'top') : 'top',
        param = (direction === 'top') ? 'height' : 'width';
    console.log('dir', direction, '\nparam', param);
    this.$element.offset(getOffsets());
    if(!Foundation.ImNotTouchingYou(this.$element, direction, param, false)){
      if(position === 'top'){
        this.$element.removeClass('top');
        this.setPosition();
      }else if(!position){
        this.$element.addClass('top');
        this.setPosition();
      }
    }
    console.log('clear?',Foundation.ImNotTouchingYou(this.$element, direction, param, false));

    function getOffsets(){
      switch(position){
        case 'top':
          // if($eleDims.offset.top >= $eleDims.windowDims.offset){
          //   _this.$element.removeClass('top');
          //   _this.setPosition();
          //   return false;
          // }
          return {left: $anchorDims.offset.left, top: $anchorDims.offset.top - ($eleDims.height + _this.options.vOffset)};
          break;
        case 'left':
          return {
            left: $anchorDims.offset.left - ($eleDims.width + _this.options.hOffset),
            top: $anchorDims.offset.top
          };
          break;
        case 'right':
          return {
            left: $anchorDims.offset.left + $anchorDims.width + _this.options.hOffset + 1,
            top: $anchorDims.offset.top
          };
          break;
        default:
          return {
            left: $anchorDims.offset.left,
            top: $anchorDims.offset.top + $anchorDims.height + _this.options.vOffset
          };
      }
    }
    // console.log('element', ele, '\nanchor', par);
    // console.log('w',this.$element.outerWidth(), '\nh', this.$element.outerHeight());
    // console.log('w',this.$anchor.outerWidth(), '\nh', this.$anchor.outerHeight(), '\noffset', this.$anchor.offset());
  };
  Dropdown.prototype._events = function(){
    // console.log('events activate!')
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });
  };
  Dropdown.prototype.open = function(){

    this.setPosition();
    this.$element.addClass(this.options.activeClass)
      .attr('aria-hidden', 'false');
  };
  Dropdown.prototype.close = function(){
    this.$element.removeClass(this.options.activeClass)
      .attr('aria-hidden', 'true');
  };
  Dropdown.prototype.toggle = function(){
    if(this.$element.hasClass(this.options.activeClass)){
      this.close();
    }else{
      this.open();
    }
  };

  Foundation.plugin(Dropdown);
}(jQuery, window.Foundation);
