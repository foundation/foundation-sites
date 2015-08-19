!function($, Foundation, window){
  function ImNotTouchingYou(element, direction, param, position, offset, anchor, hasParent){
    /* the element is the element be checked for clearance
       direction is either *top* or *left* based on available offset functions
       param is either *height* or *width* based on available height/width functions
       hasParent is a boolean flag to determine if the element is rooted to another element, or if it's and element attached to *body*
    */
    var eleDims = getDimensions(element);
        // anchorDims = anchor.length && (position === 'right') ? getDimensions(anchor) : null;
    //returns a boolean flag if the element is clearing the body's width or height
    // console.log(anchorDims);
    if(hasParent){
      return (eleDims.offset[direction] + eleDims[param] >= eleDims.windowDims[param] + eleDims.windowDims.offset[direction]);
    }else{
      switch(position){
        case 'top':
          return (eleDims.offset[direction] >= eleDims.windowDims.offset[direction]);
          break;

        case 'left':
          return (eleDims.offset[direction] >= eleDims.windowDims.offset[direction]);
          break;

        case 'right':
          return (eleDims.offset[direction] + eleDims[param] <= eleDims.windowDims[param]);
          break;

        default:
          return (eleDims.offset[direction] + eleDims[param] <= eleDims.windowDims[param] + eleDims.windowDims.offset[direction]);
      }
    }
    // return hasParent ?
    //   //for an item attached to a dom element other than *body*
    //   (eleDims.offset[direction] + eleDims[param] >= eleDims.windowDims[param] + eleDims.windowDims.offset[direction]) :
    //   //if attached to *body* and top aligned
    //   (direction === 'top' ? (eleDims.offset[direction] >= eleDims.windowDims.offset[direction]) :
    //   //if attached to *body* and left aligned
    //   eleDims.offset[direction] > eleDims.windowDims.offset[direction] );
    // //experimental
    // // return (eleDims.parentDims[param] + eleDims[param] > eleDims.windowDims[param]);
  }
  //changing parent offset location, fix in tooltip position.
  function getDimensions(element){
    var $window = $(window);
    return {
      width: element.outerWidth(),
      height: element.outerHeight(),
      offset: element.offset(),
      parentDims: {
        width: element.parent().outerWidth(),
        height: element.parent().outerHeight(),
        offset: element.parent().offset()
      },
      windowDims: {
        width: $window.width(),
        height: $window.height(),
        offset: {
          top: $window.scrollTop(),
          left: $window.scrollLeft()
        }
      }
    };
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
  Foundation.GetDimensions = getDimensions;
  // console.log('element offset', eleDims.offset[direction], '\nparent dim', eleDims.parentDims[param], '\nele dim',eleDims[param], '\nwindow dim', eleDims.windowDims[param], '\nwindow offset', eleDims.windowDims.offset);
}(jQuery, window.Foundation, window);
