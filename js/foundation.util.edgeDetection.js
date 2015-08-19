!function($, Foundation, window){
  function ImNotTouchingYou(element, direction, param, parent){
    var dims = getDimensions(element);
    return parent ?
      (dims.offset[direction] + dims[param] >= dims.windowDims[param] + dims.windowDims.offset[direction]) :
      (direction === 'top' ? (dims.offset[direction] >= dims.windowDims.offset[direction]) : true);
    //experimental
    // return (dims.parentDims[param] + dims[param] > dims.windowDims[param]);
  }
  //changing parent offset location, fix in tooltip position.
  function getDimensions(element){
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
        width: $(window).width(),
        height: $(window).height(),
        offset: {
          top: $(window).scrollTop(),
          left: $(window).scrollLeft()
        }
      }
    };
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
  Foundation.GetDimensions = getDimensions;
  // console.log('element offset', dims.offset[direction], '\nparent dim', dims.parentDims[param], '\nele dim',dims[param], '\nwindow dim', dims.windowDims[param], '\nwindow offset', dims.windowDims.offset);
}(jQuery, window.Foundation, window);
