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
    this.options  = $.extend(this.defaults, options);
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
    this._reflow();
  };

  /**
   * Initializes events for Interchange.
   * @private
   */
  Interchange.prototype._events = function() {
    var self = this;

    this.$window
      .off('.interchange')
      .on('resize.fndtn.interchange', Foundation.throttle(function () {
        self._reflow();
      }.bind(this), 50));
  };
  /**
   * Calls necessary functions to update Interchange upon DOM change
   * @private
   */
  Interchange.prototype._reflow = function() {
    var self = this;
    var elementScenarios;
    console.log("REFLOW");
    console.log(self.cache);
    $('[' + this.attr + ']').each(function() {
      // var instanceId = $(this).data('uuid');
      console.log($(this).data('uuid'));
      if (self.cache) {
        elementScenarios = self.cache;
        for (var i = elementScenarios.length - 1; i >= 0; i--) {
          if (self.checkMq(elementScenarios[i].mq)) {
            // var $targetInterchange = $('[data-uuid=' + instanceId + ']');
            self.setSrc(self.$element, elementScenarios[i].path);
            return;
          }
        }
      }
    });
  };
  /**
   * Checks the Interchange element for the provided media query + content pairings
   * @param {Object} element - jQuery object that is an Interchange instance
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */
  Interchange.prototype.mapMqContent = function($element) {
    var self      = this,
        initData  = $element.data(self.name),
        mqMatch   = /\((.*?)\)/g,
        pathMatch = /\[(.+?)\,\s/g,
        scenarios = [],
        mqArr     = [],
        pathArr   = [],
        pathTmp;

    initData.split(',');
    mqArr = initData.match(mqMatch);

    // weird little loop to get the stuff INSIDE regex
    while (pathTmp = pathMatch.exec(initData)) {
      pathArr.push(pathTmp[1]);
    }

    if (mqArr.length === pathArr.length) {
      for (var i = 0; i < mqArr.length; i++) {
        scenarios.push({
          'mq': mqArr[i],
          'path': pathArr[i]
        });
      }
    }
    else {
      // this is a case that we'll have to account for, however. like same path for multiple scenarios.
      throw "Not 1:1 match";
    }
    
    return scenarios;
  };
  /**
   * Caches a particular Interchange instance and its media query mappings to allow for multiple instances of Interchange per page
   * @param {Object} element - jQuery object that is an Interchange instance
   */
  Interchange.prototype.cacheInterchangeInstance = function($element) {
    this.cache[$element.data('uuid')] = this.mapMqContent($element);
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
    $element.attr('src', path).load(function() {
      cb();
      this.$element.trigger('srcChange.zf.interchange');
    })
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