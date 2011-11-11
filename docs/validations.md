---
layout: default
title: Validation
---



Validations
===========

Validations are done using a very good validation library: [node-validation](https://github.com/chriso/node-validator). Validation is done by creating a callback validation function on the model:

      var Mailer = Model('Mailer');

      Mailer.validate(function (check, item) {
        check(item.email).isEmail();
        check(item.name).len(0,30);
      });


When the model is saved `my_model.save(function (err, item) {})` the validation will be run. If validation errors are occured and array of errors will be passed to the callback.

View the [node-validation](https://github.com/chriso/node-validator) ''README'' for all different types of validations you can do on the model. 




