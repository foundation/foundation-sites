var http = require( "http" ),
	querystring = require( "querystring" ),
	util = require( "util" ),
	userAgent = getUA();

function getUA() {
	var os = require( "os" ),
		version = require( "../package.json" ).version;
	return os.platform() + "/" + os.release() + " " +
		"node/" + process.versions.node + " " +
		"node-browserstack/" + version;
}

function extend( a, b ) {
	for ( var p in b ) {
		a[ p ] = b[ p ];
	}

	return a;
}

function Client( settings ) {
	if ( !settings.username ) {
		throw new Error( "Username is required." );
	}
	if ( !settings.password ) {
		throw new Error( "Password is required." );
	}

	extend( this, settings );
	this.authHeader = "Basic " +
		new Buffer( this.username + ":" + this.password ).toString( "base64" );

	this.server = extend({
		host: "api.browserstack.com",
		port: 80
	}, this.server || {});
}



// public API
extend( Client.prototype, {
	getBrowsers: function( fn ) {
		this._getBrowsers( function( error, browsers ) {
			if ( !error ) {
				this.updateLatest( browsers );
			}

			fn( error, browsers );
		}.bind( this ) );
	},

	createWorker: function( options, fn ) {
		if ( options[ this.versionField ] === "latest" ) {
			return this.getLatest( options, function( error, version ) {
				if ( error ) {
					return fn( error );
				}

				options = extend( {}, options );
				options[ this.versionField ] = version;
				this.createWorker( options, fn );
			}.bind( this ) );
		}

		var data = querystring.stringify( options );
		this.request({
			path: this.path( "/worker" ),
			method: "POST"
		}, data, fn );
	},

	getWorker: function( id, fn ) {
		this.request({
			path: this.path( "/worker/" + id )
		}, fn );
	},

	terminateWorker: function( id, fn ) {
		this.request({
			path: this.path( "/worker/" + id ),
			method: "DELETE"
		}, fn );
	},

	getWorkers: function( fn ) {
		this.request({
			path: this.path( "/workers" )
		}, fn );
	},

	getLatest: function( browser, fn ) {
		var latest = this.latest,
			browserId = this.getBrowserId( browser );

		if ( typeof browser === "function" ) {
			fn = browser;
			browser = null;
		}

		// there may be a lot of createWorker() calls with "latest" version
		// so minimize the number of calls to getBrowsers()
		if ( this.latestPending ) {
			return setTimeout(function() {
				this.getLatest( browser, fn );
			}.bind( this ), 50 );
		}

		// only cache browsers for one day
		if ( !latest || this.latestUpdate < (new Date() - 864e5) ) {
			this.latestPending = true;
			return this.getBrowsers(function( error ) {
				this.latestPending = false;

				if ( error ) {
					return fn( error );
				}

				this.getLatest( browser, fn );
			}.bind( this ) );
		}

		process.nextTick(function() {
			fn( null, browser ? latest[ browserId ] : extend( {}, latest ) );
		});
	},

	takeScreenshot: function( id, fn ) {
		this.request({
			path: this.path( "/worker/" + id + "/screenshot.json" )
		}, fn );
	}
});



// internal API
extend( Client.prototype, {
	latest: null,
	latestUpdate: 0,
	latestPending: false,

	path: function( path ) {
		return "/" + this.version + path;
	},

	request: function( options, data, fn ) {
		if ( typeof data === "function" ) {
			fn = data;
			data = null;
		}
		fn = fn || function() {};

		var req = http.request( extend({
			host: this.server.host,
			port: this.server.port,
			method: "GET",
			headers: {
				authorization: this.authHeader,
				"user-agent": userAgent,
				"content-length": typeof data === "string" ? data.length : 0
			}
		}, options ), function( res ) {
			var response = "";
			res.setEncoding( "utf8" );
			res.on( "data", function( chunk ) {
				response += chunk;
			});
			res.on( "end", function() {
				if ( res.statusCode !== 200 ) {
					var message;
					if ( res.headers[ "content-type" ].indexOf( "json" ) !== -1 ) {
						response = JSON.parse( response );
						message = response.message;
						message += " - " + response.errors.map(function( error ) {
							return "`" + error.field + "` " + error.code;
						}).join( ", " );
					} else {
						message = response;
					}
					if ( !message && res.statusCode === 403 ) {
						message = "Forbidden";
					}
					fn( new Error( message ) );
				} else {
					fn( null, JSON.parse( response ) );
				}
			});
		});

		if ( data ) {
			req.write( data );
		}
		req.end();
	},

	updateLatest: function( browsers ) {
		var latest = this.latest = {},
			getBrowserId = this.getBrowserId,
			versionField = this.versionField;

		this.latestUpdate = new Date();
		browsers.forEach(function( browser ) {
			var version = browser[ versionField ],
				browserId = getBrowserId( browser );

			// ignore devices that don't have versions
			if ( !version ) {
				return;
			}

			// ignore pre-release versions
			if ( /\s/.test( version ) ) {
				return;
			}

			if ( parseFloat( version ) >
					(parseFloat( latest[ browserId ] ) || 0) ) {
				latest[ browserId ] = version;
			}
		});
	}
});



// Versions

Client.versions = {};
Client.latestVersion = 0;
Client.createVersion = function( version, prototype ) {
	function Version( settings ) {
		Client.call( this, settings );
	}
	util.inherits( Version, Client );

	Version.prototype.version = version;
	extend( Version.prototype, prototype );

	Client.versions[ version ] = Version;
	Client.latestVersion = Math.max( Client.latestVersion, version );
};

Client.createVersion( 1, {
	versionField: "version",

	_getBrowsers: function( fn ) {
		this.request({
			path: this.path( "/browsers" )
		}, fn );
	},

	getBrowserId: function( browser ) {
		return browser.browser;
	}
});

Client.createVersion( 2, {
	versionField: "version",

	_getBrowsers: function( fn ) {
		this.request({
			path: this.path( "/browsers" )
		}, function( error, osBrowsers ) {
			if ( error ) {
				return fn( error );
			}

			fn( null, [].concat.apply( [],
				Object.keys( osBrowsers ).map(function( os ) {
					return osBrowsers[ os ].map(function( browser ) {
						browser.os = os;
						return browser;
					});
				})
			));
		});
	},

	getBrowserId: function( browser ) {
		return browser.os + ":" + (browser.browser || browser.device);
	}
});

Client.createVersion( 3, {
	versionField: "browser_version",

	_getBrowsers: function( fn ) {
		this.request({
			path: this.path( "/browsers?flat=true" )
		}, fn );
	},

	getBrowserId: function( browser ) {
		var id = browser.os + ":" + browser.os_version + ":" + browser.browser;
		if ( browser.device ) {
			id += ":" + browser.device;
		}

		return id;
	},

	getApiStatus: function( fn ) {
		this.request({
			path: this.path( "/status" )
		}, fn );
	}
});


module.exports = {
	createClient: function( settings ) {
		var Version = Client.versions[ settings.version || Client.latestVersion ];
		if ( !Version ) {
			throw new Error( "Invalid version" );
		}

		return new Version( settings );
	}
};
