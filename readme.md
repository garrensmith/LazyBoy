LazyBoy Object Modeller
=======================
[![Build Status](https://secure.travis-ci.org/garrensmith/LazyBoy.png)](http://travis-ci.org/garrensmith/LazyBoy)

# Oh my word... What have you done?

Somethings when using Couchdb you want a higher abstraction.

#How do I use this thing?

Below is a quick cheatsheet but the docs can be found [http://garrensmith.com/LazyBoy](http://garrensmith.com/LazyBoy)

## Defining a model
    var Model = require('LazyBoy');

    Model.define('User', {
      name: String
      surname: {type: String, default: "Rambo"}
    })

## Creating and saving a model
    
    var user = Model.create('User', {name: "John", surname: "Rambo"});

    user.save(function (err, saved_user) {
        // .. do some other stuff here
    })

## Finding a model
### Finding by Id
    var user_id = "123456";

    var User = Model('User');
    User.find(user_id, function (err, user) {
        // .. do something with the user
    })

### Find all
Will return an array of all documents that fit the criteria
    
    var User = Model('User');
    User.all(function (err, users) {
        // .. do something with the user
    })

### Find by criteria
Will return an array of all documents that fit the criteria
    
    var User = Model('User');
    User.where("name","Ben", function (err, users) {
        // .. do something with the user
    })

## Logging
  To see in detail what is happening the logging can be turned on. This can be done by
  
    require('LazyBoy').logger.setLogLevel(1);

  `LazyBoy` uses [Coloured logger](https://github.com/bentruyman/coloured-log) under the covers and uses the same log levels
    

#What needs doing?

* Chainable callbacks
* Count query
* Define model_type field stored in db
* Multiple db support
* Improved logging
* More advance querying

#Changelog
25 July 2012 - Bug fixes, change tests to mocha
20 July 2012 - Added toJSON function on Document
11 Nov 2011 - Added Validations using node-validator
13 Sep 2011 - Add Id to serialised model
11 Sep 2011 - Add Before And After Remove Callbacks (Donnie Hedin)
17 Aug 2011 - Add support for custom methods 

#Contributors
* Donnie Hedin (sofa420)
* 8bitDesigner

