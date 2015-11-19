// Code for specific docs examples.

!function() {

$('[data-docs-example-ofc]').click(function() {
  $('#offCanvasLeft').toggleClass('reveal-for-large');
});

$('[data-docs-example-series]').click(function() {
  $('#series-example').addClass('is-animating');
});

var $transitionDemo = $('.docs-transition-demo');
$('.docs-transitions').change(function() {
  var value = $(this).val();
  var method = value.match('-in') ? 'animateIn' : 'animateOut';

  Foundation.Motion[method]($transitionDemo, value, function() {
    $transitionDemo.show();
  });
});

}();
