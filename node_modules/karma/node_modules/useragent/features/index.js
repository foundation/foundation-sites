"use strict";

/**
 * Plugin dependencies
 */
var Agent = require('../').Agent
  , semver = require('semver');

/**
 * Checks if the user agent's version can be satisfied agents the give
 * ranged argument. This uses the semver libraries range construction.
 *
 * @param {String} ranged The range the version has to satisfie
 * @returns {Boolean}
 * @api public
 */
Agent.prototype.satisfies = function satisfies (range) {
  return semver.satisfies(this.major + '.' + this.minor + '.' + this.patch, range);
};
