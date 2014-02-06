# TAR

Archiver implements key aspects of the "ustar" standard of the original tar format.

```
Old-Style Archive Format

The original tar archive format has been extended many times to include
additional information that various implementors found necessary.  This
section describes the variant implemented by the tar command included in
Version 7 AT&T UNIX, which is one of the earliest widely-used versions of
the tar program.

The header record for an old-style tar archive consists of the following:

struct header_old_tar {
 char name[100];
 char mode[8];
 char uid[8];
 char gid[8];
 char size[12];
 char mtime[12];
 char checksum[8];
 char linkflag[1];
 char linkname[100];
 char pad[255];
};

All unused bytes in the header record are filled with nulls.

name    Pathname, stored as a null-terminated string.  Early tar imple-
 mentations only stored regular files (including hardlinks to
 those files).  One common early convention used a trailing "/"
 character to indicate a directory name, allowing directory per-
 missions and owner information to be archived and restored.

mode    File mode, stored as an octal number in ASCII.

uid, gid
 User id and group id of owner, as octal numbers in ASCII.

size    Size of file, as octal number in ASCII.  For regular files only,
 this indicates the amount of data that follows the header.  In
 particular, this field was ignored by early tar implementations
 when extracting hardlinks.  Modern writers should always store a
 zero length for hardlink entries.

mtime   Modification time of file, as an octal number in ASCII.  This
 indicates the number of seconds since the start of the epoch,
 00:00:00 UTC January 1, 1970.  Note that negative values should
 be avoided here, as they are handled inconsistently.

checksum
 Header checksum, stored as an octal number in ASCII.  To compute
 the checksum, set the checksum field to all spaces, then sum all
 bytes in the header using unsigned arithmetic.  This field should
 be stored as six octal digits followed by a null and a space
 character.  Note that many early implementations of tar used
 signed arithmetic for the checksum field, which can cause inter-
 operability problems when transferring archives between systems.
 Modern robust readers compute the checksum both ways and accept
 the header if either computation matches.

linkflag, linkname
 In order to preserve hardlinks and conserve tape, a file with
 multiple links is only written to the archive the first time it
 is encountered.  The next time it is encountered, the linkflag is
 set to an ASCII '1' and the linkname field holds the first name
 under which this file appears.  (Note that regular files have a
 null value in the linkflag field.)

Early tar implementations varied in how they terminated these fields.
The tar command in Version 7 AT&T UNIX used the following conventions
(this is also documented in early BSD manpages): the pathname must be
null-terminated; the mode, uid, and gid fields must end in a space and a
null byte; the size and mtime fields must end in a space; the checksum is
terminated by a null and a space.  Early implementations filled the
numeric fields with leading spaces.  This seems to have been common prac-
tice until the IEEE Std 1003.1-1988 (''POSIX.1'') standard was released.
For best portability, modern implementations should fill the numeric
fields with leading zeros.

POSIX ustar Archives

IEEE Std 1003.1-1988 (''POSIX.1'') defined a standard tar file format to
be read and written by compliant implementations of tar(1).  This format
is often called the ''ustar'' format, after the magic value used in the
header.  (The name is an acronym for ''Unix Standard TAR''.)  It extends
the historic format with new fields:

struct header_posix_ustar {
 char name[100];
 char mode[8];
 char uid[8];
 char gid[8];
 char size[12];
 char mtime[12];
 char checksum[8];
 char typeflag[1];
 char linkname[100];
 char magic[6];
 char version[2];
 char uname[32];
 char gname[32];
 char devmajor[8];
 char devminor[8];
 char prefix[155];
 char pad[12];
};

typeflag
 Type of entry.  POSIX extended the earlier linkflag field with
 several new type values:
 ''0''   Regular file.  NULL should be treated as a synonym, for
   compatibility purposes.
 ''1''   Hard link.
 ''2''   Symbolic link.
 ''3''   Character device node.
 ''4''   Block device node.
 ''5''   Directory.
 ''6''   FIFO node.
 ''7''   Reserved.
 Other   A POSIX-compliant implementation must treat any unrecog-
   nized typeflag value as a regular file.  In particular,
   writers should ensure that all entries have a valid file-
   name so that they can be restored by readers that do not
   support the corresponding extension.  Uppercase letters
   "A" through "Z" are reserved for custom extensions.  Note
   that sockets and whiteout entries are not archivable.
 It is worth noting that the size field, in particular, has dif-
 ferent meanings depending on the type.  For regular files, of
 course, it indicates the amount of data following the header.
 For directories, it may be used to indicate the total size of all
 files in the directory, for use by operating systems that pre-
 allocate directory space.  For all other types, it should be set
 to zero by writers and ignored by readers.

magic   Contains the magic value ''ustar'' followed by a NULL byte to
 indicate that this is a POSIX standard archive.  Full compliance
 requires the uname and gname fields be properly set.

version
 Version.  This should be ''00'' (two copies of the ASCII digit
 zero) for POSIX standard archives.

uname, gname
 User and group names, as null-terminated ASCII strings.  These
 should be used in preference to the uid/gid values when they are
 set and the corresponding names exist on the system.

devmajor, devminor
 Major and minor numbers for character device or block device
 entry.

prefix  First part of pathname.  If the pathname is too long to fit in
 the 100 bytes provided by the standard format, it can be split at
 any / character with the first portion going here.  If the prefix
 field is not empty, the reader will prepend the prefix value and
 a / character to the regular name field to obtain the full path-
 name.

Note that all unused bytes must be set to NULL.

Field termination is specified slightly differently by POSIX than by pre-
vious implementations.  The magic, uname, and gname fields must have a
trailing NULL.  The pathname, linkname, and prefix fields must have a
trailing NULL unless they fill the entire field.  (In particular, it is
possible to store a 256-character pathname if it happens to have a / as
the 156th character.)  POSIX requires numeric fields to be zero-padded in
the front, and allows them to be terminated with either space or NULL
characters.

Currently, most tar implementations comply with the ustar format, occa-
sionally extending it by adding new fields to the blank area at the end
of the header record.
```

_Original Source: http://people.freebsd.org/~kientzle/libarchive/tar.5.txt_