'use strict';

!function($) {

const Nest = {
  Feather(menu, type = 'zf') {
    menu.attr('role', 'menubar');

    var items = menu.find('li').attr({'role': 'menuitem'}),
        subMenuClass = `is-${type}-submenu`,
        subItemClass = `${subMenuClass}-item`,
        hasSubClass = `is-${type}-submenu-parent`;

    items.each(function() {
      var $item = $(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item
          .addClass(hasSubClass)
          .attr({
            'aria-haspopup': true,
            'aria-label': $item.children('a:first').text()
          });

        $sub
          .addClass(`submenu ${subMenuClass}`)
          .attr({
            'data-submenu': '',
            'role': 'menu'
          });
      }

      if ($item.parent('[data-submenu]').length) {
        $item.addClass(`is-submenu-item ${subItemClass}`);
      }
    });

    return;
  },

  Burn(menu, type) {
    var //items = menu.find('li'),
        subMenuClass = `is-${type}-submenu`,
        subItemClass = `${subMenuClass}-item`,
        hasSubClass = `is-${type}-submenu-parent`;

    menu
      .find('*')
      .removeClass(`${subMenuClass} ${subItemClass} ${hasSubClass} is-submenu-item submenu is-active`)
      .removeAttr('data-submenu').css('display', '');

    // console.log(      menu.find('.' + subMenuClass + ', .' + subItemClass + ', .has-submenu, .is-submenu-item, .submenu, [data-submenu]')
    //           .removeClass(subMenuClass + ' ' + subItemClass + ' has-submenu is-submenu-item submenu')
    //           .removeAttr('data-submenu'));
    // items.each(function(){
    //   var $item = $(this),
    //       $sub = $item.children('ul');
    //   if($item.parent('[data-submenu]').length){
    //     $item.removeClass('is-submenu-item ' + subItemClass);
    //   }
    //   if($sub.length){
    //     $item.removeClass('has-submenu');
    //     $sub.removeClass('submenu ' + subMenuClass).removeAttr('data-submenu');
    //   }
    // });
  }
}

Foundation.Nest = Nest;

}(jQuery);
