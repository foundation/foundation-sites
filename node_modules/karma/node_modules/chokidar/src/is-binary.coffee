sysPath = require 'path'

extensions = [
  # Audio files.
  'adp', 'au', 'mid', 'mp4a', 'mpga', 'oga', 's3m', 'sil', 'eol', 'dra',
  'dts', 'dtshd', 'lvp', 'pya', 'ecelp4800', 'ecelp7470', 'ecelp9600',
  'rip', 'weba', 'aac', 'aif', 'caf', 'flac',

  # Video files.
  'mka', 'm3u', 'wax', 'wma', 'wav', 'xm', 'flac', '3gp', '3g2', 'h261',
  'h263', 'h264', 'jpgv', 'jpm', 'mj2', 'mp4', 'mpeg', 'ogv', 'qt', 'uvh',
  'uvm', 'uvp', 'uvs', 'dvb', 'fvt', 'mxu', 'pyv', 'uvu', 'viv', 'webm',
  'f4v', 'fli', 'flv', 'm4v', 'mkv', 'mng', 'asf', 'vob', 'wm', 'wmv',
  'wmx', 'wvx', 'movie', 'smv', 'ts',

  # Pictures.
  'bmp', 'cgm', 'g3', 'gif', 'ief', 'jpg', 'jpeg', 'ktx', 'png', 'btif',
  'sgi', 'svg', 'tiff', 'psd', 'uvi', 'sub', 'djvu', 'dwg', 'dxf', 'fbs',
  'fpx', 'fst', 'mmr', 'rlc', 'mdi', 'wdp', 'npx', 'wbmp', 'xif', 'webp',
  '3ds', 'ras', 'cmx', 'fh', 'ico', 'pcx', 'pic', 'pnm', 'pbm', 'pgm',
  'ppm', 'rgb', 'tga', 'xbm', 'xpm', 'xwd',

  # Archives.
  'zip', 'rar', 'tar', 'bz2',

  # Fonts.
  'eot', 'ttf', 'woff'
]

exts = Object.create(null)

extensions.forEach (extension) ->
  exts[extension] = true

isBinary = (extension) -> !!exts[extension]

isBinaryPath = (path) ->
  extension = sysPath.extname(path).slice(1)
  return no if extension is ''
  isBinary extension

module.exports = isBinaryPath
