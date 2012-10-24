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

There are two options to define the connection to the database. The fist just supplies the name of the database. This is designed for quick simple connection to a local database and will have the defaults for everything else.

      Model.create_connection("my_database");

When more options are required, an options object can be give to the `create_connection` method.

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

If any options are not supplied they will be set to the default value


Loading Models 
==============


The models needs to be loaded for LazyBoy to work. This can be done via two ways. The first is to manually require the files where the models are defined and then call 

  Model.load()

This is done after all the models have been defined and in the same file as all the models have been defined. This is for very simple use cases.

A better way is to keep all the models in a specific folder and point LazyBoy to that directory. To load the Models then:

  Model.load('models')

Important to note is that LazyBoy always loads the models folder relatively from the base folder that the node app was started from.


<br />
<br />
