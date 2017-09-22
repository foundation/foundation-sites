import $ from 'jquery';
import { Plugin } from './foundation.plugin';
/**
 * Abide module.
 * @module foundation.abide
 */
export class Abide extends Plugin {
    /**
     * Creates a new instance of Abide.
     * @class
     * @name Abide
     * @fires Abide#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element, options = {}) {
        this.$element = element;
        this.options = $.extend(true, {}, Abide.defaults, this.$element.data(), options);
        this._init();
    }
    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */
    _init() {
        this.$inputs = this.$element.find('input, textarea, select');
        this._events();
    }
    /**
     * Initializes events for Abide.
     * @private
     */
    _events() {
        this.$element.off('.abide')
            .on('reset.zf.abide', () => {
            this.resetForm();
        })
            .on('submit.zf.abide', () => {
            return this.validateForm();
        });
        if (this.options.validateOn === 'fieldChange') {
            this.$inputs
                .off('change.zf.abide')
                .on('change.zf.abide', (e) => {
                this.validateInput($(e.target));
            });
        }
        if (this.options.liveValidate) {
            this.$inputs
                .off('input.zf.abide')
                .on('input.zf.abide', (e) => {
                this.validateInput($(e.target));
            });
        }
        if (this.options.validateOnBlur) {
            this.$inputs
                .off('blur.zf.abide')
                .on('blur.zf.abide', (e) => {
                this.validateInput($(e.target));
            });
        }
    }
    /**
     * Calls necessary functions to update Abide upon DOM change
     * @private
     */
    _reflow() {
        this._init();
    }
    /**
     * Checks whether or not a form element has the required attribute and if it's checked or not
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
    requiredCheck($el) {
        if (!$el.attr('required'))
            return true;
        let isGood = true;
        const element = $el[0];
        if (element instanceof HTMLInputElement) {
            switch (element.type) {
                case 'checkbox':
                    isGood = element.checked;
                    break;
                case 'select':
                case 'select-one':
                case 'select-multiple':
                    const opt = $el.find('option:selected');
                    isGood = !(!opt.length || !opt.val());
                    break;
                default:
                    isGood = !(!$el.val() || !$el.val().length);
            }
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
     * @returns {Object} jQuery object with the selector.
     */
    findFormError($el) {
        const id = $el[0].id;
        let $error = $el.siblings(this.options.formErrorSelector);
        if (!$error.length) {
            $error = $el.parent().find(this.options.formErrorSelector);
        }
        $error = $error.add(this.$element.find(`[data-form-error-for="${id}"]`));
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
    findLabel($el) {
        const id = $el[0].id;
        const $label = this.$element.find(`label[for="${id}"]`);
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
     * @param {Object} $els - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
    findRadioLabels($els) {
        const labels = $els.map((i, el) => {
            const id = el.id;
            let $label = this.$element.find(`label[for="${id}"]`);
            if (!$label.length) {
                $label = $(el).closest('label');
            }
            return $label[0];
        });
        return $(labels);
    }
    /**
     * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
     * @param {Object} $el - jQuery object to add the class to
     */
    addErrorClasses($el) {
        const $label = this.findLabel($el);
        const $formError = this.findFormError($el);
        if ($label.length) {
            $label.addClass(this.options.labelErrorClass);
        }
        if ($formError.length) {
            $formError.addClass(this.options.formErrorClass);
        }
        $el.addClass(this.options.inputErrorClass).attr('data-invalid', '');
    }
    /**
     * Remove CSS error classes etc from an entire radio button group
     * @param {String} groupName - A string that specifies the name of a radio button group
     *
     */
    removeRadioErrorClasses(groupName) {
        const $els = this.$element.find(`:radio[name="${groupName}"]`);
        const $labels = this.findRadioLabels($els);
        const $formErrors = this.findFormError($els);
        if ($labels.length) {
            $labels.removeClass(this.options.labelErrorClass);
        }
        if ($formErrors.length) {
            $formErrors.removeClass(this.options.formErrorClass);
        }
        $els.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
    }
    /**
     * Removes CSS error class as specified by the Abide settings from the label, input, and the form
     * @param {Object} $el - jQuery object to remove the class from
     */
    removeErrorClasses($el) {
        // radios need to clear all of the els
        const element = $el[0];
        if (element instanceof HTMLInputElement && element.type === 'radio') {
            return this.removeRadioErrorClasses($el.attr('name'));
        }
        const $label = this.findLabel($el);
        const $formError = this.findFormError($el);
        if ($label.length) {
            $label.removeClass(this.options.labelErrorClass);
        }
        if ($formError.length) {
            $formError.removeClass(this.options.formErrorClass);
        }
        $el.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
    }
    /**
     * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
     * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
     * @fires Abide#invalid
     * @fires Abide#valid
     * @param {Object} $el - jQuery object to validate, should be an HTML input
     * @returns {Boolean} goodToGo - If the input is valid or not.
     */
    validateInput($el) {
        let clearRequire = this.requiredCheck($el), validated = false, customValidator = true, validator = $el.attr('data-validator'), equalTo = true;
        // don't validate ignored inputs or hidden inputs or disabled inputs
        if ($el.is('[data-abide-ignore]') || $el.is('[type="hidden"]') || $el.is('[disabled]')) {
            return true;
        }
        switch ($el[0].type) {
            case 'radio':
                validated = this.validateRadio($el.attr('name'));
                break;
            case 'checkbox':
                validated = clearRequire;
                break;
            case 'select':
            case 'select-one':
            case 'select-multiple':
                validated = clearRequire;
                break;
            default:
                validated = this.validateText($el);
        }
        if (validator) {
            customValidator = this.matchValidation($el, validator, $el.attr('required'));
        }
        if ($el.attr('data-equalto')) {
            equalTo = this.options.validators.equalTo($el);
        }
        const goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
        const message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';
        if (goodToGo) {
            // Re-validate inputs that depend on this one with equalto
            const dependentElements = this.$element.find(`[data-equalto="${$el.attr('id')}"]`);
            if (dependentElements.length) {
                dependentElements.each((element) => {
                    if ($(element).val()) {
                        this.validateInput($(element));
                    }
                });
            }
        }
        this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);
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
    validateForm() {
        const acc = [];
        this.$inputs.each((element) => {
            acc.push(this.validateInput($(element)));
        });
        const noError = acc.indexOf(false) === -1;
        this.$element.find('[data-abide-error]').css('display', (noError ? 'none' : 'block'));
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
    validateText($el, pattern) {
        // A pattern can be passed to this function, or it will be infered from the input's "pattern" attribute, or it's "type" attribute
        pattern = (pattern || $el.attr('pattern') || $el.attr('type'));
        const inputText = $el.val();
        let valid = false;
        if (inputText.length) {
            // If the pattern attribute on the element is in Abide's list of patterns, then test that regexp
            if (this.options.patterns.hasOwnProperty(pattern)) {
                valid = this.options.patterns[pattern].test(inputText);
            }
            else if (pattern !== $el.attr('type')) {
                valid = new RegExp(pattern).test(inputText);
            }
            else {
                valid = true;
            }
        }
        else if (!$el.prop('required')) {
            valid = true;
        }
        return valid;
    }
    /**
     * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
     * @param {String} groupName - A string that specifies the name of a radio button group
     * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
     */
    validateRadio(groupName) {
        // If at least one radio in the group has the `required` attribute, the group is considered required
        // Per W3C spec, all radio buttons in a group should have `required`, but we're being nice
        const $group = this.$element.find(`:radio[name="${groupName}"]`);
        let valid = false, required = false;
        // For the group to be required, at least one radio needs to be required
        $group.each((i, e) => {
            if ($(e).attr('required')) {
                required = true;
            }
        });
        if (!required)
            valid = true;
        if (!valid) {
            // For the group to be valid, at least one radio needs to be checked
            $group.each((i, e) => {
                if ($(e).prop('checked')) {
                    valid = true;
                }
            });
        }
        return valid;
    }
    /**
     * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
     * @param {Object} $el - jQuery input element.
     * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
     * @param {Boolean} required - self explanatory?
     * @returns {Boolean} - true if validations passed.
     */
    matchValidation($el, validators, required) {
        const clear = validators.split(' ').map((v) => {
            return this.options.validators[v]($el, required, $el.parent());
        });
        return clear.indexOf(false) === -1;
    }
    /**
     * Resets form inputs and styles
     * @fires Abide#formreset
     */
    resetForm() {
        const $form = this.$element, opts = this.options;
        $(`.${opts.labelErrorClass}`, $form).not('small').removeClass(opts.labelErrorClass);
        $(`.${opts.inputErrorClass}`, $form).not('small').removeClass(opts.inputErrorClass);
        $(`${opts.formErrorSelector}.${opts.formErrorClass}`).removeClass(opts.formErrorClass);
        $form.find('[data-abide-error]').css('display', 'none');
        $(':input', $form).not(':button, :submit, :reset, :hidden, :radio, :checkbox, [data-abide-ignore]').val('').removeAttr('data-invalid');
        $(':input:radio', $form).not('[data-abide-ignore]').prop('checked', false).removeAttr('data-invalid');
        $(':input:checkbox', $form).not('[data-abide-ignore]').prop('checked', false).removeAttr('data-invalid');
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
    _destroy() {
        this.$element
            .off('.abide')
            .find('[data-abide-error]')
            .css('display', 'none');
        this.$inputs
            .off('.abide')
            .each((element) => {
            this.removeErrorClasses($(element));
        });
    }
}
Abide.className = 'Abide'; // ie9 back compat
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
        alpha_numeric: /^[a-zA-Z0-9]+$/,
        integer: /^[-+]?\d+$/,
        number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
        // amex, visa, diners
        card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|(?:222[1-9]|2[3-6][0-9]{2}|27[0-1][0-9]|2720)[0-9]{12}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        cvv: /^([0-9]){3,4}$/,
        // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
        email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
        url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
        // abc.de
        domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
        datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
        // YYYY-MM-DD
        date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
        // HH:MM:SS
        time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
        dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
        // MM/DD/YYYY
        month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
        // DD/MM/YYYY
        day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
        // #FFF or #FFFFFF
        color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        // Domain || URL
        website: {
            test: (text) => {
                return Abide.defaults.patterns.domain.test(text) || Abide.defaults.patterns.url.test(text);
            },
        },
    },
    /**
     * Optional validation functions to be used. `equalTo` being the only default included function.
     * Functions should return only a boolean if the input is valid or not. Functions are given the following arguments:
     * el : The jQuery element to validate.
     * required : Boolean value of the required attribute be present or not.
     * parent : The direct parent of the input.
     * @option
     */
    validators: {
        equalTo(el, required, parent) {
            return $(`#${el.attr('data-equalto')}`).val() === el.val();
        },
    },
};
