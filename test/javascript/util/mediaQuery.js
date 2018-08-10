describe('MediaQuery utils', function () {

  var $iframe, _window, _document, plugin;

  /*
  * Media Query styles for the following configuration:
  *
  * $breakpoints: (
  *   small: 0,
  *   medium: 640px,
  *   large: 1024px,
  *   xlarge: 1200px,
  *   xxlarge: 1440px,
  * );
  *
  */
  const mediaQueryCSS = `
    .foundation-mq { font-family: "small=0em&medium=40em&large=64em&xlarge=75em&xxlarge=90em"; }
  `;

  beforeEach(function (done) {

    // Create an Iframe so we can resize it to test mediaQueries
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    $iframe = $(iframe);
    $iframe.attr('frameBorder', 0);
    _window = iframe.contentWindow;
    _document = iframe.contentDocument;

    // Inject MediaQuery CSS config
    $(_document).find('head').append($(`<style type="text/css">${mediaQueryCSS}</style>`));

    // Inject jQuery and Foundation
    injectScriptIn(_document.body, {
      src: 'http://127.0.0.1:3042/node_modules/jquery/dist/jquery.js',
    });
    injectScriptIn(_document.body, {
      src: 'http://127.0.0.1:3042/_build/assets/js/foundation.js',
      onload: () => {
        plugin = _window.Foundation.MediaQuery;
        plugin._init();
        done();
      },
    });

  });

  afterEach(function() {
    // $iframe.remove();
  });


});
