var sink = require('../node_modules/sink-test/')
  , start = sink.start
  , sink = sink.sink
  , sqwish = require('../src')

sink('basic mode', function (test, ok) {

  test('whitespace', 1, function () {
    var input = '  \n  body  {  color  :  red ; background  :  blue  ; \r\n  }  '
      , expected = 'body{color:red;background:blue}'
      , actual = sqwish.minify(input)
    ok(actual == expected, 'all appropriate whitespace was removed')
  })

  test('long hex to short hex', 1, function () {
    var input = 'p { color: #ffcc33; }'
      , expected = 'p{color:#fc3}'
      , actual = sqwish.minify(input)
    ok(actual == expected, 'collapsed #ffcc33 to #fc3')
  })

  test('IE long hex is kept as long hex', 1, function () {
    var input = "body { filter: progid:DXImageTransform.Microsoft.gradient(gradientType=0, startColorstr='#FFF2F2F2', endColorstr='#FFFFFFFF'); }"
      , expected = "body{filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr='#FFF2F2F2',endColorstr='#FFFFFFFF')}"
      , actual = sqwish.minify(input)
    ok(actual == expected, 'IE long hexes are kept that way')
  })

  test('longhand values to shorthand values', 1, function () {
    var input = 'p { margin: 0px 1px 0px 1px }'
      , expected = 'p{margin:0 1px}'
      , actual = sqwish.minify(input)
    ok(actual == expected, 'collapsed 0px 1px 0px 1px to 0 1px')
  })

  test('certain longhand values are maintained', 1, function () {
    var input = 'p { margin: 11px 1px 1px 1px }'
      , expected = 'p{margin:11px 1px 1px 1px}'
      , actual = sqwish.minify(input)
    ok(actual == expected, 'maintained 11px 1px 1px 1px')
  })

  test('certain double-specified longhand values are maintained', 1, function () {
    var input = 'p { margin: 12px 12px 2px 12px }'
      , expected = 'p{margin:12px 12px 2px 12px}'
      , actual = sqwish.minify(input)
    ok(actual == expected, 'maintained 12px 12px 2px 12px')
  })

  test('does not break with @media queries', 2, function () {
    var input = '@media screen and (max-device-width: 480px) {' +
                '  .column {' +
                '    float: none;' +
                '  }' +
                '}'
      , expected = '@media screen and (max-device-width:480px){.column{float:none}}'
      , strictOutput = sqwish.minify(input, true)
      , regularOutput = sqwish.minify(input)
    console.log(strictOutput)
    console.log(regularOutput)
    ok(regularOutput == expected, 'media queries do not blow up')
    ok(strictOutput == expected, 'media queries do not blow up in strict mode')

  })

})

sink('strict mode', function (test, ok) {
  test('combined rules', 1, function () {
    var input = 'div { color: red; } div { background: orange; }'
      , expected = 'div{background:orange;color:red}'
      , actual = sqwish.minify(input, true)
    ok(actual == expected, 'collapsed div into a single rule')
  })

  test('combine duplicate properties', 1, function () {
    var input = 'div { color: red; } div { color: #ffcc88; }'
      , expected = 'div{color:#fc8}'
      , actual = sqwish.minify(input, true)
    ok(actual == expected, 'collapsed duplicate into a single declaration')
  })

})

start()
