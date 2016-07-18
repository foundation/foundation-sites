describe('Dropdown', function() {
  let plugin;
  let $dropdownController;
  let $dropdownContainer;

  const getDropdownController = (buttonClasses = '') =>
    `<button class="${buttonClasses}" type="button" data-toggle="my-dropdown">toggle</button>`;
  const getDropdownContainer = (dropdownClasses = '', dataOptions = '') =>
    `<div class="${dropdownClasses}" data-dropdown id="my-dropdown" ${dataOptions}>Dropdown</div>`;

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

    it('does not mutate options', function() {
      $dropdownController = $(getDropdownController('float-left ')).appendTo('body');
      $dropdownContainer = $(getDropdownContainer('bottom')).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {
        positionClass: 'right',
      });

      plugin.$element.should.be.an('object');
      plugin.options.positionClass.should.equal('right');
    });
  });

  describe('getPositionClass()', function() {
    it('has no orientation', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.getPositionClass().trim().should.equal('');
    });

    it('uses user defined options', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer()).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {
        positionClass: 'right top'
      });

      plugin.getPositionClass().trim().should.equal('right top');
    });

    it('uses data attributes', function() {
      $dropdownController = $(getDropdownController()).appendTo('body');
      $dropdownContainer = $(getDropdownContainer('', 'data-position-class="left"')).appendTo('body');
      plugin = new Foundation.Dropdown($dropdownContainer, {});

      plugin.getPositionClass().trim().should.equal('left');
    });

    describe('uses foundation classes', function() {
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

      it('has both horizontal and vertical position', function() {
        $dropdownController = $(getDropdownController('custom-style-before float-right custom-style-after'))
          .appendTo('body');
        $dropdownContainer = $(getDropdownContainer('bottom')).appendTo('body');
        plugin = new Foundation.Dropdown($dropdownContainer, {});

        plugin.getPositionClass().trim().should.equal('right bottom');
      });
    });

    describe('watches configuration', function() {
      it('whatches options', function() {
        $dropdownController = $(getDropdownController()).appendTo('body');
        $dropdownContainer = $(getDropdownContainer()).appendTo('body');
        plugin = new Foundation.Dropdown($dropdownContainer, {
          positionClass: 'right top'
        });

        plugin.options.positionClass = 'left'

        plugin.getPositionClass().trim().should.equal('left');
      });

      it('whatches classes', function() {
        $dropdownController = $(getDropdownController('float-right ')).appendTo('body');
        $dropdownContainer = $(getDropdownContainer('bottom')).appendTo('body');
        plugin = new Foundation.Dropdown($dropdownContainer, {});

        $dropdownContainer.removeClass('bottom').addClass('top')

        plugin.getPositionClass().trim().should.equal('right top');
      });
    });
  });
});
