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
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
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

/***/ 2:
/***/ (function(module, exports) {

module.exports = {Plugin: window.Foundation.Plugin};

/***/ }),

/***/ 5:
/***/ (function(module, exports) {

module.exports = {Keyboard: window.Foundation.Keyboard};

/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(75);


/***/ }),

/***/ 75:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__foundation_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__foundation_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_tabs__ = __webpack_require__(76);



__WEBPACK_IMPORTED_MODULE_0__foundation_core__["Foundation"].plugin(__WEBPACK_IMPORTED_MODULE_1__foundation_tabs__["a" /* Tabs */], 'Tabs');

/***/ }),

/***/ 76:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Tabs; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__foundation_plugin___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__);


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */

var Tabs = function (_Plugin) {
  _inherits(Tabs, _Plugin);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: '_setup',

    /**
     * Creates a new instance of tabs.
     * @class
     * @name Tabs
     * @fires Tabs#init
     * @param {jQuery} element - jQuery object to make into tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    value: function _setup(element, options) {
      this.$element = element;
      this.options = __WEBPACK_IMPORTED_MODULE_0_jquery___default.a.extend({}, Tabs.defaults, this.$element.data(), options);
      this.className = 'Tabs'; // ie9 back compat

      this._init();
      __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["Keyboard"].register('Tabs', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'previous',
        'ARROW_DOWN': 'next',
        'ARROW_LEFT': 'previous'
        // 'TAB': 'next',
        // 'SHIFT_TAB': 'previous'
      });
    }

    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */

  }, {
    key: '_init',
    value: function _init() {
      var _this3 = this;

      var _this = this;

      this.$element.attr({ 'role': 'tablist' });
      this.$tabTitles = this.$element.find('.' + this.options.linkClass);
      this.$tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('[data-tabs-content="' + this.$element[0].id + '"]');

      this.$tabTitles.each(function () {
        var $elem = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $link = $elem.find('a'),
            isActive = $elem.hasClass('' + _this.options.linkActiveClass),
            hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
            linkId = $link[0].id ? $link[0].id : hash + '-label',
            $tabContent = __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + hash);

        $elem.attr({ 'role': 'presentation' });

        $link.attr({
          'role': 'tab',
          'aria-controls': hash,
          'aria-selected': isActive,
          'id': linkId,
          'tabindex': isActive ? '0' : '-1'
        });

        $tabContent.attr({
          'role': 'tabpanel',
          'aria-labelledby': linkId
        });

        if (!isActive) {
          $tabContent.attr('aria-hidden', 'true');
        }

        if (isActive && _this.options.autoFocus) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).load(function () {
            __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: $elem.offset().top }, _this.options.deepLinkSmudgeDelay, function () {
              $link.focus();
            });
          });
        }
      });
      if (this.options.matchHeight) {
        var $images = this.$tabContent.find('img');

        if ($images.length) {
          Object(__WEBPACK_IMPORTED_MODULE_2__foundation_util_imageLoader__["onImagesLoaded"])($images, this._setHeight.bind(this));
        } else {
          this._setHeight();
        }
      }

      //current context-bound function to open tabs on page load or history popstate
      this._checkDeepLink = function () {
        var anchor = window.location.hash;
        //need a hash and a relevant anchor in this tabset
        if (anchor.length) {
          var $link = _this3.$element.find('[href$="' + anchor + '"]');
          if ($link.length) {
            _this3.selectTab(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor), true);

            //roll up a little to show the titles
            if (_this3.options.deepLinkSmudge) {
              var offset = _this3.$element.offset();
              __WEBPACK_IMPORTED_MODULE_0_jquery___default()('html, body').animate({ scrollTop: offset.top }, _this3.options.deepLinkSmudgeDelay);
            }

            /**
              * Fires when the zplugin has deeplinked at pageload
              * @event Tabs#deeplink
              */
            _this3.$element.trigger('deeplink.zf.tabs', [$link, __WEBPACK_IMPORTED_MODULE_0_jquery___default()(anchor)]);
          }
        }
      };

      //use browser to open a tab, if it exists in this tabset
      if (this.options.deepLink) {
        this._checkDeepLink();
      }

      this._events();
    }

    /**
     * Adds event handlers for items within the tabs.
     * @private
     */

  }, {
    key: '_events',
    value: function _events() {
      this._addKeyHandler();
      this._addClickHandler();
      this._setHeightMqHandler = null;

      if (this.options.matchHeight) {
        this._setHeightMqHandler = this._setHeight.bind(this);

        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
      }

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).on('popstate', this._checkDeepLink);
      }
    }

    /**
     * Adds click handlers for items within the tabs.
     * @private
     */

  }, {
    key: '_addClickHandler',
    value: function _addClickHandler() {
      var _this = this;

      this.$element.off('click.zf.tabs').on('click.zf.tabs', '.' + this.options.linkClass, function (e) {
        e.preventDefault();
        e.stopPropagation();
        _this._handleTabChange(__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this));
      });
    }

    /**
     * Adds keyboard event handlers for items within the tabs.
     * @private
     */

  }, {
    key: '_addKeyHandler',
    value: function _addKeyHandler() {
      var _this = this;

      this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
        if (e.which === 9) return;

        var $element = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement;

        $elements.each(function (i) {
          if (__WEBPACK_IMPORTED_MODULE_0_jquery___default()(this).is($element)) {
            if (_this.options.wrapOnKeys) {
              $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
              $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
            } else {
              $prevElement = $elements.eq(Math.max(0, i - 1));
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
            }
            return;
          }
        });

        // handle keyboard event with keyboard util
        __WEBPACK_IMPORTED_MODULE_1__foundation_util_keyboard__["Keyboard"].handleKey(e, 'Tabs', {
          open: function () {
            $element.find('[role="tab"]').focus();
            _this._handleTabChange($element);
          },
          previous: function () {
            $prevElement.find('[role="tab"]').focus();
            _this._handleTabChange($prevElement);
          },
          next: function () {
            $nextElement.find('[role="tab"]').focus();
            _this._handleTabChange($nextElement);
          },
          handled: function () {
            e.stopPropagation();
            e.preventDefault();
          }
        });
      });
    }

    /**
     * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
     * @param {jQuery} $target - Tab to open.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @fires Tabs#change
     * @function
     */

  }, {
    key: '_handleTabChange',
    value: function _handleTabChange($target, historyHandled) {

      /**
       * Check for active class on target. Collapse if exists.
       */
      if ($target.hasClass('' + this.options.linkActiveClass)) {
        if (this.options.activeCollapse) {
          this._collapseTab($target);

          /**
           * Fires when the zplugin has successfully collapsed tabs.
           * @event Tabs#collapse
           */
          this.$element.trigger('collapse.zf.tabs', [$target]);
        }
        return;
      }

      var $oldTab = this.$element.find('.' + this.options.linkClass + '.' + this.options.linkActiveClass),
          $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find('#' + hash);

      //close old tab
      this._collapseTab($oldTab);

      //open new tab
      this._openTab($target);

      //either replace or update browser history
      if (this.options.deepLink && !historyHandled) {
        var anchor = $target.find('a').attr('href');

        if (this.options.updateHistory) {
          history.pushState({}, '', anchor);
        } else {
          history.replaceState({}, '', anchor);
        }
      }

      /**
       * Fires when the plugin has successfully changed tabs.
       * @event Tabs#change
       */
      this.$element.trigger('change.zf.tabs', [$target, $targetContent]);

      //fire to children a mutation event
      $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
    }

    /**
     * Opens the tab `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to Open.
     * @function
     */

  }, {
    key: '_openTab',
    value: function _openTab($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find('#' + hash);

      $target.addClass('' + this.options.linkActiveClass);

      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });

      $targetContent.addClass('' + this.options.panelActiveClass).removeAttr('aria-hidden');
    }

    /**
     * Collapses `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to Open.
     * @function
     */

  }, {
    key: '_collapseTab',
    value: function _collapseTab($target) {
      var $target_anchor = $target.removeClass('' + this.options.linkActiveClass).find('[role="tab"]').attr({
        'aria-selected': 'false',
        'tabindex': -1
      });

      __WEBPACK_IMPORTED_MODULE_0_jquery___default()('#' + $target_anchor.attr('aria-controls')).removeClass('' + this.options.panelActiveClass).attr({ 'aria-hidden': 'true' });
    }

    /**
     * Public method for selecting a content pane to display.
     * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @function
     */

  }, {
    key: 'selectTab',
    value: function selectTab(elem, historyHandled) {
      var idStr;

      if (typeof elem === 'object') {
        idStr = elem[0].id;
      } else {
        idStr = elem;
      }

      if (idStr.indexOf('#') < 0) {
        idStr = '#' + idStr;
      }

      var $target = this.$tabTitles.find('[href$="' + idStr + '"]').parent('.' + this.options.linkClass);

      this._handleTabChange($target, historyHandled);
    }
  }, {
    key: '_setHeight',

    /**
     * Sets the height of each panel to the height of the tallest panel.
     * If enabled in options, gets called on media query change.
     * If loading content via external source, can be called directly or with _reflow.
     * If enabled with `data-match-height="true"`, tabs sets to equal height
     * @function
     * @private
     */
    value: function _setHeight() {
      var max = 0,
          _this = this; // Lock down the `this` value for the root tabs object

      this.$tabContent.find('.' + this.options.panelClass).css('height', '').each(function () {

        var panel = __WEBPACK_IMPORTED_MODULE_0_jquery___default()(this),
            isActive = panel.hasClass('' + _this.options.panelActiveClass); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({ 'visibility': 'hidden', 'display': 'block' });
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
          });
        }

        max = temp > max ? temp : max;
      }).css('height', max + 'px');
    }

    /**
     * Destroys an instance of an tabs.
     * @fires Tabs#destroyed
     */

  }, {
    key: '_destroy',
    value: function _destroy() {
      this.$element.find('.' + this.options.linkClass).off('.zf.tabs').hide().end().find('.' + this.options.panelClass).hide();

      if (this.options.matchHeight) {
        if (this._setHeightMqHandler != null) {
          __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
        }
      }

      if (this.options.deepLink) {
        __WEBPACK_IMPORTED_MODULE_0_jquery___default()(window).off('popstate', this._checkDeepLink);
      }
    }
  }]);

  return Tabs;
}(__WEBPACK_IMPORTED_MODULE_3__foundation_plugin__["Plugin"]);

Tabs.defaults = {
  /**
   * Allows the window to scroll to content of pane specified by hash anchor
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * Adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * Animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * Update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,

  /**
   * Allows the window to scroll to content of active pane on load if set to true.
   * Not recommended if more than one tab panel per page.
   * @option
   * @type {boolean}
   * @default false
   */
  autoFocus: false,

  /**
   * Allows keyboard input to 'wrap' around the tab links.
   * @option
   * @type {boolean}
   * @default true
   */
  wrapOnKeys: true,

  /**
   * Allows the tab content panes to match heights if set to true.
   * @option
   * @type {boolean}
   * @default false
   */
  matchHeight: false,

  /**
   * Allows active tabs to collapse when clicked.
   * @option
   * @type {boolean}
   * @default false
   */
  activeCollapse: false,

  /**
   * Class applied to `li`'s in tab link list.
   * @option
   * @type {string}
   * @default 'tabs-title'
   */
  linkClass: 'tabs-title',

  /**
   * Class applied to the active `li` in tab link list.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  linkActiveClass: 'is-active',

  /**
   * Class applied to the content containers.
   * @option
   * @type {string}
   * @default 'tabs-panel'
   */
  panelClass: 'tabs-panel',

  /**
   * Class applied to the active content container.
   * @option
   * @type {string}
   * @default 'is-active'
   */
  panelActiveClass: 'is-active'
};



/***/ })

/******/ });