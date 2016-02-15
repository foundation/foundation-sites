(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationCore = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    "use strict";

    var FOUNDATION_VERSION = '6.2.0-rc.1';
    var Foundation = {
      version: FOUNDATION_VERSION,
      _plugins: {},
      _uuids: [],
      rtl: function () {
        return $('html').attr('dir') === 'rtl';
      },
      plugin: function (plugin, name) {
        var className = name || functionName(plugin);
        var attrName = hyphenate(className);
        this._plugins[attrName] = this[className] = plugin;
      },
      registerPlugin: function (plugin, name) {
        var pluginName = name ? hyphenate(name) : functionName(plugin.constructor).toLowerCase();
        plugin.uuid = this.GetYoDigits(6, pluginName);

        if (!plugin.$element.attr('data-' + pluginName)) {
          plugin.$element.attr('data-' + pluginName, plugin.uuid);
        }

        if (!plugin.$element.data('zfPlugin')) {
          plugin.$element.data('zfPlugin', plugin);
        }

        plugin.$element.trigger('init.zf.' + pluginName);

        this._uuids.push(plugin.uuid);

        return;
      },
      unregisterPlugin: function (plugin) {
        var pluginName = hyphenate(functionName(plugin.$element.data('zfPlugin').constructor));

        this._uuids.splice(this._uuids.indexOf(plugin.uuid), 1);

        plugin.$element.removeAttr('data-' + pluginName).removeData('zfPlugin').trigger('destroyed.zf.' + pluginName);

        for (var prop in plugin) {
          plugin[prop] = null;
        }

        return;
      },
      reInit: function (plugins) {
        var isJQ = plugins instanceof $;

        try {
          if (isJQ) {
            plugins.each(function () {
              $(this).data('zfPlugin')._init();
            });
          } else {
            var type = typeof plugins,
                _this = this,
                fns = {
              'object': function (plgs) {
                plgs.forEach(function (p) {
                  p = hyphenate(p);
                  $('[data-' + p + ']').foundation('_init');
                });
              },
              'string': function () {
                plugins = hyphenate(plugins);
                $('[data-' + plugins + ']').foundation('_init');
              },
              'undefined': function () {
                this['object'](Object.keys(_this._plugins));
              }
            };

            fns[type](plugins);
          }
        } catch (err) {
          console.error(err);
        } finally {
          return plugins;
        }
      },
      GetYoDigits: function (length, namespace) {
        length = length || 6;
        return Math.round(Math.pow(36, length + 1) - Math.random() * Math.pow(36, length)).toString(36).slice(1) + (namespace ? '-' + namespace : '');
      },
      reflow: function (elem, plugins) {
        if (typeof plugins === 'undefined') {
          plugins = Object.keys(this._plugins);
        } else if (typeof plugins === 'string') {
          plugins = [plugins];
        }

        var _this = this;

        $.each(plugins, function (i, name) {
          var plugin = _this._plugins[name];
          var $elem = $(elem).find('[data-' + name + ']').addBack('[data-' + name + ']');
          $elem.each(function () {
            var $el = $(this),
                opts = {};

            if ($el.data('zfPlugin')) {
              console.warn("Tried to initialize " + name + " on an element that already has a Foundation plugin.");
              return;
            }

            if ($el.attr('data-options')) {
              var thing = $el.attr('data-options').split(';').forEach(function (e, i) {
                var opt = e.split(':').map(function (el) {
                  return el.trim();
                });
                if (opt[0]) opts[opt[0]] = parseValue(opt[1]);
              });
            }

            try {
              $el.data('zfPlugin', new plugin($(this), opts));
            } catch (er) {
              console.error(er);
            } finally {
              return;
            }
          });
        });
      },
      getFnName: functionName,
      transitionend: function ($elem) {
        var transitions = {
          'transition': 'transitionend',
          'WebkitTransition': 'webkitTransitionEnd',
          'MozTransition': 'transitionend',
          'OTransition': 'otransitionend'
        };
        var elem = document.createElement('div'),
            end;

        for (var t in transitions) {
          if (typeof elem.style[t] !== 'undefined') {
            end = transitions[t];
          }
        }

        if (end) {
          return end;
        } else {
          end = setTimeout(function () {
            $elem.triggerHandler('transitionend', [$elem]);
          }, 1);
          return 'transitionend';
        }
      }
    };
    Foundation.util = {
      throttle: function (func, delay) {
        var timer = null;
        return function () {
          var context = this,
              args = arguments;

          if (timer === null) {
            timer = setTimeout(function () {
              func.apply(context, args);
              timer = null;
            }, delay);
          }
        };
      }
    };

    var foundation = function (method) {
      var type = typeof method,
          $meta = $('meta.foundation-mq'),
          $noJS = $('.no-js');

      if (!$meta.length) {
        $('<meta class="foundation-mq">').appendTo(document.head);
      }

      if ($noJS.length) {
        $noJS.removeClass('no-js');
      }

      if (type === 'undefined') {
        Foundation.MediaQuery._init();

        Foundation.reflow(this);
      } else if (type === 'string') {
        var args = Array.prototype.slice.call(arguments, 1);
        var plugClass = this.data('zfPlugin');

        if (plugClass !== undefined && plugClass[method] !== undefined) {
          if (this.length === 1) {
            plugClass[method].apply(plugClass, args);
          } else {
            this.each(function (i, el) {
              plugClass[method].apply($(el).data('zfPlugin'), args);
            });
          }
        } else {
          throw new ReferenceError("We're sorry, '" + method + "' is not an available method for " + (plugClass ? functionName(plugClass) : 'this element') + '.');
        }
      } else {
        throw new TypeError('We\'re sorry, ' + type + ' is not a valid parameter. You must use a string representing the method you wish to invoke.');
      }

      return this;
    };

    window.Foundation = Foundation;
    $.fn.foundation = foundation;

    (function () {
      if (!Date.now || !window.Date.now) window.Date.now = Date.now = function () {
        return new Date().getTime();
      };
      var vendors = ['webkit', 'moz'];

      for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame'];
      }

      if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;

        window.requestAnimationFrame = function (callback) {
          var now = Date.now();
          var nextTime = Math.max(lastTime + 16, now);
          return setTimeout(function () {
            callback(lastTime = nextTime);
          }, nextTime - now);
        };

        window.cancelAnimationFrame = clearTimeout;
      }

      if (!window.performance || !window.performance.now) {
        window.performance = {
          start: Date.now(),
          now: function () {
            return Date.now() - this.start;
          }
        };
      }
    })();

    if (!Function.prototype.bind) {
      Function.prototype.bind = function (oThis) {
        if (typeof this !== 'function') {
          throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
        }

        var aArgs = Array.prototype.slice.call(arguments, 1),
            fToBind = this,
            fNOP = function () {},
            fBound = function () {
          return fToBind.apply(this instanceof fNOP ? this : oThis, aArgs.concat(Array.prototype.slice.call(arguments)));
        };

        if (this.prototype) {
          fNOP.prototype = this.prototype;
        }

        fBound.prototype = new fNOP();
        return fBound;
      };
    }

    function functionName(fn) {
      if (Function.prototype.name === undefined) {
        var funcNameRegex = /function\s([^(]{1,})\(/;
        var results = funcNameRegex.exec(fn.toString());
        return results && results.length > 1 ? results[1].trim() : "";
      } else if (fn.prototype === undefined) {
        return fn.constructor.name;
      } else {
        return fn.prototype.constructor.name;
      }
    }

    function parseValue(str) {
      if (/true/.test(str)) return true;else if (/false/.test(str)) return false;else if (!isNaN(str * 1)) return parseFloat(str);
      return str;
    }

    function hyphenate(str) {
      return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    }
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilBox = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    Foundation.Box = {
      ImNotTouchingYou: ImNotTouchingYou,
      GetDimensions: GetDimensions,
      GetOffsets: GetOffsets
    };

    function ImNotTouchingYou(element, parent, lrOnly, tbOnly) {
      var eleDims = GetDimensions(element),
          top,
          bottom,
          left,
          right;

      if (parent) {
        var parDims = GetDimensions(parent);
        bottom = eleDims.offset.top + eleDims.height <= parDims.height + parDims.offset.top;
        top = eleDims.offset.top >= parDims.offset.top;
        left = eleDims.offset.left >= parDims.offset.left;
        right = eleDims.offset.left + eleDims.width <= parDims.width;
      } else {
        bottom = eleDims.offset.top + eleDims.height <= eleDims.windowDims.height + eleDims.windowDims.offset.top;
        top = eleDims.offset.top >= eleDims.windowDims.offset.top;
        left = eleDims.offset.left >= eleDims.windowDims.offset.left;
        right = eleDims.offset.left + eleDims.width <= eleDims.windowDims.width;
      }

      var allDirs = [bottom, top, left, right];

      if (lrOnly) {
        return left === right === true;
      }

      if (tbOnly) {
        return top === bottom === true;
      }

      return allDirs.indexOf(false) === -1;
    }

    ;

    function GetDimensions(elem, test) {
      elem = elem.length ? elem[0] : elem;

      if (elem === window || elem === document) {
        throw new Error("I'm sorry, Dave. I'm afraid I can't do that.");
      }

      var rect = elem.getBoundingClientRect(),
          parRect = elem.parentNode.getBoundingClientRect(),
          winRect = document.body.getBoundingClientRect(),
          winY = window.pageYOffset,
          winX = window.pageXOffset;
      return {
        width: rect.width,
        height: rect.height,
        offset: {
          top: rect.top + winY,
          left: rect.left + winX
        },
        parentDims: {
          width: parRect.width,
          height: parRect.height,
          offset: {
            top: parRect.top + winY,
            left: parRect.left + winX
          }
        },
        windowDims: {
          width: winRect.width,
          height: winRect.height,
          offset: {
            top: winY,
            left: winX
          }
        }
      };
    }

    function GetOffsets(element, anchor, position, vOffset, hOffset, isOverflow) {
      var $eleDims = GetDimensions(element),
          $anchorDims = anchor ? GetDimensions(anchor) : null;

      switch (position) {
        case 'top':
          return {
            left: $anchorDims.offset.left,
            top: $anchorDims.offset.top - ($eleDims.height + vOffset)
          };
          break;

        case 'left':
          return {
            left: $anchorDims.offset.left - ($eleDims.width + hOffset),
            top: $anchorDims.offset.top
          };
          break;

        case 'right':
          return {
            left: $anchorDims.offset.left + $anchorDims.width + hOffset,
            top: $anchorDims.offset.top
          };
          break;

        case 'center top':
          return {
            left: $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
            top: $anchorDims.offset.top - ($eleDims.height + vOffset)
          };
          break;

        case 'center bottom':
          return {
            left: isOverflow ? hOffset : $anchorDims.offset.left + $anchorDims.width / 2 - $eleDims.width / 2,
            top: $anchorDims.offset.top + $anchorDims.height + vOffset
          };
          break;

        case 'center left':
          return {
            left: $anchorDims.offset.left - ($eleDims.width + hOffset),
            top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
          };
          break;

        case 'center right':
          return {
            left: $anchorDims.offset.left + $anchorDims.width + hOffset + 1,
            top: $anchorDims.offset.top + $anchorDims.height / 2 - $eleDims.height / 2
          };
          break;

        case 'center':
          return {
            left: $eleDims.windowDims.offset.left + $eleDims.windowDims.width / 2 - $eleDims.width / 2,
            top: $eleDims.windowDims.offset.top + $eleDims.windowDims.height / 2 - $eleDims.height / 2
          };
          break;

        case 'reveal':
          return {
            left: ($eleDims.windowDims.width - $eleDims.width) / 2,
            top: $eleDims.windowDims.offset.top + vOffset
          };

        case 'reveal full':
          return {
            left: $eleDims.windowDims.offset.left,
            top: $eleDims.windowDims.offset.top
          };
          break;

        default:
          return {
            left: $anchorDims.offset.left,
            top: $anchorDims.offset.top + $anchorDims.height + vOffset
          };
      }
    }
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilKeyboard = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    var keyCodes = {
      9: 'TAB',
      13: 'ENTER',
      27: 'ESCAPE',
      32: 'SPACE',
      37: 'ARROW_LEFT',
      38: 'ARROW_UP',
      39: 'ARROW_RIGHT',
      40: 'ARROW_DOWN'
    };
    var commands = {};
    var Keyboard = {
      keys: getKeyCodes(keyCodes),
      parseKey: function (event) {
        var key = keyCodes[event.which || event.keyCode] || String.fromCharCode(event.which).toUpperCase();
        if (event.shiftKey) key = 'SHIFT_' + key;
        if (event.ctrlKey) key = 'CTRL_' + key;
        if (event.altKey) key = 'ALT_' + key;
        return key;
      },
      handleKey: function (event, component, functions) {
        var commandList = commands[component],
            keyCode = this.parseKey(event),
            cmds,
            command,
            fn;
        if (!commandList) return console.warn('Component not defined!');

        if (typeof commandList.ltr === 'undefined') {
          cmds = commandList;
        } else {
          if (Foundation.rtl()) cmds = $.extend({}, commandList.ltr, commandList.rtl);else cmds = $.extend({}, commandList.rtl, commandList.ltr);
        }

        command = cmds[keyCode];
        fn = functions[command];

        if (fn && typeof fn === 'function') {
          fn.apply();

          if (functions.handled || typeof functions.handled === 'function') {
            functions.handled.apply();
          }
        } else {
          if (functions.unhandled || typeof functions.unhandled === 'function') {
            functions.unhandled.apply();
          }
        }
      },
      findFocusable: function ($element) {
        return $element.find('a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]').filter(function () {
          if (!$(this).is(':visible') || $(this).attr('tabindex') < 0) {
            return false;
          }

          return true;
        });
      },
      register: function (componentName, cmds) {
        commands[componentName] = cmds;
      }
    };

    function getKeyCodes(kcs) {
      var k = {};

      for (var kc in kcs) {
        k[kcs[kc]] = kcs[kc];
      }

      return k;
    }

    Foundation.Keyboard = Keyboard;
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilMediaQuery = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    var defaultQueries = {
      'default': 'only screen',
      landscape: 'only screen and (orientation: landscape)',
      portrait: 'only screen and (orientation: portrait)',
      retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),' + 'only screen and (min--moz-device-pixel-ratio: 2),' + 'only screen and (-o-min-device-pixel-ratio: 2/1),' + 'only screen and (min-device-pixel-ratio: 2),' + 'only screen and (min-resolution: 192dpi),' + 'only screen and (min-resolution: 2dppx)'
    };
    var MediaQuery = {
      queries: [],
      current: '',
      _init: function () {
        var self = this;
        var extractedStyles = $('.foundation-mq').css('font-family');
        var namedQueries;
        namedQueries = parseStyleToObject(extractedStyles);

        for (var key in namedQueries) {
          self.queries.push({
            name: key,
            value: 'only screen and (min-width: ' + namedQueries[key] + ')'
          });
        }

        this.current = this._getCurrentSize();

        this._watcher();
      },
      atLeast: function (size) {
        var query = this.get(size);

        if (query) {
          return window.matchMedia(query).matches;
        }

        return false;
      },
      get: function (size) {
        for (var i in this.queries) {
          var query = this.queries[i];
          if (size === query.name) return query.value;
        }

        return null;
      },
      _getCurrentSize: function () {
        var matched;

        for (var i in this.queries) {
          var query = this.queries[i];

          if (window.matchMedia(query.value).matches) {
            matched = query;
          }
        }

        if (typeof matched === 'object') {
          return matched.name;
        } else {
          return matched;
        }
      },
      _watcher: function () {
        var _this = this;

        $(window).on('resize.zf.mediaquery', function () {
          var newSize = _this._getCurrentSize();

          if (newSize !== _this.current) {
            $(window).trigger('changed.zf.mediaquery', [newSize, _this.current]);
            _this.current = newSize;
          }
        });
      }
    };
    Foundation.MediaQuery = MediaQuery;
    window.matchMedia || (window.matchMedia = function () {
      'use strict';

      var styleMedia = window.styleMedia || window.media;

      if (!styleMedia) {
        var style = document.createElement('style'),
            script = document.getElementsByTagName('script')[0],
            info = null;
        style.type = 'text/css';
        style.id = 'matchmediajs-test';
        script.parentNode.insertBefore(style, script);
        info = 'getComputedStyle' in window && window.getComputedStyle(style, null) || style.currentStyle;
        styleMedia = {
          matchMedium: function (media) {
            var text = '@media ' + media + '{ #matchmediajs-test { width: 1px; } }';

            if (style.styleSheet) {
              style.styleSheet.cssText = text;
            } else {
              style.textContent = text;
            }

            return info.width === '1px';
          }
        };
      }

      return function (media) {
        return {
          matches: styleMedia.matchMedium(media || 'all'),
          media: media || 'all'
        };
      };
    }());

    function parseStyleToObject(str) {
      var styleObject = {};

      if (typeof str !== 'string') {
        return styleObject;
      }

      str = str.trim().slice(1, -1);

      if (!str) {
        return styleObject;
      }

      styleObject = str.split('&').reduce(function (ret, param) {
        var parts = param.replace(/\+/g, ' ').split('=');
        var key = parts[0];
        var val = parts[1];
        key = decodeURIComponent(key);
        val = val === undefined ? null : decodeURIComponent(val);

        if (!ret.hasOwnProperty(key)) {
          ret[key] = val;
        } else if (Array.isArray(ret[key])) {
          ret[key].push(val);
        } else {
          ret[key] = [ret[key], val];
        }

        return ret;
      }, {});
      return styleObject;
    }

    Foundation.MediaQuery = MediaQuery;
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilMotion = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    var initClasses = ['mui-enter', 'mui-leave'];
    var activeClasses = ['mui-enter-active', 'mui-leave-active'];
    var Motion = {
      animateIn: function (element, animation, cb) {
        animate(true, element, animation, cb);
      },
      animateOut: function (element, animation, cb) {
        animate(false, element, animation, cb);
      }
    };

    function Move(duration, elem, fn) {
      var anim,
          prog,
          start = null;

      function move(ts) {
        if (!start) start = window.performance.now();
        prog = ts - start;
        fn.apply(elem);

        if (prog < duration) {
          anim = window.requestAnimationFrame(move, elem);
        } else {
          window.cancelAnimationFrame(anim);
          elem.trigger('finished.zf.animate', [elem]).triggerHandler('finished.zf.animate', [elem]);
        }
      }

      anim = window.requestAnimationFrame(move);
    }

    function animate(isIn, element, animation, cb) {
      element = $(element).eq(0);
      if (!element.length) return;
      var initClass = isIn ? initClasses[0] : initClasses[1];
      var activeClass = isIn ? activeClasses[0] : activeClasses[1];
      reset();
      element.addClass(animation).css('transition', 'none');
      requestAnimationFrame(function () {
        element.addClass(initClass);
        if (isIn) element.show();
      });
      requestAnimationFrame(function () {
        element[0].offsetWidth;
        element.css('transition', '').addClass(activeClass);
      });
      element.one(Foundation.transitionend(element), finish);

      function finish() {
        if (!isIn) element.hide();
        reset();
        if (cb) cb.apply(element);
      }

      function reset() {
        element[0].style.transitionDuration = 0;
        element.removeClass(initClass + ' ' + activeClass + ' ' + animation);
      }
    }

    Foundation.Move = Move;
    Foundation.Motion = Motion;
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilNest = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    var Nest = {
      Feather: function (menu) {
        var type = arguments.length <= 1 || arguments[1] === undefined ? 'zf' : arguments[1];
        menu.attr('role', 'menubar');
        var items = menu.find('li').attr({
          'role': 'menuitem'
        }),
            subMenuClass = 'is-' + type + '-submenu',
            subItemClass = subMenuClass + '-item',
            hasSubClass = 'is-' + type + '-submenu-parent';
        menu.find('a:first').attr('tabindex', 0);
        items.each(function () {
          var $item = $(this),
              $sub = $item.children('ul');

          if ($sub.length) {
            $item.addClass(hasSubClass).attr({
              'aria-haspopup': true,
              'aria-expanded': false,
              'aria-label': $item.children('a:first').text()
            });
            $sub.addClass('submenu ' + subMenuClass).attr({
              'data-submenu': '',
              'aria-hidden': true,
              'role': 'menu'
            });
          }

          if ($item.parent('[data-submenu]').length) {
            $item.addClass('is-submenu-item ' + subItemClass);
          }
        });
        return;
      },
      Burn: function (menu, type) {
        var items = menu.find('li').removeAttr('tabindex'),
            subMenuClass = 'is-' + type + '-submenu',
            subItemClass = subMenuClass + '-item',
            hasSubClass = 'is-' + type + '-submenu-parent';
        menu.find('*').removeClass(subMenuClass + ' ' + subItemClass + ' ' + hasSubClass + ' is-submenu-item submenu is-active').removeAttr('data-submenu').css('display', '');
      }
    };
    Foundation.Nest = Nest;
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilTimerAndImageLoader = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    function Timer(elem, options, cb) {
      var _this = this,
          duration = options.duration,
          nameSpace = Object.keys(elem.data())[0] || 'timer',
          remain = -1,
          start,
          timer;

      this.isPaused = false;

      this.restart = function () {
        remain = -1;
        clearTimeout(timer);
        this.start();
      };

      this.start = function () {
        this.isPaused = false;
        clearTimeout(timer);
        remain = remain <= 0 ? duration : remain;
        elem.data('paused', false);
        start = Date.now();
        timer = setTimeout(function () {
          if (options.infinite) {
            _this.restart();
          }

          cb();
        }, remain);
        elem.trigger('timerstart.zf.' + nameSpace);
      };

      this.pause = function () {
        this.isPaused = true;
        clearTimeout(timer);
        elem.data('paused', true);
        var end = Date.now();
        remain = remain - (end - start);
        elem.trigger('timerpaused.zf.' + nameSpace);
      };
    }

    function onImagesLoaded(images, callback) {
      var self = this,
          unloaded = images.length;

      if (unloaded === 0) {
        callback();
      }

      images.each(function () {
        if (this.complete) {
          singleImageLoaded();
        } else if (typeof this.naturalWidth !== 'undefined' && this.naturalWidth > 0) {
          singleImageLoaded();
        } else {
          $(this).one('load', function () {
            singleImageLoaded();
          });
        }
      });

      function singleImageLoaded() {
        unloaded--;

        if (unloaded === 0) {
          callback();
        }
      }
    }

    Foundation.Timer = Timer;
    Foundation.onImagesLoaded = onImagesLoaded;
  }(jQuery);
});
(function (global, factory) {
	if (typeof define === "function" && define.amd) {
		define([], factory);
	} else if (typeof exports !== "undefined") {
		factory();
	} else {
		var mod = {
			exports: {}
		};
		factory();
		global.foundationUtilTouch = mod.exports;
	}
})(this, function () {
	'use strict';

	(function ($) {
		$.spotSwipe = {
			version: '1.0.0',
			enabled: 'ontouchstart' in document.documentElement,
			preventDefault: false,
			moveThreshold: 75,
			timeThreshold: 200
		};
		var startPosX,
		    startPosY,
		    startTime,
		    elapsedTime,
		    isMoving = false;

		function onTouchEnd() {
			this.removeEventListener('touchmove', onTouchMove);
			this.removeEventListener('touchend', onTouchEnd);
			isMoving = false;
		}

		function onTouchMove(e) {
			if ($.spotSwipe.preventDefault) {
				e.preventDefault();
			}

			if (isMoving) {
				var x = e.touches[0].pageX;
				var y = e.touches[0].pageY;
				var dx = startPosX - x;
				var dy = startPosY - y;
				var dir;
				elapsedTime = new Date().getTime() - startTime;

				if (Math.abs(dx) >= $.spotSwipe.moveThreshold && elapsedTime <= $.spotSwipe.timeThreshold) {
					dir = dx > 0 ? 'left' : 'right';
				}

				if (dir) {
					e.preventDefault();
					onTouchEnd.call(this);
					$(this).trigger('swipe', dir).trigger('swipe' + dir);
				}
			}
		}

		function onTouchStart(e) {
			if (e.touches.length == 1) {
				startPosX = e.touches[0].pageX;
				startPosY = e.touches[0].pageY;
				isMoving = true;
				startTime = new Date().getTime();
				this.addEventListener('touchmove', onTouchMove, false);
				this.addEventListener('touchend', onTouchEnd, false);
			}
		}

		function init() {
			this.addEventListener && this.addEventListener('touchstart', onTouchStart, false);
		}

		function teardown() {
			this.removeEventListener('touchstart', onTouchStart);
		}

		$.event.special.swipe = {
			setup: init
		};
		$.each(['left', 'up', 'down', 'right'], function () {
			$.event.special['swipe' + this] = {
				setup: function () {
					$(this).on('swipe', $.noop);
				}
			};
		});
	})(jQuery);

	!function ($) {
		$.fn.addTouch = function () {
			this.each(function (i, el) {
				$(el).bind('touchstart touchmove touchend touchcancel', function () {
					handleTouch(event);
				});
			});

			var handleTouch = function (event) {
				var touches = event.changedTouches,
				    first = touches[0],
				    eventTypes = {
					touchstart: 'mousedown',
					touchmove: 'mousemove',
					touchend: 'mouseup'
				},
				    type = eventTypes[event.type],
				    simulatedEvent;

				if ('MouseEvent' in window && typeof window.MouseEvent === 'function') {
					simulatedEvent = window.MouseEvent(type, {
						'bubbles': true,
						'cancelable': true,
						'screenX': first.screenX,
						'screenY': first.screenY,
						'clientX': first.clientX,
						'clientY': first.clientY
					});
				} else {
					simulatedEvent = document.createEvent('MouseEvent');
					simulatedEvent.initMouseEvent(type, true, true, window, 1, first.screenX, first.screenY, first.clientX, first.clientY, false, false, false, false, 0, null);
				}

				first.target.dispatchEvent(simulatedEvent);
			};
		};
	}(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationUtilTriggers = mod.exports;
  }
})(this, function () {
  'use strict';

  !function ($) {
    var MutationObserver = function () {
      var prefixes = ['WebKit', 'Moz', 'O', 'Ms', ''];

      for (var i = 0; i < prefixes.length; i++) {
        if (prefixes[i] + 'MutationObserver' in window) {
          return window[prefixes[i] + 'MutationObserver'];
        }
      }

      return false;
    }();

    var triggers = function (el, type) {
      el.data(type).split(' ').forEach(function (id) {
        $('#' + id)[type === 'close' ? 'trigger' : 'triggerHandler'](type + '.zf.trigger', [el]);
      });
    };

    $(document).on('click.zf.trigger', '[data-open]', function () {
      triggers($(this), 'open');
    });
    $(document).on('click.zf.trigger', '[data-close]', function () {
      var id = $(this).data('close');

      if (id) {
        triggers($(this), 'close');
      } else {
        $(this).trigger('close.zf.trigger');
      }
    });
    $(document).on('click.zf.trigger', '[data-toggle]', function () {
      triggers($(this), 'toggle');
    });
    $(document).on('close.zf.trigger', '[data-closable]', function (e) {
      e.stopPropagation();
      var animation = $(this).data('closable');

      if (animation !== '') {
        Foundation.Motion.animateOut($(this), animation, function () {
          $(this).trigger('closed.zf');
        });
      } else {
        $(this).fadeOut().trigger('closed.zf');
      }
    });
    $(document).on('focus.zf.trigger blur.zf.trigger', '[data-toggle-focus]', function () {
      var id = $(this).data('toggle-focus');
      $('#' + id).triggerHandler('toggle.zf.trigger', [$(this)]);
    });
    $(window).load(function () {
      checkListeners();
    });

    function checkListeners() {
      eventsListener();
      resizeListener();
      scrollListener();
      closemeListener();
    }

    function closemeListener(pluginName) {
      var yetiBoxes = $('[data-yeti-box]'),
          plugNames = ['dropdown', 'tooltip', 'reveal'];

      if (pluginName) {
        if (typeof pluginName === 'string') {
          plugNames.push(pluginName);
        } else if (typeof pluginName === 'object' && typeof pluginName[0] === 'string') {
          plugNames.concat(pluginName);
        } else {
          console.error('Plugin names must be strings');
        }
      }

      if (yetiBoxes.length) {
        var listeners = plugNames.map(function (name) {
          return 'closeme.zf.' + name;
        }).join(' ');
        $(window).off(listeners).on(listeners, function (e, pluginId) {
          var plugin = e.namespace.split('.')[0];
          var plugins = $('[data-' + plugin + ']').not('[data-yeti-box="' + pluginId + '"]');
          plugins.each(function () {
            var _this = $(this);

            _this.triggerHandler('close.zf.trigger', [_this]);
          });
        });
      }
    }

    function resizeListener(debounce) {
      var timer = undefined,
          $nodes = $('[data-resize]');

      if ($nodes.length) {
        $(window).off('resize.zf.trigger').on('resize.zf.trigger', function (e) {
          if (timer) {
            clearTimeout(timer);
          }

          timer = setTimeout(function () {
            if (!MutationObserver) {
              $nodes.each(function () {
                $(this).triggerHandler('resizeme.zf.trigger');
              });
            }

            $nodes.attr('data-events', "resize");
          }, debounce || 10);
        });
      }
    }

    function scrollListener(debounce) {
      var timer = undefined,
          $nodes = $('[data-scroll]');

      if ($nodes.length) {
        $(window).off('scroll.zf.trigger').on('scroll.zf.trigger', function (e) {
          if (timer) {
            clearTimeout(timer);
          }

          timer = setTimeout(function () {
            if (!MutationObserver) {
              $nodes.each(function () {
                $(this).triggerHandler('scrollme.zf.trigger');
              });
            }

            $nodes.attr('data-events', "scroll");
          }, debounce || 10);
        });
      }
    }

    function eventsListener() {
      if (!MutationObserver) {
        return false;
      }

      var nodes = document.querySelectorAll('[data-resize], [data-scroll], [data-mutate]');

      var listeningElementsMutation = function (mutationRecordsList) {
        var $target = $(mutationRecordsList[0].target);

        switch ($target.attr("data-events")) {
          case "resize":
            $target.triggerHandler('resizeme.zf.trigger', [$target]);
            break;

          case "scroll":
            $target.triggerHandler('scrollme.zf.trigger', [$target, window.pageYOffset]);
            break;

          default:
            return false;
        }
      };

      if (nodes.length) {
        for (var i = 0; i <= nodes.length - 1; i++) {
          var elementObserver = new MutationObserver(listeningElementsMutation);
          elementObserver.observe(nodes[i], {
            attributes: true,
            childList: false,
            characterData: false,
            subtree: false,
            attributeFilter: ["data-events"]
          });
        }
      }
    }

    Foundation.IHearYou = checkListeners;
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationAbide = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Abide = function () {
      function Abide(element) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        _classCallCheck(this, Abide);

        this.$element = element;
        this.options = $.extend({}, Abide.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Abide');
      }

      _createClass(Abide, [{
        key: '_init',
        value: function _init() {
          this.$inputs = this.$element.find('input, textarea, select').not('[data-abide-ignore]');

          this._events();
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this2 = this;

          this.$element.off('.abide').on('reset.zf.abide', function () {
            _this2.resetForm();
          }).on('submit.zf.abide', function () {
            return _this2.validateForm();
          });

          if (this.options.validateOn === 'fieldChange') {
            this.$inputs.off('change.zf.abide').on('change.zf.abide', function (e) {
              _this2.validateInput($(e.target));
            });
          }

          if (this.options.liveValidate) {
            this.$inputs.off('input.zf.abide').on('input.zf.abide', function (e) {
              _this2.validateInput($(e.target));
            });
          }
        }
      }, {
        key: '_reflow',
        value: function _reflow() {
          this._init();
        }
      }, {
        key: 'requiredCheck',
        value: function requiredCheck($el) {
          if (!$el.attr('required')) return true;
          var isGood = true;

          switch ($el[0].type) {
            case 'checkbox':
            case 'radio':
              isGood = $el[0].checked;
              break;

            case 'select':
            case 'select-one':
            case 'select-multiple':
              var opt = $el.find('option:selected');
              if (!opt.length || !opt.val()) isGood = false;
              break;

            default:
              if (!$el.val() || !$el.val().length) isGood = false;
          }

          return isGood;
        }
      }, {
        key: 'findFormError',
        value: function findFormError($el) {
          var $error = $el.siblings(this.options.formErrorSelector);

          if (!$error.length) {
            $error = $el.parent().find(this.options.formErrorSelector);
          }

          return $error;
        }
      }, {
        key: 'findLabel',
        value: function findLabel($el) {
          var id = $el[0].id;
          var $label = this.$element.find('label[for="' + id + '"]');

          if (!$label.length) {
            return $el.closest('label');
          }

          return $label;
        }
      }, {
        key: 'addErrorClasses',
        value: function addErrorClasses($el) {
          var $label = this.findLabel($el);
          var $formError = this.findFormError($el);

          if ($label.length) {
            $label.addClass(this.options.labelErrorClass);
          }

          if ($formError.length) {
            $formError.addClass(this.options.formErrorClass);
          }

          $el.addClass(this.options.inputErrorClass).attr('data-invalid', '');
        }
      }, {
        key: 'removeErrorClasses',
        value: function removeErrorClasses($el) {
          var $label = this.findLabel($el);
          var $formError = this.findFormError($el);

          if ($label.length) {
            $label.removeClass(this.options.labelErrorClass);
          }

          if ($formError.length) {
            $formError.removeClass(this.options.formErrorClass);
          }

          $el.removeClass(this.options.inputErrorClass).removeAttr('data-invalid');
        }
      }, {
        key: 'validateInput',
        value: function validateInput($el) {
          var clearRequire = this.requiredCheck($el),
              validated = false,
              customValidator = true,
              validator = $el.attr('data-validator'),
              equalTo = true;

          switch ($el[0].type) {
            case 'radio':
              validated = this.validateRadio($el.attr('name'));
              break;

            case 'checkbox':
              validated = clearRequire;
              break;

            case 'select':
            case 'select-one':
            case 'select-multiple':
              validated = clearRequire;
              break;

            default:
              validated = this.validateText($el);
          }

          if (validator) {
            customValidator = this.matchValidation($el, validator, $el.attr('required'));
          }

          if ($el.attr('data-equalto')) {
            equalTo = this.options.validators.equalTo($el);
          }

          var goodToGo = [clearRequire, validated, customValidator, equalTo].indexOf(false) === -1;
          var message = (goodToGo ? 'valid' : 'invalid') + '.zf.abide';
          this[goodToGo ? 'removeErrorClasses' : 'addErrorClasses']($el);
          $el.trigger(message, [$el]);
          return goodToGo;
        }
      }, {
        key: 'validateForm',
        value: function validateForm() {
          var acc = [];

          var _this = this;

          this.$inputs.each(function () {
            acc.push(_this.validateInput($(this)));
          });
          var noError = acc.indexOf(false) === -1;
          this.$element.find('[data-abide-error]').css('display', noError ? 'none' : 'block');
          this.$element.trigger((noError ? 'formvalid' : 'forminvalid') + '.zf.abide', [this.$element]);
          return noError;
        }
      }, {
        key: 'validateText',
        value: function validateText($el, pattern) {
          pattern = pattern || $el.attr('pattern') || $el.attr('type');
          var inputText = $el.val();
          return inputText.length ? this.options.patterns.hasOwnProperty(pattern) ? this.options.patterns[pattern].test(inputText) : pattern && pattern !== $el.attr('type') ? new RegExp(pattern).test(inputText) : true : true;
        }
      }, {
        key: 'validateRadio',
        value: function validateRadio(groupName) {
          var $group = this.$element.find(':radio[name="' + groupName + '"]'),
              counter = [],
              _this = this;

          $group.each(function () {
            var rdio = $(this),
                clear = _this.requiredCheck(rdio);

            counter.push(clear);
            if (clear) _this.removeErrorClasses(rdio);
          });
          return counter.indexOf(false) === -1;
        }
      }, {
        key: 'matchValidation',
        value: function matchValidation($el, validators, required) {
          var _this3 = this;

          required = required ? true : false;
          var clear = validators.split(' ').map(function (v) {
            return _this3.options.validators[v]($el, required, $el.parent());
          });
          return clear.indexOf(false) === -1;
        }
      }, {
        key: 'resetForm',
        value: function resetForm() {
          var $form = this.$element,
              opts = this.options;
          $('.' + opts.labelErrorClass, $form).not('small').removeClass(opts.labelErrorClass);
          $('.' + opts.inputErrorClass, $form).not('small').removeClass(opts.inputErrorClass);
          $(opts.formErrorSelector + '.' + opts.formErrorClass).removeClass(opts.formErrorClass);
          $form.find('[data-abide-error]').css('display', 'none');
          $(':input', $form).not(':button, :submit, :reset, :hidden, [data-abide-ignore]').val('').removeAttr('data-invalid');
          $form.trigger('formreset.zf.abide', [$form]);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          var _this = this;

          this.$element.off('.abide').find('[data-abide-error]').css('display', 'none');
          this.$inputs.off('.abide').each(function () {
            _this.removeErrorClasses($(this));
          });
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Abide;
    }();

    Abide.defaults = {
      validateOn: 'fieldChange',
      labelErrorClass: 'is-invalid-label',
      inputErrorClass: 'is-invalid-input',
      formErrorSelector: '.form-error',
      formErrorClass: 'is-visible',
      liveValidate: false,
      patterns: {
        alpha: /^[a-zA-Z]+$/,
        alpha_numeric: /^[a-zA-Z0-9]+$/,
        integer: /^[-+]?\d+$/,
        number: /^[-+]?\d*(?:[\.\,]\d+)?$/,
        card: /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
        cvv: /^([0-9]){3,4}$/,
        email: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/,
        url: /^(https?|ftp|file|ssh):\/\/(((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-zA-Z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-zA-Z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/,
        domain: /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,8}$/,
        datetime: /^([0-2][0-9]{3})\-([0-1][0-9])\-([0-3][0-9])T([0-5][0-9])\:([0-5][0-9])\:([0-5][0-9])(Z|([\-\+]([0-1][0-9])\:00))$/,
        date: /(?:19|20)[0-9]{2}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-9])|(?:(?!02)(?:0[1-9]|1[0-2])-(?:30))|(?:(?:0[13578]|1[02])-31))$/,
        time: /^(0[0-9]|1[0-9]|2[0-3])(:[0-5][0-9]){2}$/,
        dateISO: /^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/,
        month_day_year: /^(0[1-9]|1[012])[- \/.](0[1-9]|[12][0-9]|3[01])[- \/.]\d{4}$/,
        day_month_year: /^(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.]\d{4}$/,
        color: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/
      },
      validators: {
        equalTo: function (el, required, parent) {
          return $('#' + el.attr('data-equalto')).val() === el.val();
        }
      }
    };
    Foundation.plugin(Abide, 'Abide');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationAccordion = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Accordion = function () {
      function Accordion(element, options) {
        _classCallCheck(this, Accordion);

        this.$element = element;
        this.options = $.extend({}, Accordion.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Accordion');
        Foundation.Keyboard.register('Accordion', {
          'ENTER': 'toggle',
          'SPACE': 'toggle',
          'ARROW_DOWN': 'next',
          'ARROW_UP': 'previous'
        });
      }

      _createClass(Accordion, [{
        key: '_init',
        value: function _init() {
          this.$element.attr('role', 'tablist');
          this.$tabs = this.$element.children('li');

          if (this.$tabs.length === 0) {
            this.$tabs = this.$element.children('[data-accordion-item]');
          }

          this.$tabs.each(function (idx, el) {
            var $el = $(el),
                $content = $el.find('[data-tab-content]'),
                id = $content[0].id || Foundation.GetYoDigits(6, 'accordion'),
                linkId = el.id || id + '-label';
            $el.find('a:first').attr({
              'aria-controls': id,
              'role': 'tab',
              'id': linkId,
              'aria-expanded': false,
              'aria-selected': false
            });
            $content.attr({
              'role': 'tabpanel',
              'aria-labelledby': linkId,
              'aria-hidden': true,
              'id': id
            });
          });
          var $initActive = this.$element.find('.is-active').children('[data-tab-content]');

          if ($initActive.length) {
            this.down($initActive, true);
          }

          this._events();
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          this.$tabs.each(function () {
            var $elem = $(this);
            var $tabContent = $elem.children('[data-tab-content]');

            if ($tabContent.length) {
              $elem.children('a').off('click.zf.accordion keydown.zf.accordion').on('click.zf.accordion', function (e) {
                e.preventDefault();

                if ($elem.hasClass('is-active')) {
                  if (_this.options.allowAllClosed || $elem.siblings().hasClass('is-active')) {
                    _this.up($tabContent);
                  }
                } else {
                  _this.down($tabContent);
                }
              }).on('keydown.zf.accordion', function (e) {
                Foundation.Keyboard.handleKey(e, 'Accordion', {
                  toggle: function () {
                    _this.toggle($tabContent);
                  },
                  next: function () {
                    $elem.next().find('a').focus().trigger('click.zf.accordion');
                  },
                  previous: function () {
                    $elem.prev().find('a').focus().trigger('click.zf.accordion');
                  },
                  handled: function () {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                });
              });
            }
          });
        }
      }, {
        key: 'toggle',
        value: function toggle($target) {
          if ($target.parent().hasClass('is-active')) {
            if (this.options.allowAllClosed || $target.parent().siblings().hasClass('is-active')) {
              this.up($target);
            } else {
              return;
            }
          } else {
            this.down($target);
          }
        }
      }, {
        key: 'down',
        value: function down($target, firstTime) {
          var _this = this;

          if (!this.options.multiExpand && !firstTime) {
            var $currentActive = this.$element.find('.is-active').children('[data-tab-content]');

            if ($currentActive.length) {
              this.up($currentActive);
            }
          }

          $target.attr('aria-hidden', false).parent('[data-tab-content]').addBack().parent().addClass('is-active');
          $target.slideDown(_this.options.slideSpeed, function () {
            _this.$element.trigger('down.zf.accordion', [$target]);
          });
          $('#' + $target.attr('aria-labelledby')).attr({
            'aria-expanded': true,
            'aria-selected': true
          });
        }
      }, {
        key: 'up',
        value: function up($target) {
          var $aunts = $target.parent().siblings(),
              _this = this;

          var canClose = this.options.multiExpand ? $aunts.hasClass('is-active') : $target.parent().hasClass('is-active');

          if (!this.options.allowAllClosed && !canClose) {
            return;
          }

          $target.slideUp(_this.options.slideSpeed, function () {
            _this.$element.trigger('up.zf.accordion', [$target]);
          });
          $target.attr('aria-hidden', true).parent().removeClass('is-active');
          $('#' + $target.attr('aria-labelledby')).attr({
            'aria-expanded': false,
            'aria-selected': false
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.find('[data-tab-content]').slideUp(0).css('display', '');
          this.$element.find('a').off('.zf.accordion');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Accordion;
    }();

    Accordion.defaults = {
      slideSpeed: 250,
      multiExpand: false,
      allowAllClosed: false
    };
    Foundation.plugin(Accordion, 'Accordion');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationAccordionMenu = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var AccordionMenu = function () {
      function AccordionMenu(element, options) {
        _classCallCheck(this, AccordionMenu);

        this.$element = element;
        this.options = $.extend({}, AccordionMenu.defaults, this.$element.data(), options);
        Foundation.Nest.Feather(this.$element, 'accordion');

        this._init();

        Foundation.registerPlugin(this, 'AccordionMenu');
        Foundation.Keyboard.register('AccordionMenu', {
          'ENTER': 'toggle',
          'SPACE': 'toggle',
          'ARROW_RIGHT': 'open',
          'ARROW_UP': 'up',
          'ARROW_DOWN': 'down',
          'ARROW_LEFT': 'close',
          'ESCAPE': 'closeAll',
          'TAB': 'down',
          'SHIFT_TAB': 'up'
        });
      }

      _createClass(AccordionMenu, [{
        key: '_init',
        value: function _init() {
          this.$element.find('[data-submenu]').not('.is-active').slideUp(0);
          this.$element.attr({
            'role': 'tablist',
            'aria-multiselectable': this.options.multiOpen
          });
          this.$menuLinks = this.$element.find('.is-accordion-submenu-parent');
          this.$menuLinks.each(function () {
            var linkId = this.id || Foundation.GetYoDigits(6, 'acc-menu-link'),
                $elem = $(this),
                $sub = $elem.children('[data-submenu]'),
                subId = $sub[0].id || Foundation.GetYoDigits(6, 'acc-menu'),
                isActive = $sub.hasClass('is-active');
            $elem.attr({
              'aria-controls': subId,
              'aria-expanded': isActive,
              'role': 'tab',
              'id': linkId
            });
            $sub.attr({
              'aria-labelledby': linkId,
              'aria-hidden': !isActive,
              'role': 'tabpanel',
              'id': subId
            });
          });
          var initPanes = this.$element.find('.is-active');

          if (initPanes.length) {
            var _this = this;

            initPanes.each(function () {
              _this.down($(this));
            });
          }

          this._events();
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          this.$element.find('li').each(function () {
            var $submenu = $(this).children('[data-submenu]');

            if ($submenu.length) {
              $(this).children('a').off('click.zf.accordionMenu').on('click.zf.accordionMenu', function (e) {
                e.preventDefault();

                _this.toggle($submenu);
              });
            }
          }).on('keydown.zf.accordionmenu', function (e) {
            var $element = $(this),
                $elements = $element.parent('ul').children('li'),
                $prevElement,
                $nextElement,
                $target = $element.children('[data-submenu]');
            $elements.each(function (i) {
              if ($(this).is($element)) {
                $prevElement = $elements.eq(Math.max(0, i - 1));
                $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));

                if ($(this).children('[data-submenu]:visible').length) {
                  $nextElement = $element.find('li:first-child');
                }

                if ($(this).is(':first-child')) {
                  $prevElement = $element.parents('li').first();
                } else if ($prevElement.children('[data-submenu]:visible').length) {
                  $prevElement = $prevElement.find('li:last-child');
                }

                if ($(this).is(':last-child')) {
                  $nextElement = $element.parents('li').first().next('li');
                }

                return;
              }
            });
            Foundation.Keyboard.handleKey(e, 'AccordionMenu', {
              open: function () {
                if ($target.is(':hidden')) {
                  _this.down($target);

                  $target.find('li').first().focus();
                }
              },
              close: function () {
                if ($target.length && !$target.is(':hidden')) {
                  _this.up($target);
                } else if ($element.parent('[data-submenu]').length) {
                  _this.up($element.parent('[data-submenu]'));

                  $element.parents('li').first().focus();
                }
              },
              up: function () {
                $prevElement.focus();
              },
              down: function () {
                $nextElement.focus();
              },
              toggle: function () {
                if ($element.children('[data-submenu]').length) {
                  _this.toggle($element.children('[data-submenu]'));
                }
              },
              closeAll: function () {
                _this.hideAll();
              },
              handled: function () {
                e.preventDefault();
                e.stopImmediatePropagation();
              }
            });
          });
        }
      }, {
        key: 'hideAll',
        value: function hideAll() {
          this.$element.find('[data-submenu]').slideUp(this.options.slideSpeed);
        }
      }, {
        key: 'toggle',
        value: function toggle($target) {
          if (!$target.is(':animated')) {
            if (!$target.is(':hidden')) {
              this.up($target);
            } else {
              this.down($target);
            }
          }
        }
      }, {
        key: 'down',
        value: function down($target) {
          var _this = this;

          if (!this.options.multiOpen) {
            this.up(this.$element.find('.is-active').not($target.parentsUntil(this.$element).add($target)));
          }

          $target.addClass('is-active').attr({
            'aria-hidden': false
          }).parent('.is-accordion-submenu-parent').attr({
            'aria-expanded': true
          });
          Foundation.Move(this.options.slideSpeed, $target, function () {
            $target.slideDown(_this.options.slideSpeed, function () {
              _this.$element.trigger('down.zf.accordionMenu', [$target]);
            });
          });
        }
      }, {
        key: 'up',
        value: function up($target) {
          var _this = this;

          Foundation.Move(this.options.slideSpeed, $target, function () {
            $target.slideUp(_this.options.slideSpeed, function () {
              _this.$element.trigger('up.zf.accordionMenu', [$target]);
            });
          });
          var $menus = $target.find('[data-submenu]').slideUp(0).addBack().attr('aria-hidden', true);
          $menus.parent('.is-accordion-submenu-parent').attr('aria-expanded', false);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.find('[data-submenu]').slideDown(0).css('display', '');
          this.$element.find('a').off('click.zf.accordionMenu');
          Foundation.Nest.Burn(this.$element, 'accordion');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return AccordionMenu;
    }();

    AccordionMenu.defaults = {
      slideSpeed: 250,
      multiOpen: true
    };
    Foundation.plugin(AccordionMenu, 'AccordionMenu');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationDrilldown = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Drilldown = function () {
      function Drilldown(element, options) {
        _classCallCheck(this, Drilldown);

        this.$element = element;
        this.options = $.extend({}, Drilldown.defaults, this.$element.data(), options);
        Foundation.Nest.Feather(this.$element, 'drilldown');

        this._init();

        Foundation.registerPlugin(this, 'Drilldown');
        Foundation.Keyboard.register('Drilldown', {
          'ENTER': 'open',
          'SPACE': 'open',
          'ARROW_RIGHT': 'next',
          'ARROW_UP': 'up',
          'ARROW_DOWN': 'down',
          'ARROW_LEFT': 'previous',
          'ESCAPE': 'close',
          'TAB': 'down',
          'SHIFT_TAB': 'up'
        });
      }

      _createClass(Drilldown, [{
        key: '_init',
        value: function _init() {
          this.$submenuAnchors = this.$element.find('li.is-drilldown-submenu-parent');
          this.$submenus = this.$submenuAnchors.children('[data-submenu]');
          this.$menuItems = this.$element.find('li').not('.js-drilldown-back').attr('role', 'menuitem');

          this._prepareMenu();

          this._keyboardEvents();
        }
      }, {
        key: '_prepareMenu',
        value: function _prepareMenu() {
          var _this = this;

          this.$submenuAnchors.each(function () {
            var $sub = $(this);
            var $link = $sub.find('a:first');
            $link.data('savedHref', $link.attr('href')).removeAttr('href');
            $sub.children('[data-submenu]').attr({
              'aria-hidden': true,
              'tabindex': 0,
              'role': 'menu'
            });

            _this._events($sub);
          });
          this.$submenus.each(function () {
            var $menu = $(this),
                $back = $menu.find('.js-drilldown-back');

            if (!$back.length) {
              $menu.prepend(_this.options.backButton);
            }

            _this._back($menu);
          });

          if (!this.$element.parent().hasClass('is-drilldown')) {
            this.$wrapper = $(this.options.wrapper).addClass('is-drilldown').css(this._getMaxDims());
            this.$element.wrap(this.$wrapper);
          }
        }
      }, {
        key: '_events',
        value: function _events($elem) {
          var _this = this;

          $elem.off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
            if ($(e.target).parentsUntil('ul', 'li').hasClass('is-drilldown-submenu-parent')) {
              e.stopImmediatePropagation();
              e.preventDefault();
            }

            _this._show($elem);

            if (_this.options.closeOnClick) {
              var $body = $('body').not(_this.$wrapper);
              $body.off('.zf.drilldown').on('click.zf.drilldown', function (e) {
                e.preventDefault();

                _this._hideAll();

                $body.off('.zf.drilldown');
              });
            }
          });
        }
      }, {
        key: '_keyboardEvents',
        value: function _keyboardEvents() {
          var _this = this;

          this.$menuItems.add(this.$element.find('.js-drilldown-back')).on('keydown.zf.drilldown', function (e) {
            var $element = $(this),
                $elements = $element.parent('ul').children('li'),
                $prevElement,
                $nextElement;
            $elements.each(function (i) {
              if ($(this).is($element)) {
                $prevElement = $elements.eq(Math.max(0, i - 1));
                $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                return;
              }
            });
            Foundation.Keyboard.handleKey(e, 'Drilldown', {
              next: function () {
                if ($element.is(_this.$submenuAnchors)) {
                  _this._show($element);

                  $element.on(Foundation.transitionend($element), function () {
                    $element.find('ul li').filter(_this.$menuItems).first().focus();
                  });
                }
              },
              previous: function () {
                _this._hide($element.parent('ul'));

                $element.parent('ul').on(Foundation.transitionend($element), function () {
                  setTimeout(function () {
                    $element.parent('ul').parent('li').focus();
                  }, 1);
                });
              },
              up: function () {
                $prevElement.focus();
              },
              down: function () {
                $nextElement.focus();
              },
              close: function () {
                _this._back();
              },
              open: function () {
                if (!$element.is(_this.$menuItems)) {
                  _this._hide($element.parent('ul'));

                  setTimeout(function () {
                    $element.parent('ul').parent('li').focus();
                  }, 1);
                } else if ($element.is(_this.$submenuAnchors)) {
                  _this._show($element);

                  setTimeout(function () {
                    $element.find('ul li').filter(_this.$menuItems).first().focus();
                  }, 1);
                }
              },
              handled: function () {
                e.preventDefault();
                e.stopImmediatePropagation();
              }
            });
          });
        }
      }, {
        key: '_hideAll',
        value: function _hideAll() {
          var $elem = this.$element.find('.is-drilldown-submenu.is-active').addClass('is-closing');
          $elem.one(Foundation.transitionend($elem), function (e) {
            $elem.removeClass('is-active is-closing');
          });
          this.$element.trigger('closed.zf.drilldown');
        }
      }, {
        key: '_back',
        value: function _back($elem) {
          var _this = this;

          $elem.off('click.zf.drilldown');
          $elem.children('.js-drilldown-back').on('click.zf.drilldown', function (e) {
            e.stopImmediatePropagation();

            _this._hide($elem);
          });
        }
      }, {
        key: '_menuLinkEvents',
        value: function _menuLinkEvents() {
          var _this = this;

          this.$menuItems.not('.is-drilldown-submenu-parent').off('click.zf.drilldown').on('click.zf.drilldown', function (e) {
            setTimeout(function () {
              _this._hideAll();
            }, 0);
          });
        }
      }, {
        key: '_show',
        value: function _show($elem) {
          $elem.children('[data-submenu]').addClass('is-active');
          this.$element.trigger('open.zf.drilldown', [$elem]);
        }
      }, {
        key: '_hide',
        value: function _hide($elem) {
          var _this = this;

          $elem.addClass('is-closing').one(Foundation.transitionend($elem), function () {
            $elem.removeClass('is-active is-closing');
          });
          $elem.trigger('hide.zf.drilldown', [$elem]);
        }
      }, {
        key: '_getMaxDims',
        value: function _getMaxDims() {
          var max = 0,
              result = {};
          this.$submenus.add(this.$element).each(function () {
            var numOfElems = $(this).children('li').length;
            max = numOfElems > max ? numOfElems : max;
          });
          result.height = max * this.$menuItems[0].getBoundingClientRect().height + 'px';
          result.width = this.$element[0].getBoundingClientRect().width + 'px';
          return result;
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this._hideAll();

          Foundation.Nest.Burn(this.$element, 'drilldown');
          this.$element.unwrap().find('.js-drilldown-back').remove().end().find('.is-active, .is-closing, .is-drilldown-submenu').removeClass('is-active is-closing is-drilldown-submenu').end().find('[data-submenu]').removeAttr('aria-hidden tabindex role').off('.zf.drilldown').end().off('zf.drilldown');
          this.$element.find('a').each(function () {
            var $link = $(this);

            if ($link.data('savedHref')) {
              $link.attr('href', $link.data('savedHref')).removeData('savedHref');
            } else {
              return;
            }
          });
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Drilldown;
    }();

    Drilldown.defaults = {
      backButton: '<li class="js-drilldown-back"><a>Back</a></li>',
      wrapper: '<div></div>',
      closeOnClick: false
    };
    Foundation.plugin(Drilldown, 'Drilldown');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationDropdown = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Dropdown = function () {
      function Dropdown(element, options) {
        _classCallCheck(this, Dropdown);

        this.$element = element;
        this.options = $.extend({}, Dropdown.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Dropdown');
        Foundation.Keyboard.register('Dropdown', {
          'ENTER': 'open',
          'SPACE': 'open',
          'ESCAPE': 'close',
          'TAB': 'tab_forward',
          'SHIFT_TAB': 'tab_backward'
        });
      }

      _createClass(Dropdown, [{
        key: '_init',
        value: function _init() {
          var $id = this.$element.attr('id');
          this.$anchor = $('[data-toggle="' + $id + '"]') || $('[data-open="' + $id + '"]');
          this.$anchor.attr({
            'aria-controls': $id,
            'data-is-focus': false,
            'data-yeti-box': $id,
            'aria-haspopup': true,
            'aria-expanded': false
          });
          this.options.positionClass = this.getPositionClass();
          this.counter = 4;
          this.usedPositions = [];
          this.$element.attr({
            'aria-hidden': 'true',
            'data-yeti-box': $id,
            'data-resize': $id,
            'aria-labelledby': this.$anchor[0].id || Foundation.GetYoDigits(6, 'dd-anchor')
          });

          this._events();
        }
      }, {
        key: 'getPositionClass',
        value: function getPositionClass() {
          var position = this.$element[0].className.match(/\b(top|left|right)\b/g);
          position = position ? position[0] : '';
          return position;
        }
      }, {
        key: '_reposition',
        value: function _reposition(position) {
          this.usedPositions.push(position ? position : 'bottom');

          if (!position && this.usedPositions.indexOf('top') < 0) {
            this.$element.addClass('top');
          } else if (position === 'top' && this.usedPositions.indexOf('bottom') < 0) {
            this.$element.removeClass(position);
          } else if (position === 'left' && this.usedPositions.indexOf('right') < 0) {
            this.$element.removeClass(position).addClass('right');
          } else if (position === 'right' && this.usedPositions.indexOf('left') < 0) {
            this.$element.removeClass(position).addClass('left');
          } else if (!position && this.usedPositions.indexOf('top') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.$element.addClass('left');
          } else if (position === 'top' && this.usedPositions.indexOf('bottom') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.$element.removeClass(position).addClass('left');
          } else if (position === 'left' && this.usedPositions.indexOf('right') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.$element.removeClass(position);
          } else if (position === 'right' && this.usedPositions.indexOf('left') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.$element.removeClass(position);
          } else {
            this.$element.removeClass(position);
          }

          this.classChanged = true;
          this.counter--;
        }
      }, {
        key: '_setPosition',
        value: function _setPosition() {
          if (this.$anchor.attr('aria-expanded') === 'false') {
            return false;
          }

          var position = this.getPositionClass(),
              $eleDims = Foundation.Box.GetDimensions(this.$element),
              $anchorDims = Foundation.Box.GetDimensions(this.$anchor),
              _this = this,
              direction = position === 'left' ? 'left' : position === 'right' ? 'left' : 'top',
              param = direction === 'top' ? 'height' : 'width',
              offset = param === 'height' ? this.options.vOffset : this.options.hOffset;

          if ($eleDims.width >= $eleDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.$element)) {
            this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
              'width': $eleDims.windowDims.width - this.options.hOffset * 2,
              'height': 'auto'
            });
            this.classChanged = true;
            return false;
          }

          this.$element.offset(Foundation.Box.GetOffsets(this.$element, this.$anchor, position, this.options.vOffset, this.options.hOffset));

          while (!Foundation.Box.ImNotTouchingYou(this.$element) && this.counter) {
            this._reposition(position);

            this._setPosition();
          }
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          this.$element.on({
            'open.zf.trigger': this.open.bind(this),
            'close.zf.trigger': this.close.bind(this),
            'toggle.zf.trigger': this.toggle.bind(this),
            'resizeme.zf.trigger': this._setPosition.bind(this)
          });

          if (this.options.hover) {
            this.$anchor.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.open();

                _this.$anchor.data('hover', true);
              }, _this.options.hoverDelay);
            }).on('mouseleave.zf.dropdown', function () {
              clearTimeout(_this.timeout);
              _this.timeout = setTimeout(function () {
                _this.close();

                _this.$anchor.data('hover', false);
              }, _this.options.hoverDelay);
            });

            if (this.options.hoverPane) {
              this.$element.off('mouseenter.zf.dropdown mouseleave.zf.dropdown').on('mouseenter.zf.dropdown', function () {
                clearTimeout(_this.timeout);
              }).on('mouseleave.zf.dropdown', function () {
                clearTimeout(_this.timeout);
                _this.timeout = setTimeout(function () {
                  _this.close();

                  _this.$anchor.data('hover', false);
                }, _this.options.hoverDelay);
              });
            }
          }

          this.$anchor.add(this.$element).on('keydown.zf.dropdown', function (e) {
            var $target = $(this),
                visibleFocusableElements = Foundation.Keyboard.findFocusable(_this.$element);
            Foundation.Keyboard.handleKey(e, 'Dropdown', {
              tab_forward: function () {
                if (_this.$element.find(':focus').is(visibleFocusableElements.eq(-1))) {
                  if (_this.options.trapFocus) {
                    visibleFocusableElements.eq(0).focus();
                    e.preventDefault();
                  } else {
                    _this.close();
                  }
                }
              },
              tab_backward: function () {
                if (_this.$element.find(':focus').is(visibleFocusableElements.eq(0)) || _this.$element.is(':focus')) {
                  if (_this.options.trapFocus) {
                    visibleFocusableElements.eq(-1).focus();
                    e.preventDefault();
                  } else {
                    _this.close();
                  }
                }
              },
              open: function () {
                if ($target.is(_this.$anchor)) {
                  _this.open();

                  _this.$element.attr('tabindex', -1).focus();

                  e.preventDefault();
                }
              },
              close: function () {
                _this.close();

                _this.$anchor.focus();
              }
            });
          });
        }
      }, {
        key: '_addBodyHandler',
        value: function _addBodyHandler() {
          var $body = $(document.body).not(this.$element),
              _this = this;

          $body.off('click.zf.dropdown').on('click.zf.dropdown', function (e) {
            if (_this.$anchor.is(e.target) || _this.$anchor.find(e.target).length) {
              return;
            }

            if (_this.$element.find(e.target).length) {
              return;
            }

            _this.close();

            $body.off('click.zf.dropdown');
          });
        }
      }, {
        key: 'open',
        value: function open() {
          this.$element.trigger('closeme.zf.dropdown', this.$element.attr('id'));
          this.$anchor.addClass('hover').attr({
            'aria-expanded': true
          });

          this._setPosition();

          this.$element.addClass('is-open').attr({
            'aria-hidden': false
          });

          if (this.options.autoFocus) {
            var $focusable = Foundation.Keyboard.findFocusable(this.$element);

            if ($focusable.length) {
              $focusable.eq(0).focus();
            }
          }

          if (this.options.closeOnClick) {
            this._addBodyHandler();
          }

          this.$element.trigger('show.zf.dropdown', [this.$element]);
        }
      }, {
        key: 'close',
        value: function close() {
          if (!this.$element.hasClass('is-open')) {
            return false;
          }

          this.$element.removeClass('is-open').attr({
            'aria-hidden': true
          });
          this.$anchor.removeClass('hover').attr('aria-expanded', false);

          if (this.classChanged) {
            var curPositionClass = this.getPositionClass();

            if (curPositionClass) {
              this.$element.removeClass(curPositionClass);
            }

            this.$element.addClass(this.options.positionClass).css({
              height: '',
              width: ''
            });
            this.classChanged = false;
            this.counter = 4;
            this.usedPositions.length = 0;
          }

          this.$element.trigger('hide.zf.dropdown', [this.$element]);
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          if (this.$element.hasClass('is-open')) {
            if (this.$anchor.data('hover')) return;
            this.close();
          } else {
            this.open();
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.off('.zf.trigger').hide();
          this.$anchor.off('.zf.dropdown');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Dropdown;
    }();

    Dropdown.defaults = {
      hoverDelay: 250,
      hover: false,
      hoverPane: false,
      vOffset: 1,
      hOffset: 1,
      positionClass: '',
      trapFocus: false,
      autoFocus: false,
      closeOnClick: false
    };
    Foundation.plugin(Dropdown, 'Dropdown');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationDropdownMenu = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var DropdownMenu = function () {
      function DropdownMenu(element, options) {
        _classCallCheck(this, DropdownMenu);

        this.$element = element;
        this.options = $.extend({}, DropdownMenu.defaults, this.$element.data(), options);
        Foundation.Nest.Feather(this.$element, 'dropdown');

        this._init();

        Foundation.registerPlugin(this, 'DropdownMenu');
        Foundation.Keyboard.register('DropdownMenu', {
          'ENTER': 'open',
          'SPACE': 'open',
          'ARROW_RIGHT': 'next',
          'ARROW_UP': 'up',
          'ARROW_DOWN': 'down',
          'ARROW_LEFT': 'previous',
          'ESCAPE': 'close'
        });
      }

      _createClass(DropdownMenu, [{
        key: '_init',
        value: function _init() {
          var subs = this.$element.find('li.is-dropdown-submenu-parent');
          this.$element.children('.is-dropdown-submenu-parent').children('.is-dropdown-submenu').addClass('first-sub');
          this.$menuItems = this.$element.find('[role="menuitem"]');
          this.$tabs = this.$element.children('[role="menuitem"]');
          this.isVert = this.$element.hasClass(this.options.verticalClass);
          this.$tabs.find('ul.is-dropdown-submenu').addClass(this.options.verticalClass);

          if (this.$element.hasClass(this.options.rightClass) || this.options.alignment === 'right' || Foundation.rtl()) {
            this.options.alignment = 'right';
            subs.addClass('is-left-arrow opens-left');
          } else {
            subs.addClass('is-right-arrow opens-right');
          }

          if (!this.isVert) {
            this.$tabs.filter('.is-dropdown-submenu-parent').removeClass('is-right-arrow is-left-arrow opens-right opens-left').addClass('is-down-arrow');
          }

          this.changed = false;

          this._events();
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this,
              hasTouch = 'ontouchstart' in window || typeof window.ontouchstart !== 'undefined',
              parClass = 'is-dropdown-submenu-parent';

          if (this.options.clickOpen || hasTouch) {
            this.$menuItems.on('click.zf.dropdownmenu touchstart.zf.dropdownmenu', function (e) {
              var $elem = $(e.target).parentsUntil('ul', '.' + parClass),
                  hasSub = $elem.hasClass(parClass),
                  hasClicked = $elem.attr('data-is-click') === 'true',
                  $sub = $elem.children('.is-dropdown-submenu');

              if (hasSub) {
                if (hasClicked) {
                  if (!_this.options.closeOnClick || !_this.options.clickOpen && !hasTouch || _this.options.forceFollow && hasTouch) {
                    return;
                  } else {
                    e.stopImmediatePropagation();
                    e.preventDefault();

                    _this._hide($elem);
                  }
                } else {
                  e.preventDefault();
                  e.stopImmediatePropagation();

                  _this._show($elem.children('.is-dropdown-submenu'));

                  $elem.add($elem.parentsUntil(_this.$element, '.' + parClass)).attr('data-is-click', true);
                }
              } else {
                return;
              }
            });
          }

          if (!this.options.disableHover) {
            this.$menuItems.on('mouseenter.zf.dropdownmenu', function (e) {
              e.stopImmediatePropagation();
              var $elem = $(this),
                  hasSub = $elem.hasClass(parClass);

              if (hasSub) {
                clearTimeout(_this.delay);
                _this.delay = setTimeout(function () {
                  _this._show($elem.children('.is-dropdown-submenu'));
                }, _this.options.hoverDelay);
              }
            }).on('mouseleave.zf.dropdownmenu', function (e) {
              var $elem = $(this),
                  hasSub = $elem.hasClass(parClass);

              if (hasSub && _this.options.autoclose) {
                if ($elem.attr('data-is-click') === 'true' && _this.options.clickOpen) {
                  return false;
                }

                clearTimeout(_this.delay);
                _this.delay = setTimeout(function () {
                  _this._hide($elem);
                }, _this.options.closingTime);
              }
            });
          }

          this.$menuItems.on('keydown.zf.dropdownmenu', function (e) {
            var $element = $(e.target).parentsUntil('ul', '[role="menuitem"]'),
                isTab = _this.$tabs.index($element) > -1,
                $elements = isTab ? _this.$tabs : $element.siblings('li').add($element),
                $prevElement,
                $nextElement;
            $elements.each(function (i) {
              if ($(this).is($element)) {
                $prevElement = $elements.eq(i - 1);
                $nextElement = $elements.eq(i + 1);
                return;
              }
            });

            var nextSibling = function () {
              if (!$element.is(':last-child')) $nextElement.children('a:first').focus();
            },
                prevSibling = function () {
              $prevElement.children('a:first').focus();
            },
                openSub = function () {
              var $sub = $element.children('ul.is-dropdown-submenu');

              if ($sub.length) {
                _this._show($sub);

                $element.find('li > a:first').focus();
              } else {
                return;
              }
            },
                closeSub = function () {
              var close = $element.parent('ul').parent('li');
              close.children('a:first').focus();

              _this._hide(close);
            };

            var functions = {
              open: openSub,
              close: function () {
                _this._hide(_this.$element);

                _this.$menuItems.find('a:first').focus();
              },
              handled: function () {
                e.preventDefault();
                e.stopImmediatePropagation();
              }
            };

            if (isTab) {
              if (_this.vertical) {
                if (_this.options.alignment === 'left') {
                  $.extend(functions, {
                    down: nextSibling,
                    up: prevSibling,
                    next: openSub,
                    previous: closeSub
                  });
                } else {
                  $.extend(functions, {
                    down: nextSibling,
                    up: prevSibling,
                    next: closeSub,
                    previous: openSub
                  });
                }
              } else {
                $.extend(functions, {
                  next: nextSibling,
                  previous: prevSibling,
                  down: openSub,
                  up: closeSub
                });
              }
            } else {
              if (_this.options.alignment === 'left') {
                $.extend(functions, {
                  next: openSub,
                  previous: closeSub,
                  down: nextSibling,
                  up: prevSibling
                });
              } else {
                $.extend(functions, {
                  next: closeSub,
                  previous: openSub,
                  down: nextSibling,
                  up: prevSibling
                });
              }
            }

            Foundation.Keyboard.handleKey(e, 'DropdownMenu', functions);
          });
        }
      }, {
        key: '_addBodyHandler',
        value: function _addBodyHandler() {
          var $body = $(document.body),
              _this = this;

          $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu').on('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu', function (e) {
            var $link = _this.$element.find(e.target);

            if ($link.length) {
              return;
            }

            _this._hide();

            $body.off('mouseup.zf.dropdownmenu touchend.zf.dropdownmenu');
          });
        }
      }, {
        key: '_show',
        value: function _show($sub) {
          var idx = this.$tabs.index(this.$tabs.filter(function (i, el) {
            return $(el).find($sub).length > 0;
          }));
          var $sibs = $sub.parent('li.is-dropdown-submenu-parent').siblings('li.is-dropdown-submenu-parent');

          this._hide($sibs, idx);

          $sub.css('visibility', 'hidden').addClass('js-dropdown-active').attr({
            'aria-hidden': false
          }).parent('li.is-dropdown-submenu-parent').addClass('is-active').attr({
            'aria-expanded': true
          });
          var clear = Foundation.Box.ImNotTouchingYou($sub, null, true);

          if (!clear) {
            var oldClass = this.options.alignment === 'left' ? '-right' : '-left',
                $parentLi = $sub.parent('.is-dropdown-submenu-parent');
            $parentLi.removeClass('opens' + oldClass).addClass('opens-' + this.options.alignment);
            clear = Foundation.Box.ImNotTouchingYou($sub, null, true);

            if (!clear) {
              $parentLi.removeClass('opens-' + this.options.alignment).addClass('opens-inner');
            }

            this.changed = true;
          }

          $sub.css('visibility', '');

          if (this.options.closeOnClick) {
            this._addBodyHandler();
          }

          this.$element.trigger('show.zf.dropdownmenu', [$sub]);
        }
      }, {
        key: '_hide',
        value: function _hide($elem, idx) {
          var $toClose;

          if ($elem && $elem.length) {
            $toClose = $elem;
          } else if (idx !== undefined) {
            $toClose = this.$tabs.not(function (i, el) {
              return i === idx;
            });
          } else {
            $toClose = this.$element;
          }

          var somethingToClose = $toClose.hasClass('is-active') || $toClose.find('.is-active').length > 0;

          if (somethingToClose) {
            $toClose.find('li.is-active').add($toClose).attr({
              'aria-expanded': false,
              'data-is-click': false
            }).removeClass('is-active');
            $toClose.find('ul.js-dropdown-active').attr({
              'aria-hidden': true
            }).removeClass('js-dropdown-active');

            if (this.changed || $toClose.find('opens-inner').length) {
              var oldClass = this.options.alignment === 'left' ? 'right' : 'left';
              $toClose.find('li.is-dropdown-submenu-parent').add($toClose).removeClass('opens-inner opens-' + this.options.alignment).addClass('opens-' + oldClass);
              this.changed = false;
            }

            this.$element.trigger('hide.zf.dropdownmenu', [$toClose]);
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$menuItems.off('.zf.dropdownmenu').removeAttr('data-is-click').removeClass('is-right-arrow is-left-arrow is-down-arrow opens-right opens-left opens-inner');
          $(document.body).off('.zf.dropdownmenu');
          Foundation.Nest.Burn(this.$element, 'dropdown');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return DropdownMenu;
    }();

    DropdownMenu.defaults = {
      disableHover: false,
      autoclose: true,
      hoverDelay: 50,
      clickOpen: false,
      closingTime: 500,
      alignment: 'left',
      closeOnClick: true,
      verticalClass: 'vertical',
      rightClass: 'align-right',
      forceFollow: true
    };
    Foundation.plugin(DropdownMenu, 'DropdownMenu');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationEqualizer = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Equalizer = function () {
      function Equalizer(element, options) {
        _classCallCheck(this, Equalizer);

        this.$element = element;
        this.options = $.extend({}, Equalizer.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Equalizer');
      }

      _createClass(Equalizer, [{
        key: '_init',
        value: function _init() {
          var eqId = this.$element.attr('data-equalizer') || '';
          var $watched = this.$element.find('[data-equalizer-watch="' + eqId + '"]');
          this.$watched = $watched.length ? $watched : this.$element.find('[data-equalizer-watch]');
          this.$element.attr('data-resize', eqId || Foundation.GetYoDigits(6, 'eq'));
          this.hasNested = this.$element.find('[data-equalizer]').length > 0;
          this.isNested = this.$element.parentsUntil(document.body, '[data-equalizer]').length > 0;
          this.isOn = false;
          var imgs = this.$element.find('img');
          var tooSmall;

          if (this.options.equalizeOn) {
            tooSmall = this._checkMQ();
            $(window).on('changed.zf.mediaquery', this._checkMQ.bind(this));
          } else {
            this._events();
          }

          if (tooSmall !== undefined && tooSmall === false || tooSmall === undefined) {
            if (imgs.length) {
              Foundation.onImagesLoaded(imgs, this._reflow.bind(this));
            } else {
              this._reflow();
            }
          }
        }
      }, {
        key: '_pauseEvents',
        value: function _pauseEvents() {
          this.isOn = false;
          this.$element.off('.zf.equalizer resizeme.zf.trigger');
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          this._pauseEvents();

          if (this.hasNested) {
            this.$element.on('postequalized.zf.equalizer', function (e) {
              if (e.target !== _this.$element[0]) {
                _this._reflow();
              }
            });
          } else {
            this.$element.on('resizeme.zf.trigger', this._reflow.bind(this));
          }

          this.isOn = true;
        }
      }, {
        key: '_checkMQ',
        value: function _checkMQ() {
          var tooSmall = !Foundation.MediaQuery.atLeast(this.options.equalizeOn);

          if (tooSmall) {
            if (this.isOn) {
              this._pauseEvents();

              this.$watched.css('height', 'auto');
            }
          } else {
            if (!this.isOn) {
              this._events();
            }
          }

          return tooSmall;
        }
      }, {
        key: '_killswitch',
        value: function _killswitch() {
          return;
        }
      }, {
        key: '_reflow',
        value: function _reflow() {
          if (!this.options.equalizeOnStack) {
            if (this._isStacked()) {
              this.$watched.css('height', 'auto');
              return false;
            }
          }

          if (this.options.equalizeByRow) {
            this.getHeightsByRow(this.applyHeightByRow.bind(this));
          } else {
            this.getHeights(this.applyHeight.bind(this));
          }
        }
      }, {
        key: '_isStacked',
        value: function _isStacked() {
          return this.$watched[0].offsetTop !== this.$watched[1].offsetTop;
        }
      }, {
        key: 'getHeights',
        value: function getHeights(cb) {
          var heights = [];

          for (var i = 0, len = this.$watched.length; i < len; i++) {
            this.$watched[i].style.height = 'auto';
            heights.push(this.$watched[i].offsetHeight);
          }

          cb(heights);
        }
      }, {
        key: 'getHeightsByRow',
        value: function getHeightsByRow(cb) {
          var lastElTopOffset = this.$watched.first().offset().top,
              groups = [],
              group = 0;
          groups[group] = [];

          for (var i = 0, len = this.$watched.length; i < len; i++) {
            this.$watched[i].style.height = 'auto';
            var elOffsetTop = $(this.$watched[i]).offset().top;

            if (elOffsetTop != lastElTopOffset) {
              group++;
              groups[group] = [];
              lastElTopOffset = elOffsetTop;
            }

            groups[group].push([this.$watched[i], this.$watched[i].offsetHeight]);
          }

          for (var j = 0, ln = groups.length; j < ln; j++) {
            var heights = $(groups[j]).map(function () {
              return this[1];
            }).get();
            var max = Math.max.apply(null, heights);
            groups[j].push(max);
          }

          cb(groups);
        }
      }, {
        key: 'applyHeight',
        value: function applyHeight(heights) {
          var max = Math.max.apply(null, heights);
          this.$element.trigger('preequalized.zf.equalizer');
          this.$watched.css('height', max);
          this.$element.trigger('postequalized.zf.equalizer');
        }
      }, {
        key: 'applyHeightByRow',
        value: function applyHeightByRow(groups) {
          this.$element.trigger('preequalized.zf.equalizer');

          for (var i = 0, len = groups.length; i < len; i++) {
            var groupsILength = groups[i].length,
                max = groups[i][groupsILength - 1];

            if (groupsILength <= 2) {
              $(groups[i][0][0]).css({
                'height': 'auto'
              });
              continue;
            }

            this.$element.trigger('preequalizedrow.zf.equalizer');

            for (var j = 0, lenJ = groupsILength - 1; j < lenJ; j++) {
              $(groups[i][j][0]).css({
                'height': max
              });
            }

            this.$element.trigger('postequalizedrow.zf.equalizer');
          }

          this.$element.trigger('postequalized.zf.equalizer');
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this._pauseEvents();

          this.$watched.css('height', 'auto');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Equalizer;
    }();

    Equalizer.defaults = {
      equalizeOnStack: true,
      equalizeByRow: false,
      equalizeOn: ''
    };
    Foundation.plugin(Equalizer, 'Equalizer');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationInterchange = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Interchange = function () {
      function Interchange(element, options) {
        _classCallCheck(this, Interchange);

        this.$element = element;
        this.options = $.extend({}, Interchange.defaults, options);
        this.rules = [];
        this.currentPath = '';

        this._init();

        this._events();

        Foundation.registerPlugin(this, 'Interchange');
      }

      _createClass(Interchange, [{
        key: '_init',
        value: function _init() {
          this._addBreakpoints();

          this._generateRules();

          this._reflow();
        }
      }, {
        key: '_events',
        value: function _events() {
          $(window).on('resize.zf.interchange', Foundation.util.throttle(this._reflow.bind(this), 50));
        }
      }, {
        key: '_reflow',
        value: function _reflow() {
          var match;

          for (var i in this.rules) {
            var rule = this.rules[i];

            if (window.matchMedia(rule.query).matches) {
              match = rule;
            }
          }

          if (match) {
            this.replace(match.path);
          }
        }
      }, {
        key: '_addBreakpoints',
        value: function _addBreakpoints() {
          for (var i in Foundation.MediaQuery.queries) {
            var query = Foundation.MediaQuery.queries[i];
            Interchange.SPECIAL_QUERIES[query.name] = query.value;
          }
        }
      }, {
        key: '_generateRules',
        value: function _generateRules(element) {
          var rulesList = [];
          var rules;

          if (this.options.rules) {
            rules = this.options.rules;
          } else {
            rules = this.$element.data('interchange').match(/\[.*?\]/g);
          }

          for (var i in rules) {
            var rule = rules[i].slice(1, -1).split(', ');
            var path = rule.slice(0, -1).join('');
            var query = rule[rule.length - 1];

            if (Interchange.SPECIAL_QUERIES[query]) {
              query = Interchange.SPECIAL_QUERIES[query];
            }

            rulesList.push({
              path: path,
              query: query
            });
          }

          this.rules = rulesList;
        }
      }, {
        key: 'replace',
        value: function replace(path) {
          if (this.currentPath === path) return;

          var _this = this,
              trigger = 'replaced.zf.interchange';

          if (this.$element[0].nodeName === 'IMG') {
            this.$element.attr('src', path).load(function () {
              _this.currentPath = path;
            }).trigger(trigger);
          } else if (path.match(/\.(gif|jpg|jpeg|tiff|png)([?#].*)?/i)) {
            this.$element.css({
              'background-image': 'url(' + path + ')'
            }).trigger(trigger);
          } else {
            $.get(path, function (response) {
              _this.$element.html(response).trigger(trigger);

              $(response).foundation();
              _this.currentPath = path;
            });
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {}
      }]);

      return Interchange;
    }();

    Interchange.defaults = {
      rules: null
    };
    Interchange.SPECIAL_QUERIES = {
      'landscape': 'screen and (orientation: landscape)',
      'portrait': 'screen and (orientation: portrait)',
      'retina': 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)'
    };
    Foundation.plugin(Interchange, 'Interchange');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationMagellan = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Magellan = function () {
      function Magellan(element, options) {
        _classCallCheck(this, Magellan);

        this.$element = element;
        this.options = $.extend({}, Magellan.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Magellan');
      }

      _createClass(Magellan, [{
        key: '_init',
        value: function _init() {
          var id = this.$element[0].id || Foundation.GetYoDigits(6, 'magellan');

          var _this = this;

          this.$targets = $('[data-magellan-target]');
          this.$links = this.$element.find('a');
          this.$element.attr({
            'data-resize': id,
            'data-scroll': id,
            'id': id
          });
          this.$active = $();
          this.scrollPos = parseInt(window.pageYOffset, 10);

          this._events();
        }
      }, {
        key: 'calcPoints',
        value: function calcPoints() {
          var _this = this,
              body = document.body,
              html = document.documentElement;

          this.points = [];
          this.winHeight = Math.round(Math.max(window.innerHeight, html.clientHeight));
          this.docHeight = Math.round(Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight));
          this.$targets.each(function () {
            var $tar = $(this),
                pt = Math.round($tar.offset().top - _this.options.threshold);
            $tar.targetPoint = pt;

            _this.points.push(pt);
          });
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this,
              $body = $('html, body'),
              opts = {
            duration: _this.options.animationDuration,
            easing: _this.options.animationEasing
          };

          $(window).one('load', function () {
            if (_this.options.deepLinking) {
              if (location.hash) {
                _this.scrollToLoc(location.hash);
              }
            }

            _this.calcPoints();

            _this._updateActive();
          });
          this.$element.on({
            'resizeme.zf.trigger': this.reflow.bind(this),
            'scrollme.zf.trigger': this._updateActive.bind(this)
          }).on('click.zf.magellan', 'a[href^="#"]', function (e) {
            e.preventDefault();
            var arrival = this.getAttribute('href');

            _this.scrollToLoc(arrival);
          });
        }
      }, {
        key: 'scrollToLoc',
        value: function scrollToLoc(loc) {
          var scrollPos = Math.round($(loc).offset().top - this.options.threshold / 2 - this.options.barOffset);
          $('html, body').stop(true).animate({
            scrollTop: scrollPos
          }, this.options.animationDuration, this.options.animationEasing);
        }
      }, {
        key: 'reflow',
        value: function reflow() {
          this.calcPoints();

          this._updateActive();
        }
      }, {
        key: '_updateActive',
        value: function _updateActive() {
          var winPos = parseInt(window.pageYOffset, 10),
              curIdx;

          if (winPos + this.winHeight === this.docHeight) {
            curIdx = this.points.length - 1;
          } else if (winPos < this.points[0]) {
            curIdx = 0;
          } else {
            var isDown = this.scrollPos < winPos,
                _this = this,
                curVisible = this.points.filter(function (p, i) {
              return isDown ? p <= winPos : p - _this.options.threshold <= winPos;
            });

            curIdx = curVisible.length ? curVisible.length - 1 : 0;
          }

          this.$active.removeClass(this.options.activeClass);
          this.$active = this.$links.eq(curIdx).addClass(this.options.activeClass);

          if (this.options.deepLinking) {
            var hash = this.$active[0].getAttribute('href');

            if (window.history.pushState) {
              window.history.pushState(null, null, hash);
            } else {
              window.location.hash = hash;
            }
          }

          this.scrollPos = winPos;
          this.$element.trigger('update.zf.magellan', [this.$active]);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.off('.zf.trigger .zf.magellan').find('.' + this.options.activeClass).removeClass(this.options.activeClass);

          if (this.options.deepLinking) {
            var hash = this.$active[0].getAttribute('href');
            window.location.hash.replace(hash, '');
          }

          Foundation.unregisterPlugin(this);
        }
      }]);

      return Magellan;
    }();

    Magellan.defaults = {
      animationDuration: 500,
      animationEasing: 'linear',
      threshold: 50,
      activeClass: 'active',
      deepLinking: false,
      barOffset: 0
    };
    Foundation.plugin(Magellan, 'Magellan');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationOffcanvas = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var OffCanvas = function () {
      function OffCanvas(element, options) {
        _classCallCheck(this, OffCanvas);

        this.$element = element;
        this.options = $.extend({}, OffCanvas.defaults, this.$element.data(), options);
        this.$lastTrigger = $();

        this._init();

        this._events();

        Foundation.registerPlugin(this, 'OffCanvas');
      }

      _createClass(OffCanvas, [{
        key: '_init',
        value: function _init() {
          var id = this.$element.attr('id');
          this.$element.attr('aria-hidden', 'true');
          $(document).find('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-expanded', 'false').attr('aria-controls', id);

          if (this.options.closeOnClick) {
            if ($('.js-off-canvas-exit').length) {
              this.$exiter = $('.js-off-canvas-exit');
            } else {
              var exiter = document.createElement('div');
              exiter.setAttribute('class', 'js-off-canvas-exit');
              $('[data-off-canvas-content]').append(exiter);
              this.$exiter = $(exiter);
            }
          }

          this.options.isRevealed = this.options.isRevealed || new RegExp(this.options.revealClass, 'g').test(this.$element[0].className);

          if (this.options.isRevealed) {
            this.options.revealOn = this.options.revealOn || this.$element[0].className.match(/(reveal-for-medium|reveal-for-large)/g)[0].split('-')[2];

            this._setMQChecker();
          }

          if (!this.options.transitionTime) {
            this.options.transitionTime = parseFloat(window.getComputedStyle($('[data-off-canvas-wrapper]')[0]).transitionDuration) * 1000;
          }
        }
      }, {
        key: '_events',
        value: function _events() {
          this.$element.off('.zf.trigger .zf.offcanvas').on({
            'open.zf.trigger': this.open.bind(this),
            'close.zf.trigger': this.close.bind(this),
            'toggle.zf.trigger': this.toggle.bind(this),
            'keydown.zf.offcanvas': this._handleKeyboard.bind(this)
          });

          if (this.options.closeOnClick && this.$exiter.length) {
            this.$exiter.on({
              'click.zf.offcanvas': this.close.bind(this)
            });
          }
        }
      }, {
        key: '_setMQChecker',
        value: function _setMQChecker() {
          var _this = this;

          $(window).on('changed.zf.mediaquery', function () {
            if (Foundation.MediaQuery.atLeast(_this.options.revealOn)) {
              _this.reveal(true);
            } else {
              _this.reveal(false);
            }
          }).one('load.zf.offcanvas', function () {
            if (Foundation.MediaQuery.atLeast(_this.options.revealOn)) {
              _this.reveal(true);
            }
          });
        }
      }, {
        key: 'reveal',
        value: function reveal(isRevealed) {
          var $closer = this.$element.find('[data-close]');

          if (isRevealed) {
            this.close();
            this.isRevealed = true;
            this.$element.off('open.zf.trigger toggle.zf.trigger');

            if ($closer.length) {
              $closer.hide();
            }
          } else {
            this.isRevealed = false;
            this.$element.on({
              'open.zf.trigger': this.open.bind(this),
              'toggle.zf.trigger': this.toggle.bind(this)
            });

            if ($closer.length) {
              $closer.show();
            }
          }
        }
      }, {
        key: 'open',
        value: function open(event, trigger) {
          if (this.$element.hasClass('is-open') || this.isRevealed) {
            return;
          }

          var _this = this,
              $body = $(document.body);

          if (this.options.forceTop) {
            $('body').scrollTop(0);
          }

          Foundation.Move(this.options.transitionTime, this.$element, function () {
            $('[data-off-canvas-wrapper]').addClass('is-off-canvas-open is-open-' + _this.options.position);

            _this.$element.addClass('is-open');
          });
          this.$element.attr('aria-hidden', 'false').trigger('opened.zf.offcanvas');

          if (this.options.closeOnClick) {
            this.$exiter.addClass('is-visible');
          }

          if (trigger) {
            this.$lastTrigger = trigger.attr('aria-expanded', 'true');
          }

          if (this.options.autoFocus) {
            this.$element.one(Foundation.transitionend(this.$element), function () {
              _this.$element.find('a, button').eq(0).focus();
            });
          }

          if (this.options.trapFocus) {
            $('[data-off-canvas-content]').attr('tabindex', '-1');

            this._trapFocus();
          }
        }
      }, {
        key: '_trapFocus',
        value: function _trapFocus() {
          var focusable = Foundation.Keyboard.findFocusable(this.$element),
              first = focusable.eq(0),
              last = focusable.eq(-1);
          focusable.off('.zf.offcanvas').on('keydown.zf.offcanvas', function (e) {
            if (e.which === 9 || e.keycode === 9) {
              if (e.target === last[0] && !e.shiftKey) {
                e.preventDefault();
                first.focus();
              }

              if (e.target === first[0] && e.shiftKey) {
                e.preventDefault();
                last.focus();
              }
            }
          });
        }
      }, {
        key: 'close',
        value: function close(cb) {
          if (!this.$element.hasClass('is-open') || this.isRevealed) {
            return;
          }

          var _this = this;

          $('[data-off-canvas-wrapper]').removeClass('is-off-canvas-open is-open-' + _this.options.position);

          _this.$element.removeClass('is-open');

          this.$element.attr('aria-hidden', 'true').trigger('closed.zf.offcanvas');

          if (this.options.closeOnClick) {
            this.$exiter.removeClass('is-visible');
          }

          this.$lastTrigger.attr('aria-expanded', 'false');

          if (this.options.trapFocus) {
            $('[data-off-canvas-content]').removeAttr('tabindex');
          }
        }
      }, {
        key: 'toggle',
        value: function toggle(event, trigger) {
          if (this.$element.hasClass('is-open')) {
            this.close(event, trigger);
          } else {
            this.open(event, trigger);
          }
        }
      }, {
        key: '_handleKeyboard',
        value: function _handleKeyboard(event) {
          if (event.which !== 27) return;
          event.stopPropagation();
          event.preventDefault();
          this.close();
          this.$lastTrigger.focus();
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.close();
          this.$element.off('.zf.trigger .zf.offcanvas');
          this.$exiter.off('.zf.offcanvas');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return OffCanvas;
    }();

    OffCanvas.defaults = {
      closeOnClick: true,
      transitionTime: 0,
      position: 'left',
      forceTop: true,
      isRevealed: false,
      revealOn: null,
      autoFocus: true,
      revealClass: 'reveal-for-',
      trapFocus: false
    };
    Foundation.plugin(OffCanvas, 'OffCanvas');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationOrbit = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Orbit = function () {
      function Orbit(element, options) {
        _classCallCheck(this, Orbit);

        this.$element = element;
        this.options = $.extend({}, Orbit.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Orbit');
        Foundation.Keyboard.register('Orbit', {
          'ltr': {
            'ARROW_RIGHT': 'next',
            'ARROW_LEFT': 'previous'
          },
          'rtl': {
            'ARROW_LEFT': 'next',
            'ARROW_RIGHT': 'previous'
          }
        });
      }

      _createClass(Orbit, [{
        key: '_init',
        value: function _init() {
          this.$wrapper = this.$element.find('.' + this.options.containerClass);
          this.$slides = this.$element.find('.' + this.options.slideClass);
          var $images = this.$element.find('img'),
              initActive = this.$slides.filter('.is-active');

          if (!initActive.length) {
            this.$slides.eq(0).addClass('is-active');
          }

          if (!this.options.useMUI) {
            this.$slides.addClass('no-motionui');
          }

          if ($images.length) {
            Foundation.onImagesLoaded($images, this._prepareForOrbit.bind(this));
          } else {
            this._prepareForOrbit();
          }

          if (this.options.bullets) {
            this._loadBullets();
          }

          this._events();

          if (this.options.autoPlay && this.$slides.length > 1) {
            this.geoSync();
          }

          if (this.options.accessible) {
            this.$wrapper.attr('tabindex', 0);
          }
        }
      }, {
        key: '_loadBullets',
        value: function _loadBullets() {
          this.$bullets = this.$element.find('.' + this.options.boxOfBullets).find('button');
        }
      }, {
        key: 'geoSync',
        value: function geoSync() {
          var _this = this;

          this.timer = new Foundation.Timer(this.$element, {
            duration: this.options.timerDelay,
            infinite: false
          }, function () {
            _this.changeSlide(true);
          });
          this.timer.start();
        }
      }, {
        key: '_prepareForOrbit',
        value: function _prepareForOrbit() {
          var _this = this;

          this._setWrapperHeight(function (max) {
            _this._setSlideHeight(max);
          });
        }
      }, {
        key: '_setWrapperHeight',
        value: function _setWrapperHeight(cb) {
          var max = 0,
              temp,
              counter = 0;
          this.$slides.each(function () {
            temp = this.getBoundingClientRect().height;
            $(this).attr('data-slide', counter);

            if (counter) {
              $(this).css({
                'position': 'relative',
                'display': 'none'
              });
            }

            max = temp > max ? temp : max;
            counter++;
          });

          if (counter === this.$slides.length) {
            this.$wrapper.css({
              'height': max
            });
            cb(max);
          }
        }
      }, {
        key: '_setSlideHeight',
        value: function _setSlideHeight(height) {
          this.$slides.each(function () {
            $(this).css('max-height', height);
          });
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          if (this.$slides.length > 1) {
            if (this.options.swipe) {
              this.$slides.off('swipeleft.zf.orbit swiperight.zf.orbit').on('swipeleft.zf.orbit', function (e) {
                e.preventDefault();

                _this.changeSlide(true);
              }).on('swiperight.zf.orbit', function (e) {
                e.preventDefault();

                _this.changeSlide(false);
              });
            }

            if (this.options.autoPlay) {
              this.$slides.on('click.zf.orbit', function () {
                _this.$element.data('clickedOn', _this.$element.data('clickedOn') ? false : true);

                _this.timer[_this.$element.data('clickedOn') ? 'pause' : 'start']();
              });

              if (this.options.pauseOnHover) {
                this.$element.on('mouseenter.zf.orbit', function () {
                  _this.timer.pause();
                }).on('mouseleave.zf.orbit', function () {
                  if (!_this.$element.data('clickedOn')) {
                    _this.timer.start();
                  }
                });
              }
            }

            if (this.options.navButtons) {
              var $controls = this.$element.find('.' + this.options.nextClass + ', .' + this.options.prevClass);
              $controls.attr('tabindex', 0).on('click.zf.orbit touchend.zf.orbit', function () {
                _this.changeSlide($(this).hasClass(_this.options.nextClass));
              });
            }

            if (this.options.bullets) {
              this.$bullets.on('click.zf.orbit touchend.zf.orbit', function () {
                if (/is-active/g.test(this.className)) {
                  return false;
                }

                var idx = $(this).data('slide'),
                    ltr = idx > _this.$slides.filter('.is-active').data('slide'),
                    $slide = _this.$slides.eq(idx);

                _this.changeSlide(ltr, $slide, idx);
              });
            }

            this.$wrapper.add(this.$bullets).on('keydown.zf.orbit', function (e) {
              Foundation.Keyboard.handleKey(e, 'Orbit', {
                next: function () {
                  _this.changeSlide(true);
                },
                previous: function () {
                  _this.changeSlide(false);
                },
                handled: function () {
                  if ($(e.target).is(_this.$bullets)) {
                    _this.$bullets.filter('.is-active').focus();
                  }
                }
              });
            });
          }
        }
      }, {
        key: 'changeSlide',
        value: function changeSlide(isLTR, chosenSlide, idx) {
          var $curSlide = this.$slides.filter('.is-active').eq(0);

          if (/mui/g.test($curSlide[0].className)) {
            return false;
          }

          var $firstSlide = this.$slides.first(),
              $lastSlide = this.$slides.last(),
              dirIn = isLTR ? 'Right' : 'Left',
              dirOut = isLTR ? 'Left' : 'Right',
              _this = this,
              $newSlide;

          if (!chosenSlide) {
            $newSlide = isLTR ? this.options.infiniteWrap ? $curSlide.next('.' + this.options.slideClass).length ? $curSlide.next('.' + this.options.slideClass) : $firstSlide : $curSlide.next('.' + this.options.slideClass) : this.options.infiniteWrap ? $curSlide.prev('.' + this.options.slideClass).length ? $curSlide.prev('.' + this.options.slideClass) : $lastSlide : $curSlide.prev('.' + this.options.slideClass);
          } else {
            $newSlide = chosenSlide;
          }

          if ($newSlide.length) {
            if (this.options.bullets) {
              idx = idx || this.$slides.index($newSlide);

              this._updateBullets(idx);
            }

            if (this.options.useMUI) {
              Foundation.Motion.animateIn($newSlide.addClass('is-active').css({
                'position': 'absolute',
                'top': 0
              }), this.options['animInFrom' + dirIn], function () {
                $newSlide.css({
                  'position': 'relative',
                  'display': 'block'
                }).attr('aria-live', 'polite');
              });
              Foundation.Motion.animateOut($curSlide.removeClass('is-active'), this.options['animOutTo' + dirOut], function () {
                $curSlide.removeAttr('aria-live');

                if (_this.options.autoPlay && !_this.timer.isPaused) {
                  _this.timer.restart();
                }
              });
            } else {
              $curSlide.removeClass('is-active is-in').removeAttr('aria-live').hide();
              $newSlide.addClass('is-active is-in').attr('aria-live', 'polite').show();

              if (this.options.autoPlay && !this.timer.isPaused) {
                this.timer.restart();
              }
            }

            this.$element.trigger('slidechange.zf.orbit', [$newSlide]);
          }
        }
      }, {
        key: '_updateBullets',
        value: function _updateBullets(idx) {
          var $oldBullet = this.$element.find('.' + this.options.boxOfBullets).find('.is-active').removeClass('is-active').blur(),
              span = $oldBullet.find('span:last').detach(),
              $newBullet = this.$bullets.eq(idx).addClass('is-active').append(span);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.off('.zf.orbit').find('*').off('.zf.orbit').end().hide();
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Orbit;
    }();

    Orbit.defaults = {
      bullets: true,
      navButtons: true,
      animInFromRight: 'slide-in-right',
      animOutToRight: 'slide-out-right',
      animInFromLeft: 'slide-in-left',
      animOutToLeft: 'slide-out-left',
      autoPlay: true,
      timerDelay: 5000,
      infiniteWrap: true,
      swipe: true,
      pauseOnHover: true,
      accessible: true,
      containerClass: 'orbit-container',
      slideClass: 'orbit-slide',
      boxOfBullets: 'orbit-bullets',
      nextClass: 'orbit-next',
      prevClass: 'orbit-previous',
      useMUI: true
    };
    Foundation.plugin(Orbit, 'Orbit');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationResponsiveMenu = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var ResponsiveMenu = function () {
      function ResponsiveMenu(element, options) {
        _classCallCheck(this, ResponsiveMenu);

        this.$element = $(element);
        this.rules = this.$element.data('responsive-menu');
        this.currentMq = null;
        this.currentPlugin = null;

        this._init();

        this._events();

        Foundation.registerPlugin(this, 'ResponsiveMenu');
      }

      _createClass(ResponsiveMenu, [{
        key: '_init',
        value: function _init() {
          var rulesTree = {};
          var rules = this.rules.split(' ');

          for (var i = 0; i < rules.length; i++) {
            var rule = rules[i].split('-');
            var ruleSize = rule.length > 1 ? rule[0] : 'small';
            var rulePlugin = rule.length > 1 ? rule[1] : rule[0];

            if (MenuPlugins[rulePlugin] !== null) {
              rulesTree[ruleSize] = MenuPlugins[rulePlugin];
            }
          }

          this.rules = rulesTree;

          if (!$.isEmptyObject(rulesTree)) {
            this._checkMediaQueries();
          }
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          $(window).on('changed.zf.mediaquery', function () {
            _this._checkMediaQueries();
          });
        }
      }, {
        key: '_checkMediaQueries',
        value: function _checkMediaQueries() {
          var matchedMq,
              _this = this;

          $.each(this.rules, function (key) {
            if (Foundation.MediaQuery.atLeast(key)) {
              matchedMq = key;
            }
          });
          if (!matchedMq) return;
          if (this.currentPlugin instanceof this.rules[matchedMq].plugin) return;
          $.each(MenuPlugins, function (key, value) {
            _this.$element.removeClass(value.cssClass);
          });
          this.$element.addClass(this.rules[matchedMq].cssClass);
          if (this.currentPlugin) this.currentPlugin.destroy();
          this.currentPlugin = new this.rules[matchedMq].plugin(this.$element, {});
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.currentPlugin.destroy();
          $(window).off('.zf.ResponsiveMenu');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return ResponsiveMenu;
    }();

    ResponsiveMenu.defaults = {};
    var MenuPlugins = {
      dropdown: {
        cssClass: 'dropdown',
        plugin: Foundation._plugins['dropdown-menu'] || null
      },
      drilldown: {
        cssClass: 'drilldown',
        plugin: Foundation._plugins['drilldown'] || null
      },
      accordion: {
        cssClass: 'accordion-menu',
        plugin: Foundation._plugins['accordion-menu'] || null
      }
    };
    Foundation.plugin(ResponsiveMenu, 'ResponsiveMenu');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationResponsiveToggle = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var ResponsiveToggle = function () {
      function ResponsiveToggle(element, options) {
        _classCallCheck(this, ResponsiveToggle);

        this.$element = $(element);
        this.options = $.extend({}, ResponsiveToggle.defaults, this.$element.data(), options);

        this._init();

        this._events();

        Foundation.registerPlugin(this, 'ResponsiveToggle');
      }

      _createClass(ResponsiveToggle, [{
        key: '_init',
        value: function _init() {
          var targetID = this.$element.data('responsive-toggle');

          if (!targetID) {
            console.error('Your tab bar needs an ID of a Menu as the value of data-tab-bar.');
          }

          this.$targetMenu = $('#' + targetID);
          this.$toggler = this.$element.find('[data-toggle]');

          this._update();
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          $(window).on('changed.zf.mediaquery', this._update.bind(this));
          this.$toggler.on('click.zf.responsiveToggle', this.toggleMenu.bind(this));
        }
      }, {
        key: '_update',
        value: function _update() {
          if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
            this.$element.show();
            this.$targetMenu.hide();
          } else {
            this.$element.hide();
            this.$targetMenu.show();
          }
        }
      }, {
        key: 'toggleMenu',
        value: function toggleMenu() {
          if (!Foundation.MediaQuery.atLeast(this.options.hideFor)) {
            this.$targetMenu.toggle(0);
            this.$element.trigger('toggled.zf.responsiveToggle');
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {}
      }]);

      return ResponsiveToggle;
    }();

    ResponsiveToggle.defaults = {
      hideFor: 'medium'
    };
    Foundation.plugin(ResponsiveToggle, 'ResponsiveToggle');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationReveal = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Reveal = function () {
      function Reveal(element, options) {
        _classCallCheck(this, Reveal);

        this.$element = element;
        this.options = $.extend({}, Reveal.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Reveal');
        Foundation.Keyboard.register('Reveal', {
          'ENTER': 'open',
          'SPACE': 'open',
          'ESCAPE': 'close',
          'TAB': 'tab_forward',
          'SHIFT_TAB': 'tab_backward'
        });
      }

      _createClass(Reveal, [{
        key: '_init',
        value: function _init() {
          this.id = this.$element.attr('id');
          this.isActive = false;
          this.cached = {
            mq: Foundation.MediaQuery.current
          };
          this.isiOS = iPhoneSniff();

          if (this.isiOS) {
            this.$element.addClass('is-ios');
          }

          this.$anchor = $('[data-open="' + this.id + '"]').length ? $('[data-open="' + this.id + '"]') : $('[data-toggle="' + this.id + '"]');

          if (this.$anchor.length) {
            var anchorId = this.$anchor[0].id || Foundation.GetYoDigits(6, 'reveal');
            this.$anchor.attr({
              'aria-controls': this.id,
              'id': anchorId,
              'aria-haspopup': true,
              'tabindex': 0
            });
            this.$element.attr({
              'aria-labelledby': anchorId
            });
          }

          if (this.options.fullScreen || this.$element.hasClass('full')) {
            this.options.fullScreen = true;
            this.options.overlay = false;
          }

          if (this.options.overlay && !this.$overlay) {
            this.$overlay = this._makeOverlay(this.id);
          }

          this.$element.attr({
            'role': 'dialog',
            'aria-hidden': true,
            'data-yeti-box': this.id,
            'data-resize': this.id
          });

          this._events();

          if (this.options.deepLink && window.location.hash === '#' + this.id) {
            $(window).one('load.zf.reveal', this.open.bind(this));
          }
        }
      }, {
        key: '_makeOverlay',
        value: function _makeOverlay(id) {
          var $overlay = $('<div></div>').addClass('reveal-overlay').attr({
            'tabindex': -1,
            'aria-hidden': true
          }).appendTo('body');

          if (this.options.closeOnClick) {
            $overlay.attr({
              'data-close': id
            });
          }

          return $overlay;
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          this.$element.on({
            'open.zf.trigger': this.open.bind(this),
            'close.zf.trigger': this.close.bind(this),
            'toggle.zf.trigger': this.toggle.bind(this),
            'resizeme.zf.trigger': function () {
              _this.updateVals = true;

              if (_this.isActive) {
                _this._setPosition();
              }
            }
          });

          if (this.$anchor.length) {
            this.$anchor.on('keydown.zf.reveal', function (e) {
              if (e.which === 13 || e.which === 32) {
                e.stopPropagation();
                e.preventDefault();

                _this.open();
              }
            });
          }

          if (this.options.closeOnClick && this.options.overlay) {
            this.$overlay.off('.zf.reveal').on('click.zf.reveal', this.close.bind(this));
          }

          if (this.options.deepLink) {
            $(window).on('popstate.zf.reveal:' + this.id, this._handleState.bind(this));
          }
        }
      }, {
        key: '_handleState',
        value: function _handleState(e) {
          if (window.location.hash === '#' + this.id && !this.isActive) {
            this.open();
          } else {
            this.close();
          }
        }
      }, {
        key: '_cacheValues',
        value: function _cacheValues() {
          if (this.cached.mq !== Foundation.MediaQuery.current || this.$offsetParent === undefined) {
            this.$offsetParent = this.$element.offsetParent();
            this.cached.mq = Foundation.MediaQuery.current;
          }

          this.cached.parentOffset = this.$offsetParent.offset();
          this.cached.modalDims = this.$element[0].getBoundingClientRect();
          this.cached.winWidth = window.innerWidth;
          this.cached.vertOffset = window.innerHeight > this.cached.modalDims.height ? this.options.vOffset : 0;
          this.updateVals = false;
          return;
        }
      }, {
        key: '_setPosition',
        value: function _setPosition(cb) {
          if (!this.cached.winWidth || this.updateVals) {
            this._cacheValues();
          }

          var x = Math.round((this.cached.winWidth - this.cached.modalDims.width) / 2 - (this.cached.parentOffset.left > 0 ? this.cached.parentOffset.left : 0)),
              y = Math.round(window.pageYOffset - (this.cached.parentOffset.top > 0 ? this.cached.parentOffset.top : 0) + this.cached.vertOffset);
          this.$element.css(this._applyCss(x, y));
          if (cb) cb();
        }
      }, {
        key: '_applyCss',
        value: function _applyCss(x, y) {
          var _this = this;

          return _this.options.animationIn ? {
            top: y + 'px',
            left: x + 'px'
          } : {
            transform: 'translate(' + x + 'px, ' + y + 'px)'
          };
        }
      }, {
        key: 'open',
        value: function open() {
          if (this.options.deepLink) {
            var hash = '#' + this.id;

            if (window.history.pushState) {
              window.history.pushState(null, null, hash);
            } else {
              window.location.hash = hash;
            }
          }

          var _this = this;

          this.isActive = true;
          this.$element.css({
            'visibility': 'hidden'
          }).show().scrollTop(0);

          this._setPosition(function () {
            _this.$element.hide().css({
              'visibility': ''
            });

            if (!_this.options.multipleOpened) {
              _this.$element.trigger('closeme.zf.reveal', _this.id);
            }

            if (_this.options.animationIn) {
              if (_this.options.overlay) {
                Foundation.Motion.animateIn(_this.$overlay, 'fade-in', function () {
                  Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function () {
                    _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                  });
                });
              } else {
                Foundation.Motion.animateIn(_this.$element, _this.options.animationIn, function () {
                  _this.focusableElements = Foundation.Keyboard.findFocusable(_this.$element);
                });
              }
            } else {
              if (_this.options.overlay) {
                _this.$overlay.show(0, function () {
                  _this.$element.show(_this.options.showDelay, function () {});
                });
              } else {
                _this.$element.show(_this.options.showDelay, function () {});
              }
            }
          });

          this.$element.attr({
            'aria-hidden': false
          }).attr('tabindex', -1).focus().trigger('open.zf.reveal');

          if (this.isiOS) {
            var scrollPos = window.pageYOffset;
            $('html, body').addClass('is-reveal-open').scrollTop(scrollPos);
          } else {
            $('body').addClass('is-reveal-open');
          }

          $('body').addClass('is-reveal-open').attr({
            'aria-hidden': this.options.overlay || this.options.fullScreen ? true : false
          });
          setTimeout(function () {
            _this._extraHandlers();
          }, 0);
        }
      }, {
        key: '_extraHandlers',
        value: function _extraHandlers() {
          var _this = this;

          this.focusableElements = Foundation.Keyboard.findFocusable(this.$element);

          if (!this.options.overlay && this.options.closeOnClick && !this.options.fullScreen) {
            $('body').on('click.zf.reveal', function (e) {
              if (e.target === _this.$element[0] || $.contains(_this.$element[0], e.target)) {
                return;
              }

              _this.close();
            });
          }

          if (this.options.closeOnEsc) {
            $(window).on('keydown.zf.reveal', function (e) {
              Foundation.Keyboard.handleKey(e, 'Reveal', {
                close: function () {
                  if (_this.options.closeOnEsc) {
                    _this.close();

                    _this.$anchor.focus();
                  }
                }
              });

              if (_this.focusableElements.length === 0) {
                e.preventDefault();
              }
            });
          }

          this.$element.on('keydown.zf.reveal', function (e) {
            var $target = $(this);
            Foundation.Keyboard.handleKey(e, 'Reveal', {
              tab_forward: function () {
                if (_this.$element.find(':focus').is(_this.focusableElements.eq(-1))) {
                  _this.focusableElements.eq(0).focus();

                  e.preventDefault();
                }
              },
              tab_backward: function () {
                if (_this.$element.find(':focus').is(_this.focusableElements.eq(0)) || _this.$element.is(':focus')) {
                  _this.focusableElements.eq(-1).focus();

                  e.preventDefault();
                }
              },
              open: function () {
                if (_this.$element.find(':focus').is(_this.$element.find('[data-close]'))) {
                  setTimeout(function () {
                    _this.$anchor.focus();
                  }, 1);
                } else if ($target.is(_this.focusableElements)) {
                  _this.open();
                }
              },
              close: function () {
                if (_this.options.closeOnEsc) {
                  _this.close();

                  _this.$anchor.focus();
                }
              }
            });
          });
        }
      }, {
        key: 'close',
        value: function close() {
          if (!this.isActive || !this.$element.is(':visible')) {
            return false;
          }

          var _this = this;

          if (this.options.animationOut) {
            Foundation.Motion.animateOut(this.$element, this.options.animationOut, function () {
              if (_this.options.overlay) {
                Foundation.Motion.animateOut(_this.$overlay, 'fade-out', finishUp);
              } else {
                finishUp();
              }
            });
          } else {
            this.$element.hide(_this.options.hideDelay, function () {
              if (_this.options.overlay) {
                _this.$overlay.hide(0, finishUp);
              } else {
                finishUp();
              }
            });
          }

          if (this.options.closeOnEsc) {
            $(window).off('keydown.zf.reveal');
          }

          if (!this.options.overlay && this.options.closeOnClick) {
            $('body').off('click.zf.reveal');
          }

          this.$element.off('keydown.zf.reveal');

          function finishUp() {
            if (_this.isiOS) {
              $('html, body').removeClass('is-reveal-open');
            } else {
              $('body').removeClass('is-reveal-open');
            }

            $('body').attr({
              'aria-hidden': false,
              'tabindex': ''
            });

            _this.$element.attr({
              'aria-hidden': true
            }).trigger('closed.zf.reveal');
          }

          if (this.options.resetOnClose) {
            this.$element.html(this.$element.html());
          }

          this.isActive = false;

          if (_this.options.deepLink) {
            if (window.history.replaceState) {
              window.history.replaceState("", document.title, window.location.pathname);
            } else {
              window.location.hash = '';
            }
          }
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          if (this.isActive) {
            this.close();
          } else {
            this.open();
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          if (this.options.overlay) {
            this.$overlay.hide().off().remove();
          }

          this.$element.hide().off();
          this.$anchor.off('.zf');
          $(window).off('.zf.reveal:' + this.id);
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Reveal;
    }();

    Reveal.defaults = {
      animationIn: '',
      animationOut: '',
      showDelay: 0,
      hideDelay: 0,
      closeOnClick: true,
      closeOnEsc: true,
      multipleOpened: false,
      vOffset: 100,
      hOffset: 0,
      fullScreen: false,
      btmOffsetPct: 10,
      overlay: true,
      resetOnClose: false,
      deepLink: false
    };
    Foundation.plugin(Reveal, 'Reveal');

    function iPhoneSniff() {
      return (/iP(ad|hone|od).*OS/.test(window.navigator.userAgent)
      );
    }
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationSlider = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Slider = function () {
      function Slider(element, options) {
        _classCallCheck(this, Slider);

        this.$element = element;
        this.options = $.extend({}, Slider.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Slider');
        Foundation.Keyboard.register('Slider', {
          'ltr': {
            'ARROW_RIGHT': 'increase',
            'ARROW_UP': 'increase',
            'ARROW_DOWN': 'decrease',
            'ARROW_LEFT': 'decrease',
            'SHIFT_ARROW_RIGHT': 'increase_fast',
            'SHIFT_ARROW_UP': 'increase_fast',
            'SHIFT_ARROW_DOWN': 'decrease_fast',
            'SHIFT_ARROW_LEFT': 'decrease_fast'
          },
          'rtl': {
            'ARROW_LEFT': 'increase',
            'ARROW_RIGHT': 'decrease',
            'SHIFT_ARROW_LEFT': 'increase_fast',
            'SHIFT_ARROW_RIGHT': 'decrease_fast'
          }
        });
      }

      _createClass(Slider, [{
        key: '_init',
        value: function _init() {
          this.inputs = this.$element.find('input');
          this.handles = this.$element.find('[data-slider-handle]');
          this.$handle = this.handles.eq(0);
          this.$input = this.inputs.length ? this.inputs.eq(0) : $('#' + this.$handle.attr('aria-controls'));
          this.$fill = this.$element.find('[data-slider-fill]').css(this.options.vertical ? 'height' : 'width', 0);

          var isDbl = false,
              _this = this;

          if (this.options.disabled || this.$element.hasClass(this.options.disabledClass)) {
            this.options.disabled = true;
            this.$element.addClass(this.options.disabledClass);
          }

          if (!this.inputs.length) {
            this.inputs = $().add(this.$input);
            this.options.binding = true;
          }

          this._setInitAttr(0);

          this._events(this.$handle);

          if (this.handles[1]) {
            this.options.doubleSided = true;
            this.$handle2 = this.handles.eq(1);
            this.$input2 = this.inputs.length > 1 ? this.inputs.eq(1) : $('#' + this.$handle2.attr('aria-controls'));

            if (!this.inputs[1]) {
              this.inputs = this.inputs.add(this.$input2);
            }

            isDbl = true;

            this._setHandlePos(this.$handle, this.options.initialStart, true, function () {
              _this._setHandlePos(_this.$handle2, _this.options.initialEnd, true);
            });

            this._setInitAttr(1);

            this._events(this.$handle2);
          }

          if (!isDbl) {
            this._setHandlePos(this.$handle, this.options.initialStart, true);
          }
        }
      }, {
        key: '_setHandlePos',
        value: function _setHandlePos($hndl, location, noInvert, cb) {
          location = parseFloat(location);

          if (location < this.options.start) {
            location = this.options.start;
          } else if (location > this.options.end) {
            location = this.options.end;
          }

          var isDbl = this.options.doubleSided;

          if (isDbl) {
            if (this.handles.index($hndl) === 0) {
              var h2Val = parseFloat(this.$handle2.attr('aria-valuenow'));
              location = location >= h2Val ? h2Val - this.options.step : location;
            } else {
              var h1Val = parseFloat(this.$handle.attr('aria-valuenow'));
              location = location <= h1Val ? h1Val + this.options.step : location;
            }
          }

          if (this.options.vertical && !noInvert) {
            location = this.options.end - location;
          }

          var _this = this,
              vert = this.options.vertical,
              hOrW = vert ? 'height' : 'width',
              lOrT = vert ? 'top' : 'left',
              handleDim = $hndl[0].getBoundingClientRect()[hOrW],
              elemDim = this.$element[0].getBoundingClientRect()[hOrW],
              pctOfBar = percent(location, this.options.end).toFixed(2),
              pxToMove = (elemDim - handleDim) * pctOfBar,
              movement = (percent(pxToMove, elemDim) * 100).toFixed(this.options.decimal);

          location = parseFloat(location.toFixed(this.options.decimal));
          var css = {};

          this._setValues($hndl, location);

          if (isDbl) {
            var isLeftHndl = this.handles.index($hndl) === 0,
                dim,
                handlePct = ~ ~(percent(handleDim, elemDim) * 100);

            if (isLeftHndl) {
              css[lOrT] = movement + '%';
              dim = parseFloat(this.$handle2[0].style[lOrT]) - movement + handlePct;

              if (cb && typeof cb === 'function') {
                cb();
              }
            } else {
              var handlePos = parseFloat(this.$handle[0].style[lOrT]);
              dim = movement - (isNaN(handlePos) ? this.options.initialStart / ((this.options.end - this.options.start) / 100) : handlePos) + handlePct;
            }

            css['min-' + hOrW] = dim + '%';
          }

          this.$element.one('finished.zf.animate', function () {
            _this.$element.trigger('moved.zf.slider', [$hndl]);
          });
          var moveTime = this.$element.data('dragging') ? 1000 / 60 : this.options.moveTime;
          Foundation.Move(moveTime, $hndl, function () {
            $hndl.css(lOrT, movement + '%');

            if (!_this.options.doubleSided) {
              _this.$fill.css(hOrW, pctOfBar * 100 + '%');
            } else {
              _this.$fill.css(css);
            }
          });
        }
      }, {
        key: '_setInitAttr',
        value: function _setInitAttr(idx) {
          var id = this.inputs.eq(idx).attr('id') || Foundation.GetYoDigits(6, 'slider');
          this.inputs.eq(idx).attr({
            'id': id,
            'max': this.options.end,
            'min': this.options.start,
            'step': this.options.step
          });
          this.handles.eq(idx).attr({
            'role': 'slider',
            'aria-controls': id,
            'aria-valuemax': this.options.end,
            'aria-valuemin': this.options.start,
            'aria-valuenow': idx === 0 ? this.options.initialStart : this.options.initialEnd,
            'aria-orientation': this.options.vertical ? 'vertical' : 'horizontal',
            'tabindex': 0
          });
        }
      }, {
        key: '_setValues',
        value: function _setValues($handle, val) {
          var idx = this.options.doubleSided ? this.handles.index($handle) : 0;
          this.inputs.eq(idx).val(val);
          $handle.attr('aria-valuenow', val);
        }
      }, {
        key: '_handleEvent',
        value: function _handleEvent(e, $handle, val) {
          var value, hasVal;

          if (!val) {
            e.preventDefault();

            var _this = this,
                vertical = this.options.vertical,
                param = vertical ? 'height' : 'width',
                direction = vertical ? 'top' : 'left',
                pageXY = vertical ? e.pageY : e.pageX,
                halfOfHandle = this.$handle[0].getBoundingClientRect()[param] / 2,
                barDim = this.$element[0].getBoundingClientRect()[param],
                barOffset = this.$element.offset()[direction] - pageXY,
                barXY = barOffset > 0 ? -halfOfHandle : barOffset - halfOfHandle < -barDim ? barDim : Math.abs(barOffset),
                offsetPct = percent(barXY, barDim);

            value = (this.options.end - this.options.start) * offsetPct;

            if (Foundation.rtl() && !this.options.vertical) {
              value = this.options.end - value;
            }

            value = _this._adjustValue(null, value);
            hasVal = false;

            if (!$handle) {
              var firstHndlPos = absPosition(this.$handle, direction, barXY, param),
                  secndHndlPos = absPosition(this.$handle2, direction, barXY, param);
              $handle = firstHndlPos <= secndHndlPos ? this.$handle : this.$handle2;
            }
          } else {
            value = this._adjustValue($handle);
            hasVal = true;
          }

          this._setHandlePos($handle, value, hasVal);
        }
      }, {
        key: '_adjustValue',
        value: function _adjustValue($handle, value) {
          var val,
              step = this.options.step,
              div = parseFloat(step / 2),
              left,
              prev_val,
              next_val;

          if (!!$handle) {
            val = parseFloat($handle.attr('aria-valuenow'));
          } else {
            val = value;
          }

          left = val % step;
          prev_val = val - left;
          next_val = prev_val + step;

          if (left === 0) {
            return val;
          }

          val = val >= prev_val + div ? next_val : prev_val;
          return val;
        }
      }, {
        key: '_events',
        value: function _events($handle) {
          if (this.options.disabled) {
            return false;
          }

          var _this = this,
              curHandle,
              timer;

          this.inputs.off('change.zf.slider').on('change.zf.slider', function (e) {
            var idx = _this.inputs.index($(this));

            _this._handleEvent(e, _this.handles.eq(idx), $(this).val());
          });

          if (this.options.clickSelect) {
            this.$element.off('click.zf.slider').on('click.zf.slider', function (e) {
              if (_this.$element.data('dragging')) {
                return false;
              }

              if (!$(e.target).is('[data-slider-handle]')) {
                if (_this.options.doubleSided) {
                  _this._handleEvent(e);
                } else {
                  _this._handleEvent(e, _this.$handle);
                }
              }
            });
          }

          if (this.options.draggable) {
            this.handles.addTouch();
            var $body = $('body');
            $handle.off('mousedown.zf.slider').on('mousedown.zf.slider', function (e) {
              $handle.addClass('is-dragging');

              _this.$fill.addClass('is-dragging');

              _this.$element.data('dragging', true);

              curHandle = $(e.currentTarget);
              $body.on('mousemove.zf.slider', function (e) {
                e.preventDefault();

                _this._handleEvent(e, curHandle);
              }).on('mouseup.zf.slider', function (e) {
                _this._handleEvent(e, curHandle);

                $handle.removeClass('is-dragging');

                _this.$fill.removeClass('is-dragging');

                _this.$element.data('dragging', false);

                $body.off('mousemove.zf.slider mouseup.zf.slider');
              });
            });
          }

          $handle.off('keydown.zf.slider').on('keydown.zf.slider', function (e) {
            var _$handle = $(this),
                idx = _this.options.doubleSided ? _this.handles.index(_$handle) : 0,
                oldValue = parseFloat(_this.inputs.eq(idx).val()),
                newValue;

            Foundation.Keyboard.handleKey(e, 'Slider', {
              decrease: function () {
                newValue = oldValue - _this.options.step;
              },
              increase: function () {
                newValue = oldValue + _this.options.step;
              },
              decrease_fast: function () {
                newValue = oldValue - _this.options.step * 10;
              },
              increase_fast: function () {
                newValue = oldValue + _this.options.step * 10;
              },
              handled: function () {
                e.preventDefault();

                _this._setHandlePos(_$handle, newValue, true);
              }
            });
          });
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.handles.off('.zf.slider');
          this.inputs.off('.zf.slider');
          this.$element.off('.zf.slider');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Slider;
    }();

    Slider.defaults = {
      start: 0,
      end: 100,
      step: 1,
      initialStart: 0,
      initialEnd: 100,
      binding: false,
      clickSelect: true,
      vertical: false,
      draggable: true,
      disabled: false,
      doubleSided: false,
      decimal: 2,
      moveTime: 200,
      disabledClass: 'disabled',
      invertVertical: false
    };

    function percent(frac, num) {
      return frac / num;
    }

    function absPosition($handle, dir, clickPos, param) {
      return Math.abs($handle.position()[dir] + $handle[param]() / 2 - clickPos);
    }

    Foundation.plugin(Slider, 'Slider');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationSticky = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Sticky = function () {
      function Sticky(element, options) {
        _classCallCheck(this, Sticky);

        this.$element = element;
        this.options = $.extend({}, Sticky.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Sticky');
      }

      _createClass(Sticky, [{
        key: '_init',
        value: function _init() {
          var $parent = this.$element.parent('[data-sticky-container]'),
              id = this.$element[0].id || Foundation.GetYoDigits(6, 'sticky'),
              _this = this;

          if (!$parent.length) {
            this.wasWrapped = true;
          }

          this.$container = $parent.length ? $parent : $(this.options.container).wrapInner(this.$element);
          this.$container.addClass(this.options.containerClass);
          this.$element.addClass(this.options.stickyClass).attr({
            'data-resize': id
          });
          this.scrollCount = this.options.checkEvery;
          this.isStuck = false;
          $(window).one('load.zf.sticky', function () {
            if (_this.options.anchor !== '') {
              _this.$anchor = $('#' + _this.options.anchor);
            } else {
              _this._parsePoints();
            }

            _this._setSizes(function () {
              _this._calc(false);
            });

            _this._events(id.split('-').reverse().join('-'));
          });
        }
      }, {
        key: '_parsePoints',
        value: function _parsePoints() {
          var top = this.options.topAnchor,
              btm = this.options.btmAnchor,
              pts = [top, btm],
              breaks = {};

          if (top && btm) {
            for (var i = 0, len = pts.length; i < len && pts[i]; i++) {
              var pt;

              if (typeof pts[i] === 'number') {
                pt = pts[i];
              } else {
                var place = pts[i].split(':'),
                    anchor = $('#' + place[0]);
                pt = anchor.offset().top;

                if (place[1] && place[1].toLowerCase() === 'bottom') {
                  pt += anchor[0].getBoundingClientRect().height;
                }
              }

              breaks[i] = pt;
            }
          } else {
            breaks = {
              0: 1,
              1: document.documentElement.scrollHeight
            };
          }

          this.points = breaks;
          return;
        }
      }, {
        key: '_events',
        value: function _events(id) {
          var _this = this,
              scrollListener = this.scrollListener = 'scroll.zf.' + id;

          if (this.isOn) {
            return;
          }

          if (this.canStick) {
            this.isOn = true;
            $(window).off(scrollListener).on(scrollListener, function (e) {
              if (_this.scrollCount === 0) {
                _this.scrollCount = _this.options.checkEvery;

                _this._setSizes(function () {
                  _this._calc(false, window.pageYOffset);
                });
              } else {
                _this.scrollCount--;

                _this._calc(false, window.pageYOffset);
              }
            });
          }

          this.$element.off('resizeme.zf.trigger').on('resizeme.zf.trigger', function (e, el) {
            _this._setSizes(function () {
              _this._calc(false);

              if (_this.canStick) {
                if (!_this.isOn) {
                  _this._events(id);
                }
              } else if (_this.isOn) {
                _this._pauseListeners(scrollListener);
              }
            });
          });
        }
      }, {
        key: '_pauseListeners',
        value: function _pauseListeners(scrollListener) {
          this.isOn = false;
          $(window).off(scrollListener);
          this.$element.trigger('pause.zf.sticky');
        }
      }, {
        key: '_calc',
        value: function _calc(checkSizes, scroll) {
          if (checkSizes) {
            this._setSizes();
          }

          if (!this.canStick) {
            if (this.isStuck) {
              this._removeSticky(true);
            }

            return false;
          }

          if (!scroll) {
            scroll = window.pageYOffset;
          }

          if (scroll >= this.topPoint) {
            if (scroll <= this.bottomPoint) {
              if (!this.isStuck) {
                this._setSticky();
              }
            } else {
              if (this.isStuck) {
                this._removeSticky(false);
              }
            }
          } else {
            if (this.isStuck) {
              this._removeSticky(true);
            }
          }
        }
      }, {
        key: '_setSticky',
        value: function _setSticky() {
          var stickTo = this.options.stickTo,
              mrgn = stickTo === 'top' ? 'marginTop' : 'marginBottom',
              notStuckTo = stickTo === 'top' ? 'bottom' : 'top',
              css = {};
          css[mrgn] = this.options[mrgn] + 'em';
          css[stickTo] = 0;
          css[notStuckTo] = 'auto';
          css['left'] = this.$container.offset().left + parseInt(window.getComputedStyle(this.$container[0])["padding-left"], 10);
          this.isStuck = true;
          this.$element.removeClass('is-anchored is-at-' + notStuckTo).addClass('is-stuck is-at-' + stickTo).css(css).trigger('sticky.zf.stuckto:' + stickTo);
        }
      }, {
        key: '_removeSticky',
        value: function _removeSticky(isTop) {
          var stickTo = this.options.stickTo,
              stickToTop = stickTo === 'top',
              css = {},
              anchorPt = (this.points ? this.points[1] - this.points[0] : this.anchorHeight) - this.elemHeight,
              mrgn = stickToTop ? 'marginTop' : 'marginBottom',
              notStuckTo = stickToTop ? 'bottom' : 'top',
              topOrBottom = isTop ? 'top' : 'bottom';
          css[mrgn] = 0;

          if (isTop && !stickToTop || stickToTop && !isTop) {
            css[stickTo] = anchorPt;
            css[notStuckTo] = 0;
          } else {
            css[stickTo] = 0;
            css[notStuckTo] = anchorPt;
          }

          css['left'] = '';
          this.isStuck = false;
          this.$element.removeClass('is-stuck is-at-' + stickTo).addClass('is-anchored is-at-' + topOrBottom).css(css).trigger('sticky.zf.unstuckfrom:' + topOrBottom);
        }
      }, {
        key: '_setSizes',
        value: function _setSizes(cb) {
          this.canStick = Foundation.MediaQuery.atLeast(this.options.stickyOn);

          if (!this.canStick) {
            cb();
          }

          var _this = this,
              newElemWidth = this.$container[0].getBoundingClientRect().width,
              comp = window.getComputedStyle(this.$container[0]),
              pdng = parseInt(comp['padding-right'], 10);

          if (this.$anchor && this.$anchor.length) {
            this.anchorHeight = this.$anchor[0].getBoundingClientRect().height;
          } else {
            this._parsePoints();
          }

          this.$element.css({
            'max-width': newElemWidth - pdng + 'px'
          });
          var newContainerHeight = this.$element[0].getBoundingClientRect().height || this.containerHeight;
          this.containerHeight = newContainerHeight;
          this.$container.css({
            height: newContainerHeight
          });
          this.elemHeight = newContainerHeight;

          if (this.isStuck) {
            this.$element.css({
              "left": this.$container.offset().left + parseInt(comp['padding-left'], 10)
            });
          }

          this._setBreakPoints(newContainerHeight, function () {
            if (cb) {
              cb();
            }
          });
        }
      }, {
        key: '_setBreakPoints',
        value: function _setBreakPoints(elemHeight, cb) {
          if (!this.canStick) {
            if (cb) {
              cb();
            } else {
              return false;
            }
          }

          var mTop = emCalc(this.options.marginTop),
              mBtm = emCalc(this.options.marginBottom),
              topPoint = this.points ? this.points[0] : this.$anchor.offset().top,
              bottomPoint = this.points ? this.points[1] : topPoint + this.anchorHeight,
              winHeight = window.innerHeight;

          if (this.options.stickTo === 'top') {
            topPoint -= mTop;
            bottomPoint -= elemHeight + mTop;
          } else if (this.options.stickTo === 'bottom') {
            topPoint -= winHeight - (elemHeight + mBtm);
            bottomPoint -= winHeight - mBtm;
          } else {}

          this.topPoint = topPoint;
          this.bottomPoint = bottomPoint;

          if (cb) {
            cb();
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this._removeSticky(true);

          this.$element.removeClass(this.options.stickyClass + ' is-anchored is-at-top').css({
            height: '',
            top: '',
            bottom: '',
            'max-width': ''
          }).off('resizeme.zf.trigger');
          this.$anchor.off('change.zf.sticky');
          $(window).off(this.scrollListener);

          if (this.wasWrapped) {
            this.$element.unwrap();
          } else {
            this.$container.removeClass(this.options.containerClass).css({
              height: ''
            });
          }

          Foundation.unregisterPlugin(this);
        }
      }]);

      return Sticky;
    }();

    Sticky.defaults = {
      container: '<div data-sticky-container></div>',
      stickTo: 'top',
      anchor: '',
      topAnchor: '',
      btmAnchor: '',
      marginTop: 1,
      marginBottom: 1,
      stickyOn: 'medium',
      stickyClass: 'sticky',
      containerClass: 'sticky-container',
      checkEvery: -1
    };

    function emCalc(em) {
      return parseInt(window.getComputedStyle(document.body, null).fontSize, 10) * em;
    }

    Foundation.plugin(Sticky, 'Sticky');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationTabs = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Tabs = function () {
      function Tabs(element, options) {
        _classCallCheck(this, Tabs);

        this.$element = element;
        this.options = $.extend({}, Tabs.defaults, this.$element.data(), options);

        this._init();

        Foundation.registerPlugin(this, 'Tabs');
        Foundation.Keyboard.register('Tabs', {
          'ENTER': 'open',
          'SPACE': 'open',
          'ARROW_RIGHT': 'next',
          'ARROW_UP': 'previous',
          'ARROW_DOWN': 'next',
          'ARROW_LEFT': 'previous'
        });
      }

      _createClass(Tabs, [{
        key: '_init',
        value: function _init() {
          var _this = this;

          this.$tabTitles = this.$element.find('.' + this.options.linkClass);
          this.$tabContent = $('[data-tabs-content="' + this.$element[0].id + '"]');
          this.$tabTitles.each(function () {
            var $elem = $(this),
                $link = $elem.find('a'),
                isActive = $elem.hasClass('is-active'),
                hash = $link[0].hash.slice(1),
                linkId = $link[0].id ? $link[0].id : hash + '-label',
                $tabContent = $('#' + hash);
            $elem.attr({
              'role': 'presentation'
            });
            $link.attr({
              'role': 'tab',
              'aria-controls': hash,
              'aria-selected': isActive,
              'id': linkId
            });
            $tabContent.attr({
              'role': 'tabpanel',
              'aria-hidden': !isActive,
              'aria-labelledby': linkId
            });

            if (isActive && _this.options.autoFocus) {
              $link.focus();
            }
          });

          if (this.options.matchHeight) {
            var $images = this.$tabContent.find('img');

            if ($images.length) {
              Foundation.onImagesLoaded($images, this._setHeight.bind(this));
            } else {
              this._setHeight();
            }
          }

          this._events();
        }
      }, {
        key: '_events',
        value: function _events() {
          this._addKeyHandler();

          this._addClickHandler();

          if (this.options.matchHeight) {
            $(window).on('changed.zf.mediaquery', this._setHeight.bind(this));
          }
        }
      }, {
        key: '_addClickHandler',
        value: function _addClickHandler() {
          var _this = this;

          this.$element.off('click.zf.tabs').on('click.zf.tabs', '.' + this.options.linkClass, function (e) {
            e.preventDefault();
            e.stopPropagation();

            if ($(this).hasClass('is-active')) {
              return;
            }

            _this._handleTabChange($(this));
          });
        }
      }, {
        key: '_addKeyHandler',
        value: function _addKeyHandler() {
          var _this = this;

          var $firstTab = _this.$element.find('li:first-of-type');

          var $lastTab = _this.$element.find('li:last-of-type');

          this.$tabTitles.off('keydown.zf.tabs').on('keydown.zf.tabs', function (e) {
            if (e.which === 9) return;
            e.stopPropagation();
            e.preventDefault();
            var $element = $(this),
                $elements = $element.parent('ul').children('li'),
                $prevElement,
                $nextElement;
            $elements.each(function (i) {
              if ($(this).is($element)) {
                if (_this.options.wrapOnKeys) {
                  $prevElement = i === 0 ? $elements.last() : $elements.eq(i - 1);
                  $nextElement = i === $elements.length - 1 ? $elements.first() : $elements.eq(i + 1);
                } else {
                  $prevElement = $elements.eq(Math.max(0, i - 1));
                  $nextElement = $elements.eq(Math.min(i + 1, $elements.length - 1));
                }

                return;
              }
            });
            Foundation.Keyboard.handleKey(e, 'Tabs', {
              open: function () {
                $element.find('[role="tab"]').focus();

                _this._handleTabChange($element);
              },
              previous: function () {
                $prevElement.find('[role="tab"]').focus();

                _this._handleTabChange($prevElement);
              },
              next: function () {
                $nextElement.find('[role="tab"]').focus();

                _this._handleTabChange($nextElement);
              }
            });
          });
        }
      }, {
        key: '_handleTabChange',
        value: function _handleTabChange($target) {
          var $tabLink = $target.find('[role="tab"]'),
              hash = $tabLink[0].hash,
              $targetContent = this.$tabContent.find(hash),
              $oldTab = this.$element.find('.' + this.options.linkClass + '.is-active').removeClass('is-active').find('[role="tab"]').attr({
            'aria-selected': 'false'
          });
          $('#' + $oldTab.attr('aria-controls')).removeClass('is-active').attr({
            'aria-hidden': 'true'
          });
          $target.addClass('is-active');
          $tabLink.attr({
            'aria-selected': 'true'
          });
          $targetContent.addClass('is-active').attr({
            'aria-hidden': 'false'
          });
          this.$element.trigger('change.zf.tabs', [$target]);
        }
      }, {
        key: 'selectTab',
        value: function selectTab(elem) {
          var idStr;

          if (typeof elem === 'object') {
            idStr = elem[0].id;
          } else {
            idStr = elem;
          }

          if (idStr.indexOf('#') < 0) {
            idStr = '#' + idStr;
          }

          var $target = this.$tabTitles.find('[href="' + idStr + '"]').parent('.' + this.options.linkClass);

          this._handleTabChange($target);
        }
      }, {
        key: '_setHeight',
        value: function _setHeight() {
          var max = 0;
          this.$tabContent.find('.' + this.options.panelClass).css('height', '').each(function () {
            var panel = $(this),
                isActive = panel.hasClass('is-active');

            if (!isActive) {
              panel.css({
                'visibility': 'hidden',
                'display': 'block'
              });
            }

            var temp = this.getBoundingClientRect().height;

            if (!isActive) {
              panel.css({
                'visibility': '',
                'display': ''
              });
            }

            max = temp > max ? temp : max;
          }).css('height', max + 'px');
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.find('.' + this.options.linkClass).off('.zf.tabs').hide().end().find('.' + this.options.panelClass).hide();

          if (this.options.matchHeight) {
            $(window).off('changed.zf.mediaquery');
          }

          Foundation.unregisterPlugin(this);
        }
      }]);

      return Tabs;
    }();

    Tabs.defaults = {
      autoFocus: false,
      wrapOnKeys: true,
      matchHeight: false,
      linkClass: 'tabs-title',
      panelClass: 'tabs-panel'
    };

    function checkClass($elem) {
      return $elem.hasClass('is-active');
    }

    Foundation.plugin(Tabs, 'Tabs');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationToggler = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Toggler = function () {
      function Toggler(element, options) {
        _classCallCheck(this, Toggler);

        this.$element = element;
        this.options = $.extend({}, Toggler.defaults, element.data(), options);
        this.className = '';

        this._init();

        this._events();

        Foundation.registerPlugin(this, 'Toggler');
      }

      _createClass(Toggler, [{
        key: '_init',
        value: function _init() {
          var input;

          if (this.options.animate) {
            input = this.options.animate.split(' ');
            this.animationIn = input[0];
            this.animationOut = input[1] || null;
          } else {
            input = this.$element.data('toggler');
            this.className = input[0] === '.' ? input.slice(1) : input;
          }

          var id = this.$element[0].id;
          $('[data-open="' + id + '"], [data-close="' + id + '"], [data-toggle="' + id + '"]').attr('aria-controls', id);
          this.$element.attr('aria-expanded', this.$element.is(':hidden') ? false : true);
        }
      }, {
        key: '_events',
        value: function _events() {
          this.$element.off('toggle.zf.trigger').on('toggle.zf.trigger', this.toggle.bind(this));
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          this[this.options.animate ? '_toggleAnimate' : '_toggleClass']();
        }
      }, {
        key: '_toggleClass',
        value: function _toggleClass() {
          this.$element.toggleClass(this.className);
          var isOn = this.$element.hasClass(this.className);

          if (isOn) {
            this.$element.trigger('on.zf.toggler');
          } else {
            this.$element.trigger('off.zf.toggler');
          }

          this._updateARIA(isOn);
        }
      }, {
        key: '_toggleAnimate',
        value: function _toggleAnimate() {
          var _this = this;

          if (this.$element.is(':hidden')) {
            Foundation.Motion.animateIn(this.$element, this.animationIn, function () {
              this.trigger('on.zf.toggler');

              _this._updateARIA(true);
            });
          } else {
            Foundation.Motion.animateOut(this.$element, this.animationOut, function () {
              this.trigger('off.zf.toggler');

              _this._updateARIA(false);
            });
          }
        }
      }, {
        key: '_updateARIA',
        value: function _updateARIA(isOn) {
          this.$element.attr('aria-expanded', isOn ? true : false);
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.off('.zf.toggler');
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Toggler;
    }();

    Toggler.defaults = {
      animate: false
    };
    Foundation.plugin(Toggler, 'Toggler');
  }(jQuery);
});
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define([], factory);
  } else if (typeof exports !== "undefined") {
    factory();
  } else {
    var mod = {
      exports: {}
    };
    factory();
    global.foundationTooltip = mod.exports;
  }
})(this, function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  !function ($) {
    var Tooltip = function () {
      function Tooltip(element, options) {
        _classCallCheck(this, Tooltip);

        this.$element = element;
        this.options = $.extend({}, Tooltip.defaults, this.$element.data(), options);
        this.isActive = false;
        this.isClick = false;

        this._init();

        Foundation.registerPlugin(this, 'Tooltip');
      }

      _createClass(Tooltip, [{
        key: '_init',
        value: function _init() {
          var elemId = this.$element.attr('aria-describedby') || Foundation.GetYoDigits(6, 'tooltip');
          this.options.positionClass = this._getPositionClass(this.$element);
          this.options.tipText = this.options.tipText || this.$element.attr('title');
          this.template = this.options.template ? $(this.options.template) : this._buildTemplate(elemId);
          this.template.appendTo(document.body).text(this.options.tipText).hide();
          this.$element.attr({
            'title': '',
            'aria-describedby': elemId,
            'data-yeti-box': elemId,
            'data-toggle': elemId,
            'data-resize': elemId
          }).addClass(this.triggerClass);
          this.usedPositions = [];
          this.counter = 4;
          this.classChanged = false;

          this._events();
        }
      }, {
        key: '_getPositionClass',
        value: function _getPositionClass(element) {
          if (!element) {
            return '';
          }

          var position = element[0].className.match(/\b(top|left|right)\b/g);
          position = position ? position[0] : '';
          return position;
        }
      }, {
        key: '_buildTemplate',
        value: function _buildTemplate(id) {
          var templateClasses = (this.options.tooltipClass + ' ' + this.options.positionClass + ' ' + this.options.templateClasses).trim();
          var $template = $('<div></div>').addClass(templateClasses).attr({
            'role': 'tooltip',
            'aria-hidden': true,
            'data-is-active': false,
            'data-is-focus': false,
            'id': id
          });
          return $template;
        }
      }, {
        key: '_reposition',
        value: function _reposition(position) {
          this.usedPositions.push(position ? position : 'bottom');

          if (!position && this.usedPositions.indexOf('top') < 0) {
            this.template.addClass('top');
          } else if (position === 'top' && this.usedPositions.indexOf('bottom') < 0) {
            this.template.removeClass(position);
          } else if (position === 'left' && this.usedPositions.indexOf('right') < 0) {
            this.template.removeClass(position).addClass('right');
          } else if (position === 'right' && this.usedPositions.indexOf('left') < 0) {
            this.template.removeClass(position).addClass('left');
          } else if (!position && this.usedPositions.indexOf('top') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.template.addClass('left');
          } else if (position === 'top' && this.usedPositions.indexOf('bottom') > -1 && this.usedPositions.indexOf('left') < 0) {
            this.template.removeClass(position).addClass('left');
          } else if (position === 'left' && this.usedPositions.indexOf('right') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.template.removeClass(position);
          } else if (position === 'right' && this.usedPositions.indexOf('left') > -1 && this.usedPositions.indexOf('bottom') < 0) {
            this.template.removeClass(position);
          } else {
            this.template.removeClass(position);
          }

          this.classChanged = true;
          this.counter--;
        }
      }, {
        key: '_setPosition',
        value: function _setPosition() {
          var position = this._getPositionClass(this.template),
              $tipDims = Foundation.Box.GetDimensions(this.template),
              $anchorDims = Foundation.Box.GetDimensions(this.$element),
              direction = position === 'left' ? 'left' : position === 'right' ? 'left' : 'top',
              param = direction === 'top' ? 'height' : 'width',
              offset = param === 'height' ? this.options.vOffset : this.options.hOffset,
              _this = this;

          if ($tipDims.width >= $tipDims.windowDims.width || !this.counter && !Foundation.Box.ImNotTouchingYou(this.template)) {
            this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, 'center bottom', this.options.vOffset, this.options.hOffset, true)).css({
              'width': $anchorDims.windowDims.width - this.options.hOffset * 2,
              'height': 'auto'
            });
            return false;
          }

          this.template.offset(Foundation.Box.GetOffsets(this.template, this.$element, 'center ' + (position || 'bottom'), this.options.vOffset, this.options.hOffset));

          while (!Foundation.Box.ImNotTouchingYou(this.template) && this.counter) {
            this._reposition(position);

            this._setPosition();
          }
        }
      }, {
        key: 'show',
        value: function show() {
          if (this.options.showOn !== 'all' && !Foundation.MediaQuery.atLeast(this.options.showOn)) {
            return false;
          }

          var _this = this;

          this.template.css('visibility', 'hidden').show();

          this._setPosition();

          this.$element.trigger('closeme.zf.tooltip', this.template.attr('id'));
          this.template.attr({
            'data-is-active': true,
            'aria-hidden': false
          });
          _this.isActive = true;
          this.template.stop().hide().css('visibility', '').fadeIn(this.options.fadeInDuration, function () {});
          this.$element.trigger('show.zf.tooltip');
        }
      }, {
        key: 'hide',
        value: function hide() {
          var _this = this;

          this.template.stop().attr({
            'aria-hidden': true,
            'data-is-active': false
          }).fadeOut(this.options.fadeOutDuration, function () {
            _this.isActive = false;
            _this.isClick = false;

            if (_this.classChanged) {
              _this.template.removeClass(_this._getPositionClass(_this.template)).addClass(_this.options.positionClass);

              _this.usedPositions = [];
              _this.counter = 4;
              _this.classChanged = false;
            }
          });
          this.$element.trigger('hide.zf.tooltip');
        }
      }, {
        key: '_events',
        value: function _events() {
          var _this = this;

          var $template = this.template;
          var isFocus = false;

          if (!this.options.disableHover) {
            this.$element.on('mouseenter.zf.tooltip', function (e) {
              if (!_this.isActive) {
                _this.timeout = setTimeout(function () {
                  _this.show();
                }, _this.options.hoverDelay);
              }
            }).on('mouseleave.zf.tooltip', function (e) {
              clearTimeout(_this.timeout);

              if (!isFocus || !_this.isClick && _this.options.clickOpen) {
                _this.hide();
              }
            });
          }

          if (this.options.clickOpen) {
            this.$element.on('mousedown.zf.tooltip', function (e) {
              e.stopImmediatePropagation();

              if (_this.isClick) {
                _this.hide();
              } else {
                _this.isClick = true;

                if ((_this.options.disableHover || !_this.$element.attr('tabindex')) && !_this.isActive) {
                  _this.show();
                }
              }
            });
          }

          if (!this.options.disableForTouch) {
            this.$element.on('tap.zf.tooltip touchend.zf.tooltip', function (e) {
              _this.isActive ? _this.hide() : _this.show();
            });
          }

          this.$element.on({
            'close.zf.trigger': this.hide.bind(this)
          });
          this.$element.on('focus.zf.tooltip', function (e) {
            isFocus = true;

            if (_this.isClick) {
              return false;
            } else {
              _this.show();
            }
          }).on('focusout.zf.tooltip', function (e) {
            isFocus = false;
            _this.isClick = false;

            _this.hide();
          }).on('resizeme.zf.trigger', function () {
            if (_this.isActive) {
              _this._setPosition();
            }
          });
        }
      }, {
        key: 'toggle',
        value: function toggle() {
          if (this.isActive) {
            this.hide();
          } else {
            this.show();
          }
        }
      }, {
        key: 'destroy',
        value: function destroy() {
          this.$element.attr('title', this.template.text()).off('.zf.trigger .zf.tootip').removeAttr('aria-describedby').removeAttr('data-yeti-box').removeAttr('data-toggle').removeAttr('data-resize');
          this.template.remove();
          Foundation.unregisterPlugin(this);
        }
      }]);

      return Tooltip;
    }();

    Tooltip.defaults = {
      disableForTouch: false,
      hoverDelay: 200,
      fadeInDuration: 150,
      fadeOutDuration: 150,
      disableHover: false,
      templateClasses: '',
      tooltipClass: 'tooltip',
      triggerClass: 'has-tip',
      showOn: 'small',
      template: '',
      tipText: '',
      touchCloseText: 'Tap to close.',
      clickOpen: true,
      positionClass: '',
      vOffset: 10,
      hOffset: 12
    };
    Foundation.plugin(Tooltip, 'Tooltip');
  }(jQuery);
});
