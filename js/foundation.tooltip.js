!function($, document, Foundation){
  'use strict';

  /**
   * Creates a new instance of a Tooltip.
   * @class
   * @fires Tooltip#init
   * @param {jQuery} element - jQuery object to attach a tooltip to.
   */
  function Tooltip(element){
    this.$element = element;
    this.options = $.extend({}, Tooltip.defaults, this.$element.data());
    this.isActive = false;
    this.isClick = false;
    this._init();

    /**
     * Fires when the plugin has been successfully initialized
     * @event Tooltip#init
     */
    this.$element.trigger('init.zf.tooltip');
  }

  Tooltip.defaults = {
    disableForTouch: false,
    hoverDelay: 200,
    fadeInDuration: 150,
    fadeOutDuration: 150,
    disableHover: false,
    templateClasses: '',
    tooltipClass: 'tooltip',
    showOn: 'all',
    template: '',
    tipText: '',
    touchCloseText: 'Tap to close.',
    clickOpen: true,
    appendTo: 'body',
    positionClass: '',
    vOffset: 10,
    hOffset: 12
  };

  /**
   * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
   * @private
   */
  Tooltip.prototype._init = function(){
    var elemId = this.$element.attr('aria-describedby') || randomIdGen(6);

    this.options.positionClass = this.getPositionClass(this.$element);
    this.options.tipText = this.$element.attr('title');
    this.template = this.options.template ? $(this.options.template) : this.buildTemplate(elemId);

    this.template.appendTo(this.options.appendTo)
        .text(this.options.tipText)
        .hide();

    this.$element.attr({
      'title': '',
      'aria-describedby': elemId,
      'data-yeti-box': elemId,
      'data-toggle': elemId,
      'data-resize': elemId
    });

    //helper variables to track movement on collisions
    this.usedPositions = [];
    this.counter = 4;
    this.classChanged = false;

    this._events();
  };

  /**
   * Grabs the current positioning class, if present, and returns the value or an empty string.
   * @private
   */
  Tooltip.prototype.getPositionClass = function(element){
    var position = element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };
  /**
   * builds the tooltip element, adds attributes, and returns the template.
   * @private
   */
  Tooltip.prototype.buildTemplate = function(id){
    var templateClasses = (this.options.tooltipClass + ' ' + this.options.positionClass).trim();
    var $template =  $('<div></div>').addClass(templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false,
      'data-is-focus': false,
      'id': id
    });
    return $template;
  };

  /**
   * Function that gets called if a collision event is detected.
   * @param {String} position - positioning class to try
   * @private
   */
  Tooltip.prototype.reposition = function(position){
    this.usedPositions.push(position ? position : 'bottom');

    //default, try switching to opposite side
    if(!position && (this.usedPositions.indexOf('top') < 0)){
      this.template.addClass('top');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') < 0)){
      this.template.removeClass(position);
    }else if(position === 'left' && (this.usedPositions.indexOf('right') < 0)){
      this.template.removeClass(position)
          .addClass('right');
    }else if(position === 'right' && (this.usedPositions.indexOf('left') < 0)){
      this.template.removeClass(position)
          .addClass('left');
    }

    //if default change didn't work, try bottom or left first
    else if(!position && (this.usedPositions.indexOf('top') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.template.addClass('left');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.template.removeClass(position)
          .addClass('left');
    }else if(position === 'left' && (this.usedPositions.indexOf('right') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.template.removeClass(position);
    }else if(position === 'right' && (this.usedPositions.indexOf('left') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.template.removeClass(position);
    }
    //if nothing cleared, set to bottom
    else{
      this.template.removeClass(position);
    }
    this.classChanged = true;
    this.counter--;

  };

  /**
   * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
   * if the tooltip is larger than the screen width, default to full width - any user selected margin
   * @private
   */
  Tooltip.prototype.setPosition = function(){
    var position = this.getPositionClass(this.template),
        $tipDims = Foundation.GetDimensions(this.template),
        $anchorDims = Foundation.GetDimensions(this.$element),
        direction = (position === 'left' ? 'left' : ((position === 'right') ? 'left' : 'top')),
        param = (direction === 'top') ? 'height' : 'width',
        offset = (param === 'height') ? this.options.vOffset : this.options.hOffset,
        _this = this;

    if(($tipDims.width >= $tipDims.windowDims.width) || (!this.counter && !Foundation.ImNotTouchingYou(this.template))){
      this.$element.offset(Foundation.GetOffsets(this.template, this.$element, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
        'width': $eleDims.windowDims.width - (this.options.hOffset * 2),
        'height': 'auto'
      });
      return false;
    }

    this.template.offset(Foundation.GetOffsets(this.template, this.$element,'center ' + (position || 'bottom'), this.options.vOffset, this.options.hOffset));

    while(!Foundation.ImNotTouchingYou(this.template) && this.counter){
      this.reposition(position);
      this.setPosition();
    }
  };

  /**
   * reveals the tooltip, and fires an event to close any other open tooltips on the page
   * @fires Closeme#tooltip
   * @fires Tooltip#show
   * @private
   */
  Tooltip.prototype._show = function(){
    if(this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)){
      console.error('The screen is too small to display this tooltip');
      return false;
    }

    var _this = this;
    this.template.css('visibility', 'hidden').show();
    this.setPosition();

    /**
     * Fires to close all other open tooltips on the page
     * @event Closeme#tooltip
     */
    this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));


    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    _this.isActive = true;

    this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function(){
      //maybe do stuff?
    });
    /**
     * Fires when the tooltip is shown
     * @event Tooltip#show
     */
    this.$element.trigger('show.zf.tooltip');
  };

  /**
   * hides the current tooltip, and resets the positioning class if it was changed due to collision
   * @fires Tooltip#hide
   * @private
   */
  Tooltip.prototype._hide = function(){
    var _this = this;
    this.template.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(this.options.fadeOutDuration, function(){
      _this.isActive = false;
      _this.isClick = false;
      if(_this.classChanged){
        _this.template
             .removeClass(_this.getPositionClass(_this.template))
             .addClass(_this.options.positionClass);
      }
    });
    /**
     * fires when the tooltip is hidden
     * @event Tooltip#hide
     */
    this.$element.trigger('hide.zf.tooltip')
  };

  /**
   * adds event listeners for the tooltip and its anchor
   * TODO combine some of the listeners like focus and mouseenter, etc.
   * @private
   */
  Tooltip.prototype._events = function(){
    var _this = this;
    var $template = this.template;
    var isFocus = false;

    if(!this.options.disableHover){

      this.$element
      .on('mouseenter.zf.tooltip', function(e){
        if(!_this.isActive){
          _this.timeout = setTimeout(function(){
            _this._show();
          }, _this.options.hoverDelay);
        }
      })
      .on('mouseleave.zf.tooltip', function(e){
        clearTimeout(_this.timeout);
        if(!isFocus || (!_this.isClick && _this.options.clickOpen)){
          _this._hide();
        }
      });
    }

    if(!this.options.disableForTouch){
      this.$element
      .on('tap.zf.tooltip touchend.zf.tooltip', function(e){
        _this.isActive ? _this._hide() : _this._show();
      });
    }

    this.$element.on({
      'toggle.zf.trigger': this.toggle.bind(this),
      'close.zf.trigger': this._hide.bind(this)
    });

    this.$element
      .on('focus.zf.tooltip', function(e){
        isFocus = true;
        if(_this.isClick){
          return false;
        }else{
          // $(window)
          _this._show();
        }
      })

      .on('focusout.zf.tooltip', function(e){
        isFocus = false;
        _this.isClick = false;
        _this._hide();
      })

      .on('resizeme.zf.trigger', function(){
        _this.setPosition();
      });
  };
  /**
   * adds a toggle method, in addition to the static show() & hide() functions
   * @private
   */
  Tooltip.prototype.toggle = function(){
    if(this.isActive){
      this._hide();
    }else{
      this._show();
    }
  };
  /**
   * TODO use Foundation.GetYoDigits() instead.
   */
  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  /**
   * TODO create destroy method
   * TODO utilize resize event trigger
   */

  Foundation.plugin(Tooltip);
}(jQuery, window.document, window.Foundation);
