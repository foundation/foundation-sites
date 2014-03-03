;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.slider = {
    name : 'slider',

    version : '5.2.0',

    settings: {
      is: 'setting'
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this,'');
      this.bindings(method, options);
    },

    events : function() {
      var self = this;

      $(this.scope)
        .off('.slider')
        .on('mousedown.fndtn.slider', '[' + self.attr_name() + '] .range-slider-handle', function(e) {
          if (!self.cache.active) {
            var $handle = $(e.target),
                $bar = $handle.parent();
            self.cache.active = $handle;
            $.data($handle,'bar', $bar);
            $.data($handle,'bar_o', $bar.offset().left);
            $.data($handle,'bar_w', $bar.outerWidth());
            $.data($handle,'handle_o', $handle.offset().left);
            $.data($handle,'handle_w', $handle.outerWidth());
          }
        })
        .on('mousemove.fndtn.slider', function(e){
          if (!!self.cache.active) {
            var $handle = self.cache.active,
            handle_w = $.data($handle, 'handle_w'),
            bar_o = $.data($handle, 'bar_o'),
            bar_w = $.data($handle, 'bar_w');
            requestAnimationFrame(function(){
              var pct = Math.min(Math.max(((((e.pageX-handle_w*0.5)-bar_o)/bar_w)*100),0),100);
              $(self.cache.active).css('left', pct+'%');
            });
          }
        })
        .on('mouseup.fndtn.slider', function(e){
          self.cache.active = null;
        });
    },

    reflow : function() {}

  };

}(jQuery, this, this.document));
