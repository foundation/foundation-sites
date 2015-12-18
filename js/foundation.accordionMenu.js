/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.nest
 */
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
    this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options);

    Foundation.Nest.Feather(this.$element, 'accordion');

    this._init();

    Foundation.registerPlugin(this, 'AccordionMenu');
    Foundation.Keyboard.register('AccordionMenu', {
      'ENTER': 'toggle',
      'SPACE': 'toggle',
      'ARROW_RIGHT': 'open',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'close',
      'ESCAPE': 'closeAll',
      'TAB': 'down',
      'SHIFT_TAB': 'up'
    });
  }

  AccordionMenu.defaults = {
    /**
     * Amount of time to animate the opening of a submenu in ms.
     * @option
     * @example 250
     */
    slideSpeed: 250,
    /**
     * Allow the menu to have multiple open panes.
     * @option
     * @example true
     */
    multiOpen: true
  };

  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  AccordionMenu.prototype._init = function() {
    this.$element.find('[data-submenu]').not('.is-active').slideUp(0);//.find('a').css('padding-left', '1rem');
    this.$element.attr({
      'role': 'tablist',
      'aria-multiselectable': this.options.multiOpen
    });

    this.$menuLinks = this.$element.find('.has-submenu');
    this.$menuLinks.each(function(){
      var linkId = this.id || Foundation.GetYoDigits(6, 'acc-menu-link'),
          $elem = $(this),
          $sub = $elem.children('[data-submenu]'),
          subId = $sub[0].id || Foundation.GetYoDigits(6, 'acc-menu'),
          isActive = $sub.hasClass('is-active');
      $elem.attr({
        'aria-controls': subId,
        'aria-expanded': isActive,
        'aria-selected': false,
        'role': 'tab',
        'id': linkId
      });
      $sub.attr({
        'aria-labelledby': linkId,
        'aria-hidden': !isActive,
        'role': 'tabpanel',
        'id': subId
      });
    });
    var initPanes = this.$element.find('.is-active');
    if(initPanes.length){
      var _this = this;
      initPanes.each(function(){
        _this.down($(this));
      });
    }
    this._events();
  };

  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  AccordionMenu.prototype._events = function() {
    var _this = this;

    this.$element.find('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        $(this).children('a').off('click.zf.accordionmenu').on('click.zf.accordionmenu', function(e) {
          e.preventDefault();

          _this.toggle($submenu);
        });
      }
    }).on('keydown.zf.accordionmenu', function(e){
      var $element = $(this),
          $elements = $element.parent('ul').children('li'),
          $prevElement,
          $nextElement,
          $target = $element.children('[data-submenu]');

      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1));
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));

          if ($(this).children('[data-submenu]:visible').length) { // has open sub menu
            $nextElement = $element.find('li:first-child');
          }
          if ($(this).is(':first-child')) { // is first element of sub menu
            $prevElement = $element.parents('li').first();
          } else if ($prevElement.children('[data-submenu]:visible').length) { // if previous element has open sub menu
            $prevElement = $prevElement.find('li:last-child');
          }
          if ($(this).is(':last-child')) { // is last element of sub menu
            $nextElement = $element.parents('li').first().next('li');
          }

          return;
        }
      });
      Foundation.Keyboard.handleKey(e, 'AccordionMenu', {
        open: function() {
          if ($target.is(':hidden')) {
            _this.down($target);
            $target.find('li').first().focus();
          }
        },
        close: function() {
          if ($target.length && !$target.is(':hidden')) { // close active sub of this item
            _this.up($target);
          } else if ($element.parent('[data-submenu]').length) { // close currently open sub
            _this.up($element.parent('[data-submenu]'));
            $element.parents('li').first().focus();
          }
        },
        up: function() {
          $prevElement.focus();
        },
        down: function() {
          $nextElement.focus();
        },
        toggle: function() {
          if ($element.children('[data-submenu]').length) {
            _this.toggle($element.children('[data-submenu]'));
          }
        },
        closeAll: function() {
          _this.hideAll();
        },
        handled: function() {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      });
    });//.attr('tabindex', 0);
  };
  /**
   * Closes all panes of the menu.
   * @function
   */
  AccordionMenu.prototype.hideAll = function(){
    this.$element.find('[data-submenu]').slideUp(this.options.slideSpeed);
  };
  /**
   * Toggles the open/close state of a submenu.
   * @function
   * @param {jQuery} $target - the submenu to toggle
   */
  AccordionMenu.prototype.toggle = function($target){
    if(!$target.is(':animated')) {
      if (!$target.is(':hidden')) {
        this.up($target);
      }
      else {
        this.down($target);
      }
    }
  };
  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  AccordionMenu.prototype.down = function($target) {
    var _this = this;

    if(!this.options.multiOpen){
      this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
    }

    $target.addClass('is-active').attr({'aria-hidden': false})
      .parent('.has-submenu').attr({'aria-expanded': true, 'aria-selected': true});

      Foundation.Move(this.options.slideSpeed, $target, function(){
        $target.slideDown(_this.options.slideSpeed);
      });
    /**
     * Fires when the menu is done collapsing up.
     * @event AccordionMenu#down
     */
    this.$element.trigger('down.zf.accordionMenu', [$target]);
  };

  /**
   * Closes the sub-menu defined by `$target`. All sub-menus inside the target will be closed as well.
   * @param {jQuery} $target - Sub-menu to close.
   * @fires AccordionMenu#up
   */
  AccordionMenu.prototype.up = function($target) {
    var _this = this;
    Foundation.Move(this.options.slideSpeed, $target, function(){
      $target.slideUp(_this.options.slideSpeed);
    });
    $target.attr('aria-hidden', true)
           .find('[data-submenu]').slideUp(0).attr('aria-hidden', true).end()
           .parent('.has-submenu')
           .attr({'aria-expanded': false, 'aria-selected': false});
    // $target.slideUp(this.options.slideSpeed, function() {
    //   $target.find('[data-submenu]').slideUp(0).attr('aria-hidden', true);
    // }).attr('aria-hidden', true).parent('.has-submenu').attr({'aria-expanded': false, 'aria-selected': false});

    /**
     * Fires when the menu is done collapsing up.
     * @event AccordionMenu#up
     */
    this.$element.trigger('up.zf.accordionMenu', [$target]);
  };

  /**
   * Destroys an instance of accordion menu.
   * @fires AccordionMenu#destroyed
   */
  AccordionMenu.prototype.destroy = function(){
    this.$element.find('[data-submenu]').slideDown(0).css('display', '');
    this.$element.find('a').off('click.zf.accordionMenu');

    Foundation.Nest.Burn(this.$element, 'accordion');
    Foundation.unregisterPlugin(this);
  };

  Foundation.plugin(AccordionMenu, 'AccordionMenu');
}(jQuery, window.Foundation);
