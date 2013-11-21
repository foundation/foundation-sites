describe('topbar:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place topbar-specific matchers here...
    });
  });

  describe('multiple dropdowns with defaults', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/topbar/multidropdown.html'];

      $.ajax({ dataType: 'script', cache: true, async: false, url: '/base/dist/assets/js/foundation/foundation.js'});

      var origFunc = $.fn.foundation;
      spyOn($.fn, 'foundation').andCallFake(function() {
        var result = origFunc.apply(this);
        jasmine.Clock.tick(1000); // Let things settle...
        return result;
      });

      $.ajax({ dataType: 'script', cache: true, async: false, url: '/base/dist/assets/js/foundation/foundation.topbar.js'});
    });

    afterEach(function() {
      document.body.innerHTML = '';
    });

    describe('when below the medium breakpoint', function () {
      it('should have a toggle button', when('small', function() {
        $(document).foundation();

        var settings = Foundation.libs.topbar.settings;
        var topbar = $('.top-bar, [data-topbar]');
        var toggle = topbar.find('.toggle-topbar:not(:hidden)');
        expect(toggle.length).toBe(1);
      }));

      // it('should expand when the toggle is clicked', when('small', function() {
      //   $(document).foundation();

      //   var topbar = $('.top-bar, [data-topbar]');
      //   var toggle = topbar.find('.toggle-topbar');

      //   spyOn(Foundation.libs.topbar, 'toggle').andCallThrough();

      //   toggle.click();

      //   expect(Foundation.libs.topbar.toggle).toHaveBeenCalled();
      //   expect(topbar.hasClass('expanded')).toBe(true);
      // }));

      it('should collapse after being expanded by the toggle', when('small', function() {
        $(document).foundation();

        var topbar = $('.top-bar, [data-topbar]');
        var toggle = topbar.find('.toggle-topbar');

        toggle.click();
        toggle.click();

        expect(topbar.hasClass('expanded')).toBe(false);
      }));
    });

    describe('when above the small breakpoint', function() {
      it('should not have a toggle button', when('large', function() {
        $(document).foundation();

        var settings = Foundation.libs.topbar.settings;
        var topbar = $('.top-bar, [data-topbar]');
        var toggle = topbar.find('.toggle-topbar:hidden');
        expect(toggle.length).toBe(1);
      }));
    });
  });
});
