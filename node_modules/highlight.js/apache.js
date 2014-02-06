module.exports = function(hljs) {
  var NUMBER = {className: 'number', begin: '[\\$%]\\d+'};
  return {
    case_insensitive: true,
    keywords: {
      keyword: 'acceptfilter acceptmutex acceptpathinfo accessfilename action addalt ' +
        'addaltbyencoding addaltbytype addcharset adddefaultcharset adddescription ' +
        'addencoding addhandler addicon addiconbyencoding addiconbytype addinputfilter ' +
        'addlanguage addmoduleinfo addoutputfilter addoutputfilterbytype addtype alias ' +
        'aliasmatch allow allowconnect allowencodedslashes allowoverride anonymous ' +
        'anonymous_logemail anonymous_mustgiveemail anonymous_nouserid anonymous_verifyemail ' +
        'authbasicauthoritative authbasicprovider authdbduserpwquery authdbduserrealmquery ' +
        'authdbmgroupfile authdbmtype authdbmuserfile authdefaultauthoritative ' +
        'authdigestalgorithm authdigestdomain authdigestnccheck authdigestnonceformat ' +
        'authdigestnoncelifetime authdigestprovider authdigestqop authdigestshmemsize ' +
        'authgroupfile authldapbinddn authldapbindpassword authldapcharsetconfig ' +
        'authldapcomparednonserver authldapdereferencealiases authldapgroupattribute ' +
        'authldapgroupattributeisdn authldapremoteuserattribute authldapremoteuserisdn ' +
        'authldapurl authname authnprovideralias authtype authuserfile authzdbmauthoritative ' +
        'authzdbmtype authzdefaultauthoritative authzgroupfileauthoritative ' +
        'authzldapauthoritative authzownerauthoritative authzuserauthoritative ' +
        'balancermember browsermatch browsermatchnocase bufferedlogs cachedefaultexpire ' +
        'cachedirlength cachedirlevels cachedisable cacheenable cachefile ' +
        'cacheignorecachecontrol cacheignoreheaders cacheignorenolastmod ' +
        'cacheignorequerystring cachelastmodifiedfactor cachemaxexpire cachemaxfilesize ' +
        'cacheminfilesize cachenegotiateddocs cacheroot cachestorenostore cachestoreprivate ' +
        'cgimapextension charsetdefault charsetoptions charsetsourceenc checkcaseonly ' +
        'checkspelling chrootdir contentdigest cookiedomain cookieexpires cookielog ' +
        'cookiename cookiestyle cookietracking coredumpdirectory customlog dav ' +
        'davdepthinfinity davgenericlockdb davlockdb davmintimeout dbdexptime dbdkeep ' +
        'dbdmax dbdmin dbdparams dbdpersist dbdpreparesql dbdriver defaulticon ' +
        'defaultlanguage defaulttype deflatebuffersize deflatecompressionlevel ' +
        'deflatefilternote deflatememlevel deflatewindowsize deny directoryindex ' +
        'directorymatch directoryslash documentroot dumpioinput dumpiologlevel dumpiooutput ' +
        'enableexceptionhook enablemmap enablesendfile errordocument errorlog example ' +
        'expiresactive expiresbytype expiresdefault extendedstatus extfilterdefine ' +
        'extfilteroptions fileetag filterchain filterdeclare filterprotocol filterprovider ' +
        'filtertrace forcelanguagepriority forcetype forensiclog gracefulshutdowntimeout ' +
        'group header headername hostnamelookups identitycheck identitychecktimeout ' +
        'imapbase imapdefault imapmenu include indexheadinsert indexignore indexoptions ' +
        'indexorderdefault indexstylesheet isapiappendlogtoerrors isapiappendlogtoquery ' +
        'isapicachefile isapifakeasync isapilognotsupported isapireadaheadbuffer keepalive ' +
        'keepalivetimeout languagepriority ldapcacheentries ldapcachettl ' +
        'ldapconnectiontimeout ldapopcacheentries ldapopcachettl ldapsharedcachefile ' +
        'ldapsharedcachesize ldaptrustedclientcert ldaptrustedglobalcert ldaptrustedmode ' +
        'ldapverifyservercert limitinternalrecursion limitrequestbody limitrequestfields ' +
        'limitrequestfieldsize limitrequestline limitxmlrequestbody listen listenbacklog ' +
        'loadfile loadmodule lockfile logformat loglevel maxclients maxkeepaliverequests ' +
        'maxmemfree maxrequestsperchild maxrequestsperthread maxspareservers maxsparethreads ' +
        'maxthreads mcachemaxobjectcount mcachemaxobjectsize mcachemaxstreamingbuffer ' +
        'mcacheminobjectsize mcacheremovalalgorithm mcachesize metadir metafiles metasuffix ' +
        'mimemagicfile minspareservers minsparethreads mmapfile mod_gzip_on ' +
        'mod_gzip_add_header_count mod_gzip_keep_workfiles mod_gzip_dechunk ' +
        'mod_gzip_min_http mod_gzip_minimum_file_size mod_gzip_maximum_file_size ' +
        'mod_gzip_maximum_inmem_size mod_gzip_temp_dir mod_gzip_item_include ' +
        'mod_gzip_item_exclude mod_gzip_command_version mod_gzip_can_negotiate ' +
        'mod_gzip_handle_methods mod_gzip_static_suffix mod_gzip_send_vary ' +
        'mod_gzip_update_static modmimeusepathinfo multiviewsmatch namevirtualhost noproxy ' +
        'nwssltrustedcerts nwsslupgradeable options order passenv pidfile protocolecho ' +
        'proxybadheader proxyblock proxydomain proxyerroroverride proxyftpdircharset ' +
        'proxyiobuffersize proxymaxforwards proxypass proxypassinterpolateenv ' +
        'proxypassmatch proxypassreverse proxypassreversecookiedomain ' +
        'proxypassreversecookiepath proxypreservehost proxyreceivebuffersize proxyremote ' +
        'proxyremotematch proxyrequests proxyset proxystatus proxytimeout proxyvia ' +
        'readmename receivebuffersize redirect redirectmatch redirectpermanent ' +
        'redirecttemp removecharset removeencoding removehandler removeinputfilter ' +
        'removelanguage removeoutputfilter removetype requestheader require rewritebase ' +
        'rewritecond rewriteengine rewritelock rewritelog rewriteloglevel rewritemap ' +
        'rewriteoptions rewriterule rlimitcpu rlimitmem rlimitnproc satisfy scoreboardfile ' +
        'script scriptalias scriptaliasmatch scriptinterpretersource scriptlog ' +
        'scriptlogbuffer scriptloglength scriptsock securelisten seerequesttail ' +
        'sendbuffersize serveradmin serveralias serverlimit servername serverpath ' +
        'serverroot serversignature servertokens setenv setenvif setenvifnocase sethandler ' +
        'setinputfilter setoutputfilter ssienableaccess ssiendtag ssierrormsg ssistarttag ' +
        'ssitimeformat ssiundefinedecho sslcacertificatefile sslcacertificatepath ' +
        'sslcadnrequestfile sslcadnrequestpath sslcarevocationfile sslcarevocationpath ' +
        'sslcertificatechainfile sslcertificatefile sslcertificatekeyfile sslciphersuite ' +
        'sslcryptodevice sslengine sslhonorciperorder sslmutex ssloptions ' +
        'sslpassphrasedialog sslprotocol sslproxycacertificatefile ' +
        'sslproxycacertificatepath sslproxycarevocationfile sslproxycarevocationpath ' +
        'sslproxyciphersuite sslproxyengine sslproxymachinecertificatefile ' +
        'sslproxymachinecertificatepath sslproxyprotocol sslproxyverify ' +
        'sslproxyverifydepth sslrandomseed sslrequire sslrequiressl sslsessioncache ' +
        'sslsessioncachetimeout sslusername sslverifyclient sslverifydepth startservers ' +
        'startthreads substitute suexecusergroup threadlimit threadsperchild ' +
        'threadstacksize timeout traceenable transferlog typesconfig unsetenv ' +
        'usecanonicalname usecanonicalphysicalport user userdir virtualdocumentroot ' +
        'virtualdocumentrootip virtualscriptalias virtualscriptaliasip ' +
        'win32disableacceptex xbithack',
      literal: 'on off'
    },
    contains: [
      hljs.HASH_COMMENT_MODE,
      {
        className: 'sqbracket',
        begin: '\\s\\[', end: '\\]$'
      },
      {
        className: 'cbracket',
        begin: '[\\$%]\\{', end: '\\}',
        contains: ['self', NUMBER]
      },
      NUMBER,
      {className: 'tag', begin: '</?', end: '>'},
      hljs.QUOTE_STRING_MODE
    ]
  };
};