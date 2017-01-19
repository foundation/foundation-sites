'use strict';

!function($) {

/**
 * SmoothScroll module.
 * @module foundation.smooth-scroll
 */
class SmoothScroll {
    constructor(element, options) {
        this.$element = element;
        this.options = $.extend({}, SmoothScroll.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'SmoothScroll');
    }

    /**
     * Initialize the SmoothScroll plugin
     * @private
     */
    _init() {
        var id = this.$element[0].id || Foundation.GetYoDigits(6, 'smooth-scroll');
        var _this = this;
        this.$element.attr({
            'id': id
        });

        this._events();
    }

    /**
     * Initializes events for SmoothScroll.
     * @private
     */
    _events() {
        var _this = this;

        // click handler function.
        var handleLinkClick = function(e) {
            // exit function if the event source isn't coming from an anchor with href attribute starts with '#'
            if(!$(this).is('a[href^="#"]'))  {
                return false;
            }
            
            var arrival = this.getAttribute('href');
            
            _this._inTransition = true;

            SmoothScroll.scrollToLoc(arrival, _this.options, function() {
                _this._inTransition = false;
            });
            
            e.preventDefault();
        };

        this.$element.on('click.zf.smoothScroll', handleLinkClick)
        this.$element.on('click.zf.smoothScroll', 'a[href^="#"]', handleLinkClick);
    }

    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
     * @param {Object} options - Overrides to the default plugin settings.
     * @param {Function} callback - The callback function when scroll animation is finished.
     * @static
     * @function
     */
    static scrollToLoc(loc, options, callback) {
        // Do nothing if target does not exist to prevent errors
        if (!$(loc).length) {
            return false;
        }

        options = $.extend({}, SmoothScroll.defaults, options);

        var scrollPos = Math.round($(loc).offset().top - options.threshold / 2 - options.offset);

        $('html, body').stop(true).animate(
            { scrollTop: scrollPos },
            options.animationDuration,
            options.animationEasing,
            function() {
                if(callback && typeof callback == "function"){
                    callback();
                }
            }
        );
    }

   /**
    * Destroys an instance of SmoothScroll.
    * @function
    */
    destory() {
        Foundation.unregisterPlugin(this);
    }
}

/**
 * Default settings for plugin.
 */
SmoothScroll.defaults = {
  /**
   * Amount of time, in ms, the animated scrolling should take between locations.
   * @option
   * @type {number}
   * @default 500
   */
  animationDuration: 500,
  /**
   * Animation style to use when scrolling between locations. Can be `'swing'` or `'linear'`.
   * @option
   * @type {string}
   * @default 'linear'
   * @see {@link https://api.jquery.com/animate|Jquery animate}
   */
  animationEasing: 'linear',
  /**
   * Number of pixels to use as a marker for location changes.
   * @option
   * @type {number}
   * @default 50
   */
  threshold: 50,
  /**
   * Number of pixels to offset the scroll of the page on item click if using a sticky nav bar.
   * @option
   * @type {number}
   * @default 0
   */
  offset: 0
}

// Window exports
Foundation.plugin(SmoothScroll, 'SmoothScroll');
}(jQuery);
