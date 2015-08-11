!function($, window, Foundation){
  'use strict';
  function Tooltip(element, options){
    this.$element = element;
    this.options = $.extend(this.defaults, options || {});
    // this.$parent = this.$element.parent();
    this.$tipBody = [this.$element.find('.tip-content'), this.$element.find('.pip')];
    this.$content = this.$element.find('.tip-content');
    this.$pip = this.$element.find('.pip');
    this.isActive = false;
    this._init();

  }
  Tooltip.prototype.defaults = {
    disableForTouch: false,
    hoverDelay: 200,
    fadeInDuration: 150,
    fadeOutDuration: 150,
    disableHover: false
    // showOn: 'all'
    // template: this.buildTemplate()
  };
  // Tooltip.prototype.buildTemplate = function(){
  //   return '<span class="tip-content right" role="tooltip" aria-describedby="' + this.$element.attr('id') + '"aria-hidden="true">' + this.$element.attr('title') + '</span>'
  // };
  Tooltip.prototype._init = function(){
    this.$content.hide();
    this.$pip.hide();
    // var tipbody = this.options.template || this.buildTemplate();
    //
    // this.$element.append(tipbody);
    this._events();
    // // Foundation.imNotTouchingYou.checkWidth($(tipbody), this.$parent);
  };
  Tooltip.prototype._show = function(){
    Foundation.ImNotTouchingYou.checkWidth(this.$content);
    this.isActive = true;
    this.$content.stop().fadeIn(this.options.fadeInDuration);
    this.$pip.stop().fadeIn(this.options.fadeInDuration);

  };
  Tooltip.prototype._hide = function(){
    this.$content.stop().fadeOut(this.options.fadeOutDuration);
    this.$pip.stop().fadeOut(this.options.fadeOutDuration);
    this.isActive = false;
  };

  Tooltip.prototype._events = function($tipRoot){
    var _this = this;
    var isClick = false;
    var isFocus = false;

    if(!this.options.disableHover){

      this.$element.on('mouseenter', function(e){
        if(!_this.isActive){
          setTimeout(function(){
            _this._show();
          }, _this.options.hoverDelay);
        }
      })
        .on('mouseleave', function(e){
          _this._hide();
      });
    }

    this.$element.mousedown(function(e){
      isClick = true;
      if(isClick && _this.isActive){
        _this._hide();
        isClick = false;
      }else if(isFocus){
        _this._show();
      }
    }).focus(function(e){
      isFocus = true;
      if(isClick && _this.isActive){
        _this._hide();
      }else{
        _this._show();
      }
      isClick = false;
    }).focusout(function(e){
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
