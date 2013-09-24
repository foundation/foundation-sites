/*!
 * jQuery Cookie Plugin v1.3.1
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else {
    // Browser globals.
    factory(jQuery);
  }
}(function ($) {

  var pluses = /\+/g;

  function decode(s) {
    if (config.raw) {
      return s;
    }
    try {
      // If we can't decode the cookie, ignore it, it's unusable.
      return decodeURIComponent(s.replace(pluses, ' '));
    } catch(e) {}
  }

  function decodeAndParse(s) {
    if (s.indexOf('"') === 0) {
      // This is a quoted cookie as according to RFC2068, unescape...
      s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
    }

    s = decode(s);

    try {
      // If we can't parse the cookie, ignore it, it's unusable.
      return config.json ? JSON.parse(s) : s;
    } catch(e) {}
  }

  var config = $.cookie = function (key, value, options) {

    // Write
    if (value !== undefined) {
      options = $.extend({}, config.defaults, options);

      if (typeof options.expires === 'number') {
        var days = options.expires, t = options.expires = new Date();
        t.setDate(t.getDate() + days);
      }

      value = config.json ? JSON.stringify(value) : String(value);

      return (document.cookie = [
        config.raw ? key : encodeURIComponent(key),
        '=',
        config.raw ? value : encodeURIComponent(value),
        options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
        options.path    ? '; path=' + options.path : '',
        options.domain  ? '; domain=' + options.domain : '',
        options.secure  ? '; secure' : ''
      ].join(''));
    }

    // Read

    var result = key ? undefined : {};

    // To prevent the for loop in the first place assign an empty array
    // in case there are no cookies at all. Also prevents odd result when
    // calling $.cookie().
    var cookies = document.cookie ? document.cookie.split('; ') : [];

    for (var i = 0, l = cookies.length; i < l; i++) {
      var parts = cookies[i].split('=');
      var name = decode(parts.shift());
      var cookie = parts.join('=');

      if (key && key === name) {
        result = decodeAndParse(cookie);
        break;
      }

      // Prevent storing a cookie that we couldn't decode.
      if (!key && (cookie = decodeAndParse(cookie)) !== undefined) {
        result[name] = cookie;
      }
    }

    return result;
  };

  config.defaults = {};

  $.removeCookie = function (key, options) {
    if ($.cookie(key) !== undefined) {
      // Must not alter options, thus extending a fresh object...
      $.cookie(key, '', $.extend({}, options, { expires: -1 }));
      return true;
    }
    return false;
  };

}));