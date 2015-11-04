!function($, Foundation){
  'use strict';

  function FeatherNest(menu, type){
    menu.attr('role', 'menubar');
    var items = menu.find('li').attr({'role': 'menuitem', 'tabindex': 0}),
        type = type || 'zf',
        subMenuClass = 'is-' + type + '-submenu',
        subItemClass = subMenuClass + '-item';

    items.each(function(){
      var $item = $(this),
          $sub = $item.children('ul');
      if($sub.length){
        $item.addClass('has-submenu')
        $sub.addClass('submenu ' + subMenuClass).attr('data-submenu', '');
      }
      if($item.parent('[data-submenu]').length){
        $item.addClass('is-submenu-item ' + subItemClass);
      }
    });
    return;
  }
  Foundation.FeatherNest = FeatherNest;
}(jQuery, window.Foundation);
