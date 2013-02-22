;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.orbit = {
    version: '4.0.0.alpha',

    settings: {
      timer: 5000,
      slide_delay: 1500
    },

    init: function(scope, method, options) {
      var self = this;
      $('[data-orbit]', scope).each($.proxy(self._init, self));
    },

    _init: function(idx, slider) {
      // var data = {};
      this.$container = $(slider).wrap('<div class="orbit-container"></div>').parent();
      this.$container.append('<a data-orbit-prev href="#">Prev</a>');
      this.$container.append('<a data-orbit-next href="#">Next</a>');
      this.$container.append('<a data-orbit-pause href="#">Pause</a>');
      this.$container.append('<a data-orbit-resume href="#">Resume</a>');
      this.$container.append('<div class="orbit-timer"><span></span></div>');
      this.$container.find('[data-orbit-caption]').addClass('orbit-caption');
      this.$timer = this.$container.find('.orbit-timer > *');
      this.$slides_container = $(slider).addClass('orbit-slides');
      this.$slides = this.$slides_container.children();
      this.$slides_container.append(this.$slides.first().clone());
      this.$slides_container.prepend(this.$slides.last().clone());
      this.$slides = this.$slides_container.children();
      this.$slides_container.css('marginLeft', '-100%');
      this.activeIndex = 1;
      // data.self = this;
      // this.data = data;
      this._init_events();
      this._init_dimensions();
      this._start_timer();
    },

    _init_events: function() {
      $(window).on('resize', function() {
        this.$slides_container.height('');
        this.$slides_container.height(this.$slides_container.height(this.$container.height()));
      }.bind(this));
      this.$container.on('click', '[data-orbit-prev]', function(e) {
        e.preventDefault();
        this.$container.trigger('timer:stop');
        this.goto('prev');
      }.bind(this));
      this.$container.on('click', '[data-orbit-next]', function(e) {
        e.preventDefault();
        this.$container.trigger('timer:stop');
        this.goto('next');
      }.bind(this));
      this.$container.on('click', '[data-orbit-pause]', function(e) {
        e.preventDefault();
        this._stop_timer();
      }.bind(this));
      this.$container.on('click', '[data-orbit-resume]', function(e) {
        e.preventDefault();
        // data.$container.trigger('timer:start');
        this._start_timer();
      }.bind(this));
      this.$container.on('swipeLeft', function(e) {
        // alert('left');
        e.preventDefault();
        this.$container.trigger('timer:stop');
        this.goto('prev');
      }.bind(this));
      this.$container.on('swipeRight', function(e) {
        // alert('right');
        e.preventDefault();
        this.$container.trigger('timer:stop');
        this.goto('right');
      }.bind(this));
    },

    _init_dimensions: function() {
      this.$slides_container.css('width', this.$slides.length * 100 + '%');
      this.$slides.css('width', 100 / this.$slides.length + '%');
      this.$slides_container.height(this.$container.height());
      this.$slides_container.css('width', this.$slides.length * 100 + '%');
    },

    _start_timer: function() {
      var callback = function() {
        console.info('start timer callback invoked');
        this._rebuild_timer('0%');
        this.goto('next', function() {
          this.timer_progress = 0;
          this._start_timer();
        }.bind(this));
      }.bind(this);
      
      if (typeof this.timer_progress === 'undefined') {
        this.timer_progress = 0;
      }
      var timer_delay = this.settings.timer - (this.timer_progress * this.settings.timer);
      this.$timer.animate({'width': '100%'}, timer_delay, 'linear', callback);
    },

    _stop_timer: function() {
      this.timer_progress = this.$timer.width() / this.$timer.parent().width();
      this._rebuild_timer(this.timer_progress * 100 + '%');
      
    },

    _rebuild_timer: function(width) {
      // there is no way to stop Zepto animations,
      // so re-construct timer to get around this
      // limitation
      var $timer = $('<div class="orbit-timer"><span></span></div>');
      this.$timer.parent().remove();
      this.$container.append($timer);
      this.$timer = $timer.find('span');
      this.$timer.css('width', width);
    },

    goto: function(index_or_direction, callback) {
      if (this.$container.hasClass("orbit-transitioning")) {
        console.info('is transitioning');
        return false;
      }
      if (index_or_direction === 'prev') {
        if (this.activeIndex === 0) {
          this.activeIndex = this.$slides.length - 1;
        }
        else {
          this.activeIndex--;
        }
      }
      else if (index_or_direction === 'next') {
        this.activeIndex = (this.activeIndex+1)%this.$slides.length;
      }
      else if (typeof index_or_direction === 'number') {
        this.activeIndex = (index%this.$slides.length);
      }
      if (this.activeIndex === (this.$slides.length - 1) && index_or_direction === 'next') {
        this.$slides_container.css('marginLeft', '0%');
        this.activeIndex = 1;
      }
      else if (this.activeIndex === 0 && index_or_direction === 'prev') {
        this.$slides_container.css('marginLeft', '-' + (this.$slides.length - 1)*100 + '%');
        this.activeIndex = this.$slides.length - 2;
      }
      this.$container.addClass('orbit-transitioning');
      this.$slides_container.animate({
        'marginLeft' : '-' + (this.activeIndex*100) + '%'
      }, 'linear', this.settings.slide_delay, function() {
        this.$container.removeClass('orbit-transitioning');
        callback();
      }.bind(this));        

    }
  }

}(Foundation.zj, this, this.document));
