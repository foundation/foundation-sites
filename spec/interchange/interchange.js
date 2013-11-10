describe('interchange:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Interchange-specific matchers go here...
    });
  });

  describe('an image with built-in sizes specified', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/interchange/defaultAndSmall.html'];

      $.ajax({ dataType: 'script', cache: false, async: false, url: '/base/js/foundation/foundation.js'});

      var origFunc = $.fn.foundation;
      spyOn($.fn, 'foundation').andCallFake(function() {
        var result = origFunc.apply(this);
        jasmine.Clock.tick(1000); // Let things settle...
        return result;
      });

      $.ajax({ dataType: 'script', cache: false, async: false, url: '/base/js/foundation/foundation.interchange.js'});
    });

    describe('when below the small breakpoint', function () {
      it('should be the default image', when('tiny', function() {
        $(document).foundation();

        var image = $('#mainImage');
        expect(image[0].src).toBe('http://placehold.it/350x150');
      }));
    });

    describe('when above the small breakpoint', function() {
      it('should be the small image', when('small', function() {
        $(document).foundation();

        var settings = Foundation.libs.interchange.settings;

        var image = $('#mainImage');
        expect(image[0].src).toBe('http://placehold.it/900x400');
      }));
    });

    describe('when the image is removed dynamically', function() {
      it('should not cause errors during resize', function() {

        var resizeFunc = Foundation.libs.interchange.resize;
        spyOn(Foundation.libs.interchange, 'resize').andCallFake(function() {
          expect($.proxy(resizeFunc, this)).not.toThrow();
        });

        $(document).foundation();

        $('#mainImage').detach();

        $(window).trigger('resize');
        jasmine.Clock.tick(1000);
      });
    });
  });
});
