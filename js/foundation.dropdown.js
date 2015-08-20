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
    disableHover: true,
    dropdownClass: 'dropdown-pane',
    vOffset: 1,
    hOffset: 1,
    positionClass: ''
  };

  Dropdown.prototype._init = function(){
    var $id = this.$element.attr('id');

    this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]');
    this.$anchor.attr({'aria-controls': $id, 'data-is-focus': 'false'});

    this.options.positionClass = this.getPositionClass();
    this.counter = 4;
    this.usedPositions = [];
    this.$element.attr({
      'aria-hidden': 'true'
    }).hide();

    this._events();
  };

  Dropdown.prototype.getPositionClass = function(){
    var position = this.$element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };

  Dropdown.prototype.reposition = function(){
    var positions = ['bottom', 'top', 'left', 'right'],
        position = this.getPositionClass();

    if(((this.usedPositions.indexOf('left') > -1) || (this.usedPositions.indexOf('right') > -1)) && (position === 'left' || 'right')){
      console.log('yippee');
      this.$element.removeClass(position)
          .addClass('top');

    }

    if(!position && this.usedPositions.indexOf('bottom') < 0){
      this.$element.addClass('top');
      this.usedPositions.push('bottom');

    }else if(this.usedPositions.indexOf(position) < 0){
      if(position === 'left'){

        this.$element.removeClass('left')
            .addClass('right');
        this.usedPositions.push('left');

      }else if(position === 'right'){

        this.$element.removeClass('right')
            .addClass('left');
        this.usedPositions.push('right');

      }else if(position === 'top'){

        this.$element.removeClass('top');
        this.usedPositions.push('top')
      }

    }
    // else if(this.usedPositions.indexOf('left') > -1 && this.usedPositions.indexOf('right') > -1){
    //   this.$element.removeClass(position)
    //       .addClass('top');
    //
    // }
    else if(this.usedPositions.indexOf('top') > -1 && this.usedPositions.indexOf('bottom') > -1){

      if(position){
        this.$element.removeClass(position);
      }
      this.$element.addClass('left');

    }else{
      this.$element.removeClass(position);
    }
    this.classChanged = true;
    this.counter--;
    console.log('attempting to move ' + this.counter, '\nused positions', this.usedPositions);
    // this.setPosition();
  };

  Dropdown.prototype.setPosition = function(){
    var position = this.getPositionClass(),
        $eleDims = Foundation.GetDimensions(this.$element),
        $anchorDims = Foundation.GetDimensions(this.$anchor),
        _this = this,
        direction = (position === 'left' ? 'left' : ((position === 'right') ? 'left' : 'top')),
        param = (direction === 'top') ? 'height' : 'width',
        offset = (param === 'height') ? this.options.vOffset : this.options.hOffset;

    this.$element.offset(getOffsets());

    while(!Foundation.ImNotTouchingYou(this.$element, direction, param, position, offset, this.$anchor && this.counter)){
      this.reposition();
      this.setPosition();
    }

    // if(!this.counter){
    //   //set to default down position
    //   this.$element.removeClass(position);
    //   this.classChanged = true;
    //   this.setPosition();
    // }

    // if(!Foundation.ImNotTouchingYou(this.$element, direction, param, position, offset, this.$anchor)){
    //   if(position === 'top'){
    //     this.$element.removeClass('top');
    //   }else if(!position){
    //     this.$element.addClass('top');
    //   }else if(position === 'left'){
    //     this.$element.removeClass('left')
    //         .addClass('right');
    //   }else if(position === 'right'){
    //     this.$element.removeClass('right')
    //         .addClass('left');
    //   }
    //   this.classChanged = true;
    //   this.setPosition();
    // }

    function getOffsets(){
      switch(position){
        case 'top':
          return {
            left: $anchorDims.offset.left,
            top: $anchorDims.offset.top - ($eleDims.height + _this.options.vOffset)
          };
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
  };

  Dropdown.prototype._events = function(){
    // console.log('events activate!')
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });
    if(!this.options.disableHover){
      this.$anchor.on('mouseenter.zf.dropdown mouseleave.zf.dropdown', this.toggle.bind(this));
    }
  };

  Dropdown.prototype.open = function(){
    this.$element.show();
    this.setPosition();
    this.$element.addClass(this.options.activeClass)
        .attr('aria-hidden', 'false');
  };

  Dropdown.prototype.close = function(){
    this.$element.removeClass(this.options.activeClass)
        .attr('aria-hidden', 'true');

    if(this.classChanged){
      var curPositionClass = this.getPositionClass();

      if(curPositionClass){
        this.$element.removeClass(curPositionClass);
      }

      this.$element.addClass(this.options.positionClass)
          .hide();

      this.classChanged = false;
      this.counter = 4;
      this.usedPositions.length = 0;
    }
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
