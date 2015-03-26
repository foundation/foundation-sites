!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Interchange.
   * @class
   * @fires Interchange#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Interchange(element, options) {
    this.$element = element;
    this.options  = $.extend(Interchange.defaults, options);
    this.$window  = $(window);
    this.name     = 'interchange';
    this.attr     = 'data-interchange';
    this.cache    = {};

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Interchange#init
     */
    this.$element.trigger('init.zf.interchange');
  }

  /**
   * Default settings for plugin
   */
  Interchange.defaults = {
    equalizeOnStack: true
  };

  Interchange.prototype = {
    /**
     * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
     * @private
     */
    _init: function() {
      this.mapMqContent(this.$element);
      this._reflow();
    },

    /**
     * Initializes events for Interchange.
     * @private
     */
    _events: function() {
      var self = this;

      this.$window
        .off('.interchange')
        .on('resize.fndtn.interchange', Foundation.throttle(function () {
          self._reflow();
        }.bind(this), 50));
    },
    /**
     * Calls necessary functions to update Interchange upon DOM change
     * @private
     */
    _reflow: function() {
      var self = this;

      // just for testing purposes
      var initData = ["http://placehold.it/300x300", "(min-width: 400px)"];

      $('[' + this.attr + ']').each(function() {
        if (self.checkMq(initData[1])) {
          self.setSrc(self.$element, initData[0]);
        }

      });
    },
    mapMqContent: function($element) {
      var self = this,
          initData = $element.data(self.name),
          scenarios = {};

    },
    cacheMqContent: function() {

    },
    checkMq: function(mq) {
      return window.matchMedia(mq).matches;
    },
    setSrc: function($element, path, cb) {
      $element.attr('src', path);
    }
  };

  Foundation.plugin('interchange', Interchange);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Interchange;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Interchange;
    });

}(Foundation, jQuery);