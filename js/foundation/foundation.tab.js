/*jslint unparam: true, browser: true, indent: 2 */
;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.0.0',

    settings : {
      active_class: 'active'
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(this.scope).off('.tab').on('click.fndtn.tab', '[data-tab] a', function (e) {
        e.preventDefault();

        var tab = $(this).parent(),
            target = $('#' + this.href.split('#')[1]),
            siblings = tab.siblings(),
            settings = tab.closest('[data-tab]').data('tab-init');

        tab.addClass(settings.active_class);
        siblings.removeClass(settings.active_class);
        target.siblings().removeClass(settings.active_class).end().addClass(settings.active_class);
      });
    },

    off : function () {},

    reflow : function () {}
  };
}(jQuery, this, this.document));
