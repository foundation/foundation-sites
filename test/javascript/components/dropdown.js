describe('Dropdown', function() {
  let plugin;
  let $dropdownController;
  let $dropdownContainer;

  const getDropdownController = (buttonClasses = '') =>
    `<button class="${buttonClasses}" type="button" data-toggle="my-dropdown">toggle</button>`;
  const getDropdownContainer = (dropdownClasses = '') =>
    `<div class="${dropdownClasses}" data-dropdown id="my-dropdown">Dropdown</div>`;

  const getHoverDropdownContainer = (dropdownClasses = '') =>
    `<div class="${dropdownClasses}" data-dropdown data-hover="true" data-hover-pane="true" id="my-dropdown">Dropdown</div>`;

  const getAutoFocusDropdownContainer = (dropdownClasses = '') =>
    `<div class="${dropdownClasses}" data-dropdown data-auto-focus="true" id="my-dropdown">Dropdown<input type="text" placeholder="should auto focus" id="focus-text" /></div>`;

  afterEach(function() {
    plugin.destroy();
    $dropdownController.remove();
    $dropdownContainer.remove();
  });

  describe('constructor()', function() {
    it('stores the element & plugin options', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      console.log('dropdown constructor');

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('open()', function() {
    it('traps focus if trapFocus option is true', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {trapFocus: true});

      let spy = sinon.spy(Foundation.Keyboard, 'trapFocus');
      plugin.open();

      sinon.assert.called(spy);
      Foundation.Keyboard.trapFocus.restore();
    });

    it('should open dropdown on button click', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      plugin.open();

      $dropdownController.on('show.zf.dropdown', function() {
        $('#my-dropdown').should.not.be.hidden;
        $('#my-dropdown').should.have.attr('aria-hidden', 'false');
        $('#my-dropdown').should.have.class('is-open');
        done();
      });
      plugin.close();
    });

    it('should open dropdown on hover', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getHoverDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      plugin.open();

      $dropdownController.on('show.zf.dropdown', function() {
        $('#my-dropdown').should.not.be.hidden;
        $('#my-dropdown').should.have.attr('aria-hidden', 'false');
        $('#my-dropdown').should.have.class('is-open');
        done();
      });
      plugin.close();
    });

    it('should autofocus input on open', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getAutoFocusDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      plugin.open();

      $focusedElement = '<input type="text" placeholder="should auto focus" id="focus-text" />';

      $dropdownController.on('show.zf.dropdown', function() {
        $('#my-dropdown').should.not.be.hidden;
        $('#my-dropdown').should.have.attr('aria-hidden', 'false');
        $('#my-dropdown').should.have.class('is-open');
        document.activeElement.should.be.equal($focusedElement);
        done();
      });
      plugin.close();
    });
  });

  describe('close()', function() {
    it('releases focus if trapFocus option is true', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {trapFocus: true});

      // Open it first...
      plugin.open();

      let spy = sinon.spy(Foundation.Keyboard, 'releaseFocus');
      plugin.close();

      sinon.assert.called(spy);
      Foundation.Keyboard.releaseFocus.restore();
    });
  });

  describe('inferred positioning', function() {
    it('default orientation should be bottom', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.open()
      plugin.position.should.equal('bottom');
    });

    it('gets right alignment from float-right', function() {
      $dropdownController = $(getDropdownController('custom-style-before float-right custom-style-after'))
        .appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.open()
      plugin.position.should.equal('bottom')
      plugin.alignment.should.equal('right')
    });
  });

  describe('closeOnClick option', function() {
    it('not closes a dropdown by clicking on the dropdown if closeOnClick option is true', function(done) {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {closeOnClick: true});

      // Open it first...
      plugin.open();

      let spy = sinon.spy(plugin, 'close');

      plugin.$element.trigger("click");

      setTimeout(function() {
        sinon.assert.notCalled(spy);
        done();
      }, 2);
    });
  });

  describe('keyboard events', function () {
    it('opens Dropdown on SPACE', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      $dropdownController.focus()
        .trigger(window.mockKeyboardEvent('SPACE'));

      $dropdownContainer.should.be.visible;
    });
    it('focuses Dropdown on SPACE', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      $dropdownController.focus()
        .trigger(window.mockKeyboardEvent('SPACE'));

      document.activeElement.should.be.equal($dropdownContainer[0]);
    });
    it('does not focus Dropdown when anchor is an input', function() {
      $dropdownController = $('<input type="text" data-toggle="my-dropdown">').appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});
      $dropdownController.focus()
        .trigger(window.mockKeyboardEvent('SPACE'));

      document.activeElement.should.be.equal($dropdownController[0]);
    });
  })
});
