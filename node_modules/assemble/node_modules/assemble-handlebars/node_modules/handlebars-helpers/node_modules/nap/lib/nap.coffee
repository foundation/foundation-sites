fs = require 'fs'
path = require 'path'
exec = require('child_process').exec
coffee = require 'coffee-script'
jadeRuntime = fs.readFileSync(path.resolve __dirname, '../deps/jade.runtime.js').toString()
hoganPrefix = fs.readFileSync(path.resolve __dirname, '../deps/hogan.js').toString()
sqwish = require 'sqwish'
uglifyjs = require "uglify-js"
_ = require 'underscore'
_str = require 'underscore.string'
mkdirp = require 'mkdirp'
fileUtil = require 'file'
glob = require 'glob'
rimraf = require 'rimraf'
crypto = require 'crypto'
zlib = require 'zlib'

# The initial configuration function. Pass it options such as `assets` to let nap determine which
# files to put together in packages.
#
# @param {Object} options An obj of configuration options
# @return {Function} Returns itself for chainability

module.exports = (options = {}) =>

  # Expand asset globs
  unless options.assets?
    throw new Error "You must specify an 'assets' obj with keys 'js', 'css', or 'jst'"
  @assets = _.clone options.assets
  @originalAssets = _.clone options.assets
  @appDir = (if options.appDir? then options.appDir else process.cwd())
  expandAssetGlobs()

  # Config defaults
  @publicDir = path.resolve(@appDir, options.publicDir || 'public')
  @mode = options.mode ? switch process.env.NODE_ENV
    when 'staging' then 'production'
    when 'production' then 'production'
    else 'development'
  @cdnUrl = if options.cdnUrl? then options.cdnUrl.replace /\/$/, '' else undefined
  @gzip = options.gzip ? false
  @minify = options.minify ? true
  @_tmplPrefix = 'window.JST = window.JST || {};\n'
  @_assetsDir = '/assets'
  @_outputDir = path.join(@publicDir, @_assetsDir)
  @_fileMtimeMap = {}
  @_preprocessedCache = {}
  @_fingerprintCache = { js: {}, jst: {}, css: {} }
  @getNamespace = options.getNamespace ? @defaultGetNamespace

  unless fs.existsSync @publicDir
    throw new Error "The directory #{@publicDir} doesn't exist"

  clearAssetsDir() if @mode is 'development'

  # Add any javascript necessary for templates (like the jade runtime)
  exts = _.uniq(ext = path.extname(filename) for filename in _.flatten @assets.jst)
  for ext in exts
    switch ext
      when '.jade' then @_tmplPrefix = jadeRuntime + '\n' + @_tmplPrefix
      when '.mustache' then @_tmplPrefix = hoganPrefix + '\n' + @_tmplPrefix

  @

# Run js pre-processors & output the packages in dev.
#
# @param {String} pkg The name of the package to output
# @return {String} Script tag(s) pointing to the ouput package(s)

module.exports.js = (pkg, gzip = @gzip) =>
  throw new Error "Cannot find package '#{pkg}'" unless @assets.js[pkg]?

  if @mode is 'production'
    fingerprint = '-' + fingerprintForPkg('js', pkg) if @mode is 'production'
    src = (@cdnUrl ? @_assetsDir) + '/' + "#{pkg}#{fingerprint ? ''}.js"
    src += '.jgz' if gzip
    return "<script src='#{src}' type='text/javascript'></script>"

  expandAssetGlobs()

  output = ''
  for filename, contents of preprocessPkg pkg, 'js'
    writeFile filename, contents unless @usingMiddleware
    output += "<script src='#{@_assetsDir}/#{filename}' type='text/javascript'></script>"
  output

# Run css pre-processors & output the packages in dev.
#
# @param {String} pkg The name of the package to output
# @return {String} Link tag(s) pointing to the ouput package(s)

module.exports.css = (pkg, gzip = @gzip) =>
  throw new Error "Cannot find package '#{pkg}'" unless @assets.css[pkg]?

  if @mode is 'production'
    fingerprint = '-' + fingerprintForPkg('css', pkg) if @mode is 'production'
    src = (@cdnUrl ? @_assetsDir) + '/' + "#{pkg}#{fingerprint ? ''}.css"
    src += '.cgz' if gzip
    return "<link href='#{src}' rel='stylesheet' type='text/css'>"

  expandAssetGlobs()

  output = ''
  for filename, contents of preprocessPkg pkg, 'css'
    writeFile filename, contents unless @usingMiddleware
    output += "<link href='#{@_assetsDir}/#{filename}' rel='stylesheet' type='text/css'>"
  output

# Compile the templates into JST['file/path'] : functionString pairs in dev
#
# @param {String} pkg The name of the package to output
# @return {String} Script tag(s) pointing to the ouput JST script file(s)

module.exports.jst = (pkg, gzip = @gzip) =>
  throw new Error "Cannot find package '#{pkg}'" unless @assets.jst[pkg]?

  if @mode is 'production'
    fingerprint = '-' + fingerprintForPkg('jst', pkg) if @mode is 'production'
    src = (@cdnUrl ? @_assetsDir) + '/' + "#{pkg}#{fingerprint ? ''}.jst.js"
    src += '.jgz' if gzip
    return "<script src='#{src}' type='text/javascript'></script>"

  expandAssetGlobs()

  unless @usingMiddleware
    fs.writeFileSync (@_outputDir + '/' + pkg + '.jst.js'), generateJSTs pkg
    fs.writeFileSync (@_outputDir + '/nap-templates-prefix.js'), @_tmplPrefix

  """
  <script src='#{@_assetsDir}/nap-templates-prefix.js' type='text/javascript'></script>
  <script src='#{@_assetsDir}/#{pkg}.jst.js' type='text/javascript'></script>
  """

# Runs through all of the asset packages. Concatenates, minifies, and gzips them. Then outputs
# the final packages. (To be run once during the build step for production)

module.exports.package = (callback = ->) =>

  clearAssetsDir()

  total = _.reduce (_.values(pkgs).length for key, pkgs of @assets), (memo, num) -> memo + num
  callback = _.after total, callback

  if @assets.js?
    for pkg, files of @assets.js
      contents = (contents for fn, contents of preprocessPkg pkg, 'js').join(';\n')
      contents = uglify contents if @mode is 'production' and @minify
      fingerprint = '-' + fingerprintForPkg('js', pkg)
      filename = "#{pkg}#{fingerprint ? ''}.js"
      writeFile filename, contents
      if @gzip then gzipPkg(contents, filename, callback) else callback()
      total++

  if @assets.css?
    for pkg, files of @assets.css
      contents = (for filename, contents of preprocessPkg pkg, 'css'
        embedFiles filename, contents
      ).join('')
      contents = sqwish.minify contents if @mode is 'production'
      fingerprint = '-' + fingerprintForPkg('css', pkg)
      filename = "#{pkg}#{fingerprint ? ''}.css"
      writeFile filename, contents
      if @gzip then gzipPkg(contents, filename, callback) else callback()
      total++

  if @assets.jst?
    for pkg, files of @assets.jst
      contents = generateJSTs pkg
      contents = @_tmplPrefix + contents
      contents = uglify contents if @mode is 'production' and @minify
      fingerprint = '-' + fingerprintForPkg('jst', pkg)
      filename = "#{pkg}#{fingerprint ? ''}.jst.js"
      writeFile filename , contents
      if @gzip then gzipPkg(contents, filename, callback) else callback()
      total++

# Instead of compiling & writing the packages to disk, nap will compile and serve the files in
# memory per request.

module.exports.middleware = (req, res, next) =>

  unless @mode is 'development'
    next()
    return

  @usingMiddleware = true

  switch path.extname req.url

    when '.css'
      res.setHeader?("Content-Type", "text/css")
      for pkg, filenames of @assets.css
        for filename in filenames
          if req.url.replace(/^\/assets\/|.(?!.*\.).*/g, '') is filename.replace(/.(?!.*\.).*/, '')
            contents = fs.readFileSync(path.resolve @appDir + '/' + filename).toString()
            contents = preprocess contents, filename
            res.end contents
            return

    when '.js'
      res.setHeader?("Content-Type", "application/javascript")

      if req.url.match /\.jst\.js$/
        pkg = path.basename req.url, '.jst.js'
        res.end generateJSTs pkg
        return

      if req.url.match /nap-templates-prefix\.js$/
        res.end @_tmplPrefix
        return

      for pkg, filenames of @assets.js
        for filename in filenames
          if req.url.replace(/^\/assets\/|.(?!.*\.).*/g, '') is filename.replace(/.(?!.*\.).*/, '')
            contents = fs.readFileSync(path.resolve @appDir + '/' + filename).toString()
            contents = preprocess contents, filename
            res.end contents
            return

  next()

# An obj of default fileExtension: preprocessFunction pairs
# The preprocess function takes contents, [filename] and returns the preprocessed contents

module.exports.preprocessors = preprocessors =

  '.coffee': (contents, filename) ->
    try
      coffee.compile contents
    catch err
      err.stack = "Nap error compiling #{filename}\n" + err.stack
      throw err

  '.styl': (contents, filename) =>
    require('stylus')(contents)
      .set('filename', @appDir + '/' + filename)
      .use(require('nib')())
      .render (err, out) ->
        throw(err) if err
        contents = out
    contents

  '.less': (contents, filename) ->
    require('less').render contents, (err, out) ->
      throw(err) if err
      contents = out
    contents

# An obj of default fileExtension: templateParserFunction pairs
# The templateParserFunction function takes contents, [filename] and returns the parsed contents

module.exports.templateParsers = templateParsers =

  '.jade': (contents, filename) ->
    require('jade').compileClient(contents, { compileDebug: true })

  '.mustache': (contents, filename) ->
    'new Hogan.Template(' + require('hogan.js').compile(contents, { asString: true }) + ')'

  '.mustache.jade': (contents, filename) ->
    jadeOutput = require('jade').compile(contents)()
    'new Hogan.Template(' + require('hogan.js').compile( jadeOutput , { asString: true }) + ')'

# Get namespace for render JST
#
# @param {String} filename The template filename
# @return {String} namespace Processed template filename

@defaultGetNamespace = (filename) ->
    # Templates in a 'templates' folder are namespaced by folder after 'templates'
    if filename.indexOf('templates') > -1
      namespace = filename.split('templates')[-1..][0].replace /^\/|\..*/g, ''
    else
      namespace = filename.split('/')[-1..][0].replace /^\/|\..*/g, ''

# Generates javascript template functions packed into a JST namespace
#
# @param {String} pkg The package name to generate from
# @return {String} The new JST file contents

module.exports.generateJSTs = generateJSTs = (pkg) =>

  tmplFileContents = ''

  # Create a list of available parsers, ordering them
  # from specific to less-specific
  exts = _.keys( templateParsers )
  parsers = _.sortBy exts, (ext) ->
    return ext.match(/\./g).length
  parsers.reverse()

  for filename in @assets.jst[pkg]

    # Read the file and compile it into a javascript function string
    fullPath = path.resolve @appDir + '/' + filename

    # Find the appropriate parser for the file
    parser = _.find parsers, (parser) ->
      _str.endsWith filename, parser

    contents = if fileHasChanged(fullPath) and parser? or
               not  @_preprocessedCache[filename]?
                 data = fs.readFileSync(fullPath).toString()
                 # Remove potential UTF Byte Order Mark
                 data = data.replace(/^\uFEFF/, '')
                 @_preprocessedCache[filename] = templateParsers[parser](data, filename).toString()
                 @_preprocessedCache[filename]
               else
                 @_preprocessedCache[filename]

    namespace = @getNamespace filename
    tmplFileContents += "JST['#{namespace}'] = #{contents};\n"

  tmplFileContents

# Determine whether a file has changed since last preprocess or template parse
#
# @param {String} filename
# @return {Boolean}

fileHasChanged = (filename) =>
  mtime = fs.statSync(filename).mtime.getTime()
  changed = @_fileMtimeMap[filename] isnt mtime
  @_fileMtimeMap[filename] = mtime
  changed

# Run a preprocessor or pass through the contents
#
# @param {String} filename The name of the file to preprocess
# @param {String} filename The contents of the file to preprocess
# @return {String} The new file contents

preprocess = (contents, filename) =>
  ext = path.extname filename
  if preprocessors[ext]? then preprocessors[ext](contents, filename) else contents

# Run any pre-processors on a package, and return an obj of { filename: compiledContents }
#
# @param {String} pkg The name of the package to preprocess
# @param {String} type Either 'js' or 'css'
# @return {Object} A { filename: compiledContents } obj

preprocessPkg = (pkg, type) =>
  obj = {}
  for filename in @assets[type][pkg]
    fullPath = path.resolve @appDir + '/' + filename
    contents = if fileHasChanged(fullPath) or not @_preprocessedCache[filename]?
                 data = fs.readFileSync(fullPath).toString()
                 @_preprocessedCache[filename] = preprocess(data, filename)
               else
                 @_preprocessedCache[filename]
    outputFilename = filename.replace /\.[^.]*$/, '' + '.' + type
    obj[outputFilename] = contents
  obj

# Given a filename creates the sub directories it's in, if it doesn't exist. And writes it to the
# @_outputDir.
#
# @param {String} filename Filename of the css/js/jst file to be output
# @param {String} contents Contents of the file to be output
# @return {String} The new full directory of the output file

writeFile = (filename, contents) =>
  file = path.join(@_outputDir, filename)
  dir = path.dirname file
  mkdirp.sync dir, '0755' unless fs.existsSync dir
  fs.writeFileSync file, contents ? ''

# Runs uglify js on a string of javascript
#
# @param {String} str String of js to be uglified
# @return {String} str Minifed js string

uglify = (str) ->
  uglifyjs.minify(str, { fromString: true }).code

# Given the contents of a css file, replace references to url() with base64 embedded images & fonts.
#
# @param {String} str The filename to replace
# @param {String} str The CSS string to replace url()'s with
# @return {String} The CSS string with the url()'s replaced

embedFiles = (filename, contents) =>

  endsWithEmbed = _str.endsWith path.basename(filename).split('.')[0], '_embed'
  return contents if not contents? or contents is '' or not endsWithEmbed

  # Table of mime types depending on file extension
  mimes =
    '.gif' : 'image/gif'
    '.png' : 'image/png'
    '.jpg' : 'image/jpeg'
    '.jpeg': 'image/jpeg'
    '.svg' : 'image/svg+xml'
    '.ttf' : 'font/truetype;charset=utf-8'
    '.woff': 'font/woff;charset=utf-8'

  offset = 0
  offsetContents = contents.substring(offset, contents.length)

  return contents unless offsetContents.match(/url/g)?

  # While there are urls in the contents + offset replace it with base 64
  # If that url() doesn't point to an existing file then skip it by pointing the
  # offset ahead of it
  for i in [0..offsetContents.match(/url/g).length]

    start = offsetContents.indexOf('url(') + 4 + offset
    end = contents.substring(start, contents.length).indexOf(')') + start
    filename = _str.trim _str.trim(contents.substring(start, end), '"'), "'"
    filename = path.join(@publicDir, filename.replace(/^\//, ''))
    mime = mimes[path.extname filename]

    if mime?
      if fs.existsSync filename
        base64Str = fs.readFileSync(path.resolve filename).toString('base64')

        newUrl = "data:#{mime};base64,#{base64Str}"
        contents = _str.splice(contents, start, end - start, newUrl)
        end = start + newUrl.length + 4
      else
        throw new Error 'Tried to embed data-uri, but could not find file ' + filename
    else
      end += 4

    offset = end
    offsetContents = contents.substring(offset, contents.length)

  contents

# Gzips a package.
#
# @param {String} contents The file contents to be gzipped
# @param {String} filename The name of the new file
# @param {Function} callback The callback after gzipping

gzipPkg = (contents, filename, callback) =>
  file = path.join(@_outputDir, filename)
  ext = if _str.endsWith filename, '.js' then '.jgz' else '.cgz'
  outputFilename = file + ext
  zlib.gzip contents, (err, buf) ->
    fs.writeFile outputFilename, buf, callback

# Generate an md5 hash from the contents of a package.
# Used to append a fingerprint to package files for cache busting.
#
# @param {String} pkgType The type `js`, `jst`, or `css` of the package
# @param {String} pkgName The name of the package
# @return {String} The md5 fingerprint to append

module.exports.fingerprintForPkg = fingerprintForPkg = (pkgType, pkgName) =>
  return @_fingerprintCache[pkgType][pkgName] if @_fingerprintCache[pkgType][pkgName]?
  md5 = crypto.createHash('md5')
  pkgContents = if pkgType is 'css' or pkgType is 'js'
                  (contents for filename, contents of preprocessPkg(pkgName, pkgType)).join('')
                else
                  generateJSTs pkgName
  md5.update pkgContents
  @_fingerprintCache[pkgType][pkgName] = md5.digest('hex')


# Goes through asset declarations and expands them into full file paths, globs and all.
expandAssetGlobs = =>
  assets = {js: {}, css: {}, jst: {}}
  for key, obj of @originalAssets
    for pkg, patterns of @originalAssets[key]
      matches = []
      for pattern in patterns
        dirs = glob.sync path.resolve("#{@appDir}/#{pattern}").replace(/\\/g, "\/")
        matches = matches.concat(dirs)
      matches = _.uniq _.flatten matches
      matches = (path.normalize(file).replace(@appDir, '').replace(/^\//, '').replace(/\\/g, '\/') for file in matches)
      assets[key][pkg] = matches
  @assets = assets

# Deletes all of the files in the assets directory.

clearAssetsDir = =>
  rimraf.sync(@_outputDir)
  fs.mkdirSync(@_outputDir, '0755')
