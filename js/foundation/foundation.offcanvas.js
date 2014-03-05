(function (root, factory) {

  // Set up AMD dependencies
  if (typeof define === 'function' && define.amd) {
    define(['jquery', './foundation'], factory);

  // Set up CommonJS dependencies
  } else if (typeof exports === 'object') {
    var $ = require("jquery");
    var Foundation = require("./foundation");
    module.exports = factory($, Foundation);

  // Set up browser global
  } else {
    factory((root.jQuery || root.$), root.Foundation);
  }
  
}(this, function ($, Foundation) {
  'use strict';

  var jQuery = $;

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.1.1',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      var S = this.S;

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest('.off-canvas-wrap').toggleClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-right");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          e.preventDefault();
          S(this).closest(".off-canvas-wrap").toggleClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          e.preventDefault();
          S(".off-canvas-wrap").removeClass("move-left");
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          e.preventDefault();
          var href = $(this).attr('href');
          S('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
              window.location = href
              S('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
          });
          S(".off-canvas-wrap").removeClass("move-left");
        });
    },

    reflow : function () {}
  };
}));
