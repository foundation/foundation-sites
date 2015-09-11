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
    console.log('loading');
    this.$element = element;
    this.options = $.extend({}, DropdownMenu.defaults, this.$element.data());

    this.$openMenu = $();
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
    toggleOn: 'both',
    closeOnClick: true,
    disableHover: false,
    hoverTimeout: 150,
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

  DropdownMenu.prototype._events = function($elem){
    var _this = this;
    var $tar = $elem.find('.has-submenu');
    console.log($tar);
    if(!this.options.disableHover){
      $($tar).on('mouseenter.zf.dropdown', function(e){
        e.stopPropagation();
        e.preventDefault();
        setTimeout(function(){
          _this._show($tar);
        }, _this.options.hoverTimeout);
      }).on('mouseleave.zf.dropdown', function(e){
        // set
        _this.timeOut = setTimeout(function(){
          _this._hide($tar);
        }, _this.options.hoverTimeout)
      })
    }
    $elem.children('a').on('click.zf.dropdown', function(e){
      e.stopPropagation();
      e.preventDefault();
      // _this._show($elem);
      _this.toggleMenu($tar)
    })
  };

  DropdownMenu.prototype._show = function($elem){
    $elem.addClass('js-dropdown-active');
  };
  DropdownMenu.prototype._hide = function($elem){
    $elem.removeClass('js-dropdown-active');
  };


  DropdownMenu.prototype.toggleMenu= function($target) {
    if ($target.is(this.$openMenu)) {
      this.$openMenu.removeClass('js-dropdown-active');
    }
    else {
      this.$openMenu.removeClass('js-dropdown-active');
      $target.addClass('js-dropdown-active');
      this.$openMenu = $target;
    }
  };

  DropdownMenu.prototype.destroy = function() {
    this.$element.find('li').each(function() {
      $(this)
        .children('[data-submenu]')
          .removeClass('js-dropdown-nohover')
          .end()
        .children('a')
          .off('.zf.dropdown');
    });
    this.$openMenu.removeClass('js-dropdown-active');
    this.$element.removeData('zf-plugin');
  };

  Foundation.plugin(DropdownMenu);
  DropdownMenu.prototype._prepareMenu = function($elem) {
    var _this = this;

    $elem.children('li').each(function() {
      var $submenu = $(this).children('[data-submenu]');

      if ($submenu.length) {
        if(!_this.options.toggleOn === 'both' || 'hover'){
          $submenu.addClass('js-dropdown-nohover');
        }

        $(this).children('a').on('click.zf.dropdown', function(event) {
          event.stopPropagation();

          _this.toggleMenu($submenu);

          return false;
        }).on('mouseenter.zf.dropdown', function(event) {
          event.stopPropagation();
          event.preventDefault();
          _this.toggleMenu($submenu);
        });
        // .on('mouseleave.zf.dropdown', function(event){
        //   event.stopPropagation();
        //   _this.toggleMenu($submenu);
        // });

        _this._prepareMenu($submenu);
      }
    });
  };
}(Foundation, jQuery);
