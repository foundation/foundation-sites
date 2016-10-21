describe('Drilldown Menu', function() {
  var plugin;
  var $html;
  var template = `<ul class="menu" data-drilldown style="width: 200px" id="m1">
    <li>
      <a href="#">Item 1</a>
      <ul class="menu">
        <li>
          <a href="#">Item 1A</a>
          <ul class="menu">
            <li><a href="#Item-1Aa">Item 1Aa</a></li>
            <li><a href="#Item-1Ba">Item 1Ba</a></li>
          </ul>
        </li>
        <li><a href="#Item-1B">Item 1B</a></li>
        <li><a href="#Item-1C">Item 1C</a></li>
      </ul>
    </li>
    <li>
      <a href="#">Item 2</a>
      <ul class="menu">
        <li><a href="#Item-2A">Item 2A</a></li>
        <li><a href="#Item-2B">Item 2B</a></li>
      </ul>
    </li>
    <li><a href="#Item-3"> Item 3</a></li>
  </ul>`;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element and plugin options', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });
  });

  describe('init()', function() {
    it('stores additional elements', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      plugin.$submenuAnchors.should.be.an('object');
      plugin.$submenus.should.be.an('object');
      plugin.$menuItems.should.be.an('object');
    });
  });

  describe('prepareMenu()', function() {
    it('wraps the submenus', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

    });
    it('adds ARIA attributes', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      plugin.$element.find('[data-submenu]').each(function() {
        $(this).should.have.attr('role', 'menu');
        $(this).should.have.attr('aria-hidden', 'true');
      });

      plugin.$element.find('.is-drilldown-submenu-parent').each(function() {
        $(this).should.have.attr('aria-haspopup', 'true');
        $(this).should.have.attr('aria-expanded', 'false');
        $(this).should.have.attr('aria-label', $(this).children('a').first().text());
      });
    });
  });

  describe('show()', function() {
    it('shows the given submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(0));

      // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
      $html.find('li.is-drilldown-submenu-parent').eq(0).find('ul').should.have.class('is-active');
    });
    it('toggles ARIA attributes', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(0));

      $html.find('li.is-drilldown-submenu-parent').eq(0).should.have.attr('aria-expanded', 'true');
      $html.find('li.is-drilldown-submenu-parent').eq(0).children('ul').should.have.attr('aria-hidden', 'false');
    });
    it('fires open.zf.drilldown event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      $html.on('open.zf.drilldown', function() {
        // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
        $html.find('li.is-drilldown-submenu-parent').eq(0).find('ul').should.have.class('is-active');
        done();
      });

      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(0));
    });
  });

  describe('hide()', function() {
    it('hides the given submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open it first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(0));

      plugin._hide($html.find('li.is-drilldown-submenu-parent').eq(0).children('ul'));

      // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
      $html.find('li.is-drilldown-submenu-parent').eq(0).children('ul').should.have.class('is-closing');
    });
    it('toggles ARIA attributes', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open it first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(0));

      plugin._hide($html.find('li.is-drilldown-submenu-parent').eq(0).children('ul'));

      $html.find('li.is-drilldown-submenu-parent').eq(0).should.have.attr('aria-expanded', 'false');
      $html.find('li.is-drilldown-submenu-parent').eq(0).children('ul').should.have.attr('aria-hidden', 'true');
    });
    it('fires hide.zf.drilldown event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open it first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(0));

      $html.on('hide.zf.drilldown', function() {
        // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
        $html.find('li.is-drilldown-submenu-parent').eq(0).children('ul').should.have.class('is-closing');
        done();
      });

      plugin._hide($html.find('li.is-drilldown-submenu-parent').eq(0).children('ul'));
    });
  });

  describe('hideAll()', function() {
    it('hides all submenus', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open one first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(2));

      plugin._hideAll();

      $html.find('ul[data-submenu].is-active').each(function() {
        // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
        $(this).should.have.class('is-closing');
      });
    });
    it('fires closed.zf.drilldown event', function(done) {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open one first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(2));
      
      $html.one('closed.zf.drilldown', function() {
        $html.find('ul[data-submenu].is-active').each(function() {
          // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
          $(this).should.have.class('is-closing');
        });
        done();
      });

      plugin._hideAll();
    });
  });

  describe('back()', function() {
    it('hides current submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open one first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(1));

      $html.find('li.is-drilldown-submenu-parent').eq(1).children('ul').children('.js-drilldown-back').trigger('click');

      // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
      $html.find('li.is-drilldown-submenu-parent').eq(1).children('ul').should.have.class('is-closing');
    });
    it('shows parent submenu', function() {
      $html = $(template).appendTo('body');
      plugin = new Foundation.Drilldown($html, {});

      // Open one first
      plugin._show($html.find('li.is-drilldown-submenu-parent').eq(1));

      $html.find('li.is-drilldown-submenu-parent').eq(1).children('ul').children('.js-drilldown-back').trigger('click');

      // Checking with .be.hidden is not possible because they don't have display: block but z-index: -1
      $html.find('li.is-drilldown-submenu-parent').eq(0).children('ul').should.have.class('is-active');
    });
  });


});