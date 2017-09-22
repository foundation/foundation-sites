import { Plugin } from './foundation.plugin';
export interface SliderOptions {
    start?: number;
    end?: number;
    step?: number;
    initialStart?: number;
    initialEnd?: number;
    binding?: boolean;
    clickSelect?: boolean;
    vertical?: boolean;
    draggable?: boolean;
    disabled?: boolean;
    doubleSided?: boolean;
    decimal?: number;
    moveTime?: number;
    disabledClass?: string;
}
/**
 * Slider module.
 * @module foundation.slider
 * @requires foundation.util.motion
 * @requires foundation.util.triggers
 * @requires foundation.util.keyboard
 * @requires foundation.util.touch
 */
declare class Slider extends Plugin {
    static className: string;
    static defaults: SliderOptions;
    /**
     * Creates a new instance of a slider control.
     * @class
     * @name Slider
     * @param {jQuery} element - jQuery object to make into a slider control.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: JQuery, options: SliderOptions): void;
    /**
     * Initilizes the plugin by reading/setting attributes, creating collections and setting the initial position of the handle(s).
     * @function
     * @private
     */
    _init(): void;
    setHandles(): void;
    _reflow(): void;
    /**
    * @function
    * @private
    * @param {Number} value - floating point (the value) to be transformed using to a relative position on the slider (the inverse of _value)
    */
    _pctOfBar(value: any): string;
    /**
    * @function
    * @private
    * @param {Number} pctOfBar - floating point, the relative position of the slider (typically between 0-1) to be transformed to a value
    */
    _value(pctOfBar: any): number;
    /**
    * @function
    * @private
    * @param {Number} value - floating point (typically between 0-1) to be transformed using the log function
    */
    _logTransform(value: any): number;
    /**
    * @function
    * @private
    * @param {Number} value - floating point (typically between 0-1) to be transformed using the power function
    */
    _powTransform(value: any): number;
    /**
     * Sets the position of the selected handle and fill bar.
     * @function
     * @private
     * @param {jQuery} $hndl - the selected handle to move.
     * @param {Number} location - floating point between the start and end values of the slider bar.
     * @param {Function} cb - callback function to fire on completion.
     * @fires Slider#moved
     * @fires Slider#changed
     */
    _setHandlePos($hndl: any, location: any, noInvert: any, cb: any): void;
    /**
     * Sets the initial attribute for the slider element.
     * @function
     * @private
     * @param {Number} idx - index of the current handle/input to use.
     */
    _setInitAttr(idx: any): void;
    /**
     * Sets the input and `aria-valuenow` values for the slider element.
     * @function
     * @private
     * @param {jQuery} $handle - the currently selected handle.
     * @param {Number} val - floating point of the new value.
     */
    _setValues($handle: any, val: any): void;
    /**
     * Handles events on the slider element.
     * Calculates the new location of the current handle.
     * If there are two handles and the bar was clicked, it determines which handle to move.
     * @function
     * @private
     * @param {Object} e - the `event` object passed from the listener.
     * @param {jQuery} $handle - the current handle to calculate for, if selected.
     * @param {Number} val - floating point number for the new value of the slider.
     * TODO clean this up, there's a lot of repeated code between this and the _setHandlePos fn.
     */
    _handleEvent(e: any, $handle: any, val: any): void;
    /**
     * Adjustes value for handle in regard to step value. returns adjusted value
     * @function
     * @private
     * @param {jQuery} $handle - the selected handle.
     * @param {Number} value - value to adjust. used if $handle is falsy
     */
    _adjustValue($handle: any, value: any): any;
    /**
     * Adds event listeners to the slider elements.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Adds event listeners a particular handle
     * @function
     * @private
     * @param {jQuery} $handle - the current handle to apply listeners to.
     */
    _eventsForHandle($handle: any): void;
    /**
     * Destroys the slider plugin.
     */
    _destroy(): void;
}
export { Slider };
