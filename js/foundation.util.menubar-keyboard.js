!function($, Foundation){
  'use strict';
  var usedKeys = [9, 13, 27, 32, 37, 38, 39, 40];

  function MenuKey(e, $elem, mb, isVert, isRight, first, last, next, prev, $parent, child, fns){
    e.stopImmediatePropagation();

    /*******************************************
    e - event passes back from the menubar calling this.
    $elem - jQuery element that was the target
    mb - the complete menu bar Object
    isVert - boolean passed back, refers to the specific element, not the menubar as a whole
    isRight - boolean, refers to the specific element, not the menubar as a whole
    first - jQuery element, first menu item in the current submenu
    last - jQuery element, last menu item in the current submenu
    next - jQuery element, next item in the current submenu
    prev - jQuery element, previous item in the current submenu
    $parent - jQuery element, current menu item's parent /w class `has-submenu`
    child - jQuery element, current menu item's child submenu or `null`
    fns - standard Object, with strings of the menubars open, close, and toggle functions.
    *******************************************/
    if(usedKeys.indexOf(e.which) > -1){
      if(e.which !== 9){
        e.preventDefault();
      }
      switch (e.which) {

        case 13://return/enter
        case 32://drunk Mark Watney
          mb[fns.toggle]($elem);
          break;

        case 27://esc
          mb[fns.hideAll]($elem);
          break;

        case 37://left
          if(!isVert){
            mb[fns.show](prev); //prev.focus();
          }else if(isRight && child){
            mb[fns.show](child);
          }else{
            mb[fns.hide]($parent);
          }
          // isVert ? isRight ? mb[fns.show]($elem.children('[data-submenu]:first-of-type')) : mb[fns.hide]($elem) : mb[fns.show](prev);
          break;

        case 38://up
          break;

        case 39://right
          if(!isVert){
            mb[fns.show](next);
          }else{
            isRight ? mb[fns.hide]($elem) : mb[fns.show]($elem);
          }
          // else if(!isRight){
          //   mb[fns.hide]($parent);
          //   //hide open sub
          // }else if(is)
          break;

        case 40://down
          if(!isVert){
            mb[fns.show]($elem);
            if(child){ child.focus(); }
          }else{
            next.focus();
            if(next.hasClass('has-submenu')){ mb[fns.show](next); }
          }
          break;

        default:
          return;
      }
      //do stuff
    }else{
      return;
    }
    return e.which;
  }
  // function KeyboardAccess(menuBar){
  //   var mb = menuBar,
  //       vertical = mb.options.vertical,
  //       $firstItem = mb.$element.children('li:first-of-type'),
  //       $lastItem = mb.$element.children('li:last-of-type'),
  //       mbType = Object.keys(mb.$element.data()).join(' ').match(/dropdownMenu|drilldown|accordionMenu/g)[0],
  //       subRE = /has-submenu/g,
  //       vertRE = /vertical/g,
  //       rightRE = /right/g,
  //       usedKeys = [9, 13, 27, 32, 37, 38, 38, 40];
  //
  //
  //   var thing = mb.$menuItems.has('.submenu')
  //
  //   console.log(thing);
    // mb.$menuItems.on('focusin.zf.menubar', function(){
    //   console.log($(this));
    //   mb._show($(this));
    // });

    //****************************************************************
    //****************************************************************
    //****************************************************************
    // mb.$menuItems.on('keyup.zf.menubar', function(e){
    //                                                 /**
    //                                                  needs to check for arrow keys and respond appropriately including wrap, see photo
    //                                                  if `esc`, close all open Menus
    //                                                  return clicks the link if no sub-menu, otherwise opens/closes sub-menu
    //                                                  tab is cool where it is
    //                                                  */
    //   var hasSub = subRE.test(e.target.className),// || subRE.test(e.target.parentNode.className),
    //       subIsVert = vertRE.test(e.target.className),
    //       isRight = rightRE.test(e.target.parentNode.parentNode.className),
    //       $parent;
    //                                                                 // if(e.target.tagName.toLowerCase() === 'a'){
    //                                                                 //   $parent = $(e.target.parentNode);
    //   if(usedKeys.indexOf(e.keyCode) > -1){
    //     if(e.keyCode === (13 || 32) && !hasSub){
    //       return;
    //     }else{
    //       e.preventDefault();
    //     }
    //   mb._hideOthers($(this));
    //   }
    //   if(hasSub){
    //     console.log('woot, I have a sub');
    //     mb._show($(this));
    //   }
    //   // if(e.target.className.test(/has-submenu/g)){
    //   //   console.log('woot');
    //   //   // e.preventDefault();
    //   // }
    //   //*********current comments pertain to dropdowns, needs expansion for drilldowns and accordions********
    //   switch(e.keyCode){
    //     case 13://return
    //     //open/close current menu/submenu, or, carry out default action.
    //     break;
    //     case 39://right arrow
    //     //if horizontal, move right and select sibling menu element & wrap to left at end
    //     //if vertical and oriented ltr, select first-child menu item, if rtl return to parent menu item and close submenu
    //     break;
    //     case 37://left arrow
    //     //if horizontal, move left and select sibling menu element & wrap to right at end
    //     //if vertical and oriented rtl, select first-child menu item, if ltr return to parent menu item and close submenu
    //     break;
    //     case 38://up arrow
    //     //if horizontal, close open menu
    //     //if vertical, select next sibling menu item, open if has-submenu, or wrap to bottom menu item
    //     break;
    //     case 40://down arrow
    //     //if horizontal, select first menu item and open if has-submenu
    //     //if vertical, select next sibling menu item, open if has-submenu, or wrap to top menu item
    //     break;
    //     case 32://spacebar
    //     //open/close or activate normally
    //     break;
    //     case 27://escape
    //     mb._hideAll();
    //     break;
    //     case 9://tab
    //     //select next child, or if target has submenu select its first child. if last child of current menu, close that menu and return to previous depth, selecting the next element in line.
    //     break;
    //     default://do nothing
    //     return;
    //   }
    //
    // });
//*******************************************************************
//*******************************************************************
//*******************************************************************

    // mb.$submenus.on('focusin.zf.menubar', function(e){
    //   // mb._show($(this));
    // });



    // mb.$tabs.on('focusin.zf.dropdownmenu', function(){
    //   mb._show($(this));
    // })
    // .on('focusout.zf.dropdownmenu', function(e){
    //   mb._hide($(this));
    // })




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
  // }
  function checkActive($elem){
    return $elem.hasClass('is-active');
  }

  Foundation.MenuKey = MenuKey;
  // Foundation.KeyboardAccess = KeyboardAccess;
}(jQuery, window.Foundation);
