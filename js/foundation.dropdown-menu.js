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
    // wrapOnKeys: true,
    alignment: 'left',
    vertical: false,
    vertClass: 'vertical',
    rightClass: 'align-right'
  };

  DropdownMenu.prototype._init = function() {
    this.$element.attr('role', 'menubar');
    this.options.vertical = this.$element.hasClass(this.options.vertClass);
    this._prepareMenu();
    // this._addTopLevelKeyHandler();
  };

  DropdownMenu.prototype._prepareMenu = function(){
    var _this = this;
    this.$tabs = this.$element.children('li.has-submenu');
    this.$tabs.children('[data-submenu]').addClass('first-sub');
    this.$submenus = this.$element.find('li.has-submenu');
    this.$menuItems = this.$element.find('li').attr({'role': 'menuitem', 'tabindex': 0});
    this.$menuItems.children('a').attr('tabindex', -1);
    if(this.$element.hasClass(this.options.rightClass)){
      this.options.alignment = 'right';
      this.$submenus.addClass('is-right-arrow');
    }else{
      this.$submenus.addClass('is-left-arrow');
    }
    if(!this.options.vertical){
      this.$tabs.removeClass('is-right-arrow is-left-arrow').addClass('is-down-arrow');
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

      if(_this.options.alignment === 'right'){
        $sub.children('[data-submenu]').addClass('is-right-arrow');
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

    if (this.options.keyboardAccess) {
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
          if (_this.options.vertical) { // vertical menu
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
        Foundation.handleKey(e, _this, functions);
      });
    } // end if keyboardAccess
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
        $sub.removeClass('is-is-left-arrow').addClass('is-right-arrow');
      }else{
        $sub.removeClass('is-right-arrow').addClass('is-left-arrow');
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
          $elems.find('.is-right-arrow').removeClass('is-right-arrow').addClass('is-left-arrow');
        }else{
          $elems.find('.is-left-arrow').removeClass('is-left-arrow').addClass('is-right-arrow');
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
