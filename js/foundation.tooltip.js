!function($, document, Foundation){
  'use strict';
  function Tooltip(element, options){
    this.$element = element;
    this.options = $.extend({}, this.defaults, options || {});
    this.isActive = false;
    this.isClick = false;
    this._init();
    console.log(options);
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
    var elemId = this.$element.attr('aria-describedby') ? this.$element.attr('aria-describedby') : randomIdGen(6);
    this.template = this.template ? this.template : this.buildTemplate(elemId);
    this.$element.append(this.template);
    this.$element.attr({'title': '', 'aria-describedby': elemId})
    // this.$element.append(this.template).attr('title', '');
    console.log(elemId);
    this._events();
  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Tooltip.prototype.buildTemplate = function(id){
    this.options.templateClasses = this.options.tooltipClass + (this.getPositionClass() || '');

    return $('<div></div>').addClass(this.options.templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false,
      'id': id
    }).text(this.$element.attr('title')).hide();
  };

  Tooltip.prototype.getPositionClass = function(){
    var position = this.$element.data('position');
    return position ? ' ' + position : '';
  };

  Tooltip.prototype._show = function(){
    if(this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)){
      return;
    }

    var _this = this,
        dir = this.template.attr('class').match(/top|right|left/g),
        direction = dir ? dir[0] : 'top',
        param = (direction === 'top') ? 'height' : 'width';

    this.hideAll();

    var clear = Foundation.ImNotTouchingYou(this.template, direction, param);
    console.log(clear);
    if(!clear){
      this.clearEdge();
    }

    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    this.template.stop().fadeIn(this.options.fadeInDuration, function(){
      _this.isActive = true;
    });
  };

  Tooltip.prototype.clearEdge = function(){

  };

  Tooltip.prototype.hideAll = function(){
    var _this = this;
    $('[data-is-active]', this.tooltipClass).each(function(){
      $(this).fadeOut(_this.options.fadeOutDuration);
    });
    // $(document).find('[data-is-active]', this.tooltipClass).each(function(){
    //   $(this).fadeOut(_this.options.fadeOutDuration);
    // });
  };

  Tooltip.prototype._hide = function(){
    var _this = this;
    this.template.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(this.options.fadeOutDuration, function(){
      _this.isActive = false;
      _this.isClick = false;
    });
  };

  Tooltip.prototype._events = function($tipRoot){
    var _this = this;
    var isFocus = false;
    // setInterval(function(){
    //   console.log('active', _this.isActive, '\nclick', _this.isClick, '\nfocus', isFocus);
    // }, 1500);


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
