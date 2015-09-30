!function($, Foundation){
  'use strict';

  function KeyboardAccess(menuBar){
    var mb = menuBar,
        vertical = mb.options.vertical,
        $firstItem = mb.$element.children('li:first-of-type'),
        $lastItem = mb.$element.children('li:last-of-type'),
        mbType = Object.keys(mb.$element.data()).join(' ').match(/dropdownMenu|drilldown|accordionMenu/g)[0];

    console.log(mbType);


    mb.$tabs.on('focusin.zf.dropdownmenu', function(){
      mb._show($(this));
    })
    .on('focusout.zf.dropdownmenu', function(e){
      mb._hide($(this));
    })
    .on('keydown.zf.menubar', function(e){
      /**
       needs to check for arrow keys and respond appropriately including wrap, see photo
       if `esc`, close all open Menus
       return clicks the link if no sub-menu, otherwise opens/closes sub-menu
       tab is cool where it is
       */
      // var hasSub =
      var subRegex = /has-submenu/g,
          vertRegex = /vertical/g,
          rightRegex = /right/g,
          hasSub = subRegex.test(e.target.className) || subRegex.test(e.target.parentNode.className),
          subIsVert = vertRegex.test(e.target.parentNode.parentNode.className),
          isRight = rightRegex.test(e.target.parentNode.parentNode.className),
          $parent;
      if(e.target.tagName.toLowerCase() === 'a'){
        $parent = $(e.target.parentNode);
      }
      console.log(e.target.parentNode.parentNode.className.match(/vertical/g));
      if(e.which !== 9 && hasSub){
        e.preventDefault();
      }
      // if(e.target.className.test(/has-submenu/g)){
      //   console.log('woot');
      //   // e.preventDefault();
      // }
      switch(e.which){
        case 13://return
          if($parent){
            mb._hide($parent);
          }else{
            mb._show($(e.target));
          }
          // if(hasSub && )
        break;
        case 39://right arrow
          if(subIsVert && !isRight){
            $parent.find('.submenu > li:first-child > a').focus();
          }else if(isRight){
            console.log('yo', $parent.parent().parent());
            mb._hide($parent.parent().parent());
            // debugger;
          }
        break;
        case 37://left arrow

        break;
        case 38://up arrow

        break;
        case 40://down arrow

        break;
        case 32://spacebar

        break;
        case 27://escape
          mb._hideAll();
        break;
        case 9://tab

        break;
        default:
        return;
      }

    });


    mb.$submenus.on('focusin.zf.menubar', function(e){
      mb._show($(this));
    });
    // mb.$tabs.on('keydown.zf.dropdownmenu', function(e){
    //   if (e.which !== 9) {
    //     e.preventDefault();
    //     e.stopPropagation();
    //   }
    //   console.log(e.which);
    //
    //   var $tabTitle = $(this),
    //       $prev = $tabTitle.prev(),
    //       $next = $tabTitle.next();
    //   if(mb.options.wrapOnKeys){
    //     $prev = $prev.length ? $prev : $lastItem;
    //     $next = $next.length ? $next : $firstItem;
    //   }
    //   if(checkActive($prev) || checkActive($next)){//only one item in the menu
    //     return;
    //   }
    //
    //   switch (e.which) {
    //
    //     case 32://return or spacebar
    //     case 13:
    //       console.log($tabTitle.find('ul.submenu > li:first-of-type'));
    //       $tabTitle.find('[role="menuitem"]:first-of-type').addClass('is-active').focus().select();
    //       // mb._hideOthers($tabTitle);
    //       mb._show($tabTitle);
    //       break;
    //
    //     case 40: //down
    //       break;
    //     case 38://up
    //       break;
    //
    //     case 37://left
    //     if(vertical){
    //       break;
    //     }
    //       $prev.focus();
    //       // mb._hideOthers($prev);
    //       mb._show($prev);
    //       break;
    //     case 39://right
    //     if(vertical){
    //       break;
    //     }
    //       $next.focus();
    //       // mb._hideOthers($next);
    //       mb._show($next);
    //       break;
    //
    //     case 27://esc
    //       mb._hideAll();
    //       $tabTitle.blur();
    //       break;
    //     default:
    //       return;
    //   }
    // });
    //
  }
  function checkActive($elem){
    return $elem.hasClass('is-active');
  }


  Foundation.KeyboardAccess = KeyboardAccess;
}(jQuery, window.Foundation);
