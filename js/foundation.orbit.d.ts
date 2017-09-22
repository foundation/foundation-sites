import { Plugin } from './foundation.plugin';
export interface OrbitOptions {
    bullets?: boolean;
    navButtons?: boolean;
    animInFromRight?: string;
    animOutToRight?: string;
    animInFromLeft?: string;
    animOutToLeft?: string;
    autoPlay?: boolean;
    timerDelay?: number;
    infiniteWrap?: boolean;
    swipe?: boolean;
    pauseOnHover?: boolean;
    accessible?: boolean;
    containerClass?: string;
    slideClass?: string;
    boxOfBullets?: string;
    nextClass?: string;
    prevClass?: string;
    useMUI?: boolean;
}
/**
 * Orbit module.
 * @module foundation.orbit
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.timer
 * @requires foundation.util.imageLoader
 * @requires foundation.util.touch
 */
declare class Orbit extends Plugin {
    /**
    * Creates a new instance of an orbit carousel.
    * @class
    * @name Orbit
    * @param {jQuery} element - jQuery object to make into an Orbit Carousel.
    * @param {Object} options - Overrides to the default plugin settings.
    */
    _setup(element: JQuery, options: OrbitOptions): void;
    /**
    * Initializes the plugin by creating jQuery collections, setting attributes, and starting the animation.
    * @function
    * @private
    */
    _init(): void;
    /**
    * Creates a jQuery collection of bullets, if they are being used.
    * @function
    * @private
    */
    _loadBullets(): void;
    /**
    * Sets a `timer` object on the orbit, and starts the counter for the next slide.
    * @function
    */
    geoSync(): void;
    /**
    * Sets wrapper and slide heights for the orbit.
    * @function
    * @private
    */
    _prepareForOrbit(): void;
    /**
    * Calulates the height of each slide in the collection, and uses the tallest one for the wrapper height.
    * @function
    * @private
    * @param {Function} cb - a callback function to fire when complete.
    */
    _setWrapperHeight(cb: any): void;
    /**
    * Sets the max-height of each slide.
    * @function
    * @private
    */
    _setSlideHeight(height: any): void;
    /**
    * Adds event listeners to basically everything within the element.
    * @function
    * @private
    */
    _events(): void;
    /**
     * Resets Orbit so it can be reinitialized
     */
    _reset(): void;
    /**
    * Changes the current slide to a new one.
    * @function
    * @param {Boolean} isLTR - flag if the slide should move left to right.
    * @param {jQuery} chosenSlide - the jQuery element of the slide to show next, if one is selected.
    * @param {Number} idx - the index of the new slide in its collection, if one chosen.
    * @fires Orbit#slidechange
    */
    changeSlide(isLTR: any, chosenSlide: any, idx: any): false | undefined;
    /**
    * Updates the active state of the bullets, if displayed.
    * @function
    * @private
    * @param {Number} idx - the index of the current slide.
    */
    _updateBullets(idx: any): void;
    /**
    * Destroys the carousel and hides the element.
    * @function
    */
    _destroy(): void;
}
export { Orbit };
