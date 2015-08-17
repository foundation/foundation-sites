!function($, Foundation, window){
  function ImNotTouchingYou(element, direction, param, parent){
    var dims = getDimensions(element);
    console.log(dims);
    // return (dims.offset[direction] + dims.parentDims[param] + dims[param] > dims.windowDims[param]);
    //experimental
    return (dims.parentDims[param] + dims[param] > dims.windowDims[param]);
  }

  function getDimensions(element){
    return {
      width: element.outerWidth(),
      height: element.outerHeight(),
      offset: element.parent().offset(),
      parentDims: {
        width: element.parent().outerWidth(),
        height: element.parent().outerHeight()
      },
      windowDims: {
        width: $(window).width(),
        height: $(window).height()
      }
    };
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
}(jQuery, window.Foundation, window);
