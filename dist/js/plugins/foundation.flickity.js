var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function ($) {

  /**
   * Flickity Carousel module.
   * By The Berndt Group
   * @module foundation.flickity
   * @requires jquery.mousewheel
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
      this.options = $.extend({}, FlickityCarousel.defaults, this.$element.data(), options);
      this.id = this.$element[0].id || Foundation.GetYoDigits(6, 'flickity');

      this._init();

      Foundation.registerPlugin(this, 'FlickityCarousel');
    }

    /**
    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
    * @function
    * @private
    */


    _createClass(FlickityCarousel, [{
      key: '_init',
      value: function _init() {
        if (this.options.horizontalScrolling) {
          if (!this.options.cellAlign) {
            this.options.cellAlign = 'left';
          }
          if (!this.options.cellAlign) {
            this.options.freeScroll = true;
          }
        }

        this._enableFlickity();

        this.$element.attr({
          'data-resize': this.id,
          'id': this.id
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
      value: function _events() {
        var _this = this,
            mediaqueryListener = this.mediaqueryListener = 'changed.zf.mediaquery.' + this.id;

        if (this.options.horizontalScrolling) {
          this.$element.off('mousewheel.zf.flickity DOMMouseScroll.zf.flickity').on('mousewheel.zf.flickity DOMMouseScroll.zf.flickity', function (e) {
            if (!window.wheeling) {
              if (e.deltaX > 0 || e.deltaY < 0) {
                _this.$element.flickity('next');
              } else if (e.deltaX < 0 || e.deltaY > 0) {
                _this.$element.flickity('previous');
              }
            }

            clearTimeout(window.wheeling);

            window.wheeling = setTimeout(function () {
              delete window.wheeling;

              if (window.wheeldata) {
                window.wheeldelta.x = 0;
                window.wheeldelta.y = 0;
              }
            }, 250);

            if (window.wheeldelta) {
              window.wheeldelta.x += e.deltaFactor * e.deltaX;
              window.wheeldelta.y += e.deltaFactor * e.deltaY;

              if (window.wheeldelta.x > 500 || window.wheeldelta.y > 500 || window.wheeldelta.x < -500 || window.wheeldelta.y < -500) {
                window.wheeldelta.x = 0;
                window.wheeldelta.y = 0;

                if (e.deltaX > 0 || e.deltaY < 0) {
                  _this.$element.flickity('next');
                } else if (e.deltaX < 0 || e.deltaY > 0) {
                  _this.$element.flickity('previous');
                }
              }
            }

            e.preventDefault();
          });
        }

        if (this.options.disableBreakpoint !== '') {
          $(window).off(mediaqueryListener).on(mediaqueryListener, function () {
            if (Foundation.MediaQuery.atLeast(_this.options.disableBreakpoint) && _this.$element.data('flickity')) {
              _this._disableFlickity();
            } else if (!_this.$element.data('flickity')) {
              _this._enableFlickity();
            }
          });
        }

        if (this.options.enableBreakpoint !== '') {
          $(window).off(mediaqueryListener).on(mediaqueryListener, function () {
            if (Foundation.MediaQuery.atLeast(_this.options.enableBreakpoint) && _this.$element.data('flickity')) {
              _this._enableFlickity();
            } else if (!_this.$element.data('flickity')) {
              _this._disableFlickity();
            }
          });
        }
      }

      /**
       * Destroy Flickity and remove all event listeners tied to the element
       * (does not remove window event listeners)
       * @function
       * @private
       */

    }, {
      key: '_disableFlickity',
      value: function _disableFlickity() {
        this.$element.flickity('destroy');
        this.$element.off('.zf.flickity').find('*').off('.zf.flickity');
      }

      /**
       * (Re-)enables Flickity
       * @function
       * @private
       */

    }, {
      key: '_enableFlickity',
      value: function _enableFlickity() {
        this.$element.flickity(this.options);
        this._events();
      }

      /**
      * Destroys the carousel and hides the element.
      * @function
      */

    }, {
      key: 'destroy',
      value: function destroy() {
        $(window).off(this.mediaqueryListener);
        this._disableFlickity();
        this.$element.hide();
        Foundation.unregisterPlugin(this);
      }
    }]);

    return FlickityCarousel;
  }();

  FlickityCarousel.defaults = {
    /**
    * Enable horizontal scrolling with mousewheel support
    * @option
     * @type {boolean}
    * @default false
    */
    horizontalScrolling: false,
    /**
    * Disable Flickity at a given breakpoint
    * @option
     * @type {string}
    * @default ''
    */
    disableBreakpoint: '',
    /**
    * Enable Flickity at a given breakpoint
    * @option
     * @type {string}
    * @default ''
    */
    enableBreakpoint: '',
    /**
    * Generates previous and next button HTML
    * @option
     * @type {boolean}
    * @default false
    */
    prevNextButtons: false,
    /**
    * Generates page dots HTML
    * @option
     * @type {boolean}
    * @default false
    */
    pageDots: false,
    /**
    * Allows FlickityCarousel to bind keyboard events
    * to the slider
    * @option
     * @type {boolean}
    * @default true
    */
    accessible: true
  };

  // Window exports
  Foundation.plugin(FlickityCarousel, 'FlickityCarousel');
}(jQuery);