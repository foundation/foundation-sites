!function($, window, Foundation){
  'use strict';
  function Tooltip(element, options){
    this.$element = element;
    this.options = $.extend(this.defaults, options || {});
    // this.$parent = this.$element.parent();
    this.$content = this.$element.find('.tip-content');
    this.$pip = this.$element.find('.pip');
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
    console.log('pip',this.$pip, 'content', this.$content);
    this.$content.hide();
    this.$pip.hide();
    // var tipbody = this.options.template || this.buildTemplate();
    //
    // this.$element.append(tipbody);
    this._events();
    // // console.log(this.$element.attr('id'));
    // // Foundation.imNotTouchingYou.checkWidth($(tipbody), this.$parent);
    //
  };

  Tooltip.prototype._events = function($tipRoot){
    var _this = this;
    if(!this.options.disableHover){
      this.$element.on('mouseenter', function(e){
        setTimeout(function(){
          _this.$content.fadeIn(_this.options.fadeInDuration);
          _this.$pip.fadeIn(_this.options.fadeInDuration);
        }, _this.options.hoverDelay);
      });
      this.$element.on('mouseleave', function(e){
        _this.$content.fadeOut(_this.options.fadeOutDuration);
        _this.$pip.fadeOut(_this.options.fadeOutDuration);
      });
    }
    this.$element.on('click.zf.tooltip', function(e){
      e.preventDefault();
      _this.$content.fadeToggle(_this.options.fadeInDuration);
      _this.$pip.fadeToggle(_this.options.fadeInDuration);
    });
    this.$element.on('focus', function(e){
      e.preventDefault();
      _this.$content.fadeIn(_this.options.fadeInDuration);
      _this.$pip.fadeIn(_this.options.fadeInDuration);
    });
    this.$element.on('focusout', function(e){
      e.preventDefault();
      _this.$content.fadeOut(_this.options.fadeOutDuration);
      _this.$pip.fadeOut(_this.options.fadeOutDuration);
    });
  };
  Foundation.plugin(Tooltip);
}(jQuery, window, window.Foundation);
