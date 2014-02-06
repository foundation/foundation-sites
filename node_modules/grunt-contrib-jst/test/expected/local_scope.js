this["JST"] = this["JST"] || {};

this["JST"]["test/fixtures/template_local_scope.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<head><title>' +
((__t = ( title )) == null ? '' : __t) +
'</title></head>';

}
return __p
};