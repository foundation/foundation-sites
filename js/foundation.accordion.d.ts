import { Plugin } from './foundation.plugin';
export interface AccordionOptions {
    slideSpeed?: number;
    multiExpand?: boolean;
    allowAllClosed?: boolean;
    deepLink?: boolean;
    deepLinkSmudge?: boolean;
    deepLinkSmudgeDelay?: number;
    updateHistory?: boolean;
}
/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 */
export declare class Accordion extends Plugin {
    static className: string;
    static defaults: AccordionOptions;
    /**
     * Creates a new instance of an accordion.
     * @class
     * @name Accordion
     * @fires Accordion#init
     * @param {jQuery} element - jQuery object to make into an accordion.
     * @param {Object} options - a plain object with settings to override the default options.
     */
    _setup(element: JQuery, options: AccordionOptions): void;
    /**
     * Initializes the accordion by animating the preset active pane(s).
     * @private
     */
    _init(): void;
    /**
     * Adds event handlers for items within the accordion.
     * @private
     */
    _events(): void;
    /**
     * Toggles the selected content pane's open/close state.
     * @param {jQuery} $target - jQuery object of the pane to toggle (`.accordion-content`).
     * @function
     */
    toggle($target: any): void;
    /**
     * Opens the accordion tab defined by `$target`.
     * @param {jQuery} $target - Accordion pane to open (`.accordion-content`).
     * @param {Boolean} firstTime - flag to determine if reflow should happen.
     * @fires Accordion#down
     * @function
     */
    down($target: any, firstTime: any): void;
    /**
     * Closes the tab defined by `$target`.
     * @param {jQuery} $target - Accordion tab to close (`.accordion-content`).
     * @fires Accordion#up
     * @function
     */
    up($target: any): void;
    /**
     * Destroys an instance of an accordion.
     * @fires Accordion#destroyed
     * @function
     */
    _destroy(): void;
}
