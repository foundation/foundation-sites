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
    closingTime: 500
  };

  DropdownMenu.prototype._init = function() {
    this._prepareMenu(this.$element);
    // var _this = this;
    // this.$element.find('.has-submenu').each(function(){
    //   var $elem = $(this);
    //   _this._events($elem);
    // })
  };
  DropdownMenu.prototype._prepareMenu = function(){
    var _this = this;
    this.$submenus = this.$element.find('li.has-submenu');
    this.$tabs = this.$element.children('.has-submenu');
    this.$tabs.children('[data-submenu]').addClass('first-sub');

    this.$submenus.each(function(){
      var $sub = $(this);
      $sub.clickCounter = 0;
      _this._events($sub);
    });
  };

  DropdownMenu.prototype._events = function($elem){
    var _this = this;
    if(this.options.clickOpen){
      $elem.on('click.zf.dropdownmenu tap.zf.dropdownmenu touchend.zf.dropdownmenu', function(e){
        e.preventDefault();
        e.stopPropagation();
        $elem.clickCounter++
        if($elem.isHover && ($elem.clickCounter % 2)){ return false; }

        if($elem.find('.js-dropdown-active').length){
          _this._hide($elem);
        }else{
          _this._hideOthers($elem);
          _this._show($elem);
        }

        if(_this.options.closeOnClick){
          _this._addBodyHandler();
        }
      });
    }

    // if(!this.options.disableHover){
    //   $elem.on('mouseenter.zf.dropdownmenu', function(e){
    //     $elem.isHover = true;
    //     clearTimeout(_this.closeTimer);
    //     _this.openTimer = setTimeout(function(){
    //         _this._hideOthers($elem);
    //         _this._show($elem);
    //     }, _this.options.hoverDelay);
    //   }).on('mouseleave.zf.dropdownmenu', function(e){
    //     $elem.isHover = false;
    //     clearTimeout(_this.openTimer);
    //     _this.closeTimer = setTimeout(function(){
    //       _this._hide($elem);
    //     }, _this.options.closingTime);
    //   });
    // }
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
    if($elem.parents('.submenu')[0]){
      // var dims = $($elem.parents('.submenu')[0]).width();
      // var dims = Foundation.GetDimensions($($elem.parents('.submenu')[0]));
      // $elem.children('[data-submenu]').css('left', dims + 'px');
    }
    $elem.children('[data-submenu]').addClass('js-dropdown-active');
  };
  DropdownMenu.prototype._hide = function($elem){
    $elem.find('.js-dropdown-active').removeClass('js-dropdown-active');
  };
  DropdownMenu.prototype._hideOthers = function($elem){
    $elem.siblings().find('.js-dropdown-active').removeClass('js-dropdown-active');
  };
  DropdownMenu.prototype._hideAll = function(){
    this.$element.find('.js-dropdown-active').removeClass('js-dropdown-active');
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

  // function randomIdGen(length){
  //   return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
  // }
}(Foundation, jQuery);
