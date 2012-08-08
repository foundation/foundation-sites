(function ($) {

  $.fn.foundationTabs = function (options) {

    var settings = $.extend({
      callback: $.noop
    }, options);

    var activateTab = function ($tab) {
      var $activeTab = $tab.closest('dl').find('dd.active'),
          contentLocation = $tab.children('a').attr("href") + 'Tab';

      // Strip off the current url that IE adds
      contentLocation = contentLocation.replace(/^.+#/, '#');

      //Make Tab Active
      $activeTab.removeClass('active');
      $tab.addClass('active');

      //Show Tab Content
      $(contentLocation).closest('.tabs-content').children('li').removeClass('active').hide();
      $(contentLocation).css('display', 'block').addClass('active');
    };

    $(document).on('click.fndtn', 'dl.tabs dd a', function (event){
      activateTab($(this).parent('dd'));
    });

    if (window.location.hash) {
      activateTab($('a[href="' + window.location.hash + '"]').parent('dd'));
      settings.callback();
    }

  };

})(jQuery);