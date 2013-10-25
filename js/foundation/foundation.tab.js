/*jslint unparam: true, browser: true, indent: 2 */

;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.tab = {
    name : 'tab',

    version : '5.0.0',

    settings : {
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(this.scope).on('click', '[data-tab] a', function (e) {
        e.preventDefault();

        var tab = $(this).parent(),
            target = $('#' + this.href.split('#')[1]),
            siblings = $(this).parent().siblings();

        tab.addClass('active');
        siblings.removeClass('active');
        target.siblings().removeClass('active').end().addClass('active');
      });
    },

    off : function () {
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
