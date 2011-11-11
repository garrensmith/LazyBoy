LazyBoy Object Modeller
=======================

# Oh my word... What have you done?

My experiments into what it takes to create a object mapper for Couchdb. This has been something I've been thinking about for a while and whether its a viable option. 

Currently its purely fun research. I've been reading through [mongoose](https://github.com/LearnBoost/mongoose) and [couch-ar](https://github.com/scottburch/couch-ar) as imspiration.

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
    User.where(name,"Ben", function (err, users) {
        // .. do something with the user
    })

## Logging
  To see in detail what is happening the logging can be turned on. This can be done by
  
    require('LazyBoy').logger.setLogLevel(1);

  `LazyBoy` uses [Coloured logger](https://github.com/bentruyman/coloured-log) under the covers and uses the same log levels
    

#What needs doing?

* Should we allow custom ID's?
* Better Type casting
* Validations

#Changelog
11 Nov 2011 - Added Validations using node-validator
13 Sep 2011 - Add Id to serialised model
11 Sep 2011 - Add Before And After Remove Callbacks (Donnie Hedin)
17 Aug 2011 - Add support for custom methods 

#Contributors
* Donnie Hedin (sofa420)
* 8bitDesigner

