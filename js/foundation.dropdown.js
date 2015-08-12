!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Dropdown.
   * @class
   * @fires Dropdown#init
   * @param {jQuery} element - jQuery object to make into a dropdown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Dropdown(element, options) {
    this.$element = element;
    this.options = $.extend(this.defaults, options || {});

    this.$openMenu = $();
    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Dropdown#init
     */
    this.$element.trigger('init.zf.dropdown');
  }

  /**
   * Default settings for plugin
   */
  Dropdown.prototype.defaults = {
    toggleOn: 'both',
    closeOnClick: true,
    disableHover: false,
    hoverTimeout: 150
  };

  Dropdown.prototype._init = function() {
    // this._prepareMenu(this.$element);
    var _this = this;
    this.$element.find('li').each(function(){
      var $elem = $(this);
      if($elem.hasClass('has-submenu')){
        if(_this.options.disableHover){
          $elem.addClass('js-dropdown-nohover');
        }
        _this._events($elem);
      }
    })
  };

  Dropdown.prototype._events = function($elem){
    var _this = this;
    var $tar = $elem.children('[data-submenu]')
    if(!this.options.disableHover){
      $elem.children('a').off('.dropdown').on('mouseenter.zf.dropdown', function(e){
        e.stopPropagation();
        e.preventDefault();
        setTimeout(function(){
          _this._show($tar);
        }, _this.options.hoverTimeout);
      }).on('mouseleave.zf.dropdown', function(e){
        // set
        e.stopPropagation();
        e.preventDefault();
        _this._hide($tar);
      })
    }
    $elem.children('a').on('click.zf.dropdown', function(e){
      // _this._show($elem);
      _this.toggleMenu($tar)
    })
    console.log($elem);
  };

  Dropdown.prototype._show = function($elem){
    console.log('showing');
    $elem.addClass('js-dropdown-active');
  };
  Dropdown.prototype._hide = function($elem){
    console.log('hiding');
    $elem.removeClass('js-dropdown-active');
  };

  Dropdown.prototype._prepareMenu = function($elem) {
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

  Dropdown.prototype.toggleMenu= function($target) {
    if ($target.is(this.$openMenu)) {
      this.$openMenu.removeClass('js-dropdown-active');
    }
    else {
      this.$openMenu.removeClass('js-dropdown-active');
      $target.addClass('js-dropdown-active');
      this.$openMenu = $target;
    }
  };

  Dropdown.prototype.destroy = function() {
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

  Foundation.plugin(Dropdown);
}(Foundation, jQuery);
