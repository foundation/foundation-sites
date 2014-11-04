describe('clearing:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place clearing-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });

  describe('basic clearing', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/clearing/basic.html'];
    });

    it('displays the first image on click', function() {
      runs(function() {
        $(document).foundation();
        $('#image1').click();
        jasmine.Clock.tick(500);
      });

      waitsFor(function() {
        return $('#image1').parents('li').hasClass('visible');
      }, '#image1 should have class: visible', 500);

      runs(function() {
        expect($('#image1').parents('li').hasClass('visible')).toBe(true);
        expect($('#image2').parents('li').hasClass('visible')).toBe(false);
        expect($('#image3').parents('li').hasClass('visible')).toBe(false);
      });
    });

    it('displays the second image on click', function() {
      runs(function () {
        $(document).foundation();
        $('#image2').click();
        jasmine.Clock.tick(500);
      });

      waitsFor(function() {
        return $('#image2').parents('li').hasClass('visible');
      }, '#image2 should have class: visible', 500);

      runs(function() {
        expect($('#image1').parents('li').hasClass('visible')).toBe(false);
        expect($('#image2').parents('li').hasClass('visible')).toBe(true);
        expect($('#image3').parents('li').hasClass('visible')).toBe(false);
      });
    });

    it('goes to the next slide on next', function() {
      runs(function () {
        $(document).foundation();
        $('#image1').click();
        jasmine.Clock.tick(500);
      });

      waitsFor(function() {
        return $('#image1').parents('li').hasClass('visible');
      }, '#image1 should have class: visible', 500);

      runs(function () {
        $('.clearing-main-next').click();
        jasmine.Clock.tick(500);
      });

      waitsFor(function() {
        return $('#image2').parents('li').hasClass('visible');
      }, '#image2 should have class: visible', 500);

      runs(function() {
        expect($('#image1').parents('li').hasClass('visible')).toBe(false);
        expect($('#image2').parents('li').hasClass('visible')).toBe(true);
        expect($('#image3').parents('li').hasClass('visible')).toBe(false);
      });
    });
  });

  describe('when below the large breakpoint', when_not('large', function() {
    describe('when below the medium breakpoint', when_not('medium', function() {
      describe('with clearing interchange', function() {
        beforeEach(function() {
          document.body.innerHTML = __html__['spec/clearing/interchange.html'];
        });

        it('displays the first image on click', function() {
          runs(function () {
            $(document).foundation();
            $('#image1').click();
            jasmine.Clock.tick(500);
          });

          waitsFor(function() {
            return $('.visible-img img').data('interchange') ? true : false;
          }, '.visible-img img should have interchange data', 500);

          runs(function() {
            expect($('.visible-img img').data('interchange')).toBe('[/base/spec/clearing/ccc.gif, (default)], [/base/spec/clearing/777.gif, (medium)], [/base/spec/clearing/222.gif, (large)]');
            expect($('.visible-img img').attr('src')).toBe('/base/spec/clearing/ccc.gif');
            expect($('.clearing-preload-next').attr('src')).toBe('/base/spec/clearing/777.gif');
          });
        });

        it('displays the second image on click', function() {
          runs(function () {
            $(document).foundation();
            $('#image2').click();
            jasmine.Clock.tick(500);
          });

          waitsFor(function() {
            return $('.visible-img img').data('interchange') ? true : false;
          }, '.visible-img img should have interchange data', 500);

          runs(function() {
            expect($('.visible-img img').data('interchange')).toBe('[/base/spec/clearing/777.gif, (default)], [/base/spec/clearing/222.gif, (medium)], [/base/spec/clearing/ccc.gif, (large)]');
            expect($('.visible-img img').attr('src')).toBe('/base/spec/clearing/777.gif');
            expect($('.clearing-preload-next').attr('src')).toBe('/base/spec/clearing/222.gif');
            expect($('.clearing-preload-prev').attr('src')).toBe('/base/spec/clearing/ccc.gif');
          });
        });
      });
    }));
  }));

  describe('when above the large breakpoint', when('large', function() {
    describe('with clearing interchange', function() {
      beforeEach(function() {
        document.body.innerHTML = __html__['spec/clearing/interchange.html'];
      });

      it('displays the first image on click', function() {
        runs(function () {
          $(document).foundation();
          $('#image1').click();
          jasmine.Clock.tick(500);
        });

        waitsFor(function() {
          return $('.visible-img img').data('interchange') ? true : false;
        }, '.visible-img img should have interchange data', 500);

        runs(function() {
          expect($('.visible-img img').data('interchange')).toBe('[/base/spec/clearing/ccc.gif, (default)], [/base/spec/clearing/777.gif, (medium)], [/base/spec/clearing/222.gif, (large)]');
          expect($('.visible-img img').attr('src')).toBe('/base/spec/clearing/222.gif');
          expect($('.clearing-preload-next').attr('src')).toBe('/base/spec/clearing/ccc.gif');
        });
      });

      it('displays the second image on click', function() {
        runs(function () {
          $(document).foundation();
          $('#image2').click();
          jasmine.Clock.tick(500);
        });

        waitsFor(function() {
          return $('.visible-img img').data('interchange') ? true : false;
        }, '.visible-img img should have interchange data', 500);

        runs(function() {
          expect($('.visible-img img').data('interchange')).toBe('[/base/spec/clearing/777.gif, (default)], [/base/spec/clearing/222.gif, (medium)], [/base/spec/clearing/ccc.gif, (large)]');
          expect($('.visible-img img').attr('src')).toBe('/base/spec/clearing/ccc.gif');
          expect($('.clearing-preload-next').attr('src')).toBe('/base/spec/clearing/777.gif');
          expect($('.clearing-preload-prev').attr('src')).toBe('/base/spec/clearing/222.gif');
        });
      });
    });
  }));
});
