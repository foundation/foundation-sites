!function($, Foundation){
  'use strict';

  function Dropdown(element, options){
    this.$element = element;
    this.options = $.extend({}, this.defaults, options || {});
    this._init();
  }

  Dropdown.prototype.defaults = {
    activeClass: 'open',
    hoverDelay: 250,
    disableHover: false,
    dropdownClass: 'dropdown-pane',
    vOffset: 1
    // defaultAction: 'toggle'
  };
  Dropdown.prototype._init = function(){
    var $id = this.$element.attr('id');

    this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]');
    this.$anchor.attr({'aria-controls': $id, 'data-is-focus': 'false'});

    console.log($('[data-toggle="' + this.$element.attr('id') + '"]'));

    this.$element.attr({
      'aria-hidden': 'true',
      'class': this.options.dropdownClass
    });
    this.setPosition();
    this._events();
  };
  Dropdown.prototype.setPosition = function(){
    var $eleDims = Foundation.GetDimensions(this.$element);
    var $anchorDims = Foundation.GetDimensions(this.$anchor);
    this.$element.offset({
      left: $anchorDims.offset.left,
      top: $anchorDims.offset.top + $anchorDims.height + this.options.vOffset
    });
    // console.log('element', ele, '\nanchor', par);
    // console.log('w',this.$element.outerWidth(), '\nh', this.$element.outerHeight());
    // console.log('w',this.$anchor.outerWidth(), '\nh', this.$anchor.outerHeight(), '\noffset', this.$anchor.offset());
  };
  Dropdown.prototype._events = function(){
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this)
    });
  };
  Dropdown.prototype.open = function(){
    this.$element.addClass(this.options.activeClass)
      .attr('aria-hidden', 'false');
  };
  Dropdown.prototype.close = function(){
    this.$element.removeClass(this.options.activeClass)
      .attr('aria-hidden', 'true');
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
