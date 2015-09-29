!function($) {

"use strict";

var FOUNDATION_VERSION = '6.0.0-alpha.1';

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
        $(this).data('zf-plugin', new plugin($(this)));
      });
    });
  }
}

Foundation.util = {
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
  }
}

// TODO: consider not making this a jQuery function
// TODO: need way to reflow vs. re-initialize
/**
 * The Foundation jQuery method.
 * @param {String|Array} method - An action to perform on the current jQuery object.
 */
var foundation = function(method) {
  var type = typeof method;

  if (type === 'undefined') {
    Foundation.MediaQuery._init();
    Foundation.reflow(this);
  } else if (type === 'object') {
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

!function($, Foundation) {

// Default set of media queries
var defaultQueries = {
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

var MediaQuery = {
  queries: [],
  current: '',

  /**
   * Checks if the screen is at least as wide as a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to check.
   * @returns {Boolean} `true` if the breakpoint matches, `false` if it's smaller.
   */
  atLeast: function(size) {
    var query = this.get(size);

    if (query) {
      return window.matchMedia(query).matches;
    }

    return false;
  },

  /**
   * Gets the media query of a breakpoint.
   * @function
   * @param {String} size - Name of the breakpoint to get.
   * @returns {String|null} - The media query of the breakpoint, or `null` if the breakpoint doesn't exist.
   */
  get: function(size) {
    for (var i in this.queries) {
      var query = this.queries[i];
      if (size === query.name) return query.value;
    }

    return null;
  },

  /**
   * Initializes the media query helper, by extracting the breakpoint list from the CSS and activating the breakpoint watcher.
   * @function
   * @private
   */
  _init: function() {
    var self = this;
    var extractedStyles = $('.foundation-mq').css('font-family');
    var namedQueries;
    
    namedQueries = parseStyleToObject(extractedStyles);

    for (var key in namedQueries) {
      self.queries.push({
        name: key,
        value: 'only screen and (min-width: ' + namedQueries[key] + ')'
      })
    }

    this.current = this._getCurrentSize();

    this._watcher();

    // Extend default queries
    // namedQueries = $.extend(defaultQueries, namedQueries);
  },

  /**
   * Gets the current breakpoint name by testing every breakpoint and returning the last one to match (the biggest one).
   * @function
   * @private
   * @returns {String} Name of the current breakpoint.
   */
  _getCurrentSize: function() {
    var matched;

    for (var i in this.queries) {
      var query = this.queries[i];

      if (window.matchMedia(query.value).matches) {
        matched = query;
      }
    }

    return matched.name;
  },

  /**
   * Activates the breakpoint watcher, which fires an event on the window whenever the breakpoint changes.
   * @function
   * @private
   */
  _watcher: function() {
    var _this = this;

    $(window).on('resize.zf.mediaquery', function() {
      var newSize = _this._getCurrentSize();

      if (newSize !== _this.current) {
        // Broadcast the media query change on the window
        $(window).trigger('changed.zf.mediaquery', [newSize, _this.current]);

        // Change the current media query
        _this.current = newSize;
      }
    });
  }
}

Foundation.MediaQuery = MediaQuery;

// matchMedia() polyfill - Test a CSS media type/query in JS.
// Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas, David Knight. Dual MIT/BSD license
window.matchMedia || (window.matchMedia = function() {
  'use strict';

  // For browsers that support matchMedium api such as IE 9 and webkit
  var styleMedia = (window.styleMedia || window.media);

  // For those that don't support matchMedium
  if (!styleMedia) {
    var style   = document.createElement('style'),
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

// Thank you: https://github.com/sindresorhus/query-string
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

}(jQuery, Foundation)
!function($, Foundation) {

var initClasses   = ['mui-enter', 'mui-leave'];
var activeClasses = ['mui-enter-active', 'mui-leave-active'];

// Find the right "transitionend" event for this browser
var endEvent = (function() {
  var transitions = {
    'transition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd',
    'MozTransition': 'transitionend',
    'OTransition': 'otransitionend'
  };
  var elem = document.createElement('div');

  for (var t in transitions){
    if (typeof elem.style[t] !== 'undefined'){
      return transitions[t];
    }
  }
})();

function animate(isIn, element, animation, cb) {
  element = $(element).eq(0);

  if (!element.length) return;

  var initClass = isIn ? initClasses[0] : initClasses[1];
  var activeClass = isIn ? activeClasses[0] : activeClasses[1];

  // Set up the animation
  reset();
  element.addClass(animation);
  element.css('transition', 'none');
  requestAnimationFrame(function() {
    element.addClass(initClass);
    if (isIn) element.show();
  });

  // Start the animation
  requestAnimationFrame(function() {
    element[0].offsetWidth;
    element.css('transition', '');
    element.addClass(activeClass);
  });

  // Clean up the animation when it finishes
  element.one('transitionend', finish);

  // Hides the element (for out animations), resets the element, and runs a callback
  function finish() {
    if (!isIn) element.hide();
    reset();
    if (cb) cb.apply(element);
  }

  // Resets transitions and removes motion-specific classes
  function reset() {
    element[0].style.transitionDuration = 0;
    element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
  }
}

var Motion = {
  animateIn: function(element, animation, cb) {
    animate(true, element, animation, cb);
  },

  animateOut: function(element, animation, cb) {
    animate(false, element, animation, cb);
  }
}

Foundation.Motion = Motion;

}(jQuery, Foundation)

!function(){
  /**
   * returns a random base-36 uid with namespacing
   * @function
   * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
   * @param {String} plugin - name of plugin to be incorporated in uid, optional.
   * @default {String} -zf-rnd - if no plugin name is provided, value appended to uid.
   * @returns {String} - unique id
   */
  function randomIdGen(length, plugin){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (plugin ? '-' + plugin : '-zf-rnd');
  }

  Foundation.GetYoDigits = randomIdGen;
}(window.Foundation);

!function($, Foundation, window){
  /**
   * Compares the dimensions of an element to a container and determines collision events with container.
   * @function
   * @param {jQuery} element - jQuery object to test for collisions.
   * @param {jQuery} parent - jQuery object to use as bounding container.
   * @param {Boolean} lrOnly - set to true to check left and right values only.
   * @param {Boolean} tbOnly - set to true to check top and bottom values only.
   * @returns {Boolean} - true if collision free, false if a collision in any direction.
   * TODO - add/finish the method for using a parent as a bounding container.
   */
  function ImNotTouchingYou(element, parent, lrOnly, tbOnly){
    // the element is the jQuery element be checked for clearance
    var eleDims = GetDimensions(element);

    //********something to work on in the future*******
    // if(parent){
    //   var parDims = GetDimensions(parent),
    //       bottom = (eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top),
    //       top    = (eleDims.offset.top >= eleDims.windowDims.offset.top),
    //       left   = (eleDims.offset.left >= eleDims.windowDims.offset.left),
    //       right  = (eleDims.offset.left + eleDims.width <= eleDims.windowDims.width),
    //       allDirs = [bottom, top, left, right];
    //
    //   return allDirs.indexOf(false) === -1;
    // }else{
      var bottom = (eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top),
          top    = (eleDims.offset.top >= eleDims.windowDims.offset.top),
          left   = (eleDims.offset.left >= eleDims.windowDims.offset.left),
          right  = (eleDims.offset.left + eleDims.width <= eleDims.windowDims.width),
          allDirs = [bottom, top, left, right];
      if(lrOnly){ return left === right === true; }
      if(tbOnly){ return top === bottom === true; }
      return allDirs.indexOf(false) === -1;

    // }
  }

  /**
   * Uses jQuery methods to return an object of dimension values.
   * @function
   * @param {jQuery} element - jQuery object for which to get the dimensions.
   * @returns {Object} - nested object of integer pixel values
   * TODO - if element is window, return only those values.
   */
  function GetDimensions(element){
    var $window = $(window);
    return {
      width: element.outerWidth(),
      height: element.outerHeight(),
      offset: element.offset(),
      parentDims: {
        width: element.parent().outerWidth(),
        height: element.parent().outerHeight(),
        offset: element.parent().offset()
      },
      windowDims: {
        width: $window.width(),
        height: $window.height(),
        offset: {
          top: $window.scrollTop(),
          left: $window.scrollLeft()
        }
      }
    };
  }
  /**
   * Returns an object of top and left integer pixel values for dynamically rendered elements,
   * such as: Tooltip, Reveal, and Dropdown
   * @function
   * @param {jQuery} element - jQuery object for the element being positioned.
   * @param {jQuery} anchor - jQuery object for the element's anchor point.
   * @param {String} position - a string relating to the desired position of the element, relative to it's anchor
   * @param {Number} vOffset - integer pixel value of desired vertical separation between anchor and element.
   * @param {Number} hOffset - integer pixel value of desired horizontal separation between anchor and element.
   * @param {Boolean} isOverflow - if a collision event is detected, sets to true to default the element to full width - any desired offset.
   * TODO alter/rewrite to work with `em` values as well/instead of pixels
   */
  function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow){
    // console.log(position);
    var $eleDims = GetDimensions(element),
        $anchorDims = anchor ? GetDimensions(anchor) : null;
    switch(position){
      case 'top':
        return {
          left: $anchorDims.offset.left,
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: $anchorDims.offset.top
        };
        break;
      case 'right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset,
          top: $anchorDims.offset.top
        };
        break;
      case 'center top':
        return {
          left: ($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2),
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'center bottom':
        return {
          left: isOverflow ? hOffset : (($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2)),
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
        break;
      case 'center left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: ($anchorDims.offset.top + ($anchorDims.height / 2)) - ($eleDims.height / 2)
        };
        break;
      case 'center right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
          top: ($anchorDims.offset.top + ($anchorDims.height / 2)) - ($eleDims.height / 2)
        };
        break;
      case 'center':
        return {
          left: ($eleDims.windowDims.offset.left + ($eleDims.windowDims.width / 2)) - ($eleDims.width / 2),
          top: ($eleDims.windowDims.offset.top + ($eleDims.windowDims.height / 2)) - ($eleDims.height / 2)
        };
        break;
      case 'reveal':
        return {
          left: ($eleDims.windowDims.width - $eleDims.width) / 2,
          top: $eleDims.windowDims.offset.top + vOffset
        };
      case 'reveal full':
        return {
          left: $eleDims.windowDims.offset.left,
          top: $eleDims.windowDims.offset.top,
        };
        break;
      default:
        return {
          left: $anchorDims.offset.left,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
    }
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
  Foundation.GetDimensions = GetDimensions;
  Foundation.GetOffsets = GetOffsets;
}(jQuery, window.Foundation, window);

!function(Foundation, $) {
  // Elements with [data-open] will reveal a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-open]', function() {
    var id = $(this).data('open');
    $('#' + id).triggerHandler('open.zf.trigger', [$(this)]);
  });

  // Elements with [data-close] will close a plugin that supports it when clicked.
  // If used without a value on [data-open], the event will bubble, allowing it to close a parent component.
  $(document).on('click.zf.trigger', '[data-close]', function() {
    var id = $(this).data('close');
    if (id) {
      $('#' + id).triggerHandler('close.zf.trigger', [$(this)]);
    }
    else {
      $(this).trigger('close.zf.trigger');
    }
  });

  // Elements with [data-toggle] will toggle a plugin that supports it when clicked.
  $(document).on('click.zf.trigger', '[data-toggle]', function() {
    var id = $(this).data('toggle');
    $('#' + id).triggerHandler('toggle.zf.trigger', [$(this)]);
  });

  // Elements with [data-closable] will respond to close.zf.trigger events.
  $(document).on('close.zf.trigger', '[data-closable]', function() {
    var animation = $(this).data('closable') || 'fadeOut';

    Foundation.Motion.animateOut($(this), animation, function() {
      $(this).trigger('closed.zf');
    });
  });


//chris's testing things----------------
  /**
   * TODO put into public function, to add to user plugin creation api.
   */
  $(window).on('closeme.zf.dropdown closeme.zf.tooltip closeme.zf.reveal', function(e, pluginId){
    var plugin = e.namespace.split('.')[0];
    var plugins = $('[data-' + plugin + ']').not('[data-yeti-box=' + pluginId + ']');
    plugins.each(function(){
      $(this).triggerHandler('close.zf.trigger', [$(this)]);
    });
  });

  //trying to reposition elements on resize
  //********* only fires when all other scripts have loaded *********
  /**
   * Fires once after all other scripts have loaded
   * @function
   * @private
   */
  $(window).load(function(){
    checkWatchers(null);
  });

  /**
   * Checks the global Foundation object for instantiated plugins.
   * @function
   * @param {String|Array} plugs - Name or array of names of plugins the user would like to add to the list of plugins to watch on window resize
   * @throws Plugin#error
   */
  function checkWatchers(plugs) {
    var plugins = Foundation._plugins,
        pluginsToWatch = ['accordion-menu', 'drilldown', 'dropdown-menu', 'dropdown', 'slider', 'reveal', 'sticky', 'tooltip'];
    if(plugs){
      if(typeof plugs === 'array' && typeof plugs[0] === 'string'){
        pluginsToWatch = pluginsToWatch.concat(plugs);
      }else if(typeof plugs === 'string'){
        pluginsToWatch.push(plugs)
      }else{
        /**
         * Logs error if plugs is not a string or array.
         * @event Plugin#error
         */
        console.error('Plugin names must be strings');
      }
    }
    var counter = pluginsToWatch.length,
        watching = false;

    while(counter){
      if(plugins[pluginsToWatch[counter - 1]]){
        watching = true;
      }else{
        pluginsToWatch.splice(counter - 1, 1);
      }
      --counter;
      if(!counter && watching){
        resizeListener(pluginsToWatch);
      }
    }
  }

  //******** only fires this function once on load, if there's something to watch ********
  function resizeListener(){
    var timer, i, len,
        nodes = $('[data-resize]');
    if(nodes.length){
      $(window).off('resize.zf.trigger')
        .on('resize.zf.trigger', function(e){
          if(timer){ clearTimeout(timer); }

          timer = setTimeout(function(){

            for(i = 0, len = nodes.length; i < len; i++){
              var $elem = $(nodes[i])
              $elem.triggerHandler('resizeme.zf.trigger', [$elem]);
            }
          }, 150);//default time to emit resize event, make configurable? change for mobile?*******
      });
    }
  }
// ------------------------------------

  // [PH]
Foundation.CheckWatchers = checkWatchers;
Foundation.IHearYou = resizeListener;

}(window.Foundation, window.jQuery)

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Abide.
   * @class
   * @fires Abide#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Abide(element) {
    this.$element = element;
    this.options  = $.extend({}, Abide.defaults, options);
    this.$window  = $(window);
    this.name     = 'Abide';
    this.attr     = 'data-abide';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Abide#init
     */
    this.$element.trigger('init.zf.abide');
  }

  /**
   * Default settings for plugin
   */
  Abide.defaults = {
    validateOn: 'fieldChange', // options: fieldChange, manual, submit
    labelErrorClass: 'is-invalid-label',
    inputErrorClass: 'is-invalid-input',
    formErrorSelector: '.form-error',
    formErrorClass: 'is-visible',
    patterns: {
      alpha : /^[a-zA-Z]+$/,
      alpha_numeric : /^[a-zA-Z0-9]+$/,
      integer : /^[-+]?\d+$/,
      number : /^[-+]?\d*(?:[\.\,]\d+)?$/,

      // amex, visa, diners
      card : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
      cvv : /^([0-9]){3,4}$/,

      // http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#valid-e-mail-address
      email : /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,

      url : /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
      // abc.de
      domain : /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,

      datetime : /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
      // YYYY-MM-DD
      date : /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
      // HH:MM:SS
      time : /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
      dateISO : /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
      // MM/DD/YYYY
      month_day_year : /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
      // DD/MM/YYYY
      day_month_year : /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,

      // #FFF or #FFFFFF
      color : /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
    },
    validators: {
      equalTo: function (el, required, parent) {
        var from  = document.getElementById(el.getAttribute(this.add_namespace('data-equalto'))).value,
            to    = el.value,
            valid = (from === to);

        return valid;
      }
    }
  };


  /**
   * Initializes the Abide plugin and calls functions to get Abide functioning on load.
   * @private
   */
  Abide.prototype._init = function() {
  };

  /**
   * Initializes events for Abide.
   * @private
   */
  Abide.prototype._events = function() {
    var self = this;
    this.$element
      .off('.abide')
      .on('reset.fndtn.abide', function(e) {
        self.resetForm($(this));
      })
      .on('submit.fndtn.abide', function(e) {
        e.preventDefault();
        self.validateForm(self.$element);
      })
      .find('input, textarea, select')
        .off('.abide')
        .on('blur.fndtn.abide change.fndtn.abide', function (e) {
          // console.log($(e.target));
          if (self.options.validateOn === 'fieldChange') {
            self.validateInput($(e.target), self.$element);
          }
          // self.validateForm(self.$element);
        })
        .on('keydown.fndtn.abide', function (e) {
          // if (settings.live_validate === true && e.which != 9) {
          //   clearTimeout(self.timer);
          //   self.timer = setTimeout(function () {
          //     self.validate([this], e);
          //   }.bind(this), settings.timeout);
          // }
          // self.validateForm(self.$element);
        });

  },
  /**
   * Calls necessary functions to update Abide upon DOM change
   * @private
   */
  Abide.prototype._reflow = function() {
    var self = this;
  };
  /**
   * Checks whether or not a form element has the required attribute and if it's checked or not
   * @param {Object} element - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  Abide.prototype.requiredCheck = function($el) {
    switch ($el[0].type) {
      case 'text':
        if ($el.attr('required') && !$el.val()) {
          // requirement check does not pass
          return false;
        } else {
          return true;
        }
        break;
      case 'checkbox':
        if ($el.attr('required') && !$el.is(':checked')) {
          return false;
        } else {
          return true;
        }
        break;
      case 'radio':
        if ($el.attr('required') && !$el.is(':checked')) {
          return false;
        } else {
          return true;
        }
        break;
      default:
        if ($el.attr('required') && (!$el.val() || !$el.val().length || $el.is(':empty'))) {
          return false;
        } else {
          return true;
        }
    }
  };
  /**
   * Checks whether or not a form element has the required attribute and if it's checked or not
   * @param {Object} element - jQuery object to check for required attribute
   * @returns {Boolean} Boolean value depends on whether or not attribute is checked or empty
   */
  Abide.prototype.findLabel = function($el) {
    if ($el.next('label').length) {
      return $el.next('label');
    }
    else {
      return $el.closest('label');
    }
  };
  /**
   * Adds the CSS error class as specified by the Abide settings to the label, input, and the form
   * @param {Object} element - jQuery object to add the class to
   */
  Abide.prototype.addErrorClasses = function($el) {
    var self = this,
        $label = self.findLabel($el),
        $formError = $el.next(self.options.formErrorSelector) || $el.find(self.options.formErrorSelector);

    // label
    if ($label) {
      $label.addClass(self.options.labelErrorClass);
    }
    // form error
    if ($formError) {
      $formError.addClass(self.options.formErrorClass);
    }
    // input
    $el.addClass(self.options.inputErrorClass);
  };
  /**
   * Removes CSS error class as specified by the Abide settings from the label, input, and the form
   * @param {Object} element - jQuery object to remove the class from
   */
  Abide.prototype.removeErrorClasses = function($el) {
    var self = this,
        $label = self.findLabel($el),
        $formError = $el.next(self.options.formErrorSelector) || $el.find(self.options.formErrorSelector);
    // label
    if ($label && $label.hasClass(self.options.labelErrorClass)) {
      $label.removeClass(self.options.labelErrorClass);
    }
    // form error
    if ($formError && $formError.hasClass(self.options.formErrorClass)) {
      $formError.removeClass(self.options.formErrorClass);
    }
    // input
    if ($el.hasClass(self.options.inputErrorClass)) {
      $el.removeClass(self.options.inputErrorClass);
    }
  };
  /**
   * Goes through a form to find inputs and proceeds to validate them in ways specific to their type
   * @fires Abide#invalid
   * @fires Abide#valid
   * @param {Object} element - jQuery object to validate, should be an HTML input
   * @param {Object} form - jQuery object of the entire form to find the various input elements
   */
  Abide.prototype.validateInput = function($el, $form) {
    var self = this,
        textInput = $form.find('input[type="text"]'),
        checkInput = $form.find('input[type="checkbox"]'),
        label,
        radioGroupName;

    if ($el[0].type === 'text') {
      if (!self.requiredCheck($el) || !self.validateText($el)) {
        self.addErrorClasses($el);
        $el.trigger('invalid.fndtn.abide', $el[0]);
      }
      else {
        self.removeErrorClasses($el);
        $el.trigger('valid.fndtn.abide', $el[0]);
      }
    }
    else if ($el[0].type === 'radio') {
      radioGroupName = $el.attr('name');
      label = $el.siblings('label');

      if (self.validateRadio(radioGroupName)) {
        $(label).each(function() {
          if ($(this).hasClass(self.options.labelErrorClass)) {
            $(this).removeClass(self.options.labelErrorClass);
          }
        });
        $el.trigger('valid.fndtn.abide', $el[0]);
      }
      else {
        $(label).each(function() {
          $(this).addClass(self.options.labelErrorClass);
        });
        $el.trigger('invalid.fndtn.abide', $el[0]);
      };
    }
    else if ($el[0].type === 'checkbox') {
      if (!self.requiredCheck($el)) {
        self.addErrorClasses($el);
        $el.trigger('invalid.fndtn.abide', $el[0]);
      }
      else {
        self.removeErrorClasses($el);
        $el.trigger('valid.fndtn.abide', $el[0]);
      }
    }
    else {
      if (!self.requiredCheck($el) || !self.validateText($el)) {
        self.addErrorClasses($el);
        $el.trigger('invalid.fndtn.abide', $el[0]);
      }
      else {
        self.removeErrorClasses($el);
        $el.trigger('valid.fndtn.abide', $el[0]);
      }
    }
  };
  /**
   * Goes through a form and if there are any invalid inputs, it will display the form error element
   * @param {Object} element - jQuery object to validate, should be a form HTML element
   */
  Abide.prototype.validateForm = function($form) {
    var self = this,
        inputs = $form.find('input'),
        inputCount = $form.find('input').length,
        counter = 0;

    while (counter < inputCount) {
      self.validateInput($(inputs[counter]), $form);
      counter++;
    }

    // what are all the things that can go wrong with a form?
    if ($form.find('.form-error.is-visible').length || $form.find('.is-invalid-label').length) {
      $form.find('[data-abide-error]').css('display', 'block');
    }
    else {
      $form.find('[data-abide-error]').css('display', 'none');
    }
  };
  /**
   * Determines whether or a not a text input is valid based on the patterns specified in the attribute
   * @param {Object} element - jQuery object to validate, should be a text input HTML element
   * @returns {Boolean} Boolean value depends on whether or not the input value matches the pattern specified
   */
  Abide.prototype.validateText = function($el) {
    var self = this,
        valid = false,
        patternLib = this.options.patterns,
        inputText = $(el).val(),
        // maybe have a different way of parsing this bc people might use type
        pattern = $(el).attr('pattern');

    // if there's no value, then return true
    // since required check has already been done
    if (inputText.length === 0) {
      return true;
    }
    else {
      if (inputText.match(patternLib[pattern])) {
        return true;
      }
      else {
        return false;
      }
    }
  };
  /**
   * Determines whether or a not a radio input is valid based on whether or not it is required and selected
   * @param {String} group - A string that specifies the name of a radio button group
   * @returns {Boolean} Boolean value depends on whether or not at least one radio input has been selected (if it's required)
   */
  Abide.prototype.validateRadio = function(group) {
    var self = this,
        labels = $(':radio[name="' + group + '"]').siblings('label'),
        counter = 0;
    // go through each radio button
    $(':radio[name="' + group + '"]').each(function() {
      // put them through the required checkpoint
      if (!self.requiredCheck($(this))) {
        // if at least one doesn't pass, add a tally to the counter
        counter++;
      }
      // if at least one is checked
      // reset the counter
      if ($(this).is(':checked')) {
        counter = 0;
      }
    });

    if (counter > 0) {
      return false;
    }
    else {
      return true;
    }
  };
  Abide.prototype.matchValidation = function(val, validation) {

  };
  /**
   * Resets form inputs and styles
   * @param {Object} $form - A jQuery object that should be an HTML form element
   */
  Abide.prototype.resetForm = function($form) {
    var self = this;
    var invalidAttr = 'data-invalid';
    // remove data attributes
    $('[' + self.invalidAttr + ']', $form).removeAttr(invalidAttr);
    // remove styles
    $('.' + self.options.labelErrorClass, $form).not('small').removeClass(self.options.labelErrorClass);
    $('.' + self.options.inputErrorClass, $form).not('small').removeClass(self.options.inputErrorClass);
    $('.form-error.is-visible').removeClass('is-visible');
    $form.find('[data-abide-error]').css('display', 'none');
    $(':input', $form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr(invalidAttr);
  };

  Foundation.plugin(Abide);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Abide;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Abide;
    });

}(Foundation, jQuery);

!function($) {
  'use strict';

  /**
   * Creates a new instance of an accordion.
   * @class
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   */
  function Accordion(element){
    this.$element = element;
    this.options = $.extend({}, Accordion.defaults, this.$element.data());

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Accordion#init
     */
    this.$element.trigger('init.zf.accordion');
  }

  Accordion.defaults = {
    slideSpeed: 250,
    multiExpand: false,
    allowAllClosed: false
  };

  /**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */
  Accordion.prototype._init = function() {
    var $initActive = this.$element.find('.is-active').children('[data-tab-content]');
    if($initActive){
      this.down($initActive, true);
      return;
    }
  };

  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  Accordion.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $tabContent = $(this).children('[data-tab-content]');
      if ($tabContent.length) {
        $(this).on('click.zf.accordion', function(e) {
        // $(this).children('a').on('click.zf.accordion', function(e) {
          e.preventDefault();
          if ($tabContent.parent().hasClass('is-active')) {
            if(_this.options.allowAllClosed || $tabContent.parent().siblings().hasClass('is-active')){
              _this.up($tabContent);
            }
          }
          else {
            _this.down($tabContent);
          }
        });
      }
    });
  };

  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to open.
   * @fires Accordion#down
   */
  Accordion.prototype.down = function($target, firstTime) {
    if(!this.options.multiExpand && !firstTime){
      var $currentActive = this.$element.find('.is-active').children('[data-tab-content]');
      if($currentActive){
        this.up($currentActive);
      }
    }
    $target
      .parent('[data-tab-content]')
      .addBack()
      .slideDown(this.options.slideSpeed)
      .parent().addClass(firstTime ? '' : 'is-active');

    if(!firstTime){
      console.log('reflowing yo!');
      // Foundation.reflow(this.$element, 'accordion');
    }
    /**
     * Fires when the tab is done opening.
     * @event Accordion#down
     */
    this.$element.trigger('down.zf.accordion', [$target]);
  };

  /**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close.
   * @fires Accordion#up
   */
  Accordion.prototype.up = function($target) {
    var $aunts = $target.parent().siblings();
    var canClose = this.options.multiExpand ? $aunts.hasClass('is-active') : $target.parent().hasClass('is-active');

    if(!this.options.allowAllClosed && !canClose){
      return;
    }
    $target.slideUp(this.options.slideSpeed, function() {
      $target.find('[data-tab-content]').slideUp(0);
    })
      .parent().removeClass('is-active');

    /**
     * Fires when the tab is done collapsing up.
     * @event Accordion#up
     */
    this.$element.trigger('up.zf.accordion', [$target]);
  };

  /**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   */
  Accordion.prototype.destroy = function() {
    this.$element.find('[data-tab-content]').slideUp(0).css('display', '');
    this.$element.find('a').off('click.zf.accordion');

    /**
     * Fires when the plugin has been destroyed.
     * @event Accordion#destroyed
     */
    this.$element.trigger('destroyed.zf.accordion');
  }

  Foundation.plugin(Accordion);
}(jQuery);

!function($) {
  'use strict';

  /**
   * Creates a new instance of an accordion menu.
   * @class
   * @fires AccordionMenu#init
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function AccordionMenu(element) {
    this.$element = element;
    this.options = $.extend({}, AccordionMenu.defaults, this.$element.data());

    this.$activeMenu = $();

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event AccordionMenu#init
     */
    this.$element.trigger('init.zf.accordionMenu');
  }

  AccordionMenu.defaults = {
    slideSpeed: 250
  }

  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  AccordionMenu.prototype._init = function() {
    this.$element.find('[data-submenu]').slideUp(0);
  };

  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  AccordionMenu.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        $(this).children('a').on('click.zf.accordionMenu', function(e) {
          e.preventDefault();
          console.log("why isn't this working");

          if (!$submenu.is(':hidden')) {
            _this.up($submenu);
          }
          else {
            _this.down($submenu);
          }
        });
      }
    });
  };

  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  AccordionMenu.prototype.down = function($target) {
    $target
      .parentsUntil(this.$element, '[data-submenu]')
      .addBack()
        .slideDown(this.options.slideSpeed);

    /**
     * Fires when the menu is done collapsing up.
     * @event AccordionMenu#down
     */
    this.$element.trigger('down.zf.accordionMenu', [$target]);
  };

  /**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */
  AccordionMenu.prototype.up = function($target) {
    $target.slideUp(this.options.slideSpeed, function() {
      $target.find('[data-submenu]').slideUp(0);
    });

    /**
     * Fires when the menu is done collapsing up.
     * @event AccordionMenu#up
     */
    this.$element.trigger('up.zf.accordionMenu', [$target]);
  };

  /**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */
  AccordionMenu.prototype.destroy = function() {
    this.$element.find('[data-submenu]').slideDown(0).css('display', '');
    this.$element.find('a').off('click.zf.accordionMenu');

    /**
     * Fires when the plugin has been destroyed.
     * @event AccordionMenu#destroy
     */
    this.$element.trigger('destroyed.zf.accordionMenu');
  };

  Foundation.plugin(AccordionMenu);
}(jQuery)

!function($, Foundation){
  'use strict';

  function Drilldown(element){
    this.$element = element;
    this.options = $.extend({}, Drilldown.defaults, this.$element.data());
    this._init();
  }
  Drilldown.defaults = {
    backButton: '<li class="js-drilldown-back"><a>Back</a></li>',
    wrapper: '<div></div>',
    closeOnClick: true,
    holdOpen: false
  };
  Drilldown.prototype._init = function(){
    this.$submenuAnchors = this.$element.find('li.has-submenu');
    this.$submenus = this.$submenuAnchors.children('[data-submenu]').addClass('is-drilldown-sub')/*.wrap($(this.options.wrapper).addClass('is-drilldown-sub'))*/;
    // this.$rootMenus = this.$element.children('[data-submenu]').addClass('first-sub');
    this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'menuitem');
    // this.$submenus;

    // console.log(this.$wrapper.outerHeight(), this.$wrapper.css());
    this._prepareMenu();
    // this.getMaxHeight();
  };
  Drilldown.prototype._prepareMenu = function(){
    var _this = this;
    if(!this.options.holdOpen){
      this._menuLinkEvents();
    }
    console.log(this.$submenuAnchors);
    this.$submenuAnchors.each(function(){
      // this.removeAttribute('href');
      var $sub = $(this);
      $sub.find('a')[0].removeAttribute('href');
      $sub.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': -1,
            'role': 'menu'
          });
      _this._events($sub);
    });
    this.$submenus.each(function(){
      var $menu = $(this);
      $menu.prepend(_this.options.backButton);
      _this._back($menu);
    });
    this.$wrapper = $(this.options.wrapper).addClass('is-drilldown').css(this.getMaxHeight());
    this.$element.wrap(this.$wrapper);

  };
  Drilldown.prototype._events = function($elem){
    var _this = this;

    $elem/*.off('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown')*/
    .on('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
      // e.preventDefault();
      e.stopPropagation();
      console.log(e);
      if(e.target !== e.currentTarget.firstElementChild){
        return false;
      }
      _this._show($elem);

      if(_this.options.closeOnClick){
        var $body = $('body').not(_this.$wrapper);
        $body.off('.zf.drilldown').on('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
          console.log('body mouseup');
          e.preventDefault();
          _this._hideAll();
          $body.off('.zf.drilldown');
        });
      }
    });
  };
  Drilldown.prototype._hideAll = function(){
    this.$element.find('.is-drilldown-sub.is-active').addClass('is-closing')
        .on('transitionend.zf.drilldown', function(e){
          $(this).removeClass('is-active is-closing').off('transitionend.zf.drilldown');

        });
  };
  Drilldown.prototype._back = function($elem){
    $elem.off('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown');
    $elem.children('.js-drilldown-back')
        .on('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
          $elem.addClass('is-closing').on('transitionend.zf.drilldown', function(e){
            // e.stopImmediatePropagation();
            $elem.removeClass('is-active is-closing').off('transitionend.zf.drilldown');
          });
        });
  }
  Drilldown.prototype._menuLinkEvents = function(){
    var _this = this;
    this.$menuItems.not('.has-submenu')
        .off('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown')
        .on('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
          e.stopImmediatePropagation();
          setTimeout(function(){
            _this._hideAll();
          }, 0)
      });
  };
  Drilldown.prototype._show = function($elem){

    $elem.children('[data-submenu]').addClass('is-active');
  };
  Drilldown.prototype.getMaxHeight = function(){
    var max = 0, result = {};
    this.$submenus.each(function(){
      var numOfElems = $(this).children('li').length;
      max = numOfElems > max ? numOfElems : max;
    });
    // console.log('1',this.$menuItems[0].getBoundingClientRect().height);
    result.height = max * this.$menuItems[0].getBoundingClientRect().height + 'px';
    result.width = this.$menuItems[0].getBoundingClientRect().width + 'px';
    
    return result;
  };
  Foundation.plugin(Drilldown);
}(jQuery, window.Foundation);


// !function(Foundation, $) {
//   'use strict';
//
//   /**
//    * Creates a new instance of Drilldown.
//    * @class
//    * @fires Drilldown#init
//    * @param {jQuery} element - jQuery object to make into a drilldown menu.
//    * @param {Object} options - Overrides to the default plugin settings.
//    */
//   function Drilldown(element) {
//     this.$element = element;
//     this.options = $.extend({}, Drilldown.defaults, this.$element.data());
//     // this.$container = $();
//     // this.$currentMenu = this.$element;
//
//     this._init();
//
//     /**
//      * Fires when the plugin has been successfuly initialized.
//      * @event Drilldown#init
//      */
//     this.$element.trigger('init.zf.drilldown');
//   }
//
//   Drilldown.defaults = {
//     /**
//      * HTML to use for the back button at the top of each sub-menu.
//      * @option
//      * @sample '<li class="js-drilldown-back"><a>Back</a></li>'
//      */
//     backButton: '<li class="js-drilldown-back"><a>Back</a></li>'
//   };
//
//   Drilldown.prototype = {
//     /**
//      * Initializes the Drilldown by creating a container to wrap the menu bar in, and initializing all submenus.
//      * @private
//      */
//     _init: function() {
//       console.log('yo');
//       this.$container = $('<div class="is-drilldown"></div>');
//       this.$container.css('width', this.$element.css('width'));
//       this.$element.wrap(this.$container);
//       this._prepareMenu(this.$element, true);
//     },
//
//     /**
//      * Scans a menu bar for any sub menu bars inside of it. This is a recursive function, so when a sub menu is found, this method will be called on that sub menu.
//      * @private
//      * @param {jQuery} $elem - Menu to scan for sub menus.
//      * @param {Boolean} root - If true, the menu being scanned is at the root level.
//      */
//     _prepareMenu: function($elem, root) {
//       var _this = this;
//
//       // Create a trigger to move up the menu. This is not used on the root-level menu, because it doesn't need a back button.
//       if (!root) {
//         var $backButton = $(_this.options.backButton);
//         $backButton.mouseup(function() {
//           _this.backward();
//         });
//         // console.log(_this.options.backButton);
//         $elem.prepend($backButton);
//       }
//
//       // Look for sub-menus inside the current one
//       $elem.children('li').each(function() {
//         var $submenu = $(this).children('[data-submenu]');
//
//         // If it exists...
//         if ($submenu.length) {
//           $submenu.addClass('is-drilldown-sub');
//
//           // Create a trigger to move down the menu
//           $(this).children('a').mouseup(function() {
//             _this.forward($submenu);
//             return false;
//           });
//
//           // We have to go deeper
//           _this._prepareMenu($submenu, false);
//         }
//       });
//     },
//
//     /**
//      * Moves down the drilldown by activating the menu specified in `$target`.
//      * @fires Drilldown#forward
//      * @param {jQuery} $target - Sub menu to activate.
//      */
//     forward: function($target) {
//       var _this = this;
//
//       Foundation.requestAnimationFrame(function() {
//         $target.addClass('is-active');
//         _this.$currentMenu = $target;
//
//         /**
//          * Fires when the menu is done moving forwards.
//          * @event Drilldown#forward
//          */
//         _this.$element.trigger('forward.zf.drilldown', [_this.$currentMenu]);
//       });
//     },
//
//     /**
//      * Moves up the drilldown by deactivating the current menu.
//      * @fires Drilldown#backward
//      */
//     backward: function() {
//       var _this = this;
//
//       Foundation.requestAnimationFrame(function() {
//         _this.$currentMenu.removeClass('is-active');
//         _this.$currentMenu = _this.$currentMenu.parents('[data-drilldown], [data-submenu]');
//
//         /**
//          * Fires when the menu is done moving backwards.
//          * @event Drilldown#backward
//          */
//         _this.$element.trigger('backward.zf.drilldown', [_this.$currentMenu]);
//       });
//     },
//
//     /**
//      * Destroys an instance of a drilldown. A callback can optionally be run when the process is finished.
//      * @param {Function} cb - Callback to run when the plugin is done being destroyed.
//      */
//     destroy: function(cb) {
//       this.$element.find('[data-submenu]').removeClass('is-drilldown-sub');
//       this.$currentMenu.removeClass('is-active');
//       this.$element.find('.is-drilldown-back').remove();
//       this.$element.removeData('zf-plugin');
//       this.$element.unwrap();
//
//       if (typeof cb === 'function') cb();
//     }
//   };
//
//   Foundation.plugin(Drilldown);
// }(window.Foundation, jQuery);

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of DropdownMenu.
   * @class
   * @fires DropdownMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function DropdownMenu(element) {
    this.$element = element;
    this.options = $.extend({}, DropdownMenu.defaults, this.$element.data());

    // this.$openMenu = $();
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event DropdownMenu#init
     */
    this.$element.trigger('init.zf.dropdown');
  }

  /**
   * Default settings for plugin
   */
  DropdownMenu.defaults = {
    // toggleOn: 'both',
    clickOpen: true,
    closeOnClick: true,
    disableHover: false,
    autoclose: true,
    hoverDelay: 150,
    closingTime: 500,
    keyboardAccess: true,
    wrapOnKeys: true,
    alignment: 'left',
    vertical: false
  };

  DropdownMenu.prototype._init = function() {
    this.$element.attr('role', 'menubar');
    this.options.vertical = this.$element.hasClass('vertical');
    this._prepareMenu(this.$element);
    this._addTopLevelKeyHandler();
  };

  DropdownMenu.prototype._prepareMenu = function(){
    var _this = this;
    this.$tabs = this.$element.children('li.has-submenu');
    this.$tabs.children('[data-submenu]').addClass('first-sub');
    this.$submenus = this.$element.find('li.has-submenu');
    this.$menuItems = this.$element.find('li').attr('role', 'menuitem');

    if(this.$element.hasClass('align-right')){
      this.options.alignment = 'right';
      this.$submenus.addClass('right');
    }

    this.$tabs.each(function(){
      var $tab = $(this);
      $tab.attr({
        'role': 'menuitem',
        'tabindex': -100,
        'title': $tab.children('a:first-child').text()/*.match(/\w/ig).join('')*/
      });//maybe add a more specific regex to match alphanumeric characters and join them appropriately
      if($tab.children('[data-submenu]')){
        $tab.attr('aria-haspopup', true);
      }
    });
    this.$tabs[0].setAttribute('tabindex', 0);

    this.$submenus.each(function(){
      var $sub = $(this);

      if(_this.$element.hasClass('align-right')){
        $sub.children('[data-submenu]').addClass('right');
      }

      $sub.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': -1,
            'role': 'menu'
          }).addClass('vertical');
      _this._events($sub);
    });
  };

  DropdownMenu.prototype._events = function($elem){
    var _this = this;

    if(this.options.keyboardAccess){
      this._addKeyupHandler($elem);
    }

    if(this.options.clickOpen){
      $elem.on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
        e.preventDefault();
        e.stopPropagation();

        if($elem.data('isClick')){
          _this._hide($elem);
        }else{
          _this._hideOthers($elem);
          _this._show($elem);
          $elem.data('isClick', true).parentsUntil('[data-dropdown-menu]', '.has-submenu').data('isClick', true);
          if(_this.options.closeOnClick){
            _this._addBodyHandler();
          }
        }
      });
    }

    if(!this.options.disableHover){
      //add ability for all menu items to close an open menu on the same level//
      this.$menuItems.on('mouseenter.zf.dropdownmenu', function(e){
        var $el = $(this);
        if(!$el.hasClass('is-active')){
          _this._hideOthers($el);
        }
      });
      //elements with submenus
      $elem.on('mouseenter.zf.dropdownmenu', function(e){
        clearTimeout($elem.closeTimer);
        if(!$elem.hasClass('is-active')){
          $elem.openTimer = setTimeout(function(){
              // _this._hideOthers($elem);
              _this._show($elem);
          }, _this.options.hoverDelay);
        }
      }).on('mouseleave.zf.dropdownmenu', function(e){
        if(!$elem.data('isClick') && _this.options.autoclose){
        clearTimeout($elem.openTimer);
          $elem.closeTimer = setTimeout(function(){
            _this._hide($elem);
          }, _this.options.closingTime);
        }
      });
    }
  };
  DropdownMenu.prototype._addTopLevelKeyHandler = function(){
    var _this = this,
        vertical = this.options.vertical,
        $firstItem = this.$element.children('li:first-of-type'),
        $lastItem = this.$element.children('li:last-of-type');
    this.$tabs.on('focus.zf.dropdownmenu', function(){
      // console.log('what?', this);
      _this._show($(this));
    }).on('focusout.zf.dropdownmenu', function(e){
      console.log('au revoir');
      _this._hide($(this))
    });
    this.$tabs.on('keydown.zf.dropdownmenu', function(e){
      if (e.which !== 9) {
        e.preventDefault();
        e.stopPropagation();
      }
      console.log(e.which);

      var $tabTitle = $(this),
          $prev = $tabTitle.prev(),
          $next = $tabTitle.next();
      if(_this.options.wrapOnKeys){
        $prev = $prev.length ? $prev : $lastItem;
        $next = $next.length ? $next : $firstItem;
      }
      if(checkClass($prev) || checkClass($next)){
        return;
      }

      switch (e.which) {

        case 32://return or spacebar
        case 13:
          console.log($tabTitle.find('ul.submenu > li:first-of-type'));
          $tabTitle.find('[role="menuitem"]:first-of-type').addClass('is-active').focus().select();
          // _this._hideOthers($tabTitle);
          _this._show($tabTitle);
          break;

        case 40: //down
          break;
        case 38://up
          break;

        case 37://left
        if(vertical){
          break;
        }
          $prev.focus();
          // _this._hideOthers($prev);
          _this._show($prev);
          break;
        case 39://right
        if(vertical){
          break;
        }
          $next.focus();
          // _this._hideOthers($next);
          _this._show($next);
          break;

        case 27://esc
          _this._hideAll();
          $tabTitle.blur();
          break;
        default:
          return;
      }
    });
  };

  DropdownMenu.prototype._addKeyupHandler = function($elem){


  };
  DropdownMenu.prototype._addBodyHandler = function(){
    var $body = $('body'),
        _this = this;
    $body.not(_this.$element).on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
      _this._hideAll();
      $body.off('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu');
    })
  };
//show & hide stuff @private
  DropdownMenu.prototype._show = function($elem){
    var $sub = $elem.children('[data-submenu]:first-of-type');
    $elem.addClass('is-active');
    $sub.css('visibility', 'hidden').addClass('js-dropdown-active')
        .attr('aria-hidden', false);


    //break this into own function
    var clear = Foundation.ImNotTouchingYou($sub, null, true);
    if(!clear){
      if(this.options.alignment === 'left'){
        $sub.addClass('right');
      }else{
        $sub.removeClass('right');
      }
      this.changed = true;
    }
      $sub.css('visibility', '');
  };

  DropdownMenu.prototype._hide = function($elem){
    this._hideSome($elem);
  };
  DropdownMenu.prototype._hideSome = function($elems){
    if($elems.length){
      // if($elems.hasClass('first-sub')){
      //   console.log('true');
      //   $elems.blur();
      // }
      $elems.removeClass('is-active').data('isClick', false)

            .find('.is-active').removeClass('is-active').data('isClick', false).end()

            .find('.js-dropdown-active').removeClass('js-dropdown-active')
                                        .attr('aria-hidden', true);
      $elems.parent('.has-submenu').removeClass('is-active');
      if(this.changed){
        //remove position class
        if(this.options.alignment === 'left'){
          $elems.find('.right').removeClass('right');
        }else{
          $elems.find('[data-submenu]').addClass('right');
        }
      }
    }
  };
  DropdownMenu.prototype._hideOthers = function($elem){
    this._hideSome($elem.siblings('.has-submenu.is-active'));
  };
  DropdownMenu.prototype._hideAll = function(){
    this._hideSome(this.$element);
  };
//****
  DropdownMenu.prototype.destroy = function() {
    this._hideAll();
    this.$element
        .removeData('zf-plugin')
        .find('li')
        .removeClass('js-dropdown-nohover')
        .off('.zf.dropdownmenu');
  };
  Foundation.plugin(DropdownMenu);

  function checkClass($elem){
    return $elem.hasClass('is-active');
  }

}(Foundation, jQuery);

!function($, Foundation){
  'use strict';

/*
NEEDS:
  aria testing
*/


  function Dropdown(element){
    this.$element = element;
    this.options = $.extend({}, Dropdown.defaults, this.$element.data());
    this._init();
  }

  Dropdown.defaults = {
    activeClass: 'is-open',
    hoverDelay: 250,
    disableHover: true,
    dropdownClass: 'dropdown-pane',
    vOffset: 1,
    hOffset: 1,
    positionClass: ''
  };

  Dropdown.prototype._init = function(){
    var $id = this.$element.attr('id');

    this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]');
    this.$anchor.attr({'aria-controls': $id, 'data-is-focus': 'false', 'data-yeti-box': $id});

    this.options.positionClass = this.getPositionClass();
    this.counter = 4;
    this.usedPositions = [];
    this.$element.attr({
      'aria-hidden': 'true',
      'data-yeti-box': $id
    }).hide();
    this._events();
    this.$element.trigger('init.zf.dropdown');
  };

  Dropdown.prototype.getPositionClass = function(){
    var position = this.$element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };

  Dropdown.prototype.reposition = function(position){
    this.usedPositions.push(position ? position : 'bottom');
    //default, try switching to opposite side
    if(!position && (this.usedPositions.indexOf('top') < 0)){
      this.$element.addClass('top');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }else if(position === 'left' && (this.usedPositions.indexOf('right') < 0)){
      this.$element.removeClass(position)
          .addClass('right');
    }else if(position === 'right' && (this.usedPositions.indexOf('left') < 0)){
      this.$element.removeClass(position)
          .addClass('left');
    }

    //if default change didn't work, try bottom or left first
    else if(!position && (this.usedPositions.indexOf('top') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.$element.addClass('left');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.$element.removeClass(position)
          .addClass('left');
    }else if(position === 'left' && (this.usedPositions.indexOf('right') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }else if(position === 'right' && (this.usedPositions.indexOf('left') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.$element.removeClass(position);
    }
    //if nothing cleared, set to bottom
    else{
      this.$element.removeClass(position);
    }
    this.classChanged = true;
    this.counter--;
  };

  Dropdown.prototype.setPosition = function(){
    var position = this.getPositionClass(),
        $eleDims = Foundation.GetDimensions(this.$element),
        $anchorDims = Foundation.GetDimensions(this.$anchor),
        _this = this,
        direction = (position === 'left' ? 'left' : ((position === 'right') ? 'left' : 'top')),
        param = (direction === 'top') ? 'height' : 'width',
        offset = (param === 'height') ? this.options.vOffset : this.options.hOffset;

    // console.log($eleDims.width >= $eleDims.windowDims.width);
    if(($eleDims.width >= $eleDims.windowDims.width) || (!this.counter && !Foundation.ImNotTouchingYou(this.$element))){
      this.$element.offset(Foundation.GetOffsets(this.$element, this.$anchor, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
        'width': $eleDims.windowDims.width - (this.options.hOffset * 2),
        'height': 'auto',
      });
      return false;
    }

    this.$element.offset(Foundation.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));

    while(!Foundation.ImNotTouchingYou(this.$element) && this.counter){
      this.reposition(position);
      this.setPosition();
    }
  };

  Dropdown.prototype._events = function(){
    var _this = this;
    this.$element.on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'closeme.zf.trigger': this.close.bind(this)
    });
    this.$element.on('close.zf.trigger', function(){
      console.log('hello', this);
    });
    if(!this.options.disableHover){
      clearTimeout(_this.timeout);
      this.$anchor.on('mouseenter.zf.dropdown mouseleave.zf.dropdown', function(){
        _this.timeOut = setTimeout(function(){
          _this.toggle();
        }, _this.options.hoverDelay);
      });
    }
  };

  Dropdown.prototype.open = function(){
    // $(document).trigger('click.zf.trigger'/*, $('[data-yeti-box]')*/);
    this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
    var _this = this;
    this.$element.show();
    this.setPosition();
    this.$element.addClass(this.options.activeClass)
        .attr('aria-hidden', 'false');
    this.$anchor.addClass('hover');

    //why does this not work correctly for this plugin?
    // Foundation.reflow(this.$element, 'dropdown');
    // this.$element.foundation();
    Foundation.reflow();
  };


  Dropdown.prototype.close = function(){
    if(!this.$element.hasClass(this.options.activeClass)){
      return false;
    }
    this.$element.removeClass(this.options.activeClass)
        .attr('aria-hidden', 'true');
    this.$anchor.removeClass('hover');
    if(this.classChanged){
      var curPositionClass = this.getPositionClass();
      if(curPositionClass){
        this.$element.removeClass(curPositionClass);
      }
      this.$element.addClass(this.options.positionClass)
          .hide();
      this.classChanged = false;
      this.counter = 4;
      this.usedPositions.length = 0;
    }
  };

  Dropdown.prototype.toggle = function(){
    if(this.$element.hasClass(this.options.activeClass)){
      this.close();
    }else{
      this.open();
    }
  };

  Foundation.plugin(Dropdown);
}(jQuery, window.Foundation);

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Equalizer.
   * @class
   * @fires Equalizer#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Equalizer(element) {
    this.$element = element;
    this.options  = $.extend({}, Equalizer.defaults, options);
    this.$window  = $(window);
    this.name     = 'equalizer';
    this.attr     = 'data-equalizer';

    this._init();
    this._events();
    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Equalizer#init
     */
    this.$element.trigger('init.zf.equalizer');
  }

  /**
   * Default settings for plugin
   */
  Equalizer.defaults = {
    equalizeOnStack: true,
    throttleInterval: 50
  };

  /**
   * Initializes the Equalizer plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  Equalizer.prototype._init = function() {
    this._reflow();
  };

  /**
   * Initializes events for Equalizer.
   * @private
   */
  Equalizer.prototype._events = function() {
    var self = this;

    this.$window
      .off('.equalizer')
      .on('resize.fndtn.equalizer', Foundation.util.throttle(function () {
        self._reflow();
      }, self.options.throttleInterval));
  };

  /**
   * A noop version for the plugin
   * @private
   */
  Equalizer.prototype._killswitch = function() {
    return;
  };
  /**
   * Calls necessary functions to update Equalizer upon DOM change
   * @private
   */
  Equalizer.prototype._reflow = function() {
    var self = this;

    $('[' + this.attr + ']').each(function() {
      var $eqParent       = $(this),
          adjustedHeights = [];

      if ($eqParent.find('img').length) {
        onImagesLoaded($eqParent.find('img'), function() {
          adjustedHeights = self.getHeights($eqParent);
          self.applyHeight($eqParent, adjustedHeights);
        });
      }
      else {
        adjustedHeights = self.getHeights($eqParent);
        self.applyHeight($eqParent, adjustedHeights);
      }
    });
  };
  /**
   * Finds the outer heights of children contained within an Equalizer parent and returns them in an array
   * @param {Object} $eqParent A jQuery instance of an Equalizer container
   * @returns {Array} heights An array of heights of children within Equalizer container
   */
  Equalizer.prototype.getHeights = function($eqParent) {

    var eqGroupName = $eqParent.data('equalizer'),
        eqGroup     = eqGroupName ? $eqParent.find('[' + this.attr + '-watch="' + eqGroupName + '"]:visible') : $eqParent.find('[' + this.attr + '-watch]:visible'),
        heights;

    eqGroup.height('inherit');
    heights = eqGroup.map(function () { return $(this).outerHeight(false);}).get();
    console.log(heights);
    return heights;
  };
  /**
   * Changes the CSS height property of each child in an Equalizer parent to match the tallest
   * @param {Object} $eqParent - A jQuery instance of an Equalizer container
   * @param {array} heights - An array of heights of children within Equalizer container
   * @fires Equalizer#preEqualized
   * @fires Equalizer#postEqualized
   */
  Equalizer.prototype.applyHeight = function($eqParent, heights) {
    var eqGroupName = $eqParent.data('equalizer'),
        eqGroup     = eqGroupName ? $eqParent.find('['+this.attr+'-watch="'+eqGroupName+'"]:visible') : $eqParent.find('['+this.attr+'-watch]:visible'),
        max         = Math.max.apply(null, heights);

    /**
     * Fires before the heights are applied
     * @event Equalizer#preEqualized
     */
    $eqParent.trigger('preEqualized.zf.Equalizer');

    // for now, apply the max height found in the array
    for (var i = 0; i < eqGroup.length; i++) {
      $(eqGroup[i]).css('height', max);
    }
    console.log(max);
    /**
     * Fires when the heights have been applied
     * @event Equalizer#postEqualized
     */
    $eqParent.trigger('postEqualized.zf.Equalizer');
  };

  Foundation.plugin(Equalizer);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Equalizer;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Equalizer;
    });

  /**
   * Runs a callback function when images are fully loaded.
   * @param {Object} images - Image(s) to check if loaded.
   * @param {Func} callback - Function to execute when image is fully loaded.
   */
  function onImagesLoaded(images, callback) {
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

}(Foundation, jQuery);

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Interchange.
   * @class
   * @fires Interchange#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Interchange(element, options) {
    this.$element = element;
    this.options = $.extend({}, Interchange.defaults, options);
    this.rules = [];
    this.currentPath = '';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Interchange#init
     */
    this.$element.trigger('init.zf.interchange');
  }

  /**
   * Default settings for plugin
   */
  Interchange.defaults = {
    rules: null
  }

  Interchange.SPECIAL_QUERIES = {
    'landscape': 'screen and (orientation: landscape)',
    'portrait': 'screen and (orientation: portrait)',
    'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
  }

  /**
   * Initializes the Interchange plugin and calls functions to get interchange functioning on load.
   * @function
   * @private
   */
  Interchange.prototype._init = function() {
    this._addBreakpoints();
    this._generateRules();
    this._reflow();
  }

  /**
   * Initializes events for Interchange.
   * @function
   * @private
   */
  Interchange.prototype._events = function() {
    $(window).on('resize.fndtn.interchange', Foundation.util.throttle(this._reflow.bind(this), 50));
  }

  /**
   * Calls necessary functions to update Interchange upon DOM change
   * @function
   * @private
   */
  Interchange.prototype._reflow = function() {
    var match;

    // Iterate through each rule, but only save the last match
    for (var i in this.rules) {
      var rule = this.rules[i];

      if (window.matchMedia(rule.query).matches) {
        match = rule;
      }
    }

    if (match) {
      this.replace(match.path);
    }
  }

  /**
   * Gets the Foundation breakpoints and adds them to the Interchange.SPECIAL_QUERIES object.
   * @function
   * @private
   */
  Interchange.prototype._addBreakpoints = function() {
    for (var i in Foundation.MediaQuery.queries) {
      var query = Foundation.MediaQuery.queries[i];
      Interchange.SPECIAL_QUERIES[query.name] = query.value;
    }
  }

  /**
   * Checks the Interchange element for the provided media query + content pairings
   * @function
   * @private
   * @param {Object} element - jQuery object that is an Interchange instance
   * @returns {Array} scenarios - Array of objects that have 'mq' and 'path' keys with corresponding keys
   */
  Interchange.prototype._generateRules = function() {
    var rulesList = [];
    var rules;

    if (this.options.rules) {
      rules = this.options.rules;
    }
    else {
      rules = this.$element.data('interchange').match(/\[.*?\]/g);
    }

    for (var i in rules) {
      var rule = rules[i].slice(1, -1).split(', ');
      var path = rule.slice(0, -1).join('');
      var query = rule[rule.length - 1];

      if (Interchange.SPECIAL_QUERIES[query]) {
        query = Interchange.SPECIAL_QUERIES[query];
      }

      rulesList.push({
        path: path,
        query: query
      });
    }

    this.rules = rulesList;
  }

  /**
   * Update the `src` property of an image, or change the HTML of a container, to the specified path.
   * @function
   * @param {String} path - Path to the image or HTML partial.
   * @fires Interchange#replaced
   */
  Interchange.prototype.replace = function(path) {
    if (this.currentPath === path) return;

    var _this = this;

    // Replacing images
    if (this.$element[0].nodeName === 'IMG') {
      this.$element.attr('src', path).load(function() {
        _this.$element.trigger('replaced.zf.interchange');
        _this.currentPath = path;
      });
    }
    // Replacing background images
    else if (path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)) {
      this.$element.css({ 'background-image': 'url('+path+')' });
    }
    // Replacing HTML
    else {
      $.get(path, function(response) {
        _this.$element.html(response);
        _this.$element.trigger('replaced.zf.interchange');
        _this.currentPath = path;
      });
    }
  }

  Foundation.plugin(Interchange);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Interchange;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Interchange;
    });

}(Foundation, jQuery);

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Magellan.
   * @class
   * @fires Magellan#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Magellan(element, options) {
    this.$element = element;
    this.options  = $.extend({}, Magellan.defaults, options);
    this.$window  = $(window);
    this.name     = 'magellan';
    this.attr     = 'data-magellan';
    this.attrArrival  = 'data-magellan-target';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Magellan#init
     */
    this.$element.trigger('init.zf.magellan');
  };

  /**
   * Default settings for plugin
   */
  Magellan.defaults = {
    animationDuration: 500,
    animationEasing: 'linear',
    threshold: null,
    activeClass: 'active'
  };

  /**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  Magellan.prototype._init = function() {
  };

  /**
   * Initializes events for Magellan.
   * @private
   */
  Magellan.prototype._events = function() {
    var self = this;

    this.$window
      .off('.magellan')
      .on('resize.fndtn.magellan', Foundation.util.throttle(function () {
        self._reflow();
      }.bind(this), 50))
      .on('scroll.fndtn.magellan', Foundation.util.throttle(function(e) {
        e.preventDefault();
        self.updateActiveClass();
      }, 100));

    this.$element
      .on('click.fndtn.magellan', 'a[href^="#"]', function(e) {
        e.preventDefault();
        // include animation settings
        var arrival   = $(this).attr('href'),
            navOffset = self.$element.height();

        $('html, body').animate({
          scrollTop: $(arrival).offset().top - navOffset
        },
        {
          duration: self.options.animationDuration,
          easing:   self.options.animationEasing
        });

        window.location = arrival;
      })
  };
  /**
   * Calls necessary functions to update Magellan upon DOM change
   * @private
   */
  Magellan.prototype._reflow = function() {
  };
  /**
   * Detects the arrival sections and adds the active class to the magellan navigation bar
   */
  Magellan.prototype.updateActiveClass = function() {
    var windowPosition = this.$window.scrollTop(),
        arrivals       = $('[' + this.attrArrival + ']'),
        // for sensitivty to trigger the active class, either use the specified
        // threshold amount, or use the height of the nav item plus a little wiggle room
        threshold      = this.options.threshold || this.$element.height() + 50,
        magellanNav    = this.$element,
        self           = this;

    if (windowPosition + this.$window.height() === $(document).height()) {
      magellanNav.find('a').removeClass(self.options.activeClass);
      magellanNav.find('a').last().addClass(self.options.activeClass);
      return;
    }
    arrivals.each(function() {
      var arrivalTop = $(this).offset().top - threshold,
          arrivalEnd = arrivalTop + $(this).height();

      if (windowPosition >= arrivalTop && windowPosition <= arrivalEnd) {
        magellanNav.find('a').removeClass(self.options.activeClass);

        // this feature causes a bit of jumpiness
        // window.location.hash = $(this).attr('id');
        // find the corresponding hash/id of the section
        var activeTarget = magellanNav.find('a[href=#' + $(this).attr('id') +']');
        activeTarget.addClass(self.options.activeClass);
      }
    })
  };

  Foundation.plugin(Magellan);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Magellan;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Magellan;
    });

}(Foundation, jQuery);

!function(Foundation, $) {
  'use strict';

  // The plugin matches the plugin classes with these plugin instances.
  var menubarPlugins = {
    dropdown: {
      cssClass: 'dropdown',
      plugin: Foundation._plugins['dropdown-menu'] || null
    },
    drilldown: {
      cssClass: 'drilldown',
      plugin: Foundation._plugins['drilldown'] || null
    },
    accordion: {
      cssClass: 'accordion-menu',
      plugin: Foundation._plugins['accordion-menu'] || null
    }
  }

  // [PH] Media queries
  var phMedia = {
    small: '(min-width: 0px)',
    medium: '(min-width: 640px)'
  }

  /**
   * Creates a new instance of a responsive menu.
   * @class
   * @fires MenuBar#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function MenuBar(element) {
    this.$element = $(element);
    this.rules = this.$element.data('menu-bar');
    this.currentMq = null;
    this.currentPlugin = null;

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event MenuBar#init
     */
     this.$element.trigger('init.zf.menubar');
  }

  MenuBar.defaults = {};

  /**
   * Initializes the menu bar by parsing the classes from the 'data-menubar' attribute on the element.
   * @function
   * @private
   */
  MenuBar.prototype._init = function() {
    var rulesTree = {};

    // Parse rules from "classes" in data attribute
    var rules = this.rules.split(' ');

    // Iterate through every rule found
    for (var i = 0; i < rules.length; i++) {
      var rule = rules[i].split('-');
      var ruleSize = rule.length > 1 ? rule[0] : 'small';
      var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

      if (menubarPlugins[rulePlugin] !== null) {
        rulesTree[ruleSize] = menubarPlugins[rulePlugin];
      }
    }

    this.rules = rulesTree;

    if (!$.isEmptyObject(rulesTree)) {
      this._checkMediaQueries();
    }
  };

  /**
   * Initializes events for the menu bar.
   * @function
   * @private
   */
  MenuBar.prototype._events = function() {
    var _this = this;

    $(window).on('resize.zf.menubar', function() {
      _this._checkMediaQueries();
    });
  };

  /**
   * Checks the current screen width against available media queries. If the media query has changed, and the plugin needed has changed, the plugins will swap out.
   * @function
   * @private
   */
  MenuBar.prototype._checkMediaQueries = function() {
    var matchedMq, _this = this;

    // Iterate through each rule and find the last matching rule
    $.each(this.rules, function(key, value) {
      if (window.matchMedia(phMedia[key]).matches && key !== _this.currentMq) {
        matchedMq = key;
      }
    });

    // No match? No dice
    if (!matchedMq) return;

    // Plugin already initialized? We good
    if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;

    // Remove existing plugin-specific CSS classes
    $.each(menubarPlugins, function(key, value) {
      _this.$element.removeClass(value.cssClass);
    });

    // Add the CSS class for the new plugin
    this.$element.addClass(this.rules[matchedMq].cssClass);

    // Create an instance of the new plugin
    if (this.currentPlugin) this.currentPlugin.destroy();
    this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
  }

  /**
   * Destroys the instance of the current plugin on this element, as well as the window resize handler that switches the plugins out.
   * @function
   */
  MenuBar.prototype.destroy = function() {
    this.currentPlugin.destroy();
    $(window).off('.zf.menubar');
  }
  // MenuBar.prototype.DropdownMenu = Foundation.DropdownMenu;
  Foundation.plugin(MenuBar);

}(Foundation, jQuery)

!function($, Foundation) {

'use strict';

/**
 * Creates a new instance of an off-canvas wrapper.
 * @class
 * @fires OffCanvas#init
 * @param {Object} element - jQuery object to initialize.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function OffCanvas(element) {
  this.$element = element;
  this.options = $.extend({}, OffCanvas.defaults, this.$element.data());
  this.$lastTrigger = $();

  this._init();
  this._events();

  /**
   * Fires when the plugin has been successfully initialized.
   * @event OffCanvas#init
   */
  this.$element.trigger('init.zf.offcanvas');
}

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @example true
   */
  closeOnClick: true,

  position: 'left'
}

/**
 * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
 * @function
 * @private
 */
OffCanvas.prototype._init = function() {
  var id = this.$element.attr('id');

  this.$element.attr('aria-hidden', 'true');

  // Find triggers that affect this element and add aria-expanded to them
  $(document)
    .find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]')
    .attr('aria-expanded', 'false');

  // Add a close trigger over the body if necessary
  if (this.options.closeOnClick && !$('.js-off-canvas-exit').length) {
    var exiter = document.createElement('div');
    exiter.setAttribute('class', 'js-off-canvas-exit');
    $('[data-off-canvas-content]').append(exiter);

    this.$exiter = $(exiter);
  }
}

/**
 * Adds event handlers to the off-canvas wrapper and the exit overlay.
 * @function
 * @private
 */
OffCanvas.prototype._events = function() {
  this.$element.on({
    'open.zf.trigger': this.open.bind(this),
    'close.zf.trigger': this.close.bind(this),
    'toggle.zf.trigger': this.toggle.bind(this),
    'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
  });

  $(window).on('close.zf.offcanvas', this.close.bind(this));

  if (this.$exiter) {
    this.$exiter.on('click.zf.offcanvas', function() {
      $(window).trigger('close.zf.offcanvas');
    });
  }
}

/**
 * Opens the off-canvas menu.
 * @function
 * @fires OffCanvas#opened
 */
OffCanvas.prototype.open = function(event, trigger) {
  if (this.$element.hasClass('is-open')) return;

  var _this = this;

  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#opened
   */
  requestAnimationFrame(function() {
    $('body').addClass('is-off-canvas-open is-open-'+_this.options.position);

    _this.$element
      .addClass('is-open')
      .attr('aria-hidden', 'false')
      .find('a, button').eq(0).focus().end().end()
      .trigger('opened.zf.offcanvas');
  });

  if (trigger) {
    this.$lastTrigger = trigger.attr('aria-expanded', 'true');
  }
}

/**
 * Closes the off-canvas menu.
 * @function
 * @fires OffCanvas#closed
 */
OffCanvas.prototype.close = function() {
  if (!this.$element.hasClass('is-open')) return;

  var _this = this;

  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#closed
   */
  requestAnimationFrame(function() {
    $('body').removeClass('is-off-canvas-open is-open-'+_this.options.position);

    _this.$element
      .removeClass('is-open')
      .attr('aria-hidden', 'true')
      .trigger('closed.zf.offcanvas');
  });

  this.$lastTrigger.attr('aria-expanded', 'false');
}

/**
 * Toggles the off-canvas menu open or closed.
 * @function
 */
OffCanvas.prototype.toggle = function(event, trigger) {
  if (this.$element.hasClass('is-open')) {
    this.close(event, trigger);
  }
  else {
    this.open(event, trigger);
  }
}

/**
 * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
 * @function
 * @private
 */
OffCanvas.prototype._handleKeyboard = function(event) {
  if (event.which !== 27) return;

  event.stopPropagation();
  event.preventDefault();
  this.close();
  this.$lastTrigger.focus();
}

Foundation.plugin(OffCanvas);

}(jQuery, Foundation)

!function($, Foundation){
  'use strict';
  function Orbit(element){
    this.$element = element;
    this.options = $.extend({}, Orbit.defaults, this.$element.data());

    this._init();
  }
  Orbit.defaults = {
    bullets: true,
    navButtons: true,
    animation: 'slide',
    timer: true,
    timerDelay: 5000,
    animationSpeed: 500,
    infiniteWrap: true,
    // swipe: true,
    slideNumber: true,
    pauseOnHover: true,
    nextOnClick: true,
    expandOnClick: false

  };
  Orbit.prototype._init = function(){
    // console.log(this.$element.find('li').not('.active'));
    this.$element.find('li').not('.active').hide();
    this._events();
  };
  Orbit.prototype._events = function(){
    var _this = this;
    var controls = this.$element.find('.orbit-control');
    var curSlide;
    controls.on('click', function(){
      curSlide = _this.$element.find('li.active');
      // console.log(this);
      if($(this).hasClass('orbit-next')){
        // curSlide = _this.$element.find('li.active');
        // console.log(slide.offset());
        Foundation.Motion.animateOut(curSlide, 'slideOutLeft', function(){
          console.log('animation away');
        });
        Foundation.Motion.animateIn(curSlide.next(), 'slideInRight', function(){
          console.log('animating yo');
        });
        // slide.removeClass('active').next().offset({
        //   'top': slide.offset().top,
        //   'left': slide.offset().left + slide.outerWidth()
        // }).addClass('active');
      }
      // else{
      //   Foundation.Motion.animateOut(curSlide, 'slideOutRight', function(){
      //     console.log('');
      //   });
      //   Foundation.Motion.animateIn(curSlide.prev(), 'slideInLeft', function(){
      //
      //   });
      // }
    })
    // controls.each(function(){
    //   var $this = this;
    //   this.on('click.zf.orbit', function(){
    //     if($this.hasClass('orbit-next')){
    //       console.log(_this.$element.find('li.active').next());
    //     }
    //   })
    // })
  };
  Orbit.prototype.registerBullets = function(){

  };

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  Foundation.plugin(Orbit);
}(jQuery, window.Foundation);

!function($, Foundation){
  'use strict';

  function Slider(element){
    this.$element = element;
    this.options = $.extend({}, Slider.defaults, this.$element.data());

    this._init();
  }

  Slider.defaults = {
    start: 0,
    end: 100,
    // min: start,
    // max: end,
    step: 1,
    initialStart: null,
    initialEnd: null,
    binding: false,
    clickSelect: true,
    vertical: false,
    draggable: true,
    disabled: false,
    // positions: [],
    doubleSided: false,
    steps: 100,
    decimal: 2,
    dragDelay: 0
  };

  Slider.prototype._init = function(){
    var handles = this.$element.find('[data-slider-handle]'),
        inputs = this.$element.find('input'),
        _this = this,
        ariaId;

    this.options.vertical = this.$element.hasClass('vertical');
    this.options.disabled = this.$element.hasClass('disabled');
    this.options.steps = (this.options.end - this.options.start) / this.options.step;

    this.$fill = this.$element.find('.slider-fill');
    this.$handle = $(handles[0]);
    this.$input = inputs[0] ? $(inputs[0]) : $('#' + this.$handle.attr('aria-controls'));

    ariaId = this.$input.hasAttr('id') ? this.$input.attr('id') : randomIdGen(6);
    this.$handle.attr(this._setHandleAttr(ariaId));
    this.$input.attr(this._setInputAttr(ariaId));
    this.handlePos = percent((this.options.initialStart ? this.options.initialStart : this.options.start), this.options.end, this.options.decimal) + '%';
    // console.log(this.handlePos);

    this._events(this.$handle);
    if(handles[1]){
      this.$handle2 = $(handles[1]);
      this.$input2 = inputs[1] ? $(inputs[1]) : $('#' + this.$handle2.attr('aria-controls'));
      var ariaId2 = this.$input2.hasAttr('id') ? this.$input2.attr('id') : randomIdGen(6);
      var handleId2 = this.$handle2.hasAttr('id') ? this.$handle2.attr('id') : randomIdGen(6);
      this.options.doubleSided = true;
      this.$handle2.attr(this._setHandleAttr(ariaId2, true));
      this.$input2.attr(this._setInputAttr(ariaId2, true));
      this.handle2Pos = percent((this.options.initialEnd ? this.options.initialEnd : this.options.end), this.options.end, this.options.decimal) + '%';
      this._events(this.$handle2);
    }
    this._setFill(null, null, true);
  };

  Slider.prototype._setInputAttr = function(id, second){
    return {
      'value': second ? (this.options.initialEnd || this.options.end) : (this.options.initialStart || this.options.start),
      'id': id
    };
  };

  Slider.prototype._setHandleAttr = function(id, second, handleId){
    return {
      'id': handleId,
      'role': 'slider',
      'aria-controls': id,
      'aria-valuemax': this.options.end,
      'aria-valuemin': this.options.start,
      'aria-valuenow': second ? (this.options.initialEnd || this.options.end) : (this.options.initialStart || this.options.start),
      'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal'
    };
  };

  Slider.prototype._events = function($handle){
    if(this.options.disabled){ return false; }
    var _this = this,
        $body = $('body'),
        curHandle,
        timer;
    $(window).on('resize.zf.slider', function(){
      setTimeout(function(){
        _this._resetHandles();
      }, 300)
    });
    if(this.options.clickSelect){
      this.$element.off('click.zf.slider').on('click.zf.slider', function(e){
        if(_this.$element.data('dragging')){ return false; }
        _this._handleEvent(e);
      });
    }
    $handle.on('transitionend.zf.slider', function(){
      console.log('something');
      _this.$element.attr('data-dragging', false);
      _this.$fill.removeClass('dragging');
      console.log('something else');
      $handle.removeClass('dragging');
    });

    if(this.options.draggable){
      $handle
        .off('mousedown.zf.slider touchstart.zf.slider')
        .on('mousedown.zf.slider touchstart.zf.slider', function(e){
          $handle.addClass('dragging');
          _this.$fill.addClass('dragging');
          _this.$element.attr('data-dragging', true);
          curHandle = $(e.currentTarget);

          $body.on('mousemove.zf.slider touchmove.zf.slider', function(e){
            timer = setTimeout(function(){
              _this._handleEvent(e, curHandle);
            }, _this.options.dragDelay);
          }).on('mouseup.zf.slider touchend.zf.slider', function(e){
            _this._handleEvent(e, curHandle);
            clearTimeout(timer);
            // Foundation.reflow(_this.$element, 'slider');
            $body.off('mousemove.zf.slider touchmove.zf.slider mouseup.zf.slider touchend.zf.slider');
          })
      });
    }

  };
  Slider.prototype._handleEvent = function(event, $handle){
    event.preventDefault();
    var _this = this,
        vertical = this.options.vertical,
        param = vertical ? 'outerHeight' : 'outerWidth',
        direction = vertical ? 'top' : 'left',
        pageXY = vertical ? event.pageY : event.pageX,
        barXY = Math.abs(this.$element.offset()[direction] -  pageXY),
        eleDim = this.$element[param](),
        offsetPct = percent(barXY, eleDim, this.options.decimal),
        pxByPct = eleDim * (offsetPct / 100),
        pxByStep = (eleDim - this.$handle[param]()) / this.options.steps,
        attemptedSteps = Math.round((pxByPct / pxByStep)),
        steps = attemptedSteps > this.options.steps ? this.options.steps : attemptedSteps < 0 ? 0 : attemptedSteps,
        stepsPx = Math.round(steps * pxByStep),
        curHandle,
        translate;

    if(!$handle){
      if(this.options.doubleSided){
        var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
            secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
            curHandle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;

      }else{
        curHandle = this.$handle;
      }

    }else{
      curHandle = $handle;
    }
    this.setHandle(stepsPx, curHandle, vertical)
    this._setFill(steps, stepsPx);
    this.setVal(steps);
  };
  Slider.prototype.setVal = function(steps){
    this.$input.val(Math.round(steps / this.options.steps * this.options.end));
  };
  Slider.prototype.setHandle = function(translatePx, $handle, vertical, steps, cb){
    var pct = percent(translatePx, vertical ? $handle.outerHeight() : $handle.outerWidth(), this.options.decimal) + '%';
    var translate = vertical ? '-50%, ' + pct : pct + ', -50%';

    $handle.css('transform', 'translate(' + translate + ')');
  };
  Slider.prototype._resetHandles = function(){
    if(this.options.doubleSided){
    console.log(this.handlePos, this.handle2Pos);
      //move both
    }
    var left = (this.$fill.offset().left + this.$fill.width()) - (this.$handle.outerWidth() / 2);
  };
  Slider.prototype._setFill = function(steps, px, isInit){
    var vertical = this.options.vertical;
    var param = vertical ? 'outerHeight' : 'outerWidth';
    var dir = vertical ? 'top' : 'left';
    var max = vertical ? 'max-height' : 'max-width';
    var dim = vertical ? 'height' : 'width';
    var css = {};
    var dimPct;
    if(isInit){
      if(!this.options.doubleSided){
        css[max] = this.handlePos;
        css[dim] = this.handlePos;
      }else{
        css[max] = this.handle2Pos;
        css[dim] = ((this.handle2Pos.split('%')[0] * 1) - (this.handlePos.split('%')[0] * 1)) + '%';
        css[dir] = this.handlePos;
        console.log(css[dim]);
      }
      this.$fill.css(css);
      return;
    }
    if(!this.options.doubleSided){
      dimPct = percent(steps, this.options.steps, this.options.decimal) + '%';
      css[max] = dimPct; css[dim] = dimPct;
      this.handlePos = dimPct;
    }else{
      var isFirstHndl = Math.abs(px - this.$handle.position()[dir]) < Math.abs(px - this.$handle2.position()[dir]);
      var half = this.$handle[param]() / 2;

      if(isFirstHndl){
        //change offset left/top
        dimPct = percent(((this.$handle2.position()[dir] + half) - px), this.$element[param](), this.options.decimal) + '%';
        css[dir] = percent((px + half), this.$element[param](), this.options.decimal) + '%';
        css[max] = dimPct; css[dim] = dimPct;

      }else{
        // change max width/height
        dimPct = percent(((-this.$handle.position()[dir] + half) + px), this.$element[param](), this.options.decimal) + '%';
        css[dir] = percent(this.$handle.position()[dir] + half, this.$element.outerWidth(), this.options.decimal) + '%';
        css[max] = dimPct; css[dim] = dimPct;
      }
      this.handlePos = css[dir];
      this.handle2Pos = css[max];
    }
    this.$fill.css(css);
  };
  Slider.prototype.calculateValue = function(steps, $input){
    // var val = Math.round((location / this.$element.outerWidth()) * this.options.end);
    // this.$input.val(val);
  };

  Foundation.plugin(Slider);

  function absPosition($handle, dir, clickPos, param){
    return Math.abs(($handle.position()[dir] + ($handle[param]() / 2)) - clickPos);
  }

  function percent(frac, num, dec){
    return Number(((frac / num) * 100).toFixed(dec));
  }

  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  $.fn.hasAttr = function(name) {
     return this.attr(name) !== undefined;
  };
}(jQuery, window.Foundation);

//*********this is in case we go to static, absolute positions instead of dynamic positioning********
// this.setSteps(function(){
//   _this._events();
//   var initStart = _this.options.positions[_this.options.initialStart - 1] || null;
//   var initEnd = _this.options.initialEnd ? _this.options.position[_this.options.initialEnd - 1] : null;
//   if(initStart || initEnd){
//     _this._handleEvent(initStart, initEnd);
//   }
// });

//***********the other part of absolute positions*************
// Slider.prototype.setSteps = function(cb){
//   var posChange = this.$element.outerWidth() / this.options.steps;
//   var counter = 0
//   while(counter < this.options.steps){
//     if(counter){
//       this.options.positions.push(this.options.positions[counter - 1] + posChange);
//     }else{
//       this.options.positions.push(posChange);
//     }
//     counter++;
//   }
//   cb();
// };

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Reveal.
   * @class
   * @fires Reveal#init
   * @param {Object} element - jQuery object to use for the modal.
   */

  function Reveal(element) {
    this.$element = element;
    this.options = $.extend({}, Reveal.defaults, this.$element.data());
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Reveal#init
     */
    this.$element.trigger('init.zf.reveal');
  }

  Reveal.defaults = {
    animationIn: '',
    animationOut: '',
    showDelay: 0,
    hideDelay: 0,
    closeOnClick: true,
    closeOnEsc: true,
    multiOpened: false,
    vOffset: 100,
    hOffset: 0,
    fullScreen: false,
    btmOffsetPct: 10,
    overlay: true,
    keyboardAccess: true
  };

  /**
   * Initializes the modal by adding the overlay and close buttons, (if selected).
   * @private
   */
  Reveal.prototype._init = function(){
    var anchorId = Foundation.GetYoDigits(6, 'reveal');

    this.id = this.$element.attr('id');

    this.$anchor = $('[data-open="' + this.id + '"]').length ? $('[data-open="' + this.id + '"]') : $('[data-toggle="' + this.id + '"]');
    this.$anchor.attr({
      // 'data-close': this.id,
      'aria-controls': this.id,
      'id': anchorId,
      'aria-haspopup': true,
      'tabindex': this.options.keyboardAccess ? 0 : -1
    });
    this.options.fullScreen = this.$element.hasClass('full');
    if(this.options.fullScreen){
      this.options.overlay = false;
    }
    if(this.options.overlay){
      this.$overlay = this._makeOverlay(this.id);
    }

    this.$element.attr({
        'role': 'dialog',
        'aria-hidden': true,
        'aria-labelledby': anchorId,
        'data-yeti-box': this.id,
        'data-resize': this.id
    });


    this.options.height = this.$element.outerHeight();
    this.options.width = this.$element.outerWidth();

    this._events();
  };

  /**
   * Creates an overlay div to display behind the modal.
   * @private
   */
  Reveal.prototype._makeOverlay = function(id){
    var $overlay = $('<div></div>')
                    .addClass('reveal-overlay')
                    .attr({'tabindex': -1, 'aria-hidden': true})
                    .appendTo('body');
    if(this.options.closeOnClick){
      $overlay.attr({
        'data-close': id
      });
    }
    return $overlay;
  };

  /**
   * Adds event handlers for the modal.
   * @private
   */
  Reveal.prototype._events = function(){
    var _this = this;

    this.$element.on({
      'open.zf.trigger': this._open.bind(this),
      'close.zf.trigger': this._close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': function(){
        if(_this.$element.is(':visible')){
          _this._setPosition(function(){});
        }
      }
    });

    if(this.options.keyboardAccess){
      this.$anchor.on('keydown.zf.reveal', function(e){
        if(e.which === 13 || e.which === 32){
          e.stopPropagation();
          e.preventDefault();
          _this._open();
        }
      });
    }

    if(this.options.closeOnClick && this.options.overlay){
      this.$overlay.on('click.zf.reveal', this._close.bind(this));
    }
  };
  /**
   * Sets the position of the modal before opening
   * @param {Function} cb - a callback function to execute when positioning is complete.
   * @private
   */
  Reveal.prototype._setPosition = function(cb){
    var eleDims = Foundation.GetDimensions(this.$element);
    var elePos = this.options.fullScreen ? 'reveal full' : (eleDims.height >= (0.5 * eleDims.windowDims.height)) ? 'reveal' : 'center';

    if(elePos === 'reveal full'){
      //set to full height/width
      this.$element
          .offset(Foundation.GetOffsets(this.$element, null, elePos, this.options.vOffset))
          .css({
            'height': eleDims.windowDims.height,
            'width': eleDims.windowDims.width
          });
    }else if(!Foundation.MediaQuery.atLeast('medium')){
      //if smaller than medium, resize to 100% width minus any custom L/R margin
      this.$element
          .css({
            'width': eleDims.windowDims.width - (this.options.hOffset * 2)
          })
          .offset(Foundation.GetOffsets(this.$element, null, 'center', this.options.vOffset, this.options.hOffset));
      //flag a boolean so we can reset the size after the element is closed.
      this.changedSize = true;
    }else{
      this.$element
          .offset(Foundation.GetOffsets(this.$element, null, elePos, this.options.vOffset))
          //the max height based on a percentage of vertical offset plus vertical offset
          .css({
            'max-height': eleDims.windowDims.height - (this.options.vOffset * (this.options.btmOffsetPct / 100 + 1))
          });
    }

    cb();
  };

  /**
   * Opens the modal controlled by `this.$anchor`, and closes all others by default.
   * @fires Reveal#closeAll
   * @fires Reveal#open
   */
  Reveal.prototype._open = function(){
    var _this = this;
    this.isActive = true;
    //make element invisible, but remove display: none so we can get size and positioning
    this.$element
        .css({'visibility': 'hidden'})
        .show()
        .scrollTop(0);

    this._setPosition(function(){
      _this.$element.hide()
                   .css({'visibility': ''});
      if(!_this.options.multiOpened){
        /**
         * Fires immediately before the modal opens.
         * Closes any other modals that are currently open
         * @event Reveal#closeAll
         */
        _this.$element.trigger('closeme.zf.reveal', _this.id);
      }
      if(_this.options.animationIn){
        if(_this.options.overlay){
          Foundation.Motion.animateIn(_this.$overlay, 'fadeIn', function(){
            Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
            });
          });
        }else{
          Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function(){
          });
        }
      }else{
        if(_this.options.overlay){
          _this.$overlay.show(0, function(){
            _this.$element.show(_this.options.showDelay, function(){
            });
          });
        }else{
          _this.$element.show(_this.options.showDelay, function(){
          });
        }
      }
    });
    this.$element.attr({'aria-hidden': false})
    /**
     * Fires when the modal has successfully opened.
     * @event Reveal#open
     */
                 .trigger('open.zf.reveal');

    $('body').addClass('is-reveal-open')
             .attr({'aria-hidden': (this.options.overlay || this.options.fullScreen) ? true : false});
    setTimeout(function(){
      _this._extraHandlers();
      Foundation.reflow();
    }, 0);
  };

  /**
   * Adds extra event handlers for the body and window if necessary.
   * @private
   */
  Reveal.prototype._extraHandlers = function(){
    var _this = this;
    if(!this.options.overlay && this.options.closeOnClick){
      this.$element.on('click.zf.reveal', function(e){
        // e.preventDefault();
        return false;
      });
      $('body').on('click.zf.reveal', function(e){
          _this._close();
      });
    }
    if(this.options.closeOnEsc){
      $(window).on('keyup.zf.reveal', function(e){
        e.preventDefault();
        e.stopPropagation();
        if(e.which === 27){
          _this._close();
        }
      });
    }
  };

  /**
   * Closes the modal
   * @fires Reveal#close
   */
  Reveal.prototype._close = function(){
    if(!this.isActive){
      return false;
    }
    var _this = this;

    if(this.options.animationOut){
      Foundation.Motion.animateOut(this.$element, this.options.animationOut, function(){
        if(_this.options.overlay){
          Foundation.Motion.animateOut(_this.$overlay, 'fadeOut', function(){
          });
        }
      });
    }else{
      this.$element.hide(_this.options.hideDelay, function(){
        if(_this.options.overlay){
          _this.$overlay.hide(0, function(){
          });
        }
      });
    }
    //conditionals to remove extra event listeners added on open
    if(this.options.closeOnEsc){
      $(window).off('keyup.zf.reveal');
    }
    if(!this.options.overlay && this.options.closeOnClick){
      $('body').off('click.zf.reveal');
    }
    //if the modal changed size, reset it
    if(this.changedSize){
      this.$element.css({
        'height': this.options.height,
        'width': this.options.width
      });
    }

    $('body').removeClass('is-reveal-open').attr({'aria-hidden': false});

    this.isActive = false;
    this.$element.attr({'aria-hidden': true})
    /**
     * Fires when the modal is done closing.
     * @event Reveal#close
     */
                 .trigger('close.zf.reveal');
  };

  Reveal.prototype.toggle = function(){
    if(this.isActive){
      this._close();
    }else{
      this._open();
    }
  };

  /**
   * Destroys an instance of a modal.
   * @fires Reveal#destroyed
   */
  Reveal.prototype.destroy = function() {
    if(this.options.overlay){
      this.$overlay.hide().off();
    }
    this.$element.hide();
    this.$anchor.off();

    /**
     * Fires when the plugin has been destroyed.
     * @event Reveal#destroyed
     */
    this.$element.trigger('destroyed.zf.reveal');
  }

  Foundation.plugin(Reveal);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Reveal;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Reveal;
    });

}(Foundation, jQuery);

!function($, Foundation, window){
  'use strict';

  /**
   * Creates a new instance of a sticky thing.
   * @class
   * @fires Sticky#init
   * @param {jQuery} element - jQuery object to make sticky.
   */
  function Sticky(element){
    this.$element = element;
    this.options = $.extend({}, Sticky.defaults, this.$element.data());
    if(Foundation.MediaQuery.atLeast(this.options.stickyOn)){
      this._init();
    }

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Sticky#init
     */
    this.$element.trigger('init.zf.sticky');
  }


  Sticky.defaults = {
    stickToWindow: false,
    container: '<div></div>',
    stickTo: 'top',
    breakAt: '',
    stickAt: '',
    debounce: 150,
    marginTop: 1,
    marginBottom: 1,
    stickyOn: 'medium',
    watchResize: true
  };

  /**
   * Initializes the sticky element by adding classes, getting/setting dimensions, breakpoints and attributes
   * @private
   */
  Sticky.prototype._init = function(){
    var _this = this;

    this.$container = this.$element.parents('[data-sticky-container]').length ? this.$element.parents('[data-sticky-container]') : $(this.options.container);
    this.$element.addClass('sticky');
    // this.$element.wrap(this.$container);
    this.$container.addClass('sticky-container');
    this.$anchor = $(this.options.stickAt).length ? $(this.options.stickAt) : $('body');
    if(this.options.watchResize){
      this.$element.attr('data-resize', Foundation.GetYoDigits(6, 'sticky'));
      // this.$element.data('resize', Foundation.GetYoDigits(6, 'sticky'));
      // console.log($('[data-resize]'));
    }
    this._setSizes();
    // this.setElementAttr();
    // this.getDimensions();
    // this.setContainerSize();
    // this.setBreakPoints();

    this._events();
  };

  /**
   * Adds event handlers for the scrolling element.
   * TODO set this within the Foundation.util.triggers api so there's only one global listener
   * @private
   */
  Sticky.prototype._events = function(){
    var _this = this,
        $window = $(window);
    this.$element.on('resizeme.zf.trigger', this._setSizes.bind(this));

    $window.on('scroll.zf.sticky', function(e){
      e.stopPropagation();
      _this.timer = setTimeout(function(){
        var scroll = $window.scrollTop();

        if(_this.options.stickTo === 'bottom'){
          if((scroll + _this.$anchorDims.windowDims.height >= _this.start) && (scroll + _this.$elemDims.windowDims.height <= _this.end)){//between bottom & top breakpoint
            _this.stickToBottom();
          }

          if(_this.$element.offset().top + _this.$elemDims.height + (_this.options.marginBottom * _this.fontSize) >= _this.end){//hits bottom breakpoint
            _this.$element.removeClass('stuck').addClass('anchored')
            .css({
              'marginBottom': 0,
              'top':(_this.$anchorDims.height  - _this.$elemDims.height)
            });
          }

          if(scroll + _this.$anchorDims.windowDims.height <= _this.start){
            _this.$element.addClass('anchored bottom').removeClass('stuck').css('marginBottom', 0);
          }
        }

        else if(_this.options.stickTo === 'top'){
          if(scroll >= _this.start && scroll <= _this.end){//in between breakpoints, sticky top
            _this.stickToTop()
          }
          if(scroll <= _this.start){//start at page load, + what to do when scrolling to top
            _this.anchorToTop();
          }
          if(scroll >= _this.end){//bottom edge and stop
            _this.anchorToBottom();
                  // console.log('end', _this.end, 'height', _this.$elemDims.height, '\ntotal', (_this.end - _this.$elemDims.height) - 32);
          }
        }

        /**
         * TODO break these different scroll options into separate methods
         * TODO create sticky-at='both' method
         */
        else{//both top & bottom sticky
          //stick to top on scrolldown from top, stick to bottom on scrollup from bottom
        }


      }, _this.options.debounce)
    });
  };
  Sticky.prototype.stickToBottom = function(){
    this.$element.removeClass('anchored').addClass('stuck bottom').css({'marginBottom':this.options.marginBottom + 'em', 'bottom': 0, 'top': 'auto'})
  };
  Sticky.prototype.stickToTop = function(){
    this.$element.addClass('stuck top').removeClass('anchored bottom').css({'marginTop': this.options.marginTop + 'em', 'top': 0});
  };
  Sticky.prototype.anchorToBottom = function(){
    this.$element.removeClass('stuck top')
          .addClass('anchored bottom')
          .css({
            'marginTop': 0,
            'top': this.end - (this.$container.offset().top) + (this.options.marginBottom * this.fontSize) + 'px'
          });
  };
  Sticky.prototype.anchorToTop = function(){
    this.$element.addClass('anchored top').removeClass('stuck bottom').css({'margin-top': 0});
  };
  //*********************************************************************
  /**
   * Fires several functions after resize events and on _init
   * @private
   */

  Sticky.prototype._setSizes = function(){
    var _this = this;
    this.setElementAttr(function(){
      _this.getDimensions();
      _this.setContainerSize();
      _this.setBreakPoints();
    });
  };
  /**
   * Sets top and bottom break points for sticky element.
   * @private
   */
  Sticky.prototype.setBreakPoints = function(){
    this.fontSize = parseInt(window.getComputedStyle(document.getElementsByTagName('body')[0], null).fontSize.split('px'), 10);
    this.styles = window.getComputedStyle(this.$element[0], null);
    this.start = this.options.stickTo === 'bottom' ? this.$anchorDims.offset.top + this.$elemDims.height + (this.options.marginBottom * this.fontSize) : this.$anchorDims.offset.top - (this.options.marginTop * this.fontSize);
    // this.start = this.$anchorDims.offset.top - parseFloat(this.styles.marginTop.split('px'));
    this.end = this.options.breakAt ? '' : this.$anchorDims.offset.top + this.$anchorDims.height  - (this.options.marginBottom * this.fontSize) - (this.options.marginTop * this.fontSize) - this.$elemDims.height;
    if(this.options.stickTo === 'bottom'){
      this.end = this.$anchorDims.offset.top + this.$anchorDims.height + (this.options.marginBottom * this.fontSize);
    }
    console.log('start', this.start, 'end', this.end);
  };
  /**
   * Gets the dimensions for the sticky element and it's anchor
   * @private
   */
  Sticky.prototype.getDimensions = function(){
    // this.$element.css({'max-width': '', 'max-height': ''});
    this.$elemDims = Foundation.GetDimensions(this.$element);
    this.$anchorDims = Foundation.GetDimensions(this.$anchor);
  };
  /**
   * Sets the sticky element's max-width to prevent resize on position: fixed;
   * @private
   */
  Sticky.prototype.setElementAttr = function(cb){
    console.log('container width',this.$container.width());
    this.$element.css({'max-width': this.$container.width()});
    cb();
  };
  /**
   * Sets the sticky element's container min-height to match that of the element's height to prevent alignment issues on position: fixed;
   * @private
   */
  Sticky.prototype.setContainerSize = function(){
    this.$container.css({'min-height': this.$elemDims.height});
  };
  //*********************************************************************
  Foundation.plugin(Sticky);
}(jQuery, window.Foundation, window);

!function($, Foundation) {

'use strict';

/**
 * Creates a new instance of Tab Bar.
 * @class
 * @fires TabBar#init
 * @param {jQuery} element - jQuery object to attach tab bar functionality to.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function TabBar(element, options) {
  this.$element = $(element);
  this.options = $.extend({}, TabBar.defaults, options);

  this._init();
  this._events();

  /**
   * Fires when the plugin has been successfully initialized.
   * @event TabBar#init
   */
  this.$element.trigger('init.zf.tabbar');
}

TabBar.defaults = {
  /**
   * The breakpoint after which the menu is always shown, and the tab bar is hidden.
   * @option
   * @example 'medium'
   */
  hideFor: 'medium'
}

/**
 * Initializes the tab bar by finding the target element, toggling element, and running update().
 * @function
 * @private
 */
TabBar.prototype._init = function() {
  var targetID = this.$element.data('tab-bar');
  if (!targetID) {
    console.error('Your tab bar needs an ID of a menu bar as the value of data-tab-bar.');
  }

  this.$targetMenu = $('#'+targetID);
  this.$toggler = this.$element.find('[data-toggle]');

  this._update();
}

/**
 * Adds necessary event handlers for the tab bar to work.
 * @function
 * @private
 */
TabBar.prototype._events = function() {
  var _this = this;

  $(window).on('changed.zf.mediaquery', this._update.bind(this));

  this.$toggler.on('click.zf.tabbar', this.toggleMenu.bind(this));
}

/**
 * Checks the current media query to determine if the tab bar should be visible or hidden.
 * @function
 * @private
 */
TabBar.prototype._update = function() {
  debugger;
  // Mobile
  if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
    this.$element.show();
    this.$targetMenu.hide();
  }

  // Desktop
  else {
    this.$element.hide();
    this.$targetMenu.show();
  }
}

/**
 * Toggles the element attached to the tab bar. The toggle only happens if the screen is small enough to allow it.
 * @function
 * @fires TabBar#toggled
 */
TabBar.prototype.toggleMenu = function() {
  if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
    this.$targetMenu.toggle(0);

    /**
     * Fires when the element attached to the tab bar toggles.
     * @event TabBar#toggled
     */
    this.$element.trigger('toggled.zf.tabbar');
  }
}

Foundation.plugin(TabBar);

}(jQuery, Foundation)
!function($, Foundation) {
  'use strict';

  /**
   * Creates a new instance of tabs.
   * @class
   * @fires Tabs#init
   * @param {jQuery} element - jQuery object to make into tabs.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Tabs(element){
    this.$element = element;
    this.options = $.extend({}, Tabs.defaults, this.$element.data());

    this._init();
    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Tabs#init
     */
    this.$element.trigger('init.zf.tabs');
  }

  Tabs.defaults = {
    deepLinking: false,
    scrollToContent: false,
    autoFocus: true,
    wrapOnKeys: true
  };

  /**
   * Initializes the tabs by showing and focusing (if autoFocus=true) the preset active tab.
   * @private
   */
  Tabs.prototype._init = function(){
    var _this = this,
        tabIndex = 1;
    this.$tabTitles = this.$element.find('.tabs-title');

    this.$tabTitles.each(function(){
      var $link = $(this).find('a'),
          isActive = $(this).hasClass('is-active'),
          hash = $link.attr('href').slice(1),
          linkId = hash + '-label',
          $tabContent = $(hash);

      $(this).attr({'role': 'presentation'});

      $link.attr({
        'role': 'tab',
        'aria-controls': hash,
        'tabindex': $link.attr('tabindex') || tabIndex,
        'aria-selected': isActive,
        'id': linkId
      });

      $tabContent.attr({
        'role': 'tabpanel',
        'aria-hidden': !isActive,
        'aria-labelledby': linkId
      });

      if(isActive && _this.options.autoFocus){
        $link.focus();
      }
      tabIndex++
    });
    _this._events();
  };
  /**
   * Adds event handlers for items within the tabs.
   * @private
   */
   Tabs.prototype._events = function(){
    this._addKeyupHandler();
    this._addClickHandler();
  };

  /**
   * Adds click handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addClickHandler = function(){
    var _this = this;
    this.$tabTitles.on('click.zf.tabs', function(e){
      e.preventDefault();
      e.stopPropagation();
      if($(this).hasClass('is-active')){
        return;
      }
      _this._handleTabChange($(this));
    });
  };

  /**
   * Adds keyboard event handlers for items within the tabs.
   * @private
   */
  Tabs.prototype._addKeyupHandler = function(){
    var _this = this;
    var $firstTab = _this.$element.find('li:first-of-type');
    var $lastTab = _this.$element.find('li:last-of-type');

    this.$tabTitles.on('keyup.zf.tabs', function(e){
      e.stopPropagation();
      e.preventDefault();
      var $tabTitle = $(this),
          $prev = $tabTitle.prev(),
          $next = $tabTitle.next();
      if(checkClass($prev) || checkClass($next)){
        return;
      }
      if(_this.options.wrapOnKeys){
        $prev = $prev.length ? $prev : $lastTab;
        $next = $next.length ? $next : $firstTab;
        if(checkClass($prev) || checkClass($next)){
          return;
        }
      }

      switch (e.which) {

        case 32://return or spacebar
        case 13:
          $tabTitle.focus();
          _this._handleTabChange($tabTitle);
          break;

        case 37://left or up
        case 38:
          if(checkClass($prev)){ return; }
          $prev.focus();
          _this._handleTabChange($prev)
          break;

        case 39://right or down
        case 40:
          if(checkClass($next)){ return; }
          $next.focus();
          _this._handleTabChange($next)
          break;

        default:
          return;
      }
    });
  };

  function checkClass($elem){
    return $elem.hasClass('is-active');
  }

  /**
   * Opens the tab `$targetContent` defined by `$target`.
   * @param {jQuery} $target - Tab to open.
   * @param {jQuery} $targetContent - Content pane to open.
   * @fires Tabs#change
   */
  Tabs.prototype._handleTabChange = function($target){
    var $tabLink = $target.find('[role="tab"]'),
        hash = $tabLink.attr('href'),
        $targetContent = $(hash),

        $oldTab = this.$element.find('.tabs-title.is-active')
                  .removeClass('is-active').find('[role="tab"]')
                  .attr({'aria-selected': 'false'}).attr('href');

    $($oldTab).removeClass('is-active').attr({'aria-hidden': 'true'});

    $target.addClass('is-active');

    $tabLink.attr({'aria-selected': 'true'});

    $targetContent
      .addClass('is-active')
      .attr({'aria-hidden': 'false'});

    /**
     * Fires when the plugin has successfully changed tabs.
     * @event Tabs#change
     */
    this.$element.trigger('change.zf.tabs', [$target]);
    // console.log(this.$element.find('.tabs-title, .tabs-panel'));
    Foundation.reflow(this.$element, 'tabs');
  };

  /**
   * Destroys an instance of an tabs.
   * @fires Tabs#destroyed
   */
  Tabs.prototype.destroy = function() {
    this.$element.find('.tabs-title').css('display', 'none').end().find('.tabs-panel').css('display', 'none');
    this.$element.find('.tabs-titles').off('click.zf.tabs keyup.zf.tabs');
    this.$element.find('.tabs-titles').off('zf.tabs');

    /**
     * Fires when the plugin has been destroyed.
     * @event Tabs#destroyed
     */
    this.$element.trigger('destroyed.zf.tabs');
  }

  Foundation.plugin(Tabs);
}(jQuery, window.Foundation);

!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Toggler.
   * @class
   * @fires Toggler#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Toggler(element) {
    this.$element = element;
    this.options = $.extend({}, Toggler.defaults, element.data());
    this.className = '';

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Toggler#init
     */
    this.$element.trigger('init.zf.toggler');
  }

  Toggler.defaults = {
    animate: false
  }

  /**
   * Initializes the Toggler plugin by parsing the toggle class from data-toggler, or animation classes from data-animate.
   * @function
   * @private
   */
  Toggler.prototype._init = function() {
    // Parse animation classes if they were set
    if (this.options.animate) {
      var input = this.options.animate.split(' ');

      this.animationIn = input[0];
      this.animationOut = input[1] || null;
    }
    // Otherwise, parse toggle class
    else {
      var input = this.$element.data('toggler');

      // Allow for a . at the beginning of the string
      if (input[0] === '.') {
        this.className = input.slice(1);
      }
      else {
        this.className = input;
      }
    }
  };

  /**
   * Initializes events for the toggle trigger.
   * @function
   * @private
   */
  Toggler.prototype._events = function() {
    var _this = this;

    this.$element.on('toggle.zf.trigger', function() {
      _this.toggle();
      return false;
    });
  };

  /**
   * Toggles the target class on the target element. An event is fired from the original trigger depending on if the resultant state was "on" or "off".
   * @function
   * @fires Toggler#on
   * @fires Toggler#off
   */
  Toggler.prototype.toggle = function() {
    if (!this.options.animate) {
      this._toggleClass();
    }
    else {
      this._toggleAnimate();
    }
  };

  Toggler.prototype._toggleClass = function() {
    this.$element.toggleClass(this.className);

    if (this.$element.hasClass(this.className)) {
      /**
       * Fires if the target element has the class after a toggle.
       * @event Toggler#on
       */
      this.$element.trigger('on.zf.toggler');
    }
    else {
      /**
       * Fires if the target element does not have the class after a toggle.
       * @event Toggler#off
       */
      this.$element.trigger('off.zf.toggler');
    }
  }

  Toggler.prototype._toggleAnimate = function() {
    if (this.$element.is(':hidden')) {
      Foundation.Motion.animateIn(this.$element, this.animationIn, function() {
        this.trigger('on.zf.toggler');
      });
    }
    else {
      Foundation.Motion.animateOut(this.$element, this.animationOut, function() {
        this.trigger('off.zf.toggler');
      });
    }
  }

  /**
   * Destroys the instance of Toggler on the element.
   * @function
   */
  Toggler.prototype.destroy= function() {
    this.$element.off('.zf.toggler');
  };

  Foundation.plugin(Toggler);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Toggler;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Toggler;
    });

}(Foundation, jQuery);

!function($, document, Foundation){
  'use strict';

  /**
   * Creates a new instance of a Tooltip.
   * @class
   * @fires Tooltip#init
   * @param {jQuery} element - jQuery object to attach a tooltip to.
   */
  function Tooltip(element){
    this.$element = element;
    this.options = $.extend({}, Tooltip.defaults, this.$element.data());
    this.isActive = false;
    this.isClick = false;
    this._init();

    /**
     * Fires when the plugin has been successfully initialized
     * @event Tooltip#init
     */
    this.$element.trigger('init.zf.tooltip');
  }

  Tooltip.defaults = {
    disableForTouch: false,
    hoverDelay: 200,
    fadeInDuration: 150,
    fadeOutDuration: 150,
    disableHover: false,
    templateClasses: '',
    tooltipClass: 'tooltip',
    showOn: 'all',
    template: '',
    tipText: '',
    touchCloseText: 'Tap to close.',
    clickOpen: true,
    appendTo: 'body',
    positionClass: '',
    vOffset: 10,
    hOffset: 12
  };

  /**
   * Initializes the tooltip by setting the creating the tip element, adding it's text, setting private variables and setting attributes on the anchor.
   * @private
   */
  Tooltip.prototype._init = function(){
    var elemId = this.$element.attr('aria-describedby') || randomIdGen(6);

    this.options.positionClass = this.getPositionClass(this.$element);
    this.options.tipText = this.$element.attr('title');
    this.template = this.options.template ? $(this.options.template) : this.buildTemplate(elemId);

    this.template.appendTo(this.options.appendTo)
        .text(this.options.tipText)
        .hide();

    this.$element.attr({
      'title': '',
      'aria-describedby': elemId,
      'data-yeti-box': elemId,
      'data-toggle': elemId,
      'data-resize': elemId
    });

    //helper variables to track movement on collisions
    this.usedPositions = [];
    this.counter = 4;
    this.classChanged = false;

    this._events();
  };

  /**
   * Grabs the current positioning class, if present, and returns the value or an empty string.
   * @private
   */
  Tooltip.prototype.getPositionClass = function(element){
    var position = element.attr('class').match(/top|left|right/g);
        position = position ? position[0] : '';
    return position;
  };
  /**
   * builds the tooltip element, adds attributes, and returns the template.
   * @private
   */
  Tooltip.prototype.buildTemplate = function(id){
    var templateClasses = (this.options.tooltipClass + ' ' + this.options.positionClass).trim();
    var $template =  $('<div></div>').addClass(templateClasses).attr({
      'role': 'tooltip',
      'aria-hidden': true,
      'data-is-active': false,
      'data-is-focus': false,
      'id': id
    });
    return $template;
  };

  /**
   * Function that gets called if a collision event is detected.
   * @param {String} position - positioning class to try
   * @private
   */
  Tooltip.prototype.reposition = function(position){
    this.usedPositions.push(position ? position : 'bottom');

    //default, try switching to opposite side
    if(!position && (this.usedPositions.indexOf('top') < 0)){
      this.template.addClass('top');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') < 0)){
      this.template.removeClass(position);
    }else if(position === 'left' && (this.usedPositions.indexOf('right') < 0)){
      this.template.removeClass(position)
          .addClass('right');
    }else if(position === 'right' && (this.usedPositions.indexOf('left') < 0)){
      this.template.removeClass(position)
          .addClass('left');
    }

    //if default change didn't work, try bottom or left first
    else if(!position && (this.usedPositions.indexOf('top') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.template.addClass('left');
    }else if(position === 'top' && (this.usedPositions.indexOf('bottom') > -1) && (this.usedPositions.indexOf('left') < 0)){
      this.template.removeClass(position)
          .addClass('left');
    }else if(position === 'left' && (this.usedPositions.indexOf('right') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.template.removeClass(position);
    }else if(position === 'right' && (this.usedPositions.indexOf('left') > -1) && (this.usedPositions.indexOf('bottom') < 0)){
      this.template.removeClass(position);
    }
    //if nothing cleared, set to bottom
    else{
      this.template.removeClass(position);
    }
    this.classChanged = true;
    this.counter--;

  };

  /**
   * sets the position class of an element and recursively calls itself until there are no more possible positions to attempt, or the tooltip element is no longer colliding.
   * if the tooltip is larger than the screen width, default to full width - any user selected margin
   * @private
   */
  Tooltip.prototype.setPosition = function(){
    var position = this.getPositionClass(this.template),
        $tipDims = Foundation.GetDimensions(this.template),
        $anchorDims = Foundation.GetDimensions(this.$element),
        direction = (position === 'left' ? 'left' : ((position === 'right') ? 'left' : 'top')),
        param = (direction === 'top') ? 'height' : 'width',
        offset = (param === 'height') ? this.options.vOffset : this.options.hOffset,
        _this = this;

    if(($tipDims.width >= $tipDims.windowDims.width) || (!this.counter && !Foundation.ImNotTouchingYou(this.template))){
      this.$element.offset(Foundation.GetOffsets(this.template, this.$element, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
        'width': $eleDims.windowDims.width - (this.options.hOffset * 2),
        'height': 'auto'
      });
      return false;
    }

    this.template.offset(Foundation.GetOffsets(this.template, this.$element,'center ' + (position || 'bottom'), this.options.vOffset, this.options.hOffset));

    while(!Foundation.ImNotTouchingYou(this.template) && this.counter){
      this.reposition(position);
      this.setPosition();
    }
  };

  /**
   * reveals the tooltip, and fires an event to close any other open tooltips on the page
   * @fires Closeme#tooltip
   * @fires Tooltip#show
   * @private
   */
  Tooltip.prototype._show = function(){
    if(this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)){
      console.error('The screen is too small to display this tooltip');
      return false;
    }

    var _this = this;
    this.template.css('visibility', 'hidden').show();
    this.setPosition();

    /**
     * Fires to close all other open tooltips on the page
     * @event Closeme#tooltip
     */
    this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));


    this.template.attr({
      'data-is-active': true,
      'aria-hidden': false
    });
    _this.isActive = true;

    this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function(){
      //maybe do stuff?
    });
    /**
     * Fires when the tooltip is shown
     * @event Tooltip#show
     */
    this.$element.trigger('show.zf.tooltip');
  };

  /**
   * hides the current tooltip, and resets the positioning class if it was changed due to collision
   * @fires Tooltip#hide
   * @private
   */
  Tooltip.prototype._hide = function(){
    var _this = this;
    this.template.stop().attr({
      'aria-hidden': true,
      'data-is-active': false
    }).fadeOut(this.options.fadeOutDuration, function(){
      _this.isActive = false;
      _this.isClick = false;
      if(_this.classChanged){
        _this.template
             .removeClass(_this.getPositionClass(_this.template))
             .addClass(_this.options.positionClass);
      }
    });
    /**
     * fires when the tooltip is hidden
     * @event Tooltip#hide
     */
    this.$element.trigger('hide.zf.tooltip')
  };

  /**
   * adds event listeners for the tooltip and its anchor
   * TODO combine some of the listeners like focus and mouseenter, etc.
   * @private
   */
  Tooltip.prototype._events = function(){
    var _this = this;
    var $template = this.template;
    var isFocus = false;

    if(!this.options.disableHover){

      this.$element
      .on('mouseenter.zf.tooltip', function(e){
        if(!_this.isActive){
          _this.timeout = setTimeout(function(){
            _this._show();
          }, _this.options.hoverDelay);
        }
      })
      .on('mouseleave.zf.tooltip', function(e){
        clearTimeout(_this.timeout);
        if(!isFocus || (!_this.isClick && _this.options.clickOpen)){
          _this._hide();
        }
      });
    }

    if(!this.options.disableForTouch){
      this.$element
      .on('tap.zf.tooltip touchend.zf.tooltip', function(e){
        _this.isActive ? _this._hide() : _this._show();
      });
    }

    this.$element.on({
      'toggle.zf.trigger': this.toggle.bind(this),
      'close.zf.trigger': this._hide.bind(this)
    });

    this.$element
      .on('focus.zf.tooltip', function(e){
        isFocus = true;
        if(_this.isClick){
          return false;
        }else{
          // $(window)
          _this._show();
        }
      })

      .on('focusout.zf.tooltip', function(e){
        isFocus = false;
        _this.isClick = false;
        _this._hide();
      })

      .on('resizeme.zf.trigger', function(){
        _this.setPosition();
      });
  };
  /**
   * adds a toggle method, in addition to the static show() & hide() functions
   * @private
   */
  Tooltip.prototype.toggle = function(){
    if(this.isActive){
      this._hide();
    }else{
      this._show();
    }
  };
  /**
   * TODO use Foundation.GetYoDigits() instead.
   */
  function randomIdGen(length){
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  }

  /**
   * TODO create destroy method
   * TODO utilize resize event trigger
   */

  Foundation.plugin(Tooltip);
}(jQuery, window.document, window.Foundation);
