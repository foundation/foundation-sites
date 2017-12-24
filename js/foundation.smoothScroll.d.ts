import { Plugin } from './foundation.plugin';
/**
 * SmoothScroll module.
 * @module foundation.smooth-scroll
 */
declare class SmoothScroll extends Plugin {
    /**
     * Creates a new instance of SmoothScroll.
     * @class
     * @name SmoothScroll
     * @fires SmoothScroll#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initialize the SmoothScroll plugin
     * @private
     */
    _init(): void;
    /**
     * Initializes events for SmoothScroll.
     * @private
     */
    _events(): void;
    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - A properly formatted jQuery id selector. Example: '#foo'
     * @param {Object} options - The options to use.
     * @param {Function} callback - The callback function.
     * @static
     * @function
     */
    static scrollToLoc(loc: any, options: any, callback: any): false | undefined;
}
export { SmoothScroll };
