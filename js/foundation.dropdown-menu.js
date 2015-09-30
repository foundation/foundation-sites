!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of DropdownMenu.
   * @class
   * @fires DropdownMenu#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function DropdownMenu(element) {
    this.$element = element;
    this.options = $.extend({}, DropdownMenu.defaults, this.$element.data());

    // this.$openMenu = $();
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event DropdownMenu#init
     */
    this.$element.trigger('init.zf.dropdown');
  }

  /**
   * Default settings for plugin
   */
  DropdownMenu.defaults = {
    // toggleOn: 'both',
    clickOpen: true,
    closeOnClick: true,
    disableHover: false,
    autoclose: true,
    hoverDelay: 150,
    closingTime: 500,
    keyboardAccess: true,
    wrapOnKeys: true,
    alignment: 'left',
    vertical: false
  };

  DropdownMenu.prototype._init = function() {
    this.$element.attr('role', 'menubar');
    this.options.vertical = this.$element.hasClass('vertical');
    this._prepareMenu(this.$element);
    this._addTopLevelKeyHandler();
  };

  DropdownMenu.prototype._prepareMenu = function(){
    var _this = this;
    this.$tabs = this.$element.children('li.has-submenu');
    this.$tabs.children('[data-submenu]').addClass('first-sub');
    this.$submenus = this.$element.find('li.has-submenu');
    this.$menuItems = this.$element.find('li').attr({'role': 'menuitem', 'tabindex': 0});
    this.$menuItems.children('a').attr('tabindex', -1);
    if(this.$element.hasClass('align-right')){
      this.options.alignment = 'right';
      this.$submenus.addClass('right');
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
    // this.$tabs[0].setAttribute('tabindex', 0);

    this.$submenus.each(function(){
      var $sub = $(this);

      if(_this.$element.hasClass('align-right')){
        $sub.children('[data-submenu]').addClass('right');
      }

      $sub.children('[data-submenu]')
          .attr({
            'aria-hidden': true,
            'tabindex': -1,
            'role': 'menu'
          }).addClass('vertical');
      _this._events($sub);
    });
  };

  DropdownMenu.prototype._events = function($elem){
    var _this = this;

    // if(this.options.keyboardAccess){
    //   this._addKeyupHandler($elem);
    // }

    if(this.options.clickOpen){
      $elem.on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
        e.preventDefault();
        e.stopPropagation();

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
  };
  DropdownMenu.prototype._addTopLevelKeyHandler = function(){
    Foundation.KeyboardAccess(this);
    // var _this = this,
    //     vertical = this.options.vertical,
    //     $firstItem = this.$element.children('li:first-of-type'),
    //     $lastItem = this.$element.children('li:last-of-type');
    // this.$tabs.on('focus.zf.dropdownmenu', function(){
    //   // console.log('what?', this);
    //   _this._show($(this));
    // }).on('focusout.zf.dropdownmenu', function(e){
    //   console.log('au revoir');
    //   _this._hide($(this))
    // });
    // this.$tabs.on('keydown.zf.dropdownmenu', function(e){
    //   if (e.which !== 9) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    //   console.log(e.which);
    //
    //   var $tabTitle = $(this),
    //       $prev = $tabTitle.prev(),
    //       $next = $tabTitle.next();
    //   if(_this.options.wrapOnKeys){
    //     $prev = $prev.length ? $prev : $lastItem;
    //     $next = $next.length ? $next : $firstItem;
    //   }
    //   if(checkClass($prev) || checkClass($next)){
    //     return;
    //   }
    //
    //   switch (e.which) {
    //
    //     case 32://return or spacebar
    //     case 13:
    //       console.log($tabTitle.find('ul.submenu > li:first-of-type'));
    //       $tabTitle.find('[role="menuitem"]:first-of-type').addClass('is-active').focus().select();
    //       // _this._hideOthers($tabTitle);
    //       _this._show($tabTitle);
    //       break;
    //
    //     case 40: //down
    //       break;
    //     case 38://up
    //       break;
    //
    //     case 37://left
    //     if(vertical){
    //       break;
    //     }
    //       $prev.focus();
    //       // _this._hideOthers($prev);
    //       _this._show($prev);
    //       break;
    //     case 39://right
    //     if(vertical){
    //       break;
    //     }
    //       $next.focus();
    //       // _this._hideOthers($next);
    //       _this._show($next);
    //       break;
    //
    //     case 27://esc
    //       _this._hideAll();
    //       $tabTitle.blur();
    //       break;
    //     default:
    //       return;
    //   }
    // });
  };

  DropdownMenu.prototype._addKeyupHandler = function($elem){


  };
  DropdownMenu.prototype._addBodyHandler = function(){
    var $body = $('body'),
        _this = this;
    $body.not(_this.$element).on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
      _this._hideAll();
      $body.off('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu');
    })
  };
//show & hide stuff @private
  DropdownMenu.prototype._show = function($elem){
    var $sub = $elem.children('[data-submenu]:first-of-type');
    $elem.addClass('is-active');
    $sub.css('visibility', 'hidden').addClass('js-dropdown-active')
        .attr('aria-hidden', false);


    //break this into own function
    var clear = Foundation.ImNotTouchingYou($sub, null, true);
    if(!clear){
      if(this.options.alignment === 'left'){
        $sub.addClass('right');
      }else{
        $sub.removeClass('right');
      }
      this.changed = true;
    }
      $sub.css('visibility', '');
  };

  DropdownMenu.prototype._hide = function($elem){
    this._hideSome($elem);
  };
  DropdownMenu.prototype._hideSome = function($elems){
    if($elems.length){
      // if($elems.hasClass('first-sub')){
      //   console.log('true');
      //   $elems.blur();
      // }
      $elems.removeClass('is-active').data('isClick', false)

            .find('.is-active').removeClass('is-active').data('isClick', false).end()

            .find('.js-dropdown-active').removeClass('js-dropdown-active')
                                        .attr('aria-hidden', true);
      $elems.parent('.has-submenu').removeClass('is-active');
      if(this.changed){
        //remove position class
        if(this.options.alignment === 'left'){
          $elems.find('.right').removeClass('right');
        }else{
          $elems.find('[data-submenu]').addClass('right');
        }
      }
    }
  };
  DropdownMenu.prototype._hideOthers = function($elem){
    this._hideSome($elem.siblings('.has-submenu.is-active'));
  };
  DropdownMenu.prototype._hideAll = function(){
    this._hideSome(this.$element);
  };
//****
  DropdownMenu.prototype.destroy = function() {
    this._hideAll();
    this.$element
        .removeData('zf-plugin')
        .find('li')
        .removeClass('js-dropdown-nohover')
        .off('.zf.dropdownmenu');
  };
  Foundation.plugin(DropdownMenu);

  function checkClass($elem){
    return $elem.hasClass('is-active');
  }

}(Foundation, jQuery);
