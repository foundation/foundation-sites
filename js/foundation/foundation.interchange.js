/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '4.2.0',

    cache : {},

    settings : {
      load_attr : 'foundation-load'
    },

    init : function (scope, method, options) {
      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      // this.set_preferred();

      if (typeof method != 'string') {
        return this.settings.init;
      } else {
        return this[method].call(this, options);
      }
    },

    // retina : function () {
    //   return window.devicePixelRatio > 1;
    // },

    loadables : function (reset) {
      if (reset) {
        return this.cache.loadables = $('[data-' + this.settings.load_attr +']');
      }

      return this.cache.loadables 
        || (this.cache.loadables = $('[data-' + this.settings.load_attr +']'));
    },

    nodes : function () {
      if (typeof this.cached_nodes === 'undefined') {
        this.update_nodes();
      }

      return this.cached_nodes;
    },

    update_nodes : function () {
      this.cached_nodes = this.loadables().filter(function () {
        if (!/IMG/.test(this.nodeName) && this.nodeType === 1) {
          return true;
        }
        return false;
      });

      return this.cached_nodes;
    },

    images : function () {
      if (typeof this.cached_images === 'undefined') {
        return this.update_images();
      }

      return this.cached_images;
    },

    update_images : function () {
      var images = document.getElementsByTagName('img'),
          count = images.length;

      this.cached_images = [];

      for (var i = count - 1; i >= 0; i--) {
        this.valid(images[i], (i === 0), function (image, last) {
          if (image && image.hasAttribute('data-' + this.settings.load_attr)) {
            this.cached_images.push(image);
          }

          if (last) {
            // all images have been updated, we
            // can now begin parsing queries
            this.enhance();
          }
        }.bind(this));
      }

      return 'deferred';
    },

    valid : function (image, last, callback) {
      var img = new Image();

      img.onerror = function () {
        callback(false, last);
      };

      img.onload = function () {
        callback(image, last);
      };

      img.src = image.src;

      return img;
    },

    // temporary callback
    enhance : function () {
      console.log(this.images())
    },

    build_config_object : function(el) {
      var raw_settings_arr = this.parse_data_attr(el),
          scenarios = [], count = raw_settings_arr.length;

      if (count > 0) {
        for (var i = count - 1; i >= 0; i--) {
          var split = raw_settings_arr[i].split(',');

          if (split.length > 1) {
            if (/(/.split[1])
            scenarios.push({path: split[0], action: split})
          }
        }
      }

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
