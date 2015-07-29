!function($, Foundation) {

'use strict';

function OffCanvas(element, options) {
  this.$element = element;
  this.options = $.extend(this.defaults, options);

  this._init();
  this._events();

  this.$element.trigger('init.zf.offcanvas');
}

OffCanvas.prototype.defaults = {
  closeOnClick: true,
  activeClass: 'is-off-canvas-open'
}

OffCanvas.prototype._init = function() {
  if (this.options.closeOnClick) {
    var exiter = document.createElement('div');
    exiter.setAttribute('class', 'js-off-canvas-exit');
    $('[data-off-canvas-content]').append(exiter);

    this.$exiter = $(exiter);
  }
}

OffCanvas.prototype._events = function() {
  this.$element.on({
    'open.zf.trigger': this.open.bind(this),
    'close.zf.trigger': this.close.bind(this),
    'toggle.zf.trigger': this.toggle.bind(this)
  });

  if (this.$exiter) {
    this.$exiter.click(this.close.bind(this));
  }
}

OffCanvas.prototype.open = function() {
  this.$element
    .addClass(this.options.activeClass)
    .trigger('opened.zf.offcanvas');
}

OffCanvas.prototype.close = function() {
  this.$element
    .removeClass(this.options.activeClass)
    .trigger('closed.zf.offcanvas');
}

OffCanvas.prototype.toggle = function() {
  if (this.$element.hasClass(this.options.activeClass)) {
    this.close();
  }
  else {
    this.open();
  }
}

Foundation.plugin('off-canvas', OffCanvas);

}(jQuery, Foundation)