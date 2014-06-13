describe('interchange:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place interchange-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });

    spyOn($, 'get').andCallFake(function(path, callback) {
      switch(path) {
        case 'default.html':
          callback('<h1 id="default">DEFAULT</h1>');
        case 'medium.html':
          callback('<h1 id="medium">MEDIUM</h1>');
        case 'large.html':
          callback('<h1 id="large">LARGE</h1>');
      }
    });
  });

  describe('when below the large breakpoint', when_not('large', function() {
    describe('when below the medium breakpoint', when_not('medium', function() {
      describe('with html content interchange', function() {
        beforeEach(function() {
          document.body.innerHTML = __html__['spec/interchange/basic.html'];
        });

        it('shows the default html content', function() {
          $(document).foundation();

          expect($('[data-interchange]').length).toBe(1);
          expect($('#medium').length).toBe(0);
          expect($('#large').length).toBe(0);
        });
      });
    }));
  }));

  describe('when above the large breakpoint', when('large', function() {
      describe('with html content interchange', function() {
        beforeEach(function() {
          document.body.innerHTML = __html__['spec/interchange/basic.html'];
        });

        // Disabling for now... HTML partials may be misbehaving.
        xit('shows the large html content', function() {
          $(document).foundation();

          expect($('#default').length).toBe(0);
          expect($('#medium').length).toBe(0);
          expect($('#large').length).toBe(1);
        });
      });
  }));

  describe('setting data-interchange-last-path', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/interchange/basic.html'];
    });

    it('should set data-interchange-last-path on element when replace occurs', function() {
      Foundation.libs.interchange.update_nodes();
      Foundation.libs.interchange.resize();

      expect($('div[data-interchange]').data('data-interchange-last-path')).toMatch(/.+html$/)
    });
  });
});
