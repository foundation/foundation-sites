!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Magellan.
   * @class
   * @fires Magellan#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Magellan(element, options) {
    this.$element = element;
    this.options  = $.extend(Magellan.defaults, options);
    this.$window  = $(window);
    this.name     = 'magellan';
    this.attr     = 'data-magellan';
    this.attrArrival  = 'data-magellan-arrival';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Magellan#init
     */
    this.$element.trigger('init.zf.magellan');
  };
  
  /**
   * Default settings for plugin
   */
  Magellan.defaults = {
      animationDuration: 700,
      animationEasing: 'linear',
      threshold: 700
  };

  Magellan.prototype = {
    /**
     * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
     * @private
     */
    _init: function() {
    },

    /**
     * Initializes events for Magellan.
     * @private
     */
    _events: function() {
      var self = this;

      this.$window
        .off('.magellan')
        .on('resize.fndtn.magellan', Foundation.throttle(function () {
          self._reflow();
        }.bind(this), 50))
        .on('scroll.fndtn.magellan', Foundation.throttle(function(e) {
          e.preventDefault();
          self.updateActiveClass();
        }, 100));

      this.$element
        .on('click.fndtn.magellan', 'a[href^="#"]', function(e) {
          e.preventDefault();
          // include animation settings
          var arrival   = $(this).attr('href'),
              navOffset = self.$element[0].clientHeight;

          $('html, body').animate({
            scrollTop: $(arrival).offset().top - navOffset
          }, 500);

          window.location = arrival;
        })
    },
    /**
     * Calls necessary functions to update Magellan upon DOM change
     * @private
     */
    _reflow: function() {
    },
    updateActiveClass: function() {
      var windowPosition = this.$window.scrollTop(),
          arrivals       = $('[' + this.attrArrival + ']'),
          magellanNav    = this.$element;

      arrivals.each(function() {
        var arrivalTop = $(this).offset().top,
            arrivalEnd = arrivalTop + $(this)[0].clientHeight;

        if (windowPosition >= arrivalTop && windowPosition <= arrivalEnd) {
          magellanNav.find('a').removeClass('active');

          // window.location.hash = $(this).attr('id');
          // find the corresponding hash/id of the section
          var activeTarget = magellanNav.find('a[href=#' + $(this).attr('id') +']');
          activeTarget.addClass('active');
        }
      })

    }
  };

  Foundation.plugin('magellan', Magellan);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Magellan;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Magellan;
    });

}(Foundation, jQuery);