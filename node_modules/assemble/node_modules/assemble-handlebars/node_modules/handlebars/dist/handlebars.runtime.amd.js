/*!

 handlebars v1.3.0

Copyright (C) 2011 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

@license
*/

define(
  'handlebars/safe-string',["exports"],
  function(__exports__) {
    
    // Build out our basic SafeString type
    function SafeString(string) {
      this.string = string;
    }

    SafeString.prototype.toString = function() {
      return "" + this.string;
    };

    __exports__["default"] = SafeString;
  });
define(
  'handlebars/utils',["./safe-string","exports"],
  function(__dependency1__, __exports__) {
    
    /*jshint -W004 */
    var SafeString = __dependency1__["default"];

    var escape = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#x27;",
      "`": "&#x60;"
    };

    var badChars = /[&<>"'`]/g;
    var possible = /[&<>"'`]/;

    function escapeChar(chr) {
      return escape[chr] || "&amp;";
    }

    function extend(obj, value) {
      for(var key in value) {
        if(Object.prototype.hasOwnProperty.call(value, key)) {
          obj[key] = value[key];
        }
      }
    }

    __exports__.extend = extend;var toString = Object.prototype.toString;
    __exports__.toString = toString;
    // Sourced from lodash
    // https://github.com/bestiejs/lodash/blob/master/LICENSE.txt
    var isFunction = function(value) {
      return typeof value === 'function';
    };
    // fallback for older versions of Chrome and Safari
    if (isFunction(/x/)) {
      isFunction = function(value) {
        return typeof value === 'function' && toString.call(value) === '[object Function]';
      };
    }
    var isFunction;
    __exports__.isFunction = isFunction;
    var isArray = Array.isArray || function(value) {
      return (value && typeof value === 'object') ? toString.call(value) === '[object Array]' : false;
    };
    __exports__.isArray = isArray;

    function escapeExpression(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof SafeString) {
        return string.toString();
      } else if (!string && string !== 0) {
        return "";
      }

      // Force a string conversion as this will be done by the append regardless and
      // the regex test will do this transparently behind the scenes, causing issues if
      // an object's to string has escaped characters in it.
      string = "" + string;

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    }

    __exports__.escapeExpression = escapeExpression;function isEmpty(value) {
      if (!value && value !== 0) {
        return true;
      } else if (isArray(value) && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }

    __exports__.isEmpty = isEmpty;
  });
define(
  'handlebars/exception',["exports"],
  function(__exports__) {
    

    var errorProps = ['description', 'fileName', 'lineNumber', 'message', 'name', 'number', 'stack'];

    function Exception(message, node) {
      var line;
      if (node && node.firstLine) {
        line = node.firstLine;

        message += ' - ' + line + ':' + node.firstColumn;
      }

      var tmp = Error.prototype.constructor.call(this, message);

      // Unfortunately errors are not enumerable in Chrome (at least), so `for prop in tmp` doesn't work.
      for (var idx = 0; idx < errorProps.length; idx++) {
        this[errorProps[idx]] = tmp[errorProps[idx]];
      }

      if (line) {
        this.lineNumber = line;
        this.column = node.firstColumn;
      }
    }

    Exception.prototype = new Error();

    __exports__["default"] = Exception;
  });
define(
  'handlebars/base',["./utils","./exception","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    
    var Utils = __dependency1__;
    var Exception = __dependency2__["default"];

    var VERSION = "1.3.0";
    __exports__.VERSION = VERSION;var COMPILER_REVISION = 4;
    __exports__.COMPILER_REVISION = COMPILER_REVISION;
    var REVISION_CHANGES = {
      1: '<= 1.0.rc.2', // 1.0.rc.2 is actually rev2 but doesn't report it
      2: '== 1.0.0-rc.3',
      3: '== 1.0.0-rc.4',
      4: '>= 1.0.0'
    };
    __exports__.REVISION_CHANGES = REVISION_CHANGES;
    var isArray = Utils.isArray,
        isFunction = Utils.isFunction,
        toString = Utils.toString,
        objectType = '[object Object]';

    function HandlebarsEnvironment(helpers, partials) {
      this.helpers = helpers || {};
      this.partials = partials || {};

      registerDefaultHelpers(this);
    }

    __exports__.HandlebarsEnvironment = HandlebarsEnvironment;HandlebarsEnvironment.prototype = {
      constructor: HandlebarsEnvironment,

      logger: logger,
      log: log,

      registerHelper: function(name, fn, inverse) {
        if (toString.call(name) === objectType) {
          if (inverse || fn) { throw new Exception('Arg not supported with multiple helpers'); }
          Utils.extend(this.helpers, name);
        } else {
          if (inverse) { fn.not = inverse; }
          this.helpers[name] = fn;
        }
      },

      registerPartial: function(name, str) {
        if (toString.call(name) === objectType) {
          Utils.extend(this.partials,  name);
        } else {
          this.partials[name] = str;
        }
      }
    };

    function registerDefaultHelpers(instance) {
      instance.registerHelper('helperMissing', function(arg) {
        if(arguments.length === 2) {
          return undefined;
        } else {
          throw new Exception("Missing helper: '" + arg + "'");
        }
      });

      instance.registerHelper('blockHelperMissing', function(context, options) {
        var inverse = options.inverse || function() {}, fn = options.fn;

        if (isFunction(context)) { context = context.call(this); }

        if(context === true) {
          return fn(this);
        } else if(context === false || context == null) {
          return inverse(this);
        } else if (isArray(context)) {
          if(context.length > 0) {
            return instance.helpers.each(context, options);
          } else {
            return inverse(this);
          }
        } else {
          return fn(context);
        }
      });

      instance.registerHelper('each', function(context, options) {
        var fn = options.fn, inverse = options.inverse;
        var i = 0, ret = "", data;

        if (isFunction(context)) { context = context.call(this); }

        if (options.data) {
          data = createFrame(options.data);
        }

        if(context && typeof context === 'object') {
          if (isArray(context)) {
            for(var j = context.length; i<j; i++) {
              if (data) {
                data.index = i;
                data.first = (i === 0);
                data.last  = (i === (context.length-1));
              }
              ret = ret + fn(context[i], { data: data });
            }
          } else {
            for(var key in context) {
              if(context.hasOwnProperty(key)) {
                if(data) { 
                  data.key = key; 
                  data.index = i;
                  data.first = (i === 0);
                }
                ret = ret + fn(context[key], {data: data});
                i++;
              }
            }
          }
        }

        if(i === 0){
          ret = inverse(this);
        }

        return ret;
      });

      instance.registerHelper('if', function(conditional, options) {
        if (isFunction(conditional)) { conditional = conditional.call(this); }

        // Default behavior is to render the positive path if the value is truthy and not empty.
        // The `includeZero` option may be set to treat the condtional as purely not empty based on the
        // behavior of isEmpty. Effectively this determines if 0 is handled by the positive path or negative.
        if ((!options.hash.includeZero && !conditional) || Utils.isEmpty(conditional)) {
          return options.inverse(this);
        } else {
          return options.fn(this);
        }
      });

      instance.registerHelper('unless', function(conditional, options) {
        return instance.helpers['if'].call(this, conditional, {fn: options.inverse, inverse: options.fn, hash: options.hash});
      });

      instance.registerHelper('with', function(context, options) {
        if (isFunction(context)) { context = context.call(this); }

        if (!Utils.isEmpty(context)) return options.fn(context);
      });

      instance.registerHelper('log', function(context, options) {
        var level = options.data && options.data.level != null ? parseInt(options.data.level, 10) : 1;
        instance.log(level, context);
      });
    }

    var logger = {
      methodMap: { 0: 'debug', 1: 'info', 2: 'warn', 3: 'error' },

      // State enum
      DEBUG: 0,
      INFO: 1,
      WARN: 2,
      ERROR: 3,
      level: 3,

      // can be overridden in the host environment
      log: function(level, obj) {
        if (logger.level <= level) {
          var method = logger.methodMap[level];
          if (typeof console !== 'undefined' && console[method]) {
            console[method].call(console, obj);
          }
        }
      }
    };
    __exports__.logger = logger;
    function log(level, obj) { logger.log(level, obj); }

    __exports__.log = log;var createFrame = function(object) {
      var obj = {};
      Utils.extend(obj, object);
      return obj;
    };
    __exports__.createFrame = createFrame;
  });
define(
  'handlebars/runtime',["./utils","./exception","./base","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __exports__) {
    
    var Utils = __dependency1__;
    var Exception = __dependency2__["default"];
    var COMPILER_REVISION = __dependency3__.COMPILER_REVISION;
    var REVISION_CHANGES = __dependency3__.REVISION_CHANGES;

    function checkRevision(compilerInfo) {
      var compilerRevision = compilerInfo && compilerInfo[0] || 1,
          currentRevision = COMPILER_REVISION;

      if (compilerRevision !== currentRevision) {
        if (compilerRevision < currentRevision) {
          var runtimeVersions = REVISION_CHANGES[currentRevision],
              compilerVersions = REVISION_CHANGES[compilerRevision];
          throw new Exception("Template was precompiled with an older version of Handlebars than the current runtime. "+
                "Please update your precompiler to a newer version ("+runtimeVersions+") or downgrade your runtime to an older version ("+compilerVersions+").");
        } else {
          // Use the embedded version info since the runtime doesn't know about this revision yet
          throw new Exception("Template was precompiled with a newer version of Handlebars than the current runtime. "+
                "Please update your runtime to a newer version ("+compilerInfo[1]+").");
        }
      }
    }

    __exports__.checkRevision = checkRevision;// TODO: Remove this line and break up compilePartial

    function template(templateSpec, env) {
      if (!env) {
        throw new Exception("No environment passed to template");
      }

      // Note: Using env.VM references rather than local var references throughout this section to allow
      // for external users to override these as psuedo-supported APIs.
      var invokePartialWrapper = function(partial, name, context, helpers, partials, data) {
        var result = env.VM.invokePartial.apply(this, arguments);
        if (result != null) { return result; }

        if (env.compile) {
          var options = { helpers: helpers, partials: partials, data: data };
          partials[name] = env.compile(partial, { data: data !== undefined }, env);
          return partials[name](context, options);
        } else {
          throw new Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
        }
      };

      // Just add water
      var container = {
        escapeExpression: Utils.escapeExpression,
        invokePartial: invokePartialWrapper,
        programs: [],
        program: function(i, fn, data) {
          var programWrapper = this.programs[i];
          if(data) {
            programWrapper = program(i, fn, data);
          } else if (!programWrapper) {
            programWrapper = this.programs[i] = program(i, fn);
          }
          return programWrapper;
        },
        merge: function(param, common) {
          var ret = param || common;

          if (param && common && (param !== common)) {
            ret = {};
            Utils.extend(ret, common);
            Utils.extend(ret, param);
          }
          return ret;
        },
        programWithDepth: env.VM.programWithDepth,
        noop: env.VM.noop,
        compilerInfo: null
      };

      return function(context, options) {
        options = options || {};
        var namespace = options.partial ? options : env,
            helpers,
            partials;

        if (!options.partial) {
          helpers = options.helpers;
          partials = options.partials;
        }
        var result = templateSpec.call(
              container,
              namespace, context,
              helpers,
              partials,
              options.data);

        if (!options.partial) {
          env.VM.checkRevision(container.compilerInfo);
        }

        return result;
      };
    }

    __exports__.template = template;function programWithDepth(i, fn, data /*, $depth */) {
      var args = Array.prototype.slice.call(arguments, 3);

      var prog = function(context, options) {
        options = options || {};

        return fn.apply(this, [context, options.data || data].concat(args));
      };
      prog.program = i;
      prog.depth = args.length;
      return prog;
    }

    __exports__.programWithDepth = programWithDepth;function program(i, fn, data) {
      var prog = function(context, options) {
        options = options || {};

        return fn(context, options.data || data);
      };
      prog.program = i;
      prog.depth = 0;
      return prog;
    }

    __exports__.program = program;function invokePartial(partial, name, context, helpers, partials, data) {
      var options = { partial: true, helpers: helpers, partials: partials, data: data };

      if(partial === undefined) {
        throw new Exception("The partial " + name + " could not be found");
      } else if(partial instanceof Function) {
        return partial(context, options);
      }
    }

    __exports__.invokePartial = invokePartial;function noop() { return ""; }

    __exports__.noop = noop;
  });
define(
  'handlebars.runtime',["./handlebars/base","./handlebars/safe-string","./handlebars/exception","./handlebars/utils","./handlebars/runtime","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    
    /*globals Handlebars: true */
    var base = __dependency1__;

    // Each of these augment the Handlebars object. No need to setup here.
    // (This is done to easily share code between commonjs and browse envs)
    var SafeString = __dependency2__["default"];
    var Exception = __dependency3__["default"];
    var Utils = __dependency4__;
    var runtime = __dependency5__;

    // For compatibility and usage outside of module systems, make the Handlebars object a namespace
    var create = function() {
      var hb = new base.HandlebarsEnvironment();

      Utils.extend(hb, base);
      hb.SafeString = SafeString;
      hb.Exception = Exception;
      hb.Utils = Utils;

      hb.VM = runtime;
      hb.template = function(spec) {
        return runtime.template(spec, hb);
      };

      return hb;
    };

    var Handlebars = create();
    Handlebars.create = create;

    __exports__["default"] = Handlebars;
  });