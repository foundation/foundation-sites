if(!Buffer.hasOwnProperty('concat')){
  Buffer.concat = function(list, length) {
    if (!Array.isArray(list)) {
      throw new Error('Usage: Buffer.concat(list, [length])');
    }

    if (list.length === 0) {
      return new Buffer(0);
    } else if (list.length === 1) {
      return list[0];
    }

    var i;
    var buf;

    if (typeof length !== 'number') {
      length = 0;
      for (i = 0; i < list.length; i++) {
        buf = list[i];
        length += buf.length;
      }
    }

    var buffer = new Buffer(length);
    var pos = 0;
    for (i = 0; i < list.length; i++) {
      buf = list[i];
      buf.copy(buffer, pos);
      pos += buf.length;
    }

    return buffer;
  };
}