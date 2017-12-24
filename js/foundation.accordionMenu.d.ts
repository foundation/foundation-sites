import { Plugin } from './foundation.plugin';
export interface AccordionMenuOptions {
    slideSpeed?: number;
    multiOpen?: boolean;
}
/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 */
declare class AccordionMenu extends Plugin {
    /**
     * Creates a new instance of an accordion menu.
     * @class
     * @name AccordionMenu
     * @fires AccordionMenu#init
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: JQuery, options: AccordionMenuOptions): void;
    /**
     * Initializes the accordion menu by hiding all nested menus.
     * @private
     */
    _init(): void;
    /**
     * Adds event handlers for items within the menu.
     * @private
     */
    _events(): void;
    /**
     * Closes all panes of the menu.
     * @function
     */
    hideAll(): void;
    /**
     * Opens all panes of the menu.
     * @function
     */
    showAll(): void;
    /**
     * Toggles the open/close state of a submenu.
     * @function
     * @param {jQuery} $target - the submenu to toggle
     */
    toggle($target: any): void;
    /**
     * Opens the sub-menu defined by `$target`.
     * @param {jQuery} $target - Sub-menu to open.
     * @fires AccordionMenu#down
     */
    down($target: any): void;
    /**
     * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
     * @param {jQuery} $target - Sub-menu to close.
     * @fires AccordionMenu#up
     */
    up($target: any): void;
    /**
     * Destroys an instance of accordion menu.
     * @fires AccordionMenu#destroyed
     */
    _destroy(): void;
}
export { AccordionMenu };
