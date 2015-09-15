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
    wrapOnKeys: true
  };

  DropdownMenu.prototype._init = function() {
    this.$element.attr('role', 'menubar');
    this._prepareMenu(this.$element);
  };

  DropdownMenu.prototype._prepareMenu = function(){
    var _this = this;
    this.$submenus = this.$element.find('li.has-submenu');
    this.$tabs = this.$element.children('.has-submenu');
    this.$menuItems = this.$element.find('li').attr('role', 'menuitem');
    // console.log(this.$element.attr('class'));
    if(this.$element.hasClass('align-right')){
      this.$submenus.addClass('right');
      this.$tabs.addClass('right');
    }
    this.$tabs.children('[data-submenu]').addClass('first-sub');
    this.$tabs.each(function(){
      var $tab = $(this);
      $tab.attr({
        'role': 'menuitem',
        'tabindex': 0,
        'title': $tab.children('a:first-child').text()/*.match(/\w/ig).join('')*/
      });//maybe add a more specific regex to match alphanumeric characters and join them appropriately
      if(_this.$element.hasClass('align-right')){
        $tab.children('[data-submenu]').addClass('right');
      }
      if($tab.children('[data-submenu]')){
        $tab.attr('aria-haspopup', true);
      }
    });

    this.$submenus.each(function(){
      var $sub = $(this);
      $sub.clickCounter = 0;
      if(_this.$element.hasClass('align-right')){
        $sub.children('[data-submenu]').addClass('right');
      }

      $sub.children('.submenu')
          .attr({
            'aria-hidden': true,
            'tabindex': -1,
            'role': 'menu'
          });
      _this._events($sub);
    });
  };

  DropdownMenu.prototype._events = function($elem){
    var _this = this;

    if(this.options.clickOpen){
      $elem.on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
        e.preventDefault();
        e.stopPropagation();
        $elem.attr('data-is-click', true);
        $elem.clickCounter++
        console.log($elem.clickCounter);
        if(_this.options.closeOnClick){
          _this._addBodyHandler();
        }
        if($elem.isHover && ($elem.clickCounter % 2)){ return false; }

        if($elem.find('.js-dropdown-active').length){
          _this._hide($elem);
        }else{
          _this._hideOthers($elem);
          _this._show($elem);
        }

      });
    }
    if(_this.options.keyboardAccess){
      _this._addKeyupHandler($elem);
      // $elem.on('keyup.zf.dropdownmenu', function(e){
      //   e.preventDefault();
      //   e.stopPropagation();
      //   switch (e.which) {
      //     case 27:
      //       console.log('return?');
      //       break;
      //     default:
      //
      //   }
      // })
    }
    if(!this.options.disableHover){
      $elem.on('mouseenter.zf.dropdownmenu', function(e){
        $elem.isHover = true;
        clearTimeout(_this.closeTimer);
        _this.openTimer = setTimeout(function(){
            _this._hideOthers($elem);
            _this._show($elem);
        }, _this.options.hoverDelay);
      }).on('mouseleave.zf.dropdownmenu', function(e){
        $elem.isHover = false;
        clearTimeout(_this.openTimer);
        if(!$elem.attr('data-is-click') && _this.options.autoclose){
          _this.closeTimer = setTimeout(function(){
            _this._hide($elem);
          }, _this.options.closingTime);
        }
      });
    }
  };
  DropdownMenu.prototype._addKeyupHandler = function($elem){
    var _this = this,
        $firstItem = this.$element.children('li:first-of-type'),
        $lastItem = this.$element.children('li:last-of-type');
    // console.log('first',$firstItem,'\nlast', $lastItem);

  };
  DropdownMenu.prototype._addBodyHandler = function(){
    console.log('adding body');
    var $body = $('body'),
        _this = this;
    $body.not(_this.$element).on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
      console.log('body click');
      _this._hideAll();
      $body.off('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu');
    })
  };
//show & hide stuff @private
  DropdownMenu.prototype._show = function($elem){
    $elem.addClass('is-active')
         .children('[data-submenu]').addClass('js-dropdown-active')
         .attr('aria-hidden', false);
  };
  DropdownMenu.prototype._hide = function($elem){
    $elem.removeClass('is-active').attr('data-is-click', false)
         .find('.js-dropdown-active').removeClass('js-dropdown-active')
         .attr('aria-hidden', true)
         .end().find('.is-active').removeClass('is-active');
  };
  DropdownMenu.prototype._hideSome = function($elemArr){
    console.log($elemArr);
    $elemArr.removeClass('is-active')
            .find('.is-active').removeClass('is-active').end()
            .find('.js-dropdown-active').removeClass('js-dropdown-active').end()
            .find('[aria-hidden="false"]').attr('aria-hidden', true).end()
            .find('[data-is-click="true"]').attr('data-is-click', false);
  };
  DropdownMenu.prototype._hideOthers = function($elem){
    this._hideSome($elem.siblings());
    // $elem.siblings().removeClass('is-active').attr('data-is-click', false)
    //      .find('.js-dropdown-active').removeClass('js-dropdown-active')
    //      .attr('aria-hidden', true);
  };
  DropdownMenu.prototype._hideAll = function(){
    console.log('body shot');
    this.$element.find('.js-dropdown-active')
                 .removeClass('js-dropdown-active')
                 .end().find('.is-active').removeClass('is-active');
;
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

}(Foundation, jQuery);
