/**
 * DropdownMenu module.
 * @module foundation.dropdown-menu
 * @requires foundation.util.keyboard
 * @requires foundation.util.box
 * @requires foundation.util.nest
 */
!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of DropdownMenu.
   * @class
   * @fires DropdownMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function DropdownMenu(element, options) {
    this.$element = element;
    this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);

    Foundation.Nest.Feather(this.$element, 'dropdown');

    this._init();

    Foundation.registerPlugin(this);
    Foundation.Keyboard.register('DropdownMenu', {
      'ENTER': 'open',
      'SPACE': 'open',
      'ARROW_RIGHT': 'next',
      'ARROW_UP': 'up',
      'ARROW_DOWN': 'down',
      'ARROW_LEFT': 'previous',
      'ESCAPE': 'close'
    });

    // /**
    //  * Fires when the plugin has been successfuly initialized.
    //  * @event DropdownMenu#init
    //  */
    // this.$element.trigger('init.zf.dropdown');
  }

  /**
   * Default settings for plugin
   */
  DropdownMenu.defaults = {
    // toggleOn: 'both',
    /**
     * Allow a submenu to open/remain open on parent click event. Allows cursor to move away from menu.
     * @option
     * @example true
     */
    clickOpen: true,
    /**
     * Allow clicks on the body to close any open submenus.
     * @option
     * @example false
     */
    closeOnClick: false,
    /**
     * Disallows hover events from opening submenus
     * @option
     * @example false
     */
    disableHover: false,
    /**
     * Allow a submenu to automatically close on a mouseleave event.
     * @option
     * @example true
     */
    autoclose: true,
    /**
     * Amount of time to delay opening a submenu on hover event.
     * @option
     * @example 150
     */
    hoverDelay: 150,
    /**
     * Amount of time to delay closing a submenu on a mouseleave event.
     * @option
     * @example 500
     */
    closingTime: 500,
    // wrapOnKeys: true,
    /**
     * Position of the menu relative to what direction the submenus should open. Handled by JS.
     * @option
     * @example 'left'
     */
    alignment: 'left',
    /**
     * Class applied to vertical oriented menus, Foundation default is `vertical`. Update this if using your own class.
     * @option
     * @example 'vertical'
     */
    verticalClass: 'vertical',
    /**
     * Class applied to right-side oriented menus, Foundation default is `align-right`. Update this if using your own class.
     * @option
     * @example 'align-right'
     */
    rightClass: 'align-right'
  };
  /**
   * Initializes the plugin, and calls _prepareMenu
   * @private
   * @function
   */
  DropdownMenu.prototype._init = function(){
    if(this.$element.hasClass(this.options.verticalClass)){
      this.vertical = true;
    }
    // this.vertical = this.$element.hasClass(this.options.verticalClass);
    this._prepareMenu();
    // this._addTopLevelKeyHandler();
  };
  /**
   * Prepares the menu by checking alignment and orientation, setting attributes for elements, and creating jQuery collections of elements.
   * @private
   * @function
   */
  DropdownMenu.prototype._prepareMenu = function(){
    var _this = this;
    this.$tabs = this.$element.children('li.has-submenu');
    this.$tabs.children('[data-submenu]').addClass('first-sub');
    this.$submenus = this.$element.find('li.has-submenu');
    this.$menuItems = this.$element.find('li').attr({'role': 'menuitem', 'tabindex': 0});
    this.$menuItems.children('a').attr('tabindex', -1);
    if(this.$element.hasClass(this.options.rightClass)){
      this.options.alignment = 'right';
      this.$submenus.addClass('is-left-arrow opens-left');
    }else{
      this.$submenus.addClass('is-right-arrow opens-right');
    }
    if(!this.vertical){
      this.$tabs.removeClass('is-right-arrow is-left-arrow opens-left opens-right').addClass('is-down-arrow');
    }

    this.$tabs.each(function(){
      var $tab = $(this);
      $tab.attr({
        'role': 'menuitem',
        'tabindex': 0,
        'title': $tab.children('a:first-child').text()/*.match(/\w/ig).join('')*/
      }).children('a').attr('tabindex', -1);//maybe add a more specific regex to match alphanumeric characters and join them appropriately
      if($tab.children('[data-submenu]')){
        $tab.attr('aria-haspopup', true);
      }
    });


    this.$submenus.each(function(){
      var $sub = $(this);

      // if(_this.options.alignment === 'right'){
      //   $sub.children('[data-submenu]').addClass('is-right-arrow');
      // }

      $sub.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': -1,
            'role': 'menu'
          }).addClass('vertical');
      _this._events($sub);
    });
  };

  /**
   * Adds event listeners to elements within the menu
   * @param {jQuery} $elem - the element to attach listeners too.
   * @private
   * @function
   */
  DropdownMenu.prototype._events = function($elem){
    var _this = this;

    if(this.options.clickOpen){
      $elem.children('a').on('click.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
        if($(e.target).parent('li').hasClass('has-submenu')){
          e.preventDefault();
          e.stopPropagation();
        }else{
          return;
        }

        if($elem.data('isClick')){
          _this._hide($elem);
        }else{
          _this._hideOthers($elem);
          _this._show($elem);
          $elem.data('isClick', true).parentsUntil('[data-dropdown-menu]', '.has-submenu').data('isClick', true);
          if(_this.options.closeOnClick){
            _this._addBodyHandler();
          }
        }
      });
    }

    if(!this.options.disableHover){
      //add ability for all menu items to close an open menu on the same level//
      this.$menuItems.on('mouseenter.zf.dropdownmenu', function(e){
        var $el = $(this);
        if(!$el.hasClass('is-active')){
          _this._hideOthers($el);
        }
      });
      //elements with submenus
      $elem.on('mouseenter.zf.dropdownmenu', function(e){
        clearTimeout($elem.closeTimer);
        if(!$elem.hasClass('is-active')){
          $elem.openTimer = setTimeout(function(){
              // _this._hideOthers($elem);
              _this._show($elem);
          }, _this.options.hoverDelay);
        }
      }).on('mouseleave.zf.dropdownmenu', function(e){
        if(!$elem.data('isClick') && _this.options.autoclose){
        clearTimeout($elem.openTimer);
          $elem.closeTimer = setTimeout(function(){
            _this._hide($elem);
          }, _this.options.closingTime);
        }
      });
    }

    this.$menuItems.on('keydown.zf.dropdownmenu', function(e){
      var $element = $(this),
          $tabs = _this.$element.children('li'),
          isTab = $element.is($tabs),
          $elements = isTab ? $tabs : $element.parents('li').first().add($element.parent('ul').children('li')),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(i-1);
          $nextElement = $elements.eq(i+1);
          return;
        }
      });
      var nextSibling = function() {
        if (!$element.is(':last-child')) $nextElement.focus();
      }, prevSibling = function() {
        $prevElement.focus();
      }, openSub = function() {
        if ($element.has('ul').length) {
          _this._show($element);
          $element.find('li').first().focus();
        }
      }, closeSub = function() {
        //if ($element.is(':first-child')) {
          $element.parents('li').first().focus();
          _this._hide($element.parents('li').first());
        //}
      };
      var functions = {
        open: openSub,
        close: function() {
          _this._hideAll();
          _this.$menuItems.first().focus(); // focus to first element
        },
        handled: function() {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      };

      if (isTab) {
        if (_this.vertical) { // vertical menu
          if (_this.options.alignment === 'left') { // left aligned
            $.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: openSub,
              previous: closeSub,
            });
          } else { // right aligned
            $.extend(functions, {
              down: nextSibling,
              up: prevSibling,
              next: closeSub,
              previous: openSub,
            });
          }
        } else { // horizontal menu
          $.extend(functions, {
            next: nextSibling,
            previous: prevSibling,
            down: openSub,
            up: closeSub,
          });
        }
      } else { // not tabs -> one sub
        if (_this.options.alignment === 'left') { // left aligned
          $.extend(functions, {
            next: openSub,
            previous: closeSub,
            down: nextSibling,
            up: prevSibling
          });
        } else { // right aligned
          $.extend(functions, {
            next: closeSub,
            previous: openSub,
            down: nextSibling,
            up: prevSibling
          });
        }
      }
      Foundation.Keyboard.handleKey(e, _this, functions);
    });
     // end keyboardAccess
  };
  /**
   * Toggles the current dropdown pane.
   * @param {jQuery} $elem - the current element with a submenu to toggle.
   * @function
   * @private
   */
  DropdownMenu.prototype._toggle = function($elem){
    if($elem.hasClass('is-active')){
      this._hide($elem);
    }else{
      this._show($elem);
    }
  };
  /**
   * Adds an event handler to the body to close any dropdowns on a click.
   * @function
   * @private
   */
  DropdownMenu.prototype._addBodyHandler = function(){
    var $body = $('body'),
        _this = this;
    $body.not(_this.$element).on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
      _this._hideAll();
      $body.off('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu');
    });
  };
//show & hide stuff @private
  /**
   * Opens a dropdown pane, and checks for collisions first.
   * @param {jQuery} $elem - current element with a submenu to show
   * @function
   * @private
   * @fires DropdownMenu#show
   */
  DropdownMenu.prototype._show = function($elem){
    this._hideOthers($elem);
    $elem.focus();
    // console.log('showing some stuff', $elem.find('li:first-child'));
    var $sub = $elem.children('[data-submenu]:first-of-type');
    $elem.addClass('is-active');
    $sub.css('visibility', 'hidden').addClass('js-dropdown-active')
        .attr('aria-hidden', false);


    //break this into own function
    var clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
    if(!clear){
      if(this.options.alignment === 'left'){
        $elem.removeClass('opens-left').addClass('opens-right');
      }else{
        $elem.removeClass('opens-right').addClass('opens-left');
      }
      this.changed = true;

      // still not clear, small screen, add inner class
      clear = Foundation.Box.ImNotTouchingYou($sub, null, true);
      if (!clear) {
        $elem.removeClass('opens-left opens-right').addClass('opens-inner');
        this.changed = true;
      }
    }
    $sub.css('visibility', '');
    /**
     * Fires when the new dropdown pane is visible.
     * @event DropdownMenu#show
     */
    this.$element.trigger('show.zf.dropdownmenu', [$elem]);
  };
  /**
   * Hides a single, currently open dropdown pane.
   * @function
   * @param {jQuery} $elem - element with a submenu to hide
   * @private
   */
  DropdownMenu.prototype._hide = function($elem){
    this._hideSome($elem);
  };
  /**
   * Hides currently open dropdown panes from a jQuery collection passed by other functions.
   * Resets the position classes if the element was mutated due to a collision.
   * @function
   * @param {jQuery} $elems - element(s) with a submenu to hide
   * @private
   * @fires DropdownMenu#hide
   */
  DropdownMenu.prototype._hideSome = function($elems){
    if($elems.length){
      // if($elems.hasClass('first-sub')){
      //   console.log('true');
      //   $elems.blur();
      // }
      $elems.removeClass('is-active opens-inner').data('isClick', false)

            .find('.is-active').removeClass('is-active').data('isClick', false).end()

            .find('.js-dropdown-active').removeClass('js-dropdown-active')
                                        .attr('aria-hidden', true);
      $elems.parent('.has-submenu').removeClass('is-active');
      if(this.changed){
        //remove position class
        if(this.options.alignment === 'left'){
          $elems.find('.opens-left').removeClass('opens-left').addClass('opens-right');
        }else{
          $elems.find('.opens-right').removeClass('opens-right').addClass('opens-left');
        }
      }
      /**
       * Fires when the open menus are closed.
       * @event DropdownMenu#hide
       */
      this.$element.trigger('hide.zf.dropdownmenu');
    }
  };
  /**
   * Hides a submenu's siblings.
   * @param {jQuery} $elem - the element that should remain open.
   * @function
   * @private
   */
  DropdownMenu.prototype._hideOthers = function($elem){
    this._hideSome($elem.siblings('.has-submenu.is-active'));
  };
  /**
   * Hides everything.
   * @function
   */
  DropdownMenu.prototype._hideAll = function(){
    this._hideSome(this.$element);
  };
  /**
   * Destroys the plugin.
   * @function
   */
  DropdownMenu.prototype.destroy = function() {
    this._hideAll();
    this.$element
        .removeData('zf-plugin')
        .find('li')
        .removeClass('js-dropdown-nohover is-right-arrow is-left-arrow opens-left opens-inner opens-right')
        .add('a').off('.zf.dropdownmenu')
        .end().find('ul').removeClass('first-sub');
    Foundation.Nest.Burn(this.$element, 'dropdown');
    Foundation.unregisterPlugin(this);
  };
  Foundation.plugin(DropdownMenu);

  var checkClass = function($elem){
    return $elem.hasClass('is-active');
  };

}(Foundation, jQuery);
