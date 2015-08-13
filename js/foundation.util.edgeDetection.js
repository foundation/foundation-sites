!function($, Foundation, window){
  function ImNotTouchingYou(element, parent){
    var dims = getDimensions(element);

    console.log(dims.offset.left + dims.parentDims.width + dims.width > dims.windowDims.width);

    if(element.hasClass('right')){
      if(dims.offset.left + dims.parentDims.width + dims.width > dims.windowDims.width){
        element.removeClass('right').addClass('left');
      }
    }
    var offset = element.offset().top - $(document).scrollTop();

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

  // ImNotTouchingYou.checkWidth = function(element, parent){
  //   var dims = getDimensions(element);
  //
  //   console.log(dims.offset.left + dims.parentDims.width + dims.width > dims.windowDims.width);
  //
  //   if(element.hasClass('right')){
  //     if(dims.offset.left + dims.parentDims.width + dims.width > dims.windowDims.width){
  //       element.removeClass('right').addClass('left');
  //     }
  //   }
  //   var offset = element.offset().top - $(document).scrollTop();
  //   // console.log(offset);
  // //   $(function() {
  // //   var eTop = element.parentsUntil(window).offset().top; //get the offset top of the element
  // //   var eHeight = element.outerHeight(),
  // //       eWidth = element.outerWidth(),
  // //   // var eHeight = parseInt(element.css('height').split('px')[0], 10),
  // //       pHeight = parseInt(element.parent().height()),
  // //       wHeight = parseInt($(window).height()),
  // //       combo = eHeight - pHeight;
  // //   // console.log(wHeight - eHeight);
  // //   // console.log('difference between window scrolltop and elem height',$(document).scrollTop() - eHeight); //position of the ele w.r.t window
  // //   // console.log('css number',element.css('height').split('px')[0], '\nparent height', element.parent().height());
  // //   $(window).scroll(function() { //when window is scrolled
  // //     // var eTop = element.parentsUntil(window).offset().top; //get the offset top of the element
  // //     // eHeight = parseInt(element.css('height').split('px')[0]);
  // //     // pHeight = parseInt(element.parent().height());
  // //     // console.log('window - scrolltop', wHeight - $(document).scrollTop());
  // //     // console.log(($(document).scrollTop() - eHeight) - eHeight);
  // //   });
  // // });
  //
  // };


  Foundation.ImNotTouchingYou = ImNotTouchingYou;
}(jQuery, window.Foundation, window);
