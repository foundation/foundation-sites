describe('Foundation core', function() {
  it('exists on the window', function() {
    (window.Foundation).should.be.an('object');
  });

  it('is a jQuery prototype function', function() {
    ($.fn.foundation).should.to.be.a('function');
  });

  describe('rtl()', function() {
    it('detects the text direction on the document', function() {
      (Foundation.rtl()).should.be.false;
      $('html').attr('dir', 'rtl');

      (Foundation.rtl()).should.be.true;
      $('html').attr('dir', 'ltr');
    });
  });

  describe('plugin()', function() {
    afterEach(function() {
      delete Foundation._plugins['plugin'];
      delete Foundation.Plugin;
    });

    it('adds Foundation plugins', function() {
      function Plugin() {}
      Foundation.plugin(Plugin, 'Plugin');

      (Foundation._plugins['plugin']).should.be.a('function');
      (Foundation.Plugin).should.be.a('function');
    });

    it('uses the name of the Plugin class/function if one is not provided', function() {
      function Plugin() {}
      Foundation.plugin(Plugin);

      (Foundation._plugins['plugin']).should.be.a('function');
      (Foundation.Plugin).should.be.a('function');
    });
  });

  describe('registerPlugin()', function() {
    it('registers a new instance of a plugin');
  });

  describe('unregisterPlugin()', function() {
    it('un-registers a plugin being destroyed');
  });

  xdescribe('reInit()', function() {

  });

  describe('GetYoDigits()', function() {
    it('generates a random ID matching a given length', function() {
      var id = Foundation.GetYoDigits(6);

      id.should.be.a('string');
      id.should.have.lengthOf(6);
    });

    it('can append a namespace to the number', function() {
      var id = Foundation.GetYoDigits(6, 'plugin');

      id.should.be.a('string');
      id.should.have.lengthOf(6 + '-plugin'.length);
      id.should.contain('-plugin');
    });
  });

  describe('reflow()', function() {
  });

  describe('getFnName()', function() {
  });

  describe('transitionEnd()', function() {
  });

  describe('throttle()', function() {
  });
});
