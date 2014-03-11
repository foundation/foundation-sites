;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.2.0',

    settings : {},

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      var self = this,
          S = self.S;

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, 'move-right');
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          self.click_add_animation_handler(e, 'move-right');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, 'move-left');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          self.click_add_animation_handler(e, 'move-left');
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, 'move-left');
          self.click_remove_class(e, 'move-right');
        })
    },

    click_toggle_class: function(e, class_name) {
      e.preventDefault();
      this.S(e.target).closest('.off-canvas-wrap').toggleClass(class_name);
    },

    click_remove_class: function(e, class_name) {
      e.preventDefault();
      this.S('.off-canvas-wrap').removeClass(class_name);
    },

    click_add_animation_handler: function(e, class_name) {
      e.preventDefault();
      self = this.S
      var href = $(e.target).attr('href');
      self('.off-canvas-wrap').on('transitionend webkitTransitionEnd oTransitionEnd', function(e) {
          window.location = href
          self('.off-canvas-wrap').off('transitionend webkitTransitionEnd oTransitionEnd');
      });
      self(".off-canvas-wrap").removeClass(class_name);
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));
