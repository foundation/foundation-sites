!function($) {
  'use strict';

  /**
   * Creates a new instance of an accordion menu.
   * @class
   * @fires AccordionMenu#init
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function AccordionMenu(element, options) {
    this.$element = element;
    this.options = $.extend(AccordionMenu.defaults, options || {});

    this.$activeMenu = $();

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event AccordionMenu#init
     */
    this.$element.trigger('init.zf.accordionMenu');
  }

  AccordionMenu.prototype.defaults = {
    slideSpeed: 250
  }

  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  AccordionMenu.prototype._init = function() {
    this.$element.find('[data-submenu]').slideUp(0);
  }

  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  AccordionMenu.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        $(this).children('a').on('click.zf.accordionMenu', function(e) {
          e.preventDefault();

          if (!$submenu.is(':hidden')) {
            _this.up($submenu);
          }
          else {
            _this.down($submenu);
          }
        });
      }
    });
  }

  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  AccordionMenu.prototype.down = function($target) {
    $target
      .parentsUntil(this.$element, '[data-submenu]')
      .addBack()
        .slideDown(this.options.slideSpeed);

    /**
     * Fires when the menu is done collapsing up.
     * @event AccordionMenu#down
     */
    this.$element.trigger('down.zf.accordionMenu', [$target]);
  }

  /**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */
  AccordionMenu.prototype.up = function($target) {
    $target.slideUp(this.options.slideSpeed, function() {
      $target.find('[data-submenu]').slideUp(0);
    });

    /**
     * Fires when the menu is done collapsing up.
     * @event AccordionMenu#up
     */
    this.$element.trigger('up.zf.accordionMenu', [$target]);
  }

  /**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */
  AccordionMenu.prototype.destroy = function() {
    this.$element.find('[data-submenu]').slideDown(0).css('display', '');
    this.$element.find('a').off('click.zf.accordionMenu');

    /**
     * Fires when the plugin has been destroyed.
     * @event AccordionMenu#destroy
     */
    this.$element.trigger('destroyed.zf.accordionMenu');
  }

  Foundation.plugin('accordion-menu', AccordionMenu);
}(jQuery)