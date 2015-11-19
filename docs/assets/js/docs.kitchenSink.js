!function() {

$ks = $('#docs-kitchen-sink');
if (!$ks.length) return;

$ks.find('[data-docs-code]').each(function() {
  var $code = $(this);

  $link = $('<a class="docs-code-toggle">Toggle Code</a>');
  $link.on('click.docs', function() {
    $code.slideToggle(250);
  });
  $link.insertBefore(this);
  $code.addClass('kitchen-sink').hide(0);
});

}()