'use strict';

!function($) {

  let MediaQuery = Foundation.MediaQuery; // import MediaQuery from "foundation.util.mediaQuery";
  let Motion     = Foundation.Motion; // import { Motion } from "foundation.util.motion";

/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */

class ResponsiveToggle {
  /**
   * Creates a new instance of Tab Bar.
   * @class
   * @fires ResponsiveToggle#init
   * @param {jQuery} element - jQuery object to attach tab bar functionality to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  constructor(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);

    this._init();
    this._events();

    Foundation.registerPlugin(this, 'ResponsiveToggle');
  }

  /**
   * Initializes the tab bar by finding the target element, toggling element, and running update().
   * @function
   * @private
   */
  _init() {
    var targetID = this.$element.data('responsive-toggle');
    if (!targetID) {
      console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
    }

    this.$targetMenu = $(`#${targetID}`);
    this.$toggler = this.$element.find('[data-toggle]');
    this.options = $.extend({}, this.options, this.$targetMenu.data());

    // If they were set, parse the animation classes
    if(this.options.animate) {
      let input = this.options.animate.split(' ');

      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }

    this._update();
  }

  /**
   * Adds necessary event handlers for the tab bar to work.
   * @function
   * @private
   */
  _events() {
    var _this = this;

    this._updateMqHandler = this._update.bind(this);

    $(window).on('changed.zf.mediaquery', this._updateMqHandler);

    this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
  }

  /**
   * Checks the current media query to determine if the tab bar should be visible or hidden.
   * @function
   * @private
   */
  _update() {
    // Mobile
    if (!MediaQuery.atLeast(this.options.hideFor)) {
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
   * @fires ResponsiveToggle#toggled
   */
  toggleMenu() {
    if (!MediaQuery.atLeast(this.options.hideFor)) {
      /**
       * Fires when the element attached to the tab bar toggles.
       * @event ResponsiveToggle#toggled
       */
      if(this.options.animate) {
        if (this.$targetMenu.is(':hidden')) {
          Foundation.Motion.animateIn(this.$targetMenu, this.animationIn, () => {
            this.$element.trigger('toggled.zf.responsiveToggle');
            this.$targetMenu.find('[data-mutate]').triggerHandler('mutateme.zf.trigger');
          });
        }
        else {
          Motion.animateOut(this.$targetMenu, this.animationOut, () => {
            this.$element.trigger('toggled.zf.responsiveToggle');
          });
        }
      }
      else {
        this.$targetMenu.toggle(0);
        this.$targetMenu.find('[data-mutate]').trigger('mutateme.zf.trigger');
        this.$element.trigger('toggled.zf.responsiveToggle');
      }
    }
  };

  destroy() {
    this.$element.off('.zf.responsiveToggle');
    this.$toggler.off('.zf.responsiveToggle');

    $(window).off('changed.zf.mediaquery', this._updateMqHandler);

    Foundation.unregisterPlugin(this);
  }
}

ResponsiveToggle.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @type {string}
   * @default 'medium'
   */
  hideFor: 'medium',

  /**
   * To decide if the toggle should be animated or not.
   * @option
   * @type {boolean}
   * @default false
   */
  animate: false
};

// Window exports
Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');

}(jQuery);
