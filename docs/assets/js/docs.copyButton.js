// Adds a copy button to all code examples in the docs.

!function() {

// Look for code samples and set up a copy button on each
$('[data-docs-code]').each(function(index, value) {
  var copyBtnId = 'copy-btn-' + index.toString();
  var $button = $('<button class="docs-code-copy" id="' + copyBtnId + '">Copy</button>');

  var text = $(this).find('code').text()
    .replace('&lt;', '<')
    .replace('&gt;', '>');

  $(this).prepend($button);

  var clipboard = new Clipboard('#' + copyBtnId, {
    text: function() {
        return text;
    }
  });

  // Change the text of the copy button when it's clicked on
  clipboard.on('success', function(event) {
    $button.text('Copied!');
    window.setTimeout(function() {
      $button.text('Copy');
    }, 3000);
  });

  // Log errors on copy failure
  clipboard.on('error', function(event) {
      console.error('Action:', event.action);
      console.error('Trigger:', event.trigger);
  });
});

}()