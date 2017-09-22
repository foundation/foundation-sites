import { Plugin } from './foundation.plugin';
/**
 * Toggler module.
 * @module foundation.toggler
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 */
declare class Toggler extends Plugin {
    /**
     * Creates a new instance of Toggler.
     * @class
     * @name Toggler
     * @fires Toggler#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
     * @function
     * @private
     */
    _init(): void;
    /**
     * Initializes events for the toggle trigger.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
     * @function
     * @fires Toggler#on
     * @fires Toggler#off
     */
    toggle(): void;
    _toggleClass(): void;
    _toggleAnimate(): void;
    _updateARIA(isOn: any): void;
    /**
     * Destroys the instance of Toggler on the element.
     * @function
     */
    _destroy(): void;
}
export { Toggler };
