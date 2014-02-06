# Options

## archive
Type: `String`

This is used to define where to output the archive. Each target can only have one output file.

## mode
Type: `String`

This is used to define which mode to use, currently supports `gzip`, `deflate`, `deflateRaw`, `tar`, `tgz` (tar gzip) and `zip`.

Automatically detected per dest:src pair, but can be overridden per target if desired.

## level (zip only)
Type: `Integer`
Default: 1

Sets the level of archive compression.

*Currently, gzip compression related options are not supported due to deficiencies in node's zlib library.*

## pretty
Type: `Boolean`
Default: `false`

Pretty print file sizes when logging.
