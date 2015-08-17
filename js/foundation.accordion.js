!function($) {
  'use strict';

  /**
   * Creates a new instance of an accordion.
   * @class
   * @fires Accordion#init
   * @param {jQuery} element - jQuery object to make into an accordion.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Accordion(element, options){
    this.$element = element;
    this.options = $.extend(this.defaults, options || {});

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Accordion#init
     */
    this.$element.trigger('init.zf.accordion');
  }

  Accordion.prototype.defaults = {
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
  };

  /**
   * Adds event handlers for items within the accordion.
   * @private
   */
  Accordion.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $tabContent = $(this).children('[data-tab-content]');
      if ($tabContent.length) {
        $(this).children('a').on('click.zf.accordion', function(e) {
          e.preventDefault();
          if ($tabContent.parent().hasClass('is-active')) {
            if(_this.options.allowAllClosed || $tabContent.parent().siblings().hasClass('is-active')){
              _this.up($tabContent);
            }
          }
          else {
            _this.down($tabContent);
          }
        });
      }
    });
  };

  /**
   * Opens the accordion tab defined by `$target`.
   * @param {jQuery} $target - Accordion tab to open.
   * @fires Accordion#down
   */
  Accordion.prototype.down = function($target, firstTime) {
    if(!this.options.multiExpand && !firstTime){
      var $currentActive = this.$element.find('.is-active').children('[data-tab-content]');
      if($currentActive){
        this.up($currentActive);
      }
    }
    $target
      .parent('[data-tab-content]')
      .addBack()
      .slideDown(this.options.slideSpeed)
      .parent().addClass(firstTime ? '' : 'is-active');

    Foundation.reflow(this.$element, 'accordion');
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
    var $aunts = $target.parent().siblings();
    var canClose = this.options.multiExpand ? $aunts.hasClass('is-active') : $target.parent().hasClass('is-active');

    if(!this.options.allowAllClosed && !canClose){
      return;
    }
    $target.slideUp(this.options.slideSpeed, function() {
      $target.find('[data-tab-content]').slideUp(0);
    })
      .parent().removeClass('is-active');

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
    this.$element.trigger('destroyed.zf.accordion');
  }

  Foundation.plugin(Accordion);
}(jQuery);
