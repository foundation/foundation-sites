/**
 * Returns a boolean for RTL support
 */
export declare function rtl(): boolean;
/**
 * returns a random base-36 uid with namespacing
 * @function
 * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
 * @param {String} namespace - name of plugin to be incorporated in uid, optional.
 * @default {String} '' - if no plugin name is provided, nothing is appended to the uid.
 * @returns {String} - unique id
 */
export declare function GetYoDigits(length: any, namespace: any): string;
export declare function transitionend($elem: any): any;
export declare function hyphenate(str: string): string;
