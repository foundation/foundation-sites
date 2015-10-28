/**
 * AccordionMenu module.
 * @module foundation.accordionMenu
 * @requires foundation.util.keyboard
 * @requires foundation.util.animationFrame
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
  function AccordionMenu(element) {
    this.$element = element;
    this.options = $.extend({}, AccordionMenu.defaults, this.$element.data());

    // this.$activeMenu = $();

    this._init();
    this._events();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event AccordionMenu#init
     */
    this.$element.trigger('init.zf.accordionMenu');
  }

  AccordionMenu.defaults = {
    slideSpeed: 250,
    wrapOnKeys: false,
    multiOpen: false

  }

  /**
   * Initializes the accordion menu by hiding all nested menus.
   * @private
   */
  AccordionMenu.prototype._init = function() {
    this.$element.find('[data-submenu]').not('.is-active').slideUp(0);//.find('a').css('padding-left', '1rem');
    this.$element.attr({
      'role': 'tablist',
      'multiselectable': this.options.multiOpen
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
  };

  /**
   * Adds event handlers for items within the menu.
   * @private
   */
  AccordionMenu.prototype._events = function() {
    var _this = this,
        usedKeys = [13, 27, 32, 35, 36, 37, 38, 39, 40];

    this.$element.find('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        $(this).children('a').on('click.zf.accordionMenu', function(e) {
          e.preventDefault();

          _this.toggle($submenu);
        });
      }
    }).on('keydown.zf.accordionmenu', function(e){
        var key = e.which;
        console.log(key);
        if(usedKeys.indexOf(key) < 0){ return; }
        e.stopPropagation();

        if((key === 13 || key === 32) && !$(this).children('[data-submenu]').length){ return; }//don't prevent default interaction of return or space on standard links
        e.preventDefault();
        if(key === 27){ _this.hideAll(); }

        var $elem = $(this),
            $menu = $elem.children('[data-submenu]');

          if(/(13)|(32)/.test(key)){
          // if(key === 13 || key === 32){
            $elem.children('a').focusin();
            console.log($elem);
            _this.toggle($menu);
          }
          else if(/(37)|(38)/.test(key)){//left
            console.log('up or left');
          }
          // else if(key === 38){//up
          //
          // }
          else if(key === 39){//right

          }else if(key === 40){//down

          }else if(key === 35){//end

          }else{

          }

          // switch (key) {
          //   case 13:
          //     _this.toggle($menu);
          //     break;
          //   default:
          //
          // }


        // console.log('event',e.which, this.style);
      }).attr('tabindex', 0);
  };
  AccordionMenu.prototype.hideAll = function(){
    console.log('called');
    this.$element.find('[data-submenu]').slideUp(this.options.slideSpeed);
  };
  AccordionMenu.prototype.toggle = function($target){
    if (!$target.is(':hidden')) {
      this.up($target);
    }
    else {
      this.down($target);
    }
  };
  /**
   * Opens the sub-menu defined by `$target`.
   * @param {jQuery} $target - Sub-menu to open.
   * @fires AccordionMenu#down
   */
  AccordionMenu.prototype.down = function($target) {
    var _this = this;
    $target.addClass('is-active').attr('aria-hidden', false)
      .parent('.has-submenu').attr('aria-expanded', true).end()
      .parentsUntil(this.$element, '[data-submenu]')
      .addBack();
      window.requestAnimationFrame(function(){
        $target.slideDown(_this.options.slideSpeed).promise().done(function(){
          // $target.siblings('a').eq(0).focus();
        });
      });
    if(!this.options.multiOpen){
      this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element)));
    }
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
    $target.slideUp(this.options.slideSpeed, function() {
      $target.find('[data-submenu]').slideUp(0).attr('aria-hidden', true);
    }).attr('aria-hidden', true).parent('.has-submenu').attr('aria-expanded', false);

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

    /**
     * Fires when the plugin has been destroyed.
     * @event AccordionMenu#destroy
     */
    this.$element.trigger('destroyed.zf.accordionMenu');
  };

  Foundation.plugin(AccordionMenu);
}(jQuery)
