import * as $ from 'jquery';
import { GetYoDigits, hyphenate } from './foundation.util.core';
import { MediaQuery } from './foundation.util.mediaQuery';
const FOUNDATION_VERSION = '6.4.3';
// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
const Foundation = {
    version: FOUNDATION_VERSION,
    /**
     * Stores initialized plugins.
     */
    _plugins: {},
    /**
     * Stores generated unique ids for plugin instances
     */
    _uuids: [],
    /**
     * Defines a Foundation plugin, adding it to the `Foundation` namespace and the list of plugins to initialize when reflowing.
     * @param {Object} plugin - The constructor of the plugin.
     * @param {string} name
     */
    plugin(plugin, name) {
        // Object key to use when adding to global Foundation object
        // Examples: Foundation.Reveal, Foundation.OffCanvas
        const className = (name || functionName(plugin));
        // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
        // Examples: data-reveal, data-off-canvas
        const attrName = hyphenate(className);
        // Add to the Foundation object and the plugins list (for reflowing)
        this._plugins[attrName] = this[className] = plugin;
    },
    /**
     * @function
     * Populates the _uuids array with pointers to each individual plugin instance.
     * Adds the `zfPlugin` data-attribute to programmatically created plugins to allow use of $(selector).foundation(method) calls.
     * Also fires the initialization event for each plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @param {String} name - the name of the plugin, passed as a camelCased string.
     * @fires Plugin#init
     */
    registerPlugin(plugin, name) {
        const pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
        plugin.uuid = GetYoDigits(6, pluginName);
        if (!plugin.$element.attr(`data-${pluginName}`)) {
            plugin.$element.attr(`data-${pluginName}`, plugin.uuid);
        }
        if (!plugin.$element.data('zfPlugin')) {
            plugin.$element.data('zfPlugin', plugin);
        }
        /**
         * Fires when the plugin has initialized.
         * @event Plugin#init
         */
        plugin.$element.trigger(`init.zf.${pluginName}`);
        this._uuids.push(plugin.uuid);
        return;
    },
    /**
     * @function
     * Removes the plugins uuid from the _uuids array.
     * Removes the zfPlugin data attribute, as well as the data-plugin-name attribute.
     * Also fires the destroyed event for the plugin, consolidating repetitive code.
     * @param {Object} plugin - an instance of a plugin, usually `this` in context.
     * @fires Plugin#destroyed
     */
    unregisterPlugin(plugin) {
        let pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));
        this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);
        plugin.$element.removeAttr(`data-${pluginName}`).removeData('zfPlugin')
            .trigger(`destroyed.zf.${pluginName}`);
        for (let prop in plugin) {
            plugin[prop] = null; //clean up script to prep for garbage collection.
        }
        return;
    },
    /**
     * @function
     * Causes one or more active plugins to re-initialize, resetting event listeners, recalculating positions, etc.
     * @param {String} plugins - optional string of an individual plugin key, attained by calling `$(element).data('pluginName')`, or string of a plugin class i.e. `'dropdown'`
     * @default If no argument is passed, reflow all currently active plugins.
     */
    reInit(plugins) {
        const isJQ = plugins instanceof $;
        try {
            if (isJQ) {
                plugins.each(function () {
                    $(this).data('zfPlugin')._init();
                });
            }
            else {
                let type = typeof plugins, _this = this, fns = {
                    object(plgs) {
                        plgs.forEach(function (p) {
                            p = hyphenate(p);
                            $('[data-' + p + ']').foundation('_init');
                        });
                    },
                    string() {
                        plugins = hyphenate(plugins);
                        $('[data-' + plugins + ']').foundation('_init');
                    },
                    undefined() {
                        this.object(Object.keys(_this._plugins));
                    },
                };
                fns[type](plugins);
            }
        }
        catch (err) {
            console.error(err);
        }
        finally {
            return plugins;
        }
    },
    /**
     * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
     * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
     * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
     */
    reflow(elem, plugins) {
        // If plugins is undefined, just grab everything
        if (typeof plugins === 'undefined') {
            plugins = Object.keys(this._plugins);
        }
        else if (typeof plugins === 'string') {
            plugins = [plugins];
        }
        let _this = this;
        // Iterate through each plugin
        $.each(plugins, function (i, name) {
            // Get the current plugin
            let plugin = _this._plugins[name];
            // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
            let $elem = $(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');
            // For each plugin found, initialize it
            $elem.each(function () {
                let $el = $(this), opts = {};
                // Don't double-dip on plugins
                if ($el.data('zfPlugin')) {
                    console.warn('Tried to initialize ' + name + ' on an element that already has a Foundation plugin.');
                    return;
                }
                if ($el.attr('data-options')) {
                    let thing = $el.attr('data-options').split(';').forEach(function (e, i) {
                        let opt = e.split(':').map(function (el) { return el.trim(); });
                        if (opt[0])
                            opts[opt[0]] = parseValue(opt[1]);
                    });
                }
                try {
                    $el.data('zfPlugin', new plugin($(this), opts));
                }
                catch (er) {
                    console.error(er);
                }
                finally {
                    return;
                }
            });
        });
    },
    getFnName: functionName,
    addToJquery($) {
        // TODO: consider not making this a jQuery function
        // TODO: need way to reflow vs. re-initialize
        /**
         * The Foundation jQuery method.
         * @param {String|Array} method - An action to perform on the current jQuery object.
         */
        let foundation = function (method) {
            let type = typeof method, $noJS = $('.no-js');
            if ($noJS.length) {
                $noJS.removeClass('no-js');
            }
            if (type === 'undefined') {
                MediaQuery._init();
                Foundation.reflow(this);
            }
            else if (type === 'string') {
                let args = Array.prototype.slice.call(arguments, 1); //collect all the arguments, if necessary
                let plugClass = this.data('zfPlugin'); //determine the class of plugin
                if (plugClass !== undefined && plugClass[method] !== undefined) {
                    if (this.length === 1) {
                        plugClass[method].apply(plugClass, args);
                    }
                    else {
                        this.each(function (i, el) {
                            plugClass[method].apply($(el).data('zfPlugin'), args);
                        });
                    }
                }
                else {
                    throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
                }
            }
            else {
                throw new TypeError(`We're sorry, ${type} is not a valid parameter. You must use a string representing the method you wish to invoke.`);
            }
            return this;
        };
        $.fn.foundation = foundation;
        return $;
    },
};
Foundation.util = {
    /**
     * Function for applying a debounce effect to a function call.
     * @function
     * @param {Function} func - Function to be called at end of timeout.
     * @param {Number} delay - Time in ms to delay the call of `func`.
     * @returns function
     */
    throttle(func, delay) {
        let timer = null;
        return function () {
            let context = this, args = arguments;
            if (timer === null) {
                timer = setTimeout(function () {
                    func.apply(context, args);
                    timer = null;
                }, delay);
            }
        };
    },
};
window.Foundation = Foundation;
// Polyfill for requestAnimationFrame
(function () {
    if (!Date.now || !window.Date.now)
        window.Date.now = Date.now = function () { return new Date().getTime(); };
    let vendors = ['webkit', 'moz'];
    for (let i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        let vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame']
            || window[vp + 'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        let lastTime = 0;
        window.requestAnimationFrame = function (callback) {
            let now = Date.now();
            let nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function () { callback(lastTime = nextTime); }, nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
    /**
     * Polyfill for performance.now, required by rAF
     */
    if (!window.performance || !window.performance.now) {
        window.performance = {
            start: Date.now(),
            now() { return Date.now() - this.start; },
        };
    }
})();
if (!Function.prototype.bind) {
    Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }
        let aArgs = Array.prototype.slice.call(arguments, 1), fToBind = this, fNOP = function () { }, fBound = function () {
            return fToBind.apply(this instanceof fNOP
                ? this
                : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };
        if (this.prototype) {
            // native functions don't have a prototype
            fNOP.prototype = this.prototype;
        }
        fBound.prototype = new fNOP();
        return fBound;
    };
}
// Polyfill to get the name of a function in IE9
function functionName(fn) {
    if (Function.prototype.name === undefined) {
        let funcNameRegex = /function\s([^(]{1,})\(/;
        let results = (funcNameRegex).exec((fn).toString());
        return (results && results.length > 1) ? results[1].trim() : '';
    }
    else if (fn.prototype === undefined) {
        return fn.constructor.name;
    }
    else {
        return fn.prototype.constructor.name;
    }
}
function parseValue(str) {
    if ('true' === str)
        return true;
    else if ('false' === str)
        return false;
    else if (!isNaN(str * 1))
        return parseFloat(str);
    return str;
}
export { Foundation };
