import { Plugin } from './foundation.plugin';
/**
 * ResponsiveMenu module.
 * @module foundation.responsiveMenu
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */
declare class ResponsiveMenu extends Plugin {
    /**
     * Creates a new instance of a responsive menu.
     * @class
     * @name ResponsiveMenu
     * @fires ResponsiveMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the Menu by parsing the classes from the 'data-ResponsiveMenu' attribute on the element.
     * @function
     * @private
     */
    _init(): void;
    /**
     * Initializes events for the Menu.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
     * @function
     * @private
     */
    _checkMediaQueries(): void;
    /**
     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
     * @function
     */
    _destroy(): void;
}
export { ResponsiveMenu };
