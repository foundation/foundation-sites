describe('Reveal', function() {
	var plugin;
	var $html;
	var template = `<div class="reveal" id="exampleModal1" data-reveal>
	  Modal content
	  <button class="close-button" data-close aria-label="Close modal" type="button">
	    <span aria-hidden="true">&times;</span>
	  </button>
	</div>`;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element and plugin options', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('init()', function() {
    it('sets ARIA attributes for modal', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      $html.should.have.attr('aria-hidden', 'true');
      $html.should.have.attr('role', 'dialog');
    });

    it('detects anchor if one exists', function() {
      $html = $(template).appendTo('body');
      var $anchor = $('<button data-open="exampleModal1">Open</button>').appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      plugin.$anchor[0].should.be.equal($anchor[0]);

      $anchor.remove();
    });

    it('sets ARIA attributes for anchor if one exists', function() {
      $html = $(template).appendTo('body');
      var $anchor = $('<button data-open="exampleModal1">Open</button>').appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      $anchor.should.have.attr('aria-haspopup', 'true');
      $anchor.should.have.attr('aria-controls', $html.attr('id'));

      $anchor.remove();
    });
  });

  describe('makeOverlay()', function() {
		it('creates an overlay if overlay option is true', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {overlay: true});

      plugin.$overlay.should.be.an('object');
      plugin.$overlay.should.have.class('reveal-overlay');
      $.contains(document.body, plugin.$overlay[0]).should.be.true;
    });
  });

  describe('open()', function() {
		it('opens the modal', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      plugin.open();

      $html.should.be.visible;
    });
    it('opens the overlay', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {overlay: true});

      plugin.open();

      plugin.$overlay.should.be.visible;
    });
    it('toggles ARIA attributes', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      plugin.open();

      $html.should.have.attr('aria-hidden', 'false');
      $html.should.have.attr('tabindex', '-1');
    });
    it('adds class to body', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      plugin.open();

      $('body').should.have.class('is-reveal-open');
    });
    // TODO: Check if  this.$element.trigger('closeme.zf.reveal', this.id) is correctly used.
    
    // it('closes previously opened modal if multipleOpened option is false', function(done) {
    //   $html = $(template).appendTo('body');
    //   $html2 = $(template).attr('id', 'exampleModal2').appendTo('body');

    //   plugin = new Foundation.Reveal($html, {multipleOpened: false});
    //   plugin2 = new Foundation.Reveal($html2, {multipleOpened: false});

    //   plugin.open();

    //   plugin2.open();

    //   $html.should.be.hidden;

    //   plugin2.destroy();
    //   $html2.remove();
    // });
    it('fires open.zf.reveal event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      $html.on('open.zf.reveal', function() {
      	$html.should.be.visible;
      	done();
      });

      plugin.open();
    });

    it('traps focus if trapFocus option is true', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {trapFocus: true});

      let spy = sinon.spy(Foundation.Keyboard, 'trapFocus');
      plugin.open();

      sinon.assert.called(spy);
      Foundation.Keyboard.trapFocus.restore();
    });
  });

	describe('close()', function() {
		it('closes the modal', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      // Open it first
      plugin.open();

      plugin.close();

      $html.should.be.hidden;
    });
    it('closes the overlay', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {overlay: true});

      // Open it first
      plugin.open();

      plugin.close();

      plugin.$overlay.should.be.hidden;
    });
    it('toggles ARIA attributes', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      // Open it first
      plugin.open();

      plugin.close();

      $html.should.have.attr('aria-hidden', 'true');
    });
    it('removes class from body', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      // Open it first
      plugin.open();


      $html.on('closed.zf.reveal', function() {
        $('body').should.not.have.class('is-reveal-open');
        done();
      });
      
      plugin.close();
    });
    it('does not remove class from body if another reveal is open', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {multipleOpened: true});

      let $html2 = $(template).attr('id', 'exampleModal2').appendTo('body');
      let plugin2 = new Foundation.Reveal($html2, {multipleOpened: true, vOffset: 10});

      // Open both first
      plugin.open();
      plugin2.open();


      $html.on('closed.zf.reveal', function() {

        $('body').should.have.class('is-reveal-open');
        plugin2.destroy();
        $html2.remove();
        done();
      });

      plugin.close();
    });
    it('fires closed.zf.reveal event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      // Open it first
      plugin.open();

      $html.on('closed.zf.reveal', function() {
      	$html.should.be.hidden;
      	done();
      });
      
      plugin.close();
    });

    it('releases focus if trapFocus option is true', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {trapFocus: true});

      // Open it first
      plugin.open();

      let spy = sinon.spy(Foundation.Keyboard, 'releaseFocus');
      plugin.close();

      sinon.assert.called(spy);
      Foundation.Keyboard.releaseFocus.restore();
    });
  });

	describe('toggle()', function() {
    it('opens a closed modal', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {overlay: true});

      plugin.open();

      plugin.$overlay.should.be.visible;
    });
		it('closes an open modal', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      // Open it first
      plugin.open();

      plugin.close();

      $html.should.be.hidden;
    });
  });

  describe('events()', function() {
    it('opens the modal on anchor click', function() {
      $html = $(template).appendTo('body');
      var $anchor = $('<button data-open="exampleModal1">Open</button>').appendTo('body');
      plugin = new Foundation.Reveal($html, {});

      $anchor.trigger('click');

      plugin.$overlay.should.be.visible;
      $anchor.remove();
    });
		it('closes a modal on overlay click if closeOnClick option is true', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {overlay: true, closeOnClick: true});

      // Open it first
      plugin.open();

      plugin.$overlay.trigger('click');

      $html.should.be.hidden;
    });
    it('not closes a modal on overlay click if closeOnClick option is true', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Reveal($html, {overlay: true, closeOnClick: false});

      // Open it first
      plugin.open();

      plugin.$overlay.trigger('click');

      $html.should.be.visible;
    });
  });
});