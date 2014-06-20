;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.offcanvas = {
    name : 'offcanvas',

    version : '5.2.1',

    settings : {
      close_on_click: true
    },

    init : function (scope, method, options) {
      this.events();
    },

    events : function () {
      var self = this,
          S = self.S;

      S(this.scope).off('.offcanvas')
        .on('click.fndtn.offcanvas', '.left-off-canvas-toggle', function (e) {
            self.click_toggle_class(e, 'move-right');
            S(".left-off-canvas-submenu").removeClass('move-right');
        })
        .on('click.fndtn.offcanvas', '.left-off-canvas-menu a', function (e) {
          if(self.settings.close_on_click && !S(this).parent().hasClass("has-submenu") && !S(this).parent().hasClass("back")){
            S(".off-canvas-wrap").removeClass("move-right");
            S(this).parent().parent().removeClass('move-right');
          }else if(S(this).parent().hasClass("has-submenu")){
            e.preventDefault();
            S(this).siblings(".left-off-canvas-submenu").toggleClass('move-right');
          }else if(S(this).parent().hasClass("back")){
            e.preventDefault();
            S(this).parent().parent().removeClass('move-right');
          }
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-toggle', function (e) {
          self.click_toggle_class(e, 'move-left');
          S(".right-off-canvas-submenu").removeClass('move-left');
        })
        .on('click.fndtn.offcanvas', '.right-off-canvas-menu a', function (e) {
          if(self.settings.close_on_click && !S(this).parent().hasClass("has-submenu") && !S(this).parent().hasClass("back")){
            S(".off-canvas-wrap").removeClass("move-left");
            S(this).parent().parent().removeClass('move-left');
          }else if(S(this).parent().hasClass("has-submenu")){
            e.preventDefault();
            S(this).siblings(".right-off-canvas-submenu").toggleClass('move-left');
          }else if(S(this).parent().hasClass("back")){
            e.preventDefault();
            S(this).parent().parent().removeClass('move-left');
          }
        })
        .on('click.fndtn.offcanvas', '.exit-off-canvas', function (e) {
          self.click_remove_class(e, 'move-left');
          self.click_remove_class(e, 'move-right');
          S(".left-off-canvas-submenu").removeClass('move-right');
          S(".right-off-canvas-submenu").removeClass('move-left');
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

    reflow : function () {}
  };
}(jQuery, this, this.document));