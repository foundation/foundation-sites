describe('dropdown:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place dropdown-specific matchers here...
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
      document.body.innerHTML = __html__['spec/dropdown/basic.html'];
    });

    it('is hidden on initialization', function() {
      $(document).foundation();

      expect($('#drop1').hasClass('open')).toBe(false);
      expect($('#drop2').hasClass('open')).toBe(false);
      expect($('#drop3').hasClass('open')).toBe(false);
    });

    it('displays the dropdown on click', function() {
      $(document).foundation();

      $('#drop1link').click();

      expect($('#drop1').hasClass('open')).toBe(true);
      expect($('#drop2').hasClass('open')).toBe(false);
      expect($('#drop3').hasClass('open')).toBe(false);
    });

    it('displays the content dropdown on click', function() {
      $(document).foundation();

      $('#drop2link').click();

      expect($('#drop1').hasClass('open')).toBe(false);
      expect($('#drop2').hasClass('open')).toBe(true);
      expect($('#drop3').hasClass('open')).toBe(false);
    });

    it('closes an open dropdown when another is clicked', function() {
      $(document).foundation();

      $('#drop1link').click();
      $('#drop2link').click();

      expect($('#drop1').hasClass('open')).toBe(false);
      expect($('#drop2').hasClass('open')).toBe(true);
      expect($('#drop3').hasClass('open')).toBe(false);
    });

    it('closes an open dropdown when the document is clicked elsewhere', function() {
      $(document).foundation();

      $('#drop1link').click();
      $('body').click();

      expect($('#drop1').hasClass('open')).toBe(false);
      expect($('#drop2').hasClass('open')).toBe(false);
      expect($('#drop3').hasClass('open')).toBe(false);
    });

    it('displays a dropdown even if the dropdown button has deeply nested content', function() {
      $(document).foundation();

      $('#drop3span').click();

      expect($('#drop1').hasClass('open')).toBe(false);
      expect($('#drop2').hasClass('open')).toBe(false);
      expect($('#drop3').hasClass('open')).toBe(true);
    });
 });
});
