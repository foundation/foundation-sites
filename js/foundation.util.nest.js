'use strict';

!function($) {

const Nest = {
  Feather(menu, type = 'zf') {

    if( type !== 'accordion'){
      menu.attr('role', 'menubar');
      menu.find('a:first').attr('tabindex', 0);
    } else {
      menu.find('li:first').attr('tabindex', 0);
    }

    var roleType = (type === 'accordion') ? 'treeitem' : 'menuitem',
        elementType = (type === 'accordion') ? 'span' : 'a',
        items = menu.find('li').attr({'role': roleType}),
        subMenuClass = `is-${type}-submenu`,
        subItemClass = `${subMenuClass}-item`,
        hasSubClass = `is-${type}-submenu-parent`,
        noSubClass = `is-${type}-submenu-none`;

    items.each(function() {
      var $item = $(this),
          $sub = $item.children('ul');

      if ($sub.length) {
        $item
          .addClass(hasSubClass)
          .attr({
            'aria-haspopup': true,
            'aria-expanded': false,
            'aria-label': $item.children(elementType + ':first').text()
          });

        $sub
          .addClass(`submenu ${subMenuClass}`)
          .attr({
            'data-submenu': '',
            'aria-hidden': true,
            'role': 'menu'
          });
      } else {
        $item.addClass(noSubClass).find('a').attr('tabindex',-1);
        var text = $item.addClass(noSubClass).find('a').text();
        if( $item.find('a').length > 0 ){
          $item.attr('aria-label',text + ' link');
        }
      }

      if ($item.parent('[data-submenu]').length) {
        $item.addClass(`is-submenu-item ${subItemClass}`);
      }
    });

    return;
  },

  Burn(menu, type) {
    var items = menu.find('li').removeAttr('tabindex'),
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
