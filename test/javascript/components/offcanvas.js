describe('Off Canvas', function() {
  var plugin;
  var $html;
  var template = `<div class="off-canvas-wrapper">
      <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
        <div class="off-canvas position-left" id="offCanvas" data-off-canvas>

          <!-- Close button -->
          <button class="close-button" aria-label="Close menu" type="button" data-close>
            <span aria-hidden="true">&times;</span>
          </button>

          <!-- Menu -->
          <ul class="vertical menu">
            <li><a href="#">Foundation</a></li>
            <li><a href="#">Dot</a></li>
            <li><a href="#">ZURB</a></li>
            <li><a href="#">Com</a></li>
            <li><a href="#">Slash</a></li>
            <li><a href="#">Sites</a></li>
          </ul>

        </div>

        <div class="off-canvas-content" data-off-canvas-content>
          <!-- Page content -->
          PAGE_CONTENT.

          <!-- Triggers -->
          <button type="button" class="button" data-toggle="offCanvas">Open Menu</button>
        </div>
      </div>
    </div>`;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element and plugin options', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('init()', function() {
    it('finds triggers for the Off Canvas', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      plugin.$triggers.length.should.be.equal(1);
    });

    it('sets ARIA attributes', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      plugin.$element.should.have.attr('aria-hidden', 'true');
      plugin.$triggers.should.have.attr('aria-controls', plugin.$element.attr('id'));
      plugin.$triggers.should.have.attr('aria-expanded', 'false');
    });

    it('closes Off Canvas on outside click if closeOnClick option is true', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {closeOnClick: true});

      plugin.$exiter.should.be.an('object');

      $html.one(Foundation.transitionend($html), function() {
        plugin.$exiter.trigger('click');
        plugin.$element.should.not.have.class('is-open');
        done();      
      });

      plugin.open();
    });
  });

  describe('open()', function() {
    it('toggles ARIA attributes', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.one(Foundation.transitionend($html), function() {
        plugin.$triggers.should.have.attr('aria-expanded', 'true');
        plugin.$element.should.have.attr('aria-hidden', 'false');
        done();
      });

      plugin.open();
    });

    it('adds active classes', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.one(Foundation.transitionend($html), function() {
        plugin.$element.should.have.class('is-open');
        $html.find('[data-off-canvas-wrapper]').should.have.class('is-off-canvas-open');
        done();
      });

      plugin.open();
    });

    it('focusses Off Canvas if autoFocus option is true', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {autoFocus: true});


      $html.one(Foundation.transitionend($html), function() {
        plugin.$element.should.have.attr('tabindex', '-1');
        plugin.$element[0].should.be.equal(document.activeElement);
        done();
      });

      plugin.open();      
    });

    it('sets tabindex attribute to -1 if trapFocus option is true', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {trapFocus: true});

      $html.one(Foundation.transitionend($html), function() {
        plugin.$element.should.have.attr('tabindex', '-1');
        done();
      });

      plugin.open();
    });


    it('fires opened.zf.offcanvas event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.on('opened.zf.offcanvas', function() {
        $html.one(Foundation.transitionend($html), function() {
          done();
        });
      });

      plugin.open();
    });
  });

  describe('close()', function() {
    it('toggles ARIA attributes', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.one(Foundation.transitionend($html), function() {
        plugin.close();

        plugin.$triggers.should.have.attr('aria-expanded', 'false');
        plugin.$element.should.have.attr('aria-hidden', 'true');
        done();
      });

      // Open it first
      plugin.open();
    });

    it('removes active classes', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.one(Foundation.transitionend($html), function() {
        plugin.close();

        plugin.$element.should.not.have.class('is-open');
        $html.find('[data-off-canvas-wrapper]').should.not.have.class('is-off-canvas-open');
        done();
      });

      // Open it first
      plugin.open();
    });

    it('fires closed.zf.offcanvas event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      

      $html.one(Foundation.transitionend($html), function() {
        $html.one('closed.zf.offcanvas', function() {
          done();
        });

        plugin.close();
      });

      // Open it first
      plugin.open();
    });
  });

  describe('toggle()', function() {
    it('opens a closed Off Canvas', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.one(Foundation.transitionend($html), function() {
        plugin.$element.should.have.class('is-open');
        done();
      });

      plugin.toggle();
    });

    it('closes an open Off Canvas', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.OffCanvas($html.find('[data-off-canvas]'), {});

      $html.one(Foundation.transitionend($html), function() {
        plugin.toggle();

        plugin.$element.should.not.have.class('is-open');
        done();
      });

      // Open it first
      plugin.toggle();
    });
  });

});