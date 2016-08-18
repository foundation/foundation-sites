'use strict';

!function($) {

/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.motion
 * @requires foundation.util.nest
 */

class Drilldown {
  /**
   * Creates a new instance of a drilldown menu.
   * @class
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  constructor(element, options) {
    this.$element = element;
    this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);

    Foundation.Nest.Feather(this.$element, 'drilldown');

    this._init();

    Foundation.registerPlugin(this, 'Drilldown');
    Foundation.Keyboard.register('Drilldown', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'previous',
      'ESCAPE': 'close',
      'TAB': 'down',
      'SHIFT_TAB': 'up'
    });
  }

  /**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */
  _init() {
    this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent').children('a');
    this.$submenus = this.$submenuAnchors.parent('li').children('[data-submenu]');
    this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'menuitem').find('a');

    this._prepareMenu();
    this._registerEvents();

    this._keyboardEvents();
  }

  /**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */
  _prepareMenu() {
    var _this = this;
    // if(!this.options.holdOpen){
    //   this._menuLinkEvents();
    // }
    this.$submenuAnchors.each(function(){
      var $link = $(this);
      var $sub = $link.parent();
      if(_this.options.parentLink){
        $link.clone().prependTo($sub.children('[data-submenu]')).wrap('<li class="is-submenu-parent-item is-submenu-item is-drilldown-submenu-item" role="menu-item"></li>');
      }
      $link.data('savedHref', $link.attr('href')).removeAttr('href');
      $link.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': 0,
            'role': 'menu'
          });
      _this._events($link);
    });
    this.$submenus.each(function(){
      var $menu = $(this),
          $back = $menu.find('.js-drilldown-back');
      if(!$back.length){
        $menu.prepend(_this.options.backButton);
      }
      _this._back($menu);
    });
    if(!this.$element.parent().hasClass('is-drilldown')){
      this.$wrapper = $(this.options.wrapper).addClass('is-drilldown');
      this.$wrapper = this.$element.wrap(this.$wrapper).parent().css(this._getMaxDims());
    }
  }

  /**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */
  _events($elem) {
    var _this = this;

    $elem.off('click.zf.drilldown')
    .on('click.zf.drilldown', function(e){
      if($(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')){
        e.stopImmediatePropagation();
        e.preventDefault();
      }

      // if(e.target !== e.currentTarget.firstElementChild){
      //   return false;
      // }
      _this._show($elem.parent('li'));

      if(_this.options.closeOnClick){
        var $body = $('body');
        $body.off('.zf.drilldown').on('click.zf.drilldown', function(e){
          if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target)) { return; }
          e.preventDefault();
          _this._hideAll();
          $body.off('.zf.drilldown');
        });
      }
    });
  }

  /**
   * Adds event handlers to the menu element.
   * @function
   * @private
   */
  _registerEvents() {
    if(this.options.scrollTop){
      this._bindHandler = this._scrollTop.bind(this);
      this.$element.on('open.zf.drilldown hide.zf.drilldown closed.zf.drilldown',this._bindHandler);
    }
  }

  /**
   * Scroll to Top of Element or data-scroll-top-element
   * @function
   * @fires Drilldown#scrollme
   */
  _scrollTop() {
    var _this = this;
    var $scrollTopElement = _this.options.scrollTopElement!=''?$(_this.options.scrollTopElement):_this.$element,
        scrollPos = parseInt($scrollTopElement.offset().top+_this.options.scrollTopOffset);
    $('html, body').stop(true).animate({ scrollTop: scrollPos }, _this.options.animationDuration, _this.options.animationEasing,function(){
      /**
        * Fires after the menu has scrolled
        * @event Drilldown#scrollme
        */
      if(this===$('html')[0])_this.$element.trigger('scrollme.zf.drilldown');
    });
  }

  /**
   * Adds keydown event listener to `li`'s in the menu.
   * @private
   */
  _keyboardEvents() {
    var _this = this;

    this.$menuItems.add(this.$element.find('.js-drilldown-back > a')).on('keydown.zf.drilldown', function(e){

      var $element = $(this),
          $elements = $element.parent('li').parent('ul').children('li').children('a'),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1));
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));
          return;
        }
      });

      Foundation.Keyboard.handleKey(e, 'Drilldown', {
        next: function() {
          if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent('li'));
            $element.parent('li').one(Foundation.transitionend($element), function(){
              $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
            });
            return true;
          }
        },
        previous: function() {
          _this._hide($element.parent('li').parent('ul'));
          $element.parent('li').parent('ul').one(Foundation.transitionend($element), function(){
            setTimeout(function() {
              $element.parent('li').parent('ul').parent('li').children('a').first().focus();
            }, 1);
          });
          return true;
        },
        up: function() {
          $prevElement.focus();
          return true;
        },
        down: function() {
          $nextElement.focus();
          return true;
        },
        close: function() {
          _this._back();
          //_this.$menuItems.first().focus(); // focus to first element
        },
        open: function() {
          if (!$element.is(_this.$menuItems)) { // not menu item means back button
            _this._hide($element.parent('li').parent('ul'));
            $element.parent('li').parent('ul').one(Foundation.transitionend($element), function(){
              setTimeout(function() {
                $element.parent('li').parent('ul').parent('li').children('a').first().focus();
              }, 1);
            });
          } else if ($element.is(_this.$submenuAnchors)) {
            _this._show($element.parent('li'));
            $element.parent('li').one(Foundation.transitionend($element), function(){
              $element.parent('li').find('ul li a').filter(_this.$menuItems).first().focus();
            });
          }
          return true;
        },
        handled: function(preventDefault) {
          if (preventDefault) {
            e.preventDefault();
          }
          e.stopImmediatePropagation();
        }
      });
    }); // end keyboardAccess
  }

  /**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#closed
   */
  _hideAll() {
    var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
    $elem.one(Foundation.transitionend($elem), function(e){
      $elem.removeClass('is-active is-closing');
    });
        /**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */
    this.$element.trigger('closed.zf.drilldown');
  }

  /**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */
  _back($elem) {
    var _this = this;
    $elem.off('click.zf.drilldown');
    $elem.children('.js-drilldown-back')
      .on('click.zf.drilldown', function(e){
        e.stopImmediatePropagation();
        // console.log('mouseup on back');
        _this._hide($elem);
      });
  }

  /**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */
  _menuLinkEvents() {
    var _this = this;
    this.$menuItems.not('.is-drilldown-submenu-parent')
        .off('click.zf.drilldown')
        .on('click.zf.drilldown', function(e){
          // e.stopImmediatePropagation();
          setTimeout(function(){
            _this._hideAll();
          }, 0);
      });
  }

  /**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open, i.e. the `li` tag.
   */
  _show($elem) {
    $elem.children('[data-submenu]').addClass('is-active');
    /**
     * Fires when the submenu has opened.
     * @event Drilldown#open
     */
    this.$element.trigger('open.zf.drilldown', [$elem]);
  };

  /**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide, i.e. the `ul` tag.
   */
  _hide($elem) {
    var _this = this;
    $elem.addClass('is-closing')
         .one(Foundation.transitionend($elem), function(){
           $elem.removeClass('is-active is-closing');
           $elem.blur();
         });
    /**
     * Fires when the submenu has closed.
     * @event Drilldown#hide
     */
    $elem.trigger('hide.zf.drilldown', [$elem]);
  }

  /**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */
  _getMaxDims() {
    var max = 0, result = {};
    this.$submenus.add(this.$element).each(function(){
      var numOfElems = $(this).children('li').length;
      max = numOfElems > max ? numOfElems : max;
    });

    result['min-height'] = `${max * this.$menuItems[0].getBoundingClientRect().height}px`;
    result['max-width'] = `${this.$element[0].getBoundingClientRect().width}px`;

    return result;
  }

  /**
   * Destroys the Drilldown Menu
   * @function
   */
  destroy() {
    if(this.options.scrollTop) this.$element.off('.zf.drilldown',this._bindHandler);
    this._hideAll();
    Foundation.Nest.Burn(this.$element, 'drilldown');
    this.$element.unwrap()
                 .find('.js-drilldown-back, .is-submenu-parent-item').remove()
                 .end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu')
                 .end().find('[data-submenu]').removeAttr('aria-hidden tabindex role');
    this.$submenuAnchors.each(function() {
      $(this).off('.zf.drilldown');
    });
    this.$element.find('a').each(function(){
      var $link = $(this);
      if($link.data('savedHref')){
        $link.attr('href', $link.data('savedHref')).removeData('savedHref');
      }else{ return; }
    });
    Foundation.unregisterPlugin(this);
  };
}

Drilldown.defaults = {
  /**
   * Markup used for JS generated back button. Prepended to submenu lists and deleted on `destroy` method, 'js-drilldown-back' class required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @example '<\li><\a>Back<\/a><\/li>'
   */
  backButton: '<li class="js-drilldown-back"><a tabindex="0">Back</a></li>',
  /**
   * Markup used to wrap drilldown menu. Use a class name for independent styling; the JS applied class: `is-drilldown` is required. Remove the backslash (`\`) if copy and pasting.
   * @option
   * @example '<\div class="is-drilldown"><\/div>'
   */
  wrapper: '<div></div>',
  /**
   * Adds the parent link to the submenu.
   * @option
   * @example false
   */
  parentLink: false,
  /**
   * Allow the menu to return to root list on body click.
   * @option
   * @example false
   */
  closeOnClick: false,
  /**
   * Scroll to the top of the menu after opening a submenu or navigating back using the menu back button
   * @option
   * @example false
   */
  scrollTop: false,
  /**
   * String jquery selector (for example 'body') of element to take offset().top from, if empty string the drilldown menu offset().top is taken
   * @option
   * @example ''
   */
  scrollTopElement: '',
  /**
   * ScrollTop offset
   * @option
   * @example 100
   */
  scrollTopOffset: 0,
  /**
   * Scroll animation duration
   * @option
   * @example 500
   */
  animationDuration: 500,
  /**
   * Scroll animation easing
   * @option
   * @example 'swing'
   */
  animationEasing: 'swing'
  // holdOpen: false
};

// Window exports
Foundation.plugin(Drilldown, 'Drilldown');

}(jQuery);
