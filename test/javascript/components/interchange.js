describe('Interchange', function() {
  var plugin;
  var $html;

  /**
   * Generates paths to different assets
   * @param  {[type]} type [description]
   * @param  {[type]} size [description]
   * @return {[type]}      [description]
   */
  var getPath = function(type, size) {
    switch (type) {
      case 'image':
      case 'background':
        return `_build/assets/img/interchange/${size}.jpg`;  
      default:
        return `_build/assets/partials/interchange-${size}.html`;
    }
  };
  /**
   * Generates templates to use based on type.
   * @param  {string} type Type to generate, image, background or template.
   * @return {string}      Generated template.
   */
  var generateTemplate = function(type) {
    var type = type || 'template',
        tag = type === 'image' ? 'img' : 'div',
        path;
    switch (type) {
      case 'image':
        return `<img data-interchange="
            [${getPath(type, 'small')}, small],
            [${getPath(type, 'medium')}, medium],
            [${getPath(type, 'large')}, large]
          ">`;  
      case 'background':
        return `<div data-interchange="
            [${getPath(type, 'small')}, small],
            [${getPath(type, 'medium')}, medium],
            [${getPath(type, 'large')}, large]
          "></div>`;
      default:
        return `<div data-interchange="
            [${getPath(type, 'default')}, small],
            [${getPath(type, 'medium')}, medium],
            [${getPath(type, 'large')}, large]
          "></div>`;
    }
  };

  /**
   * Substitutes the window.matchMedia function with a mock function that
   * will always and only return a match for the given size.
   * @param  {string} size Size to be matched.
   */
  var mockMatchMedia = function(size) {
    window.matchMedia = function(mq) {
      return {
        matches: mq === size
      };
    };
  };

  // Reset mocked functions after each test
  var matchMedia = window.matchMedia,
      get = $.get;

  afterEach(function() {
    plugin.destroy();
    $html.remove();

    window.matchMedia = matchMedia;
    $.get = get;
  });

  describe('constructor()', function() {
    it('stores the element and plugin options', function() {
      $html = $(generateTemplate('template')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('replace()', function() {
    it('replaces src attribute of img', function() {
      $html = $(generateTemplate('image')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      plugin.replace(getPath('img', 'large'));

      $html.should.have.attr('src', getPath('img', 'large'));
    });

    it('replaces background style of divs', function() {
      $html = $(generateTemplate('background')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      plugin.replace(getPath('background', 'large'));

      $html[0].style.backgroundImage.should.contain(getPath('background', 'large'));
    });

    it('replaces contents of div with templates', function(done) {
      $html = $(generateTemplate('template')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      $.get = function(url) {
        url.should.be.equal(getPath('template', 'large'));
        done();
      };

      plugin.replace(getPath('template', 'large'));
    });

    it('fires replaced.zf.interchange event', function() {
      $html = $(generateTemplate('template')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      let spy = sinon.spy();
      $html.on('replaced.zf.interchange', spy);

      spy.called.should.be.true;
    });
  });

  describe('reflow(()', function() {
    it('calls replace for small media query', function() {
      $html = $(generateTemplate('image')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      mockMatchMedia('small');

      let spy = sinon.spy();
      plugin.replace = spy;

      plugin._reflow();

      spy.calledWith(getPath('image', 'small')).should.be.true;
    });
    it('calls replace for medium media query', function() {
      $html = $(generateTemplate('image')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      mockMatchMedia('medium');

      let spy = sinon.spy();
      plugin.replace = spy;

      plugin._reflow();

      spy.calledWith(getPath('image', 'medium')).should.be.true;
    });

    it('calls replace for large media query', function() {
      $html = $(generateTemplate('image')).appendTo('body');
      plugin = new Foundation.Interchange($html, {});

      mockMatchMedia('large');

      let spy = sinon.spy();
      plugin.replace = spy;

      plugin._reflow();

      spy.calledWith(getPath('image', 'large')).should.be.true;
    });
  });

});