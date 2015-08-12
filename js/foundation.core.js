!function($) {

"use strict";

var FOUNDATION_VERSION = '6.0.0-alpha';

// Global Foundation object
// This is attached to the window, or used as a module for AMD/Browserify
var Foundation = {
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
   */
  plugin: function(plugin) {
    // Object key to use when adding to global Foundation object
    // Examples: Foundation.Reveal, Foundation.OffCanvas
    var className = functionName(plugin);

    // Object key to use when storing the plugin, also used to create the identifying data attribute for the plugin
    // Examples: data-reveal, data-off-canvas
    var attrName  = hyphenate(className);

    // Add to the Foundation object and the plugins list (for reflowing)
    this._plugins[attrName] = this[className] = plugin;
  },

  /**
   * Sets individual configuration for plug in instances.
   * @param {String} plugin - Formal name of the component.
   * @param {Object} config - Object that contains configuration settings for each instance of plug ins
   */
  setPluginConfig: function(plugin, config) {
    var uuid = this.generateUuid();
    // initialize config object
    this._plugins[plugin].config = {};
    // set key value pairing of element uuid and specified config
    this._plugins[plugin].config[uuid] = config;
  },

  /**
   * Return the instance of a plugin initialized on an element, or `null` if the element has no Foundation plugins.
   * @param {Object} element - CSS selector, DOM element, or jQuery object to check.
   */
  getPlugin: function(element) {
    return $(element).eq(0).data('zf-plugin') || null;
  },

  /**
   * Initialize plugins on any elements within `elem` (and `elem` itself) that aren't already initialized.
   * @param {Object} elem - jQuery object containing the element to check inside. Also checks the element itself, unless it's the `document` object.
   * @param {String|Array} plugins - A list of plugins to initialize. Leave this out to initialize everything.
   */
  reflow: function(elem, plugins) {
    // If plugins is undefined, just grab everything
    if (typeof plugins === 'undefined') {
      plugins = Object.keys(this._plugins);
    }
    // If plugins is a string, convert it to an array with one item
    else if (typeof plugins === 'string') {
      plugins = [plugins];
    }

    var _this = this;

    // Iterate through each plugin
    $.each(plugins, function(i, name) {
      // Get the current plugin
      var plugin = _this._plugins[name];

      // Localize the search to all elements inside elem, as well as elem itself, unless elem === document
      var $elem = $(elem).find('[data-'+name+']').addBack('*');

      // For each plugin found, initialize it
      $elem.each(function() {
        // Don't double-dip on plugins
        if ($(this).attr('zf-plugin')) {
          console.warn("Tried to initialize "+name+" on an element that already has a Foundation plugin.");
          return;
        }

        // Take every setting in the plugin's options variable, and look for a data attribute that matches
        // So data-thing plugin.options.thing
        var options = {};
        for (var prop in plugin.defaults) {
          var dataOption = $(this).data(prop.toLowerCase());
          if (typeof dataOption !== 'undefined')
            options[prop] = dataOption;
        }

        // Initialize the plugin with the found options, and drop it in the "data-zf-plugin" attribute so it can be fetched later
        $(this).data('zf-plugin', new plugin($(this), options));
      });
    });
  },

  /**
   * Executes a function a max of once every n milliseconds. Returns a function with throttling applied.
   * @param {Function} func - Function to be throttled.
   * @param {Integer} delay - A list of plugins to initialize. Leave this out to initialize everything.
   */
  throttle: function (func, delay) {
    var timer = null;

    return function () {
      var context = this, args = arguments;

      if (timer === null) {
        timer = setTimeout(function () {
          func.apply(context, args);
          timer = null;
        }, delay);
      }
    };
  },

  /**
   * Generate a unique 16-character id to assign to an element to account for multiple instances of a plugin
   */
  generateUuid: function() {
    var uuid = '';

    do {
      uuid += 'zf-uuid-';
      for (var i=0; i<16; i++) {
        uuid += Math.floor(Math.random()*16).toString(16);
      }
    } while(!this._uuids.indexOf(uuid));

    this._uuids.push(uuid);
    return uuid;
  },

  /**
   * Performs a callback function when an images are fully loaded.
   * @param {Object} images - Image(s) to check if loaded.
   * @param {Func} callback - Function to execute when image is fully loaded.
   */
  imagesLoaded: function (images, callback) {
    var self = this,
        unloaded = images.length;

    if (unloaded === 0) {
      callback();
    }

    var singleImageLoaded = function() {
      unloaded--;
      if (unloaded === 0) {
        callback();
      }
    }

    images.each(function() {
      if (this.complete) {
        singleImageLoaded();
      }
      else if (typeof this.naturalWidth !== 'undefined' && this.naturalWidth > 0) {
        singleImageLoaded();
      }
      else {
        $(this).one('load', function() {
          singleImageLoaded();
        });
      }
    });
  }
};

/**
 * The Foundation jQuery method.
 * @param {String|Array} method - An action to perform on the current jQuery object.
 */
var foundation = function(method) {
  var type = typeof method;

  if (type === 'undefined') {
    Foundation.reflow(this);
    Foundation.MediaQuery._init();
  } else if (type === 'object') {
    // Set plugin settings
    Foundation.reflow(this);
  } else if (type === 'string' || type === 'array') {
    Foundation.reflow(this, method);
  }

  return this;
};

window.Foundation = Foundation;
$.fn.foundation = foundation;

// Polyfill for requestAnimationFrame
(function() {
  if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

  var vendors = ['webkit', 'moz'];
  for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
      var vp = vendors[i];
      window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
      window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                 || window[vp+'CancelRequestAnimationFrame']);
  }
  if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent)
    || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
    var lastTime = 0;
    window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() { callback(lastTime = nextTime); },
                          nextTime - now);
    };
    window.cancelAnimationFrame = clearTimeout;
  }
})();

// Polyfill to get the name of a function in IE9
function functionName(fn) {
  if (Function.prototype.name === undefined) {
    var funcNameRegex = /function\s([^(]{1,})\(/;
    var results = (funcNameRegex).exec((fn).toString());
    return (results && results.length > 1) ? results[1].trim() : "";
  }
  else {
    return fn.prototype.constructor.name;
  }
}

// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
function hyphenate(str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}

}(jQuery);
