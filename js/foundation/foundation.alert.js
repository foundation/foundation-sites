;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.alert = {
    name : 'alert',

    version : '5.1.1',

    settings : {
      animation: 'fadeOut',
      speed: 300, // fade out speed
      callback: function (){}
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = this.S;

      $(this.scope).off('.alert').on('click.fndtn.alert', '[' + this.attr_name() + '] a.close', function (e) {
          var alertBox = S(this).closest('[' + self.attr_name() + ']'),
              settings = alertBox.data(self.attr_name(true) + '-init') || self.settings;

        e.preventDefault();
        alertBox[settings.animation](settings.speed, function () {
          S(this).trigger('closed').remove();
          settings.callback();
        });
      });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
