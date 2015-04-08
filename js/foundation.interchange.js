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
      var instanceId = Foundation.generateUuid();
      this.$element.data('uuid', instanceId);
      this.$element.attr('data-uuid', instanceId);
      this.cacheInterchangeInstance(this.$element);
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
    },
    mapMqContent: function($element) {
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
    },
    cacheInterchangeInstance: function($element) {
      this.cache[$element.data('uuid')] = this.mapMqContent($element);
    },
    checkMq: function(mq) {
      return window.matchMedia(mq).matches;
    },
    setSrc: function($element, path, cb) {
      console.log($element.data('uuid'));
      console.log(path);
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