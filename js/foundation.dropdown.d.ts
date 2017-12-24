import { Alignment, Positionable, PositionableOptions } from './foundation.positionable';
export interface DropdownOptions extends PositionableOptions {
    hover?: boolean;
    hoverPane?: boolean;
    positionClass?: string;
    trapFocus?: boolean;
    autoFocus?: boolean;
    closeOnClick?: boolean;
}
/**
 * Dropdown module.
 * @module foundation.dropdown
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.triggers
 */
export declare class Dropdown extends Positionable {
    static className: string;
    static defaults: {
        parentClass: null;
        hoverDelay: number;
        hover: boolean;
        hoverPane: boolean;
        vOffset: number;
        hOffset: number;
        positionClass: string;
        position: string;
        alignment: string;
        allowOverlap: boolean;
        allowBottomOverlap: boolean;
        trapFocus: boolean;
        autoFocus: boolean;
        closeOnClick: boolean;
    };
    options: DropdownOptions;
    $anchors: JQuery;
    $parent: JQuery;
    /**
     * Creates a new instance of a dropdown.
     * @class
     * @name Dropdown
     * @param {jQuery} element - jQuery object to make into a dropdown.
     *        Object should be of the dropdown panel, rather than its anchor.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: DropdownOptions): void;
    /**
     * Initializes the plugin by setting/checking options and attributes, adding helper variables, and saving the anchor.
     * @function
     * @private
     */
    _init(): void;
    _getDefaultPosition(): Alignment;
    _getDefaultAlignment(): Alignment;
    /**
     * Sets the position and orientation of the dropdown pane, checks for collisions if allow-overlap is not true.
     * Recursively calls itself if a collision is detected, with a new position class.
     * @function
     * @private
     */
    _setPosition(): void;
    /**
     * Make it a current anchor.
     * Current anchor as the reference for the position of Dropdown panes.
     * @param {HTML} el - DOM element of the anchor.
     * @function
     * @private
     */
    _setCurrentAnchor(el: any): void;
    /**
     * Adds event listeners to the element utilizing the triggers utility library.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Adds an event handler to the body to close any dropdowns on a click.
     * @function
     * @private
     */
    _addBodyHandler(): void;
    /**
     * Opens the dropdown pane, and fires a bubbling event to close other dropdowns.
     * @function
     * @fires Dropdown#closeme
     * @fires Dropdown#show
     */
    open(): void;
    /**
     * Closes the open dropdown pane.
     * @function
     * @fires Dropdown#hide
     */
    close(): false | undefined;
    /**
     * Toggles the dropdown pane's visibility.
     * @function
     */
    toggle(): void;
    /**
     * Destroys the dropdown.
     * @function
     */
    _destroy(): void;
}
