!function($) {
  "use strict";

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
  var functionName = function(fn) {
    if (Function.prototype.name === undefined) {
      var funcNameRegex = /function\s([^(]{1,})\(/;
      var results = (funcNameRegex).exec((fn).toString());
      return (results && results.length > 1) ? results[1].trim() : "";
    }
    else {
      return fn.prototype.constructor.name;
    }
  }

  // Global Foundation object
  // This is attached to the window, or used as a module for AMD/Browserify
  var Foundation = {
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
     * @param {String} name - Formal name of the component.
     * @param {String} attr - Data attribute used to find instances of this plugin. It's usually the same as the plugin name, but it may be different.
     * @param {Object} plugin - The constructor of the plugin.
     */
    plugin: function(name, plugin) {
      // Add to the Foundation object
      this[functionName(plugin)] = plugin;
      // Add to the plugins list (for reflowing)
      this._plugins[name] = plugin;
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
      
      // popping this in here for now, will have to get a init method later
      _this.MediaQuery.extractStyle();
    },

    MediaQuery: {
      queries: {},
      mqNames: [],
      current: function() {
        var mqObj = this.queries,
            arr   = this.mqNames;

        for (var i = arr.length - 1; i >= 0; i--) {
          var mqName = arr[i];
          if (mqObj.hasOwnProperty(mqName) && window.matchMedia(mqObj[mqName]).matches) {
            return mqName;
          }
        }
      },
      is: function(mq) {
        return window.matchMedia(this.queries[mq]).matches;
      },
      atLeast: function(mq) {
        var currentMq = this.current();

        if (this.mqNames.indexOf(mq) < this.mqNames.indexOf(currentMq)) {
          return true;
        }
        else {
          return false;
        }
      },
      extractStyle: function() {
        var self = this,
            extractedStyles = $('.foundation-mq').css('font-family'),
            namedQueries,
            // default set of media queries
            defaultQueries = {
              'default' : 'only screen',
              landscape : 'only screen and (orientation: landscape)',
              portrait : 'only screen and (orientation: portrait)',
              retina : 'only screen and (-webkit-min-device-pixel-ratio: 2),' +
                'only screen and (min--moz-device-pixel-ratio: 2),' +
                'only screen and (-o-min-device-pixel-ratio: 2/1),' +
                'only screen and (min-device-pixel-ratio: 2),' +
                'only screen and (min-resolution: 192dpi),' +
                'only screen and (min-resolution: 2dppx)'
            };
        
        // https://github.com/sindresorhus/query-string
        function parseStyleToObject(str) {
          var styleObject = {};

          if (typeof str !== 'string') {
            return styleObject;
          }

          str = str.trim().slice(1, -1); // browsers re-quote string style values

          if (!str) {
            return styleObject;
          }

          styleObject = str.split('&').reduce(function(ret, param) {
            var parts = param.replace(/\+/g, ' ').split('=');
            var key = parts[0];
            var val = parts[1];
            key = decodeURIComponent(key);

            // missing `=` should be `null`:
            // http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
            val = val === undefined ? null : decodeURIComponent(val);

            if (!ret.hasOwnProperty(key)) {
              ret[key] = val;
            } else if (Array.isArray(ret[key])) {
              ret[key].push(val);
            } else {
              ret[key] = [ret[key], val];
            }
            return ret;
          }, {});

          return styleObject;
        }
        
        namedQueries = parseStyleToObject(extractedStyles);
        for (var key in namedQueries) {
          namedQueries[key] = 'only screen and (min-width: ' + namedQueries[key].replace('rem', 'em') + ')';
        }
        // extend default queries
        namedQueries = $.extend(defaultQueries, namedQueries);
        // assign queries object to parsed styles
        self.queries = namedQueries;
        // push query names to an array for later comparison
        // TODO: may have to find a better way of sorting this because
        // this is very dependent on the order in which breakpoints are listed
        for (var mqName in namedQueries) {
          self.mqNames.push(mqName);
        };
      }
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


}(jQuery);

/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license */

window.matchMedia || (window.matchMedia = function() {
    "use strict";

    // For browsers that support matchMedium api such as IE 9 and webkit
    var styleMedia = (window.styleMedia || window.media);

    // For those that don't support matchMedium
    if (!styleMedia) {
        var style       = document.createElement('style'),
            script      = document.getElementsByTagName('script')[0],
            info        = null;

        style.type  = 'text/css';
        style.id    = 'matchmediajs-test';

        script.parentNode.insertBefore(style, script);

        // 'style.currentStyle' is used by IE <= 8 and 'window.getComputedStyle' for all other browsers
        info = ('getComputedStyle' in window) && window.getComputedStyle(style, null) || style.currentStyle;

        styleMedia = {
            matchMedium: function(media) {
                var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

                // 'style.styleSheet' is used by IE <= 8 and 'style.textContent' for all other browsers
                if (style.styleSheet) {
                    style.styleSheet.cssText = text;
                } else {
                    style.textContent = text;
                }

                // Test if media query is true or false
                return info.width === '1px';
            }
        };
    }

    return function(media) {
        return {
            matches: styleMedia.matchMedium(media || 'all'),
            media: media || 'all'
        };
    };
}());