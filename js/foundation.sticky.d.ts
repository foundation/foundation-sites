import { Plugin } from './foundation.plugin';
export interface StickyOptions {
    container?: string;
    stickTo?: string;
    anchor?: string;
    topAnchor?: string;
    btmAnchor?: string;
    marginTop?: number;
    marginBottom?: number;
    stickyOn?: string;
    stickyClass?: string;
    containerClass?: string;
    checkEvery?: number;
}
/**
 * Sticky module.
 * @module foundation.sticky
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */
declare class Sticky extends Plugin {
    static className: string;
    static defaults: StickyOptions;
    /**
     * Creates a new instance of a sticky thing.
     * @class
     * @name Sticky
     * @param {jQuery} element - jQuery object to make sticky.
     * @param {Object} options - options object passed when creating the element programmatically.
     */
    _setup(element: JQuery, options: StickyOptions): void;
    /**
     * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
     * @function
     * @private
     */
    _init(): void;
    /**
     * If using multiple elements as anchors, calculates the top and bottom pixel values the sticky thing should stick and unstick on.
     * @function
     * @private
     */
    _parsePoints(): void;
    /**
     * Adds event handlers for the scrolling element.
     * @private
     * @param {String} id - pseudo-random id for unique scroll event listener.
     */
    _events(id: any): void;
    /**
     * Handler for events.
     * @private
     * @param {String} id - pseudo-random id for unique scroll event listener.
     */
    _eventsHandler(id: any): void;
    /**
     * Removes event handlers for scroll and change events on anchor.
     * @fires Sticky#pause
     * @param {String} scrollListener - unique, namespaced scroll listener attached to `window`
     */
    _pauseListeners(scrollListener: any): void;
    /**
     * Called on every `scroll` event and on `_init`
     * fires functions based on booleans and cached values
     * @param {Boolean} checkSizes - true if plugin should recalculate sizes and breakpoints.
     * @param {Number} scroll - current scroll position passed from scroll event cb function. If not passed, defaults to `window.pageYOffset`.
     */
    _calc(checkSizes: any, scroll: any): false | undefined;
    /**
     * Causes the $element to become stuck.
     * Adds `position: fixed;`, and helper classes.
     * @fires Sticky#stuckto
     * @function
     * @private
     */
    _setSticky(): void;
    /**
     * Causes the $element to become unstuck.
     * Removes `position: fixed;`, and helper classes.
     * Adds other helper classes.
     * @param {Boolean} isTop - tells the function if the $element should anchor to the top or bottom of its $anchor element.
     * @fires Sticky#unstuckfrom
     * @private
     */
    _removeSticky(isTop: any): void;
    /**
     * Sets the $element and $container sizes for plugin.
     * Calls `_setBreakPoints`.
     * @param {Function} cb - optional callback function to fire on completion of `_setBreakPoints`.
     * @private
     */
    _setSizes(cb: any): void;
    /**
     * Sets the upper and lower breakpoints for the element to become sticky/unsticky.
     * @param {Number} elemHeight - px value for sticky.$element height, calculated by `_setSizes`.
     * @param {Function} cb - optional callback function to be called on completion.
     * @private
     */
    _setBreakPoints(elemHeight: any, cb: any): false | undefined;
    /**
     * Destroys the current sticky element.
     * Resets the element to the top position first.
     * Removes event listeners, JS-added css properties and classes, and unwraps the $element if the JS added the $container.
     * @function
     */
    _destroy(): void;
}
export { Sticky };
