!function($, document, Foundation){
  'use strict';
  var c = console;
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
    disableHover: false,
    templateClasses: '',
    tooltipClass: 'tooltip',
    showOn: 'all',
    template: '',
    tipText: '',
    touchCloseText: 'Tap to close.',
    clickOpen: true
  };

  Tooltip.prototype._init = function(){
    var elemId = this.$element.attr('aria-describedby') || randomIdGen(6);
    // this.template = this.template ? this.template : this.buildTemplate(elemId);
    this.template = this.template || this.buildTemplate(elemId);
    this.$element.append(this.template);
    this.$element.attr({'title': '', 'aria-describedby': elemId})
    // this.$element.append(this.template).attr('title', '');
    // console.log(elemId);
    this._events();
  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Tooltip.prototype.buildTemplate = function(id){
    this.options.templateClasses = this.options.tooltipClass + this.getPositionClass();

    // return
    var $template =  $('<div></div>').addClass(this.options.templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false,
      'data-is-focus': false,
      'id': id
    }).text(this.$element.attr('title'));
    //.hide();

    //experimental
    var prevCss = $template.attr('style');

    $template.css({
      position: 'absolute',
      visibility: 'hidden',
      display: 'block'
    });
    // var dims = {width: $template.outerWidth(), height: $template.outerHeight()};
    // console.log(dims);
    return $template.attr('style', prevCss ? prevCss : '').hide();
    //.hide();
  };

  Tooltip.prototype.getPositionClass = function(){
    var position = this.$element.data('position');
    // this.posClass = ' ' + position || '';
    this.posClass = position ? position : '';
    // return position ? ' ' + position : '';
    return this.posClass;
  };

  Tooltip.prototype._show = function(){
    c.log(this.options.showOn);
    if(this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)){
      return;
    }

    var _this = this,
        dir = this.template.attr('class').match(/top|right|left/g),
        direction = dir ? (dir[0] === ('left' || 'right') ? 'left' : 'top') : 'top',
        param = (direction === 'top') ? 'height' : 'width';

    this.hideAll();

    var isNotClear = Foundation.ImNotTouchingYou(this.template, direction, param);
     console.log(isNotClear);
    if(isNotClear){
      this.clearEdge();
    }

    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    console.log(this.setPosition());
    this.template.stop().css(this.setPosition()).fadeIn(this.options.fadeInDuration, function(){
      _this.isActive = true;
    });
  };

  Tooltip.prototype.clearEdge = function(){
    var dirClass = this.template.attr('class').match(/top|right|left/g),
          dirClass = dirClass ? dirClass[0] : '';
    if(!dirClass){
      this.template.addClass('top');
    }else if(dirClass === 'left'){
      this.template.removeClass('left').addClass('right');
    }else if(dirClass === 'right'){
      this.template.removeClass('right').addClass('left');
    }else{
      this.template.removeClass('top');
    }
  };

  Tooltip.prototype.setPosition = function(){
    var dir = this.template.attr('class').match(/top|right|left/g);
    dir = dir ? dir[0] : null;
    var elemHeight = Math.floor(this.$element.outerHeight());

    // console.log('elem height',elemHeight, '\ntip height', this.template.outerHeight());
    var vSize = Math.floor(this.template.outerHeight() / this.$element.outerHeight());
    var hSize = Math.floor(this.template.outerWidth() / this.$element.outerWidth());
    switch(dir){
      case 'top':
        return {'top': (Math.floor(-(100 * (vSize + 1)))).toString() + '%'};
      break;
      case 'left':
      return {'left': '-420%', 'top': '-35%'};
        // return {'left': (Math.floor(-(100 *(hSize + 1.25)))).toString() + '%',
      /*'top': (Math.floor(0 - (elemHeight / 2))).toString() + '%'*/
                // 'top': '-' + elemHeight / 4 + 'px'};
      break;
      case 'right':
      return { 'left': '120%', 'top': '-262.5%'};
        // return {'left': (Math.floor(100 *(hSize + 1.25))).toString() + '%', 'top': /*(Math.floor(elemHeight / 2)).toString() + '%'*/'-' + elemHeight * 2.5 + 'px'}
      default:
        return {};

    }

  };

  Tooltip.prototype.hideAll = function(){
    var _this = this;

    $('[data-is-active]', this.tooltipClass).each(function(){
      Tooltip._hide(_this.template, _this);
      // this._hide();
      // $(this).fadeOut(_this.options.fadeOutDuration);
    });
    // $(document).find('[data-is-active]', this.tooltipClass).each(function(){
    //   $(this).fadeOut(_this.options.fadeOutDuration);
    // });
  };

  Tooltip._hide = function($elem, _this){
    $elem.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(_this.options.fadeOutDuration, function(){
      _this.isActive = false;
      _this.isClick = false;
    });
  };

  Tooltip.prototype._hide = function(){
    var _this = this;
    this.template.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(this.options.fadeOutDuration, function(){
      _this.isActive = false;
      _this.isClick = false;
    }).attr('class', '').addClass(_this.options.templateClasses);
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

    this.$element
    .on('mousedown.zf.tooltip', function(e){
      _this.isActive ? _this._hide() : _this._show();
      // e.stopPropagation();
      // if(_this.isActive && isFocus && !_this.isClick){
      //   _this._hide();
      // }
      // if(_this.options.clickOpen){
      //   isFocus = true;
      //   _this._show();
      // }
      _this.isClick = true;
    });

    this.$element
    .on('focus.zf.tooltip', function(e){
      isFocus = true;
      if(_this.isClick){
        return;
      }else{
        _this._show();
      }
    })

    .on('focusout.zf.tooltip', function(e){
      isFocus = false;
      _this.isClick = false;
      _this._hide();
    });
  };

  Foundation.plugin(Tooltip);
}(jQuery, window.document, window.Foundation);
