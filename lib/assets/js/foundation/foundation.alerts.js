/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.alerts = {
    version : '4.0.0.alpha',

    settings : {
      speed: 300, // fade out speed
      callback: $.noop
    },

    init : function (scope, method, options) {
      this.scope = this.scope || scope;

      if (typeof method === 'object') {
        $.extend(true, this.settings, method);
      }

      if (typeof method != 'string') {
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        // fire method
        return this[method].call(this, options);
      }
    },

    events : function () {
      var self = this;

      $(this.scope).on('click.fndtn.alerts', '[data-alert] a.close', function (e) {
        e.preventDefault();
        $(this).closest("[data-alert]").fadeOut(self.speed, function () {
          $(this).remove();
          self.settings.callback();
        });
      });

      this.settings.init = true;
    },

    unbind : function () {
      $(this.scope).off('.fndtn.alerts');
    }
  };
}(Foundation.zj, this, this.document));