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
    // Versionize scripts to prevent browser caching
    const randomHash = (Math.random() * Math.pow(2, 54)).toString(36);

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
      src: `../../node_modules/jquery/dist/jquery.js?v=${randomHash}`,
    });
    injectScriptIn(_document.body, {
      src: `../../_build/assets/js/foundation.js?v=${randomHash}`,
      onload: () => {
        plugin = _window.Foundation.MediaQuery;
        plugin._init();
        done();
      },
    });

  });

  afterEach(function() {
    $iframe.remove();
  });

  describe('atLeast()', function () {

    it('returns "false" when smaller than the given breakpoint', function () {
      $iframe.attr('width', 639); // just before the "medium" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.atLeast('small').should.be.true;
      plugin.atLeast('medium').should.be.false;
      plugin.atLeast('large').should.be.false;
    });

    it('returns "true" when being precisely on the given breakpoint', function () {
      $iframe.attr('width', 1024); // just on the "large" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.atLeast('medium').should.be.true;
      plugin.atLeast('large').should.be.true;
      plugin.atLeast('xlarge').should.be.false;
    });

    it('returns "true" when larger than the given breakpoint', function () {
      $iframe.attr('width', 1201); // just after the "xlarge" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.atLeast('large').should.be.true;
      plugin.atLeast('xlarge').should.be.true;
      plugin.atLeast('xxlarge').should.be.false;
    });

  });

  describe('only()', function () {

    it('returns "false" when smaller than the given breakpoint', function () {
      $iframe.attr('width', 639); // just before the "medium" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.only('small').should.be.true;
      plugin.only('medium').should.be.false;
      plugin.only('large').should.be.false;
    });

    it('returns "true" when within the given breakpoint', function () {
      $iframe.attr('width', 832); // within the "medium" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.only('small').should.be.false;
      plugin.only('medium').should.be.true;
      plugin.only('large').should.be.false;
    });

    it('returns "false" when larger than the given breakpoint', function () {
      $iframe.attr('width', 1024); // just after the "medium" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.only('small').should.be.false;
      plugin.only('medium').should.be.false;
      plugin.only('large').should.be.true;
    });

  });

  describe('upTo()', function () {

    it('returns "true" when smaller than the next breakpoint', function () {
      $iframe.attr('width', 1023); // just before the "large" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.upTo('small').should.be.false;
      plugin.upTo('medium').should.be.true;
      plugin.upTo('large').should.be.true;
    });

    it('returns "false" when being precisely on the next breakpoint', function () {
      $iframe.attr('width', 1200); // just on the "xlarge" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.upTo('medium').should.be.false;
      plugin.upTo('large').should.be.false;
      plugin.upTo('xlarge').should.be.true;
    });

    it('returns "false" when larger than the next breakpoint', function () {
      $iframe.attr('width', 1441); // just after the "xxlarge" breakpoint
      (_window.innerWidth); // force the browser to handle the new width synchronously

      plugin.upTo('large').should.be.false;
      plugin.upTo('xlarge').should.be.false;
      plugin.upTo('xxlarge').should.be.true;
    });

  });

});
