describe('tooltip:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place tooltip-specific matchers here...
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
      document.body.innerHTML = __html__['spec/tooltip/basic.html'];
    });

    it('is hidden on initialization', function() {
      $(document).foundation();

      expect($('#tip1').hasClass('open')).toBe(false);
      expect($('#tip2').hasClass('open')).toBe(false);
    });
    
    it('is able to display the tooltip', function() {
      $(document).foundation();

      Foundation.libs.tooltip.showTip($("#tip1"));
      
      expect($("span.tooltip[role='tooltip']").filter(":visible").length).toBe(1);  
    }); 
       
    it('is able to display multiple tooltips', function() {
      $(document).foundation();

      Foundation.libs.tooltip.showTip($("#tip1"));
      Foundation.libs.tooltip.showTip($("#tip2"));
    
      expect($("span.tooltip[role='tooltip']").filter(":visible").length).toBe(2);  
    });

    it('reads hover_delay from options', function() {
      var $el = $('#tip-with-hoverdelay');
      $el.attr('data-options', 'hover_delay:57');
      $(document).foundation();

      var delay = Foundation.libs.tooltip.hover_delay($el);
      expect(delay).toBe(57);
    });

    it('uses hover_delay from settings if no data options provided', function() {
      var $el = $('#tip-with-hoverdelay');
      $(document).foundation({
        tooltip: {
          hover_delay: 200
        }
      });

      var delay = Foundation.libs.tooltip.hover_delay($el);
      expect(delay).toBe(200);
    });
  });
});
