describe('Accordion Menu', function() {
  var plugin;
  var $html;
  var template = `<ul class="vertical tree" data-accordion-menu>
    <li><span>Item 1</span>
      <ul class="tree vertical nested">
        <li><span>Item 1A</span>
          <ul class="tree vertical nested">
            <li><span>Item 1Ai</span></li>
            <li><a href="http://www.google.com">External link</a></li>
            <li><span>Item 1Aiii</span></li>
          </ul>
        </li>
        <li><span>Item 1B</span></li>
        <li><span>Item 1C</span></li>
      </ul>
      </li>
      <li><span>Item 2</span>
        <ul class="tree vertical nested">
          <li><span>Item 2A</a></li>
          <li><span>Item 2B</a></li>
        </ul>
      </li>
    <li><a href="http://www.google.com">External link</a></li>
  </ul>`;
  Foundation.AccordionMenu.defaults.slideSpeed = 0;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element and plugin options', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });
  
  describe('up()', function() {
    it('closes the targeted submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html);

      // Open it first
      plugin.down($html.find('.is-accordion-submenu').eq(0));
      
      plugin.up($html.find('.is-accordion-submenu').eq(0));
      $html.find('.is-accordion-submenu').eq(0).should.be.hidden;
    });

    it('toggles attributes of title of the targeted container', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      // Open it first
      plugin.down($html.find('.is-accordion-submenu').eq(0));

      plugin.up($html.find('.is-accordion-submenu').eq(0));
      $html.find('.is-accordion-submenu-parent').eq(0).should.have.attr('aria-expanded', 'false');
    });

    it('fires up.zf.accordionMenu event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {slideSpeed: 200});

      // Open it first
      plugin.down($html.find('.is-accordion-submenu').eq(0));

      $html.on('up.zf.accordionMenu', function() {
        $html.find('.is-accordion-submenu').eq(0).should.be.hidden;
        done();
      });
      plugin.up($html.find('.is-accordion-submenu').eq(0));
    });
  });

  describe('down()', function() {
    it('opens the targeted submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      plugin.down($html.find('.is-accordion-submenu').eq(0));
      $html.find('.is-accordion-submenu').eq(0).should.be.visible;
    });

    it('toggles attributes of title of the targeted submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      plugin.down($html.find('.is-accordion-submenu').eq(0));
      $html.find('.is-accordion-submenu-parent').eq(0).should.have.attr('aria-expanded', 'true');
    });

    it('closes open submenu if multiOpen is false', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {multiOpen: false});

      // Open another one first
      plugin.down($html.find('.is-accordion-submenu').eq(0));
      
      plugin.down($html.find('.is-accordion-submenu').eq(2));
      $html.find('.is-accordion-submenu').eq(0).should.be.hidden;
    });

    it('not closes open submenu if multiOpen is true', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {multiOpen: true});

      // Open another one first
      plugin.down($html.find('.is-accordion-submenu').eq(0));
      
      plugin.down($html.find('.is-accordion-submenu').eq(2));
      $html.find('.is-accordion-submenu').eq(0).should.be.visible;
    });

    it('fires down.zf.accordionMenu event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {slideSpeed: 200});

      $html.on('down.zf.accordionMenu', function() {
        $html.find('.is-accordion-submenu').eq(0).should.be.visible;
        done();
      });
      plugin.down($html.find('.is-accordion-submenu').eq(0));
    });
  });

  describe('toggle()', function() {
    it('opens a closed container', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      plugin.toggle($html.find('.is-accordion-submenu').eq(0));
      $html.find('.is-accordion-submenu').eq(0).should.be.visible;
    });

    it('closes an open container', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      // Open first
      plugin.down($html.find('.is-accordion-submenu').eq(0));

      plugin.toggle($html.find('.is-accordion-submenu').eq(0));
      $html.find('.is-accordion-submenu').eq(0).should.be.hidden;
    });
  });

  describe('hideAll()', function() {
    it('closes all accordions', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.AccordionMenu($html, {});

      // Open some first
      plugin.down($html.find('.is-accordion-submenu').eq(0));
      plugin.down($html.find('.is-accordion-submenu').eq(1));
      plugin.down($html.find('.is-accordion-submenu').eq(2));

      plugin.hideAll();

      $html.find('[data-submenu]').each(function() {
        $(this).should.be.hidden;
      });
    });
  });

});