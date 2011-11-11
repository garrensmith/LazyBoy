var Validator = require('validator').Validator;

Validator.prototype.error = function (msg) {
  this._errors.push(msg);
}

Validator.prototype.getErrors = function () {
  return this._errors;
}

var ValidateAble = module.exports = function () {

  this.validateFn = function () {};

  this.runValidate = function (cb) {
    var failed = false;
    var validator = new Validator(); 

    var check = function (item, msg) {      
      return validator.check(item, msg);
    }

    try {

      this.validateFn && this.validateFn(check, this);
    } catch (e) {
      failed = true;
      cb([e.toString()], null);
    }

    var errors = validator.getErrors();
    if (errors) {
      failed = true;
      cb(errors, null);
    }

    return !failed
  };

};
