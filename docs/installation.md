---
layout: default
title: Installation
---

Installation
============

Installation of LazyBoy is done via npm

      npm install LazyBoy

This will install it into your projects `./node_modules` directory


Connect to database
===================

The connection to the database must be setup before anything else will work.

There are two ways to defining a connection to the database. Just suppling the database name is designed for quick simple connections. It will create a default connection to the local database.

      Model.create_connection("my_database");

A options hash can be supplied when more connection parameters are required: 

       Model.create_connection({
        url: 'database_url',
        port: '443',
        db:'database_name',
        auth: { // not required
          username: 'username',
          password: 'awesome_unique_password'
        },
        secure:true,
    });

If any options are not supplied they will be set to the default value. 

Loading Models 
==============

For LazyBoy to work correctly all the defined models need to be loaded. Calling `Model.load()` will load all models defined in the file.
A better way is to keep all the models in a specific folder and point LazyBoy to that directory. To load the Models then:

  Model.load('models', function () {
    // this cb called once all models have been loaded
  })

Important to note is that LazyBoy always loads the models folder relatively from the base folder that the node app was started from.

<br />
<br />
