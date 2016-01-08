!function() {

var $h2s = $('.docs-component h2');
var $toc = $('[data-docs-toc]');

$h2s.each(function() {
  if ($(this).parents('.docs-code-live').length) return;

  var text = $(this).text();
  var anchor = $(this).children('a').attr('href');
  
  $toc.append('<li><a href="'+anchor+'">'+text+'</a></li>');
});

if ($toc.length) {
  new Foundation.Magellan($toc, {});
}

}()
