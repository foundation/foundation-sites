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
            // isOpen = $elem.attr('aria-expanded') === 'true',
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
            _this._hide($elem);
          }, _this.options.closingTime);
        }
      });
    }
    this.$menuItems.on('keydown.zf.dropdownmenu', function(e){
      var $element = $(e.target).parentsUntil('ul', '[role="menuitem"]'),
          isTab = _this.$tabs.index($element) > -1,
          $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
          $prevElement,
          $nextElement;
          console.log(isTab);
      $elements.each(function(i) {
        if ($(this).is($element)) {
          $prevElement = $elements.eq(i-1);
          $nextElement = $elements.eq(i+1);
          return;
        }
      });

      var nextSibling = function() {
        console.log('should focus next sibling', $nextElement);
        if (!$element.is(':last-child')) $nextElement.children('a:first').focus();
      }, prevSibling = function() {
        console.log('should focus prev sibling', $prevElement.children('a'));
        $prevElement.children('a:first').focus();
      }, openSub = function() {
        var $sub = $element.children('ul.is-dropdown-submenu');
          console.log('should show');
        if($sub.length){
          _this._show($sub);
          $element.find('li > a:first').focus();
        }else{ return; }
      }, closeSub = function() {
        //if ($element.is(':first-child')) {
        var close = $element.parent('ul').parent('li');
        console.log('should close a submenu',$element, close);
          close.children('a:first').focus();
          _this._hide(close);
        //}
      };
      var functions = {
        open: openSub,
        close: function() {
          _this._hide(_this.$element);
          _this.$menuItems.find('a:first').focus(); // focus to first element
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
  };
  DropdownMenu.prototype._show = function($sub){
    var idx = this.$tabs.index(this.$tabs.filter(function(i, el){
      return $(el).find($sub).length > 0;
    }));
    var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');
    console.log($sibs, $sibs.length);
    this._hide($sibs, idx);
    $sub.addClass('js-dropdown-active').attr({'aria-hidden': false})
        .parent('li.is-dropdown-submenu-parent').addClass('is-active')
        .attr({'aria-selected': true, 'aria-expanded': true});

  };
  DropdownMenu.prototype._hide = function($elem, idx){
    var $toClose;
    if($elem && $elem.length){
      $toClose = $elem;
    }else if(idx !== undefined){
      $toClose = this.$tabs.not(function(i, el){
        return i === idx;
      });
    }
    else{
      $toClose = this.$element;
    }
    var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;
    console.log('toclose', somethingToClose);
    if(somethingToClose){
      $toClose.find('li.is-active').add($toClose).attr({
        'aria-selected': false,
        'aria-expanded': false,
        'data-is-click': false
      }).removeClass('is-active');

      // console.log('close',$toClose.data());

      $toClose.find('ul.js-dropdown-active').attr({
        'aria-hidden': true
      }).removeClass('js-dropdown-active');
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

  Foundation.plugin(DropdownMenu, 'DropdownMenu');
}(jQuery, window.Foundation);
