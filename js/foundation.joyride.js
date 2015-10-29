/**
 * Joyride module.
 * @module foundation.joyride
 * @requires foundation.util.keyboard
 * @requires foundation.util.size-and-collision
 * @requires foundation.util.triggers
 * @requires foundation.util.mediaQuery
 */
!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Joyride.
   * @class
   * @fires Joyride#init
   * @param {Object} element - jQuery object (ol) to be used as the structure.
   */

  function Joyride(element) {
    this.$element = element;
    this.options = $.extend({}, Joyride.defaults, this.$element.data());
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Reveal#init
     */
    this.$element.trigger('init.zf.joyride');
  }

  Joyride.defaults = {
    autostart: false,
    scrollSpeed: 1500,
    keyboardAccess: true,
    closable: true,
    nextText: 'Next',
    prevText: 'Previous',
    showNext: true,
    showPrev: true,
    vOffset: 10,
    hOffset: 10,
    position: 'center top',
    template : { // HTML segments for tip layout
      link          : '<a href="#close" class="joyride-close-tip"><&times;</a>',
      timer         : '<div class="joyride-timer-indicator-wrap"><span class="joyride-timer-indicator"></span></div>',
      tip           : '<div class="joyride-tip-guide"><span class="joyride-nub"></span></div>',
      wrapper       : '<div class="joyride-content-wrapper"></div>',
      button        : '<a href="#" class="small button joyride-next-tip"></a>',
      prev_button   : '<a href="#" class="small button joyride-prev-tip"></a>',
      modal         : '<div class="joyride-modal-bg"></div>',
      expose        : '<div class="joyride-expose-wrapper"></div>',
      expose_cover  : '<div class="joyride-expose-cover"></div>'
    }
  };

  /**
   * Initializes the joyride by rendering required markup
   * @private
   */
  Joyride.prototype._init = function(){
    var anchorId = Foundation.GetYoDigits(6, 'joyride');

    this.id = this.$element.attr('id');

    this.structure = this._parseList();
    this.$container = this._createMarkup(this.structure);
    this._render();
    console.log(this);

    if (this.options.autostart) {
      this.start();
    }

    this._events();
  };

  /**
   * Parses the ol of the instance, stored in $element.
   * @private
   * @return [Array] structure
   */
  Joyride.prototype._parseList = function(){
    var $ol = this.$element,
      structure = [];
      
    this.$element.find('li').each(function(i) {
      var item = $.extend({}, {
        text: $(this).html(),
        class: $(this).attr('class'),
        $target: $($(this).data('target'))
      }, $(this).data());
      structure.push(item);
    });
    return structure;
  };

  /**
   * Creates the markup for the items
   * @private
   * @param [Array] structure the joyride's structure from _parseList
   * @return {Object} markup jQuery representation of the generated markup
   */
  Joyride.prototype._createMarkup = function(structure) {
    var $container = $('<div class="joyride-container" />');
      
    for (var s in structure) {
      var options = $.extend({}, this.options, structure[s]); // if specifc item has config, this should overwrite global settings
      console.log(options);

      var $item = $('<div class="joyride-item" data-index="'+s+'" data-joyride-for="'+structure[s].target+'" />');
      $item.html(structure[s].text);

      // add buttons
      if (
        (structure[s].nextText || (options.showNext && s < structure.length -1))
        || (structure[s].prevText || (options.showPrev && s > 0))
      ) {
        var $buttons = $('<div />');
        if (structure[s].prevText || (options.showPrev && s > 0)) {
          $buttons.append('<button class="button joyride-prev" data-joyride-prev>'+(options.prevText)+'</button>');
        }
        if (structure[s].nextText || (options.showNext && s < structure.length -1)) {
          $buttons.append('<button class="button joyride-next" data-joyride-next>'+(options.nextText)+'</button>');
        }
        $item.append($buttons);
      }

      // add close button
      if (options.closable) {
        var $close = $('<a class="close" role="button" href="#" data-joyride-close><span aria-hidden="true">&times</span><span class="show-for-sr">Close</span">');
        $item.prepend($close);
      }

      var className = 'top';
      if (options.position.indexOf('left') !== -1) {
        className = 'left';
      } else if (options.position.indexOf('right') !== -1) {
        className = 'right';
      } else if (options.position.indexOf('bottom') !== -1) {
        className = 'bottom';
      }
      $item.addClass(className);

      if (options.keyboardAccess) {
        $item.attr('tabindex', '-1');
      }
      $item.appendTo($container);
    }

    return $container;
  };

  /**
   * Renders the $container after the $element
   * @private
   * @return {Object} jQuery object containing the rendered markup
   */
  Joyride.prototype._render = function() {
    return (this.$element.after(this.$container));
  };

  /**
   * Shows the item with the given index
   * @private
   * @param {Number} index of the item to be displayed
   */
  Joyride.prototype._showItem = function(index) {
    var item = this.structure[index] || this.structure[0],
      bodyRect = document.body.getBoundingClientRect(),
      elemRect = item.$target[0].getBoundingClientRect(),
      posY = item.$target.offset().top,
      posX = item.$target.offset().left,
      $item = this.$container.find('[data-index="'+index+'"]');

    $item.css('visibility', 'hidden').show()
      .offset(Foundation.GetOffsets($item, item.$target, this.options.position, this.options.vOffset, this.options.hOffset, true))
      .css('visibility', '');

    if (this.options.keyboardAccess) {
      $item.focus();
    }

    // scroll to the items position
    $('html, body').stop().animate({'scrollTop': $item.offset().top}, this.options.scrollSpeed);

    this.current = index;
  };

  /**
   * Hides the item with the given index
   * @private
   * @param {Number} index of the item to be hidden
   */
  Joyride.prototype._hideItem = function(index) {
    var item = this.structure[index] || this.structure[0],
      $item = this.$container.find('[data-index="'+index+'"]');

    $item.stop().hide().css('visibility', '')
  };

  /**
   * Hides all items
   * @private
   */
  Joyride.prototype._hideAll = function() {
    var $item = this.$container.find('.joyride-item');

    $item.stop().hide().css('visibility', '')
  };

  /**
   * Shows the next item in the ride
   * @private
   */
  Joyride.prototype.showNext = function() {
    var index = this.current;
    this._hideItem(index);
    this._showItem(index + 1);
  };

  /**
   * Shows the previous item in the ride
   * @private
   */
  Joyride.prototype.showPrev = function() {
    var index = this.current;
    this._hideItem(index);
    this._showItem(index - 1);
  };

  /**
   * Starts the ride
   * @private
   * @return int index - the index where to start, 0 by default
   */
  Joyride.prototype.start = function(index) {
    var index = index || 0;
    this._showItem(index);
  };

  /**
   * Adds event handlers for the modal.
   * @private
   */
  Joyride.prototype._events = function(){
    var _this = this;

    /*this.$element.on({
      'open.zf.trigger': this._open.bind(this),
      'close.zf.trigger': this._close.bind(this),
      'toggle.zf.trigger': this.toggle.bind(this),
      'resizeme.zf.trigger': function(){
        if(_this.$element.is(':visible')){
          _this._setPosition(function(){});
        }
      }
    });*/

    this.$container.on('click.zf.joyride', '[data-joyride-next]', function(e) {
      _this.showNext();
    }).on('click.zf.joyride', '[data-joyride-prev]', function(e) {
      _this.showPrev();
    }).on('click.zf.joyride', '[data-joyride-close]', function(e) {
      e.preventDefault();
      _this._hideAll();
    }).on('keydown.zf.joyride', '.joyride-item', function(e) {
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
          if ($element.data('closable')) {
            this._hideAll();
          }
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
    this.$container.hide().remove();
    /**
     * Fires when the plugin has been destroyed.
     * @event Reveal#destroyed
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
