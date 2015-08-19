!function($, Foundation, window){
  function ImNotTouchingYou(element, direction, param, parent){
    var dims = getDimensions(element);
    console.log('element offset', dims.offset[direction], '\nparent dim', dims.parentDims[param], '\nele dim',dims[param], '\nwindow dim', dims.windowDims[param], '\nwindow offset', dims.windowDims.offset);
    return parent ?
      (dims.offset[direction] + dims[param] >= dims.windowDims[param] + dims.windowDims.offset) :
      (direction === 'top' ? (dims.offset[direction] >= dims.windowDims.offset) : '');
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
        offset: $(window).scrollTop()
      }
    };
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
  Foundation.GetDimensions = getDimensions;
}(jQuery, window.Foundation, window);
