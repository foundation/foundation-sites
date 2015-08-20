!function($, Foundation, window){
  function ImNotTouchingYou(element){
    // the element is the element be checked for clearance
    var eleDims = GetDimensions(element),
        bottom = (eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top),
        top    = (eleDims.offset.top >= eleDims.windowDims.offset.top),
        left   = (eleDims.offset.left >= eleDims.windowDims.offset.left),
        right  = (eleDims.offset.left + eleDims.width <= eleDims.windowDims.width),
        allDirs = [bottom, top, left, right];

    return allDirs.indexOf(false) === -1;
  }

  function GetDimensions(element){
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

  function GetOffsets(element, anchor, position, vOffset, hOffset){
    var $eleDims = GetDimensions(element),
        $anchorDims = GetDimensions(anchor);
    switch(position){
      case 'top':
        return {
          left: $anchorDims.offset.left,
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'left':
        return {
          left: $anchorDims.offset.left - ($eleDims.width + hOffset),
          top: $anchorDims.offset.top
        };
        break;
      case 'right':
        return {
          left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
          top: $anchorDims.offset.top
        };
        break;
      case 'center top':
        return {
          left: ($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2),
          top: $anchorDims.offset.top - ($eleDims.height + vOffset)
        };
        break;
      case 'center bottom':
        return {
          left: ($anchorDims.offset.left + ($anchorDims.width / 2)) - ($eleDims.width / 2),
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
        break;
      case 'center left':
        return {};
        break;
      case 'center right':
        return {};
        break;
      case 'center':
        return {
          left: ($eleDims.windowDims.offset.left + ($eleDims.windowDims.width / 2)) - ($eleDims.width / 2),
          top: ($eleDims.windowDims.offset.top + ($eleDims.windowDims.height / 2)) - ($eleDims.height / 2)
        };
        break;
      default:
        return {
          left: $anchorDims.offset.left,
          top: $anchorDims.offset.top + $anchorDims.height + vOffset
        };
    }
  }

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
  Foundation.GetDimensions = GetDimensions;
  Foundation.GetOffsets = GetOffsets;
}(jQuery, window.Foundation, window);
