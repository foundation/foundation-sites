;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.tabs = {
    settings : {
      callback: $.noop,
      init: false
    },

    init : function (methods, options, response) {
      this.settings = $.extend({}, options, this.settings);

      return if (!this.settings.init) this.events();
    },

    events : function () {
      var self = this;

      $(document).on('click.fndtn', '.tabs a', function (e) {
        self.set_tab($(this).parent('dd, li'), e);
      });
      
      this.settings.init = true;
    },

    set_tab : function ($tab, e) {
      var $activeTab = $tab.closest('dl, ul').find('.active'),
          target = $tab.children('a').attr("href"),
          hasHash = /^#/.test(target),
          $content = $(target + 'Tab');

      if (hasHash && $content.length > 0) {
        // Show tab content
        e.preventDefault();
        $content.closest('.tabs-content').children('li').removeClass('active').hide();
        $content.css('display', 'block').addClass('active');
      }

      // Make active tab
      $activeTab.removeClass('active');
      $tab.addClass('active');

      this.settings.callback();
    }
  };

}(jQuery, this, this.document));