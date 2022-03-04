/* jslint mocha: true */
/*global describe, it, before, beforeEach, after, afterEach, $, Foundation */

describe('Abide', function() {
  var plugin;
  var $html;

  afterEach(function() {
    plugin.destroy();
    $html.remove();
  });

  describe('constructor()', function() {
    it('stores the element & plugin options', function() {
      $html = $('<form data-abide novalidate></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});

      plugin.$element.should.be.an('object');
      plugin.options.should.be.an('object');
    });

    it('the options are recursively merged', function() {
      $html = $('<form data-abide novalidate></form>').appendTo('body');

      var options = {
        validators: {
          notEqualTo: function (el, required, parent) {
            return $(`#${el.attr('data-equalto')}`).val() !== el.val();
          }
        }
      };

      plugin = new Foundation.Abide($html, options);

      plugin.options.validators.should.includes.keys('equalTo', 'notEqualTo');
    });
  });

  describe('validateForm()', function() {
    it('returns true after validation is disabled', function() {
      $html = $("<form data-abide novalidate><input required type='text'><input type='submit'></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.disableValidation();
      plugin.validateForm().should.equal(true);
    });

    it('returns false after validation is (re)enabled', function() {
      $html = $("<form data-abide novalidate><input required type='text'><input type='submit'></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.disableValidation();
      plugin.enableValidation();
      plugin.validateForm().should.equal(false);
    });

    it('returns true if first submit has formnovalidate is disabled', function() {
      $html = $("<form data-abide novalidate><input required type='text'><input type='submit' formnovalidate></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateForm().should.equal(true);
    });
  });

  describe('validateInput()', function() {
    it('returns true for hidden inputs', function() {
      $html = $("<form data-abide novalidate><input type='hidden' required></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(true);
    });

    it('returns true for inputs with [data-abide-ignore]', function() {
      $html = $("<form data-abide novalidate><input type='text' required data-abide-ignore></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(true);
    });

    it('returns true for checked checkboxes', function() {
      $html = $("<form data-abide novalidate><input type='checkbox' name='groupName' required checked='checked'></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(true);
    });

    it('returns false for unchecked checkboxes', function() {
      $html = $("<form data-abide novalidate><input type='checkbox' name='groupName' required></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(false);
    });

    it('returns true for selected select option', function() {
      $html = $("<form data-abide><select required><option value=''></option><option value='One'>One</option><option value='Two' selected='selected'>Two</option></select></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("select")).should.equal(true);
      $html.find("select").val().should.equal("Two");
    });

    it('returns false for unselected select option', function() {
      $html = $("<form data-abide><select required><option value=''></option><option value='One'>One</option><option value='Two'>Two</option></select></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("select")).should.equal(false);
    });
  });

  describe('addErrorClasses()', function() {
    it('adds aria-invalid attribute to element', function() {
      $html = $('<form data-abide><input type="text"></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});

      plugin.addErrorClasses($html.find('input'));

      $html.find('input').should.have.attr('aria-invalid', 'true')
    });
  });

  describe('addGlobalErrorA11yAttributes()', function () {
    it('adds [aria-live] attribute on element', function () {
      $html = $(`<form data-abide><span data-abide-error></span></form>`).appendTo('body');
      plugin = new Foundation.Abide($html, { a11yErrorLevel: 'test-level' });
      plugin.addA11yAttributes($html.find('[data-abide-error]'));

      $html.find('[data-abide-error]').should.have.attr('aria-live', 'test-level');
    });
  });

  describe('addA11yAttributes()', function () {
    it('adds [aria-describedby] attribute to field and [for] attribute to form error', function() {
      $html = $(`
        <form data-abide>
          <input type="text" id="test-input">
          <label class="form-error is-visible" id="test-error">Form error</label>
        </form>
      `).appendTo('body');
      plugin = new Foundation.Abide($html, {});
      plugin.addA11yAttributes($html.find('input'));

      $html.find('input').should.have.attr('aria-describedby', 'test-error');
      $html.find('label.form-error').should.have.attr('for', 'test-input');
    });

    it('does not add [aria-describedby] to the field if the form error is hidden', function() {
      $html = $(`
        <form data-abide>
          <label for="test-input">Text field</div>
          <input type="text" id="test-input">
          <span class="form-error" id="test-error">Form error</span>
        </form>
      `).appendTo('body');
      plugin = new Foundation.Abide($html, {});
      plugin.addA11yAttributes($html.find('input'));

      $html.find('input').should.not.have.attr('aria-describedby', 'test-error');
    });

    it('adds [aria-describedby] to the field if the form error is shown after a validation error', function() {
      $html = $(`
        <form data-abide>
          <label for="test-input">Text field</div>
          <input type="text" id="test-input" required>
          <span class="form-error" id="test-error">Form error</span>
        </form>
      `).appendTo('body');
      plugin = new Foundation.Abide($html, {});
      plugin.addA11yAttributes($html.find('input'));
      plugin.validateForm();

      $html.find('input').should.have.attr('aria-describedby', 'test-error');

      // Test also that the aria-described attribute is correctly removed after
      // the error no longer applies and is hidden from the view.
      $html.find('input').val('text');
      plugin.validateForm();

      $html.find('input').should.not.have.attr('aria-describedby', 'test-error');
    });

    it('adds attributes and ids when no id is set', function() {
      $html = $(`
        <form data-abide>
          <input type="text">
          <label class="form-error is-visible">Form error</label>
        </form>
      `).appendTo('body');
      plugin = new Foundation.Abide($html, {});
      plugin.addA11yAttributes($html.find('input'));

      const errorId = $html.find('.form-error').attr('id');
      $html.find('.form-error').should.have.attr('id').exist;
      $html.find('input').should.have.attr('aria-describedby', errorId);

      const inputId = $html.find('input').attr('id');
      $html.find('input').should.have.attr('id').exist;
      $html.find('.form-error').should.have.attr('for', inputId);
    });
  });

  describe('removeErrorClasses()', function() {
    it('removes aria-invalid attribute from element', function() {
      $html = $('<form data-abide><input type="text"></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});
      // Add error classes first
      plugin.addErrorClasses($html.find('input'));

      plugin.removeErrorClasses($html.find('input'));

      $html.find('input').should.not.have.attr('aria-invalid')
    });
  });

  describe('removeRadioErrorClasses()', function() {
    it('removes aria-invalid attribute from radio group', function() {
      $html = $('<form data-abide><input type="radio" name="groupName"></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});
      // Add error classes first
      plugin.addErrorClasses($html.find('input'));

      plugin.removeRadioErrorClasses('groupName');

      $html.find('input').should.not.have.attr('aria-invalid')
    });
  });

  describe('removeCheckboxErrorClasses()', function() {
    it('removes aria-invalid attribute from checkbox group', function() {
      $html = $('<form data-abide><input type="checkbox" name="groupName"></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});
      // Add error classes first
      plugin.addErrorClasses($html.find('input'));

      plugin.removeCheckboxErrorClasses('groupName');

      $html.find('input').should.not.have.attr('aria-invalid')
    });
  });

  describe('resetForm()', function() {
    it('removes aria-invalid attribute from elements', function() {
      $html = $('<form data-abide><input type="text"></form>').appendTo('body');
      plugin = new Foundation.Abide($html, {});
      // Add error classes first
      plugin.addErrorClasses($html.find('input'));

      plugin.resetForm();

      $html.find('input').should.not.have.attr('aria-invalid')
    });
  });
});
