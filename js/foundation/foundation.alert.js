/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

    version : '4.3.2',

    settings : {
      animation: 'fadeOut',
      speed: 300, // fade out speed
      callback: function (){}
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'data_options');

      this.bindings.call(this, [method, options]);
    },

    events : function (scope) {
      $(this.scope).on('click.fndtn.alerts', '[data-alert] a.close', function (e) {
          var alertBox = $(this).closest("[data-alert]"),
              settings = alertBox.data('alert-init');

        e.preventDefault();
        alertBox[settings.animation](settings.speed, function () {
          $(this).remove();
          settings.callback();
        });
      });
    },

    off : function () {
      $('[data-alert]').off('.fndtn.alerts');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
