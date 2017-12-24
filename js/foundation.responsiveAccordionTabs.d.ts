import { Plugin } from './foundation.plugin';
/**
 * ResponsiveAccordionTabs module.
 * @module foundation.responsiveAccordionTabs
 * @requires foundation.util.motion
 * @requires foundation.accordion
 * @requires foundation.tabs
 */
declare class ResponsiveAccordionTabs extends Plugin {
    /**
     * Creates a new instance of a responsive accordion tabs.
     * @class
     * @name ResponsiveAccordionTabs
     * @fires ResponsiveAccordionTabs#init
     * @param {jQuery} element - jQuery object to make into Responsive Accordion Tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the Menu by parsing the classes from the 'data-responsive-accordion-tabs' attribute on the element.
     * @function
     * @private
     */
    _init(): void;
    _getAllOptions(): void;
    /**
     * Initializes events for the Menu.
     * @function
     * @private
     */
    _events(): void;
    /**
     * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
     * @function
     * @private
     */
    _checkMediaQueries(): void;
    _handleMarkup(toSet: any): void;
    /**
     * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
     * @function
     */
    _destroy(): void;
}
export { ResponsiveAccordionTabs };
