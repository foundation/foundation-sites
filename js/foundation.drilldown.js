/**
 * Drilldown module.
 * @module foundation.drilldown
 * @requires foundation.util.keyboard
 * @requires foundation.util.animationFrame
 */
!function($, Foundation){
  'use strict';

  /**
   * Creates a new instance of a drilldown menu.
   * @class
   * @param {jQuery} element - jQuery object to make into an accordion menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Drilldown(element, options){
    this.$element = element;
    this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);

    Foundation.Nest.Feather(this.$element, 'drilldown');

    this._init();

    Foundation.registerPlugin(this);
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
  Drilldown.defaults = {
    backButton: '<li class="js-drilldown-back" tabindex="0"><a>Back</a></li>',
    wrapper: '<div></div>',
    closeOnClick: false,
    holdOpen: false
  };
  /**
   * Initializes the drilldown by creating jQuery collections of elements
   * @private
   */
  Drilldown.prototype._init = function(){
    this.$submenuAnchors = this.$element.find('li.has-submenu');
    this.$submenus = this.$submenuAnchors.children('[data-submenu]').addClass('is-drilldown-sub')/*.wrap($(this.options.wrapper).addClass('is-drilldown-sub'))*/;
    // this.$rootElems = this.$element.children('[data-submenu]')/*.addClass('first-sub')*/;
    this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'menuitem');
    // this.$submenus;

    // console.log(this.$wrapper.outerHeight(), this.$wrapper.css());
    this._prepareMenu();
    // this.getMaxHeight();

    this._keyboardEvents();
  };
  /**
   * prepares drilldown menu by setting attributes to links and elements
   * sets a min height to prevent content jumping
   * wraps the element if not already wrapped
   * @private
   * @function
   */
  Drilldown.prototype._prepareMenu = function(){
    var _this = this;
    if(!this.options.holdOpen){
      this._menuLinkEvents();
    }
    this.$submenuAnchors.each(function(){
      var $sub = $(this);
      $sub.find('a')[0].removeAttribute('href');
      $sub.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': 0,
            'role': 'menu'
          });
      _this._events($sub);
    });
    this.$submenus.each(function(){
      var $menu = $(this),
          $back = $menu.find('.js-drilldown-back');
      if(!$back.length){
        $menu.prepend(_this.options.backButton);
        _this._back($menu);
      }
    });
    if(!this.$element.parent().hasClass('is-drilldown')){
      this.$wrapper = $(this.options.wrapper).addClass('is-drilldown').css(this.getMaxHeight());
      this.$element.wrap(this.$wrapper);
    }

  };
  /**
   * Adds event handlers to elements in the menu.
   * @function
   * @private
   * @param {jQuery} $elem - the current menu item to add handlers to.
   */
  Drilldown.prototype._events = function($elem){
    var _this = this;

    $elem/*.off('mouseup.zf.drilldown tap.zf.drilldown touchend.zf.drilldown')*/
    .on('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
      // console.log('mouse event', $elem);
      e.preventDefault();
      e.stopPropagation();

      if(e.target !== e.currentTarget.firstElementChild){
        return false;
      }
      _this._show($elem);

      if(_this.options.closeOnClick){
        var $body = $('body').not(_this.$wrapper);
        $body.off('.zf.drilldown').on('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
          // console.log('body mouseup');
          e.preventDefault();
          _this._hideAll();
          $body.off('.zf.drilldown');
        });
      }
    });
    $elem.find('.js-drilldown-back').eq(0).on('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
      //do stuff
      // console.log('back button');
    });
  };
  Drilldown.prototype._keyboardEvents = function() {
    var _this = this;
    this.$menuItems.add(this.$element.find('.js-drilldown-back')).on('keydown.zf.drilldown', function(e){
      var $element = $(this),
          $elements = $element.parent('ul').children('li'),
          $prevElement,
          $nextElement;

      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(Math.max(0, i-1));
          $nextElement = $elements.eq(Math.min(i+1, $elements.length-1));
          return;
        }
      });
      Foundation.Keyboard.handleKey(e, _this, {
        next: function() {
          if ($element.is(_this.$submenuAnchors)) {
            _this._show($element);
            $element.on('transitionend.zf.drilldown', function(){
              $element.find('ul li').filter(_this.$menuItems).first().focus();
            });
          }
        },
        previous: function() {
          _this._hide($element.parent('ul'));
          $element.parent('ul').on('transitionend.zf.drilldown', function(){
            setTimeout(function() {
              $element.parent('ul').parent('li').focus();
            }, 1);
          });
        },
        up: function() {
          $prevElement.focus();
        },
        down: function() {
          $nextElement.focus();
        },
        close: function() {
          _this._back();
          //_this.$menuItems.first().focus(); // focus to first element
        },
        open: function() {
          if (!$element.is(_this.$menuItems)) { // not menu item means back button
            _this._hide($element.parent('ul'));
            setTimeout(function(){$element.parent('ul').parent('li').focus();}, 1);
          } else if ($element.is(_this.$submenuAnchors)) {
            _this._show($element);
            setTimeout(function(){$element.find('ul li').filter(_this.$menuItems).first().focus();}, 1);
          }
        },
        handled: function() {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      });
    }); // end keyboardAccess
  };

  /**
   * Closes all open elements, and returns to root menu.
   * @function
   * @fires Drilldown#closed
   */
  Drilldown.prototype._hideAll = function(){
    this.$element.find('.is-drilldown-sub.is-active').addClass('is-closing')
        .on('transitionend.zf.drilldown', function(e){
          // console.log('transitionend');
          $(this).removeClass('is-active is-closing').off('transitionend.zf.drilldown');
        });
        /**
         * Fires when the menu is fully closed.
         * @event Drilldown#closed
         */
    this.$element.trigger('closed.zf.drilldown');
  };
  /**
   * Adds event listener for each `back` button, and closes open menus.
   * @function
   * @fires Drilldown#back
   * @param {jQuery} $elem - the current sub-menu to add `back` event.
   */
  Drilldown.prototype._back = function($elem){
    var _this = this;
    $elem.off('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown');
    $elem.children('.js-drilldown-back')
      .on('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
        // console.log('mouseup on back');
        _this._hide($elem);
      });
  };
  /**
   * Adds event listener to menu items w/o submenus to close open menus on click.
   * @function
   * @private
   */
  Drilldown.prototype._menuLinkEvents = function(){
    var _this = this;
    this.$menuItems.not('.has-submenu')
        .off('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown')
        .on('mousedown.zf.drilldown tap.zf.drilldown touchend.zf.drilldown', function(e){
          // e.stopImmediatePropagation();
          setTimeout(function(){
            _this._hideAll();
          }, 0);
      });
  };
  /**
   * Opens a submenu.
   * @function
   * @fires Drilldown#open
   * @param {jQuery} $elem - the current element with a submenu to open.
   */
  Drilldown.prototype._show = function($elem){
    $elem.children('[data-submenu]').addClass('is-active');

    this.$element.trigger('open.zf.drilldown', [$elem]);
  };
  /**
   * Hides a submenu
   * @function
   * @fires Drilldown#hide
   * @param {jQuery} $elem - the current sub-menu to hide.
   */
  Drilldown.prototype._hide = function($elem){
    var _this = this;
    $elem.addClass('is-closing')
      .on('transitionend.zf.drilldown', function(e){
        // console.log('transitionend');
        $(this).removeClass('is-active is-closing').off('transitionend.zf.drilldown');
      });
    /**
     * Fires when the menu is fully closed.
     * @event Drilldown#hide
     */
    $elem.trigger('hide.zf.drilldown', [$elem]);

  };
  /**
   * Iterates through the nested menus to calculate the min-height, and max-width for the menu.
   * Prevents content jumping.
   * @function
   * @private
   */
  Drilldown.prototype.getMaxHeight = function(){
    var max = 0, result = {};
    this.$submenus.each(function(){
      var numOfElems = $(this).children('li').length;
      max = numOfElems > max ? numOfElems : max;
    });

    result.height = max * this.$menuItems[0].getBoundingClientRect().height + 'px';
    result.width = this.$element[0].getBoundingClientRect().width + 'px';

    return result;
  };
  /**
   * Destroys the Drilldown Menu
   * @function
   */
  Drilldown.prototype.destroy = function(){
    this._hideAll();
    Foundation.Nest.Burn(this.$element, 'drilldown');
    this.$element.unwrap()
                 .find('.js-drilldown-back').remove()
                 .end().find('.is-active, .is-closing, .is-drilldown-sub').removeClass('is-active is-closing is-drilldown-sub')
                 .end().find('[data-submenu]').removeAttr('aria-hidden tabindex role')
                 .off('.zf.drilldown').end().off('zf.drilldown');

    Foundation.unregisterPlugin(this);
  };
  Foundation.plugin(Drilldown);
}(jQuery, window.Foundation);


// !function(Foundation, $) {
//   'use strict';
//
//   /**
//    * Creates a new instance of Drilldown.
//    * @class
//    * @fires Drilldown#init
//    * @param {jQuery} element - jQuery object to make into a drilldown menu.
//    * @param {Object} options - Overrides to the default plugin settings.
//    */
//   function Drilldown(element) {
//     this.$element = element;
//     this.options = $.extend({}, Drilldown.defaults, this.$element.data());
//     // this.$container = $();
//     // this.$currentMenu = this.$element;
//
//     this._init();
//
//     /**
//      * Fires when the plugin has been successfuly initialized.
//      * @event Drilldown#init
//      */
//     this.$element.trigger('init.zf.drilldown');
//   }
//
//   Drilldown.defaults = {
//     /**
//      * HTML to use for the back button at the top of each sub-menu.
//      * @option
//      * @sample '<li class="js-drilldown-back"><a>Back</a></li>'
//      */
//     backButton: '<li class="js-drilldown-back"><a>Back</a></li>'
//   };
//
//   Drilldown.prototype = {
//     /**
//      * Initializes the Drilldown by creating a container to wrap the Menu in, and initializing all submenus.
//      * @private
//      */
//     _init: function() {
//       console.log('yo');
//       this.$container = $('<div class="is-drilldown"></div>');
//       this.$container.css('width', this.$element.css('width'));
//       this.$element.wrap(this.$container);
//       this._prepareMenu(this.$element, true);
//     },
//
//     /**
//      * Scans a Menu for any sub Menus inside of it. This is a recursive function, so when a sub menu is found, this method will be called on that sub menu.
//      * @private
//      * @param {jQuery} $elem - Menu to scan for sub menus.
//      * @param {Boolean} root - If true, the menu being scanned is at the root level.
//      */
//     _prepareMenu: function($elem, root) {
//       var _this = this;
//
//       // Create a trigger to move up the menu. This is not used on the root-level menu, because it doesn't need a back button.
//       if (!root) {
//         var $backButton = $(_this.options.backButton);
//         $backButton.mouseup(function() {
//           _this.backward();
//         });
//         // console.log(_this.options.backButton);
//         $elem.prepend($backButton);
//       }
//
//       // Look for sub-menus inside the current one
//       $elem.children('li').each(function() {
//         var $submenu = $(this).children('[data-submenu]');
//
//         // If it exists...
//         if ($submenu.length) {
//           $submenu.addClass('is-drilldown-sub');
//
//           // Create a trigger to move down the menu
//           $(this).children('a').mouseup(function() {
//             _this.forward($submenu);
//             return false;
//           });
//
//           // We have to go deeper
//           _this._prepareMenu($submenu, false);
//         }
//       });
//     },
//
//     /**
//      * Moves down the drilldown by activating the menu specified in `$target`.
//      * @fires Drilldown#forward
//      * @param {jQuery} $target - Sub menu to activate.
//      */
//     forward: function($target) {
//       var _this = this;
//
//       Foundation.requestAnimationFrame(function() {
//         $target.addClass('is-active');
//         _this.$currentMenu = $target;
//
//         /**
//          * Fires when the menu is done moving forwards.
//          * @event Drilldown#forward
//          */
//         _this.$element.trigger('forward.zf.drilldown', [_this.$currentMenu]);
//       });
//     },
//
//     /**
//      * Moves up the drilldown by deactivating the current menu.
//      * @fires Drilldown#backward
//      */
//     backward: function() {
//       var _this = this;
//
//       Foundation.requestAnimationFrame(function() {
//         _this.$currentMenu.removeClass('is-active');
//         _this.$currentMenu = _this.$currentMenu.parents('[data-drilldown], [data-submenu]');
//
//         /**
//          * Fires when the menu is done moving backwards.
//          * @event Drilldown#backward
//          */
//         _this.$element.trigger('backward.zf.drilldown', [_this.$currentMenu]);
//       });
//     },
//
//     /**
//      * Destroys an instance of a drilldown. A callback can optionally be run when the process is finished.
//      * @param {Function} cb - Callback to run when the plugin is done being destroyed.
//      */
//     destroy: function(cb) {
//       this.$element.find('[data-submenu]').removeClass('is-drilldown-sub');
//       this.$currentMenu.removeClass('is-active');
//       this.$element.find('.is-drilldown-back').remove();
//       this.$element.removeData('zf-plugin');
//       this.$element.unwrap();
//
//       if (typeof cb === 'function') cb();
//     }
//   };
//
//   Foundation.plugin(Drilldown);
// }(window.Foundation, jQuery);
