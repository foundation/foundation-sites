import { Plugin } from './foundation.plugin';
export interface InterchangeOptions {
    rules?: Array<any>;
}
/**
 * Interchange module.
 * @module foundation.interchange
 * @requires foundation.util.mediaQuery
 */
declare class Interchange extends Plugin {
    /**
     * Creates a new instance of Interchange.
     * @class
     * @name Interchange
     * @fires Interchange#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: JQuery, options: InterchangeOptions): void;
    /**
     * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
     * @function
     * @private
     */
    _init(): void;
    /**
     * Initializes events for Interchange.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Calls necessary functions to update Interchange upon DOM change
     * @function
     * @private
     */
    _reflow(): void;
    /**
     * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
     * @function
     * @private
     */
    _addBreakpoints(): void;
    /**
     * Checks the Interchange element for the provided media query + content pairings
     * @function
     * @private
     * @param {Object} element - jQuery object that is an Interchange instance
     * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
     */
    _generateRules(element: any): void;
    /**
     * Update the `src` property of an image, or change the HTML of a container, to the specified path.
     * @function
     * @param {String} path - Path to the image or HTML partial.
     * @fires Interchange#replaced
     */
    replace(path: any): void;
    /**
     * Destroys an instance of interchange.
     * @function
     */
    _destroy(): void;
}
export { Interchange };
