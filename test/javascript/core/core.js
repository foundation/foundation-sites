describe('Foundation core', function() {
  it('exists on the window', function() {
    (window.Foundation).should.be.an('object');
  });

  it('is a jQuery prototype function', function() {
    ($.fn.foundation).should.to.be.a('function');
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

  describe('reInit()', function() {
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
