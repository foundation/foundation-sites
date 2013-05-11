/*jslint unparam: true, browser: true, indent: 2 */

// requires Modernizr

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '4.2.0',

    cache : {},

    settings : {
      load_attr : 'foundation-load',
      named_rules : {
        small : 'max-width: 767px',
        medium : '',
        large : ''
      },
      directives : {
        replace : function (el, path, revert) {
          if (/IMG/.test(el[0].nodeName)) {
            var path_parts = path.split('/'),
                path_file = path_parts[path_parts.length - 1];

            if (new RegExp(path_file, 'i').test(el[0].src)) return;

            el[0].src = path;

            return el.trigger('replace', el);
          }
        }
        // before : function (el, path, revert) {},
        // after : function (el, path, revert) {}
      }
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      // load images;
      this.images();

      if (typeof method != 'string') {
        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(window).on('resize.fndtn.interchange', self.throttle(function () {
        self.resize.call(self);
      }, 50)).trigger('resize');
    },

    resize : function () {
      var cache = this.cache;

      for (var uuid in cache) {
        if (cache.hasOwnProperty(uuid)) {
          var passed = this.results(uuid, cache[uuid]);
          
          if (passed) {
            return this.settings.directives[passed
              .scenario[1]](passed.el, passed.scenario[0]);
          }

          // need to be able to revert the change 
          // if the window is scaled back to original

          // return this.settings.directives[passed
          //     .scenarios[1](passed.el, pass.scenarios[0], true)];
        }
      }
    },

    results : function (uuid, scenarios) {
      var count = scenarios.length,
          el = $('[data-uuid="' + uuid + '"]'),
          results_arr = [];

      if (scenarios.length > 0) {
        for (var i = count - 1; i >= 0; i--) {
          var rule = scenarios[i][2];
          if (this.settings.named_rules.hasOwnProperty(rule)) {
            var mq = Modernizr.mq('(' + this.settings.named_rules[rule] + ')')
          } else {
            var mq = Modernizr.mq('(' + scenarios[i][2] + ')');
          }
          if (mq) {
            return {el: el, scenario: scenarios[i]};
          }
        }
      }

      return results_arr;
    },

    images : function () {
      if (typeof this.cached_images === 'undefined') {
        return this.update_images();
      }

      return this.cached_images;
    },

    update_images : function () {
      var images = document.getElementsByTagName('img'),
          count = images.length,
          data_attr = 'data-' + this.settings.load_attr;

      this.cached_images = [];

      for (var i = count - 1; i >= 0; i--) {
        this.valid(images[i], (i === 0), function (image, last) {
          if (image) {
            var str = image.getAttribute(data_attr) || '';

            if (str.length > 0) {
              this.cached_images.push(image);
            }
          }

          if (last) {
            var loaded = setTimeout(function () {

            }.bind(this), 10);

            this.enhance();
          }
        }.bind(this));
      }

      return 'deferred';
    },

    valid : function (image, last, callback) {
      var img = new Image();

      img.src = image.src;

      this.loaded($(image), last, callback);

      return img;
    },

    loaded : function (image, last, callback) {
      // based on jquery.imageready.js
      // @weblinc, @jsantell, (c) 2012

      function loaded () {
        callback(image[0], last);
      }

      function bindLoad () {
        this.one('load', loaded);

        if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
          var src = this.attr( 'src' ),
              param = src.match( /\?/ ) ? '&' : '?';

          param += 'random=' + (new Date()).getTime();
          this.attr('src', src + param);
        }
      }

      if (!image.attr('src')) {
        loaded();
        return;
      }

      if (image[0].complete || image[0].readyState === 4) {
        loaded();
      } else {
        bindLoad.call(image);
      }
    },

    enhance : function () {
      var count = this.images().length;

      for (var i = count - 1; i >= 0; i--) {
        this._object($(this.images()[i]));
      }

      return this.events();
    },

    parse_params : function (path, directive, mq) {
      return [this.convert_path(path), this.convert_directive(directive), this.convert_mq(mq)];
    },

    convert_mq : function (mq) {
      return $.trim(mq);
    },

    convert_path : function (path) {
      return $.trim(path);
    },

    convert_directive : function (directive) {
      var trimmed = $.trim(directive);

      if (trimmed.length > 0) {
        return trimmed;
      }

      return 'replace';
    },

    _object : function(el) {
      var raw_settings_arr = this.parse_data_attr(el),
          scenarios = [], count = raw_settings_arr.length;

      if (count > 0) {
        for (var i = count - 1; i >= 0; i--) {
          var split = raw_settings_arr[i].split(/\((.*?)\)/);

          if (split.length > 1) {
            var mq = split[1],
                path = split[0].split(',')[0],
                directive = split[0].split(',')[1],
                params = this.parse_params(path, directive, mq);

            scenarios.push(params)
          }
        }
      }

      return this.store(el, scenarios);
    },

    uuid : function (separator) {
      var delim = separator || "-";

      function S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      }

      return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    },

    store : function (el, scenarios) {
      var uuid = this.uuid();

      el.attr('data-uuid', uuid);

      return this.cache[uuid] = scenarios;
    },

    trim : function(str) {
      if (typeof str === 'string') {
        return $.trim(str);
      }

      return str;
    },

    parse_data_attr : function (el) {
      var raw = el.data(this.settings.load_attr).split(/\[(.*?)\]/),
          count = raw.length, output = [];

      for (var i = count - 1; i >= 0; i--) {
        // assume that settings are properly configured
        // if length is longer than typical extension
        if (raw[i].replace(/[\W\d]+/, '').length > 4) {
          output.push(raw[i]);
        }
      }

      return output;
    }
    
  };

}(Foundation.zj, this, this.document));
