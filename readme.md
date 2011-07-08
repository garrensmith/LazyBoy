LazyBoy Object Modeller
=======================

# Oh my word... What have you done?

My experiments into what it takes to create a object mapper for Couchdb. This has been something I've been thinking about for a while and whether its a viable option. 

Currently its purely fun research. I've been reading through [mongoose](https://github.com/LearnBoost/mongoose) and [couch-ar](https://github.com/scottburch/couch-ar) as imspiration.

#How do I use this thing?

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
    var user_id = "123456";

    var User = Model('User');
    User.find(user_id, function (err, user) {
        // .. do something with the user
    })

#What needs doing?

Plenty:

* Remove
* Finding all
* Decent logging
* Type casting
* BeforeSave, BeforeCreate callbacks
* Validations

