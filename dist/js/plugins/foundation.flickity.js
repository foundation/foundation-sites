var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Flickity Carousel module.
   * @module foundation.flickity
   * @requires foundation.util.keyboard
   * @requires flickity.pkgd
   */

  var FlickityCarousel = function () {
    /**
    * Creates a new instance of a Flickity Carousel.
    * @class
    * @param {jQuery} element - jQuery object to make into an Flickity Carousel.
    * @param {Object} options - Overrides to the default plugin settings.
    */
    function FlickityCarousel(element, options) {
      _classCallCheck(this, FlickityCarousel);

      this.$element = element;
      this.element = element[0];
      this.options = $.extend({}, FlickityCarousel.defaults, this.$element.data(), options);

      this._init();

      Foundation.registerPlugin(this, 'FlickityCarousel');
      Foundation.Keyboard.register('FlickityCarousel', {
        'ltr': {
          'ARROW_RIGHT': 'next',
          'ARROW_LEFT': 'previous'
        },
        'rtl': {
          'ARROW_LEFT': 'next',
          'ARROW_RIGHT': 'previous'
        }
      });
    }

    /**
    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
    * @function
    * @private
    */


    _createClass(FlickityCarousel, [{
      key: '_init',
      value: function _init() {
        this._reset();

        this.flickity = new Flickity(this.element, this.options);

        var id = this.$element[0].id || Foundation.GetYoDigits(6, 'flickity');

        this.$element.attr({
          'data-resize': id,
          'id': id
        });

        this._events();

        if (this.options.accessible) {
          this.$element.attr('tabindex', 0);
        }
      }

      /**
      * Adds event listeners to basically everything within the element.
      * @function
      * @private
      */

    }, {
      key: '_events',
      value: function _events() {}
      // var _this = this;
      //
      // if (this.options.x) {
      // }


      /**
       * Resets FlickityCarousel so it can be reinitialized
       */

    }, {
      key: '_reset',
      value: function _reset() {
        // Don't do anything if flickity isn't initialized yet
        if (typeof this.flickity === 'undefined') {
          return;
        }
      }

      /**
      * Destroys the carousel and hides the element.
      * @function
      */

    }, {
      key: 'destroy',
      value: function destroy() {
        this.$element.off('.zf.flickity').find('*').off('.zf.flickity').end().hide();
        Foundation.unregisterPlugin(this);
      }
    }]);

    return FlickityCarousel;
  }();

  FlickityCarousel.defaults = {
    /**
    * Allows FlickityCarousel to bind keyboard events to the slider, to animate frames with arrow keys
    * @option
     * @type {boolean}
    * @default true
    */
    accessible: true
  };

  // Window exports
  Foundation.plugin(FlickityCarousel, 'FlickityCarousel');
}(jQuery);