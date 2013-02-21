;(function ($, window, document, undefined) {
  'use strict';

  $.fn.timer = function(time_in_ms) {
    var INTERVAL_TIME = 250,
        time = time_in_ms,
        timer,
        start,
        stopped = false,
        $el = this;

    this.stop = function() {
      clearInterval(timer);
      stopped = true;
      $el.trigger('timer:stopped');
      time = time - (new Date().getTime() - start);
    };

    this.start = function() {
      clearInterval(timer);
      start = new Date().getTime();      
      if (stopped) {
        $el.trigger('timer:resumed');
      } else {
        $el.trigger('timer:started');
      }
      timer = setInterval(function() {
        var now = time - (new Date().getTime() - start);
        if (now <= 0) {
          clearInterval(timer);
          stopped = false;
          $el.trigger('timer:complete');
          $el.off('timer:progress');
          $el.off('timer:complete');
          $el.off('timer:start');
          $el.off('timer:stop');
        } else {
          var progress_percent = (time-now)/time;
          progress_percent = Math.ceil(progress_percent*100) + '%';
          $el.trigger('timer:progress', [progress_percent])
        }
      }, INTERVAL_TIME);
    };

    $el.on('timer:start', this.start);
    $el.on('timer:stop', this.stop);

    return this;
  };

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    version: '4.0.0.alpha',

    settings: {
      timer: 1500,
      slide_delay: 1500
    },

    init: function(scope, method, options) {
      var self = this;
      $('[data-orbit]', scope).each($.proxy(self._init, self));
    },

    _init: function(idx, slider) {
      var data = {};
      data.$container = $(slider).wrap('<div class="orbit-container"></div>').parent();
      data.$container.append('<a data-orbit-prev href="#">Prev</a>');
      data.$container.append('<a data-orbit-next href="#">Next</a>');
      data.$container.append('<div class="orbit-timer"><span></span></div>');
      data.$container.find('[data-orbit-caption]').addClass('orbit-caption');
      data.$timer = data.$container.find('.orbit-timer > *');
      data.$slides_container = $(slider).addClass('orbit-slides');
      data.$slides = data.$slides_container.children();
      data.$slides_container.append(data.$slides.first().clone());
      data.$slides_container.prepend(data.$slides.last().clone());
      data.$slides = data.$slides_container.children();
      data.$slides_container.css('marginLeft', '-100%');
      data.activeIndex = 1;
      data.self = this;
      this._init_events(data);
      this._init_dimensions(data);
      this._start_timer(data);
    },

    _init_events: function(data) {
      $(window).on('resize', function() {
        data.$slides_container.height('');
        data.$slides_container.height(data.$slides_container.height(data.$container.height()));
      });
      data.$container.on('click', '[data-orbit-prev]', function(e) {
        e.preventDefault();
        data.$container.trigger('timer:stop');
        data.self.goto(data, 'prev');
      });
      data.$container.on('click', '[data-orbit-next]', function(e) {
        e.preventDefault();
        data.$container.trigger('timer:stop');
        data.self.goto(data, 'next');
      });
      data.$container.on('timer:started', function(e) {
        data.$timer.css('width', '0%');
      });
    },

    _init_dimensions: function(data) {
      data.$slides_container.css('width', data.$slides.length * 100 + '%');
      data.$slides.css('width', 100 / data.$slides.length + '%');
      data.$slides_container.height(data.$container.height());
      data.$slides_container.css('width', data.$slides.length * 100 + '%');
    },

    _start_timer: function(data) {
      data.$container.timer(data.self.settings.timer);
      data.$container.on('timer:complete', function() {
        data.$container.off('timer:complete');
        data.$timer.css('width', '100%');
        data.self.goto(data, 'next', function() {
          data.self._start_timer(data);
        });
      });
      data.$container.on('timer:progress', function(e) {
        data.$timer.css('width', e.data[0]);
      });
      data.$container.trigger('timer:start');
    },

    goto: function(data, index_or_direction, callback) {
      if (data.$container.hasClass("orbit-transitioning")) {
        console.info('is transitioning');
        return false;
      }
      if (index_or_direction === 'prev') {
        if (data.activeIndex === 0) {
          data.activeIndex = data.$slides.length - 1;
        }
        else {
          data.activeIndex--;
        }
      }
      else if (index_or_direction === 'next') {
        data.activeIndex = (data.activeIndex+1)%data.$slides.length;
      }
      else if (typeof index_or_direction === 'number') {
        data.activeIndex = (index%data.$slides.length);
      }
      if (data.activeIndex === (data.$slides.length - 1) && index_or_direction === 'next') {
        data.$slides_container.css('marginLeft', '0%');
        data.activeIndex = 1;
      }
      else if (data.activeIndex === 0 && index_or_direction === 'prev') {
        data.$slides_container.css('marginLeft', '-' + (data.$slides.length - 1)*100 + '%');
        data.activeIndex = data.$slides.length - 2;
      }
      data.$container.addClass('orbit-transitioning');
      data.$slides_container.animate({
        'marginLeft' : '-' + (data.activeIndex*100) + '%'
      }, 'linear', data.self.settings.slide_delay, function() {
        data.$container.removeClass('orbit-transitioning');
        callback();
      });        

    }
  }

}(Foundation.zj, this, this.document));
