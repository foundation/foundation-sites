!function(Foundation, $) {
  'use strict';

  /**
   * Creates a new instance of Drilldown.
   * @class
   * @fires Drilldown#init
   * @param {jQuery} element - jQuery object to make into a drilldown menu.
   * @param {Object} options - Overrides to the default plugin settings.
   */
  function Drilldown(element) {
    this.$element = element;
    this.options = $.extend({}, Drilldown.defaults, this.$element.data());
    this.$container = $();
    this.$currentMenu = this.$element;

    this._init();

    /**
     * Fires when the plugin has been successfuly initialized.
     * @event Drilldown#init
     */
    this.$element.trigger('init.zf.drilldown');
  }

  Drilldown.defaults = {
    /**
     * HTML to use for the back button at the top of each sub-menu.
     * @option
     * @sample '<li class="js-drilldown-back"><a>Back</a></li>'
     */
    backButton: '<li class="js-drilldown-back"><a>Back</a></li>'
  };

  Drilldown.prototype = {
    /**
     * Initializes the Drilldown by creating a container to wrap the menu bar in, and initializing all submenus.
     * @private
     */
    _init: function() {
      this.$container = $('<div class="is-drilldown"></div>');
      this.$container.css('width', this.$element.css('width'));
      this.$element.wrap(this.$container);
      this._prepareMenu(this.$element, true);
    },

    /**
     * Scans a menu bar for any sub menu bars inside of it. This is a recursive function, so when a sub menu is found, this method will be called on that sub menu.
     * @private
     * @param {jQuery} $elem - Menu to scan for sub menus.
     * @param {Boolean} root - If true, the menu being scanned is at the root level.
     */
    _prepareMenu: function($elem, root) {
      var _this = this;

      // Create a trigger to move up the menu. This is not used on the root-level menu, because it doesn't need a back button.
      if (!root) {
        var $backButton = $(_this.options.backButton);
        $backButton.click(function() {
          _this.backward();
        });
        // console.log(_this.options.backButton);
        $elem.prepend($backButton);
      }

      // Look for sub-menus inside the current one
      $elem.children('li').each(function() {
        var $submenu = $(this).children('[data-submenu]');

        // If it exists...
        if ($submenu.length) {
          $submenu.addClass('is-drilldown-sub');

          // Create a trigger to move down the menu
          $(this).children('a').click(function() {
            _this.forward($submenu);
            return false;
          });

          // We have to go deeper
          _this._prepareMenu($submenu, false);
        }
      });
    },

    /**
     * Moves down the drilldown by activating the menu specified in `$target`.
     * @fires Drilldown#forward
     * @param {jQuery} $target - Sub menu to activate.
     */
    forward: function($target) {
      var _this = this;

      Foundation.requestAnimationFrame(function() {
        $target.addClass('is-active');
        _this.$currentMenu = $target;

        /**
         * Fires when the menu is done moving forwards.
         * @event Drilldown#forward
         */
        _this.$element.trigger('forward.zf.drilldown', [_this.$currentMenu]);
      });
    },

    /**
     * Moves up the drilldown by deactivating the current menu.
     * @fires Drilldown#backward
     */
    backward: function() {
      var _this = this;

      Foundation.requestAnimationFrame(function() {
        _this.$currentMenu.removeClass('is-active');
        _this.$currentMenu = _this.$currentMenu.parents('[data-drilldown], [data-submenu]');

        /**
         * Fires when the menu is done moving backwards.
         * @event Drilldown#backward
         */
        _this.$element.trigger('backward.zf.drilldown', [_this.$currentMenu]);
      });
    },

    /**
     * Destroys an instance of a drilldown. A callback can optionally be run when the process is finished.
     * @param {Function} cb - Callback to run when the plugin is done being destroyed.
     */
    destroy: function(cb) {
      this.$element.find('[data-submenu]').removeClass('is-drilldown-sub');
      this.$currentMenu.removeClass('is-active');
      this.$element.find('.is-drilldown-back').remove();
      this.$element.removeData('zf-plugin');
      this.$element.unwrap();

      if (typeof cb === 'function') cb();
    }
  };

  Foundation.plugin(Drilldown);
}(Foundation, jQuery);
