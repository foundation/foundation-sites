/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.interchange = {
    name : 'interchange',

    version : '4.2.0',

    settings : {
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

    images : function () {
      return this.cached_images || this.update_images();
    },

    update_images : function () {
      var images = document.getElementsByTagName('img'),
          count = images.length;

      this.cached_images = [];

      for (var i = count - 1; i >= 0; i--) {
        this.valid(images[i], (i === 0), function (image, last) {
          if (image && image.hasAttribute('data-foundation-load')) {
            this.cached_images.push(image);
          }

          if (last) {
            this.enhance();
          }
        }.bind(this));
      }

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
    },

    enhance : function () {
      console.log(this.images())
    },

    parse_logic : function () {

    }
    
  };
}(Foundation.zj, this, this.document));
