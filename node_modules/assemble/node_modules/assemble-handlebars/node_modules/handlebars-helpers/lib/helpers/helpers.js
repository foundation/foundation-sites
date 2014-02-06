/* global window */
var Handlebars;

if (typeof window !== "undefined" && window !== null) {
  Handlebars = window.Handlebars;
}

if (typeof module !== "undefined" && module !== null) {
  Handlebars = module.exports.Handlebars = require('handlebars');
}

