'use strict'

{EventEmitter} = require 'events'
fs = require 'fs'
sysPath = require 'path'
isBinary = require './is-binary'

nodeVersion = process.versions.node.substring(0, 3)

# Helloo, I am coffeescript file.
# Chokidar is written in coffee because it uses OOP.
# JS is fucking horrible with OOP. At least until ES6.

# Watches files & directories for changes.
#
# Emitted events: `add`, `change`, `unlink`, `error`.
#
# Examples
#
#   var watcher = new FSWatcher()
#     .add(directories)
#     .on('add', function(path) {console.log('File', path, 'was added');})
#     .on('change', function(path) {console.log('File', path, 'was changed');})
#     .on('unlink', function(path) {console.log('File', path, 'was removed');})
#
exports.FSWatcher = class FSWatcher extends EventEmitter
  constructor: (@options = {}) ->
    super
    @watched = Object.create(null)
    @watchers = []

    # Set up default options.
    @options.persistent ?= no
    @options.ignoreInitial ?= no
    @options.ignorePermissionErrors ?= no
    @options.interval ?= 100
    @options.binaryInterval ?= 300
    @options.usePolling ?= true

    @enableBinaryInterval = @options.binaryInterval isnt @options.interval

    @_ignored = do (ignored = @options.ignored) =>
      switch toString.call(ignored)
        when '[object RegExp]' then (string) -> ignored.test(string)
        when '[object Function]' then ignored
        else -> no

    # You’re frozen when your heart’s not open.
    Object.freeze @options

  _getWatchedDir: (directory) =>
    dir = directory.replace(/[\\\/]$/, '')
    @watched[dir] ?= []

  _addToWatchedDir: (directory, file) =>
    watchedFiles = @_getWatchedDir directory
    watchedFiles.push file

  _removeFromWatchedDir: (directory, file) =>
    watchedFiles = @_getWatchedDir directory
    watchedFiles.some (watchedFile, index) =>
      if watchedFile is file
        watchedFiles.splice(index, 1)
        yes

  # Private: Check for read permissions
  # Based on this answer on SO: http://stackoverflow.com/a/11781404/1358405
  #
  # stats - fs.Stats object
  #
  # Returns Boolean
  _hasReadPermissions: (stats) =>
    Boolean (4 & parseInt (stats.mode & 0o777).toString(8)[0])

  # Private: Handles emitting unlink events for
  # files and directories, and via recursion, for
  # files and directories within directories that are unlinked
  #
  # directory - string, directory within which the following item is located
  # item      - string, base path of item/directory
  #
  # Returns nothing.
  _remove: (directory, item) =>
    # if what is being deleted is a directory, get that directory's paths
    # for recursive deleting and cleaning of watched object
    # if it is not a directory, nestedDirectoryChildren will be empty array
    fullPath = sysPath.join(directory, item)

    # Check if it actually is a directory
    isDirectory = @watched[fullPath]
     
    # This will create a new entry in the watched object in either case
    # so we got to do the directory check beforehand
    nestedDirectoryChildren = @_getWatchedDir(fullPath).slice()
     
    # Remove directory / file from watched list.
    @_removeFromWatchedDir directory, item
     
    # Recursively remove children directories / files.
    nestedDirectoryChildren.forEach (nestedItem) =>
      @_remove fullPath, nestedItem

    fs.unwatchFile fullPath if @options.usePolling
     
    # The Entry will either be a directory that just got removed
    # or a bogus entry to a file, in either case we have to remove it
    delete @watched[fullPath]
     
    # Only emit events for files
    @emit 'unlink', fullPath unless isDirectory
 
  # Private: Watch file for changes with fs.watchFile or fs.watch.
  #
  # item     - string, path to file or directory.
  # callback - function that will be executed on fs change.
  #
  # Returns nothing.
  _watch: (item, itemType, callback = (->)) =>
    directory = sysPath.dirname(item)
    basename = sysPath.basename(item)
    parent = @_getWatchedDir directory
    options = {persistent: @options.persistent}

    # Prevent memory leaks.
    return if parent.indexOf(basename) isnt -1

    @_addToWatchedDir directory, basename
    if @options.usePolling
      options.interval = if @enableBinaryInterval and isBinary basename
        @options.binaryInterval
      else
        @options.interval
      fs.watchFile item, options, (curr, prev) =>
        callback item, curr if curr.mtime.getTime() > prev.mtime.getTime()
    else
      watcher = fs.watch item, options, (event, path) =>
        callback item
      @watchers.push watcher

  # Private: Emit `change` event once and watch file to emit it in the future
  # once the file is changed.
  #
  # file       - string, fs path.
  # stats      - object, result of executing stat(1) on file.
  # initialAdd - boolean, was the file added at the launch?
  #
  # Returns nothing.
  _handleFile: (file, stats, initialAdd = no) =>
    @_watch file, 'file', (file, newStats) =>
      @emit 'change', file, newStats
    @emit 'add', file, stats unless initialAdd and @options.ignoreInitial

  # Private: Read directory to add / remove files from `@watched` list
  # and re-read it on change.
  #
  # directory - string, fs path.
  #
  # Returns nothing.
  _handleDir: (directory, initialAdd) =>
    read = (directory, initialAdd) =>
      fs.readdir directory, (error, current) =>
        return @emit 'error', error if error?
        return unless current
        previous = @_getWatchedDir(directory)

        # Files that absent in current directory snapshot
        # but present in previous emit `remove` event
        # and are removed from @watched[directory].
        previous
          .filter (file) =>
            current.indexOf(file) is -1
          .forEach (file) =>
            @_remove directory, file

        # Files that present in current directory snapshot
        # but absent in previous are added to watch list and
        # emit `add` event.
        current
          .filter (file) =>
            previous.indexOf(file) is -1
          .forEach (file) =>
            @_handle sysPath.join(directory, file), initialAdd

    read directory, initialAdd
    @_watch directory, 'directory', (dir) -> read dir, no

  # Private: Handle added file or directory.
  # Delegates call to _handleFile / _handleDir after checks.
  #
  # item - string, path to file or directory.
  #
  # Returns nothing.
  _handle: (item, initialAdd) =>
    # Don't handle invalid files, dotfiles etc.
    return if @_ignored item

    # Get the canonicalized absolute pathname.
    fs.realpath item, (error, path) =>
      return if error and error.code is 'ENOENT'
      return @emit 'error', error if error?
      # Get file info, check is it file, directory or something else.
      fs.stat path, (error, stats) =>
        return @emit 'error', error if error?
        if @options.ignorePermissionErrors and (not @_hasReadPermissions stats)
          return

        return if @_ignored.length is 2 and @_ignored item, stats

        @_handleFile item, stats, initialAdd if stats.isFile()
        @_handleDir item, initialAdd if stats.isDirectory()

  emit: (event, args...) ->
    super
    super 'all', event, args... if event in ['add', 'change', 'unlink']

  # Public: Adds directories / files for tracking.
  #
  # * files - array of strings (file paths).
  #
  # Examples
  #
  #   add ['app', 'vendor']
  #
  # Returns an instance of FSWatcher for chaning.
  add: (files) =>
    files = [files] unless Array.isArray files
    files.forEach (file) => @_handle file, true
    this

  # Public: Remove all listeners from watched files.
  # Returns an instance of FSWatcher for chaning.
  close: =>
    @watchers.forEach (watcher) -> watcher.close()
    Object.keys(@watched).forEach (directory) =>
      @watched[directory].forEach (file) =>
        fs.unwatchFile sysPath.join(directory, file)
    @watched = Object.create(null)
    @removeAllListeners()
    this

exports.watch = (files, options) ->
  new FSWatcher(options).add(files)
