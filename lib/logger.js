


var logger = function () {

  function log (msg, level) {
    console.dir(new Date().toUTCString() + ' - ' + msg);
  }

  var public_loggers = {
    error: function (msg) {
      log(msg, 'error');
    },

    info: function (msg) {
      log(msg, 'info');
    },

    debug: function (msg) {
      log(msg, 'info');
    }
  }

  return public_loggers;
}

module.exports = logger();





