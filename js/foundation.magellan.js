/**
 * Magellan module.
 * @module foundation.magellan
 * @requires foundation.util.animationFrame
 */
!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Magellan.
   * @class
   * @fires Magellan#init
   * @param {Object} element - jQuery object to add the trigger to.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Magellan(element, options) {
    this.$element = element;
    this.options  = $.extend({}, Magellan.defaults, options);
    // this.$window  = $(window);
    // this.name     = 'magellan';
    // this.attr     = 'data-magellan';
    // this.attrArrival  = 'data-magellan-target';

    this._init();

    Foundation.registerPlugin(this);
    // /**
    //  * Fires when the plugin has been successfuly initialized.
    //  * @event Magellan#init
    //  */
    // this.$element.trigger('init.zf.magellan');
  };

  /**
   * Default settings for plugin
   */
  Magellan.defaults = {
    animationDuration: 500,
    animationEasing: 'linear',
    threshold: 150,
    activeClass: 'active'
  };

  /**
   * Initializes the Magellan plugin and calls functions to get equalizer functioning on load.
   * @private
   */
  Magellan.prototype._init = function() {
    var id = this.$element[0].id || Foundation.GetYoDigits(6, 'magellan'),
        _this = this;
    this.$targets = $('[data-magellan-target]');
    this.$links = this.$element.find('a');
    this.$element.attr({
      'data-resize': id,
      'data-scroll': id,
      'id': id
    });
    this.$active = $();
    this.scrollPos = window.scrollY;

    this._calcPoints();
    this._events();

    setTimeout(function(){
    _this.updateActive();
    },500);
  };
  Magellan.prototype._calcPoints = function(){
    var _this = this,
        body = document.body,
        html = document.documentElement;
    this.points = [];
    this.winHeight = Math.round(Math.max(window.innerHeight, document.body.clientHeight));
    this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
    this.$targets.each(function(){
      var $tar = $(this),
          pt = $tar.offset().top - _this.options.threshold;
      $tar.targetPoint = pt;
      _this.points.push(pt);
    });
    // console.log(this.winHeight, this.docHeight);
  };
  /**
   * Initializes events for Magellan.
   * @private
   */
  Magellan.prototype._events = function() {
    var _this = this,
        $body = $('html, body');
    this.$element.on({
      'resizeme.zf.trigger': this._reflow.bind(this),
      'scrollme.zf.trigger': this.updateActive.bind(this)
    })
      .on('click.fndtn.magellan', 'a[href^="#"]', function(e) {
        e.preventDefault();
        // include animation settings
        // var arrival   = $(this).attr('href'),
            // console.log(this.getAttribute('href'));
        var arrival   = this.getAttribute('href'),
            // navOffset = _this.$element.height();
            scrollPos = $(arrival).offset().top - _this.options.threshold;


        Foundation.Move(_this.options.animationDuration, $body, function(){
          $body.animate({
            scrollTop: scrollPos
            // scrollTop: $(arrival).offset().top - _this.options.threshold
          },
          {
            duration: _this.options.animationDuration,
            easing:   _this.options.animationEasing
            // complete: function(){
            //   console.log(window.location.hash, arrival);
            //   window.location.hash = arrival;
            // }
          });
          window.location.hash = arrival;
        });

      });
  };
  /**
   * Calls necessary functions to update Magellan upon DOM change
   * @private
   */
  Magellan.prototype._reflow = function() {
  };
  Magellan.prototype.updateActive = function(evt, elem, scrollPos){
    var winPos = scrollPos || window.scrollY,
        // idx = this.$links.index(this.$active),x
        isDown = this.scrollPos < winPos,
        _this = this,
        curVisible = this.points.filter(function(p, i){

          return isDown ? p <= winPos : p - _this.options.threshold <= winPos;//&& winPos >= _this.points[i -1] - _this.options.threshold;
        }),
        curIdx = curVisible.length ? curVisible.length - 1 : 0;

    this.$active.removeClass(this.options.activeClass);
    this.$active = this.$links.eq(curIdx).addClass(this.options.activeClass);
    window.location.hash = this.$active[0].getAttribute('href');
    this.scrollPos = winPos;
  };
  /**
   * Detects the arrival sections and adds the active class to the magellan navigation bar
   */
  // Magellan.prototype.updateActiveClass = function() {
  //   // var windowPosition = this.$window.scrollTop(),
  //   var windowPosition = window.scrollY,
  //       arrivals       = $('[' + this.attrArrival + ']'),
  //       // for sensitivty to trigger the active class, either use the specified
  //       // threshold amount, or use the height of the nav item plus a little wiggle room
  //       threshold      = this.options.threshold || this.$element.height() + 50,
  //       magellanNav    = this.$element,
  //       _this          = this;
  //       // console.log(windowPosition);
  //   if (windowPosition + this.$window.height() === $(document).height()) {
  //     magellanNav.find('a').removeClass(_this.options.activeClass);
  //     magellanNav.find('a').last().addClass(_this.options.activeClass);
  //     return;
  //   }
  //   arrivals.each(function() {
  //     var arrivalTop = $(this).offset().top - threshold,
  //         arrivalEnd = arrivalTop + $(this).height();
  //
  //     if (windowPosition >= arrivalTop && windowPosition <= arrivalEnd) {
  //       magellanNav.find('a').removeClass(_this.options.activeClass);
  //
  //       // this feature causes a bit of jumpiness
  //       // window.location.hash = $(this).attr('id');
  //       // find the corresponding hash/id of the section
  //       var activeTarget = magellanNav.find('a[href=#' + $(this).attr('id') +']');
  //       activeTarget.addClass(_this.options.activeClass);
  //     }
  //   })
  // };

  Foundation.plugin(Magellan);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Magellan;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Magellan;
    });

}(Foundation, jQuery);
