;(function ($, window, document, undefined) {
  'use strict';

  Foundation.libs = Foundation.libs || {};

  Foundation.libs.tabs = {
    version : '2.0',

    settings : {
      callback: $.noop,
      init: false
    },

    init : function (methods, options, response) {
      if (typeof methods === 'object') {
        $.extend(true, this.settings, methods);
        if (!this.settings.init) this.events();

        return this.settings.init;
      } else {
        // fire method
        return this[methods].apply(this, [options, response]);
      }
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