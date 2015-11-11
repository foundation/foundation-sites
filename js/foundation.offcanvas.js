/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.triggers
 * @requires foundation.util.animationFrame
 */
!function($, Foundation) {

'use strict';

/**
 * Creates a new instance of an off-canvas wrapper.
 * @class
 * @fires OffCanvas#init
 * @param {Object} element - jQuery object to initialize.
 * @param {Object} options - Overrides to the default plugin settings.
 */
function OffCanvas(element, options) {
  this.$element = element;
  this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options);
  this.$lastTrigger = $();

  this._init();
  this._events();

  Foundation.registerPlugin(this);
}

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @example true
   */
  closeOnClick: true,
  transitionTime: 0,
  position: 'left',
  forceTop: false,
  isSticky: true,
  isRevealed: false,
  revealOn: null
};

/**
 * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
 * @function
 * @private
 */
OffCanvas.prototype._init = function() {
  var id = this.$element.attr('id');

  this.$element.attr('aria-hidden', 'true');

  // Find triggers that affect this element and add aria-expanded to them
  $(document)
    .find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]')
    .attr('aria-expanded', 'false')
    .attr('aria-controls', id);

  // Add a close trigger over the body if necessary
  if (this.options.closeOnClick){
    if($('.js-off-canvas-exit').length){
      this.$exiter = $('.js-off-canvas-exit');
    }else{
      var exiter = document.createElement('div');
      exiter.setAttribute('class', 'js-off-canvas-exit');
      $('[data-off-canvas-content]').append(exiter);

      this.$exiter = $(exiter);
    }
  }
  this.options.isRevealed = /(reveal-for-)/g.test(this.$element[0].className);
  if(this.options.isRevealed){
    this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];
    this._setMQChecker();
  }
  if(!this.options.transitionTime){
    this.options.transitionTime = parseFloat(window.getComputedStyle(document.body).transitionDuration, 10);
  }
};

/**
 * Adds event handlers to the off-canvas wrapper and the exit overlay.
 * @function
 * @private
 */
OffCanvas.prototype._events = function() {
  this.$element.on({
    'open.zf.trigger': this.open.bind(this),
    'close.zf.trigger': this.close.bind(this),
    'toggle.zf.trigger': this.toggle.bind(this),
    'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
  });

  $(window).on('close.zf.offcanvas', this.close.bind(this));

  if (this.$exiter) {
    this.$exiter.on('click.zf.offcanvas', function() {
      $(window).trigger('close.zf.offcanvas');
    });
  }
};
OffCanvas.prototype._setMQChecker = function(){
  var _this = this;

  $(window).on('changed.zf.mediaquery', function(){
    if(Foundation.MediaQuery.atLeast(_this.options.revealOn)){
      _this.reveal(true);
    }else{
      _this.reveal(false);
    }
  }).one('load.zf.offcanvas', function(){
    if(Foundation.MediaQuery.atLeast(_this.options.revealOn)){
      _this.reveal(true);
    }
  });
};
OffCanvas.prototype.reveal = function(isRevealed){
  var closer = this.$element.find('[data-close]');
  if(isRevealed){
    if(!this.options.forceTop){
      var scrollPos = parseInt(window.pageYOffset);
      this.$element[0].style.transform = 'translate(0,' + scrollPos + 'px)';
    }
    if(this.options.isSticky){ this.stick(); }
    if(closer.length){ closer.hide(); }
  }else{
    if(this.options.isSticky || !this.options.forceTop){
      this.$element[0].style.transform = '';
      $(window).off('scroll.zf.offcanvas');
    }
    if(closer.length){
      closer.show();
    }
  }
};

/**
 * Opens the off-canvas menu.
 * @function
 * @fires OffCanvas#opened
 */
OffCanvas.prototype.open = function(event, trigger) {
  if (this.$element.hasClass('is-open')) return;
  var _this = this;

  if(!this.options.forceTop){
    var scrollPos = parseInt(window.pageYOffset);
    this.$element[0].style.transform = 'translate(0,' + scrollPos + 'px)';
    if(this.$exiter.length){
      this.$exiter[0].style.transform = 'translate(0,' + scrollPos + 'px)';
    }
  }
  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#opened
   */
  Foundation.Move(this.options.transitionTime, this.$element, function(){
    $('body').addClass('is-off-canvas-open is-open-'+ _this.options.position);

    _this.$element
      .addClass('is-open')
      .attr('aria-hidden', 'false')
      // .find('a, button').eq(0).focus().end().end()
      .trigger('opened.zf.offcanvas');
      setTimeout(function(){
        console.log(_this.$element.find('a, button'));
        _this.$element.find('a, button').eq(0).focus();
      }, 10);

    if(_this.options.isSticky){
      _this.stick();
    }
  });
  if(trigger){
    this.$lastTrigger = trigger.attr('aria-expanded', 'true');
  }
};
OffCanvas.prototype.stick = function(){
  var elStyle = this.$element[0].style,
      exitStyle = this.$exiter[0].style || null,
      isVis = this.$exiter.is(':visible');


  $(window).on('scroll.zf.offcanvas', function(){
    var pageY = window.pageYOffset;
    elStyle.transform = 'translate(0,' + pageY + 'px)';
    if(exitStyle && isVis){ exitStyle.transform = 'translate(0,' + pageY + 'px)'; }
  });
  this.$element.trigger('stuck.zf.offcanvas');
};
/**
 * Closes the off-canvas menu.
 * @function
 * @fires OffCanvas#closed
 */
OffCanvas.prototype.close = function() {
  if (!this.$element.hasClass('is-open')) return;

  var _this = this;

  /**
   * Fires when the off-canvas menu opens.
   * @event OffCanvas#closed
   */
   Foundation.Move(this.options.transitionTime, this.$element, function(){

    $('body').removeClass('is-off-canvas-open is-open-'+_this.options.position);

    _this.$element
      .removeClass('is-open')
      .attr('aria-hidden', 'true')
      .trigger('closed.zf.offcanvas');

    if(_this.options.isSticky || !_this.options.forceTop){
      _this.$element[0].style.transform = '';
      $(window).off('scroll.zf.offcanvas');
    }
  });

  this.$lastTrigger.attr('aria-expanded', 'false');
};

/**
 * Toggles the off-canvas menu open or closed.
 * @function
 */
OffCanvas.prototype.toggle = function(event, trigger) {
  if (this.$element.hasClass('is-open')) {
    this.close(event, trigger);
  }
  else {
    this.open(event, trigger);
  }
};

/**
 * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
 * @function
 * @private
 */
OffCanvas.prototype._handleKeyboard = function(event) {
  if (event.which !== 27) return;

  event.stopPropagation();
  event.preventDefault();
  this.close();
  this.$lastTrigger.focus();
};

Foundation.plugin(OffCanvas);

}(jQuery, Foundation);
