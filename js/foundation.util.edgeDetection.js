!function($, Foundation, window){
  function ImNotTouchingYou(element, direction, param, parent){
    var dims = getDimensions(element);
    console.log('dims total', dims.offset[direction] + dims.parentDims[param] + dims[param], 'window', dims.windowDims[param]);
    return (dims.offset[direction] + dims.parentDims[param] + dims[param] > dims.windowDims[param]);
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
        height: $(window).height()
      }
    };
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
  Foundation.GetDimensions = getDimensions;
}(jQuery, window.Foundation, window);
