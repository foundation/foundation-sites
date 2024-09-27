(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./foundation.core"), require("jquery"), require("./foundation.util.keyboard"), require("./foundation.util.imageLoader"));
	else if(typeof define === 'function' && define.amd)
		define(["./foundation.core", "jquery", "./foundation.util.keyboard", "./foundation.util.imageLoader"], factory);
	else if(typeof exports === 'object')
		exports["__FOUNDATION_EXTERNAL__"] = factory(require("./foundation.core"), require("jquery"), require("./foundation.util.keyboard"), require("./foundation.util.imageLoader"));
	else
		root["__FOUNDATION_EXTERNAL__"] = root["__FOUNDATION_EXTERNAL__"] || {}, root["__FOUNDATION_EXTERNAL__"]["foundation.tabs"] = factory(root["__FOUNDATION_EXTERNAL__"]["foundation.core"], root["jQuery"], root["__FOUNDATION_EXTERNAL__"]["foundation.util.keyboard"], root["__FOUNDATION_EXTERNAL__"]["foundation.util.imageLoader"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__foundation_core__, __WEBPACK_EXTERNAL_MODULE_jquery__, __WEBPACK_EXTERNAL_MODULE__foundation_util_keyboard__, __WEBPACK_EXTERNAL_MODULE__foundation_util_imageLoader__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/foundation.tabs.js":
/*!*******************************!*\
  !*** ./js/foundation.tabs.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Tabs: function() { return /* binding */ Tabs; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./foundation.core");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./foundation.util.keyboard */ "./foundation.util.keyboard");
/* harmony import */ var _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./foundation.util.imageLoader */ "./foundation.util.imageLoader");
/* harmony import */ var _foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__);
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }





/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */
var Tabs = /*#__PURE__*/function (_Plugin) {
  function Tabs() {
    _classCallCheck(this, Tabs);
    return _callSuper(this, Tabs, arguments);
  }
  _inherits(Tabs, _Plugin);
  return _createClass(Tabs, [{
    key: "_setup",
    value:
    /**
     * Creates a new instance of tabs.
     * @class
     * @name Tabs
     * @fires Tabs#init
     * @param {jQuery} element - jQuery object to make into tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function _setup(element, options) {
      this.$element = element;
      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend({}, Tabs.defaults, this.$element.data(), options);
      this.className = 'Tabs'; // ie9 back compat

      this._init();
      _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.register('Tabs', {
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
    key: "_init",
    value: function _init() {
      var _this2 = this;
      var _this = this;
      this._isInitializing = true;
      this.$element.attr({
        'role': 'tablist'
      });
      this.$tabTitles = this.$element.find(".".concat(this.options.linkClass));
      this.$tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("[data-tabs-content=\"".concat(this.$element[0].id, "\"]"));
      this.$tabTitles.each(function () {
        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
          $link = $elem.find('a'),
          isActive = $elem.hasClass("".concat(_this.options.linkActiveClass)),
          hash = $link.attr('data-tabs-target') || $link[0].hash.slice(1),
          linkId = $link[0].id ? $link[0].id : "".concat(hash, "-label"),
          $tabContent = jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(hash));
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

        // Save up the initial hash to return to it later when going back in history
        if (isActive) {
          _this._initialAnchor = "#".concat(hash);
        }
        if (!isActive) {
          $tabContent.attr('aria-hidden', 'true');
        }
        if (isActive && _this.options.autoFocus) {
          _this.onLoadListener = (0,_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.onLoad)(jquery__WEBPACK_IMPORTED_MODULE_0___default()(window), function () {
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
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
          (0,_foundation_util_imageLoader__WEBPACK_IMPORTED_MODULE_3__.onImagesLoaded)($images, this._setHeight.bind(this));
        } else {
          this._setHeight();
        }
      }

      // Current context-bound function to open tabs on page load or history hashchange
      this._checkDeepLink = function () {
        var anchor = window.location.hash;
        if (!anchor.length) {
          // If we are still initializing and there is no anchor, then there is nothing to do
          if (_this2._isInitializing) return;
          // Otherwise, move to the initial anchor
          if (_this2._initialAnchor) anchor = _this2._initialAnchor;
        }
        var anchorNoHash = anchor.indexOf('#') >= 0 ? anchor.slice(1) : anchor;
        var $anchor = anchorNoHash && jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(anchorNoHash));
        var $link = anchor && _this2.$element.find("[href$=\"".concat(anchor, "\"],[data-tabs-target=\"").concat(anchorNoHash, "\"]")).first();
        // Whether the anchor element that has been found is part of this element
        var isOwnAnchor = !!($anchor.length && $link.length);
        if (isOwnAnchor) {
          // If there is an anchor for the hash, select it
          if ($anchor && $anchor.length && $link && $link.length) {
            _this2.selectTab($anchor, true);
          }
          // Otherwise, collapse everything
          else {
            _this2._collapse();
          }

          // Roll up a little to show the titles
          if (_this2.options.deepLinkSmudge) {
            var offset = _this2.$element.offset();
            jquery__WEBPACK_IMPORTED_MODULE_0___default()('html, body').animate({
              scrollTop: offset.top - _this2.options.deepLinkSmudgeOffset
            }, _this2.options.deepLinkSmudgeDelay);
          }

          /**
           * Fires when the plugin has deeplinked at pageload
           * @event Tabs#deeplink
           */
          _this2.$element.trigger('deeplink.zf.tabs', [$link, $anchor]);
        }
      };

      //use browser to open a tab, if it exists in this tabset
      if (this.options.deepLink) {
        this._checkDeepLink();
      }
      this._events();
      this._isInitializing = false;
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
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('changed.zf.mediaquery', this._setHeightMqHandler);
      }
      if (this.options.deepLink) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).on('hashchange', this._checkDeepLink);
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
        _this._handleTabChange(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
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
        var $element = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
          $elements = $element.parent('ul').children('li'),
          $prevElement,
          $nextElement;
        $elements.each(function (i) {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).is($element)) {
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
        _foundation_util_keyboard__WEBPACK_IMPORTED_MODULE_2__.Keyboard.handleKey(e, 'Tabs', {
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
      // With `activeCollapse`, if the target is the active Tab, collapse it.
      if ($target.hasClass("".concat(this.options.linkActiveClass))) {
        if (this.options.activeCollapse) {
          this._collapse();
        }
        return;
      }
      var $oldTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass)),
        $tabLink = $target.find('[role="tab"]'),
        target = $tabLink.attr('data-tabs-target'),
        anchor = target && target.length ? "#".concat(target) : $tabLink[0].hash,
        $targetContent = this.$tabContent.find(anchor);

      //close old tab
      this._collapseTab($oldTab);

      //open new tab
      this._openTab($target);

      //either replace or update browser history
      if (this.options.deepLink && !historyHandled) {
        if (this.options.updateHistory) {
          history.pushState({}, '', location.pathname + location.search + anchor);
        } else {
          history.replaceState({}, '', location.pathname + location.search + anchor);
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
      var $targetAnchor = $target.removeClass("".concat(this.options.linkActiveClass)).find('[role="tab"]').attr({
        'aria-selected': 'false',
        'tabindex': -1
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat($targetAnchor.attr('aria-controls'))).removeClass("".concat(this.options.panelActiveClass)).attr({
        'aria-hidden': 'true'
      });
    }

    /**
     * Collapses the active Tab.
     * @fires Tabs#collapse
     * @function
     */
  }, {
    key: "_collapse",
    value: function _collapse() {
      var $activeTab = this.$element.find(".".concat(this.options.linkClass, ".").concat(this.options.linkActiveClass));
      if ($activeTab.length) {
        this._collapseTab($activeTab);

        /**
        * Fires when the plugin has successfully collapsed tabs.
        * @event Tabs#collapse
        */
        this.$element.trigger('collapse.zf.tabs', [$activeTab]);
      }
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
      var idStr, hashIdStr;
      if (_typeof(elem) === 'object') {
        idStr = elem[0].id;
      } else {
        idStr = elem;
      }
      if (idStr.indexOf('#') < 0) {
        hashIdStr = "#".concat(idStr);
      } else {
        hashIdStr = idStr;
        idStr = idStr.slice(1);
      }
      var $target = this.$tabTitles.has("[href$=\"".concat(hashIdStr, "\"],[data-tabs-target=\"").concat(idStr, "\"]")).first();
      this._handleTabChange($target, historyHandled);
    }
  }, {
    key: "_setHeight",
    value:
    /**
     * Sets the height of each panel to the height of the tallest panel.
     * If enabled in options, gets called on media query change.
     * If loading content via external source, can be called directly or with _reflow.
     * If enabled with `data-match-height="true"`, tabs sets to equal height
     * @function
     * @private
     */
    function _setHeight() {
      var max = 0,
        _this = this; // Lock down the `this` value for the root tabs object

      if (!this.$tabContent) {
        return;
      }
      this.$tabContent.find(".".concat(this.options.panelClass)).css('min-height', '').each(function () {
        var panel = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this),
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
      }).css('min-height', "".concat(max, "px"));
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
          jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('changed.zf.mediaquery', this._setHeightMqHandler);
        }
      }
      if (this.options.deepLink) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off('hashchange', this._checkDeepLink);
      }
      if (this.onLoadListener) {
        jquery__WEBPACK_IMPORTED_MODULE_0___default()(window).off(this.onLoadListener);
      }
    }
  }]);
}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);
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
   * If `deepLinkSmudge` is enabled, animation offset from the top for the deep link adjustment
   * @option
   * @type {number}
   * @default 0
   */
  deepLinkSmudgeOffset: 0,
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

/***/ "./foundation.core":
/*!****************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.core"],"amd":"./foundation.core","commonjs":"./foundation.core","commonjs2":"./foundation.core"} ***!
  \****************************************************************************************************************************************************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_core__;

/***/ }),

/***/ "./foundation.util.imageLoader":
/*!****************************************************************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.util.imageLoader"],"amd":"./foundation.util.imageLoader","commonjs":"./foundation.util.imageLoader","commonjs2":"./foundation.util.imageLoader"} ***!
  \****************************************************************************************************************************************************************************************************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_util_imageLoader__;

/***/ }),

/***/ "./foundation.util.keyboard":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.util.keyboard"],"amd":"./foundation.util.keyboard","commonjs":"./foundation.util.keyboard","commonjs2":"./foundation.util.keyboard"} ***!
  \****************************************************************************************************************************************************************************************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_util_keyboard__;

/***/ }),

/***/ "jquery":
/*!********************************************************************************************!*\
  !*** external {"root":["jQuery"],"amd":"jquery","commonjs":"jquery","commonjs2":"jquery"} ***!
  \********************************************************************************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE_jquery__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!***********************************************!*\
  !*** ./js/entries/plugins/foundation.tabs.js ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Foundation: function() { return /* reexport safe */ _foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation; },
/* harmony export */   Tabs: function() { return /* reexport safe */ _foundation_tabs__WEBPACK_IMPORTED_MODULE_1__.Tabs; }
/* harmony export */ });
/* harmony import */ var _foundation_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.core */ "./foundation.core");
/* harmony import */ var _foundation_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_foundation_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_tabs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../foundation.tabs */ "./js/foundation.tabs.js");


_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_foundation_tabs__WEBPACK_IMPORTED_MODULE_1__.Tabs, 'Tabs');

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=foundation.tabs.js.map