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
  queries: {},
  mqNames: [],

  current: function() {
    var mqObj = this.queries;
    var arr   = this.mqNames;

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

  init: function() {
    var self = this;
    var extractedStyles = $('.foundation-mq').css('font-family');
    var namedQueries;
    
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