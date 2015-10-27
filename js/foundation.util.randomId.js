// !function(){
//   /**
//    * returns a random base-36 uid with namespacing
//    * @function
//    * @param {Number} length - number of random base-36 digits desired. Increase for more random strings.
//    * @param {String} plugin - name of plugin to be incorporated in uid, optional.
//    * @default {String} -zf-rnd - if no plugin name is provided, value appended to uid.
//    * @returns {String} - unique id
//    */
//   function randomIdGen(length, plugin){
//     return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1) + (plugin ? '-' + plugin : '-zf-rnd');
//   }
//
//   Foundation.GetYoDigits = randomIdGen;
// }(window.Foundation);
