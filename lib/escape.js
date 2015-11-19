module.exports = function(text) {
  return text.toLowerCase().replace(/[^\w]+/g, '-');
}
