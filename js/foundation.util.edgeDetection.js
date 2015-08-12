!function($, Foundation, window){
  function ImNotTouchingYou(){}

  ImNotTouchingYou.checkWidth = function(element, parent){
    console.log(element.offset().left);
  };

  Foundation.ImNotTouchingYou = ImNotTouchingYou;
}(jQuery, window.Foundation, window);
