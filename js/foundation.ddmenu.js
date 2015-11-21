!function($, Foundation){
  'use strict';

  function DropdownMenu(element, options){
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
  }

  DropdownMenu.defaults = {
    disableHover: false,
    autoclose: true,
    hoverDelay: 50,
    closingTime: 500,
    alignment: 'left',
    closeOnClick: false,
    verticalClass: 'vertical',
    rightClass: 'align-right'
  };

  DropdownMenu.prototype._init = function(){
    var subs = this.$element.find('li.is-dropdown-submenu-parent');
    this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');

    this.$menuItems = this.$element.find('[role="menuitem"]');
    this.$tabs = this.$element.children('[role="menuitem"]');
    this.isVert = this.$element.hasClass(this.options.verticalClass);

    // console.log(this.$menuItems);
    if(this.$element.hasClass(this.options.rightClass) || this.options.alignment === 'right'){

      this.options.alignment = 'right';
      subs.addClass('is-left-arrow opens-left');
    }else{
      console.log('left');
      subs.addClass('is-right-arrow opens-right');
    }
    if(!this.isVert){
      this.$tabs.removeClass('is-right-arrow is-left-arrow opens-right opens-left')
          .addClass('is-down-arrow');
    }
    this._events();
  };
  DropdownMenu.prototype._events = function(){
    var _this = this,
        hasTouch = window.ontouchstart !== undefined,
        parClass = 'is-dropdown-submenu-parent';
    this.$menuItems.on('click.zf.dropdownmenu', function(e){
      console.log('click');
      var $elem = $(this),
          hasSub = $elem.hasClass(parClass);

      if(hasSub){
        e.preventDefault();
        _this._show($elem.children('.is-dropdown-submenu'));
      }

    }).on('mouseenter.zf.dropdownmenu', function(e){
      console.log('hover');
    });
  };
  DropdownMenu.prototype._show = function($sub){
    var idx = this.$tabs.index($sub.parentsUntil(this.$element));

    this._hide(idx);
    $sub.addClass('js-dropdown-active')
        .parent('li.is-dropdown-submenu-parent').addClass('is-active');

  };
  DropdownMenu.prototype._hide = function(idx){

  };
  Foundation.plugin(DropdownMenu, 'DropdownMenu');
}(jQuery, window.Foundation);
