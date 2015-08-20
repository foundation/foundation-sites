!function($, Foundation, window){
  function ImNotTouchingYou(element/*, direction, param, position, offset, anchor, hasParent*/){
    /* the element is the element be checked for clearance
       direction is either *top* or *left* based on available offset functions
       param is either *height* or *width* based on available height/width functions
       hasParent is a boolean flag to determine if the element is rooted to another element, or if it's and element attached to *body*
    */
    var eleDims = getDimensions(element),
        bottom = (eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top),
        top    = (eleDims.offset.top >= eleDims.windowDims.offset.top),
        left   = (eleDims.offset.left >= eleDims.windowDims.offset.left),
        right  = (eleDims.offset.left + eleDims.width <= eleDims.windowDims.width),
        allDirs = [bottom, top, left, right];

    return allDirs.indexOf(false) === -1;
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
