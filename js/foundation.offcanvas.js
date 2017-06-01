'use strict';

import $ from 'jquery';
import { Keyboard } from './foundation.util.keyboard';
import { MediaQuery } from './foundation.util.mediaQuery';
import { transitionend } from './foundation.util.core';
import { Plugin } from './foundation.plugin';

  // import "foundation.util.triggers.js";
  // TODO: Figure out what triggers import should actually do, given how indirect their use is

/**
 * OffCanvas module.
 * @module foundation.offcanvas
 * @requires foundation.util.keyboard
 * @requires foundation.util.mediaQuery
 * @requires foundation.util.triggers
 */

class OffCanvas extends Plugin {
  /**
   * Creates a new instance of an off-canvas wrapper.
   * @class
   * @fires OffCanvas#init
   * @param {Object} element - jQuery object to initialize.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  _setup(element, options) {
    this.$element = element;
    this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options);
    this.$lastTrigger = $();
    this.$triggers = $();
    this.position = 'left';
    this.$content = $();
    this.nested = !!(this.options.nested);
    this.$relativeParent;
    this.relativeScope = false;

    this._init();
    this._events();

    Keyboard.register('OffCanvas', {
      'ESCAPE': 'close'
    });

  }

  /**
   * Initializes the off-canvas wrapper by adding the exit overlay (if needed).
   * @function
   * @private
   */
  _init() {
    var id = this.$element.attr('id');

    this.$element.attr('aria-hidden', 'true');

    this.$element.addClass(`is-transition-${this.options.transition} is-closed`);

    // Find triggers that affect this element and add aria-expanded to them
    this.$triggers = $(document)
      .find('[data-open="'+id+'"], [data-close="'+id+'"], [data-toggle="'+id+'"]')
      .attr('aria-expanded', 'false')
      .attr('aria-controls', id);
    
    // Get position by checking for related CSS class
    this.position = this.$element.is('.position-left, .position-top, .position-right, .position-bottom') ? this.$element.attr('class').match(/position\-(left|top|right|bottom)/)[1] : this.position;

    // Find off-canvas content, either by ID (if specified), by siblings or by closest selector (fallback)
    if (this.options.contentId) {
      this.$content = $('#'+this.options.contentId);
    } else if (this.$element.siblings('[data-off-canvas-content]').length) {
      this.$content = this.$element.siblings('[data-off-canvas-content]').first();
    } else {
      this.$content = this.$element.closest('[data-off-canvas-content]').first();
    }

    if (!this.options.contentId) {
      // Assume that the off-canvas element is nested if it isn't a sibling of the content
      this.nested = this.$element.siblings('[data-off-canvas-content]').length === 0;
    } else if (this.options.contentId && this.options.nested === null) {
      // Warning if using content ID without setting the nested option
      // Once the element is nested it is required to work properly in this case
      console.warn('Remember to use the nested option if using the content ID option!');
    }

    // For a nested element, find closest (relative) positioned element
    if (this.nested) {
      this.$relativeParent = this.$element.offsetParent();
      // Initial adjustment of the element according to local scope
      this._adjustToLocalScope();
    }

    this.$content.addClass(`has-transition-${this.options.transition}`);

    // Add an overlay over the content if necessary
    if (this.options.contentOverlay === true) {
      var overlay = document.createElement('div');
      var overlayPosition = $(this.$element).css("position") === 'fixed' ? 'is-overlay-fixed' : 'is-overlay-absolute';
      overlay.setAttribute('class', 'js-off-canvas-overlay ' + overlayPosition);
      this.$overlay = $(overlay);
      if(overlayPosition === 'is-overlay-fixed') {
        $(this.$overlay).insertAfter(this.$element);
      } else {
        this.$content.append(this.$overlay);
      }
    }

    this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, 'g').test(this.$element[0].className);

    if (this.options.isRevealed === true) {
      this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];
      this._setMQChecker();
    }

    if (this.options.transitionTime) {
      this.$element.css('transition-duration', this.options.transitionTime);
    }

    this._setContentClasses();

    this._emulateFixedPosition(true);
  }

  /**
   * Adds event handlers to the off-canvas wrapper and the exit overlay.
   * @function
   * @private
   */
  _events() {
    var id = this.$element.attr('id');

    this.$element.off('.zf.trigger .zf.offcanvas').on({
      'open.zf.trigger': this.open.bind(this),
      'close.zf.trigger': this.close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
    });

    if (this.options.closeOnClick === true) {
      var $target = this.options.contentOverlay ? this.$overlay : this.$content;
      $target.on({'click.zf.offcanvas': this.close.bind(this)});
    }

    var resizeListener = this.resizeListener = `resize.zf.${id}`;
    var resizeTimeout;

    $(window).off(resizeListener).on(resizeListener, () => {
      // Delay as timeout to prevent too many calls on resizing
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        this._adjustToLocalScope();
        this._emulateFixedPosition(true);
      }, 250);
    });
  }

  /**
   * Applies event listener for elements that will reveal at certain breakpoints.
   * @private
   */
  _setMQChecker() {
    var _this = this;

    $(window).on('changed.zf.mediaquery', function() {
      if (MediaQuery.atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      } else {
        _this.reveal(false);
      }
    }).one('load.zf.offcanvas', function() {
      if (MediaQuery.atLeast(_this.options.revealOn)) {
        _this.reveal(true);
      }
    });
  }

  /**
   * Sets the CSS transition/position classes of the off-canvas content container.
   * Removing the classes is important when another off-canvas gets opened that uses the same content container.
   * @param {Boolean} hasReveal - true if related off-canvas element is revealed.
   * @private
   */
  _setContentClasses(hasReveal) {
    this.$content
      .removeClass('has-transition-push has-transition-overlap has-position-left has-position-top has-position-right has-position-bottom has-reveal-left has-reveal-top has-reveal-right has-reveal-bottom')
      .addClass(`has-transition-${this.options.transition} has-position-${this.position}`);

    if (hasReveal === true) {
      this.$content
        .addClass(`has-reveal-${this.position}`);
    }
  }

  /**
   * Adjust element's left position if relative parent is affecting local coords (left).
   * This is required if using a nested element within a push/pull column.
   * @private
   */
  _adjustToLocalScope() {
    if (this.nested) {
      // Check if relative parent is affecting local coords
      if (parseInt(this.$relativeParent.css('left')) > 0 || this.$relativeParent.offset().top > 0) {
        this.relativeScope = true;
        // Adjust element to local scope
        let xOffset = Math.ceil(parseFloat(this.$relativeParent.css('left'))) * (-1);
        switch (this.position) {
          case 'top':
            this.$element.css('left', xOffset).width($(window).width());
            break;
          case 'bottom':
            this.$element.css('left', xOffset).width($(window).width());
            break;
          case 'left':
            this.$element.css('left', xOffset);
            break;
        }
      } else {
        this.relativeScope = false;
        // Reset adjustment
        this.$element.css({
          'left': '',
          'width': ''
        });
      }
    }
  }

  /**
   * Emulate fixed position for a nested off-canvas element by using fixed height and current document scrollTop.
   * This is necessary due to the transform property of the content that creates a new local coordinate system.
   * @param  {Boolean} resetHeight - true if the element's height should be set as well (mostly on init and window resize)
   * @private
   */
  _emulateFixedPosition(resetHeight = false) {
    
    if (this.nested === true) {

      var topOffset = this.relativeScope ? this.$relativeParent.offset().top : 0;

      if (this.position === 'top') {
        
        this.$element.css('top', $(document).scrollTop() - topOffset);

      } else if (this.position === 'bottom') {

        this.$element.css('top', $(document).scrollTop() + $(window).height() - this.$element.outerHeight() - topOffset);

      } else { // left|right

        this.$element.css('top', $(document).scrollTop() - topOffset);
      
        if (resetHeight === true) {
          this.$element.height( $(window).height() );
        }
      }
    }
  }

  /**
   * Handles the revealing/hiding the off-canvas at breakpoints, not the same as open.
   * @param {Boolean} isRevealed - true if element should be revealed.
   * @function
   */
  reveal(isRevealed) {
    var $closer = this.$element.find('[data-close]');
    if (isRevealed) {
      this.close();
      this.isRevealed = true;
      this.$element.attr('aria-hidden', 'false');
      this.$element.off('open.zf.trigger toggle.zf.trigger');
      this.$element.removeClass('is-closed');
      if ($closer.length) { $closer.hide(); }
    } else {
      this.isRevealed = false;
      this.$element.attr('aria-hidden', 'true');
      this.$element.off('open.zf.trigger toggle.zf.trigger').on({
        'open.zf.trigger': this.open.bind(this),
        'toggle.zf.trigger': this.toggle.bind(this)
      });
      this.$element.addClass('is-closed');
      if ($closer.length) {
        $closer.show();
      }
    }
    this._setContentClasses(isRevealed);
  }

  /**
   * Stops scrolling of the body when offcanvas is open on mobile Safari and other troublesome browsers.
   * @private
   */
  _stopScrolling(event) {
    return false;
  }

  // Taken and adapted from http://stackoverflow.com/questions/16889447/prevent-full-page-scrolling-ios
  // Only really works for y, not sure how to extend to x or if we need to.
  _recordScrollable(event) {
    let elem = this; // called from event handler context with this as elem

     // If the element is scrollable (content overflows), then...
    if (elem.scrollHeight !== elem.clientHeight) {
      // If we're at the top, scroll down one pixel to allow scrolling up
      if (elem.scrollTop === 0) {
        elem.scrollTop = 1;
      }
      // If we're at the bottom, scroll up one pixel to allow scrolling down
      if (elem.scrollTop === elem.scrollHeight - elem.clientHeight) {
        elem.scrollTop = elem.scrollHeight - elem.clientHeight - 1;
      }
    }
    elem.allowUp = elem.scrollTop > 0;
    elem.allowDown = elem.scrollTop < (elem.scrollHeight - elem.clientHeight);
    elem.lastY = event.originalEvent.pageY;
  }

  _stopScrollPropagation(event) {
    let elem = this; // called from event handler context with this as elem
    let up = event.pageY < elem.lastY;
    let down = !up;
    elem.lastY = event.pageY;

    if((up && elem.allowUp) || (down && elem.allowDown)) {
      event.stopPropagation();
    } else {
      event.preventDefault();
    }
  }

  /**
   * Opens the off-canvas menu.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   * @fires OffCanvas#opened
   */
  open(event, trigger) {
    if (this.$element.hasClass('is-open') || this.isRevealed) { return; }
    var _this = this;

    if (trigger) {
      this.$lastTrigger = trigger;
    }

    if (this.options.forceTo === 'top') {
      window.scrollTo(0, 0);
    } else if (this.options.forceTo === 'bottom') {
      window.scrollTo(0,document.body.scrollHeight);
    }

    if (this.options.transitionTime && this.options.transition !== 'overlap') {
      this.$element.siblings('[data-off-canvas-content]').css('transition-duration', this.options.transitionTime);
    } else {
      this.$element.siblings('[data-off-canvas-content]').css('transition-duration', '');
    }

    this._adjustToLocalScope();
    this._emulateFixedPosition();

    /**
     * Fires when the off-canvas menu opens.
     * @event OffCanvas#opened
     */
    _this.$element.addClass('is-open').removeClass('is-closed');

    this.$triggers.attr('aria-expanded', 'true');
    this.$element.attr('aria-hidden', 'false')
        .trigger('opened.zf.offcanvas');
    
    this.$content.addClass('is-open-' + this.position);

    // If `contentScroll` is set to false, add class and disable scrolling on touch devices.
    // If off-canvas element is nested, force `contentScroll` false.
    if (this.options.contentScroll === false || this.nested === true) {
      $('body').addClass('is-off-canvas-open').on('touchmove', this._stopScrolling);
      this.$element.on('touchstart', this._recordScrollable);
      this.$element.on('touchmove', this._stopScrollPropagation);
    }

    if (this.options.contentOverlay === true) {
      this.$overlay.addClass('is-visible');
    }

    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.addClass('is-closable');
    }

    if (this.options.autoFocus === true) {
      this.$element.one(transitionend(this.$element), function() {
        if (!_this.$element.hasClass('is-open')) {
          return; // exit if prematurely closed
        }
        var canvasFocus = _this.$element.find('[data-autofocus]');
        if (canvasFocus.length) {
            canvasFocus.eq(0).focus();
        } else {
            _this.$element.find('a, button').eq(0).focus();
        }
      });
    }

    if (this.options.trapFocus === true) {
      this.$content.attr('tabindex', '-1');
      Keyboard.trapFocus(this.$element);
    }

    this._setContentClasses();
  }

  /**
   * Closes the off-canvas menu.
   * @function
   * @param {Function} cb - optional cb to fire after closure.
   * @fires OffCanvas#closed
   */
  close(cb) {
    if (!this.$element.hasClass('is-open') || this.isRevealed) { return; }

    var _this = this;

    _this.$element.removeClass('is-open');

    this.$element.attr('aria-hidden', 'true')
      /**
       * Fires when the off-canvas menu opens.
       * @event OffCanvas#closed
       */
        .trigger('closed.zf.offcanvas');

    this.$content.removeClass('is-open-left is-open-top is-open-right is-open-bottom');

    // If `contentScroll` is set to false, remove class and re-enable scrolling on touch devices.
    // // If off-canvas element is nested, force `contentScroll` false.
    if (this.options.contentScroll === false || this.nested === true) {
      $('body').removeClass('is-off-canvas-open').off('touchmove', this._stopScrolling);
      this.$element.off('touchstart', this._recordScrollable);
      this.$element.off('touchmove', this._stopScrollPropagation);
    }

    if (this.options.contentOverlay === true) {
      this.$overlay.removeClass('is-visible');
    }

    if (this.options.closeOnClick === true && this.options.contentOverlay === true) {
      this.$overlay.removeClass('is-closable');
    }

    this.$triggers.attr('aria-expanded', 'false');

    if (this.options.trapFocus === true) {
      this.$content.removeAttr('tabindex');
      Keyboard.releaseFocus(this.$element);
    }

    // Listen to transitionEnd of content container and add class when done.
    // The listener is not assigned to the off-canvas element itself because it doesn't transform if nested (push).
    this.$content.on(Foundation.transitionend(this.$content), function(e) {
      if (e.originalEvent.propertyName.match(/transform/i)) {
        _this.$element.addClass('is-closed');
        _this.$content.off(Foundation.transitionend(_this.$content));
      }
    });
  }

  /**
   * Toggles the off-canvas menu open or closed.
   * @function
   * @param {Object} event - Event object passed from listener.
   * @param {jQuery} trigger - element that triggered the off-canvas to open.
   */
  toggle(event, trigger) {
    if (this.$element.hasClass('is-open')) {
      this.close(event, trigger);
    }
    else {
      this.open(event, trigger);
    }
  }

  /**
   * Handles keyboard input when detected. When the escape key is pressed, the off-canvas menu closes, and focus is restored to the element that opened the menu.
   * @function
   * @private
   */
  _handleKeyboard(e) {
    Keyboard.handleKey(e, 'OffCanvas', {
      close: () => {
        this.close();
        this.$lastTrigger.focus();
        return true;
      },
      handled: () => {
        e.stopPropagation();
        e.preventDefault();
      }
    });
  }

  /**
   * Destroys the offcanvas plugin.
   * @function
   */
  _destroy() {
    this.close();
    this.$element.off('.zf.trigger .zf.offcanvas');
    this.$overlay.off('.zf.offcanvas');
    $(window).off(this.resizeListener);
  }
}

OffCanvas.defaults = {
  /**
   * Allow the user to click outside of the menu to close it.
   * @option
   * @type {boolean}
   * @default true
   */
  closeOnClick: true,

  /**
   * Adds an overlay on top of `[data-off-canvas-content]`.
   * @option
   * @type {boolean}
   * @default true
   */
  contentOverlay: true,

  /**
   * Target an off-canvas content container by ID that may be placed anywhere. If null the closest content container will be taken. 
   * @option
   * @type {?string}
   * @default null
   */
  contentId: null,

  /**
   * Define the off-canvas element is nested in an off-canvas content. This is required when using the contentId option for a nested element.
   * @option
   * @type {boolean}
   * @default null
   */
  nested: null,

  /**
   * Enable/disable scrolling of the main content when an off canvas panel is open.
   * @option
   * @type {boolean}
   * @default true
   */
  contentScroll: true,

  /**
   * Amount of time in ms the open and close transition requires. If none selected, pulls from body style.
   * @option
   * @type {number}
   * @default null
   */
  transitionTime: null,

  /**
   * Type of transition for the offcanvas menu. Options are 'push', 'detached' or 'slide'.
   * @option
   * @type {string}
   * @default push
   */
  transition: 'push',

  /**
   * Force the page to scroll to top or bottom on open.
   * @option
   * @type {?string}
   * @default null
   */
  forceTo: null,

  /**
   * Allow the offcanvas to remain open for certain breakpoints.
   * @option
   * @type {boolean}
   * @default false
   */
  isRevealed: false,

  /**
   * Breakpoint at which to reveal. JS will use a RegExp to target standard classes, if changing classnames, pass your class with the `revealClass` option.
   * @option
   * @type {?string}
   * @default null
   */
  revealOn: null,

  /**
   * Force focus to the offcanvas on open. If true, will focus the opening trigger on close.
   * @option
   * @type {boolean}
   * @default true
   */
  autoFocus: true,

  /**
   * Class used to force an offcanvas to remain open. Foundation defaults for this are `reveal-for-large` & `reveal-for-medium`.
   * @option
   * @type {string}
   * @default reveal-for-
   * @todo improve the regex testing for this.
   */
  revealClass: 'reveal-for-',

  /**
   * Triggers optional focus trapping when opening an offcanvas. Sets tabindex of [data-off-canvas-content] to -1 for accessibility purposes.
   * @option
   * @type {boolean}
   * @default false
   */
  trapFocus: false
}

export {OffCanvas};
