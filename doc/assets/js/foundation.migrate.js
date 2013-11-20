;(function ($, window, document, undefined) {
  'use strict';

  Foundation.old_init = Foundation.old_init || Foundation.init;
  Foundation.lib_methods.old_bindings = Foundation.lib_methods.old_bindings || Foundation.lib_methods.bindings;

  Foundation.init = function (scope, libraries, method, options, response) {
    if (typeof libraries === 'string' && typeof method === 'object') {
      Foundation.migrate.warn('$(document).foundation(\'plugin\', {mySetting: value}) is now $(document).foundation({plugin: {mySetting: value}})');
    }

    if (typeof libraries === 'string') {
      var libs = libraries.split(' '),
          count = libs.length;

      libraries = {};

      while(count--) {
        var lib = libs[count];

        if (/alerts|tootlips/i.test(lib)) {
          lib = lib.slice(0, - 1);
          Foundation.migrate.warn('"' + lib + 's" has been renamed to "alert" in Foundation 5.');
        }

        if (/sections/i.test(lib)) {
          Foundation.migrate.warn('"section" has been removed and replaced with "tabs" and "accordion" libraries.');
        }

        libraries[libs[count]] = method;
      }
    }

    Foundation.old_init.apply(Foundation, [scope, libraries, method, options, response]);
    if (Foundation.migrate.notified) return;

    if (Foundation.migrate.warnings.length > 1) {
      console.warn('You have ' + Foundation.migrate.warnings.length + ' Foundation migration issues on your page, learn more: http://foundation.zurb.com/docs/upgrading.html');
      Foundation.migrate.notified = true;
    }
  };

  Foundation.lib_methods.bindings = function (method, options) {
    var settings = Foundation.migrate.settings[this.name];

    if (typeof method === 'object') {
      for (var old_setting in method) {
        if (settings.hasOwnProperty(old_setting)) {
          method[settings[old_setting]] = method[old_setting];
          Foundation.migrate.warn('"' + old_setting + '" is now "' + settings[old_setting] + '" in Foundation 5 ' + this.name + '.');
          delete method[old_setting];
        }
      }
    }

    return Foundation.lib_methods.old_bindings.apply(Foundation.libs[this.name], [method, options]);
  };

  Foundation.migrate = {
    name : 'migrate',

    version : '1.0.0',

    settings : {
      mute : false,
      warnings: {
        Modernizr : 'Please include Modernizr.',
        IE8: 'IE8 is not supported by Foundation 5+. Please use Foundation 4 or lower.'
      },
      dropdown : {
        'activeClass' : 'active_class'
      },
      topbar : {
        'stickyClass' : 'sticky_class'
      },
      joyride : {
        'tipLocation' : 'tip_location',
        'nubPosition' : 'nub_position',
        'scrollSpeed' : 'scroll_speed',
        'startTimeOnClick' : 'start_timer_on_click',
        'startOffset' : 'start_offset',
        'nextButton' : 'next_button',
        'tipAnimation' : 'tip_animation',
        'pauseAfter' : 'pause_after',
        'tipAnimationFadeSpeed', 'tip_animation_fade_speed',
        'cookieMonster' : 'cookie_monster',
        'cookieName' : 'cookie_name',
        'cookieDomain' : 'cookie_domain',
        'cookieExpires' : 'cookie_expires',
        'tipContainer' : 'tip_container',
        'postRideCallback' : 'post_ride_callback',
        'postStepCallback' : 'post_step_callback',
        'preStepCallback' : 'pre_step_callback',
        'preRideCallback' : 'pre_ride_callback',
        'postExposeCallback' : 'post_expose_callback',
        'exposeAddClass' : 'expose_add_class'
      },
      magellan : {
        'activeClass' : 'active_class'
      },
      reveal : {
        'animationSpeed' : 'animation_speed',
        'closeOnBackgroundClick' : 'close_on_background_click',
        'closeOnEsc' : 'close_on_esc',
        'dismissModalClass' : 'dismiss_modal_class',
        'bgClass' : 'bg_class'
      }
      tooltip : {
        'additionalInheritableClasses' : 'additional_inheritable_classes',
        'tooltipClass' : 'tooltip_class',
        'touchCloseText' : 'touch_close_text',
        'appendTo' : 'append_to',
        'tipTemplate' : 'tip_template'
      }
    },

    warnings: [],

    init : function () {
      this.pollyfill();

      if (typeof Zepto === 'function') {
        Zepto = jQuery;
        Foundation.migrate.warn('Zepto is no longer supported by Foundation, use jQuery 1.8+');
      }

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

  Foundation.migrate.init();

}(jQuery, this, this.document));