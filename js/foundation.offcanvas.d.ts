import { Plugin } from './foundation.plugin';
export interface OffCanvasOptions {
    closeOnClick?: boolean;
    contentOverlay?: boolean;
    contentId?: string;
    transitionTime?: number;
    position?: string;
    forceTop?: boolean;
    isRevealed?: boolean;
    revealOn?: string;
    autoFocus?: boolean;
    revealClass?: string;
    trapFocus?: boolean;
}
/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */
export declare class OffCanvas extends Plugin {
    static className: string;
    static defaults: OffCanvasOptions;
    /**
     * Creates a new instance of an off-canvas wrapper.
     * @class
     * @name OffCanvas
     * @fires OffCanvas#init
     * @param {Object} element - jQuery object to initialize.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: JQuery, options: OffCanvasOptions): void;
    /**
     * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
     * @function
     * @private
     */
    _init(): void;
    /**
     * Adds event handlers to the off-canvas wrapper and the exit overlay.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Applies event listener for elements that will reveal at certain breakpoints.
     * @private
     */
    _setMQChecker(): void;
    /**
     * Removes the CSS transition/position classes of the off-canvas content container.
     * Removing the classes is important when another off-canvas gets opened that uses the same content container.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */
    _removeContentClasses(hasReveal: any): void;
    /**
     * Adds the CSS transition/position classes of the off-canvas content container, based on the opening off-canvas element.
     * Beforehand any transition/position class gets removed.
     * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
     * @private
     */
    _addContentClasses(hasReveal: any): void;
    /**
     * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
     * @param {Boolean} isRevealed - true if element should be revealed.
     * @function
     */
    reveal(isRevealed: any): void;
    /**
     * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
     * @private
     */
    _stopScrolling(event: any): boolean;
    _recordScrollable(event: any): void;
    _stopScrollPropagation(event: any): void;
    /**
     * Opens the off-canvas menu.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     * @fires OffCanvas#opened
     */
    open(event: any, trigger: any): void;
    /**
     * Closes the off-canvas menu.
     * @function
     * @param {Function} cb - optional cb to fire after closure.
     * @fires OffCanvas#closed
     */
    close(cb: any): void;
    /**
     * Toggles the off-canvas menu open or closed.
     * @function
     * @param {Object} event - Event object passed from listener.
     * @param {jQuery} trigger - element that triggered the off-canvas to open.
     */
    toggle(event: any, trigger: any): void;
    /**
     * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
     * @function
     * @private
     */
    _handleKeyboard(e: any): void;
    /**
     * Destroys the offcanvas plugin.
     * @function
     */
    _destroy(): void;
}
