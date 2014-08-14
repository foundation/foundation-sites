;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.3.3',

    settings : {
      open_method: 'move',
      close_on_click: false
    },

    init : function (scope, method, options) {
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S;
      
      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
            self.click_toggle_class(e, 'move-right');
            S(".left-submenu").removeClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          if(self.settings.close_on_click && !S(this).parent().hasClass("has-submenu") && !S(this).parent().hasClass("back")){
            S(".off-canvas-wrap").removeClass("move-right");
            S(this).parent().parent().removeClass('move-right');
          }else if(S(this).parent().hasClass("has-submenu")){
            e.preventDefault();
            S(this).siblings(".left-submenu").toggleClass('move-right');
          }else if(S(this).parent().hasClass("back")){
            e.preventDefault();
            S(this).parent().parent().removeClass('move-right');
          }
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, 'move-left');
          S(".right-submenu").removeClass('move-left');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          if(self.settings.close_on_click && !S(this).parent().hasClass("has-submenu") && !S(this).parent().hasClass("back")){
            S(".off-canvas-wrap").removeClass("move-left");
            S(this).parent().parent().removeClass('move-left');
          }else if(S(this).parent().hasClass("has-submenu")){
            e.preventDefault();
            S(this).siblings(".right-submenu").toggleClass('move-left');
          }else if(S(this).parent().hasClass("back")){
            e.preventDefault();
            S(this).parent().parent().removeClass('move-left');
          }
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, 'move-left');
          self.click_remove_class(e, 'move-right');
          S(".left-submenu").removeClass('move-right');
          S(".right-submenu").removeClass('move-left');
        })
    },
    click_toggle_class: function(e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.toggle(class_name, $off_canvas);
    },

    click_remove_class: function(e, class_name) {
      e.preventDefault();
      var $off_canvas = this.get_wrapper(e);
      this.hide(class_name, $off_canvas);
    },

    get_settings: function(e) {
      var offcanvas  = this.S(e.target).closest('[' + this.attr_name() + ']');
      return offcanvas.data(this.attr_name(true) + '-init') || this.settings;
    },

    get_wrapper: function(e) {
      var $off_canvas = this.S(e ? e.target : this.scope).closest('.off-canvas-wrap');

      if ($off_canvas.length === 0) {
        $off_canvas = this.S('.off-canvas-wrap');
      }
      return $off_canvas;
    },

    reflow : function () {}
  };
}(jQuery, window, window.document));
