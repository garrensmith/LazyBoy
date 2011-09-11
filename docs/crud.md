---
layout: default
title: Create,Save and Remove
---
Create
======

Create a model document as follows:

		var User = Model('User');
		var my_user = User.create({name: "Jimi", surname: "Hendrix"});
	
This creates an instance but does not save it to the database. 

## Before create callback
LazyBoy supports a before create callback. It is defined on the model and will be called once when the model is created.

  var User = Model('User');

  User.beforeCreate(function (user) {
      // do something before create model
  });

  
Save
====

To save a model to the database.

		myuser.save(function (err, saved_user) {
			// do something with the model
		});
		
If the model has been saved before it will do the update, if the model has not been saved before it will save it and then return the model in the callback
with an id property and revision. It will also have two date stamps, the first datestamp is `DateCreated` which is the date the model was first saved and 
the `DateUpdated` which is the timestamp for when the model was updated

## Save Callbacks

Before and after save callbacks are supported. They are defined on the model and will be called when each model is saved.

  var User = Model('User');

  User.beforeSave(function (user) {
      // do something before save model
  });

  User.afterSave(function (user) {
      // do something after save model
  });



Remove
======

Remove a model from the database as follows:

		myuser.remove(function (err) {
			// model removed
		});
		
This will remove the model from the database, no getting it back after this!

## Remove Callbacks

Two callbacks for the `remove` method are supported. 

  var User = Model('User');

  User.beforeRemove(function (user) {
      // do something before removing model
  });

  User.afterRemove(function (user) {
      // do something after removing model
  });

These are self explanatory and will be called before and after a model has been removed from the database

