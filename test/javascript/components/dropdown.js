describe('Dropdown', function() {
  let plugin;
  let $dropdownController;
  let $dropdownContainer;

  const getDropdownController = (buttonClasses = '') =>
    `<button class="${buttonClasses}" type="button" data-toggle="my-dropdown">toggle</button>`;
  const getDropdownContainer = (dropdownClasses = '') =>
    `<div class="${dropdownClasses}" data-dropdown id="my-dropdown">Dropdown</div>`;

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

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });

    it('uses user\'s defined options', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      const options = {
        positionClass: 'right top',
      };
      plugin = new Foundation.Dropdown($dropdownContainer, options);

      plugin.$element.should.be.an('object');
      plugin.options.positionClass.should.equal(options.positionClass);
    });

    it('uses user\'s defined element properties', function() {
      $dropdownController = $(getDropdownController('float-left ')).appendTo('body');
      $dropdownContainer = $(getDropdownContainer('bottom')).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.$element.should.be.an('object');
      plugin.options.positionClass.should.equal('left bottom');
    });
  });

  describe('getPositionClass()', function() {
    it('has no orientation', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.getPositionClass().trim().should.equal('');
    });

    it('has vertical position', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer('custom-style-before bottom custom-style-after'))
        .appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.getPositionClass().trim().should.equal('bottom');
    });

    it('has horizontal position', function() {
      $dropdownController = $(getDropdownController('custom-style-before float-right custom-style-after'))
        .appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.getPositionClass().trim().should.equal('right');
    });
  });
});
