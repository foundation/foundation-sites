describe('abide:', function() {
  beforeEach(function() {
    this.addMatchers({
      // Place abide-specific matchers here...
    });

    var origFunc = $.fn.foundation;
    spyOn($.fn, 'foundation').andCallFake(function() {
      var result = origFunc.apply(this, arguments);
      jasmine.Clock.tick(1000); // Let things settle...
      return result;
    });
  });

  describe('basic validation', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/abide/basic.html'];
    });

    it('should not mark fields as invalid on load', function() {
      $(document).foundation();

      expect($('input[name="user_name"]')).not.toHaveData('invalid');
      expect($('input[name="user_email"]')).not.toHaveData('invalid');
    });

    it('should trigger correct events for all required fields', function() {
      $(document).foundation();

      var settings = Foundation.libs.abide.settings;

      spyOnEvent('form', 'invalid');
      spyOnEvent('form', 'valid');

      spyOnEvent('input[name="user_name"]', 'invalid');
      spyOnEvent('input[name="user_name"]', 'valid');

      spyOnEvent('input[name="user_email"]', 'invalid');
      spyOnEvent('input[name="user_email"]', 'valid');

      $('form').submit();

      expect('valid').not.toHaveBeenTriggeredOn('form');
      expect('valid').not.toHaveBeenTriggeredOn('input[name="user_name"]');
      expect('valid').not.toHaveBeenTriggeredOn('input[name="user_email"]');      

      expect('invalid').toHaveBeenTriggeredOn('form');
      expect('invalid').toHaveBeenTriggeredOn('input[name="user_name"]');
      expect('invalid').toHaveBeenTriggeredOn('input[name="user_email"]');
    });

    it('should mark missing required fields as invalid', function() {
      $(document).foundation();

      expect($('input[name="user_name"]')).not.toHaveData('invalid');
      expect($('input[name="user_email"]')).not.toHaveData('invalid');

      $('form').submit();

      var invalid_fields = $('form').find('[data-invalid]');
      expect(invalid_fields.length).toBe(2);

      expect($('input[name="user_name"]')).toHaveData('invalid');
      expect($('input[name="user_email"]')).toHaveData('invalid');
    });

    it('should pass validation when all fields are filled out correctly', function() {
      $(document).foundation();

      spyOnEvent('form', 'invalid');
      spyOnEvent('form', 'valid');

      spyOnEvent('input[name="user_name"]', 'invalid');
      spyOnEvent('input[name="user_name"]', 'valid');

      spyOnEvent('input[name="user_email"]', 'invalid');
      spyOnEvent('input[name="user_email"]', 'valid');

      $('input[name="user_name"]').val('John');
      $('input[name="user_email"]').val('foo@bar.com');

      $('form').submit();

      expect('valid').toHaveBeenTriggeredOn('form');
      expect('valid').toHaveBeenTriggeredOn('input[name="user_name"]');
      expect('valid').toHaveBeenTriggeredOn('input[name="user_email"]');      

      expect('invalid').not.toHaveBeenTriggeredOn('form');
      expect('invalid').not.toHaveBeenTriggeredOn('input[name="user_name"]');
      expect('invalid').not.toHaveBeenTriggeredOn('input[name="user_email"]');
    });
  });

  describe('advanced validation', function() {
    beforeEach(function() {
      document.body.innerHTML = __html__['spec/abide/advanced.html'];
    });

    it('should support builtin equalTo validator', function() {
      $(document).foundation({
        abide: {
          validators: {
            range: function(){ return true; }
          }
        }
      });


      expect($('input[name="user_password"]')).not.toHaveAttr('data-invalid');
      expect($('input[name="user_password_confirmation"]')).not.toHaveAttr('data-invalid');

      $('input[name="user_password"]').val("foobarbaz");
      // now they're not equal
      $('form').submit();

      var invalid_fields = $('form').find('[data-invalid]');
      expect(invalid_fields.length).toBe(1);
      expect($('input[name="user_password_confirmation"]')).toHaveAttr('data-invalid');

      $('input[name="user_password_confirmation"]').val("foobarbaz");
      // now they're equal
      spyOnEvent('form', 'invalid');
      spyOnEvent('form', 'valid');

      $('form').submit();

      expect('valid').toHaveBeenTriggeredOn('form');
      expect($('input[name="user_password"]')).not.toHaveAttr('data-invalid');
      expect($('input[name="user_password_confirmation"]')).not.toHaveAttr('data-invalid');
    });

    it('should support custom validators', function() {
      $(document).foundation({
        abide: {
          validators: {
            range: function(el, required, parent) {
              var start = parseInt(this.S("[name='user_start_num']").val()),
                  end = parseInt(el.value);

              return start < end;
            }
          }
        }
      });

      expect($('input[name="user_start_num"]')).not.toHaveData('invalid');
      expect($('input[name="user_end_num"]')).not.toHaveData('invalid');

      // invalid
      $('input[name="user_start_num"]').val("10");
      $('input[name="user_end_num"]').val("2");

      $('form').submit();

      //var invalid_fields = $('form').find('[data-invalid]');
      // includes other fields with validators
      //expect(invalid_fields.length).toBe(3);
      //expect($('input[name="user_end_num"]')).toHaveAttr('data-invalid');

      expect($('input[name="user_start_num"]')).not.toHaveAttr('data-invalid');
      expect($('input[name="user_end_num"]')).toHaveAttr('data-invalid');

      // valid now
      $('input[name="user_end_num"]').val("12");
      spyOnEvent('form', 'invalid');
      spyOnEvent('form', 'valid');

      $('form').submit();

      expect('valid').toHaveBeenTriggeredOn('form');
      expect($('input[name="user_start_num"]')).not.toHaveAttr('data-invalid');
      expect($('input[name="user_end_num"]')).not.toHaveAttr('data-invalid');
    });
  });
});
