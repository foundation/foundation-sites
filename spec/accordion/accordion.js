describe('accordion:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place accordion-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });

  describe('basic accordion with tab child', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/accordion/basic.html'];
    });

    it('should default to the active tab', function() {
      $(document).foundation();

      expect($('#panel1')).toBeVisible();
      expect($('#panel2-1')).toBeVisible();
      expect($('#panel2-2')).toBeHidden();
      expect($('#panel2')).toBeHidden();
      expect($('#panel3')).toBeHidden();
    });

    it('should switch to the clicked section', function() {
      $(document).foundation();

      $('#panel2').prev().click();

      expect($('#panel1')).toBeHidden();
      expect($('#panel2-1')).toBeHidden();
      expect($('#panel2-2')).toBeHidden();
      expect($('#panel2')).toBeVisible();
      expect($('#panel3')).toBeHidden();
    });
  });
});
