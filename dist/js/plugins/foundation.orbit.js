/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 89);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports) {

module.exports = jQuery;

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

module.exports = {Foundation: window.Foundation};

/***/ }),

/***/ 10:
/***/ (function(module, exports) {

module.exports = {onImagesLoaded: window.Foundation.onImagesLoaded};

/***/ }),

/***/ 12:
/***/ (function(module, exports) {

module.exports = {Touch: window.Foundation.Touch};

/***/ }),

/***/ 2:
/***/ (function(module, exports) {

module.exports = {Plugin: window.Foundation.Plugin};

/***/ }),

/***/ 23:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__foundation_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_orbit__ = __webpack_require__(53);



__WEBPACK_IMPORTED_MODULE_0__foundation_core__["Foundation"].plugin(__WEBPACK_IMPORTED_MODULE_1__foundation_orbit__["a" /* Orbit */], 'Orbit');

/***/ }),

/***/ 3:
/***/ (function(module, exports) {

module.exports = {rtl: window.Foundation.rtl, GetYoDigits: window.Foundation.GetYoDigits, transitionend: window.Foundation.transitionend};

/***/ }),

/***/ 4:
/***/ (function(module, exports) {

module.exports = {Motion: window.Foundation.Motion, Move: window.Foundation.Move};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = {Keyboard: window.Foundation.Keyboard};

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Orbit; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__ = __webpack_require__(78);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_core__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__foundation_util_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5__foundation_util_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__foundation_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6__foundation_plugin__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__);


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }










/**
 * Orbit module.
 * @module foundation.orbit
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.timer
 * @requires foundation.util.imageLoader
 * @requires foundation.util.touch
 */

var Orbit = function (_Plugin) {
  _inherits(Orbit, _Plugin);

  function Orbit() {
    _classCallCheck(this, Orbit);

    return _possibleConstructorReturn(this, (Orbit.__proto__ || Object.getPrototypeOf(Orbit)).apply(this, arguments));
  }

  _createClass(Orbit, [{
    key: '_setup',

    /**
    * Creates a new instance of an orbit carousel.
    * @class
    * @name Orbit
    * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
    * @param {Object} options - Overrides to the default plugin settings.
    */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Orbit.defaults, this.$element.data(), options);
      this.className = 'Orbit'; // ie9 back compat

      __WEBPACK_IMPORTED_MODULE_7__foundation_util_touch__["Touch"].init(__WEBPACK_IMPORTED_MODULE_0_jquery___default.a); // Touch init is idempotent, we just need to make sure it's initialied.

      this._init();

      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["Keyboard"].register('Orbit', {
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

  }, {
    key: '_init',
    value: function _init() {
      // @TODO: consider discussion on PR #9278 about DOM pollution by changeSlide
      this._reset();

      this.$wrapper = this.$element.find('.' + this.options.containerClass);
      this.$slides = this.$element.find('.' + this.options.slideClass);

      var $images = this.$element.find('img'),
          initActive = this.$slides.filter('.is-active'),
          id = this.$element[0].id || __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__foundation_util_core__["GetYoDigits"])(6, 'orbit');

      this.$element.attr({
        'data-resize': id,
        'id': id
      });

      if (!initActive.length) {
        this.$slides.eq(0).addClass('is-active');
      }

      if (!this.options.useMUI) {
        this.$slides.addClass('no-motionui');
      }

      if ($images.length) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__foundation_util_imageLoader__["onImagesLoaded"])($images, this._prepareForOrbit.bind(this));
      } else {
        this._prepareForOrbit(); //hehe
      }

      if (this.options.bullets) {
        this._loadBullets();
      }

      this._events();

      if (this.options.autoPlay && this.$slides.length > 1) {
        this.geoSync();
      }

      if (this.options.accessible) {
        // allow wrapper to be focusable to enable arrow navigation
        this.$wrapper.attr('tabindex', 0);
      }
    }

    /**
    * Creates a jQuery collection of bullets, if they are being used.
    * @function
    * @private
    */

  }, {
    key: '_loadBullets',
    value: function _loadBullets() {
      this.$bullets = this.$element.find('.' + this.options.boxOfBullets).find('button');
    }

    /**
    * Sets a `timer` object on the orbit, and starts the counter for the next slide.
    * @function
    */

  }, {
    key: 'geoSync',
    value: function geoSync() {
      var _this = this;
      this.timer = new __WEBPACK_IMPORTED_MODULE_3__foundation_util_timer__["Timer"](this.$element, {
        duration: this.options.timerDelay,
        infinite: false
      }, function () {
        _this.changeSlide(true);
      });
      this.timer.start();
    }

    /**
    * Sets wrapper and slide heights for the orbit.
    * @function
    * @private
    */

  }, {
    key: '_prepareForOrbit',
    value: function _prepareForOrbit() {
      var _this = this;
      this._setWrapperHeight();
    }

    /**
    * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
    * @function
    * @private
    * @param {Function} cb - a callback function to fire when complete.
    */

  }, {
    key: '_setWrapperHeight',
    value: function _setWrapperHeight(cb) {
      //rewrite this to `for` loop
      var max = 0,
          temp,
          counter = 0,
          _this = this;

      this.$slides.each(function () {
        temp = this.getBoundingClientRect().height;
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).attr('data-slide', counter);

        if (_this.$slides.filter('.is-active')[0] !== _this.$slides.eq(counter)[0]) {
          //if not the active slide, set css position and display property
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css({ 'position': 'relative', 'display': 'none' });
        }
        max = temp > max ? temp : max;
        counter++;
      });

      if (counter === this.$slides.length) {
        this.$wrapper.css({ 'height': max }); //only change the wrapper height property once.
        if (cb) {
          cb(max);
        } //fire callback with max height dimension.
      }
    }

    /**
    * Sets the max-height of each slide.
    * @function
    * @private
    */

  }, {
    key: '_setSlideHeight',
    value: function _setSlideHeight(height) {
      this.$slides.each(function () {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).css('max-height', height);
      });
    }

    /**
    * Adds event listeners to basically everything within the element.
    * @function
    * @private
    */

  }, {
    key: '_events',
    value: function _events() {
      var _this = this;

      //***************************************
      //**Now using custom event - thanks to:**
      //**      Yohai Ararat of Toronto      **
      //***************************************
      //
      this.$element.off('.resizeme.zf.trigger').on({
        'resizeme.zf.trigger': this._prepareForOrbit.bind(this)
      });
      if (this.$slides.length > 1) {

        if (this.options.swipe) {
          this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit', function (e) {
            e.preventDefault();
            _this.changeSlide(true);
          }).on('swiperight.zf.orbit', function (e) {
            e.preventDefault();
            _this.changeSlide(false);
          });
        }
        //***************************************

        if (this.options.autoPlay) {
          this.$slides.on('click.zf.orbit', function () {
            _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);
            _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
          });

          if (this.options.pauseOnHover) {
            this.$element.on('mouseenter.zf.orbit', function () {
              _this.timer.pause();
            }).on('mouseleave.zf.orbit', function () {
              if (!_this.$element.data('clickedOn')) {
                _this.timer.start();
              }
            });
          }
        }

        if (this.options.navButtons) {
          var $controls = this.$element.find('.' + this.options.nextClass + ', .' + this.options.prevClass);
          $controls.attr('tabindex', 0)
          //also need to handle enter/return and spacebar key presses
          .on('click.zf.orbit touchend.zf.orbit', function (e) {
            e.preventDefault();
            _this.changeSlide(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).hasClass(_this.options.nextClass));
          });
        }

        if (this.options.bullets) {
          this.$bullets.on('click.zf.orbit touchend.zf.orbit', function () {
            if (/is-active/g.test(this.className)) {
              return false;
            } //if this is active, kick out of function.
            var idx = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).data('slide'),
                ltr = idx > _this.$slides.filter('.is-active').data('slide'),
                $slide = _this.$slides.eq(idx);

            _this.changeSlide(ltr, $slide, idx);
          });
        }

        if (this.options.accessible) {
          this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function (e) {
            // handle keyboard event with keyboard util
            __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["Keyboard"].handleKey(e, 'Orbit', {
              next: function () {
                _this.changeSlide(true);
              },
              previous: function () {
                _this.changeSlide(false);
              },
              handled: function () {
                // if bullet is focused, make sure focus moves
                if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(e.target).is(_this.$bullets)) {
                  _this.$bullets.filter('.is-active').focus();
                }
              }
            });
          });
        }
      }
    }

    /**
     * Resets Orbit so it can be reinitialized
     */

  }, {
    key: '_reset',
    value: function _reset() {
      // Don't do anything if there are no slides (first run)
      if (typeof this.$slides == 'undefined') {
        return;
      }

      if (this.$slides.length > 1) {
        // Remove old events
        this.$element.off('.zf.orbit').find('*').off('.zf.orbit');

        // Restart timer if autoPlay is enabled
        if (this.options.autoPlay) {
          this.timer.restart();
        }

        // Reset all sliddes
        this.$slides.each(function (el) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(el).removeClass('is-active is-active is-in').removeAttr('aria-live').hide();
        });

        // Show the first slide
        this.$slides.first().addClass('is-active').show();

        // Triggers when the slide has finished animating
        this.$element.trigger('slidechange.zf.orbit', [this.$slides.first()]);

        // Select first bullet if bullets are present
        if (this.options.bullets) {
          this._updateBullets(0);
        }
      }
    }

    /**
    * Changes the current slide to a new one.
    * @function
    * @param {Boolean} isLTR - flag if the slide should move left to right.
    * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
    * @param {Number} idx - the index of the new slide in its collection, if one chosen.
    * @fires Orbit#slidechange
    */

  }, {
    key: 'changeSlide',
    value: function changeSlide(isLTR, chosenSlide, idx) {
      if (!this.$slides) {
        return;
      } // Don't freak out if we're in the middle of cleanup
      var $curSlide = this.$slides.filter('.is-active').eq(0);

      if (/mui/g.test($curSlide[0].className)) {
        return false;
      } //if the slide is currently animating, kick out of the function

      var $firstSlide = this.$slides.first(),
          $lastSlide = this.$slides.last(),
          dirIn = isLTR ? 'Right' : 'Left',
          dirOut = isLTR ? 'Left' : 'Right',
          _this = this,
          $newSlide;

      if (!chosenSlide) {
        //most of the time, this will be auto played or clicked from the navButtons.
        $newSlide = isLTR ? //if wrapping enabled, check to see if there is a `next` or `prev` sibling, if not, select the first or last slide to fill in. if wrapping not enabled, attempt to select `next` or `prev`, if there's nothing there, the function will kick out on next step. CRAZY NESTED TERNARIES!!!!!
        this.options.infiniteWrap ? $curSlide.next('.' + this.options.slideClass).length ? $curSlide.next('.' + this.options.slideClass) : $firstSlide : $curSlide.next('.' + this.options.slideClass) : //pick next slide if moving left to right
        this.options.infiniteWrap ? $curSlide.prev('.' + this.options.slideClass).length ? $curSlide.prev('.' + this.options.slideClass) : $lastSlide : $curSlide.prev('.' + this.options.slideClass); //pick prev slide if moving right to left
      } else {
        $newSlide = chosenSlide;
      }

      if ($newSlide.length) {
        /**
        * Triggers before the next slide starts animating in and only if a next slide has been found.
        * @event Orbit#beforeslidechange
        */
        this.$element.trigger('beforeslidechange.zf.orbit', [$curSlide, $newSlide]);

        if (this.options.bullets) {
          idx = idx || this.$slides.index($newSlide); //grab index to update bullets
          this._updateBullets(idx);
        }

        if (this.options.useMUI && !this.$element.is(':hidden')) {
          __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["Motion"].animateIn($newSlide.addClass('is-active').css({ 'position': 'absolute', 'top': 0 }), this.options['animInFrom' + dirIn], function () {
            $newSlide.css({ 'position': 'relative', 'display': 'block' }).attr('aria-live', 'polite');
          });

          __WEBPACK_IMPORTED_MODULE_2__foundation_util_motion__["Motion"].animateOut($curSlide.removeClass('is-active'), this.options['animOutTo' + dirOut], function () {
            $curSlide.removeAttr('aria-live');
            if (_this.options.autoPlay && !_this.timer.isPaused) {
              _this.timer.restart();
            }
            //do stuff?
          });
        } else {
          $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
          $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();
          if (this.options.autoPlay && !this.timer.isPaused) {
            this.timer.restart();
          }
        }
        /**
        * Triggers when the slide has finished animating in.
        * @event Orbit#slidechange
        */
        this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
      }
    }

    /**
    * Updates the active state of the bullets, if displayed.
    * @function
    * @private
    * @param {Number} idx - the index of the current slide.
    */

  }, {
    key: '_updateBullets',
    value: function _updateBullets(idx) {
      var $oldBullet = this.$element.find('.' + this.options.boxOfBullets).find('.is-active').removeClass('is-active').blur(),
          span = $oldBullet.find('span:last').detach(),
          $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
    }

    /**
    * Destroys the carousel and hides the element.
    * @function
    */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
    }
  }]);

  return Orbit;
}(__WEBPACK_IMPORTED_MODULE_6__foundation_plugin__["Plugin"]);

Orbit.defaults = {
  /**
  * Tells the JS to look for and loadBullets.
  * @option
   * @type {boolean}
  * @default true
  */
  bullets: true,
  /**
  * Tells the JS to apply event listeners to nav buttons
  * @option
   * @type {boolean}
  * @default true
  */
  navButtons: true,
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-right'
  */
  animInFromRight: 'slide-in-right',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-right'
  */
  animOutToRight: 'slide-out-right',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-in-left'
  *
  */
  animInFromLeft: 'slide-in-left',
  /**
  * motion-ui animation class to apply
  * @option
   * @type {string}
  * @default 'slide-out-left'
  */
  animOutToLeft: 'slide-out-left',
  /**
  * Allows Orbit to automatically animate on page load.
  * @option
   * @type {boolean}
  * @default true
  */
  autoPlay: true,
  /**
  * Amount of time, in ms, between slide transitions
  * @option
   * @type {number}
  * @default 5000
  */
  timerDelay: 5000,
  /**
  * Allows Orbit to infinitely loop through the slides
  * @option
   * @type {boolean}
  * @default true
  */
  infiniteWrap: true,
  /**
  * Allows the Orbit slides to bind to swipe events for mobile, requires an additional util library
  * @option
   * @type {boolean}
  * @default true
  */
  swipe: true,
  /**
  * Allows the timing function to pause animation on hover.
  * @option
   * @type {boolean}
  * @default true
  */
  pauseOnHover: true,
  /**
  * Allows Orbit to bind keyboard events to the slider, to animate frames with arrow keys
  * @option
   * @type {boolean}
  * @default true
  */
  accessible: true,
  /**
  * Class applied to the container of Orbit
  * @option
   * @type {string}
  * @default 'orbit-container'
  */
  containerClass: 'orbit-container',
  /**
  * Class applied to individual slides.
  * @option
   * @type {string}
  * @default 'orbit-slide'
  */
  slideClass: 'orbit-slide',
  /**
  * Class applied to the bullet container. You're welcome.
  * @option
   * @type {string}
  * @default 'orbit-bullets'
  */
  boxOfBullets: 'orbit-bullets',
  /**
  * Class applied to the `next` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-next'
  */
  nextClass: 'orbit-next',
  /**
  * Class applied to the `previous` navigation button.
  * @option
   * @type {string}
  * @default 'orbit-previous'
  */
  prevClass: 'orbit-previous',
  /**
  * Boolean to flag the js to use motion ui classes or not. Default to true for backwards compatability.
  * @option
   * @type {boolean}
  * @default true
  */
  useMUI: true
};



/***/ }),

/***/ 78:
/***/ (function(module, exports) {

module.exports = {Timer: window.Foundation.Timer};

/***/ }),

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(23);


/***/ })

/******/ });