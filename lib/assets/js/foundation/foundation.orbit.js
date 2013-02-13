;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    version: '4.0.0.alpha',

    settings: {
      namespace: '.fndtn.orbit',
      timer: 1500
    },

    init: function(scope, method, options) {
      console.info('init orbit!');
      var self = this;
      $('.orbit-container').each($.proxy(self._init, self));
    },

    _init: function(idx, slider) {
      this._init_timer($(slider), 0);
      // generally we may need to construct markup here
      var slidesContainer = $(".orbit-slides", slider);
      var slides = slidesContainer.children();
      slidesContainer.css("width", slides.length * 100 + "%");
      slides.css("width", 100 / slides.length + "%");

    },

    _init_timer: function($slider, slideIdx) {
      var self = this;
      var totalSlides = $slider.find('.orbit-slides').children().length;
      // $slider.data('activeIndex', ++activeIndex%totalSlides);
      setTimeout(function(){
        $slider.find('.orbit-slides').animate({'marginLeft': '-' + (slideIdx*100) + '%'}, 500);
        self._init_timer($slider, (slideIdx+1)%totalSlides);
      }, self.settings.timer);
    }
  }

}(Foundation.zj, this, this.document));
