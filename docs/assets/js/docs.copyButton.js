// Adds a copy button to all code examples in the docs.

!function() {

ZeroClipboard.config({
  swfPath: 'assets/ZeroClipboard.swf'
});
  
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

}()