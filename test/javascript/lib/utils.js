(function (global, $) {

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

})(window, jQuery);
