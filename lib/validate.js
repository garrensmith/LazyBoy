check = require('validator').check;


var ValidateAble = module.exports = function () {

  this.validateFn = function () {};

  
  this.runValidate = function (cb) {
    var failed = false;
    
    try {
      this.validateFn && this.validateFn(check, this);
    } catch (e) {
      failed = true;
      cb(e.toString(), null);
    }


    return !failed
  };

};
