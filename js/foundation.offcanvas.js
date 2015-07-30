!function($, Foundation) {

'use strict';

/**
 * Creates a new instance of an off-canvas wrapper.
 * @class
 * @fires OffCanvas#init
 * @param {Object} element - jQuery object to initialize.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function OffCanvas(element, options) {
  this.$element = element;
  this.options = $.extend(this.defaults, options);

  this._init();
  this._events();

  /**
   * Fires when the plugin has been successfully initialized.
   * @event OffCanvas#init
   */
  this.$element.trigger('init.zf.offcanvas');
}

OffCanvas.prototype.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @example true
   */
  closeOnClick: true,

  /**
   * CSS class to use when the off-canvas menu is open.
   * @option
   * @example 'is-off-canvas-open'
   */
  activeClass: 'is-off-canvas-open'
}

/**
 * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
 * @function
 * @private
 */
OffCanvas.prototype._init = function() {
  if (this.options.closeOnClick) {
    var exiter = document.createElement('div');
    exiter.setAttribute('class', 'js-off-canvas-exit');
    $('[data-off-canvas-content]').append(exiter);

    this.$exiter = $(exiter);
  }
}

/**
 * Adds event handlers to the off-canvas wrapper and the exit overlay.
 * @function
 * @private
 */
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

/**
 * Opens the off-canvas menu.
 * @function
 * @fires OffCanvas#opened
 */
OffCanvas.prototype.open = function() {
  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#opened
   */
  this.$element
    .addClass(this.options.activeClass)
    .trigger('opened.zf.offcanvas');
}

/**
 * Closes the off-canvas menu.
 * @function
 * @fires OffCanvas#closed
 */
OffCanvas.prototype.close = function() {
  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#closed
   */
  this.$element
    .removeClass(this.options.activeClass)
    .trigger('closed.zf.offcanvas');
}

/**
 * Toggles the off-canvas menu open or closed.
 * @function
 */
OffCanvas.prototype.toggle = function() {
  if (this.$element.hasClass(this.options.activeClass)) {
    this.close();
  }
  else {
    this.open();
  }
}

Foundation.plugin(OffCanvas);

}(jQuery, Foundation)