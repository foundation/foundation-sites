;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.slider = {
    name : 'slider',

    version : '5.2.0',

    settings: {
      start: 0,
      end: 100,
      step: 1,
      value: null
    },

    cache : {},

    init : function (scope, method, options) {
      Foundation.inherit(this,'');
      this.bindings(method, options);
      this.reflow();
    },

    events : function() {
      var self = this;

      $(this.scope)
        .off('.slider')
        .on('mousedown.fndtn.slider', '[' + self.attr_name() + '] .range-slider-handle', function(e) {
          if (!self.cache.active) {
            self.set_active_slider($(e.target));
          }
        })
        .on('mousemove.fndtn.slider', function(e){
          if (!!self.cache.active) {
            e.preventDefault();
            self.calculate_position(self.cache.active, e.pageX);
          }
        })
        .on('mouseup.fndtn.slider', function(e){
          self.remove_active_slider();
        });
    },

    set_active_slider : function($handle) {
      var $bar = $handle.parent(),
          settings = $.extend({}, this.settings, this.data_options($bar));
      
      this.cache.active = $handle;
      this.calculate_offsets($handle);
    },

    remove_active_slider : function() {
      this.cache.active = null;
    },

    calculate_position : function($handle, cursor_x) {
      var self = this,
          settings = $.extend({}, self.settings, self.data_options($handle.parent())),
          handle_w = $.data($handle, 'handle_w'),
          handle_o = $.data($handle, 'handle_o'),
          bar_w = $.data($handle, 'bar_w'),
          bar_o = $.data($handle, 'bar_o');

      requestAnimationFrame(function(){
        var pct = self.limit_to((((cursor_x)-bar_o)/bar_w),0,1),
            norm = self.normalized_value(pct, settings.start, settings.end, settings.step);

        self.set_ui($handle, norm);
      }); 
    },

    set_ui : function($handle, value) {
      var settings = $.extend({}, this.settings, this.data_options($handle.parent())),
          handle_w = $.data($handle, 'handle_w'),
          bar_w = $.data($handle, 'bar_w'),
          norm_pct = this.normalized_percentage(value, settings.start, settings.end),
          handle_offset = norm_pct*bar_w-handle_w*0.5,
          progress_bar_width = norm_pct*100;

      this.set_translate($($handle), handle_offset);
      $($handle).siblings('.range-slider-active-segment').css('width', progress_bar_width+'%');
      
      $('#ranger').val(value);
    },

    normalized_percentage : function(val, start, end) {
      return val/(end - start);
    },

    normalized_value : function(val, start, end, step) {
      var range = end - start,
          step = step,
          point = val*range,
          mod = (point-(point%step)) / step,
          rem = point % step,
          round = ( rem >= step*0.5 ? step : 0);
      return (mod*step + round);
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

    calculate_offsets : function($handle) {
      $.data($handle,'bar', $handle.parent());
      $.data($handle,'bar_o', $handle.parent().offset().left);
      $.data($handle,'bar_w', $handle.parent().outerWidth());
      $.data($handle,'handle_o', $handle.offset().left);
      $.data($handle,'handle_w', $handle.outerWidth());
      $.data($handle,'settings', $.extend({}, this.settings, this.data_options($handle.parent())));
    },

    set_initial_position: function($ele) {
      var settings = $.extend({}, this.settings, this.data_options($ele)),
          initial = (settings.value == null ? ((settings.end-settings.start)*0.5/settings.step)*settings.step : settings.value),
          $handle = $ele.children('.range-slider-handle');
      this.calculate_offsets($handle);
      this.set_ui($handle, initial);
    },

    reflow : function() {
      var self = this;
      self.S('[' + this.attr_name() + ']').each(function(){
        self.set_initial_position($(this));
      });
    }

  };

}(jQuery, this, this.document));
