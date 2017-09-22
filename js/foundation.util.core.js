import $ from 'jquery';
// Core Foundation Utilities, utilized in a number of places.
/**
 * Returns a boolean for RTL support
 */
export function rtl() {
    return $('html').attr('dir') === 'rtl';
}
/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
export function GetYoDigits(length, namespace) {
    length = length || 6;
    return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (namespace ? `-${namespace}` : '');
}
export function transitionend($elem) {
    var transitions = {
        'transition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd',
        'MozTransition': 'transitionend',
        'OTransition': 'otransitionend'
    };
    var elem = document.createElement('div'), end;
    for (var t in transitions) {
        if (typeof elem.style[t] !== 'undefined') {
            end = transitions[t];
        }
    }
    if (end) {
        return end;
    }
    else {
        end = setTimeout(function () {
            $elem.triggerHandler('transitionend', [$elem]);
        }, 1);
        return 'transitionend';
    }
}
// Convert PascalCase to kebab-case
// Thank you: http://stackoverflow.com/a/8955580
export function hyphenate(str) {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
