$(function () {
  'use strict';

  QUnit.module('tooltip plugin')

  QUnit.test('should be defined on jquery object', function (assert) {
    assert.expect(1)
    assert.ok($(document.body).tooltip, 'tooltip method is defined')
  })

  QUnit.module('tooltip', {
    beforeEach: function () {
      // Run all tests in noConflict mode -- it's the only way to ensure that the plugin works in noConflict mode
      $.fn.bootstrapTooltip = $.fn.tooltip.noConflict()
    },
    afterEach: function () {
      $.fn.tooltip = $.fn.bootstrapTooltip
      delete $.fn.bootstrapTooltip
    }
  })

  QUnit.test('should provide no conflict', function (assert) {
    assert.expect(1)
    assert.strictEqual($.fn.tooltip, undefined, 'tooltip was set back to undefined (org value)')
  })

  QUnit.test('should return jquery collection containing the element', function (assert) {
    assert.expect(2)
    var $el = $('<div/>')
    var $tooltip = $el.bootstrapTooltip()
    assert.ok($tooltip instanceof $, 'returns jquery collection')
    assert.strictEqual($tooltip[0], $el[0], 'collection contains element')
  })

  QUnit.test('should expose default settings', function (assert) {
    assert.expect(1)
    assert.ok($.fn.bootstrapTooltip.Constructor.DEFAULTS, 'defaults is defined')
  })

  QUnit.test('should empty title attribute', function (assert) {
    assert.expect(1)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>').bootstrapTooltip()
    assert.strictEqual($trigger.attr('title'), '', 'title attribute was emptied')
  })

  QUnit.test('should add data attribute for referencing original title', function (assert) {
    assert.expect(1)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>').bootstrapTooltip()
    assert.strictEqual($trigger.attr('data-original-title'), 'Another tooltip', 'original title preserved in data attribute')
  })

  QUnit.test('should add aria-describedby to the trigger on show', function (assert) {
    assert.expect(3)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .bootstrapTooltip()
      .appendTo('#qunit-fixture')
      .bootstrapTooltip('show')

    var id = $('.tooltip').attr('id')

    assert.strictEqual($('#' + id).length, 1, 'has a unique id')
    assert.strictEqual($('.tooltip').attr('aria-describedby'), $trigger.attr('id'), 'tooltip id and aria-describedby on trigger match')
    assert.ok($trigger[0].hasAttribute('aria-describedby'), 'trigger has aria-describedby')
  })

  QUnit.test('should remove aria-describedby from trigger on hide', function (assert) {
    assert.expect(2)
    var $trigger = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .bootstrapTooltip()
      .appendTo('#qunit-fixture')

    $trigger.bootstrapTooltip('show')
    assert.ok($trigger[0].hasAttribute('aria-describedby'), 'trigger has aria-describedby')

    $trigger.bootstrapTooltip('hide')
    assert.ok(!$trigger[0].hasAttribute('aria-describedby'), 'trigger does not have aria-describedby')
  })

  QUnit.test('should assign a unique id tooltip element', function (assert) {
    assert.expect(2)
    $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip('show')

    var id = $('.tooltip').attr('id')

    assert.strictEqual($('#' + id).length, 1, 'tooltip has unique id')
    assert.strictEqual(id.indexOf('tooltip'), 0, 'tooltip id has prefix')
  })

  QUnit.test('should place tooltips relative to placement option', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ placement: 'bottom' })

    $tooltip.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.fade.bottom.in'), 'has correct classes applied')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed')
  })

  QUnit.test('should allow html entities', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="&lt;b&gt;@fat&lt;/b&gt;"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ html: true })

    $tooltip.bootstrapTooltip('show')
    assert.notEqual($('.tooltip b').length, 0, 'b tag was inserted')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed')
  })

  QUnit.test('should respect custom classes', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ template: '<div class="tooltip some-class"><div class="tooltip-arrow"/><div class="tooltip-inner"/></div>' })

    $tooltip.bootstrapTooltip('show')
    assert.ok($('.tooltip').hasClass('some-class'), 'custom class is present')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed')
  })

  QUnit.test('should fire show event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .on('show.bs.tooltip', function () {
        assert.ok(true, 'show event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should fire shown event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"></div>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        assert.ok(true, 'shown was called')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should not fire shown event when show was prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .on('show.bs.tooltip', function (e) {
        e.preventDefault()
        assert.ok(true, 'show event fired')
        done()
      })
      .on('shown.bs.tooltip', function () {
        assert.ok(false, 'shown event fired')
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should fire hide event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        $(this).bootstrapTooltip('hide')
      })
      .on('hide.bs.tooltip', function () {
        assert.ok(true, 'hide event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should fire hidden event', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        $(this).bootstrapTooltip('hide')
      })
      .on('hidden.bs.tooltip', function () {
        assert.ok(true, 'hidden event fired')
        done()
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should not fire hidden event when hide was prevented', function (assert) {
    assert.expect(1)
    var done = assert.async()

    $('<div title="tooltip title"/>')
      .appendTo('#qunit-fixture')
      .on('shown.bs.tooltip', function () {
        $(this).bootstrapTooltip('hide')
      })
      .on('hide.bs.tooltip', function (e) {
        e.preventDefault()
        assert.ok(true, 'hide event fired')
        done()
      })
      .on('hidden.bs.tooltip', function () {
        assert.ok(false, 'hidden event fired')
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should destroy tooltip', function (assert) {
    assert.expect(7)
    var $tooltip = $('<div/>')
      .bootstrapTooltip()
      .on('click.foo', function () {})

    assert.ok($tooltip.data('bs.tooltip'), 'tooltip has data')
    assert.ok($._data($tooltip[0], 'events').mouseover && $._data($tooltip[0], 'events').mouseout, 'tooltip has hover events')
    assert.strictEqual($._data($tooltip[0], 'events').click[0].namespace, 'foo', 'tooltip has extra click.foo event')

    $tooltip.bootstrapTooltip('show')
    $tooltip.bootstrapTooltip('destroy')

    assert.ok(!$tooltip.hasClass('in'), 'tooltip is hidden')
    assert.ok(!$._data($tooltip[0], 'bs.tooltip'), 'tooltip does not have data')
    assert.strictEqual($._data($tooltip[0], 'events').click[0].namespace, 'foo', 'tooltip still has click.foo')
    assert.ok(!$._data($tooltip[0], 'events').mouseover && !$._data($tooltip[0], 'events').mouseout, 'tooltip does not have hover events')
  })

  QUnit.test('should show tooltip with delegate selector on click', function (assert) {
    assert.expect(2)
    var $div = $('<div><a href="#" rel="tooltip" title="Another tooltip"/></div>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({
        selector: 'a[rel="tooltip"]',
        trigger: 'click'
      })

    $div.find('a').trigger('click')
    assert.ok($('.tooltip').is('.fade.in'), 'tooltip is faded in')

    $div.find('a').trigger('click')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip was removed from dom')
  })

  QUnit.test('should show tooltip when toggle is called', function (assert) {
    assert.expect(1)
    $('<a href="#" rel="tooltip" title="tooltip on toggle"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ trigger: 'manual' })
      .bootstrapTooltip('toggle')

    assert.ok($('.tooltip').is('.fade.in'), 'tooltip is faded in')
  })

  QUnit.test('should hide previously shown tooltip when toggle is called on tooltip', function (assert) {
    assert.expect(1)
    $('<a href="#" rel="tooltip" title="tooltip on toggle">@ResentedHook</a>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ trigger: 'manual' })
      .bootstrapTooltip('show')

    $('.tooltip').bootstrapTooltip('toggle')
    assert.ok($('.tooltip').not('.fade.in'), 'tooltip was faded out')
  })

  QUnit.test('should place tooltips inside body when container is body', function (assert) {
    assert.expect(3)
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ container: 'body' })
      .bootstrapTooltip('show')

    assert.notEqual($('body > .tooltip').length, 0, 'tooltip is direct descendant of body')
    assert.strictEqual($('#qunit-fixture > .tooltip').length, 0, 'tooltip is not in parent')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('body > .tooltip').length, 0, 'tooltip was removed from dom')
  })

  QUnit.test('should add position class before positioning so that position-specific styles are taken into account', function (assert) {
    assert.expect(1)
    var styles = '<style>'
        + '.tooltip.right { white-space: nowrap; }'
        + '.tooltip.right .tooltip-inner { max-width: none; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div/>').appendTo('#qunit-fixture')
    var $target = $('<a href="#" rel="tooltip" title="very very very very very very very very long tooltip in one line"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'right',
        viewport: null
      })
      .bootstrapTooltip('show')
    var $tooltip = $container.find('.tooltip')

    // this is some dumb hack shit because sub pixels in firefox
    var top = Math.round($target.offset().top + ($target[0].offsetHeight / 2) - ($tooltip[0].offsetHeight / 2))
    var top2 = Math.round($tooltip.offset().top)
    var topDiff = top - top2
    assert.ok(topDiff <= 1 && topDiff >= -1)
    $target.bootstrapTooltip('hide')

    $container.remove()
    $styles.remove()
  })

  QUnit.test('should use title attribute for tooltip text', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Simple tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip()

    $tooltip.bootstrapTooltip('show')
    assert.strictEqual($('.tooltip').children('.tooltip-inner').text(), 'Simple tooltip', 'title from title attribute is set')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
  })

  QUnit.test('should prefer title attribute over title option', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip" title="Simple tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({
        title: 'This is a tooltip with some content'
      })

    $tooltip.bootstrapTooltip('show')
    assert.strictEqual($('.tooltip').children('.tooltip-inner').text(), 'Simple tooltip', 'title is set from title attribute while preferred over title option')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
  })

  QUnit.test('should use title option', function (assert) {
    assert.expect(2)
    var $tooltip = $('<a href="#" rel="tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({
        title: 'This is a tooltip with some content'
      })

    $tooltip.bootstrapTooltip('show')
    assert.strictEqual($('.tooltip').children('.tooltip-inner').text(), 'This is a tooltip with some content', 'title from title option is set')

    $tooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
  })

  QUnit.test('should be placed dynamically with the dynamic placement option', function (assert) {
    assert.expect(6)
    var $style = $('<style> a[rel="tooltip"] { display: inline-block; position: absolute; } </style>')
    var $container = $('<div/>')
      .css({
        position: 'absolute',
        overflow: 'hidden',
        width: 600,
        height: 400,
        top: 0,
        left: 0
      })
      .appendTo(document.body)

    var $topTooltip = $('<div style="left: 0; top: 0;" rel="tooltip" title="Top tooltip">Top Dynamic Tooltip</div>')
      .appendTo($container)
      .bootstrapTooltip({ placement: 'auto' })

    $topTooltip.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.bottom'), 'top positioned tooltip is dynamically positioned to bottom')

    $topTooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'top positioned tooltip removed from dom')

    var $rightTooltip = $('<div style="right: 0;" rel="tooltip" title="Right tooltip">Right Dynamic Tooltip</div>')
      .appendTo($container)
      .bootstrapTooltip({ placement: 'right auto' })

    $rightTooltip.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.left'), 'right positioned tooltip is dynamically positioned left')

    $rightTooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'right positioned tooltip removed from dom')

    var $leftTooltip = $('<div style="left: 0;" rel="tooltip" title="Left tooltip">Left Dynamic Tooltip</div>')
      .appendTo($container)
      .bootstrapTooltip({ placement: 'auto left' })

    $leftTooltip.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.right'), 'left positioned tooltip is dynamically positioned right')

    $leftTooltip.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'left positioned tooltip removed from dom')

    $container.remove()
    $style.remove()
  })

  QUnit.test('should position tip on top if viewport has enough space and placement is "auto top"', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + 'body { padding-top: 100px; }'
        + '#section { height: 300px; border: 1px solid red; padding-top: 50px }'
        + 'div[rel="tooltip"] { width: 150px; border: 1px solid blue; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div id="section"/>').appendTo('#qunit-fixture')
    var $target = $('<div rel="tooltip" title="tip"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'auto top',
        viewport: '#section'
      })

    $target.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.top'), 'top positioned tooltip is dynamically positioned to top')

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should position tip on bottom if the tip\'s dimension exceeds the viewport area and placement is "auto top"', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + 'body { padding-top: 100px; }'
        + '#section { height: 300px; border: 1px solid red; }'
        + 'div[rel="tooltip"] { width: 150px; border: 1px solid blue; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div id="section"/>').appendTo('#qunit-fixture')
    var $target = $('<div rel="tooltip" title="tip"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'auto top',
        viewport: '#section'
      })

    $target.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.bottom'), 'top positioned tooltip is dynamically positioned to bottom')

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should display the tip on top whenever scrollable viewport has enough room if the given placement is "auto top"', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '#scrollable-div { height: 200px; overflow: auto; }'
        + '.tooltip-item { margin: 200px 0 400px; width: 150px; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div id="scrollable-div"/>').appendTo('#qunit-fixture')
    var $target = $('<div rel="tooltip" title="tip" class="tooltip-item">Tooltip Item</div>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'top auto',
        viewport: '#scrollable-div'
      })

    $('#scrollable-div').scrollTop(100)

    $target.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.fade.top.in'), 'has correct classes applied')

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should display the tip on bottom whenever scrollable viewport doesn\'t have enough room if the given placement is "auto top"', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '#scrollable-div { height: 200px; overflow: auto; }'
        + '.tooltip-item { padding: 200px 0 400px; width: 150px; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div id="scrollable-div"/>').appendTo('#qunit-fixture')
    var $target = $('<div rel="tooltip" title="tip" class="tooltip-item">Tooltip Item</div>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'top auto',
        viewport: '#scrollable-div'
      })

    $('#scrollable-div').scrollTop(200)

    $target.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.fade.bottom.in'), 'has correct classes applied')

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should display the tip on bottom whenever scrollable viewport has enough room if the given placement is "auto bottom"', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '#scrollable-div { height: 200px; overflow: auto; }'
        + '.spacer { height: 400px; }'
        + '.spacer:first-child { height: 200px; }'
        + '.tooltip-item { width: 150px; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div id="scrollable-div"/>').appendTo('#qunit-fixture')
    var $target = $('<div rel="tooltip" title="tip" class="tooltip-item">Tooltip Item</div>')
      .appendTo($container)
      .before('<div class="spacer"/>')
      .after('<div class="spacer"/>')
      .bootstrapTooltip({
        placement: 'bottom auto',
        viewport: '#scrollable-div'
      })

    $('#scrollable-div').scrollTop(200)

    $target.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.fade.bottom.in'), 'has correct classes applied')

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should display the tip on top whenever scrollable viewport doesn\'t have enough room if the given placement is "auto bottom"', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '#scrollable-div { height: 200px; overflow: auto; }'
        + '.tooltip-item { margin-top: 400px; width: 150px; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div id="scrollable-div"/>').appendTo('#qunit-fixture')
    var $target = $('<div rel="tooltip" title="tip" class="tooltip-item">Tooltip Item</div>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'bottom auto',
        viewport: '#scrollable-div'
      })

    $('#scrollable-div').scrollTop(400)

    $target.bootstrapTooltip('show')
    assert.ok($('.tooltip').is('.fade.top.in'), 'has correct classes applied')

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should adjust the tip\'s top position when up against the top of the viewport', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '.tooltip .tooltip-inner { width: 200px; height: 200px; max-width: none; }'
        + 'a[rel="tooltip"] { position: fixed; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div/>').appendTo('#qunit-fixture')
    var $target = $('<a href="#" rel="tooltip" title="tip" style="top: 0px; left: 0px;"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'right',
        viewport: {
          selector: 'body',
          padding: 12
        }
      })

    $target.bootstrapTooltip('show')
    assert.strictEqual(Math.round($container.find('.tooltip').offset().top), 12)

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $styles.remove()
  })

  QUnit.test('should adjust the tip\'s top position when up against the bottom of the viewport', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '.tooltip .tooltip-inner { width: 200px; height: 200px; max-width: none; }'
        + 'a[rel="tooltip"] { position: fixed; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div/>').appendTo('#qunit-fixture')
    var $target = $('<a href="#" rel="tooltip" title="tip" style="bottom: 0px; left: 0px;"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'right',
        viewport: {
          selector: 'body',
          padding: 12
        }
      })

    $target.bootstrapTooltip('show')
    var $tooltip = $container.find('.tooltip')
    assert.strictEqual(Math.round($tooltip.offset().top), Math.round($(window).height() - 12 - $tooltip[0].offsetHeight))

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $container.remove()
    $styles.remove()
  })

  QUnit.test('should adjust the tip\'s left position when up against the left of the viewport', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '.tooltip .tooltip-inner { width: 200px; height: 200px; max-width: none; }'
        + 'a[rel="tooltip"] { position: fixed; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div/>').appendTo('#qunit-fixture')
    var $target = $('<a href="#" rel="tooltip" title="tip" style="top: 0px; left: 0px;"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'bottom',
        viewport: {
          selector: 'body',
          padding: 12
        }
      })

    $target.bootstrapTooltip('show')
    assert.strictEqual(Math.round($container.find('.tooltip').offset().left), 12)

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $container.remove()
    $styles.remove()
  })

  QUnit.test('should adjust the tip\'s left position when up against the right of the viewport', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '.tooltip .tooltip-inner { width: 200px; height: 200px; max-width: none; }'
        + 'a[rel="tooltip"] { position: fixed; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div/>').appendTo('body')
    var $target = $('<a href="#" rel="tooltip" title="tip" style="top: 0px; right: 0px;"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'bottom',
        viewport: {
          selector: 'body',
          padding: 12
        }
      })

    $target.bootstrapTooltip('show')
    var $tooltip = $container.find('.tooltip')
    assert.strictEqual(Math.round($tooltip.offset().left), Math.round($(window).width() - 12 - $tooltip[0].offsetWidth))

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $container.remove()
    $styles.remove()
  })

  QUnit.test('should adjust the tip when up against the right of an arbitrary viewport', function (assert) {
    assert.expect(2)
    var styles = '<style>'
        + '.tooltip, .tooltip .tooltip-inner { width: 200px; height: 200px; max-width: none; }'
        + '.container-viewport { position: absolute; top: 50px; left: 60px; width: 300px; height: 300px; }'
        + 'a[rel="tooltip"] { position: fixed; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $container = $('<div class="container-viewport"/>').appendTo(document.body)
    var $target = $('<a href="#" rel="tooltip" title="tip" style="top: 50px; left: 350px;"/>')
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'bottom',
        viewport: '.container-viewport'
      })

    $target.bootstrapTooltip('show')
    var $tooltip = $container.find('.tooltip')
    assert.strictEqual(Math.round($tooltip.offset().left), Math.round(60 + $container.width() - $tooltip[0].offsetWidth))

    $target.bootstrapTooltip('hide')
    assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')

    $container.remove()
    $styles.remove()
  })

  QUnit.test('should not error when trying to show an auto-placed tooltip that has been removed from the dom', function (assert) {
    assert.expect(1)
    var passed = true
    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .one('show.bs.tooltip', function () {
        $(this).remove()
      })
      .bootstrapTooltip({ placement: 'auto' })

    try {
      $tooltip.bootstrapTooltip('show')
    } catch (err) {
      passed = false
      console.log(err)
    }

    assert.ok(passed, '.tooltip(\'show\') should not throw an error if element no longer is in dom')
  })

  QUnit.test('should place tooltip on top of element', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var containerHTML = '<div>'
        + '<p style="margin-top: 200px">'
        + '<a href="#" title="very very very very very very very long tooltip">Hover me</a>'
        + '</p>'
        + '</div>'

    var $container = $(containerHTML)
      .css({
        position: 'absolute',
        bottom: 0,
        left: 0,
        textAlign: 'right',
        width: 300,
        height: 300
      })
      .appendTo('#qunit-fixture')

    var $trigger = $container
      .find('a')
      .css('margin-top', 200)
      .bootstrapTooltip({
        placement: 'top',
        animate: false
      })
      .bootstrapTooltip('show')

    var $tooltip = $container.find('.tooltip')

    setTimeout(function () {
      assert.ok(Math.round($tooltip.offset().top + $tooltip.outerHeight()) <= Math.round($trigger.offset().top))
      done()
    }, 0)
  })

  QUnit.test('should place tooltip inside viewport', function (assert) {
    assert.expect(1)
    var done = assert.async()

    var $container = $('<div/>')
      .css({
        position: 'absolute',
        width: 200,
        height: 200,
        bottom: 0,
        left: 0
      })
      .appendTo('#qunit-fixture')

    $('<a href="#" title="Very very very very very very very very long tooltip">Hover me</a>')
      .css({
        position: 'absolute',
        top: 0,
        left: 0
      })
      .appendTo($container)
      .bootstrapTooltip({
        placement: 'top'
      })
      .bootstrapTooltip('show')

    setTimeout(function () {
      assert.ok($('.tooltip').offset().left >= 0)
      done()
    }, 0)
  })

  QUnit.test('should show tooltip if leave event hasn\'t occurred before delay expires', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: 150 })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '100ms: tooltip is not faded in')
    }, 100)

    setTimeout(function () {
      assert.ok($('.tooltip').is('.fade.in'), '200ms: tooltip is faded in')
      done()
    }, 200)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not show tooltip if leave event occurs before delay expires', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: 150 })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '100ms: tooltip not faded in')
      $tooltip.trigger('mouseout')
    }, 100)

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '200ms: tooltip not faded in')
      done()
    }, 200)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not hide tooltip if leave event occurs and enter event occurs within the hide delay', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: { show: 0, hide: 150 }})

    setTimeout(function () {
      assert.ok($('.tooltip').is('.fade.in'), '1ms: tooltip faded in')
      $tooltip.trigger('mouseout')

      setTimeout(function () {
        assert.ok($('.tooltip').is('.fade.in'), '100ms: tooltip still faded in')
        $tooltip.trigger('mouseenter')
      }, 100)

      setTimeout(function () {
        assert.ok($('.tooltip').is('.fade.in'), '200ms: tooltip still faded in')
        done()
      }, 200)
    }, 0)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not show tooltip if leave event occurs before delay expires', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: 150 })

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '100ms: tooltip not faded in')
      $tooltip.trigger('mouseout')
    }, 100)

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '200ms: tooltip not faded in')
      done()
    }, 200)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should not show tooltip if leave event occurs before delay expires, even if hide delay is 0', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: { show: 150, hide: 0 }})

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '100ms: tooltip not faded in')
      $tooltip.trigger('mouseout')
    }, 100)

    setTimeout(function () {
      assert.ok(!$('.tooltip').is('.fade.in'), '250ms: tooltip not faded in')
      done()
    }, 250)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should wait 200ms before hiding the tooltip', function (assert) {
    assert.expect(3)
    var done = assert.async()

    var $tooltip = $('<a href="#" rel="tooltip" title="Another tooltip"/>')
      .appendTo('#qunit-fixture')
      .bootstrapTooltip({ delay: { show: 0, hide: 150 }})

    setTimeout(function () {
      assert.ok($tooltip.data('bs.tooltip').$tip.is('.fade.in'), '1ms: tooltip faded in')

      $tooltip.trigger('mouseout')

      setTimeout(function () {
        assert.ok($tooltip.data('bs.tooltip').$tip.is('.fade.in'), '100ms: tooltip still faded in')
      }, 100)

      setTimeout(function () {
        assert.ok(!$tooltip.data('bs.tooltip').$tip.is('.in'), '200ms: tooltip removed')
        done()
      }, 200)

    }, 0)

    $tooltip.trigger('mouseenter')
  })

  QUnit.test('should correctly position tooltips on SVG elements', function (assert) {
    if (!window.SVGElement) {
      // Skip IE8 since it doesn't support SVG
      assert.expect(0)
      return
    }
    assert.expect(2)

    var done = assert.async()

    var styles = '<style>'
        + '.tooltip, .tooltip *, .tooltip *:before, .tooltip *:after { box-sizing: border-box; }'
        + '.tooltip { position: absolute; }'
        + '.tooltip .tooltip-inner { width: 24px; height: 24px; font-family: Helvetica; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    $('#qunit-fixture').append(
        '<div style="position: fixed; top: 0; left: 0;">'
      + '  <svg width="200" height="200">'
      + '    <circle cx="100" cy="100" r="10" title="m" id="theCircle" />'
      + '  </svg>'
      + '</div>')
    var $circle = $('#theCircle')

    $circle
      .on('shown.bs.tooltip', function () {
        var offset = $('.tooltip').offset()
        $styles.remove()
        assert.ok(Math.abs(offset.left - 88) <= 1, 'tooltip has correct horizontal location')
        $circle.bootstrapTooltip('hide')
        assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
        done()
      })
      .bootstrapTooltip({ container: 'body', placement: 'top', trigger: 'manual' })

    $circle.bootstrapTooltip('show')
  })

  QUnit.test('should correctly determine auto placement based on container rather than parent', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var styles = '<style>'
        + '.tooltip, .tooltip *, .tooltip *:before, .tooltip *:after { box-sizing: border-box; }'
        + '.tooltip { position: absolute; display: block; font-size: 12px; line-height: 1.4; }'
        + '.tooltip .tooltip-inner { max-width: 200px; padding: 3px 8px; font-family: Helvetica; text-align: center; }'
        + '#trigger-parent {'
        + '  position: fixed;'
        + '  top: 100px;'
        + '  right: 17px;'
        + '}'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    $('#qunit-fixture').append('<span id="trigger-parent"><a id="tt-trigger" title="If a_larger_text is written here, it won\'t fit using older broken version of BS">HOVER OVER ME</a></span>')
    var $trigger = $('#tt-trigger')

    $trigger
      .on('shown.bs.tooltip', function () {
        var $tip = $('.tooltip-inner')
        var tipXrightEdge = $tip.offset().left + $tip.width()
        var triggerXleftEdge = $trigger.offset().left
        assert.ok(tipXrightEdge < triggerXleftEdge, 'tooltip with auto left placement, when near the right edge of the viewport, gets left placement')
        $trigger.bootstrapTooltip('hide')
      })
      .on('hidden.bs.tooltip', function () {
        $styles.remove()
        $(this).remove()
        assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
        done()
      })
      .bootstrapTooltip({
        container: 'body',
        placement: 'auto left',
        trigger: 'manual'
      })

    $trigger.bootstrapTooltip('show')
  })

  QUnit.test('should not reload the tooltip on subsequent mouseenter events', function (assert) {
    assert.expect(1)
    var titleHtml = function () {
      var uid = $.fn.bootstrapTooltip.Constructor.prototype.getUID('tooltip')
      return '<p id="tt-content">' + uid + '</p><p>' + uid + '</p><p>' + uid + '</p>'
    }

    var $tooltip = $('<span id="tt-outer" rel="tooltip" data-trigger="hover" data-placement="top">some text</span>')
      .appendTo('#qunit-fixture')

    $tooltip.bootstrapTooltip({
      html: true,
      animation: false,
      trigger: 'hover',
      delay: { show: 0, hide: 500 },
      container: $tooltip,
      title: titleHtml
    })

    $('#tt-outer').trigger('mouseenter')

    var currentUid = $('#tt-content').text()

    $('#tt-content').trigger('mouseenter')
    assert.strictEqual(currentUid, $('#tt-content').text())
  })

  QUnit.test('should not reload the tooltip if the mouse leaves and re-enters before hiding', function (assert) {
    assert.expect(4)
    var titleHtml = function () {
      var uid = $.fn.bootstrapTooltip.Constructor.prototype.getUID('tooltip')
      return '<p id="tt-content">' + uid + '</p><p>' + uid + '</p><p>' + uid + '</p>'
    }

    var $tooltip = $('<span id="tt-outer" rel="tooltip" data-trigger="hover" data-placement="top">some text</span>')
      .appendTo('#qunit-fixture')

    $tooltip.bootstrapTooltip({
      html: true,
      animation: false,
      trigger: 'hover',
      delay: { show: 0, hide: 500 },
      container: $tooltip,
      title: titleHtml
    })

    var obj = $tooltip.data('bs.tooltip')

    $('#tt-outer').trigger('mouseenter')

    var currentUid = $('#tt-content').text()

    $('#tt-outer').trigger('mouseleave')
    assert.strictEqual(currentUid, $('#tt-content').text())

    assert.ok(obj.hoverState == 'out', 'the tooltip hoverState should be set to "out"')

    $('#tt-content').trigger('mouseenter')
    assert.ok(obj.hoverState == 'in', 'the tooltip hoverState should be set to "in"')

    assert.strictEqual(currentUid, $('#tt-content').text())
  })

  QUnit.test('should position arrow correctly when tooltip is moved to not appear offscreen', function (assert) {
    assert.expect(2)
    var done = assert.async()

    var styles = '<style>'
        + '.tooltip, .tooltip *, .tooltip *:before, .tooltip *:after { box-sizing: border-box; }'
        + '.tooltip { position: absolute; }'
        + '.tooltip-arrow { position: absolute; width: 0; height: 0; }'
        + '.tooltip .tooltip-inner { max-width: 200px; padding: 3px 8px; }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    $('<a href="#" title="tooltip title" style="position: absolute; bottom: 0; right: 0;">Foobar</a>')
      .appendTo('body')
      .on('shown.bs.tooltip', function () {
        var arrowStyles = $(this).data('bs.tooltip').$tip.find('.tooltip-arrow').attr('style')
        assert.ok(/left/i.test(arrowStyles) && !/top/i.test(arrowStyles), 'arrow positioned correctly')
        $(this).bootstrapTooltip('hide')
      })
      .on('hidden.bs.tooltip', function () {
        $styles.remove()
        $(this).remove()
        assert.strictEqual($('.tooltip').length, 0, 'tooltip removed from dom')
        done()
      })
      .bootstrapTooltip({
        container: 'body',
        placement: 'top',
        trigger: 'manual'
      })
      .bootstrapTooltip('show')
  })

  QUnit.test('should correctly position tooltips on transformed elements', function (assert) {
    var styleProps = document.documentElement.style
    if (!('transform' in styleProps) && !('webkitTransform' in styleProps) && !('msTransform' in styleProps)) {
      assert.expect(0)
      return
    }
    assert.expect(2)

    var done = assert.async()

    var styles = '<style>'
        + '#qunit-fixture { top: 0; left: 0; }'
        + '.tooltip, .tooltip *, .tooltip *:before, .tooltip *:after { box-sizing: border-box; }'
        + '.tooltip { position: absolute; }'
        + '.tooltip .tooltip-inner { width: 24px; height: 24px; font-family: Helvetica; }'
        + '#target { position: absolute; top: 100px; left: 50px; width: 100px; height: 200px; -webkit-transform: rotate(270deg); -ms-transform: rotate(270deg); transform: rotate(270deg); }'
        + '</style>'
    var $styles = $(styles).appendTo('head')

    var $element = $('<div id="target" title="1"/>').appendTo('#qunit-fixture')

    $element
      .on('shown.bs.tooltip', function () {
        var offset = $('.tooltip').offset()
        $styles.remove()
        assert.ok(Math.abs(offset.left - 88) <= 1, 'tooltip has correct horizontal location')
        assert.ok(Math.abs(offset.top - 126) <= 1, 'tooltip has correct vertical location')
        $element.bootstrapTooltip('hide')
        done()
      })
      .bootstrapTooltip({
        container: 'body',
        placement: 'top',
        trigger: 'manual'
      })

    $element.bootstrapTooltip('show')
  })

  QUnit.test('should throw an error when initializing tooltip on the document object without specifying a delegation selector', function (assert) {
    assert.expect(1)
    assert.throws(function () {
      $(document).bootstrapTooltip({ title: 'What am I on?' })
    }, new Error('`selector` option must be specified when initializing tooltip on the window.document object!'))
  })

  QUnit.test('should do nothing when an attempt is made to hide an uninitialized tooltip', function (assert) {
    assert.expect(1)

    var $tooltip = $('<span data-toggle="tooltip" title="some tip">some text</span>')
      .appendTo('#qunit-fixture')
      .on('hidden.bs.tooltip shown.bs.tooltip', function () {
        assert.ok(false, 'should not fire any tooltip events')
      })
      .bootstrapTooltip('hide')
    assert.strictEqual($tooltip.data('bs.tooltip'), undefined, 'should not initialize the tooltip')
  })

})
