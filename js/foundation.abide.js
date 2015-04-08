!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Abide.
   * @class
   * @fires Abide#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Abide(element, options) {
    this.$element = element;
    this.options  = $.extend(Abide.defaults, options);
    this.$window  = $(window);
    this.name     = 'Abide';
    this.attr     = 'data-Abide';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Abide#init
     */
    this.$element.trigger('init.zf.abide');
  }

  /**
   * Default settings for plugin
   */
  Abide.defaults = {
    validateOn: 'fieldChange' // options: fieldChange, manual, submit
  };

  Abide.prototype = {
    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */
    _init: function() {
    },

    /**
     * Initializes events for Abide.
     * @private
     */
    _events: function() {
      var self = this;

      this.$element
        .off('.abide')
        .find('input, textarea, select')
          .off('.abide')
          .on('blur.fndtn.abide change.fndtn.abide', function (e) {
            self.requiredCheck(this);
          })
          .on('keydown.fndtn.abide', function (e) {
            // if (settings.live_validate === true && e.which != 9) {
            //   clearTimeout(self.timer);
            //   self.timer = setTimeout(function () {
            //     self.validate([this], e);
            //   }.bind(this), settings.timeout);
            // }
          });

    },
    /**
     * Calls necessary functions to update Abide upon DOM change
     * @private
     */
    _reflow: function() {
      var self = this;

    },
    requiredCheck: function(el) {
      var self = this;
      if ($(el).attr('required')) {
        if (!$(el).val()) {
          var label = $(el).parent();
          self.addErrorClass(label);
        }
      }
      return false;
    },
    addErrorClass: function(target) {
      $(target).addClass('error');
    },
    validateRadio: function(el) {
      // validate radio button
    },
    validateCheckbox: function(el) {
      // validate checkbox
    },
    resetForm: function(form) {
      // reset form
    }
  };

  Foundation.plugin('abide', Abide);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Abide;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Abide;
    });

}(Foundation, jQuery);