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
    this.attr     = 'data-abide';

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
    validateOn: 'fieldChange', // options: fieldChange, manual, submit
    errorClass: 'is-invalid-label'
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
            self.validateForm(self.$element);
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
        var label = $(el).closest('label');

        if (!$(el).val()) {
          self.addErrorClass(label);
        }
        else {
          if (label.hasClass(self.options.errorClass)) {
            label.removeClass(self.options.errorClass);
          }
        }
      }
      return false;
    },
    addErrorClass: function(target) {
      $(target).addClass(this.options.errorClass);
    },
    validateForm: function($form) {
      var self = this,
          textInput = $form.find('input[type="text"]');

      $(textInput).each(function() {
        self.requiredCheck(this);
        self.validateText(this);
      })
    },
    validateText: function(el) {

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