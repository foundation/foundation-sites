;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs['magellan-expedition'] = {
    name : 'magellan-expedition',

    version : '5.1.0',

    settings : {
      active_class: 'active',
      threshold: 0,
      destination_threshold: 20
    },

    init : function (scope, method, options) {
      Foundation.inherit(this, 'throttle');
      this.bindings(method, options);
    },

    events : function () {
      var self = this,
          S = self.S;

      S(self.scope)
        .off('.magellan')
        .on('scroll.magellan', self.throttle(this.update_arrivals.bind(this), 60));
    },

    update_arrivals : function() {
      var self = this,
          window_top_offset = $(window).scrollTop();

      $('[data-magellan-expedition]', self.scope).each(function() {
        var expedition = $(this),
            settings = settings = expedition.data('magellan-expedition-init'),
            offsets = self.offsets(expedition, window_top_offset),
            arrivals = expedition.find('[data-magellan-arrival]'),
            active_item = false;
        offsets.each(function(idx, item) {
          if (item.viewport_offset >= item.top_offset) {
            var arrivals = expedition.find('[data-magellan-arrival]');
            arrivals.not(item.arrival).removeClass(settings.active_class);
            item.arrival.addClass(settings.active_class);
            active_item = true;
            return true;
          }
        });

        if (!active_item) arrivals.removeClass(settings.active_class);
      });
    },

    offsets : function(expedition, window_offset) {
      var settings = expedition.data('magellan-expedition-init'),
          viewport_offset = (window_offset + settings.destination_threshold);

      return expedition.find('[data-magellan-arrival]').map(function(idx, el) {
        var name = $(this).data('magellan-arrival'),
            dest = $('[data-magellan-destination=' + name + ']');
        if (dest.length > 0) {
          var top_offset = dest.offset().top;
          return {
            destination : dest,
            arrival : $(this),
            top_offset : top_offset,
            viewport_offset : viewport_offset
          }
        }
      }).sort(function(a, b) {
        if (a.top_offset < b.top_offset) return -1;
        if (a.top_offset > b.top_offset) return 1;
        return 0;
      });
    },

    off : function () {
      this.S(this.scope).off('.fndtn.magellan');
      this.S(window).off('.fndtn.magellan');
    },

    reflow : function () {}
  };
}(jQuery, this, this.document));