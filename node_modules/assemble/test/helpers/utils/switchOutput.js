/**
 * switchOutput
 */
module.exports = function(ext, md, html) {
  var output;
  switch (ext) {
    case "":
    case ".md":
      output = md;
      break;
    case ".html":
    case ".htm":
      output = html;
  }
  return output;
};