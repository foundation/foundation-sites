import { Plugin } from './foundation.plugin';
export interface PseudoRegEx {
    test: (text: string) => boolean;
}
export interface AbideOptions {
    validateOn?: string;
    labelErrorClass?: string;
    inputErrorClass?: string;
    formErrorSelector?: string;
    formErrorClass?: string;
    liveValidate?: boolean;
    validateOnBlur?: boolean;
    validators?: any;
    patterns?: {
        [key: string]: RegExp | PseudoRegEx;
    };
}
/**
 * Abide module.
 * @module foundation.abide
 */
export declare class Abide extends Plugin {
    static className: string;
    /**
     * Default settings for plugin
     */
    static defaults: AbideOptions;
    $element: JQuery;
    $inputs: JQuery;
    options: AbideOptions;
    /**
     * Creates a new instance of Abide.
     * @class
     * @name Abide
     * @fires Abide#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: JQuery, options?: AbideOptions): void;
    /**
     * Initializes the Abide plugin and calls functions to get Abide functioning on load.
     * @private
     */
    _init(): void;
    /**
     * Initializes events for Abide.
     * @private
     */
    _events(): void;
    /**
     * Calls necessary functions to update Abide upon DOM change
     * @private
     */
    _reflow(): void;
    /**
     * Checks whether or not a form element has the required attribute and if it's checked or not
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
    requiredCheck($el: JQuery): boolean;
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
    findFormError($el: JQuery): JQuery<HTMLElement>;
    /**
     * Get the first element in this order:
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $el - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
    findLabel($el: JQuery): JQuery<HTMLElement>;
    /**
     * Get the set of labels associated with a set of radio els in this order
     * 2. The <label> with the attribute `[for="someInputId"]`
     * 3. The `.closest()` <label>
     *
     * @param {Object} $els - jQuery object to check for required attribute
     * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
     */
    findRadioLabels($els: JQuery): JQuery<HTMLElement>;
    /**
     * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
     * @param {Object} $el - jQuery object to add the class to
     */
    addErrorClasses($el: JQuery): void;
    /**
     * Remove CSS error classes etc from an entire radio button group
     * @param {String} groupName - A string that specifies the name of a radio button group
     *
     */
    removeRadioErrorClasses(groupName: string): void;
    /**
     * Removes CSS error class as specified by the Abide settings from the label, input, and the form
     * @param {Object} $el - jQuery object to remove the class from
     */
    removeErrorClasses($el: JQuery): any;
    /**
     * Goes through a form to find inputs and proceeds to validate them in ways specific to their type.
     * Ignores inputs with data-abide-ignore, type="hidden" or disabled attributes set
     * @fires Abide#invalid
     * @fires Abide#valid
     * @param {Object} $el - jQuery object to validate, should be an HTML input
     * @returns {Boolean} goodToGo - If the input is valid or not.
     */
    validateInput($el: JQuery): boolean;
    /**
     * Goes through a form and if there are any invalid inputs, it will display the form error element
     * @returns {Boolean} noError - true if no errors were detected...
     * @fires Abide#formvalid
     * @fires Abide#forminvalid
     */
    validateForm(): boolean;
    /**
     * Determines whether or a not a text input is valid based on the pattern specified in the attribute. If no matching pattern is found, returns true.
     * @param {Object} $el - jQuery object to validate, should be a text input HTML element
     * @param {String} pattern - string value of one of the RegEx patterns in Abide.options.patterns
     * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
     */
    validateText($el: JQuery, pattern: string): boolean;
    /**
     * Determines whether or a not a radio input is valid based on whether or not it is required and selected. Although the function targets a single `<input>`, it validates by checking the `required` and `checked` properties of all radio buttons in its group.
     * @param {String} groupName - A string that specifies the name of a radio button group
     * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
     */
    validateRadio(groupName: string): boolean;
    /**
     * Determines if a selected input passes a custom validation function. Multiple validations can be used, if passed to the element with `data-validator="foo bar baz"` in a space separated listed.
     * @param {Object} $el - jQuery input element.
     * @param {String} validators - a string of function names matching functions in the Abide.options.validators object.
     * @param {Boolean} required - self explanatory?
     * @returns {Boolean} - true if validations passed.
     */
    matchValidation($el: JQuery, validators: string, required: boolean): boolean;
    /**
     * Resets form inputs and styles
     * @fires Abide#formreset
     */
    resetForm(): void;
    /**
     * Destroys an instance of Abide.
     * Removes error styles and classes from elements, without resetting their values.
     */
    _destroy(): void;
}
