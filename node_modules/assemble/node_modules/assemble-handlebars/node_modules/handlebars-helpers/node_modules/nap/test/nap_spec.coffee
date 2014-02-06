require './helpers/spec_helper.coffee'
nap = require '../lib/nap'
fs = require 'fs'
path = require 'path'
wrench = require 'wrench'
exec = require('child_process').exec

# Read a package despite it's fingerprint
readPkg = (pkg) ->
  name = pkg.split('.')[0]
  ext = pkg.split('.').slice(1).join('.')
  dir = process.cwd() + '/public/assets/'
  file = _(fs.readdirSync(dir)).select((file) -> file.match /// #{name}.*#{ext} ///)[0]
  fs.readFileSync(dir + file).toString()

describe 'options.publicDir', ->

  it "will default to '/public'", ->
    nap(assets: {}).publicDir.should.match /\/public$/

  it "will throw an error if the directory doesn't exist", ->
    try
      nap(assets: {}, publicDir: '/foo/bar')
      throw new Error()
    catch e
      e.message.should.equal "The directory /foo/bar doesn't exist"

  it 'will create an assets directory in publicDir if it doesnt exit', ->
    nap(assets: {}, publicDir: 'test/fixtures/')
    dir = path.join(process.cwd(), '/test/fixtures/assets')
    exists = fs.existsSync dir
    exists.should.be.ok

describe 'mode', ->

  it "will use production if process.env.NODE_ENV is production or staging", ->
    process.env.NODE_ENV = 'staging'
    nap(assets: {}).mode.should.equal 'production'
    process.env.NODE_ENV = 'production'
    nap(assets: {}).mode.should.equal 'production'
    process.env.NODE_ENV = null

  it "will use development if process.env.NODE_ENV isnt production or staging", ->
    process.env.NODE_ENV = 'development'
    nap(assets: {}).mode.should.equal 'development'
    process.env.NODE_ENV = null
    nap(assets: {}).mode.should.equal 'development'
    process.env.NODE_ENV = null

  it "can be explicitly specified", ->
    nap(assets: {}, mode: 'foobar').mode.should.equal 'foobar'

it "will strip a leading slash of cdnUrl", ->
  nap(assets: {}, cdnUrl: 'http://foo.bar/').cdnUrl.should.equal 'http://foo.bar'

it "will throw an error if no assets are specified", ->
  try
    nap()
    throw new Error()
  catch e
    e.message.should
      .equal "You must specify an 'assets' obj with keys 'js', 'css', or 'jst'"

describe 'appDir', ->

  it 'can configure where the app is relative to nap', ->
    nap
      appDir: process.cwd() + '/test/fixtures/app_dir'
      assets:
        js:
          foo: ['/src/*.coffee']
    nap.js('foo').should
      .include "<script src='/assets/src/foo.js' type='text/javascript'></script>"

describe '#js', ->

  it 'takes wildcards', ->
    nap
      assets:
        js:
          foo: ['/test/fixtures/1/*.coffee']
    nap.js('foo').should
      .equal "<script src='/assets/test/fixtures/1/bar.js' type='text/javascript'></script>"

  it 'throw an error if the package doesnt exist', ->
    nap
      assets:
        js:
          foo: ['/test/fixtures/1/bar.coffee']
    try
      nap.js('bar')
      throw new Error()
    catch e
      e.message.should.equal "Cannot find package 'bar'"

  it "can handle a lack of leading slash", ->
    nap
      assets:
        js:
          bar: ['test/fixtures/1/bar.coffee']
    nap.js('bar').should
      .equal "<script src='/assets/test/fixtures/1/bar.js' type='text/javascript'></script>"

  it "can handle filenames with periods", ->
    nap
      assets:
        js:
          bar: ['/test/fixtures/1/foo.bar.js']
    nap.js('bar').should.equal "<script src='/assets/test/fixtures/1/foo.bar.js' type='text/javascript'></script>"

  describe 'in development mode', ->

    it 'compiles any coffeescript files into js', ->
      nap
        assets:
          js:
            bar: ['/test/fixtures/1/bar.coffee']
      nap.js('bar').should
        .equal "<script src='/assets/test/fixtures/1/bar.js' type='text/javascript'></script>"
      fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/bar.js')
        .toString().should.match /var/

    it 'returns multiple script tags put together', ->
      nap
        assets:
          js:
            baz: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
      nap.js('baz').should.equal(
        "<script src='/assets/test/fixtures/1/bar.js' type='text/javascript'></script>" +
        "<script src='/assets/test/fixtures/1/foo.js' type='text/javascript'></script>"
      )

    it "retains directory structure", ->
      nap
        assets:
          js:
            bar: ['test/fixtures/1/sub/baz.coffee']
      nap.js('bar').should
        .equal "<script src='/assets/test/fixtures/1/sub/baz.js' type='text/javascript'></script>"

    it 'will put the filename in the stack trace', ->
      nap
        assets:
          js:
            bar: ['test/fixtures/bad/bad_coffee.coffee']
      try
        nap.js('bar')
      catch e
        e.stack.should.include 'Nap error compiling test/fixtures/bad/bad_coffee.coffee'

    it 'compiles files when called twice in a row', ->
      nap
        assets:
          js:
            bar: ['/test/fixtures/1/bar.coffee']
      nap.js('bar')
      nap.js('bar').should
        .equal "<script src='/assets/test/fixtures/1/bar.js' type='text/javascript'></script>"
      fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/bar.js')
        .toString().should.match /var/

    it 'only compiles files that have been changed since they were last touched'

  describe 'in production mode', ->

    it 'keeps files in the assets dir', ->
      fs.writeFileSync "#{process.cwd()}/public/assets/foobar.txt", 'foobar'
      nap
        mode: 'production'
        assets:
          js:
            baz: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
      fs.readFileSync("#{process.cwd()}/public/assets/foobar.txt", 'utf8').should.equal 'foobar'

    it 'returns a script tag pointing to the packaged file', ->
      nap
        mode: 'production'
        assets:
          js:
            baz: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
      nap.js('baz').should.include "<script src='/assets/baz"

    it 'returns a script tag pointing to the CDN packaged file', ->
      nap
        mode: 'production'
        cdnUrl: 'http://cdn.com/'
        assets:
          js:
            baz: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
      nap.js('baz').should.include "<script src='http://cdn.com/baz"

    it 'points to the
    ified', ->
      nap
        mode: 'production'
        gzip: true
        assets:
          js:
            baz: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
      nap.js('baz').should.include "<script src='/assets/baz"

    it 'doesnt have to point to the gzipped file', ->
      nap
        mode: 'production'
        gzip: true
        assets:
          js:
            baz: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
      nap.js('baz', false).should.include "<script src='/assets/baz"

    it 'gzips assets that have a fingerprint'

describe '#css', ->

  it 'takes wildcards', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/*.css']
    nap.css('foo').should
      .equal "<link href=\'/assets/test/fixtures/1/bar.css\' rel=\'stylesheet\' type=\'text/css\'>"

  it "can handle a lack of leading slash", ->
    nap
      assets:
        css:
          foo: ['test/fixtures/1/bar.css']
    nap.css('foo').should
      .equal "<link href=\'/assets/test/fixtures/1/bar.css\' rel=\'stylesheet\' type=\'text/css\'>"

  it 'only embeds files with a _embed extension namespace', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/imgs.styl']
    nap.css 'foo'
    fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/imgs.css')
      .toString().should.not.match /data:image/

  it 'doesnt try to embed files that arent embeddable', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/img_garbage.styl']
    nap.css 'foo'
    file = fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/img_garbage.css')
    file.toString().should.not.include 'data:'

  it 'uses nib', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/nib.styl']
    nap.css 'foo'
    fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/nib.css')
      .toString().should.include '-webkit-border-radius: 2px'

  it 'works with imports and relative stuff', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/relative.styl']
    nap.css 'foo'
    fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/relative.css')
      .toString().should.equal ".foo {\n  background: #f00;\n}\n"

  it 'throws an error if the package doesnt exists', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/bar.css']
    try
      nap.css('bar')
      throw new Error()
    catch e
      e.message.should.equal "Cannot find package 'bar'"

  it 'throws an error if packaging fails', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/invalid.styl']
    try
      nap.css('foo')
      throw new Error()
    catch e
      e.message.should.match /invalid\.styl/

  describe 'in development mode', ->

    it 'returns multiple link tags put together', ->
      nap
        assets:
          css:
            baz: ['/test/fixtures/1/bar.css', '/test/fixtures/1/foo.styl']
      nap.css('baz').should.equal(
        "<link href=\'/assets/test/fixtures/1/bar.css\' rel=\'stylesheet\' type=\'text/css\'>" +
        "<link href=\'/assets/test/fixtures/1/foo.css\' rel=\'stylesheet\' type=\'text/css\'>"
      )

    it 'compiles any stylus files into css', ->
      nap
        assets:
          css:
            foo: ['/test/fixtures/1/foo.styl']
      nap.css('foo').should
        .equal "<link href=\'/assets/test/fixtures/1/foo.css\' rel=\'stylesheet\' type=\'text/css\'>"
      fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/foo.css')
        .toString().should.match /\{/

    it 'compiles any less files into css', ->
      nap
        assets:
          css:
            foo: ['/test/fixtures/1/foo.less']
      nap.css('foo').should
        .equal "<link href=\'/assets/test/fixtures/1/foo.css\' rel=\'stylesheet\' type=\'text/css\'>"
      fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/foo.css')
        .toString().should.include '#header {\n  color: #4d926f;'

  describe "in production", ->

    it 'returns a link tag pointing to the packaged file', ->
      nap
        mode: 'production'
        assets:
          css:
            baz: ['/test/fixtures/1/bar.css']
      nap.package()
      nap.css('baz').should.include "<link href=\'/assets/baz"

    it 'returns a link tag pointing to the CDN packaged file', ->
      nap
        mode: 'production'
        cdnUrl: 'http://cdn.com'
        assets:
          css:
            baz: ['/test/fixtures/1/bar.css']
      nap.css('baz').should.include "<link href=\'http://cdn.com/baz"

    it 'points to the gzipped file if specified', ->
      nap
        mode: 'production'
        gzip: true
        assets:
          css:
            baz: ['/test/fixtures/1/bar.css']
      nap.css('baz').should.include "<link href=\'/assets/baz"

describe '#jst', ->

  it 'takes wildcards', ->
    nap
      assets:
        jst:
          foo: ['/test/fixtures/1/*.jade']
    nap.jst('foo').should.include "<script src='/assets/foo.jst.js' type='text/javascript'></script>"

  it "can handle a lack of leading slash", ->
    nap
       assets:
         jst:
           foo: ['test/fixtures/1/*.jade']
    nap.jst('foo').should.include "<script src='/assets/foo.jst.js' type='text/javascript'></script>"

  it 'throws an error if the package doesnt exists', ->
    nap
      assets:
        jst:
          foo: ['/test/fixtures/1/foo.jade']
    try
      nap.jst('bar')
      throw new Error()
    catch e
      e.message.should.equal "Cannot find package 'bar'"

  it 'returns a `pkg`.jst.js script tag pointing to the output templates', ->
    nap
      assets:
        jst:
          foo: ['/test/fixtures/1/foo.jade']
    nap.jst('foo').should.include "<script src='/assets/foo.jst.js' type='text/javascript'></script>"

  describe 'in development', ->

    describe 'using JSTs', ->

      it 'creates a seperate prefix file with the namespace', ->
        nap
          assets:
            jst:
              foo: ['/test/fixtures/1/foo.jade']
        nap.jst('foo')
        fs.readFileSync(process.cwd() + '/public/assets/nap-templates-prefix.js').toString()
          .should.include "window.JST"

    it 'puts the JST functions into namespaces starting from the templates directory', ->
      nap
        assets:
          jst:
            foo: ['/test/fixtures/templates/index/foo.jade']
      nap.jst('foo')
      fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
        .indexOf("JST['index/foo']").should.not.equal -1

    it 'works twice in a row', ->
      nap
        assets:
          jst:
            foo: ['/test/fixtures/templates/index/foo.jade']
      nap.jst('foo')
      nap.jst('foo')
      fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
        .should.include "JST['index/foo']"

    it 'works when the file has changed', (done) ->
      dir = '/test/fixtures/templates/index/foo.jade'
      nap
        assets:
          jst:
            foo: [dir]
      fs.writeFileSync (process.cwd() + dir), 'h2 Hello #{world}'
      nap.jst('foo')
      fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString().should.include "h2"
      setTimeout (->
        fs.writeFileSync (process.cwd() + dir), 'h1 Hello #{world}'
        nap.jst('foo')
        fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString().should.include "h1"
        done()
      ), 1000

    describe 'using jade', ->

      it 'adds the jade runtime by default', ->
        nap
          assets:
            jst:
              foo: ['/test/fixtures/1/foo.jade']
        nap.jst('foo')
        readPkg('nap-templates-prefix.js').toString()
          .should.include "var jade"

      it 'adds the hogan prefix', ->
        nap
          assets:
            jst:
              foo: ['/test/fixtures/1/foo.mustache']
        nap.jst('foo')
        fs.readFileSync(process.cwd() + '/public/assets/nap-templates-prefix.js').toString()
          .should.include "var Hogan = {};"

      it 'compiles jade templates into JST functions', ->
        nap
          assets:
            jst:
              foo: ['/test/fixtures/1/foo.jade']
        nap.jst('foo')
        fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
          .should.include "<h2>"

    describe 'using hogan', ->

      it 'compiles mustache templates into JST functions', ->
        nap
          assets:
            jst:
              foo: ['/test/fixtures/1/foo.mustache']
        nap.jst('foo')
        fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
          .should.include "<h1>Hello"

    describe 'using combined mustache and jade templates', ->

      it 'compiles .mustache.jade templates into JST functions', ->
        nap
          assets:
            jst:
              foo: ['/test/fixtures/1/foo.mustache.jade']
        nap.jst('foo')
        template = fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
        template.should.include "<h1>Hello"
        template.should.not.include "{{world}}"

  describe 'in production', ->

    it 'returns a `pkg`.jst.js script tag pointing to the output templates', ->
      nap
        mode: 'production'
        assets:
          jst:
            foo: ['/test/fixtures/1/foo.jade']
      nap.jst('foo').should.include "<script src='/assets/foo"

    it 'points to the cdn if specified', ->
      nap
        cdnUrl: 'http://cdn.com'
        mode: 'production'
        assets:
          jst:
            foo: ['/test/fixtures/1/foo.jade']
      nap.jst('foo').should.include "<script src='http://cdn.com/foo"

    it 'points to the gzipped file if specified', ->
      nap
        mode: 'production'
        gzip: true
        assets:
          jst:
            foo: ['/test/fixtures/1/foo.jade']
      nap.jst('foo').should.include "<script src='/assets/foo"

  it 'getNamespace', ->
    nap
      getNamespace: (filename) ->
        "custom-#{filename.split('templates')[-1..][0].replace /^\/|\..*/g, ''}"
      assets:
        jst:
          foo: ['/test/fixtures/templates/index/foo.mustache']
    nap.jst('foo')
    fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
      .should.include "JST['custom-index/foo']"


describe '#package', ->

  it 'doesnt minify in anything but production', ->
    nap
      mode: 'test'
      assets:
        js:
          all: ['/test/fixtures/1/bar.coffee']
    nap.package()
    readPkg('all.js').toString().should.include 'var foo'

  it 'doesnt minfiy if passed the option', ->
    nap
      mode: 'production'
      minify: false
      assets:
        js:
          all: ['/test/fixtures/1/bar.coffee']
    nap.package()
    fs.readFileSync(
      process.cwd() + '/public/assets/' + fs.readdirSync(process.cwd() + '/public/assets/')[0]
    ).toString().should.include 'var foo'

  it 'adds a newline between concatenated files', ->
    nap
      mode: 'test'
      assets:
        js:
          all: ['/test/fixtures/concat_js/myfunc.js','/test/fixtures/concat_js/myvar.js']
    nap.package()
    readPkg('all.js').toString().should.include '\nvar'

  it 'adds a newline between concatenated files and still works when minified', ->
    nap
      mode: 'test'
      minify: true
      assets:
        js:
          all: ['/test/fixtures/concat_js/myfunc.js','/test/fixtures/concat_js/myvar.js']
    nap.package()
    readPkg('all.js').toString().should.include '\nvar'

  describe 'when in development mode', ->

    it 'adds the jade runtime', ->
      nap
        mode: 'development'
        assets:
          jst:
            templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']
      nap.package()
      readPkg('templates.jst.js').toString().should.include "var jade ="

    it 'adds the jade runtime once', ->
      nap
        mode: 'development'
        assets:
          jst:
            templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']
      nap.package()
      readPkg('templates.jst.js').toString().match(/var jade =/g).length.should.equal 1

    it 'fingerprints packages', ->
      nap
        mode: 'development'
        assets:
          jst:
            templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']
      nap.package()
      fs.readdirSync(process.cwd() + '/public/assets')[0]
        .should.include 'templates-81e3c2f5027b4cf4c4e7a48e79c4c430'

  describe 'when in production mode', ->

    it 'adds the jade runtime once', ->
      nap
        mode: 'production'
        assets:
          jst:
            templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']
      nap.package()
      readPkg('templates.jst.js').toString().match(/var jade=function/g).length.should.equal 1

    it 'includes the JST namespace', ->
      nap
        mode: 'production'
        assets:
          jst:
            templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']
      nap.package()
      readPkg('templates.jst.js').should.include 'JST='

    it 'minifies js', ->
      nap
        mode: 'production'
        assets:
          js:
            all: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']

      nap.package()
      readPkg('all.js').should.include "var o;o=\"foo\"}"

    it 'minifies jsts', ->
      nap
        mode: 'production'
        assets:
          jst:
            templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']

      nap.package()
      readPkg('templates.jst.js').indexOf("\n").should.equal -1

    it 'minifies css', ->
      nap
        mode: 'production'
        assets:
          css:
            default: ['/test/fixtures/1/bar.css', '/test/fixtures/1/foo.styl']

      nap.package()
      readPkg('default.css').should.not.include "\n"

  it 'embeds any image files', ->
    nap
      mode: 'production'
      assets:
        css:
          default: ['/test/fixtures/1/bar.css', '/test/fixtures/1/imgs_embed.styl']
    nap.package()
    readPkg('default.css').should.match /data:image/

  it 'can embed fonts', ->
    nap
      mode: 'production'
      assets:
        css:
          foo: ['/test/fixtures/1/fonts_embed.styl']
    nap.package()
    readPkg('foo.css').should.include 'data:font/truetype'

  it 'embeds image files in sub directories', ->
    nap
      mode: 'production'
      assets:
        css:
          foo: ['/test/fixtures/1/img_deep_embed.styl']
    nap.package()
    readPkg('foo.css').should.match /data:image/

  it 'can embed fonts using the fancy degrading mixin', ->
    nap
      mode: 'production'
      assets:
        css:
          foo: ['/test/fixtures/1/font_mixins_embed.styl']
    nap.package()
    readPkg('foo.css').should.include 'data:font/truetype'

  it 'concatenates the assets and ouputs all of the packages', ->
    nap
      mode: 'production'
      assets:
        js:
          all: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
        css:
          default: ['/test/fixtures/1/bar.css', '/test/fixtures/1/foo.styl']
        jst:
          templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']

    nap.package()

    jsOut = readPkg 'all.js'
    jsOut.should.include "var foo=\"foo\""
    jsOut.should.include "var o;o=\"foo\""

    cssOut = readPkg 'default.css'
    cssOut.should.include 'red'
    cssOut.should.include "#f00"

    jstOut = readPkg 'templates.jst.js'
    jstOut.should.include "<h2>"
    jstOut.should.include "<h1>"

  it 'will create gzip versions of assets if specified', (done) ->
    nap
      gzip: true
      assets:
        css:
          default: ['/test/fixtures/1/bar.css', '/test/fixtures/1/imgs_embed.styl']
    nap.package ->
      fs.existsSync '/public/assets/default.css.cgz'
      done()

  it 'adds the jade runtime', ->
    nap
      mode: 'production'
      assets:
        jst:
          templates: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']

    nap.package()
    readPkg('templates.jst.js').toString().should.include "var jade="

  it 'adds the hogan prefix', ->
    nap
      mode: 'production'
      assets:
        jst:
          templates: ['/test/fixtures/1/foo.mustache']

    nap.package()
    readPkg('templates.jst.js').toString().should.include "var Hogan={};"

  it 'is able to generate a package and reference it with a fingerprint when specified', ->
    nap
      mode: 'production'
      fingerprint: true
      assets:
        js:
          foo: ['/test/fixtures/1/bar.coffee', '/test/fixtures/1/foo.js']
        jst:
          bar: ['/test/fixtures/1/foo.jade', '/test/fixtures/templates/index/foo.jade']
        css:
          baz: ['/test/fixtures/1/foo.styl', '/test/fixtures/1/bar.css']
    nap.package()
    fs.readFileSync(process.cwd() + '/public/' + nap.js('foo').match(/assets\/.*.js/)[0])
      .toString().should.include ";var foo="
    fs.readFileSync(process.cwd() + '/public/' + nap.jst('bar').match(/assets\/.*.js/)[0])
      .toString().should.include "var jade="
    fs.readFileSync(process.cwd() + '/public/' + nap.css('baz').match(/assets\/.*\.css/)[0])
      .toString().should.include ".foo{background:#f00}.foo{background:red}"

describe 'preprocessors', ->

  it 'you can add your own preprocessors', ->
    nap
      assets:
        css:
          tables: ['/test/fixtures/1/foo.fliptable']
    nap.preprocessors['.fliptable'] = (contents) ->
      (sentence + "(╯°□°)╯︵ ┻━┻ " for sentence in contents.split(require('os').EOL)).join('')
    nap.css('tables')
    fs.readFileSync(process.cwd() + '/public/assets/test/fixtures/1/foo.css')
      .toString().should.equal (
        "Sometimes I just want to (╯°□°)╯︵ ┻━┻ Magic the Gathering can make me mad enough to (╯°□°)╯︵ ┻━┻ "
      )

describe 'templateParsers', ->

  it 'you can add your own template parsers', ->
    nap
      assets:
        jst:
          foo: ['/test/fixtures/templates/index/foo.fliptable']
    nap.templateParsers['.fliptable'] = (contents) ->
      (sentence + "(╯°□°)╯︵ ┻━┻ " for sentence in contents.split('\n')).join('')
    nap.jst('foo')
    fs.readFileSync(process.cwd() + '/public/assets/foo.jst.js').toString()
      .should.include "(╯°□°)╯︵ ┻━┻"

describe '#middleware',  ->

  it 'renders a package in memory', (done) ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/bar.css']
    nap.middleware { url: '/assets/test/fixtures/1/bar.css' }, { end: (data) ->
      data.should.include 'background: red;'
      done()
    }, ->

  it 'renders multiple files in a package in memory', (done) ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/bar.css', '/test/fixtures/1/foo.styl']
    nap.middleware { url: '/assets/test/fixtures/1/foo.css' }, { end: (data) ->
      data.should.include 'background: #f00;'
      done()
    }, ->

  it 'does not write files to disk', ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/bar.css']
        js:
          foo: ['/test/fixtures/1/bar.coffee']
        jst:
          foo: ['/test/fixtures/1/foo.jade']
    nap.css('foo')
    nap.js('foo')
    nap.jst('foo')
    nap.middleware { url: '/assets/test/fixtures/1/bar.css' }, { end: (data) -> }, ->
    fs.readdirSync("#{process.cwd()}/public/assets").length is 0

  it 'just goes on to the next in production', ->
    nap
      mode: 'production'
      assets:
        css:
          foo: ['/test/fixtures/1/bar.css', '/test/fixtures/1/foo.styl']

    calledNext = false
    nap.middleware { url: '/assets/test/fixtures/1/foo.css' }, { end: (data) ->
      data.should.include 'background: #f00;'
    }, -> calledNext = true
    calledNext.should.be.ok

  it 'serves up the jst files as well', ->
    nap
      assets:
        jst:
          foo: ['/test/fixtures/1/foo.jade']
    nap.middleware { url: '/assets/test/fixtures/1/foo.jst.js' }, { end: (data) ->
      data.should.include "JST['foo'] = function"
    }
    nap.middleware { url: '/assets/test/fixtures/1/nap-templates-prefix.js' }, { end: (data) ->
      data.should.include "window.JST ="
    }

  it 'sets proper headers', ->
    nap
      assets:
        css:
          all: ['/text/fixtures/1/foo.styl']
        jst:
          foo: ['/test/fixtures/1/foo.jade']
    nap.middleware { url: '/assets/test/fixtures/1/nap-templates-prefix.js' },
      setHeader: (key, val) ->
        key.should.equal 'Content-Type'
        val.should.equal "application/javascript"
      end: (data) ->

  xit 'points to gzipped packages only if the headers allow it', (done) ->
    nap
      assets:
        css:
          foo: ['/test/fixtures/1/bar.css', '/test/fixtures/1/foo.styl']
    nap.middleware { url: '/assets/test/fixtures/1/foo.css' }, { end: (data) ->
      data.should.include 'background: #f00;'
      done()
    }, ->

describe 'in dev mode', ->

  afterEach ->

    fs.unlinkSync "#{process.cwd()}/test/fixtures/2/bar.css"
    fs.unlinkSync "#{process.cwd()}/test/fixtures/2/bar.js"
    fs.unlinkSync "#{process.cwd()}/test/fixtures/2/bar.jade"

  it 'considers when new files are added that could match the asset globs', ->
    nap
      mode: 'development'
      assets:
        css:
          foo: ['/test/fixtures/2/**/*.css']
        js:
          foo: ['/test/fixtures/2/**/*.js']
        jst:
          foo: ['/test/fixtures/2/**/*.jade']
    nap.css('foo').should
      .equal "<link href=\'/assets/test/fixtures/2/foo.css\' rel=\'stylesheet\' type=\'text/css\'>"
    fs.writeFileSync "#{process.cwd()}/test/fixtures/2/bar.css", '.bar { background: red }'
    fs.writeFileSync "#{process.cwd()}/test/fixtures/2/bar.js", "var bar = 'bar';"
    fs.writeFileSync "#{process.cwd()}/test/fixtures/2/bar.jade", "h1 Bar"
    nap.css('foo').should
      .equal "<link href=\'/assets/test/fixtures/2/bar.css\' rel=\'stylesheet\' type=\'text/css\'><link href=\'/assets/test/fixtures/2/foo.css\' rel=\'stylesheet\' type=\'text/css\'>"

describe '#fingerprintForPkg', ->

  it 'considers preprocessors that require external files', ->
    nap
      mode: 'production'
      assets:
        css:
          foo: ['/test/fixtures/fingerprint_with_import/foo/foo.styl']
          bar: ['/test/fixtures/fingerprint_with_import/bar/bar.styl']
    nap.fingerprintForPkg('css', 'foo').should.not.equal nap.fingerprintForPkg('css', 'bar')

  it 'matches the generated fingerprint', ->
    nap
      mode: 'production'
      assets:
        css:
          foo: ['/test/fixtures/fingerprint_with_import/foo/foo.styl']
    nap.package()
    writtenFingerprint = fs.readdirSync(process.cwd() + '/public/assets/')[0].split(/-|\./)[1]
    writtenFingerprint.should.equal nap.fingerprintForPkg('css', 'foo')

  it 'works with templates', ->
      nap
        mode: 'production'
        assets:
          jst:
            foo: ['/test/fixtures/fingerprint_with_import/baz/**/*.jade']
      nap.package()
      writtenFingerprint = fs.readdirSync(process.cwd() + '/public/assets/')[0].split(/-|\./)[1]
      writtenFingerprint.should.equal nap.fingerprintForPkg('jst', 'foo')

  it 'generates unique fingerprints for changed template packages', ->
    path = process.cwd() + '/test/fixtures/fingerprint_with_import/baz/foo.jade'
    checkFingerPrint = (data) ->
      nap
        mode: 'production'
        assets:
          jst:
            foo: ['/test/fixtures/fingerprint_with_import/baz/**/*.jade']
      fs.writeFileSync path, data
      nap.fingerprintForPkg('jst', 'foo')
    f1 = checkFingerPrint """
      h1 Hai
      h2 Bai
    """
    f2 = checkFingerPrint """
      h3 Bai
      h4 Hai
    """
    f1.should.not.equal f2
