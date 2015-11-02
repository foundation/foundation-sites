/**
 * Accordion module.
 * @module foundation.accordion
 * @requires foundation.util.keyboard
 * @requires foundation.util.animationFrame
 */
!function($) {
  'use strict';

  /**
   * Creates a new instance of an accordion.
   * @class
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   */
  function Accordion(element, options){
    this.$element = element;
    this.options = $.extend({}, Accordion.defaults, this.$element.data(), options || {});

    this._init();
    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Accordion#init
     */
     Foundation.registerPlugin(this);
  }

  Accordion.defaults = {
    slideSpeed: 250,
    multiExpand: false,
    allowAllClosed: false
  };

  /**
   * Initializes the accordion by animating the preset active pane(s).
   * @private
   */
  Accordion.prototype._init = function() {
    var $initActive = this.$element.find('.is-active').children('[data-tab-content]');
    if($initActive){
      this.down($initActive, true);
    }
    this._events();
  };

  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  Accordion.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $tabContent = $(this).children('[data-tab-content]');
      var $elem = $(this);
      if ($tabContent.length) {
        $(this).off('click.zf.accordion keydown.zf.accordion')
               .on('click.zf.accordion', function(e) {
        // $(this).children('a').on('click.zf.accordion', function(e) {
          e.preventDefault();
          if ($tabContent.parent().hasClass('is-active')) {
            if(_this.options.allowAllClosed || $tabContent.parent().siblings().hasClass('is-active')){
              _this.up($tabContent);
            }
          }
          else {
            _this.down($tabContent);
          }
        }).on('keydown.zf.accordion', function(e){
          Foundation.handleKey(e, _this, {
            toggle: function() {
              _this.toggle($tabContent);
            },
            next: function() {
              $tabContent.parent().next().find('a').focus().trigger('click.zf.accordion');
            },
            previous: function() {
              $tabContent.parent().prev().find('a').focus().trigger('click.zf.accordion');
            },
            handled: function() {
              e.preventDefault();
              e.stopPropagation();
            }
          });
        });
      }
    });
  };
  Accordion.prototype.toggle = function($target){
    if($target.parent().hasClass('is-active')){
      if(this.options.allowAllClosed || $target.parent().siblings().hasClass('is-active')){
        this.up($target);
      }else{ return; }
    }else{
      this.down($target);
    }
  };
  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to open.
   * @fires Accordion#down
   */
  Accordion.prototype.down = function($target, firstTime) {
    var _this = this;
    if(!this.options.multiExpand && !firstTime){
      var $currentActive = this.$element.find('.is-active').children('[data-tab-content]');
      if($currentActive.length){
        this.up($currentActive);
      }
    }
    $target
      .parent('[data-tab-content]')
      .addBack()
      .parent().addClass('is-active');

    Foundation.Move(_this.options.slideSpeed, $target, function(){
      $target.slideDown(_this.options.slideSpeed);
    });

    if(!firstTime){
      console.log('reflowing yo!');
      Foundation._reflow(this.$element.data('accordion'));
    }
    /**
     * Fires when the tab is done opening.
     * @event Accordion#down
     */
    this.$element.trigger('down.zf.accordion', [$target]);
  };

  /**
   * Closes the tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to close.
   * @fires Accordion#up
   */
  Accordion.prototype.up = function($target) {
    var $aunts = $target.parent().siblings(),
        _this = this;
    var canClose = this.options.multiExpand ? $aunts.hasClass('is-active') : $target.parent().hasClass('is-active');

    if(!this.options.allowAllClosed && !canClose){
      return;
    }
    $target.find('[data-tab-content]').slideUp(0);

    Foundation.Move(this.options.slideSpeed, $target, function(){
      $target.slideUp(_this.options.slideSpeed)
    });
    // $target.slideUp(this.options.slideSpeed, function() {
    //   $target.find('[data-tab-content]').slideUp(0);
    // })
    $target.parent().removeClass('is-active');

    /**
     * Fires when the tab is done collapsing up.
     * @event Accordion#up
     */
    this.$element.trigger('up.zf.accordion', [$target]);
  };

  /**
   * Destroys an instance of an accordion.
   * @fires Accordion#destroyed
   */
  Accordion.prototype.destroy = function() {
    this.$element.find('[data-tab-content]').slideUp(0).css('display', '');
    this.$element.find('a').off('click.zf.accordion');

    /**
     * Fires when the plugin has been destroyed.
     * @event Accordion#destroyed
     */
    // this.$element.trigger('destroyed.zf.accordion');
    Foundation.unregisterPlugin(this);
  }

  Foundation.plugin(Accordion);
}(jQuery);
