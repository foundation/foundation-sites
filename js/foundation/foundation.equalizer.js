;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs.equalizer = {
    name : 'equalizer',

    version : '5.1.0',

    settings : {
      before_height_change: $.noop,
      after_height_change: $.noop
    },

    init : function (scope, method, options) {
      var self = this;

      self.bindings(method, options);
    },

    events : function () {
      var self = this;

      // TODO Throttle this event
      self.S(window).off('.equalizer').on('resize.fndtn.equalizer', function(e){
        self.reflow();
      });
    },

    equalize: function(equalizer) {
      var self = this,
          isStacked = false,
          vals = equalizer.find('[data-equalizer-watch]'),
          firstTopOffset = vals.first().offset().top,
          settings = equalizer.data('equalizer-init');
      if (vals.length === 0) return;
      settings.before_height_change();
      equalizer.trigger('before-height-change');
      vals.height('inherit');
      vals.each(function(){
        var el = $(this);
        if (el.offset().top !== firstTopOffset) {
          isStacked = true;
        }
      });
      if (isStacked) return;
      
      var heights = vals.map(function(){ return $(this).outerHeight() });
      var max = Math.max.apply(null, heights);
      vals.height(max);
      settings.after_height_change();
      equalizer.trigger('after-height-change');
    },

    reflow : function () {
      var self = this;

      self.S('[data-equalizer]', this.scope).each(function(){
        self.equalize($(this));
      });
    }
  };
}(jQuery, this, this.document));
