;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.2.2',

    settings : {
      open_method: 'move',
      close_on_click: true
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');

      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S;
          
      if (this.settings.open_method === 'move'){
        S(this.scope).off('.offcanvas')
          .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
            self.click_toggle_class(e, 'move-right');
          })
          .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
            var settings = self.get_settings(e)
            if (settings.close_on_click)
              S(".off-canvas-wrap").removeClass("move-right");
          })
          .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
            self.click_toggle_class(e, 'move-left');
          })
          .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
            var settings = self.get_settings(e)
            if (settings.close_on_click)
              S(".off-canvas-wrap").removeClass("move-left");
          })
          .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
            self.click_remove_class(e, 'move-left');
            self.click_remove_class(e, 'move-right');
          })
      } else if (this.settings.open_method === 'overlap') {
        S(this.scope).off('.offcanvas')
          .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
            self.click_toggle_class(e, 'offcanvas-overlap');
          })
          .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
            var settings = self.get_settings(e)
            if (settings.close_on_click)
              S(".off-canvas-wrap").removeClass("offcanvas-overlap");
          })
          .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
            self.click_toggle_class(e, 'offcanvas-overlap');
          })
          .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
            var settings = self.get_settings(e)
            if (settings.close_on_click)
              S(".off-canvas-wrap").removeClass("offcanvas-overlap");
          })
          .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
            self.click_remove_class(e, 'offcanvas-overlap');
          })
      } else {
        return;
      }
      if (S(this.scope).find('.off-canvas-fixed').length > 0) {
        S(window)
          .off('.offcanvas')
          .on('resize.fndtn.offcanvas', self.throttle(function () {
            self.resize_fixed.call(self, $(this).height());
          }, 50));
          self.resize_fixed();
      }
    },

    click_toggle_class: function(e, class_name) {
      e.preventDefault();
      this.S(e.target).closest('.off-canvas-wrap').toggleClass(class_name);
    },

    click_remove_class: function(e, class_name) {
      e.preventDefault();
      this.S('.off-canvas-wrap').removeClass(class_name);
    },

    get_settings: function(e) {
      var offcanvas  = this.S(e.target).closest('[' + this.attr_name() + ']')
      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
    },

    reflow : function () {},

    resize_fixed: function(height) {
      height = height || window.innerHeight;
      this.S('.off-canvas-fixed .right-off-canvas-menu, .off-canvas-fixed .left-off-canvas-menu')
        .height(height);
    }
  };
}(jQuery, window, window.document));
