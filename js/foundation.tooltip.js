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
    disableForTouch: true,
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
    touchCloseText: 'Tap to close.',
    clickOpen: false
  };

  Tooltip.prototype._init = function(){
    this.template = this.template ? this.template : this.buildTemplate();
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
    var dataTags = this.$element.data();
    for(var tag in dataTags){
      if(tag === 'position'){
        return ' ' + dataTags[tag];
      }
    }
  };

  Tooltip.prototype.hideAll = function(){
    var _this = this;
    $(document).find('[data-is-active]', this.tooltipClass).each(function(){
      $(this).fadeOut(_this.options.fadeOutDuration);
    });
  };

  Tooltip.prototype._show = function(){
    var _this = this;
    this.hideAll();

    if(this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)){
      console.log('wrong size');
      return;
    }

    Foundation.ImNotTouchingYou(this.template);

    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    this.template.stop().fadeIn(this.options.fadeInDuration, function(){
      _this.isActive = true;
      console.log(_this);
    });
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
      isClick = true;
      if(isClick && _this.isActive){
        _this._hide();
        isClick = false;
      }else if(isFocus){
        _this._show();
      }
    })

    .on('focus.zf.tooltip', function(e){
      isFocus = true;
      if(isClick && _this.isActive){
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
