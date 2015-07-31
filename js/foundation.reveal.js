!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Reveal modal.
   * @class
   * @fires Reveal#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Reveal(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options);
    this.targetClass = '';
    this.$target = $();

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Reveal#init
     */
    this.$element.trigger('init.zf.reveal');
  }
  
  /**
   * Default settings for plugin
   */
  Reveal.prototype.defaults = {
    /**
     * Set the animation class for the modal to use to animate into view
     * @option
     * @sample fadeIn
     */
    animationIn: 'fadeIn'
  };

  /**
   * Initializes the Reveal plugin
   * @private
   */
  Reveal.prototype._init = function() {
  };

  Foundation.plugin(Reveal);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Reveal;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Reveal;
    });

}(Foundation, jQuery);