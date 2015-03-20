!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Toggler.
   * @class
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Toggler(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options);
    this.targetClass = '';
    this.$target = $();

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Toggler#init
     */
    this.$element.trigger('init.zf.toggler');
  }

  Toggler.defaults = {
    /**
     * Set what class to toggle on which elements. Use the format `.class of .element`. `.element` can be any simple CSS selector, such as `#id`, `.class`, and `[attribute]`.
     * @option
     * @sample .is-visible on #dropdown
     */
    toggler: '',
    /**
     * Set the text to display inside the toggle while the target element *has the class* you set.
     * @option
     * @sample Hide dropdown
     */
    onText: '',
    /**
     * Set the text to display inside the toggle while the target *does not have the class* you set.
     * @option
     * @sample Show dropdown
     */
    offText: ''
  };


  Toggler.prototype = {
    /**
     * Initializes the Toggler plugin by parsing the target element and class from `options.toggle`.
     * @private
     */
    _init: function() {
      // Parse the class and target
      var input = this.options.toggler.split(' ');

      if (input.length === 0) console.warn('You must pass a string of the format ".class on .element" to Toggler.');

      this.targetClass = input[0];
      if (this.targetClass[0] === '.') this.targetClass = this.targetClass.slice(1);

      this.$target = $(input[input.length - 1]);

      // Set the trigger text based on default state
      if (this.$target.hasClass(this.targetClass))
        this.$element.text(this.options.onText);
      else
        this.$element.text(this.options.offText);
    },

    /**
     * Initializes events for the toggle trigger.
     * @private
     */
    _events: function() {
      var _this = this;

      this.$element.on('click', function() {
        _this.toggle();
        return false;
      });
    },

    /**
     * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
     * @fires Toggler#on
     * @fires Toggler#off
     */
    toggle: function() {
      this.$target.toggleClass(this.targetClass);
      if (this.$target.hasClass(this.targetClass)) {
        this.$element.text(this.options.onText);
        /**
         * Fires if the target element has the class after a toggle.
         * @event Toggler#on
         */
        this.$element.trigger('on.zf.toggler');
      }
      else {
        this.$element.text(this.options.offText);
        /**
         * Fires if the target element does not have the class after a toggle.
         * @event Toggler#off
         */
        this.$element.trigger('off.zf.toggler');
      }
    }
  };

  Foundation.plugin('toggler', Toggler);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Toggler;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Toggler;
    });

}(Foundation, jQuery);