!function($, document, Foundation){
  'use strict';

  function Tooltip(element, options){
    this.$element = element;
    this.options = $.extend({}, this.defaults, options || {});
    this.isActive = false;
    this.isClick = false;
    this._init();
  }

  Tooltip.prototype.defaults = {
    disableForTouch: false,
    hoverDelay: 200,
    fadeInDuration: 150,
    fadeOutDuration: 150,
    disableHover: true,
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
    });

    //helper variables to track movement on collisions
    this.usedPositions = [];
    this.counter = 4;
    this.classChanged = false;

    this._events();

    this.$element.trigger('init.zf.tooltip');
  };

  Tooltip.prototype.getPositionClass = function(element){
    var position = element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };

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

  Tooltip.prototype._show = function(){
    if(this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)){
      console.log('too small1');
      return false;
    }

    var _this = this;
    this.template.css('visibility', 'hidden').show();
    this.setPosition();

    this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));


    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    _this.isActive = true;
    // console.log(this.setPosition());
    this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function(){
      //maybe do stuff?
    });
  };



  // Tooltip.prototype.hideAll = function(){
  //   var _this = this;
  //
  //   $('[data-is-active]', this.tooltipClass).each(function(){
  //     Tooltip._hide(_this.template, _this);
  //     // this._hide();
  //     // $(this).fadeOut(_this.options.fadeOutDuration);
  //   });
  //   // $(document).find('[data-is-active]', this.tooltipClass).each(function(){
  //   //   $(this).fadeOut(_this.options.fadeOutDuration);
  //   // });
  // };
  //
  // Tooltip._hide = function($elem, _this){
  //   $elem.stop().attr({
  //     'aria-hidden': true,
  //     'data-is-active': false
  //   }).fadeOut(_this.options.fadeOutDuration, function(){
  //     _this.isActive = false;
  //     _this.isClick = false;
  //   });
  // };

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

  };

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
          // Tooltip._hide($template, _this);
        }
      });
    }

    if(!this.options.disableForTouch){
      this.$element
      .on('tap.zf.tooltip touchend.zf.tooltip', function(e){
        _this.isActive ? _this._hide() : _this._show();
      });
    }

    this.$element.on('toggle.zf.trigger', this.toggle.bind(this))
                                                  // .on('mousedown.zf.tooltip', function(e){
                                                  //   _this.isActive ? _this._hide() : _this._show();
                                                  //   // e.stopPropagation();
                                                  //   // if(_this.isActive && isFocus && !_this.isClick){
                                                  //   //   _this._hide();
                                                  //   // }
                                                  //   // if(_this.options.clickOpen){
                                                  //   //   isFocus = true;
                                                  //   //   _this._show();
                                                  //   // }
                                                  //   _this.isClick = true;
                                                  // });

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
      });
  };
  Tooltip.prototype.toggle = function(){
    if(this.isActive){
      this._hide();
    }else{
      this._show();
    }
  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Foundation.plugin(Tooltip);
}(jQuery, window.document, window.Foundation);
