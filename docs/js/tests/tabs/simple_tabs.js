module('core', {
  setup: function () {
    this.$tabs = $('#tabs1');
    $(document).foundation('tabs');
  },
  teardown: function () {

  }
});
test('setup is correct', function () {
  ok(this.$tabs.length == 1, 'one one set of tabs should be present');
  strictEqual(this.$tabs.find('a:last').hasClass('active'), false, 'last tab should not be active');
});
test('click tab activates content pane', function () {
  var $activeTab = this.$tabs.find('.active a'),
      $activeTabContent = $($activeTab.attr('href') + 'Tab'),
      $lastTab = this.$tabs.find('a:last'),
      $lastTabContent = $($lastTab.attr('href') + 'Tab');

  strictEqual($activeTabContent.hasClass('active'), true, 'active tab content should be active');

  $lastTab.trigger('click');

  strictEqual($activeTabContent.hasClass('active'), false, 'previous tab content should no longer be active');
  strictEqual($lastTabContent.hasClass('active'), true, 'newly clicked tab should be active');
});

module('initialize with wrong scope', {
  setup: function () {
    this.$tabs = $('#tabs1');
    $('#tabs2').foundation('tabs');
  },
  teardown: function () {

  }
});
test('setup is correct', function () {
  ok(this.$tabs.length == 1, 'one one set of tabs should be present');
  strictEqual(this.$tabs.find('a:last').hasClass('active'), false, 'last tab should not be active');
});
test('click tab activates content pane', function () {
  var $activeTab = this.$tabs.find('.active a'),
      $activeTabContent = $($activeTab.attr('href') + 'Tab'),
      $lastTab = this.$tabs.find('a:last'),
      $lastTabContent = $($lastTab.attr('href') + 'Tab');

  strictEqual($activeTabContent.hasClass('active'), true, 'active tab content should be active');

  // triggering an event on an uninitialized tabs should have no effect
  $lastTab.trigger('click');

  strictEqual($activeTabContent.hasClass('active'), true, 'previous tab should still be active');
  strictEqual($lastTabContent.hasClass('active'), false, 'newly clicked tab should be NOT active');
});