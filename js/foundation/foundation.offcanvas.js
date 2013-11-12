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
      $(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.off-canvas-left-toggle', function (e) {
          $(this).closest(".off-canvas-wrap").addClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function () {
          $(this).closest(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.off-canvas-right-toggle', function (e) {
          $(this).closest(".off-canvas-wrap").addClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function () {
          $(this).closest(".off-canvas-wrap").removeClass("move-left");
        });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));