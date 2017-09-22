import { Plugin } from './foundation.plugin';
/**
 * DropdownMenu module.
 * @module foundation.dropdown-menu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 */
declare class DropdownMenu extends Plugin {
    /**
     * Creates a new instance of DropdownMenu.
     * @class
     * @name DropdownMenu
     * @fires DropdownMenu#init
     * @param {jQuery} element - jQuery object to make into a dropdown menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the plugin, and calls _prepareMenu
     * @private
     * @function
     */
    _init(): void;
    _isVertical(): boolean;
    _isRtl(): any;
    /**
     * Adds event listeners to elements within the menu
     * @private
     * @function
     */
    _events(): void;
    /**
     * Adds an event handler to the body to close any dropdowns on a click.
     * @function
     * @private
     */
    _addBodyHandler(): void;
    /**
     * Opens a dropdown pane, and checks for collisions first.
     * @param {jQuery} $sub - ul element that is a submenu to show
     * @function
     * @private
     * @fires DropdownMenu#show
     */
    _show($sub: any): void;
    /**
     * Hides a single, currently open dropdown pane, if passed a parameter, otherwise, hides everything.
     * @function
     * @param {jQuery} $elem - element with a submenu to hide
     * @param {Number} idx - index of the $tabs collection to hide
     * @private
     */
    _hide($elem: any, idx: any): void;
    /**
     * Destroys the plugin.
     * @function
     */
    _destroy(): void;
}
export { DropdownMenu };
