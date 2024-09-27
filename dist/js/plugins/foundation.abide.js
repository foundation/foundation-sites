(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("./foundation.core"), require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["./foundation.core", "jquery"], factory);
	else if(typeof exports === 'object')
		exports["__FOUNDATION_EXTERNAL__"] = factory(require("./foundation.core"), require("jquery"));
	else
		root["__FOUNDATION_EXTERNAL__"] = root["__FOUNDATION_EXTERNAL__"] || {}, root["__FOUNDATION_EXTERNAL__"]["foundation.abide"] = factory(root["__FOUNDATION_EXTERNAL__"]["foundation.core"], root["jQuery"]);
})(self, function(__WEBPACK_EXTERNAL_MODULE__foundation_core__, __WEBPACK_EXTERNAL_MODULE_jquery__) {
return /******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/foundation.abide.js":
/*!********************************!*\
  !*** ./js/foundation.abide.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Abide: function() { return /* binding */ Abide; }
/* harmony export */ });
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./foundation.core.utils */ "./foundation.core");
/* harmony import */ var _foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__);
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
 * Abide module.
 * @module foundation.abide
 */
var Abide = /*#__PURE__*/function (_Plugin) {
  function Abide() {
    _classCallCheck(this, Abide);
    return _callSuper(this, Abide, arguments);
  }
  _inherits(Abide, _Plugin);
  return _createClass(Abide, [{
    key: "_setup",
    value:
    /**
     * Creates a new instance of Abide.
     * @class
     * @name Abide
     * @fires Abide#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    function _setup(element) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.$element = element;
      this.options = jquery__WEBPACK_IMPORTED_MODULE_0___default().extend(true, {}, Abide.defaults, this.$element.data(), options);
      this.isEnabled = true;
      this.formnovalidate = null;
      this.className = 'Abide'; // ie9 back compat
      this._init();
    }

    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */
  }, {
    key: "_init",
    value: function _init() {
      var _this2 = this;
      this.$inputs = jquery__WEBPACK_IMPORTED_MODULE_0___default().merge(
      // Consider as input to validate:
      this.$element.find('input').not('[type="submit"]'),
      // * all input fields expect submit
      this.$element.find('textarea, select') // * all textareas and select fields
      );
      this.$submits = this.$element.find('[type="submit"]');
      var $globalErrors = this.$element.find('[data-abide-error]');

      // Add a11y attributes to all fields
      if (this.options.a11yAttributes) {
        this.$inputs.each(function (i, input) {
          return _this2.addA11yAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(input));
        });
        $globalErrors.each(function (i, error) {
          return _this2.addGlobalErrorA11yAttributes(jquery__WEBPACK_IMPORTED_MODULE_0___default()(error));
        });
      }
      this._events();
    }

    /**
     * Initializes events for Abide.
     * @private
     */
  }, {
    key: "_events",
    value: function _events() {
      var _this3 = this;
      this.$element.off('.abide').on('reset.zf.abide', function () {
        _this3.resetForm();
      }).on('submit.zf.abide', function () {
        return _this3.validateForm();
      });
      this.$submits.off('click.zf.abide keydown.zf.abide').on('click.zf.abide keydown.zf.abide', function (e) {
        if (!e.key || e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          _this3.formnovalidate = e.target.getAttribute('formnovalidate') !== null;
          _this3.$element.submit();
        }
      });
      if (this.options.validateOn === 'fieldChange') {
        this.$inputs.off('change.zf.abide').on('change.zf.abide', function (e) {
          _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));
        });
      }
      if (this.options.liveValidate) {
        this.$inputs.off('input.zf.abide').on('input.zf.abide', function (e) {
          _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));
        });
      }
      if (this.options.validateOnBlur) {
        this.$inputs.off('blur.zf.abide').on('blur.zf.abide', function (e) {
          _this3.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e.target));
        });
      }
    }

    /**
     * Calls necessary functions to update Abide upon DOM change
     * @private
     */
  }, {
    key: "_reflow",
    value: function _reflow() {
      this._init();
    }

    /**
     * Checks whether the submitted form should be validated or not, consodering formnovalidate and isEnabled
     * @returns {Boolean}
     * @private
     */
  }, {
    key: "_validationIsDisabled",
    value: function _validationIsDisabled() {
      if (this.isEnabled === false) {
        // whole validation disabled
        return true;
      } else if (typeof this.formnovalidate === 'boolean') {
        // triggered by $submit
        return this.formnovalidate;
      }
      // triggered by Enter in non-submit input
      return this.$submits.length ? this.$submits[0].getAttribute('formnovalidate') !== null : false;
    }

    /**
     * Enables the whole validation
     */
  }, {
    key: "enableValidation",
    value: function enableValidation() {
      this.isEnabled = true;
    }

    /**
     * Disables the whole validation
     */
  }, {
    key: "disableValidation",
    value: function disableValidation() {
      this.isEnabled = false;
    }

    /**
     * Checks whether or not a form element has the required attribute and if it's checked or not
     * @param {Object} element - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
  }, {
    key: "requiredCheck",
    value: function requiredCheck($el) {
      if (!$el.attr('required')) return true;
      var isGood = true;
      switch ($el[0].type) {
        case 'checkbox':
          isGood = $el[0].checked;
          break;
        case 'select':
        case 'select-one':
        case 'select-multiple':
          var opt = $el.find('option:selected');
          if (!opt.length || !opt.val()) isGood = false;
          break;
        default:
          if (!$el.val() || !$el.val().length) isGood = false;
      }
      return isGood;
    }

    /**
     * Get:
     * - Based on $el, the first element(s) corresponding to `formErrorSelector` in this order:
     *   1. The element's direct sibling('s).
     *   2. The element's parent's children.
     * - Element(s) with the attribute `[data-form-error-for]` set with the element's id.
     *
     * This allows for multiple form errors per input, though if none are found, no form errors will be shown.
     *
     * @param {Object} $el - jQuery object to use as reference to find the form error selector.
     * @param {String[]} [failedValidators] - List of failed validators.
     * @returns {Object} jQuery object with the selector.
     */
  }, {
    key: "findFormError",
    value: function findFormError($el, failedValidators) {
      var _this4 = this;
      var id = $el.length ? $el[0].id : '';
      var $error = $el.siblings(this.options.formErrorSelector);
      if (!$error.length) {
        $error = $el.parent().find(this.options.formErrorSelector);
      }
      if (id) {
        $error = $error.add(this.$element.find("[data-form-error-for=\"".concat(id, "\"]")));
      }
      if (!!failedValidators) {
        $error = $error.not('[data-form-error-on]');
        failedValidators.forEach(function (v) {
          $error = $error.add($el.siblings("[data-form-error-on=\"".concat(v, "\"]")));
          $error = $error.add(_this4.$element.find("[data-form-error-for=\"".concat(id, "\"][data-form-error-on=\"").concat(v, "\"]")));
        });
      }
      return $error;
    }

    /**
     * Get the first element in this order:
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
  }, {
    key: "findLabel",
    value: function findLabel($el) {
      var id = $el[0].id;
      var $label = this.$element.find("label[for=\"".concat(id, "\"]"));
      if (!$label.length) {
        return $el.closest('label');
      }
      return $label;
    }

    /**
     * Get the set of labels associated with a set of radio els in this order
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
  }, {
    key: "findRadioLabels",
    value: function findRadioLabels($els) {
      var _this5 = this;
      var labels = $els.map(function (i, el) {
        var id = el.id;
        var $label = _this5.$element.find("label[for=\"".concat(id, "\"]"));
        if (!$label.length) {
          $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).closest('label');
        }
        return $label[0];
      });
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(labels);
    }

    /**
     * Get the set of labels associated with a set of checkbox els in this order
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
  }, {
    key: "findCheckboxLabels",
    value: function findCheckboxLabels($els) {
      var _this6 = this;
      var labels = $els.map(function (i, el) {
        var id = el.id;
        var $label = _this6.$element.find("label[for=\"".concat(id, "\"]"));
        if (!$label.length) {
          $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(el).closest('label');
        }
        return $label[0];
      });
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()(labels);
    }

    /**
     * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
     * @param {Object} $el - jQuery object to add the class to
     * @param {String[]} [failedValidators] - List of failed validators.
     */
  }, {
    key: "addErrorClasses",
    value: function addErrorClasses($el, failedValidators) {
      var $label = this.findLabel($el);
      var $formError = this.findFormError($el, failedValidators);
      if ($label.length) {
        $label.addClass(this.options.labelErrorClass);
      }
      if ($formError.length) {
        $formError.addClass(this.options.formErrorClass);
      }
      $el.addClass(this.options.inputErrorClass).attr({
        'data-invalid': '',
        'aria-invalid': true
      });
      if ($formError.filter(':visible').length) {
        this.addA11yErrorDescribe($el, $formError);
      }
    }

    /**
     * Adds [for] and [role=alert] attributes to all form error targetting $el,
     * and [aria-describedby] attribute to $el toward the first form error.
     * @param {Object} $el - jQuery object
     */
  }, {
    key: "addA11yAttributes",
    value: function addA11yAttributes($el) {
      var $errors = this.findFormError($el);
      var $labels = $errors.filter('label');
      if (!$errors.length) return;
      var $error = $errors.filter(':visible').first();
      if ($error.length) {
        this.addA11yErrorDescribe($el, $error);
      }
      if ($labels.filter('[for]').length < $labels.length) {
        // Get the input ID or create one
        var elemId = $el.attr('id');
        if (typeof elemId === 'undefined') {
          elemId = (0,_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, 'abide-input');
          $el.attr('id', elemId);
        }

        // For each label targeting $el, set [for] if it is not set.
        $labels.each(function (i, label) {
          var $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(label);
          if (typeof $label.attr('for') === 'undefined') $label.attr('for', elemId);
        });
      }

      // For each error targeting $el, set [role=alert] if it is not set.
      $errors.each(function (i, label) {
        var $label = jquery__WEBPACK_IMPORTED_MODULE_0___default()(label);
        if (typeof $label.attr('role') === 'undefined') $label.attr('role', 'alert');
      }).end();
    }
  }, {
    key: "addA11yErrorDescribe",
    value: function addA11yErrorDescribe($el, $error) {
      if ($el.attr('type') === 'hidden') return;
      if (typeof $el.attr('aria-describedby') !== 'undefined') return;

      // Set [aria-describedby] on the input toward the first form error if it is not set
      // Get the first error ID or create one
      var errorId = $error.attr('id');
      if (typeof errorId === 'undefined') {
        errorId = (0,_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.GetYoDigits)(6, 'abide-error');
        $error.attr('id', errorId);
      }
      $el.attr('aria-describedby', errorId).data('abide-describedby', true);
    }

    /**
     * Adds [aria-live] attribute to the given global form error $el.
     * @param {Object} $el - jQuery object to add the attribute to
     */
  }, {
    key: "addGlobalErrorA11yAttributes",
    value: function addGlobalErrorA11yAttributes($el) {
      if (typeof $el.attr('aria-live') === 'undefined') $el.attr('aria-live', this.options.a11yErrorLevel);
    }

    /**
     * Remove CSS error classes etc from an entire radio button group
     * @param {String} groupName - A string that specifies the name of a radio button group
     *
     */
  }, {
    key: "removeRadioErrorClasses",
    value: function removeRadioErrorClasses(groupName) {
      var $els = this.$element.find(":radio[name=\"".concat(groupName, "\"]"));
      var $labels = this.findRadioLabels($els);
      var $formErrors = this.findFormError($els);
      if ($labels.length) {
        $labels.removeClass(this.options.labelErrorClass);
      }
      if ($formErrors.length) {
        $formErrors.removeClass(this.options.formErrorClass);
      }
      $els.removeClass(this.options.inputErrorClass).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
    }

    /**
     * Remove CSS error classes etc from an entire checkbox group
     * @param {String} groupName - A string that specifies the name of a checkbox group
     *
     */
  }, {
    key: "removeCheckboxErrorClasses",
    value: function removeCheckboxErrorClasses(groupName) {
      var $els = this.$element.find(":checkbox[name=\"".concat(groupName, "\"]"));
      var $labels = this.findCheckboxLabels($els);
      var $formErrors = this.findFormError($els);
      if ($labels.length) {
        $labels.removeClass(this.options.labelErrorClass);
      }
      if ($formErrors.length) {
        $formErrors.removeClass(this.options.formErrorClass);
      }
      $els.removeClass(this.options.inputErrorClass).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
    }

    /**
     * Removes CSS error class as specified by the Abide settings from the label, input, and the form
     * @param {Object} $el - jQuery object to remove the class from
     */
  }, {
    key: "removeErrorClasses",
    value: function removeErrorClasses($el) {
      // radios need to clear all of the els
      if ($el[0].type === 'radio') {
        return this.removeRadioErrorClasses($el.attr('name'));
      }
      // checkboxes need to clear all of the els
      else if ($el[0].type === 'checkbox') {
        return this.removeCheckboxErrorClasses($el.attr('name'));
      }
      var $label = this.findLabel($el);
      var $formError = this.findFormError($el);
      if ($label.length) {
        $label.removeClass(this.options.labelErrorClass);
      }
      if ($formError.length) {
        $formError.removeClass(this.options.formErrorClass);
      }
      $el.removeClass(this.options.inputErrorClass).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      if ($el.data('abide-describedby')) {
        $el.removeAttr('aria-describedby').removeData('abide-describedby');
      }
    }

    /**
     * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
     * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
     * @fires Abide#invalid
     * @fires Abide#valid
     * @param {Object} element - jQuery object to validate, should be an HTML input
     * @returns {Boolean} goodToGo - If the input is valid or not.
     */
  }, {
    key: "validateInput",
    value: function validateInput($el) {
      var _this7 = this;
      var clearRequire = this.requiredCheck($el),
        validator = $el.attr('data-validator'),
        failedValidators = [],
        manageErrorClasses = true;

      // skip validation if disabled
      if (this._validationIsDisabled()) {
        return true;
      }

      // don't validate ignored inputs or hidden inputs or disabled inputs
      if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]') || $el.is('[disabled]')) {
        return true;
      }
      switch ($el[0].type) {
        case 'radio':
          this.validateRadio($el.attr('name')) || failedValidators.push('required');
          break;
        case 'checkbox':
          this.validateCheckbox($el.attr('name')) || failedValidators.push('required');
          // validateCheckbox() adds/removes error classes
          manageErrorClasses = false;
          break;
        case 'select':
        case 'select-one':
        case 'select-multiple':
          clearRequire || failedValidators.push('required');
          break;
        default:
          clearRequire || failedValidators.push('required');
          this.validateText($el) || failedValidators.push('pattern');
      }
      if (validator) {
        var required = $el.attr('required') ? true : false;
        validator.split(' ').forEach(function (v) {
          _this7.options.validators[v]($el, required, $el.parent()) || failedValidators.push(v);
        });
      }
      if ($el.attr('data-equalto')) {
        this.options.validators.equalTo($el) || failedValidators.push('equalTo');
      }
      var goodToGo = failedValidators.length === 0;
      var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';
      if (goodToGo) {
        // Re-validate inputs that depend on this one with equalto
        var dependentElements = this.$element.find("[data-equalto=\"".concat($el.attr('id'), "\"]"));
        if (dependentElements.length) {
          var _this = this;
          dependentElements.each(function () {
            if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).val()) {
              _this.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
            }
          });
        }
      }
      if (manageErrorClasses) {
        this.removeErrorClasses($el);
        if (!goodToGo) {
          this.addErrorClasses($el, failedValidators);
        }
      }

      /**
       * Fires when the input is done checking for validation. Event trigger is either `valid.zf.abide` or `invalid.zf.abide`
       * Trigger includes the DOM element of the input.
       * @event Abide#valid
       * @event Abide#invalid
       */
      $el.trigger(message, [$el]);
      return goodToGo;
    }

    /**
     * Goes through a form and if there are any invalid inputs, it will display the form error element
     * @returns {Boolean} noError - true if no errors were detected...
     * @fires Abide#formvalid
     * @fires Abide#forminvalid
     */
  }, {
    key: "validateForm",
    value: function validateForm() {
      var _this8 = this;
      var acc = [];
      var _this = this;
      var checkboxGroupName;

      // Remember first form submission to prevent specific checkbox validation (more than one required) until form got initially submitted
      if (!this.initialized) {
        this.initialized = true;
      }

      // skip validation if disabled
      if (this._validationIsDisabled()) {
        this.formnovalidate = null;
        return true;
      }
      this.$inputs.each(function () {
        // Only use one checkbox per group since validateCheckbox() iterates over all associated checkboxes
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)[0].type === 'checkbox') {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name') === checkboxGroupName) return true;
          checkboxGroupName = jquery__WEBPACK_IMPORTED_MODULE_0___default()(this).attr('name');
        }
        acc.push(_this.validateInput(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this)));
      });
      var noError = acc.indexOf(false) === -1;
      this.$element.find('[data-abide-error]').each(function (i, elem) {
        var $elem = jquery__WEBPACK_IMPORTED_MODULE_0___default()(elem);
        // Ensure a11y attributes are set
        if (_this8.options.a11yAttributes) _this8.addGlobalErrorA11yAttributes($elem);
        // Show or hide the error
        $elem.css('display', noError ? 'none' : 'block');
      });

      /**
       * Fires when the form is finished validating. Event trigger is either `formvalid.zf.abide` or `forminvalid.zf.abide`.
       * Trigger includes the element of the form.
       * @event Abide#formvalid
       * @event Abide#forminvalid
       */
      this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);
      return noError;
    }

    /**
     * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
     * @param {Object} $el - jQuery object to validate, should be a text input HTML element
     * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
     * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
     */
  }, {
    key: "validateText",
    value: function validateText($el, pattern) {
      // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
      pattern = pattern || $el.attr('data-pattern') || $el.attr('pattern') || $el.attr('type');
      var inputText = $el.val();
      var valid = true;
      if (inputText.length) {
        // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
        if (this.options.patterns.hasOwnProperty(pattern)) {
          valid = this.options.patterns[pattern].test(inputText);
        }
        // If the pattern name isn't also the type attribute of the field, then test it as a regexp
        else if (pattern !== $el.attr('type')) {
          valid = new RegExp(pattern).test(inputText);
        }
      }
      return valid;
    }

    /**
     * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
     * @param {String} groupName - A string that specifies the name of a radio button group
     * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
     */
  }, {
    key: "validateRadio",
    value: function validateRadio(groupName) {
      // If at least one radio in the group has the `required` attribute, the group is considered required
      // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
      var $group = this.$element.find(":radio[name=\"".concat(groupName, "\"]"));
      var valid = false,
        required = false;

      // For the group to be required, at least one radio needs to be required
      $group.each(function (i, e) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('required')) {
          required = true;
        }
      });
      if (!required) valid = true;
      if (!valid) {
        // For the group to be valid, at least one radio needs to be checked
        $group.each(function (i, e) {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).prop('checked')) {
            valid = true;
          }
        });
      }
      return valid;
    }

    /**
     * Determines whether or a not a checkbox input is valid based on whether or not it is required and checked. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all checkboxes in its group.
     * @param {String} groupName - A string that specifies the name of a checkbox group
     * @returns {Boolean} Boolean value depends on whether or not at least one checkbox input has been checked (if it's required)
     */
  }, {
    key: "validateCheckbox",
    value: function validateCheckbox(groupName) {
      var _this9 = this;
      // If at least one checkbox in the group has the `required` attribute, the group is considered required
      // Per W3C spec, all checkboxes in a group should have `required`, but we're being nice
      var $group = this.$element.find(":checkbox[name=\"".concat(groupName, "\"]"));
      var valid = false,
        required = false,
        minRequired = 1,
        checked = 0;

      // For the group to be required, at least one checkbox needs to be required
      $group.each(function (i, e) {
        if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('required')) {
          required = true;
        }
      });
      if (!required) valid = true;
      if (!valid) {
        // Count checked checkboxes within the group
        // Use data-min-required if available (default: 1)
        $group.each(function (i, e) {
          if (jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).prop('checked')) {
            checked++;
          }
          if (typeof jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('data-min-required') !== 'undefined') {
            minRequired = parseInt(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e).attr('data-min-required'), 10);
          }
        });

        // For the group to be valid, the minRequired amount of checkboxes have to be checked
        if (checked >= minRequired) {
          valid = true;
        }
      }

      // Skip validation if more than 1 checkbox have to be checked AND if the form hasn't got submitted yet (otherwise it will already show an error during the first fill in)
      if (this.initialized !== true && minRequired > 1) {
        return true;
      }

      // Refresh error class for all input
      $group.each(function (i, e) {
        if (!valid) {
          _this9.addErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e), ['required']);
        } else {
          _this9.removeErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(e));
        }
      });
      return valid;
    }

    /**
     * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
     * @param {Object} $el - jQuery input element.
     * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
     * @param {Boolean} required - self explanatory?
     * @returns {Boolean} - true if validations passed.
     */
  }, {
    key: "matchValidation",
    value: function matchValidation($el, validators, required) {
      var _this10 = this;
      required = required ? true : false;
      var clear = validators.split(' ').map(function (v) {
        return _this10.options.validators[v]($el, required, $el.parent());
      });
      return clear.indexOf(false) === -1;
    }

    /**
     * Resets form inputs and styles
     * @fires Abide#formreset
     */
  }, {
    key: "resetForm",
    value: function resetForm() {
      var $form = this.$element,
        opts = this.options;
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(".".concat(opts.labelErrorClass), $form).not('small').removeClass(opts.labelErrorClass);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(".".concat(opts.inputErrorClass), $form).not('small').removeClass(opts.inputErrorClass);
      jquery__WEBPACK_IMPORTED_MODULE_0___default()("".concat(opts.formErrorSelector, ".").concat(opts.formErrorClass)).removeClass(opts.formErrorClass);
      $form.find('[data-abide-error]').css('display', 'none');
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input:radio', $form).not('[data-abide-ignore]').prop('checked', false).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      jquery__WEBPACK_IMPORTED_MODULE_0___default()(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked', false).attr({
        'data-invalid': null,
        'aria-invalid': null
      });
      /**
       * Fires when the form has been reset.
       * @event Abide#formreset
       */
      $form.trigger('formreset.zf.abide', [$form]);
    }

    /**
     * Destroys an instance of Abide.
     * Removes error styles and classes from elements, without resetting their values.
     */
  }, {
    key: "_destroy",
    value: function _destroy() {
      var _this = this;
      this.$element.off('.abide').find('[data-abide-error]').css('display', 'none');
      this.$inputs.off('.abide').each(function () {
        _this.removeErrorClasses(jquery__WEBPACK_IMPORTED_MODULE_0___default()(this));
      });
      this.$submits.off('.abide');
    }
  }]);
}(_foundation_core_plugin__WEBPACK_IMPORTED_MODULE_1__.Plugin);
/**
 * Default settings for plugin
 */
Abide.defaults = {
  /**
   * The default event to validate inputs. Checkboxes and radios validate immediately.
   * Remove or change this value for manual validation.
   * @option
   * @type {?string}
   * @default 'fieldChange'
   */
  validateOn: 'fieldChange',
  /**
   * Class to be applied to input labels on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-label'
   */
  labelErrorClass: 'is-invalid-label',
  /**
   * Class to be applied to inputs on failed validation.
   * @option
   * @type {string}
   * @default 'is-invalid-input'
   */
  inputErrorClass: 'is-invalid-input',
  /**
   * Class selector to use to target Form Errors for show/hide.
   * @option
   * @type {string}
   * @default '.form-error'
   */
  formErrorSelector: '.form-error',
  /**
   * Class added to Form Errors on failed validation.
   * @option
   * @type {string}
   * @default 'is-visible'
   */
  formErrorClass: 'is-visible',
  /**
   * If true, automatically insert when possible:
   * - `[aria-describedby]` on fields
   * - `[role=alert]` on form errors and `[for]` on form error labels
   * - `[aria-live]` on global errors `[data-abide-error]` (see option `a11yErrorLevel`).
   * @option
   * @type {boolean}
   * @default true
   */
  a11yAttributes: true,
  /**
   * [aria-live] attribute value to be applied on global errors `[data-abide-error]`.
   * Options are: 'assertive', 'polite' and 'off'/null
   * @option
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions
   * @type {string}
   * @default 'assertive'
   */
  a11yErrorLevel: 'assertive',
  /**
   * Set to true to validate text inputs on any value change.
   * @option
   * @type {boolean}
   * @default false
   */
  liveValidate: false,
  /**
   * Set to true to validate inputs on blur.
   * @option
   * @type {boolean}
   * @default false
   */
  validateOnBlur: false,
  patterns: {
    alpha: /^[a-zA-Z]+$/,
    // eslint-disable-next-line camelcase
    alpha_numeric: /^[a-zA-Z0-9]+$/,
    integer: /^[-+]?\d+$/,
    number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
    // amex, visa, diners
    card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    cvv: /^([0-9]){3,4}$/,
    // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
    email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
    // From CommonRegexJS (@talyssonoc)
    // https://github.com/talyssonoc/CommonRegexJS/blob/e2901b9f57222bc14069dc8f0598d5f412555411/lib/commonregex.js#L76
    // For more restrictive URL Regexs, see https://mathiasbynens.be/demo/url-regex.
    url: /^((?:(https?|ftps?|file|ssh|sftp):\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\))+(?:\((?:[^\s()<>]+|(?:\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:\'".,<>?\xab\xbb\u201c\u201d\u2018\u2019]))$/,
    // abc.de
    domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
    datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
    // YYYY-MM-DD
    date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
    // HH:MM:SS
    time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
    dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
    // MM/DD/YYYY
    // eslint-disable-next-line camelcase
    month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
    // DD/MM/YYYY
    // eslint-disable-next-line camelcase
    day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
    // #FFF or #FFFFFF
    color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
    // Domain || URL
    website: {
      test: function test(text) {
        return Abide.defaults.patterns.domain.test(text) || Abide.defaults.patterns.url.test(text);
      }
    }
  },
  /**
   * Optional validation functions to be used. `equalTo` being the only default included function.
   * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
   * el : The jQuery element to validate.
   * @option
   */
  validators: {
    equalTo: function equalTo(el) {
      return jquery__WEBPACK_IMPORTED_MODULE_0___default()("#".concat(el.attr('data-equalto'))).val() === el.val();
    }
  }
};


/***/ }),

/***/ "./foundation.core":
/*!****************************************************************************************************************************************************************!*\
  !*** external {"root":["__FOUNDATION_EXTERNAL__","foundation.core"],"amd":"./foundation.core","commonjs":"./foundation.core","commonjs2":"./foundation.core"} ***!
  \****************************************************************************************************************************************************************/
/***/ (function(module) {

module.exports = __WEBPACK_EXTERNAL_MODULE__foundation_core__;

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
/*!************************************************!*\
  !*** ./js/entries/plugins/foundation.abide.js ***!
  \************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Abide: function() { return /* reexport safe */ _foundation_abide__WEBPACK_IMPORTED_MODULE_1__.Abide; },
/* harmony export */   Foundation: function() { return /* reexport safe */ _foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation; }
/* harmony export */ });
/* harmony import */ var _foundation_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./foundation.core */ "./foundation.core");
/* harmony import */ var _foundation_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_foundation_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _foundation_abide__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../foundation.abide */ "./js/foundation.abide.js");


_foundation_core__WEBPACK_IMPORTED_MODULE_0__.Foundation.plugin(_foundation_abide__WEBPACK_IMPORTED_MODULE_1__.Abide, 'Abide');

}();
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=foundation.abide.js.map