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
    // this._addTopLevelKeyHandler();
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
    this._keys();
  };
  DropdownMenu.prototype._handleKeys = function(e, elem){
    var usedKeys = [9, 13, 27, 32, 37, 38, 39, 40],
        key = e.which;

    e.stopImmediatePropagation();

    if(usedKeys.indexOf(key) < 0){ return; }
    if(key !== 9){
      if((key === 13 || key === 32) && !$(elem).hasClass('has-submenu')){ return; }//if it's a normal link, don't prevent default on return, just move on.

      e.preventDefault();


      if(key === 27){ this._hideAll(); }//esc hide everything

      else if(key === 13 || key === 32){ this._show($(elem)); }//enter/return or spacebar, show the thing

      else{//direction keys... the gnarly bit.
        var $elem = $(elem),
            isTop = this.$tabs.index($elem) > -1,
            isVert = isTop ? this.options.vertical : $elem.parent('[data-submenu]').hasClass('vertical'),
            isRight = this.options.alignment === 'right',
            $siblings = $elem.siblings('[role="menuitem"]'),
            first = $siblings.eq(0),
            last = $siblings.eq(-1),
            next = $elem.next().length ? $elem.next() : first,
            prev = $elem.prev().length ? $elem.prev() : last,
            child, parent;

        if(key === 37){
          // console.log('left');
          if(isVert){
            if(isRight){
              child = $elem.find('[role="menuitem"]').eq(0);
              if(!child.length){ return; }//if no submenu, return
              this._show($elem);
              child.focus();
            }else{
              if(isTop){ this._hide($elem); return; }//if a top level menuitem, there's no where to go, hide the open menu and return
              parent = $elem.parentsUntil('.has-submenu').parent('[role="menuitem"]').focus();
              this._hide(parent);
            }
          }else{
            child = prev.find('[role="menuitem"]').eq(0);
            if(child.length){
              this._show(prev);
            }else{
              this._hideOthers(prev);
            }
            prev.focus();
          }
        }
        else if(key === 39){
          // console.log('right');
          if(isVert){
            if(isRight){
              if(isTop){ this._hide($elem); return; }//if a top level menuitem, there's no where to go, hide the open menu and return
              parent = $elem.parentsUntil('.has-submenu').parent('[role="menuitem"]').focus();
              this._hide(parent);
            }else{
              child = $elem.find('[role="menuitem"]').eq(0);
              if(!child.length){ return; }//if no submenu, return
              this._show($elem);
              child.focus();
            }
          }else{
            child = next.find('[role="menuitem"]');
            if(child.length){
              this._show(next);
            }else{
              this._hideOthers(next);
            }
            next.focus();
          }
        }
        else if(key === 38){
          // console.log('up');
          if(isVert){
            child = prev.find('[role="menuitem"]');
            if(child.length){
              this._show(prev);
            }else{
              this._hideOthers(prev);
            }
            prev.focus();
          }
        }
        else{
          // console.log('down');
          if(isVert){
            child = next.find('[role="menuitem"]');
            if(child.length){
              this._show(next);
            }else{
              this._hideOthers(next);
            }
            next.focus();
          }else{
            child = $elem.find('[role="menuitem"]').eq(0);
            if(child.length){
              this._show($elem);
              child.focus();
            }
          }
        }//40/down
      }
    }

  };
  DropdownMenu.prototype._keys = function(){
    var _this = this;
    this.$menuItems.off('keydown.zf.dropdownmenu').on('keydown.zf.dropdownmenu', function(e){
      _this._handleKeys(e, this);
    });
    // .on('focusin.zf.dropdownmenu', function(e){
    //   var $elem = $(this),
    //       child = $elem.find('[role="menuitem"]');
    //       if(child.length){
    //         _this._show($elem);
    //       }
    // });
  }
  DropdownMenu.prototype._events = function($elem){
    var _this = this;

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

  DropdownMenu.prototype._toggle = function($elem){
    var _this = this;
    // console.log($elem);
    if($elem.hasClass('is-active')){
      _this._hide($elem);
    }else{
      // console.log('this',this);
      this._show($elem);
    }
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
    this._hideOthers($elem);
    $elem.focus();
    // console.log('showing some stuff', $elem.find('li:first-child'));
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
