Create a Model
==============

Creating a model is very simple. 
    
    var Model = require('LazyBoy');

    Model.define('User', {
      name: String
      surname: {type: String, default: "Rambo"}
    })

When defining the model you can specifiy just a type or as shown above supply a default value. When loading a model from from the database whenever a value is null and a default value has been supplied, then that parameter will be supplied with the default value. Something to be aware of is that all properties of the model must be lowercase. 

To work with a model you need to do the following. 
    var User = Model('User');

Calling the model as show will allow you to create a new model instance or query documents from the database

    User.all(function (users) {
      // do something cool
    });





