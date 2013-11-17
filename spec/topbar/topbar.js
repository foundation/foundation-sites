describe('topbar:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Topbar-specific matchers go here...
    });
  });

  describe('single dropdown with two child dropdowns', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/topbar/dropdown_with_two_subdropdowns.html'];

      $.ajax({ dataType: 'script', cache: true, async: false, url: '/base/js/foundation/foundation.js'});

      var origFunc = $.fn.foundation;
      spyOn($.fn, 'foundation').andCallFake(function() {
        var args = Array.prototype.slice.call(arguments, 0);
        var result = origFunc.apply(this, args);
        jasmine.Clock.tick(1000); // Let things settle...
        return result;
      });

      $.ajax({ dataType: 'script', cache: true, async: false, url: '/base/js/foundation/foundation.topbar.js'});
    });

    describe('when is_hover is false', function() {
      describe('when above the topbar breakpoint', function() {
        it('should open the dropdown when clicked', function() {
          $(document).foundation('topbar', { is_hover: false });

          if(matchMedia(Foundation.media_queries['topbar']).matches) {
            var mainItem = $('#mainItem');
            var mainItemDropdown = mainItem.next('ul.dropdown');
            expect(mainItemDropdown.is(':visible')).toBe(false);
            mainItem.click();
            expect(mainItemDropdown.is(':visible')).toBe(true);
          }
        });

        it('should close the dropdown when clicked again', function() {
          $(document).foundation('topbar', { is_hover: false });

          if(matchMedia(Foundation.media_queries['topbar']).matches) {
            var mainItem = $('#mainItem');
            var mainItemDropdown = mainItem.next('ul.dropdown');
            expect(mainItemDropdown.is(':visible')).toBe(false);
            mainItem.click();
            mainItem.click();
            expect(mainItemDropdown.is(':visible')).toBe(false);
          }
        });

        it('should open the child dropdown when clicked', function() {
          $(document).foundation('topbar', { is_hover: false });

          if(matchMedia(Foundation.media_queries['topbar']).matches) {
            var mainItem = $('#mainItem');
            var mainItemDropdown = mainItem.next('ul.dropdown');

            var dropdown1 = $('#dropdown1');
            var dropdown1Dropdown = dropdown1.next('ul.dropdown');

            expect(dropdown1Dropdown.is(':visible')).toBe(false);
            mainItem.click();
            dropdown1.click();
            expect(mainItemDropdown.is(':visible')).toBe(true);
            expect(dropdown1Dropdown.is(':visible')).toBe(true);
          }
        });

        it('should close the first child dropdown when the second child dropdown is clicked', function() {
          $(document).foundation('topbar', { is_hover: false });

          if(matchMedia(Foundation.media_queries['topbar']).matches) {
            var mainItem = $('#mainItem');
            var mainItemDropdown = mainItem.next('ul.dropdown');

            var dropdown1 = $('#dropdown1');
            var dropdown1Dropdown = dropdown1.next('ul.dropdown');

            var dropdown2 = $('#dropdown2');
            var dropdown2Dropdown = dropdown2.next('ul.dropdown');

            expect(dropdown2Dropdown.is(':visible')).toBe(false);
            mainItem.click();
            dropdown1.click();
            dropdown2.click();
            expect(mainItemDropdown.is(':visible')).toBe(true);
            expect(dropdown1Dropdown.is(':visible')).toBe(false);
            expect(dropdown2Dropdown.is(':visible')).toBe(true);
          }
        });
      });
    });
  });
});
