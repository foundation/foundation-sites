import { Plugin } from './foundation.plugin';
/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.smoothScroll
 */
declare class Magellan extends Plugin {
    /**
     * Creates a new instance of Magellan.
     * @class
     * @name Magellan
     * @fires Magellan#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
     * @private
     */
    _init(): void;
    /**
     * Calculates an array of pixel values that are the demarcation lines between locations on the page.
     * Can be invoked if new elements are added or the size of a location changes.
     * @function
     */
    calcPoints(): void;
    /**
     * Initializes events for Magellan.
     * @private
     */
    _events(): void;
    /**
     * Function to scroll to a given location on the page.
     * @param {String} loc - a properly formatted jQuery id selector. Example: '#foo'
     * @function
     */
    scrollToLoc(loc: any): void;
    /**
     * Calls necessary functions to update Magellan upon DOM change
     * @function
     */
    reflow(): void;
    /**
     * Updates the visibility of an active location link, and updates the url hash for the page, if deepLinking enabled.
     * @private
     * @function
     * @fires Magellan#update
     */
    _updateActive(): void;
    /**
     * Destroys an instance of Magellan and resets the url of the window.
     * @function
     */
    _destroy(): void;
}
export { Magellan };
