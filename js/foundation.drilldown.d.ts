import { Plugin } from './foundation.plugin';
export interface DrilldownOptions {
    backButton?: string;
    wrapper?: string;
    parentLink?: boolean;
    closeOnClick?: boolean;
}
/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.nest
 * @requires foundation.util.box
 */
declare class Drilldown extends Plugin {
    /**
     * Creates a new instance of a drilldown menu.
     * @class
     * @name Drilldown
     * @param {jQuery} element - jQuery object to make into an accordion menu.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: JQuery, options: DrilldownOptions): void;
    /**
     * Initializes the drilldown by creating jQuery collections of elements
     * @private
     */
    _init(): void;
    /**
     * prepares drilldown menu by setting attributes to links and elements
     * sets a min height to prevent content jumping
     * wraps the element if not already wrapped
     * @private
     * @function
     */
    _prepareMenu(): void;
    _resize(): void;
    /**
     * Adds event handlers to elements in the menu.
     * @function
     * @private
     * @param {jQuery} $elem - the current menu item to add handlers to.
     */
    _events($elem: any): void;
    /**
     * Adds event handlers to the menu element.
     * @function
     * @private
     */
    _registerEvents(): void;
    /**
     * Scroll to Top of Element or data-scroll-top-element
     * @function
     * @fires Drilldown#scrollme
     */
    _scrollTop(): void;
    /**
     * Adds keydown event listener to `li`'s in the menu.
     * @private
     */
    _keyboardEvents(): void;
    /**
     * Closes all open elements, and returns to root menu.
     * @function
     * @fires Drilldown#closed
     */
    _hideAll(): void;
    /**
     * Adds event listener for each `back` button, and closes open menus.
     * @function
     * @fires Drilldown#back
     * @param {jQuery} $elem - the current sub-menu to add `back` event.
     */
    _back($elem: any): void;
    /**
     * Adds event listener to menu items w/o submenus to close open menus on click.
     * @function
     * @private
     */
    _menuLinkEvents(): void;
    /**
     * Sets the CSS classes for submenu to show it.
     * @function
     * @private
     * @param {jQuery} $elem - the target submenu (`ul` tag)
     * @param {boolean} trigger - trigger drilldown event
     */
    _setShowSubMenuClasses($elem: any, trigger: any): void;
    /**
     * Sets the CSS classes for submenu to hide it.
     * @function
     * @private
     * @param {jQuery} $elem - the target submenu (`ul` tag)
     * @param {boolean} trigger - trigger drilldown event
     */
    _setHideSubMenuClasses($elem: any, trigger: any): void;
    /**
     * Opens a specific drilldown (sub)menu no matter which (sub)menu in it is currently visible.
     * Compared to _show() this lets you jump into any submenu without clicking through every submenu on the way to it.
     * @function
     * @fires Drilldown#open
     * @param {jQuery} $elem - the target (sub)menu (`ul` tag)
     * @param {boolean} autoFocus - if true the first link in the target (sub)menu gets auto focused
     */
    _showMenu($elem: any, autoFocus: any): void;
    /**
     * Opens a submenu.
     * @function
     * @fires Drilldown#open
     * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
     */
    _show($elem: any): void;
    /**
     * Hides a submenu
     * @function
     * @fires Drilldown#hide
     * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
     */
    _hide($elem: any): void;
    /**
     * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
     * Prevents content jumping.
     * @function
     * @private
     */
    _getMaxDims(): {};
    /**
     * Destroys the Drilldown Menu
     * @function
     */
    _destroy(): void;
}
export { Drilldown };
