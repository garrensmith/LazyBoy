LazyBoy Object Modeller
=======================
[![Build Status](https://secure.travis-ci.org/garrensmith/LazyBoy.png)](http://travis-ci.org/garrensmith/LazyBoy)

# Oh my word... What have you done?

LazyBoy makes it easier to build applications with Couchdb. It removes the repeatable cruft and makes working with Couchdb as fun as it should be.

# 4 easy steps to installation

1) Download

    npm install lazyboy

2) Connect to database

    var Model = require('lazyboy')
    Model.create_connection("my_database");

3) Define a model

    Model.define('User', {
      name: String
      surname: {type: String, default: "Rambo"}
    })

4) Read the docs: [http://garrensmith.com/LazyBoy](http://garrensmith.com/LazyBoy)

# How do I use this it?

Below is a quick cheatsheet but the docs can be found at [http://garrensmith.com/LazyBoy](http://garrensmith.com/LazyBoy)

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

### Find all or by criteria 

    var User = Model('User');
    User.all(function (err, users) {
        // .. do something with the user
    })

    var User = Model('User');
    User.where("name","Ben", function (err, users) {
        // .. do something with the user
    })

## Custom Views

    var Band = Model.define("Band",{rank: Number, name: String});

    Band.addView('ByRankAndName',{ 
      map: function (doc) {
        if (doc.model_type === 'Band') {
          emit([doc.rank, doc.name],1);
        }
      }
    });

    Band.view('ByRankAndName')
      .startkey([2, "Incubus"])
      .endkey([3, {}])
      .limit(10)
      .skip(3, function (err, bands) {
       // will only execute the chain when a function has a callback passed to it
    });

## Logging
Logging has been disabled for now.

#What needs doing?

* Define model_type field stored in db
* Multiple db support
* Improved logging

#Changelog
24 October 2012 - Add Chainable Api
25 July 2012 - Bug fixes, change tests to mocha
20 July 2012 - Added toJSON function on Document
11 Nov 2011 - Added Validations using node-validator
13 Sep 2011 - Add Id to serialised model
11 Sep 2011 - Add Before And After Remove Callbacks (Donnie Hedin)
17 Aug 2011 - Add support for custom methods 

#Contributors
* Donnie Hedin (sofa420)
* 8bitDesigner

