;(function ($, window, document, undefined) {
  'use strict';

  var settings = {
        callback: $.noop,
        init: false
      }, 

      methods = {
        init : function (options) {
          settings = $.extend({}, options, settings);

          return this.each(function () {
            if (!settings.init) methods.events();
          });
        },

        events : function () {
          $(document).on('click.fndtn', '.tabs a', function (e) {
            e.preventDefault();
            methods.set_tab($(this).parent('dd, li'));
          });
          
          settings.init = true;
        },

        set_tab : function ($tab) {
          var $activeTab = $tab.closest('dl, ul').find('.active'),
              target = $tab.children('a').attr("href"),
              $content = $(target + 'Tab');

          // Show tab content
          $content.closest('.tabs-content').children('li').removeClass('active').hide();
          $content.css('display', 'block').addClass('active');

          // Make active tab
          $activeTab.removeClass('active');
          $tab.addClass('active');

          settings.callback();
        }
      }

  $.fn.foundationTooltips = function (method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' +  method + ' does not exist on jQuery.foundationTooltips');
    }
  };
}(jQuery, this, this.document));