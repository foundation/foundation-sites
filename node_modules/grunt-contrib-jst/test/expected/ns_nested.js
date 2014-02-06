this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["JST"] = this["MyApp"]["JST"] || {};
this["MyApp"]["JST"]["Main"] = this["MyApp"]["JST"]["Main"] || {};

this["MyApp"]["JST"]["Main"]["test/fixtures/template.html"] = function(obj) {
var __t, __p = '', __e = _.escape;
__p += '<head><title>' +
((__t = ( obj.title )) == null ? '' : __t) +
'</title></head>';
return __p
};