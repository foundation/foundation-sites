;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.migrate = {
    name : 'migrate',

    version : '1.0.0',

    settings : {
      mute : false,
      warnings: {
        Modernizr : 'Please include Modernizr.',
        IE8: 'IE8 is not supported by Foundation 5+. Please use Foundation 4 or lower.'
      }
    },

    warnings: [],

    init : function (scope, method, options) {
      this.pollyfill();

      for (var warning in this.settings.warnings) {
        if (this.settings.warnings.hasOwnProperty(warning)) {
          this.check(warning);
        }
      }
    },

    // BEGIN LOGIC FOR WARNINGS

    Modernizr : function () {
      return !Modernizr;
    },

    IE8 : function () {
      return $('html').hasClass('lt-ie9');;
    },



    // END LOGIC FOR WARNINGS

    check : function (check) {
      return this[check]() ? this.warn(this.settings.warnings[check]) : false;
    },

    warn : function (output) {
      this.warnings.push(output);
      if (!this.settings.mute) {
        return console.warn(['FOUNDATION MIGRATION:', output].join(' '));
      }
    },

    pollyfill : function () {
      // https://github.com/paulmillr/console-polyfill
      (function (con) {
        'use strict';
        var prop, method;
        var empty = {};
        var dummy = function() {};
        var properties = 'memory'.split(',');
        var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
           'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
           'time,timeEnd,trace,warn').split(',');
        while (prop = properties.pop()) con[prop] = con[prop] || empty;
        while (method = methods.pop()) con[method] = con[method] || dummy;
      })(window.console = window.console || {});
    }
  };
}(jQuery, this, this.document));