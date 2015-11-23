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
    clickOpen: false,
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
    this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

    if(this.$element.hasClass(this.options.rightClass) || this.options.alignment === 'right'){
      this.options.alignment = 'right';
      subs.addClass('is-left-arrow opens-left');
    }else{
      subs.addClass('is-right-arrow opens-right');
    }
    if(!this.isVert){
      this.$tabs.filter('.is-dropdown-submenu-parent').removeClass('is-right-arrow is-left-arrow opens-right opens-left')
          .addClass('is-down-arrow');
    }
    this._events();
  };
  DropdownMenu.prototype._events = function(){
    var _this = this,
        hasTouch = window.ontouchstart !== undefined,
        parClass = 'is-dropdown-submenu-parent',
        delay;

    if(this.options.clickOpen || hasTouch){
      this.$menuItems.on('click.zf.dropdownmenu', function(e){

        var $elem = $(e.target).parentsUntil('ul', '.' + parClass),
            hasSub = $elem.hasClass(parClass),
            isOpen = $elem.attr('aria-expanded') === 'true',
            hasClicked = $elem.attr('data-is-click') === 'true',
            $sub = $elem.children('.is-dropdown-submenu');
            console.log('1-click', $elem, $elem.attr('aria-expanded'));

        if(hasSub){
          if(hasClicked){
            console.log('2-has clicked');
            if(hasTouch){ return;}

            else{
            console.log('3-else should close');
            e.stopImmediatePropagation();
            e.preventDefault();
            _this._hide($elem);
            }
          }else{
            console.log('4-should open');
            e.stopImmediatePropagation();
            e.preventDefault();
            _this._show($elem.children('.is-dropdown-submenu'));
            $elem.add($elem.parentsUntil(_this.$element, '.' + parClass)).attr('data-is-click', true);
          }
        }else{ console.log('5-no child');return; }
      });
    }

    if(!this.options.disableHover){
      this.$menuItems.on('mouseenter.zf.dropdownmenu', function(e){
        var $elem = $(this),
            hasSub = $elem.hasClass(parClass);

        if(hasSub){
          console.log('8-should show on hover');
          clearTimeout(delay);
          delay = setTimeout(function(){
            _this._show($elem.children('.is-dropdown-submenu'));
          }, _this.options.hoverDelay);
        }
      }).on('mouseleave.zf.dropdownmenu', function(e){
        var $elem = $(this),
            hasSub = $elem.hasClass(parClass);
        if(hasSub && _this.options.autoclose){
          if($elem.attr('data-is-click') === 'true' && _this.options.clickOpen){console.log('6-should not close'); return false;}
          clearTimeout(delay);
          delay = setTimeout(function(){
            console.log('7-closing anyway...');
            _this._hide();
          }, _this.options.closingTime);
        }
      });
    }
  };
  DropdownMenu.prototype._handleEvent = function(evt, elem){
    var $elem = $(elem),
        _this = this,
        hasSub = $elem.hasClass('is-dropdown-submenu-parent'),
        funcs = {
          'click': function(){
            // console.log('click');
            if(hasSub) evt.preventDefault();
            if($elem.data('isClick')) _this._hide($elem);
            else _this._show($elem.children('.is-dropdown-submenu'));
          },
          'mouseenter': function(){
            // console.log('mouseenter');
          }
        };

      // console.log(evt.type);
      funcs[evt.type]();
    // if(hasSub){
    //   evt.preventDefault();
    //   _this._show($elem.children('.is-dropdown-submenu'));
    // }

  };
  DropdownMenu.prototype._show = function($sub){
    var idx = this.$tabs.index(this.$tabs.filter(function(i, el){
      return $(el).find($sub).length > 0;
    }));
    var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');

    this._hide($sibs, idx);
    $sub.addClass('js-dropdown-active').attr({'aria-hidden': false})
        .parent('li.is-dropdown-submenu-parent').addClass('is-active')
        .attr({'aria-selected': true, 'aria-expanded': true})//.data('isActive', true);

  };
  DropdownMenu.prototype._hide = function($sibs, idx, $elem){
    var $toClose;
    if($sibs && $sibs.length){
      $toClose = $sibs;
    }else if(idx !== undefined){
      $toClose = this.$tabs.not(function(i, el){
        return i === idx;
      });
    }else if($elem && $elem.length){
      $toClose = $elem;
    }
    else{
      $toClose = this.$element;
    }
    if($toClose.length){
    // console.log('toclose');
      $toClose.find('.is-active').add($toClose).data('isClick', false).attr({
        'aria-selected': false,
        'aria-expanded': false,
        'data-is-click': false
      }).removeClass('is-active')
      // .end()
      // console.log('close',$toClose.data());

      $toClose.find('.js-dropdown-active').attr({
        'aria-hidden': true
      }).removeClass('js-dropdown-active');
    }
  };

  Foundation.plugin(DropdownMenu, 'DropdownMenu');
}(jQuery, window.Foundation);
