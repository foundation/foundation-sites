import { Plugin } from './foundation.plugin';
/**
 * Equalizer module.
 * @module foundation.equalizer
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.imageLoader if equalizer contains images
 */
declare class Equalizer extends Plugin {
    /**
     * Creates a new instance of Equalizer.
     * @class
     * @name Equalizer
     * @fires Equalizer#init
     * @param {Object} element - jQuery object to add the trigger to.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
     * @private
     */
    _init(): void;
    /**
     * Removes event listeners if the breakpoint is too small.
     * @private
     */
    _pauseEvents(): void;
    /**
     * function to handle $elements resizeme.zf.trigger, with bound this on _bindHandler.onResizeMeBound
     * @private
     */
    _onResizeMe(e: any): void;
    /**
     * function to handle $elements postequalized.zf.equalizer, with bound this on _bindHandler.onPostEqualizedBound
     * @private
     */
    _onPostEqualized(e: any): void;
    /**
     * Initializes events for Equalizer.
     * @private
     */
    _events(): void;
    /**
     * Checks the current breakpoint to the minimum required size.
     * @private
     */
    _checkMQ(): boolean;
    /**
     * A noop version for the plugin
     * @private
     */
    _killswitch(): void;
    /**
     * Calls necessary functions to update Equalizer upon DOM change
     * @private
     */
    _reflow(): false | undefined;
    /**
     * Manually determines if the first 2 elements are *NOT* stacked.
     * @private
     */
    _isStacked(): boolean;
    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Function} cb - A non-optional callback to return the heights array to.
     * @returns {Array} heights - An array of heights of children within Equalizer container
     */
    getHeights(cb: any): void;
    /**
     * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
     * @param {Function} cb - A non-optional callback to return the heights array to.
     * @returns {Array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
     */
    getHeightsByRow(cb: any): void;
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest
     * @param {array} heights - An array of heights of children within Equalizer container
     * @fires Equalizer#preequalized
     * @fires Equalizer#postequalized
     */
    applyHeight(heights: any): void;
    /**
     * Changes the CSS height property of each child in an Equalizer parent to match the tallest by row
     * @param {array} groups - An array of heights of children within Equalizer container grouped by row with element,height and max as last child
     * @fires Equalizer#preequalized
     * @fires Equalizer#preequalizedrow
     * @fires Equalizer#postequalizedrow
     * @fires Equalizer#postequalized
     */
    applyHeightByRow(groups: any): void;
    /**
     * Destroys an instance of Equalizer.
     * @function
     */
    _destroy(): void;
}
export { Equalizer };
