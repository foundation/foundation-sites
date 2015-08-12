!function($, Foundation, window){
  function ImNotTouchingYou(){}

  ImNotTouchingYou.checkWidth = function(element, parent){

    var offset = element.offset().top - $(document).scrollTop();
    console.log(offset);

  };

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
}(jQuery, window.Foundation, window);
