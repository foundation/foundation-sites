!function($, Foundation) {

'use strict';

/**
 * Creates a new instance of Tab Bar.
 * @class
 * @fires TabBar#init
 * @param {jQuery} element - jQuery object to attach tab bar functionality to.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function TabBar(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, TabBar.defaults, options);

  this._init();
  this._events();

  /**
   * Fires when the plugin has been successfully initialized.
   * @event TabBar#init
   */
  this.$element.trigger('init.zf.tabbar');
}

TabBar.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @example 'medium'
   */
  hideFor: 'medium'
}

/**
 * Initializes the tab bar by finding the target element, toggling element, and running update().
 * @function
 * @private
 */
TabBar.prototype._init = function() {
  var targetID = this.$element.data('tab-bar');
  if (!targetID) {
    console.error('Your tab bar needs an ID of a menu bar as the value of data-tab-bar.');
  }

  this.$targetMenu = $('#'+targetID);
  this.$toggler = this.$element.find('[data-toggle]');

  this._update();
}

/**
 * Adds necessary event handlers for the tab bar to work.
 * @function
 * @private
 */
TabBar.prototype._events = function() {
  var _this = this;

  $(window).on('changed.zf.mediaquery', this._update.bind(this));

  this.$toggler.on('click.zf.tabbar', this.toggleMenu.bind(this));
}

/**
 * Checks the current media query to determine if the tab bar should be visible or hidden.
 * @function
 * @private
 */
TabBar.prototype._update = function() {
  debugger;
  // Mobile
  if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
    this.$element.show();
    this.$targetMenu.hide();
  }

  // Desktop
  else {
    this.$element.hide();
    this.$targetMenu.show();
  }
}

/**
 * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
 * @function
 * @fires TabBar#toggled
 */
TabBar.prototype.toggleMenu = function() {
  if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
    this.$targetMenu.toggle(0);

    /**
     * Fires when the element attached to the tab bar toggles.
     * @event TabBar#toggled
     */
    this.$element.trigger('toggled.zf.tabbar');
  }
}

Foundation.plugin(TabBar);

}(jQuery, Foundation)