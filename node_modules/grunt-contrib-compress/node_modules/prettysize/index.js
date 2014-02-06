/*
Copyright (c) 2013, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://yuilibrary.com/license/
*/

var sizes = [
    'Bytes', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB'
];

/**
Pretty print a size from bytes
@method pretty
@param {Number} size The number to pretty print
@param {Boolean} [nospace=false] Don't print a space
@param {Boolean} [one=false] Only print one character
*/

module.exports = function(size, nospace, one) {
    var mysize, f;

    sizes.forEach(function(f, id) {
        if (one) {
            f = f.slice(0, 1);
        }
        var s = Math.pow(1024, id),
            fixed;
        if (size >= s) {
            fixed = String((size / s).toFixed(1));
            if (fixed.indexOf('.0') === fixed.length - 2) {
                fixed = fixed.slice(0, -2);
            }
            mysize = fixed + (nospace ? '' : ' ') + f;
        }
    });

    // zero handling
    // always prints in Bytes
    if (!mysize) {
        f = (one ? sizes[0].slice(0, 1) : sizes[0]);
        mysize = '0' + (nospace ? '' : ' ') + f;
    }

    return mysize;
};
