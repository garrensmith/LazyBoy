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

Save
====

To save a model to the database.

		myuser.save(function (err, saved_user) {
			// do something with the model
		});
		
If the model has been saved before it will do the update, if the model has not been saved before it will save it and then return the model in the callback
with an id property and revision. It will also have two date stamps, the first datestamp is `DateCreated` which is the date the model was first saved and 
the `DateUpdated` which is the timestamp for when the model was updated


Remove
======

Remove a model from the database as follows:

		myuser.remove(function (err) {
			// model removed
		});
		
This will remove the model from the database, not getting it back after this!


