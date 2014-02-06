module.exports = function liveReload(opt) {
  var opt = opt || {};
  var port = opt.port || 35729;
  var excludeList = opt.excludeList || ['.woff', '.js', '.css', '.ico'];

  function getSnippet() {
    /*jshint quotmark:false */
    var snippet = [
        "<!-- livereload script -->",
        "<script type=\"text/javascript\">document.write('<script src=\"http://'",
        " + (location.host || 'localhost').split(':')[0]",
        " + ':" + port + "/livereload.js?snipver=1\" type=\"text/javascript\"><\\/script>')",
        "</script>",
        ""
    ].join('\n');
    return snippet;
  };

  function bodyExists(body) {
    if (!body) return false;
    return (~body.lastIndexOf("</body>"));
  }

  function snippetExists(body) {
    if (!body) return true;
    return (~body.lastIndexOf("/livereload.js?snipver=1"));
  }

  function acceptsHtmlExplicit(req) {
    var accept = req.headers["accept"];
    if (!accept) return false;
    return (~accept.indexOf("html"));
  }

  function isExcluded(req) {
    var url = req.url;
    var excluded = false;
    if (!url) return true;
    excludeList.forEach(function(exclude) {
      if (~url.indexOf(exclude)) {
        excluded = true;
      }
    });
    return excluded;
  }

  return function(req, res, next) {
    var writeHead = res.writeHead;
    var write = res.write;
    var end = res.end;

    if (!acceptsHtmlExplicit(req) || isExcluded(req)) {
      return next();
    }

    res.push = function(chunk) {
      res.data = (res.data || '') + chunk;
    };

    res.inject = res.write = function(string, encoding) {
      res.write = write;
      if (string !== undefined) {
        var body = string instanceof Buffer ? string.toString(encoding) : string;
        if ((bodyExists(body) || bodyExists(res.data)) && !snippetExists(body) && (!res.data || !snippetExists(res.data))) {
          res.push(body.replace(/<\/body>/, function(w) {
            return getSnippet() + w;
          }));
          return true;
        } else {
          return res.write(string, encoding);
        }
      }
      return true;
    };

    res.end = function(string, encoding) {
      res.writeHead = writeHead;
      res.end = end;
      var result = res.inject(string, encoding);
      if (!result) return res.end(string, encoding);
      if (res.data !== undefined && !res._header) res.setHeader('content-length', Buffer.byteLength(res.data, encoding));
      res.end(res.data, encoding);
    };
    next();
  };

}