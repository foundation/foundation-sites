import { Plugin } from './foundation.plugin';
/**
 * Tabs module.
 * @module foundation.tabs
 * @requires foundation.util.keyboard
 * @requires foundation.util.imageLoader if tabs contain images
 */
declare class Tabs extends Plugin {
    /**
     * Creates a new instance of tabs.
     * @class
     * @name Tabs
     * @fires Tabs#init
     * @param {jQuery} element - jQuery object to make into tabs.
     * @param {Object} options - Overrides to the default plugin settings.
     */
    _setup(element: any, options: any): void;
    /**
     * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
     * @private
     */
    _init(): void;
    /**
     * Adds event handlers for items within the tabs.
     * @private
     */
    _events(): void;
    /**
     * Adds click handlers for items within the tabs.
     * @private
     */
    _addClickHandler(): void;
    /**
     * Adds keyboard event handlers for items within the tabs.
     * @private
     */
    _addKeyHandler(): void;
    /**
     * Opens the tab `$targetContent` defined by `$target`. Collapses active tab.
     * @param {jQuery} $target - Tab to open.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @fires Tabs#change
     * @function
     */
    _handleTabChange($target: any, historyHandled: any): void;
    /**
     * Opens the tab `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to Open.
     * @function
     */
    _openTab($target: any): void;
    /**
     * Collapses `$targetContent` defined by `$target`.
     * @param {jQuery} $target - Tab to Open.
     * @function
     */
    _collapseTab($target: any): void;
    /**
     * Public method for selecting a content pane to display.
     * @param {jQuery | String} elem - jQuery object or string of the id of the pane to display.
     * @param {boolean} historyHandled - browser has already handled a history update
     * @function
     */
    selectTab(elem: any, historyHandled: any): void;
    /**
     * Sets the height of each panel to the height of the tallest panel.
     * If enabled in options, gets called on media query change.
     * If loading content via external source, can be called directly or with _reflow.
     * If enabled with `data-match-height="true"`, tabs sets to equal height
     * @function
     * @private
     */
    _setHeight(): void;
    /**
     * Destroys an instance of an tabs.
     * @fires Tabs#destroyed
     */
    _destroy(): void;
}
export { Tabs };
