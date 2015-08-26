!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Toggler.
   * @class
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Toggler(element) {
    this.$element = element;
    this.className = '';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Toggler#init
     */
    this.$element.trigger('init.zf.toggler');
  }

  /**
   * Initializes the Toggler plugin by parsing the target element and class from `options.toggle`.
   * @function
   * @private
   */
  Toggler.prototype._init = function() {
    // Parse the class
    var input = this.$element.data('toggler');

    // Allow for a . at the beginning of the string
    if (input[0] === '.') {
      this.className = input.slice(1);
    }
    else {
      this.className = input;
    }
  };

  /**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */
  Toggler.prototype._events = function() {
    var _this = this;

    this.$element.on('toggle.zf.trigger', function() {
      _this.toggle();
      return false;
    });
  };

  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */
  Toggler.prototype.toggle = function() {
    this.$element.toggleClass(this.className);

    if (this.$element.hasClass(this.className)) {
      // this.$element.text(this.options.onText);
      /**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */
      this.$element.trigger('on.zf.toggler');
    }
    else {
      // this.$element.text(this.options.offText);
      /**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
      this.$element.trigger('off.zf.toggler');
    }
  };

  /**
   * Destroys the instance of Toggler on the element.
   * @function
   */
  Toggler.prototype.destroy= function() {
    this.$element.off('.zf.toggler');
  };

  Foundation.plugin(Toggler);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Toggler;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Toggler;
    });

}(Foundation, jQuery);