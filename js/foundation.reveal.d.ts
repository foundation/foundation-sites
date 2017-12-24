import { Plugin } from './foundation.plugin';
export interface RevealOptions {
    animationIn?: string;
    animationOut?: string;
    showDelay?: number;
    hideDelay?: number;
    closeOnClick?: boolean;
    closeOnEsc?: boolean;
    multipleOpened?: boolean;
    vOffset?: number;
    hOffset?: number;
    fullScreen?: boolean;
    btmOffsetPct?: number;
    overlay?: boolean;
    resetOnClose?: boolean;
    deepLink?: boolean;
}
/**
 * Reveal module.
 * @module foundation.reveal
 * @requires foundation.util.keyboard
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.motion if using animations
 */
export declare class Reveal extends Plugin {
    static className: string;
    static defaults: RevealOptions;
    /**
     * Creates a new instance of Reveal.
     * @class
     * @name Reveal
     * @param {jQuery} element - jQuery object to use for the modal.
     * @param {Object} options - optional parameters.
     */
    _setup(element: JQuery, options: RevealOptions): void;
    /**
     * Initializes the modal by adding the overlay and close buttons, (if selected).
     * @private
     */
    _init(): void;
    /**
     * Creates an overlay div to display behind the modal.
     * @private
     */
    _makeOverlay(): JQuery<HTMLElement>;
    /**
     * Updates position of modal
     * TODO:  Figure out if we actually need to cache these values or if it doesn't matter
     * @private
     */
    _updatePosition(): void;
    /**
     * Adds event handlers for the modal.
     * @private
     */
    _events(): void;
    /**
     * Handles modal methods on back/forward button clicks or any other event that triggers popstate.
     * @private
     */
    _handleState(e: any): void;
    /**
    * Disables the scroll when Reveal is shown to prevent the background from shifting
    */
    _disableScroll(): void;
    /**
    * Reenables the scroll when Reveal closes
    */
    _enableScroll(): void;
    /**
     * Opens the modal controlled by `this.$anchor`, and closes all others by default.
     * @function
     * @fires Reveal#closeme
     * @fires Reveal#open
     */
    open(): void;
    /**
     * Adds extra event handlers for the body and window if necessary.
     * @private
     */
    _extraHandlers(): void;
    /**
     * Closes the modal.
     * @function
     * @fires Reveal#closed
     */
    close(): false | undefined;
    /**
     * Toggles the open/closed state of a modal.
     * @function
     */
    toggle(): void;
    /**
     * Destroys an instance of a modal.
     * @function
     */
    _destroy(): void;
}
