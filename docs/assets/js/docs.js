$(document).foundation();

$(function() {
  // Copy button
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

  // Equalizer test
  var counter = 0;
  $('#test-eq').on('postEqualized.zf.Equalizer', function() {
    counter++;
    console.log(counter);
  });
  $('#pokemonRed').on('invalid.fndtn.abide', function(e, data) {
    console.log(data);
  });

  // Building blocks
  $.ajax({
    url: 'http://zurb.com/library/api/building_blocks/type/buttons',
    dataType: 'jsonp',
    success: addBuildingBlocks
  });

  function addBuildingBlocks(data) {
    var html = '';

    $.each(data, function() {
      html += '<div class="column"><a href="http://zurb.com/building-blocks/'+this.slug+'"><p>'+this.name+'</p><img src="'+this.image_url+'"/></a></div>';
    });

    $('[data-building-blocks]').each(function() {
      $(this).html(html);
    });

    if ($('[data-building-blocks] .column').length === 0) {
      $('.docs-building-blocks').hide(0);
    }
  }

  $('[data-docs-search]').typeahead({
    highlight: false
  }, {
    source: function(q, s, a) {
      $.getJSON('./data/search.json', function(data, status) {
        a(data.filter(function(elem, i, arr) {
          return elem.name.indexOf(q) > -1 || elem.name.replace('-', ' ').indexOf(q) > -1;
        }));
      });
    },
    display: function(item) {
      return item.name;
    },
    templates: {
      notFound: function(query) {
        return '<div class="tt-empty">No results for "' + query.query + '".</div>';
      },
      suggestion: function(item) {
        return '<div><span class="name">' + item.name + '</span> <span class="desc">' + item.description + '</span></div>';
      }
    }
  });
});
