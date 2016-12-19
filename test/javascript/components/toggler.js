describe('Toggler', function() {
  var plugin;
  var $html;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element and plugin options', function() {
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('init()', function() {
    it('stores the class defined on the data-toggler attribute', function() {
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      plugin.className.should.equal('class');
    });

    it('stores the class defined on the data-toggler attribute (with leading dot)', function() {
      $html = $('<div id="toggler" data-toggler=".class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      plugin.className.should.equal('class');
    });

    it('stores defined animation classes', function() {
      $html = $('<div id="toggler" data-toggler data-animate="fade-in fade-out"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      plugin.animationIn.should.equal('fade-in');
      plugin.animationOut.should.equal('fade-out');
    });

    it('adds Aria attributes to click triggers', function() {
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      var $triggers = $(`<div>
          <a data-open="toggler">Open</a>
          <a data-close="toggler">Close</a>
          <a data-toggle="toggler">Toggle</a>
        </div>`).appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      $triggers.find('[data-open]').should.have.attr('aria-controls', 'toggler');
      $triggers.find('[data-close]').should.have.attr('aria-controls', 'toggler');
      $triggers.find('[data-toggle]').should.have.attr('aria-controls', 'toggler');

      $triggers.remove();
    });

    it('sets aria-expanded to true if the element is visible', function() {
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      $('#toggler').should.have.attr('aria-expanded', 'true');
    });

    it('sets aria-expanded to false if the element is invisible', function() {
      var $css = $('<style>#toggler { display: none }</style>').appendTo('body');
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      $('#toggler').should.have.attr('aria-expanded', 'false');
      $css.remove();
    });
  });

  describe('toggle()', function() {
    it('calls Toggler._toggleClass() if the element toggles with a class');
    it('calls Toggler._toggleAnimate() if the element toggles with animation');
  });

  describe('toggleClass()', function() {
    it('toggles a class on the element', function() {
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      plugin._toggleClass();
      $('#toggler').should.have.class('class');

      plugin._toggleClass();
      $('#toggler').should.not.have.class('class');
    });

    it('updates aria-expanded after the class is toggled', function() {
      $html = $('<div id="toggler" data-toggler="class"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      plugin._toggleClass();
      $('#toggler').should.have.attr('aria-expanded', 'true');

      plugin._toggleClass();
      $('#toggler').should.have.attr('aria-expanded', 'false');
    });
  });

  // [TODO] Re-enable this if you can get it working in PhantomJS
  xdescribe('toggleAnimate()', function() {
    it('animates an invisible element in', function(done) {
      var $css = $('<style>#toggler { display: none; }</style>').appendTo('body');
      $html = $('<div id="toggler" data-toggler data-animate="fade-in fade-out"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      $html.on('on.zf.toggler', function() {
        $('#toggler').should.be.visible;
        $('#toggler').should.have.attr('aria-expanded', 'true');
        $css.remove();
        done();
      });

      plugin._toggleAnimate();
    });

    it('animates an visible element out', function(done) {
      $html = $('<div id="toggler" data-toggler data-animate="fade-in fade-out"></div>').appendTo('body');
      plugin = new Foundation.Toggler($html, {});

      $html.on('off.zf.toggler', function() {
        $('#toggler').should.be.hidden;
        $('#toggler').should.have.attr('aria-expanded', 'false');
        done();
      });

      plugin._toggleAnimate();
    });
  });
});
