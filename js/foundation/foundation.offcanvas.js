;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.0.0',

    settings : {
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      $(".off-canvas-left-toggle").click(function (e) {
        $(this).closest(".off-canvas-wrap").addClass("move-right");
      });
      $(".exit-off-canvas").click(function () {
        $(this).closest(".off-canvas-wrap").removeClass("move-right");
      });
      $(".off-canvas-right-toggle").click(function (e) {
        $(this).closest(".off-canvas-wrap").addClass("move-left");
      });
      $(".exit-off-canvas").click(function () {
        $(this).closest(".off-canvas-wrap").removeClass("move-left");
      });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));