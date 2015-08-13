!function($, window, Foundation){
  'use strict';
  function Tooltip(element, options){
    this.$element = element;
    this.options = $.extend({}, this.defaults, options || {});
    // this.$parent = this.$element.parent();
    this.isActive = false;
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
    appendTo: 'body',
    showOn: 'all',
    template: '',
    tipText: '',
    touchCloseText: 'Tap to close.'
  };

  Tooltip.prototype._init = function(){
    this.template = this.template ? this.template : this.buildTemplate();

    this.$element.append(this.template).attr('title', '');

    this._events();
  };

  Tooltip.prototype.getPositionClass = function(){
    var dataTags = this.$element.data();
    for(var tag in dataTags){
      if(tag === 'position'){
        return ' ' + dataTags[tag];
      }else{
        return '';
      }
    }
  };

  Tooltip.prototype.buildTemplate = function(){
    var dataTags = this.$element.data(),
        position = '',
        key;
    for(key in dataTags){
      if(key === 'position'){
        position = ' ' + dataTags[key];
      }
    }
    this.options.templateClasses = this.options.tooltipClass + this.getPositionClass();
    // this.options.templateClasses = this.options.tooltipClass + position;
    console.log(this.options.templateClasses);
    return $('<div></div>').addClass(this.options.templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false
    }).text(this.$element.attr('title')).hide();
  };

  Tooltip.prototype.hideAll = function(){
    var _this = this;
    $(document).find('[data-is-active]', this.tooltipClass).each(function(){
      $(this).fadeOut(_this.options.fadeOutDuration);
    });
  };

  Tooltip.prototype._show = function(){
    this.hideAll();

    Foundation.ImNotTouchingYou(this.template);

    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });

    this.template.stop().fadeIn(this.options.fadeInDuration);
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

      this.$element.on('mouseenter.zf.tooltip', function(e){
        if(!_this.isActive){
          _this.timeout = setTimeout(function(){
            _this._show();
          }, _this.options.hoverDelay);
        }
      })
        .on('mouseleave.zf.tooltip', function(e){
          clearTimeout(_this.timeout);
          e.stopPropagation();
          if(!isFocus){
            _this._hide();
          }
      });
    }

    this.$element.on('click.zf.tooltip', function(e){
      isClick = true;
      if(isClick && _this.isActive){
        _this._hide();
        isClick = false;
      }else if(isFocus){
        _this._show();
      }
    }).on('focus.zf.tooltip', function(e){
      isFocus = true;
      if(isClick && _this.isActive){
        // _this._hide();
        return;
      }else{
        _this._show();
      }
      isClick = false;
    }).on('focusout.zf.tooltip', function(e){
      isFocus = false;
      _this._hide();
    });
    // this.$element.on('click.zf.tooltip', function(e){
    //   e.stopPropagation();
    //   _this.isActive ? _this._hide() : _this._show();
    // })
    //   .on('focus', function(e){
    //     _this._show();
    // })
    //   .on('focusout', function(e){
    //     _this._hide();
    // });
  };
  Foundation.plugin(Tooltip);
}(jQuery, window, window.Foundation);
