---
layout: default
title: Lazyboy
---

# Introduction

LazyBoy is a Couchdb Object Document Model. It has full support for relations, type casting, custom views and querying.

# Cheat Sheet

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

# Finding a model
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
    


