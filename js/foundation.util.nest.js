!function($, Foundation){
  'use strict';
  Foundation.Nest = {
    Feather: function(menu, type){
      menu.attr('role', 'menubar');
      var items = menu.find('li').attr({'role': 'menuitem', 'tabindex': 0}),
          type = type || 'zf',
          subMenuClass = 'is-' + type + '-submenu',
          subItemClass = subMenuClass + '-item';

      items.each(function(){
        var $item = $(this),
            $sub = $item.children('ul');
        if($sub.length){
          $item.addClass('has-submenu');
          $sub.addClass('submenu ' + subMenuClass).attr('data-submenu', '');
        }
        if($item.parent('[data-submenu]').length){
          $item.addClass('is-submenu-item ' + subItemClass);
        }
      });
      return;
    },
    Burn: function(menu, type){
      var items = menu.find('li').removeAttr('tabindex'),
          subMenuClass = 'is-' + type + '-submenu',
          subItemClass = subMenuClass + '-item';

      menu.find('.is-active').removeClass('is-active');

      items.each(function(){
        var $item = $(this),
            $sub = $item.children('ul');
        if($item.parent('[data-submenu]').length){
          $item.removeClass('is-submenu-item ' + subItemClass);
        }
        if($sub.length){
          $item.removeClass('has-submenu');
          $sub.removeClass('submenu ' + subMenuClass).removeAttr('data-submenu');
        }
      });
    }
  };
}(jQuery, window.Foundation);
