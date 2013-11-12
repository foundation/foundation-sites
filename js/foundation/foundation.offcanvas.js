;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.0.0',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      $(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.off-canvas-left-toggle', function (e) {
          console.log($(this).closest('.off-canvas-wrap'))
          $(this).closest('.off-canvas-wrap').toggleClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function () {
          console.log('exit left')
          $(this).closest(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.off-canvas-right-toggle', function (e) {
          console.log('toggle right')
          $(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function () {
          console.log('exit right')
          $(this).closest(".off-canvas-wrap").removeClass("move-left");
        });
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));