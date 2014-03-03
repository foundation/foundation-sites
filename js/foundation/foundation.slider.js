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
            e.preventDefault();
            var $handle = self.cache.active,
            handle_w = $.data($handle, 'handle_w'),
            handle_o = $.data($handle, 'handle_o'),
            bar_w = $.data($handle, 'bar_w'),
            bar_o = $.data($handle, 'bar_o');
            requestAnimationFrame(function(){
              var pct = self.limit_to((((e.pageX)-bar_o)/bar_w),0,1),
                  handle_offset = pct*bar_w-handle_w*0.5,
                  progress_bar_width = pct*100;
              self.set_translate($(self.cache.active), handle_offset);
              $(self.cache.active).siblings('.range-slider-active-segment').css('width', progress_bar_width+'%');
              $('#ranger').val(pct);
            });
          }
        })
        .on('mouseup.fndtn.slider', function(e){
          self.cache.active = null;
        });
    },

    set_translate : function(ele, offset, vertical) {
      if (vertical) {
        $(ele)
          .css('-webkit-transform', 'translateY('+offset+'px)')
          .css('-moz-transform', 'translateY('+offset+'px)')
          .css('-ms-transform', 'translateY('+offset+'px)')
          .css('-o-transform', 'translateY('+offset+'px)')
          .css('transform', 'translateY('+offset+'px)');
      } else {
        $(ele)
          .css('-webkit-transform', 'translateX('+offset+'px)')
          .css('-moz-transform', 'translateX('+offset+'px)')
          .css('-ms-transform', 'translateX('+offset+'px)')
          .css('-o-transform', 'translateX('+offset+'px)')
          .css('transform', 'translateX('+offset+'px)');
      }
    },

    limit_to : function(val, min, max) {
      return Math.min(Math.max(val, min), max);
    },

    reflow : function() {}

  };

}(jQuery, this, this.document));
