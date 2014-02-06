'use strict';
var ansi = require('ansi-styles');
var defineProps = Object.defineProperties;

ansi.grey = ansi.gray;

var styles = (function () {
	var ret = {};

	Object.keys(ansi).forEach(function (key) {
		ret[key] = {
			get: function () {
				this._styles.push(key);
				return this;
			}
		};
	});

	return ret;
})();

var chalk = module.exports = defineProps({}, init());

function init() {
	var ret = {};

	Object.keys(styles).forEach(function (name) {
		ret[name] = {
			get: function () {
				var obj = defineProps(function self(str) {
					if (!chalk.enabled) {
						return str;
					}

					return self._styles.reduce(function (str, name) {
						var code = ansi[name];
						return code[0] + (str || '') + code[1];
					}, str);
				}, styles);

				obj._styles = [];

				return obj[name];
			}
		}
	});

	return ret;
}

chalk.styles = ansi;

chalk.stripColor = function (str) {
	return str.replace(/\x1B\[([0-9]{1,2}(;[0-9]{1,2})?)?[m|K]/g, '');
};

chalk.supportsColor = require('has-color');

// detect mode if not set manually
if (chalk.enabled === undefined) {
	chalk.enabled = chalk.supportsColor;
}
