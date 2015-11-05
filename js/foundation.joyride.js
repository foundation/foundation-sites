/**
 * Joyride module.
 * @module foundation.joyride
 * @requires foundation.util.keyboard
 * @requires foundation.Tooltip
 * @requires foundation.Reveal
 */
!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Joyride.
   * @class
   * @fires Joyride#init
   * @param {Object} element - jQuery object (list) to be used as the structure.
   * @param {Object} options - object to extend the default configuration.
   */

  function Joyride(element, options) {
    this.$element = element;
    this.options = $.extend({}, Joyride.defaults, this.$element.data(), options || {});
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Joyride#init
     */
    this.$element.trigger('init.zf.joyride');
  }

  Joyride.defaults = {
    autostart: false,
    scrollSpeed: 1000,
    keyboardAccess: true,
    closable: true,
    nextText: 'Next',
    prevText: 'Previous',
    closeText: 'Close',
    showNext: true,
    showPrev: true,
    vOffset: 10,
    hOffset: 12,
    scrollOffset: 50,
    position: 'top center',
    templates : { // HTML templates
      closeButton: '<a href="#close" class="close" data-joyride-close><span aria-hidden="true">&times</span><span class="show-for-sr"></span></a>',
      nextButton: '<button class="button" data-joyride-next></button>',
      prevButton: '<button class="button" data-joyride-prev></button>',
    }
  };

  /**
   * Initializes the joyride by rendering required markup
   * @private
   */
  Joyride.prototype._init = function(){
    this.id = this.$element.attr('id') || Foundation.GetYoDigits(6, 'joyride');
    this.current = 0;
    this.$items = $([]); // initialize empty collection
    this.structure = this._parseList();
    this._render(this.structure);
    this._events();

    if (this.options.autostart) {
      this.start();
    }
  };

  /**
   * Parses the list of the instance, stored in $element.
   * @private
   * @return {Array} structure
   */
  Joyride.prototype._parseList = function(){
    var structure = [];
    this.$element.find('li').each(function(i) {
      var item = $.extend({}, {
        text: $(this).html(),
        $target: $($(this).data('target')),
        isModal: !!!$($(this).data('target')).length,
        closable: Joyride.defaults.closable
      }, $(this).data());
      structure.push(item);
    });
    return structure;
  };

  /**
   * Creates the markup for the items
   * @private
   * @param {Array} structure the joyride's structure from _parseList
   * @return {Object} markup jQuery representation of the generated markup
   */
  Joyride.prototype._render = function(structure) {
    for (var s in structure) {
      var options = $.extend({}, this.options, structure[s]),// if specifc item has config, this should overwrite global settings
        $item;

      if (options.$target.length) { // target element exists, create tooltip
        var tooltip = new Foundation.Tooltip(structure[s].$target, {
          positionClass: options.position,
          disableHover: true,
          clickOpen: false,
          tooltipClass: 'tooltip joyride',
          triggerClass: '',
          hOffset: this.options.hOffset,
          vOffset: this.options.vOffset
        });
        this.structure[s].item = tooltip;
        $item = tooltip.template;

      } else { // not target, create modal with Reveal
        var modal = new Foundation.Reveal($('<div class="reveal joyride"/>').appendTo($('body')));
        this.structure[s].item = modal;
        $item = modal.$element;
      }
      $item.attr({
        'data-index': s,
        'data-joyride-for': structure[s].target
      })
      .html(structure[s].text);
      if (options.keyboardAccess) {
        $item.attr('tabindex', '-1');
      }

      this.$items = this.$items.add($item);

      // add buttons
      if (
        (structure[s].nextText || (options.showNext && s < structure.length -1))
        || (structure[s].prevText || (options.showPrev && s > 0))
      ) {
        var $buttons = $('<div class="joyride-buttons"/>');
        if (structure[s].prevText || (options.showPrev && s > 0)) {
          $buttons.append($(this.options.templates.prevButton).text(options.prevText));
        }
        if (structure[s].nextText || (options.showNext && s < structure.length -1)) {
          $buttons.append($(this.options.templates.nextButton).text(options.nextText));
        }
        $item.append($buttons);
      }

      // add close button
      if (options.closable) {
        var $close = $(this.options.templates.closeButton);
        $close.find('.show-for-sr').text(this.options.closeText);
        $item.prepend($close);
      }
    }
  };

  /**
   * Shows the item with the given index
   * @private
   * @param {Number} index of the item to be displayed
   */
  Joyride.prototype._showItem = function(index) {
    if (this.structure[index].isModal) {
      this.structure[index].item._open();
    } else {
      this.structure[index].item._show();
    }
    // scroll target into view if target exists
    if (this.structure[index].$target.length) {
      $('html, body').stop().animate({
        'scrollTop': Math.max(0, this.$items.eq(index).offset().top - this.options.scrollOffset)
      }, this.options.scrollSpeed);
    }
    if (this.options.keyboardAccess) {
       this.$items.eq(index).focus();
    }
    this.current = index;
  };

  /**
   * Hides the item with the given index
   * @private
   * @param {Number} index of the item to be hidden
   */
  Joyride.prototype._hideItem = function(index) {
    if (this.structure[index].isModal) {
      this.structure[index].item._close();
    } else {
      this.structure[index].item._hide();
    }
  };
  /**
   * Hides all items
   * @private
   */
  Joyride.prototype._hideAll = function() {
    for (var s in this.structure) {
      this._hideItem(s);
    }
  };

  /**
   * Shows the next item in the ride
   * @private
   */
  Joyride.prototype.showNext = function() {
    this._hideItem(this.current);
    this._showItem(this.current + 1);
  };

  /**
   * Shows the previous item in the ride
   * @private
   */
  Joyride.prototype.showPrev = function() {
    this._hideItem(this.current);
    this._showItem(this.current - 1);
  };

  /**
   * Starts the ride
   * @private
   * @return {Number} index - the index where to start, 0 by default
   */
  Joyride.prototype.start = function(index) {
    var index = index || 0;
    this._hideAll();
    this._showItem(index);
  };

  /**
   * Adds event handlers for the modal.
   * @private
   */
  Joyride.prototype._events = function(){
    var _this = this;
    $('[data-joyride-start="#'+_this.id+'"]').click(function() {
      console.log('Starting!');
      _this.start();
    });

    this.$items.on('click.zf.joyride', '[data-joyride-next]', function(e) {
      _this.showNext();
    }).on('click.zf.joyride', '[data-joyride-prev]', function(e) {
      _this.showPrev();
    }).on('click.zf.joyride', '[data-joyride-close]', function(e) {
      e.preventDefault();
      if (_this.structure[_this.current].closable) {
        _this._hideItem(_this.current);
      }
    }).on('keydown.zf.joyride', function(e) {
      var $element = $(this);
      Foundation.handleKey(e, _this, {
        next: function() {
          if ($element.data('index') < _this.structure.length - 1) {
            this.showNext();
          }
        },
        previous: function() {
          if ($element.data('index') > 0) {
            this.showPrev();
          }
        },
        close: function() {
          if (this.structure[this.current].closable) {
            this._hideItem(this.current);
          }
        },
        handled: function() {
          e.preventDefault();
        }
      });
    });
  };

  /**
   * Destroys an instance of a Joyride.
   * @fires Joyride#destroyed
   */
  Joyride.prototype.destroy = function() {
    this.$element.hide();
    this.$items.destroy();
    /**
     * Fires when the plugin has been destroyed.
     * @event Joyride#destroyed
     */
    this.$element.trigger('destroyed.zf.joyride');
  }

  Foundation.plugin(Joyride);

  // Exports for AMD/Browserify
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = Joyride;
  if (typeof define === 'function')
    define(['foundation'], function() {
      return Joyride;
    });

}(Foundation, jQuery);
