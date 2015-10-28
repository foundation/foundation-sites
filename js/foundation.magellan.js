/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.util.animationFrame
 */
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
    this.options  = $.extend({}, Magellan.defaults, options);
    this.$window  = $(window);
    this.name     = 'magellan';
    this.attr     = 'data-magellan';
    this.attrArrival  = 'data-magellan-target';

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
    animationDuration: 500,
    animationEasing: 'linear',
    threshold: null,
    activeClass: 'active'
  };

  /**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  Magellan.prototype._init = function() {
  };

  /**
   * Initializes events for Magellan.
   * @private
   */
  Magellan.prototype._events = function() {
    var self = this;

    this.$window
      .off('.magellan')
      .on('resize.fndtn.magellan', Foundation.util.throttle(function () {
        self._reflow();
      }.bind(this), 50))
      .on('scroll.fndtn.magellan', Foundation.util.throttle(function(e) {
        e.preventDefault();
        self.updateActiveClass();
      }, 100));

    this.$element
      .on('click.fndtn.magellan', 'a[href^="#"]', function(e) {
        e.preventDefault();
        // include animation settings
        var arrival   = $(this).attr('href'),
            navOffset = self.$element.height();

        $('html, body').animate({
          scrollTop: $(arrival).offset().top - navOffset
        },
        {
          duration: self.options.animationDuration,
          easing:   self.options.animationEasing
        });

        window.location = arrival;
      })
  };
  /**
   * Calls necessary functions to update Magellan upon DOM change
   * @private
   */
  Magellan.prototype._reflow = function() {
  };
  /**
   * Detects the arrival sections and adds the active class to the magellan navigation bar
   */
  Magellan.prototype.updateActiveClass = function() {
    var windowPosition = this.$window.scrollTop(),
        arrivals       = $('[' + this.attrArrival + ']'),
        // for sensitivty to trigger the active class, either use the specified
        // threshold amount, or use the height of the nav item plus a little wiggle room
        threshold      = this.options.threshold || this.$element.height() + 50,
        magellanNav    = this.$element,
        self           = this;

    if (windowPosition + this.$window.height() === $(document).height()) {
      magellanNav.find('a').removeClass(self.options.activeClass);
      magellanNav.find('a').last().addClass(self.options.activeClass);
      return;
    }
    arrivals.each(function() {
      var arrivalTop = $(this).offset().top - threshold,
          arrivalEnd = arrivalTop + $(this).height();

      if (windowPosition >= arrivalTop && windowPosition <= arrivalEnd) {
        magellanNav.find('a').removeClass(self.options.activeClass);

        // this feature causes a bit of jumpiness
        // window.location.hash = $(this).attr('id');
        // find the corresponding hash/id of the section
        var activeTarget = magellanNav.find('a[href=#' + $(this).attr('id') +']');
        activeTarget.addClass(self.options.activeClass);
      }
    })
  };

  Foundation.plugin(Magellan);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Magellan;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Magellan;
    });

}(Foundation, jQuery);
