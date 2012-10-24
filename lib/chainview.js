var querystring = require('querystring');


var ChainViewAble = function (Model, view_name) {
  var self = this,
      view_options = {reduce: false, include_docs: true},
      Model = Model,
      view_name = view_name;

  function add_option (name, option) {
    view_options[name] = option;
  }

  function execute(cb) {
    Model.view(view_name, view_options, cb);
  }

  function  check_cb(cb) {
    if (cb) {
      return execute(cb);
    }

    return self;
  }

  this.key = function (inputs, cb) {
    add_option('key',inputs);

    return check_cb(cb);
  }

  this.startkey = function (inputs, cb) {
    add_option('startkey',inputs);

    return check_cb(cb);
  }

  this.endkey = function (inputs, cb) {
    add_option('endkey',inputs);
    return check_cb(cb);
  }

  this.limit = function (limit, cb) {
    add_option('limit',limit);
    return check_cb(cb);
  }

  this.skip = function (skip, cb) {
    add_option('skip',skip);
    return check_cb(cb);
  }

  this.descending = function (cb) {
    add_option('descending',true);
    return check_cb(cb);
  }

  this.dont_include_docs = function (cb) {
    add_option('include_docs', 'false');
    return check_cb(cb);
  }


  this.stale = function (cb) {
    add_option('stale','ok');
    return check_cb(cb);
  }
}

module.exports = ChainViewAble;
