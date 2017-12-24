import { Plugin } from './foundation.plugin';
/**
 * ResponsiveToggle module.
 * @module foundation.responsiveToggle
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion
 */
declare class ResponsiveToggle extends Plugin {
    /**
     * Creates a new instance of Tab Bar.
     * @class
     * @name ResponsiveToggle
     * @fires ResponsiveToggle#init
     * @param {jQuery} element - jQuery object to attach tab bar functionality to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the tab bar by finding the target element, toggling element, and running update().
     * @function
     * @private
     */
    _init(): void;
    /**
     * Adds necessary event handlers for the tab bar to work.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Checks the current media query to determine if the tab bar should be visible or hidden.
     * @function
     * @private
     */
    _update(): void;
    /**
     * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
     * @function
     * @fires ResponsiveToggle#toggled
     */
    toggleMenu(): void;
    _destroy(): void;
}
export { ResponsiveToggle };
