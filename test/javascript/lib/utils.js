(function (global, $) {

  /**
  * Try to catch the `do` function every `interval` delay, until it succedes
  * (does not throw an error) or a given `timout` time passed.
  * If a `then` function is passed, it is called after `do` succeded.
  * If a `catch` function is passed, it is called after each time `do` fails.
  *
  * @param  {object} opts
  * @param  {object} opts
  */
  global.tryInterval = function (opts) {
    var _opts = $.extend({}, opts);
    var totalTime = 0;

    var interval = setInterval(function () {
      var succeded = false;
      var error = null;

      totalTime += _opts.time;

      try {
        _opts.try();
        succeded = true;
      }
      catch (err) { error = err; }

      if (succeded) {
        clearInterval(interval);
        if (typeof _opts.then === 'function') _opts.then();
      }
      else if (totalTime > _opts.timeout) {
        clearInterval(interval);
        throw error;
      }
      else {
        if (typeof _opts.catch === 'function') _opts.catch(error);
      }

    }, _opts.interval);
  };


  /**
  * Inject a script with the attributes of the `opts` object into the
  * given `context` HTML element. The created script is guaranteed to be
  * executed in the provided context, like inside an iframe.
  *
  * @param  {HTMLElement} context - Element to add and execute the script within.
  * @param  {object} opts - Attributes to add to the created script.
  * @returns {HTMLElement} The created element.
  */
  global.injectScriptIn = function (context, opts) {
    const doc = context.ownerDocument;
    const script = doc.createElement("script");
    script.type = "text/javascript";
    script.async = false;

    Object.assign(script, {
      type: "text/javascript",
      async: false,
    }, opts);

    context.appendChild(script);
    return script;
  };

})(window, jQuery);
