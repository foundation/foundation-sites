# ZIP Format

Archiver implements key aspects of PKWARE'S ZIP v2.0.

```
General Format of a ZIP file
----------------------------

Files stored in arbitrary order.  Large zipfiles can span multiple
diskette media.

Overall zipfile format:

  [local file header + file data + data_descriptor] . . .
  [central directory] end of central directory record


A.  Local file header:

local file header signature     4 bytes  (0x04034b50)
version needed to extract       2 bytes
general purpose bit flag        2 bytes
compression method              2 bytes
last mod file time              2 bytes
last mod file date              2 bytes
crc-32                          4 bytes
compressed size                 4 bytes
uncompressed size               4 bytes
filename length                 2 bytes
extra field length              2 bytes

filename (variable size)
extra field (variable size)


B.  Data descriptor:

crc-32                          4 bytes
compressed size                 4 bytes
uncompressed size               4 bytes

    This descriptor exists only if bit 3 of the general
    purpose bit flag is set (see below).  It is byte aligned
    and immediately follows the last byte of compressed data.
    This descriptor is used only when it was not possible to
    seek in the output zip file, e.g., when the output zip file
    was standard output or a non seekable device.

C.  Central directory structure:

    [file header] . . .  end of central dir record

    File header:

central file header signature   4 bytes  (0x02014b50)
version made by                 2 bytes
version needed to extract       2 bytes
general purpose bit flag        2 bytes
compression method              2 bytes
last mod file time              2 bytes
last mod file date              2 bytes
crc-32                          4 bytes
compressed size                 4 bytes
uncompressed size               4 bytes
filename length                 2 bytes
extra field length              2 bytes
file comment length             2 bytes
disk number start               2 bytes
internal file attributes        2 bytes
external file attributes        4 bytes
relative offset of local header 4 bytes

filename (variable size)
extra field (variable size)
file comment (variable size)

    End of central dir record:

end of central dir signature    4 bytes  (0x06054b50)
number of this disk             2 bytes
number of the disk with the
start of the central directory  2 bytes
total number of entries in
the central dir on this disk    2 bytes
total number of entries in
the central dir                 2 bytes
size of the central directory   4 bytes
offset of start of central
directory with respect to
the starting disk number        4 bytes
zipfile comment length          2 bytes
zipfile comment (variable size)


D.  Explanation of fields:

    version made by (2 bytes)

  The upper byte indicates the host system (OS) for the
  file.  Software can use this information to determine
  the line record format for text files etc.  The current
  mappings are:

  0 - MS-DOS and OS/2 (F.A.T. file systems)
  1 - Amiga                     2 - VAX/VMS
  3 - *nix                      4 - VM/CMS
  5 - Atari ST                  6 - OS/2 H.P.F.S.
  7 - Macintosh                 8 - Z-System
  9 - CP/M                      10 thru 255 - unused

  The lower byte indicates the version number of the
  software used to encode the file.  The value/10
  indicates the major version number, and the value
  mod 10 is the minor version number.

    version needed to extract (2 bytes)

  The minimum software version needed to extract the
  file, mapped as above.

    general purpose bit flag: (2 bytes)

  bit 0: If set, indicates that the file is encrypted.

  (For Method 6 - Imploding)
  bit 1: If the compression method used was type 6,
   Imploding, then this bit, if set, indicates
   an 8K sliding dictionary was used.  If clear,
   then a 4K sliding dictionary was used.
  bit 2: If the compression method used was type 6,
   Imploding, then this bit, if set, indicates
   an 3 Shannon-Fano trees were used to encode the
   sliding dictionary output.  If clear, then 2
   Shannon-Fano trees were used.

  (For Method 8 - Deflating)
  bit 2  bit 1
    0      0    Normal (-en) compression option was used.
    0      1    Maximum (-ex) compression option was used.
    1      0    Fast (-ef) compression option was used.
    1      1    Super Fast (-es) compression option was used.

  Note:  Bits 1 and 2 are undefined if the compression
   method is any other.

  (For method 8)
  bit 3: If this bit is set, the fields crc-32, compressed size
   and uncompressed size are set to zero in the local
   header.  The correct values are put in the data descriptor
   immediately following the compressed data.

  The upper three bits are reserved and used internally
  by the software when processing the zipfile.  The
  remaining bits are unused.

    compression method: (2 bytes)

  (see accompanying documentation for algorithm
  descriptions)

  0 - The file is stored (no compression)
  1 - The file is Shrunk
  2 - The file is Reduced with compression factor 1
  3 - The file is Reduced with compression factor 2
  4 - The file is Reduced with compression factor 3
  5 - The file is Reduced with compression factor 4
  6 - The file is Imploded
  7 - Reserved for Tokenizing compression algorithm
  8 - The file is Deflated

    date and time fields: (2 bytes each)

  The date and time are encoded in standard MS-DOS format.
  If input came from standard input, the date and time are
  those at which compression was started for this data.

    CRC-32: (4 bytes)

  The CRC-32 algorithm was generously contributed by
  David Schwaderer and can be found in his excellent
  book "C Programmers Guide to NetBIOS" published by
  Howard W. Sams & Co. Inc.  The 'magic number' for
  the CRC is 0xdebb20e3.  The proper CRC pre and post
  conditioning is used, meaning that the CRC register
  is pre-conditioned with all ones (a starting value
  of 0xffffffff) and the value is post-conditioned by
  taking the one's complement of the CRC residual.
  If bit 3 of the general purpose flag is set, this
  field is set to zero in the local header and the correct
  value is put in the data descriptor and in the central
  directory.

    compressed size: (4 bytes)
    uncompressed size: (4 bytes)

  The size of the file compressed and uncompressed,
  respectively.  If bit 3 of the general purpose bit flag
  is set, these fields are set to zero in the local header
  and the correct values are put in the data descriptor and
  in the central directory.

    filename length: (2 bytes)
    extra field length: (2 bytes)
    file comment length: (2 bytes)

  The length of the filename, extra field, and comment
  fields respectively.  The combined length of any
  directory record and these three fields should not
  generally exceed 65,535 bytes.  If input came from standard
  input, the filename length is set to zero.


    disk number start: (2 bytes)

  The number of the disk on which this file begins.

    internal file attributes: (2 bytes)

  The lowest bit of this field indicates, if set, that
  the file is apparently an ASCII or text file.  If not
  set, that the file apparently contains binary data.
  The remaining bits are unused in version 1.0.

    external file attributes: (4 bytes)

  The mapping of the external attributes is
  host-system dependent (see 'version made by').  For
  MS-DOS, the low order byte is the MS-DOS directory
  attribute byte.  If input came from standard input, this
  field is set to zero.

    relative offset of local header: (4 bytes)

  This is the offset from the start of the first disk on
  which this file appears, to where the local header should
  be found.

    filename: (Variable)

  The name of the file, with optional relative path.
  The path stored should not contain a drive or
  device letter, or a leading slash.  All slashes
  should be forward slashes '/' as opposed to
  backwards slashes '\' for compatibility with Amiga
  and Unix file systems etc.  If input came from standard
  input, there is no filename field.

    extra field: (Variable)

  This is for future expansion.  If additional information
  needs to be stored in the future, it should be stored
  here.  Earlier versions of the software can then safely
  skip this file, and find the next file or header.  This
  field will be 0 length in version 1.0.

  In order to allow different programs and different types
  of information to be stored in the 'extra' field in .ZIP
  files, the following structure should be used for all
  programs storing data in this field:

  header1+data1 + header2+data2 . . .

  Each header should consist of:

    Header ID - 2 bytes
    Data Size - 2 bytes

  Note: all fields stored in Intel low-byte/high-byte order.

  The Header ID field indicates the type of data that is in
  the following data block.

  Header ID's of 0 thru 31 are reserved for use by PKWARE.
  The remaining ID's can be used by third party vendors for
  proprietary usage.

  The current Header ID mappings are:

  0x0007        AV Info
  0x0009        OS/2
  0x000c        VAX/VMS

  The Data Size field indicates the size of the following
  data block. Programs can use this value to skip to the
  next header block, passing over any data blocks that are
  not of interest.

  Note: As stated above, the size of the entire .ZIP file
  header, including the filename, comment, and extra
  field should not exceed 64K in size.

  In case two different programs should appropriate the same
  Header ID value, it is strongly recommended that each
  program place a unique signature of at least two bytes in
  size (and preferably 4 bytes or bigger) at the start of
  each data area.  Every program should verify that its
  unique signature is present, in addition to the Header ID
  value being correct, before assuming that it is a block of
  known type.

 -VAX/VMS Extra Field:

  The following is the layout of the VAX/VMS attributes "extra"
  block.  (Last Revision 12/17/91)

  Note: all fields stored in Intel low-byte/high-byte order.

  Value         Size            Description
  -----         ----            -----------
(VMS)   0x000c        Short           Tag for this "extra" block type
  TSize         Short           Size of the total "extra" block
  CRC           Long            32-bit CRC for remainder of the block
  Tag1          Short           VMS attribute tag value #1
  Size1         Short           Size of attribute #1, in bytes
  (var.)        Size1           Attribute #1 data
  .
  .
  .
  TagN          Short           VMS attribute tage value #N
  SizeN         Short           Size of attribute #N, in bytes
  (var.)        SizeN           Attribute #N data

  Rules:

  1. There will be one or more of attributes present, which will
     each be preceded by the above TagX & SizeX values.  These
     values are identical to the ATR$C_XXXX and ATR$S_XXXX constants
     which are defined in ATR.H under VMS C.  Neither of these values
     will ever be zero.

  2. No word alignment or padding is performed.

  3. A well-behaved PKZIP/VMS program should never produce more than
     one sub-block with the same TagX value.  Also, there will never
     be more than one "extra" block of type 0x000c in a particular
     directory record.

    file comment: (Variable)

  The comment for this file.

    number of this disk: (2 bytes)

  The number of this disk, which contains central
  directory end record.

    number of the disk with the start of the central directory: (2 bytes)

  The number of the disk on which the central
  directory starts.

    total number of entries in the central dir on this disk: (2 bytes)

  The number of central directory entries on this disk.

    total number of entries in the central dir: (2 bytes)

  The total number of files in the zipfile.


    size of the central directory: (4 bytes)

  The size (in bytes) of the entire central directory.

    offset of start of central directory with respect to
    the starting disk number:  (4 bytes)

  Offset of the start of the central direcory on the
  disk on which the central directory starts.

    zipfile comment length: (2 bytes)

  The length of the comment for this zipfile.

    zipfile comment: (Variable)

  The comment for this zipfile.


D.  General notes:

    1)  All fields unless otherwise noted are unsigned and stored
  in Intel low-byte:high-byte, low-word:high-word order.

    2)  String fields are not null terminated, since the
  length is given explicitly.

    3)  Local headers should not span disk boundries.  Also, even
  though the central directory can span disk boundries, no
  single record in the central directory should be split
  across disks.

    4)  The entries in the central directory may not necessarily
  be in the same order that files appear in the zipfile.
```

*Source: http://www.pkware.com/documents/APPNOTE/APPNOTE-2.0.txt*