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
    this.options  = $.extend({}, this.defaults, options);
    this.rules    = [];

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
  Interchange.prototype.defaults = {
    equalizeOnStack: true
  };

  /**
   * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
   * @private
   */
  Interchange.prototype._init = function() {
    var instanceId = Foundation.generateUuid();
    this.$element.data('uuid', instanceId);
    this.$element.attr('data-uuid', instanceId);
    this.cacheInterchangeInstance(this.$element);
    this._generateRules();
    this._reflow();
  };

  /**
   * Initializes events for Interchange.
   * @private
   */
  Interchange.prototype._events = function() {
    var self = this;

    $(window)
      .off('.interchange')
      .on('changed.zf.mediaquery', this._reflow.bind(this));
  };
  /**
   * Calls necessary functions to update Interchange upon DOM change
   * @private
   */
  Interchange.prototype._reflow = function() {
    var match;

    for (var i in this.rules) {
      var rule = this.rules[i];

      if (window.matchMedia(rule.query).matches) {
        match = rule;
      }
    }

    if (match) {
      this.setSrc(this.$element, match.path, function() {});
    }
  };
  /**
   * Checks the Interchange element for the provided media query + content pairings
   * @param {Object} element - jQuery object that is an Interchange instance
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */
  Interchange.prototype._generateRules = function() {
    var rulesList = [];
    var rules = this.$element.data('interchange').match(/\[.*?\]/g);

    for (var i in rules) {
      var rule = rules[i].slice(1, -1).split(', ');

      rulesList.push({
        path: rule.slice(0, -1).join(''),
        query: rule[rule.length - 1]
      });
    }

    this.rules = rulesList;
  };
  /**
   * Caches a particular Interchange instance and its media query mappings to allow for multiple instances of Interchange per page
   * @param {Object} element - jQuery object that is an Interchange instance
   */
  Interchange.prototype.cacheInterchangeInstance = function($element) {
    // this.cache[$element.data('uuid')] = this._generateRules();
  };
  /**
   * Checks whether or not the window fits the provided media query rule
   * @param {String} mq - A media query rule
   * @returns {Boolean} using the matchMedia helper function, will return t/f depending whether or not the window is on the current MQ
   */
  Interchange.prototype.checkMq = function(mq) {
    return window.matchMedia(mq).matches;
  };
  /**
   * Changes the src attribute of the Interchange object to a new path, then runs the callback function
   * @param {Object} element - jQuery object that is an Interchange instance
   * @param {String} path - A path specified to a desired asset
   * @param {Object} cb - A callback function to be executed on src change
   * @event Interchange#srcChange
   */
  Interchange.prototype.setSrc = function($element, path, cb) {
    var _this = this;

    $element.attr('src', path).load(function() {
      cb();
      _this.$element.trigger('srcChange.zf.interchange');
    })
  };

  Foundation.plugin(Interchange);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Interchange;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Interchange;
    });

}(Foundation, jQuery);