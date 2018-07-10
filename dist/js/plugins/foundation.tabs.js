(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./foundation.core"), require("./foundation.core.plugin"), require("./foundation.core.utils"), require("./foundation.util.imageLoader"), require("./foundation.util.keyboard"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["./foundation.core", "./foundation.core.plugin", "./foundation.core.utils", "./foundation.util.imageLoader", "./foundation.util.keyboard", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["foundation.tabs"] = factory(require("./foundation.core"), require("./foundation.core.plugin"), require("./foundation.core.utils"), require("./foundation.util.imageLoader"), require("./foundation.util.keyboard"), require("jquery"));
	else
		root["__FOUNDATION_EXTERNAL__"] = root["__FOUNDATION_EXTERNAL__"] || {}, root["__FOUNDATION_EXTERNAL__"]["foundation.tabs"] = factory(root["__FOUNDATION_EXTERNAL__"]["foundation.core"], root["__FOUNDATION_EXTERNAL__"]["foundation.core"], root["__FOUNDATION_EXTERNAL__"]["foundation.core"], root["__FOUNDATION_EXTERNAL__"]["foundation.util.imageLoader"], root["__FOUNDATION_EXTERNAL__"]["foundation.util.keyboard"], root["jQuery"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__foundation_core__, __WEBPACK_EXTERNAL_MODULE__foundation_core_plugin__, __WEBPACK_EXTERNAL_MODULE__foundation_core_utils__, __WEBPACK_EXTERNAL_MODULE__foundation_util_imageLoader__, __WEBPACK_EXTERNAL_MODULE__foundation_util_keyboard__, __WEBPACK_EXTERNAL_MODULE_jquery__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 18);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./foundation.core":
/*!****************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.core"],"amd":"./foundation.core","commonjs":"./foundation.core","commonjs2":"./foundation.core"} ***!
  \****************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_core__;

/***/ }),

/***/ "./foundation.core.plugin":
/*!*************************************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.core"],"amd":"./foundation.core.plugin","commonjs":"./foundation.core.plugin","commonjs2":"./foundation.core.plugin"} ***!
  \*************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_core_plugin__;

/***/ }),

/***/ "./foundation.core.utils":
/*!**********************************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.core"],"amd":"./foundation.core.utils","commonjs":"./foundation.core.utils","commonjs2":"./foundation.core.utils"} ***!
  \**********************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_core_utils__;

/***/ }),

/***/ "./foundation.util.imageLoader":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.util.imageLoader"],"amd":"./foundation.util.imageLoader","commonjs":"./foundation.util.imageLoader","commonjs2":"./foundation.util.imageLoader"} ***!
  \****************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_util_imageLoader__;

/***/ }),

/***/ "./foundation.util.keyboard":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.util.keyboard"],"amd":"./foundation.util.keyboard","commonjs":"./foundation.util.keyboard","commonjs2":"./foundation.util.keyboard"} ***!
  \****************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_util_keyboard__;

/***/ }),

/***/ "./js/entries/plugins/foundation.tabs.js":
/*!***********************************************!*\
  !*** ./js/entries/plugins/foundation.tabs.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Foundation", {
  enumerable: true,
  get: function get() {
    return _foundation.Foundation;
  }
});
Object.defineProperty(exports, "Tabs", {
  enumerable: true,
  get: function get() {
    return _foundation2.Tabs;
  }
});

var _foundation = __webpack_require__(/*! ./foundation.core */ "./foundation.core");

var _foundation2 = __webpack_require__(/*! ../../foundation.tabs */ "./js/foundation.tabs.js");

_foundation.Foundation.plugin(_foundation2.Tabs, 'Tabs');

/***/ }),

/***/ "./js/foundation.tabs.js":
/*!*******************************!*\
  !*** ./js/foundation.tabs.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tabs = void 0;

var _jquery = _interopRequireDefault(__webpack_require__(/*! jquery */ "jquery"));

var _foundationCore = __webpack_require__(/*! ./foundation.core.utils */ "./foundation.core.utils");

var _foundationUtil = __webpack_require__(/*! ./foundation.util.keyboard */ "./foundation.util.keyboard");

var _foundationUtil2 = __webpack_require__(/*! ./foundation.util.imageLoader */ "./foundation.util.imageLoader");

var _foundationCore2 = __webpack_require__(/*! ./foundation.core.plugin */ "./foundation.core.plugin");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */
var Tabs =
/*#__PURE__*/
function (_Plugin) {
  _inherits(Tabs, _Plugin);

  function Tabs() {
    _classCallCheck(this, Tabs);

    return _possibleConstructorReturn(this, _getPrototypeOf(Tabs).apply(this, arguments));
  }

  _createClass(Tabs, [{
    key: "_setup",

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
      this.options = _jquery.default.extend({}, Tabs.defaults, this.$element.data(), options);
      this.className = 'Tabs'; // ie9 back compat

      this._init();

      _foundationUtil.Keyboard.register('Tabs', {
        'ENTER': 'open',
        'SPACE': 'open',
        'ARROW_RIGHT': 'next',
        'ARROW_UP': 'previous',
        'ARROW_DOWN': 'next',
        'ARROW_LEFT': 'previous' // 'TAB': 'next',
        // 'SHIFT_TAB': 'previous'

      });
    }
    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */

  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;

      var _this = this;

      this.$element.attr({
        'role': 'tablist'
      });
      this.$tabTitles = this.$element.find(".".concat(this.options.linkClass));
      this.$tabContent = (0, _jquery.default)("[data-tabs-content=\"".concat(this.$element[0].id, "\"]"));
      this.$tabTitles.each(function () {
        var $elem = (0, _jquery.default)(this),
            $link = $elem.find('a'),
            isActive = $elem.hasClass("".concat(_this.options.linkActiveClass)),
            hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
            linkId = $link[0].id ? $link[0].id : "".concat(hash, "-label"),
            $tabContent = (0, _jquery.default)("#".concat(hash));
        $elem.attr({
          'role': 'presentation'
        });
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
          _this.onLoadListener = (0, _foundationCore.onLoad)((0, _jquery.default)(window), function () {
            (0, _jquery.default)('html, body').animate({
              scrollTop: $elem.offset().top
            }, _this.options.deepLinkSmudgeDelay, function () {
              $link.focus();
            });
          });
        }
      });

      if (this.options.matchHeight) {
        var $images = this.$tabContent.find('img');

        if ($images.length) {
          (0, _foundationUtil2.onImagesLoaded)($images, this._setHeight.bind(this));
        } else {
          this._setHeight();
        }
      } //current context-bound function to open tabs on page load or history hashchange


      this._checkDeepLink = function () {
        var anchor = window.location.hash; //need a hash and a relevant anchor in this tabset

        if (anchor.length) {
          var $link = _this2.$element.find('[href$="' + anchor + '"]');

          if ($link.length) {
            _this2.selectTab((0, _jquery.default)(anchor), true); //roll up a little to show the titles


            if (_this2.options.deepLinkSmudge) {
              var offset = _this2.$element.offset();

              (0, _jquery.default)('html, body').animate({
                scrollTop: offset.top
              }, _this2.options.deepLinkSmudgeDelay);
            }
            /**
              * Fires when the zplugin has deeplinked at pageload
              * @event Tabs#deeplink
              */


            _this2.$element.trigger('deeplink.zf.tabs', [$link, (0, _jquery.default)(anchor)]);
          }
        }
      }; //use browser to open a tab, if it exists in this tabset


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
    key: "_events",
    value: function _events() {
      this._addKeyHandler();

      this._addClickHandler();

      this._setHeightMqHandler = null;

      if (this.options.matchHeight) {
        this._setHeightMqHandler = this._setHeight.bind(this);
        (0, _jquery.default)(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
      }

      if (this.options.deepLink) {
        (0, _jquery.default)(window).on('hashchange', this._checkDeepLink);
      }
    }
    /**
     * Adds click handlers for items within the tabs.
     * @private
     */

  }, {
    key: "_addClickHandler",
    value: function _addClickHandler() {
      var _this = this;

      this.$element.off('click.zf.tabs').on('click.zf.tabs', ".".concat(this.options.linkClass), function (e) {
        e.preventDefault();
        e.stopPropagation();

        _this._handleTabChange((0, _jquery.default)(this));
      });
    }
    /**
     * Adds keyboard event handlers for items within the tabs.
     * @private
     */

  }, {
    key: "_addKeyHandler",
    value: function _addKeyHandler() {
      var _this = this;

      this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
        if (e.which === 9) return;
        var $element = (0, _jquery.default)(this),
            $elements = $element.parent('ul').children('li'),
            $prevElement,
            $nextElement;
        $elements.each(function (i) {
          if ((0, _jquery.default)(this).is($element)) {
            if (_this.options.wrapOnKeys) {
              $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
              $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
            } else {
              $prevElement = $elements.eq(Math.max(0, i - 1));
              $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
            }

            return;
          }
        }); // handle keyboard event with keyboard util

        _foundationUtil.Keyboard.handleKey(e, 'Tabs', {
          open: function open() {
            $element.find('[role="tab"]').focus();

            _this._handleTabChange($element);
          },
          previous: function previous() {
            $prevElement.find('[role="tab"]').focus();

            _this._handleTabChange($prevElement);
          },
          next: function next() {
            $nextElement.find('[role="tab"]').focus();

            _this._handleTabChange($nextElement);
          },
          handled: function handled() {
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
    key: "_handleTabChange",
    value: function _handleTabChange($target, historyHandled) {
      /**
       * Check for active class on target. Collapse if exists.
       */
      if ($target.hasClass("".concat(this.options.linkActiveClass))) {
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

      var $oldTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
          $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find("#".concat(hash)); //close old tab

      this._collapseTab($oldTab); //open new tab


      this._openTab($target); //either replace or update browser history


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


      this.$element.trigger('change.zf.tabs', [$target, $targetContent]); //fire to children a mutation event

      $targetContent.find("[data-mutate]").trigger("mutateme.zf.trigger");
    }
    /**
     * Opens the tab `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to open.
     * @function
     */

  }, {
    key: "_openTab",
    value: function _openTab($target) {
      var $tabLink = $target.find('[role="tab"]'),
          hash = $tabLink.attr('data-tabs-target') || $tabLink[0].hash.slice(1),
          $targetContent = this.$tabContent.find("#".concat(hash));
      $target.addClass("".concat(this.options.linkActiveClass));
      $tabLink.attr({
        'aria-selected': 'true',
        'tabindex': '0'
      });
      $targetContent.addClass("".concat(this.options.panelActiveClass)).removeAttr('aria-hidden');
    }
    /**
     * Collapses `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to collapse.
     * @function
     */

  }, {
    key: "_collapseTab",
    value: function _collapseTab($target) {
      var $target_anchor = $target.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
        'aria-selected': 'false',
        'tabindex': -1
      });
      (0, _jquery.default)("#".concat($target_anchor.attr('aria-controls'))).removeClass("".concat(this.options.panelActiveClass)).attr({
        'aria-hidden': 'true'
      });
    }
    /**
     * Public method for selecting a content pane to display.
     * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @function
     */

  }, {
    key: "selectTab",
    value: function selectTab(elem, historyHandled) {
      var idStr;

      if (_typeof(elem) === 'object') {
        idStr = elem[0].id;
      } else {
        idStr = elem;
      }

      if (idStr.indexOf('#') < 0) {
        idStr = "#".concat(idStr);
      }

      var $target = this.$tabTitles.find("[href$=\"".concat(idStr, "\"]")).parent(".".concat(this.options.linkClass));

      this._handleTabChange($target, historyHandled);
    }
  }, {
    key: "_setHeight",

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


      this.$tabContent.find(".".concat(this.options.panelClass)).css('height', '').each(function () {
        var panel = (0, _jquery.default)(this),
            isActive = panel.hasClass("".concat(_this.options.panelActiveClass)); // get the options from the parent instead of trying to get them from the child

        if (!isActive) {
          panel.css({
            'visibility': 'hidden',
            'display': 'block'
          });
        }

        var temp = this.getBoundingClientRect().height;

        if (!isActive) {
          panel.css({
            'visibility': '',
            'display': ''
          });
        }

        max = temp > max ? temp : max;
      }).css('height', "".concat(max, "px"));
    }
    /**
     * Destroys an instance of tabs.
     * @fires Tabs#destroyed
     */

  }, {
    key: "_destroy",
    value: function _destroy() {
      this.$element.find(".".concat(this.options.linkClass)).off('.zf.tabs').hide().end().find(".".concat(this.options.panelClass)).hide();

      if (this.options.matchHeight) {
        if (this._setHeightMqHandler != null) {
          (0, _jquery.default)(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
        }
      }

      if (this.options.deepLink) {
        (0, _jquery.default)(window).off('hashchange', this._checkDeepLink);
      }

      if (this.onLoadListener) {
        (0, _jquery.default)(window).off(this.onLoadListener);
      }
    }
  }]);

  return Tabs;
}(_foundationCore2.Plugin);

exports.Tabs = Tabs;
Tabs.defaults = {
  /**
   * Link the location hash to the active pane.
   * Set the location hash when the active pane changes, and open the corresponding pane when the location changes.
   * @option
   * @type {boolean}
   * @default false
   */
  deepLink: false,

  /**
   * If `deepLink` is enabled, adjust the deep link scroll to make sure the top of the tab panel is visible
   * @option
   * @type {boolean}
   * @default false
   */
  deepLinkSmudge: false,

  /**
   * If `deepLinkSmudge` is enabled, animation time (ms) for the deep link adjustment
   * @option
   * @type {number}
   * @default 300
   */
  deepLinkSmudgeDelay: 300,

  /**
   * If `deepLink` is enabled, update the browser history with the open tab
   * @option
   * @type {boolean}
   * @default false
   */
  updateHistory: false,

  /**
   * Allows the window to scroll to content of active pane on load.
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

/***/ }),

/***/ 18:
/*!*****************************************************!*\
  !*** multi ./js/entries/plugins/foundation.tabs.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/ncoden/Documents/Documents/Projects/Programmation/Web/2016/Foundation/foundation-sites/js/entries/plugins/foundation.tabs.js */"./js/entries/plugins/foundation.tabs.js");


/***/ }),

/***/ "jquery":
/*!********************************************************************************************!*\
  !*** external {"root":["jQuery"],"amd":"jquery","commonjs":"jquery","commonjs2":"jquery"} ***!
  \********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

/***/ })

/******/ });
});
//# sourceMappingURL=foundation.tabs.js.map