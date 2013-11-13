describe('section:', function() {
  beforeEach(function() {
    this.addMatchers({
      isAccordion: function() {
        var sectionLib = Foundation.libs.section;
        var settings = sectionLib.settings;
        return sectionLib.is_accordion(this.actual) || 
          (sectionLib.is_auto(this.actual) && 
            this.actual.is("[" + settings.small_style_data_attr + "]"));
      },
      isAuto: function() {
        var sectionLib = Foundation.libs.section;
        var settings = sectionLib.settings;
        return sectionLib.is_auto(this.actual);     
      },
      isHorizontalTabs: function() {
        var sectionLib = Foundation.libs.section;
        var settings = sectionLib.settings;
        return sectionLib.is_horizontal_tabs(this.actual) ||
          (sectionLib.is_auto(this.actual) && !this.actual.is("[" + settings.small_style_data_attr + "]"));
      }
    });
  });

  describe('auto with defaults', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/section/auto.html'];

      $.ajax({ dataType: 'script', cache: true, async: false, url: '/base/js/foundation/foundation.js'});

      var origFunc = $.fn.foundation;
      spyOn($.fn, 'foundation').andCallFake(function() {
        var result = origFunc.apply(this);
        jasmine.Clock.tick(1000); // Let things settle...
        return result;
      });

      $.ajax({ dataType: 'script', cache: true, async: false, url: '/base/js/foundation/foundation.section.js'});
    });

    describe('when below the small breakpoint', function () {
      it('should be accordion', when('tiny', function() {
        $(document).foundation();

        var settings = Foundation.libs.section.settings;

        var section = $(settings.section_selector)
        expect(section).isAuto();
        expect(section).isAccordion();
      })); 
    });

    describe('when above the small breakpoint', function() {
      it('should be tabs', when('small', function() {
        $(document).foundation();

        var settings = Foundation.libs.section.settings;

        var section = $(settings.section_selector)
        expect(section).isAuto();
        expect(section).not.isAccordion();
        expect(section).isHorizontalTabs();
      }));
    });
  });
});
