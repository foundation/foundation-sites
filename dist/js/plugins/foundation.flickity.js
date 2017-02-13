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
      this.nextPrevEls = [];

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

        this.$element.attr({
          'data-resize': this.id,
          'id': this.id
        });

        if (this.options.disableBreakpoint === '' && this.options.enableBreakpoint === '') {
          this._enableFlickity();
        } else {
          if (this.options.disableBreakpoint !== '') {
            this._disableIfMediaQuery(this.options.disableBreakpoint);
          }

          if (this.options.enableBreakpoint !== '') {
            this._enableIfMediaQuery(this.options.enableBreakpoint);
          }
        }

        this._events();
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
            if (this.$element.data('flickity')) {
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
            }
          });
        }

        if (this.options.previousElement !== '') {
          var prevElArr = this.options.previousElement.split(',');
          $.each(prevElArr, function (i, selector) {
            var $selector = $(selector);

            if ($selector.length > 0) {
              $selector.off('click.zf.flickity').on('click.zf.flickity', function (e) {
                _this.$element.flickity('previous');
                e.preventDefault();
              });

              _this.nextPrevEls.push($selector);
            }
          });
        }

        if (this.options.nextElement !== '') {
          var nextElArr = this.options.nextElement.split(',');
          $.each(nextElArr, function (i, selector) {
            var $selector = $(selector);

            if ($selector.length > 0) {
              $selector.off('click.zf.flickity').on('click.zf.flickity', function (e) {
                _this.$element.flickity('next');
                e.preventDefault();
              });

              _this.nextPrevEls.push($selector);
            }
          });
        }

        if (this.options.disableBreakpoint !== '') {
          $(window).off(mediaqueryListener).on(mediaqueryListener, function () {
            _this._disableIfMediaQuery(_this.options.disableBreakpoint);
          });
        }

        if (this.options.enableBreakpoint !== '') {
          $(window).off(mediaqueryListener).on(mediaqueryListener, function () {
            _this._enableIfMediaQuery(_this.options.enableBreakpoint);
          });
        }

        if (this.options.noDragging) {
          if (this.$element.data('flickity')) {
            this.$element.flickity('unbindDrag');
          }
        }
      }

      /**
       * Disable Flickity based on media query
       * @function
       * @private
       */

    }, {
      key: '_disableIfMediaQuery',
      value: function _disableIfMediaQuery(mediaQuery) {
        if (Foundation.MediaQuery.atLeast(mediaQuery)) {
          this._disableFlickity();
        } else {
          this._enableFlickity();
        }
      }

      /**
       * Enable Flickity based on media query
       * @function
       * @private
       */

    }, {
      key: '_enableIfMediaQuery',
      value: function _enableIfMediaQuery(mediaQuery) {
        if (Foundation.MediaQuery.atLeast(mediaQuery)) {
          this._enableFlickity();
        } else {
          this._disableFlickity();
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
        if (this.$element.data('flickity')) {
          this.$element.flickity('destroy');
        }
        this.$element.off('.zf.flickity').find('*').off('.zf.flickity');
        if (this.nextPrevEls.length > 0) {
          $.each(this.nextPrevEls, function (i, $el) {
            $el.off('.zf.flickity');
          });
        }
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
    * Comma separated list of selectors that will trigger the previous
    * slide in the carousel
    * @option
     * @type {string}
    * @default ''
    */
    previousElement: '',
    /**
    * Comma separated list of selectors that will trigger the next slide
    * in the carousel
    * @option
     * @type {string}
    * @default ''
    */
    nextElement: '',
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
    * Disable dragging
    * @option
     * @type {boolean}
    * @default false
    */
    noDragging: false,
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
    pageDots: false
  };

  // Window exports
  Foundation.plugin(FlickityCarousel, 'FlickityCarousel');
}(jQuery);