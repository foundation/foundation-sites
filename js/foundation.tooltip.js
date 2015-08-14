!function($, document, Foundation){
  'use strict';
  function Tooltip(element, options){
    this.$element = element;
    this.options = $.extend({}, this.defaults, options || {});
    this.isActive = false;
    this._init();
    console.log(options);
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
    clickOpen: false
  };

  Tooltip.prototype._init = function(){
    this.template = this.template ? this.template : this.buildTemplate();
    // $this.append(this.template);
    this.$element.append(this.template);
    this.$element.attr('title', '')
    // this.$element.append(this.template).attr('title', '');

    this._events();
  };
  Tooltip.prototype.buildTemplate = function(){
    this.options.templateClasses = this.options.tooltipClass + (this.getPositionClass() || '');

    return $('<div></div>').addClass(this.options.templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false
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


    Foundation.ImNotTouchingYou(this.template, direction, param);
    console.log(Foundation.ImNotTouchingYou(this.template, direction, param));

    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    this.template.stop().fadeIn(this.options.fadeInDuration, function(){
      _this.isActive = true;
    });
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
    this.template.stop().fadeOut(this.options.fadeOutDuration).attr({
      'aria-hidden': true,
      'data-is-active': false
    });

    this.isActive = false;
  };

  Tooltip.prototype._events = function($tipRoot){
    var _this = this;
    var isClick = false;
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
        if(!isFocus || (!isClick && _this.options.clickOpen)){
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
    .on('click.zf.tooltip', function(e){
      if(isClick && _this.isActive){
        _this._hide();
        isClick = false;
      }else if(isFocus){
        isClick = true;
        if(_this.options.clickOpen){
          _this._show();
        }
      }
    });

    this.$element
    .on('focus.zf.tooltip', function(e){
      isFocus = true;
      if((isClick && _this.isActive) || (!_this.options.clickOpen && isClick)){
        return;
      }else{
        _this._show();
      }
      isClick = false;
    })

    .on('focusout.zf.tooltip', function(e){
      isFocus = false;
      _this._hide();
    });
  };

  Foundation.plugin(Tooltip);
}(jQuery, window.document, window.Foundation);
