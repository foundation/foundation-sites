!function($, Foundation){
  'use strict';

/*
NEEDS:
  to add event emitter to close all other open dropdowns
  aria testing
  add global event listener for dropdowns, tooltips, modals, and whatever else will need to close all other items

*/


  function Dropdown(element){
    this.$element = element;
    this.options = $.extend({}, Dropdown.defaults, this.$element.data());
    this._init();
  }

  Dropdown.defaults = {
    activeClass: 'is-open',
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
    this.$anchor.attr({'aria-controls': $id, 'data-is-focus': 'false', 'data-yeti-box': $id});

    this.options.positionClass = this.getPositionClass();
    this.counter = 4;
    this.usedPositions = [];
    this.$element.attr({
      'aria-hidden': 'true',
      'data-yeti-box': $id
    }).hide();
    this._events();
    this.$element.trigger('init.zf.dropdown');
  };

  Dropdown.prototype.getPositionClass = function(){
    var position = this.$element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };

  Dropdown.prototype.reposition = function(position){
    this.usedPositions.push(position ? position : 'bottom');
    //default, try switching to opposite side
    if(!position && (this.usedPositions.indexOf('top') < 0)){
      this.$element.addClass('top');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }else if(position === 'left' && (this.usedPositions.indexOf('right') < 0)){
      this.$element.removeClass(position)
          .addClass('right');
    }else if(position === 'right' && (this.usedPositions.indexOf('left') < 0)){
      this.$element.removeClass(position)
          .addClass('left');
    }

    //if default change didn't work, try bottom or left first
    else if(!position && (this.usedPositions.indexOf('top') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.$element.addClass('left');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.$element.removeClass(position)
          .addClass('left');
    }else if(position === 'left' && (this.usedPositions.indexOf('right') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }else if(position === 'right' && (this.usedPositions.indexOf('left') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }
    //if nothing cleared, set to bottom
    else{
      this.$element.removeClass(position);
    }
    this.classChanged = true;
    this.counter--;
  };

  Dropdown.prototype.setPosition = function(){
    var position = this.getPositionClass(),
        $eleDims = Foundation.GetDimensions(this.$element),
        $anchorDims = Foundation.GetDimensions(this.$anchor),
        _this = this,
        direction = (position === 'left' ? 'left' : ((position === 'right') ? 'left' : 'top')),
        param = (direction === 'top') ? 'height' : 'width',
        offset = (param === 'height') ? this.options.vOffset : this.options.hOffset;

    // console.log($eleDims.width >= $eleDims.windowDims.width);
    if(($eleDims.width >= $eleDims.windowDims.width) || (!this.counter && !Foundation.ImNotTouchingYou(this.$element))){
      this.$element.offset(Foundation.GetOffsets(this.$element, this.$anchor, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
        'width': $eleDims.windowDims.width - (this.options.hOffset * 2),
        'height': 'auto',
      });
      return false;
    }

    this.$element.offset(Foundation.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));

    while(!Foundation.ImNotTouchingYou(this.$element) && this.counter){
      this.reposition(position);
      this.setPosition();
    }
  };

  Dropdown.prototype._events = function(){
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'closeme.zf.trigger': this.close.bind(this)
    });
    this.$element.on('close.zf.trigger', function(){
      console.log('hello', this);
    });
    if(!this.options.disableHover){
      clearTimeout(_this.timeout);
      this.$anchor.on('mouseenter.zf.dropdown mouseleave.zf.dropdown', function(){
        _this.timeOut = setTimeout(function(){
          _this.toggle();
        }, _this.options.hoverDelay);
      });
    }
  };

  Dropdown.prototype.open = function(){
    // $(document).trigger('click.zf.trigger'/*, $('[data-yeti-box]')*/);
    this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
    var _this = this;
    this.$element.show();
    this.setPosition();
    this.$element.addClass(this.options.activeClass)
        .attr('aria-hidden', 'false');
    this.$anchor.addClass('hover');

    //why does this not work correctly for this plugin?
    // Foundation.reflow(this.$element, 'dropdown');
    // this.$element.foundation();
    Foundation.reflow();
  };


  Dropdown.prototype.close = function(){
    if(!this.$element.hasClass(this.options.activeClass)){
      return false;
    }
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
