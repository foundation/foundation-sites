import { Positionable } from './foundation.positionable';
/**
 * Tooltip module.
 * @module foundation.tooltip
 * @requires foundation.util.box
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */
declare class Tooltip extends Positionable {
    /**
     * Creates a new instance of a Tooltip.
     * @class
     * @name Tooltip
     * @fires Tooltip#init
     * @param {jQuery} element - jQuery object to attach a tooltip to.
     * @param {Object} options - object to extend the default configuration.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
     * @private
     */
    _init(): void;
    _getDefaultPosition(): any;
    _getDefaultAlignment(): string;
    _getHOffset(): any;
    _getVOffset(): any;
    /**
     * builds the tooltip element, adds attributes, and returns the template.
     * @private
     */
    _buildTemplate(id: any): any;
    /**
     * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
     * if the tooltip is larger than the screen width, default to full width - any user selected margin
     * @private
     */
    _setPosition(): void;
    /**
     * reveals the tooltip, and fires an event to close any other open tooltips on the page
     * @fires Tooltip#closeme
     * @fires Tooltip#show
     * @function
     */
    show(): false | undefined;
    /**
     * Hides the current tooltip, and resets the positioning class if it was changed due to collision
     * @fires Tooltip#hide
     * @function
     */
    hide(): void;
    /**
     * adds event listeners for the tooltip and its anchor
     * TODO combine some of the listeners like focus and mouseenter, etc.
     * @private
     */
    _events(): void;
    /**
     * adds a toggle method, in addition to the static show() & hide() functions
     * @function
     */
    toggle(): void;
    /**
     * Destroys an instance of tooltip, removes template element from the view.
     * @function
     */
    _destroy(): void;
}
/**
 * TODO utilize resize event trigger
 */
export { Tooltip };
