$(document).foundation();

$(function() {
  if (!ZeroClipboard.isFlashUnusable()) {
    var $buttonTemplate = $('<button class="docs-code-copy">Copy</button>');

    // Look for code samples and set up a copy button on each
    $('[data-docs-code]').each(function() {
      var $button = $buttonTemplate.clone();
      var text = $(this).find('code').text()
        .replace('&lt;', '<')
        .replace('&gt;', '>');

      $(this).prepend($button);

      var clipboard = new ZeroClipboard($button);
      clipboard.on('copy', function(event) {
        clipboard.setData('text/plain', text);
      });

      // Change the text of the copy button when it's clicked on
      $button.click(function() {
        $(this).text('Copied!');
        window.setTimeout(function() {
          $button.text('Copy');
        }, 3000);
      });
    });
  }
  var counter = 0;
  $('#test-eq').on('postEqualized.zf.Equalizer', function() {
    counter++;
    console.log(counter);
  })
});
