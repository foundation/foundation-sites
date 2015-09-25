!function($, Foundation) {

'use strict';

/**
 * Creates a new instance of an off-canvas wrapper.
 * @class
 * @fires OffCanvas#init
 * @param {Object} element - jQuery object to initialize.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function OffCanvas(element) {
  this.$element = element;
  this.options = $.extend({}, OffCanvas.defaults, this.$element.data());
  this.$lastTrigger = $();

  this._init();
  this._events();

  /**
   * Fires when the plugin has been successfully initialized.
   * @event OffCanvas#init
   */
  this.$element.trigger('init.zf.offcanvas');
}

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @example true
   */
  closeOnClick: true,

  position: 'left'
}

/**
 * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
 * @function
 * @private
 */
OffCanvas.prototype._init = function() {
  var id = this.$element.attr('id');

  this.$element.attr('aria-hidden', 'true');

  // Find triggers that affect this element and add aria-expanded to them
  $(document)
    .find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]')
    .attr('aria-expanded', 'false');

  // Add a close trigger over the body if necessary
  if (this.options.closeOnClick && !$('.js-off-canvas-exit').length) {
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
    'toggle.zf.trigger': this.toggle.bind(this),
    'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
  });

  $(window).on('close.zf.offcanvas', this.close.bind(this));

  if (this.$exiter) {
    this.$exiter.on('click.zf.offcanvas', function() {
      $(window).trigger('close.zf.offcanvas');
    });
  }
}

/**
 * Opens the off-canvas menu.
 * @function
 * @fires OffCanvas#opened
 */
OffCanvas.prototype.open = function(event, trigger) {
  if (this.$element.hasClass('is-open')) return;

  var _this = this;

  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#opened
   */
  requestAnimationFrame(function() {
    $('body').addClass('is-off-canvas-open is-open-'+_this.options.position);

    _this.$element
      .addClass('is-open')
      .attr('aria-hidden', 'false')
      .find('a, button').eq(0).focus().end().end()
      .trigger('opened.zf.offcanvas');
  });

  if (trigger) {
    this.$lastTrigger = trigger.attr('aria-expanded', 'true');
  }
}

/**
 * Closes the off-canvas menu.
 * @function
 * @fires OffCanvas#closed
 */
OffCanvas.prototype.close = function() {
  if (!this.$element.hasClass('is-open')) return;

  var _this = this;

  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#closed
   */
  requestAnimationFrame(function() {
    $('body').removeClass('is-off-canvas-open is-open-'+_this.options.position);

    _this.$element
      .removeClass('is-open')
      .attr('aria-hidden', 'true')
      .trigger('closed.zf.offcanvas');
  });

  this.$lastTrigger.attr('aria-expanded', 'false');
}

/**
 * Toggles the off-canvas menu open or closed.
 * @function
 */
OffCanvas.prototype.toggle = function(event, trigger) {
  if (this.$element.hasClass('is-open')) {
    this.close(event, trigger);
  }
  else {
    this.open(event, trigger);
  }
}

/**
 * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
 * @function
 * @private
 */
OffCanvas.prototype._handleKeyboard = function(event) {
  if (event.which !== 27) return;

  event.stopPropagation();
  event.preventDefault();
  this.close();
  this.$lastTrigger.focus();
}

Foundation.plugin(OffCanvas);

}(jQuery, Foundation)
