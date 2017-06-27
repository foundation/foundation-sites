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
      $html = $("<form data-abide><input type='checkbox' required checked='checked'></form>").appendTo("body");
      plugin = new Foundation.Abide($html, {});

      plugin.validateInput($html.find("input")).should.equal(true);
    });

    it('returns false for unchecked checkboxes', function() {
      $html = $("<form data-abide><input type='checkbox' required></form>").appendTo("body");
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
});
