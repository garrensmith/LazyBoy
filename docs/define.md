---
layout: default
title: Define Model
---

Defining a model
================

Before being able to use a document model in your project you need to define it. 

	var User =	Model.define('User', {
			name: String,
			surname: String,
			date_of_birth : Date,
			age: {type: Number, default: 21}
		});

## Property definitions

Each property defined on a model must be given a type and can optionally be given a default value. The following types are supported:
		String
		Number
		Date
		
The `age` property above shows how to define a default value. If an object is created and no value is supplied for age the default value for will be applied.
This is the same for if an object is loaded from the database and it does not have a value the default value is also applied. If no default value is given the 
propery will be set to `null`

## Accessing a model

A model can be access by getting it from `Lazyboy.Model` 
	  
    var Model = require('lazyboy');
	  var User = Model('User');
	    User.find("12345", function (err, user) {
		  // do something
	  });

## Model Callbacks

A couple callbacks are avaible and can be defined on a model.
		
		var BlogPost = Model.define('BlogPost',{
			title: String,
			content: String,
			url: String
		});
		
		BlogPost.beforeSave(function (item) {
			item.url = item.title.split(" ").join("-");
		});
			
`beforeSave` will be called before the model is saved to the database. These callbacks are also supported:
		beforeSave
		afterSave
		beforeCreate

## Custom Methods

Specific methods can be defined on model instance. These methods are specific to each model. 


      var Vehicle = Model.define('Vehicle', {
            name: String,
            gear: {type: Number, default: 1}
          });


      Vehicle.addMethod('sound', function () {
            return "Rooooooooom";
      });

      Vehicle.addMethod('change_gear', function (gear) {
            var old_gear = this.gear;
            this.gear = gear;

            return "changing from " + old_gear + " to " + gear;
      });

      var ford = Vehicle.create({name: "Ford Fiesta"});
      
      ford.sound(); 
      ford.change_gear(3);

## Custom Views

Lazyboy creats a set of basic views for each model. However often more complex views will be required. This can be defined as follows.
		
		var Album = Model.define("Album",{
			band: String, 
			title: String, 
			rating: Number
		});

		Album.addView('BestIncubusAlbums',{ 
		  map: function (doc) {
			if (doc.model_type === 'Album' && doc.band === 'Incubus' && doc.rating === 5) {
			  emit(null,doc);
			}
		  }
		});
		
To query the view:

		Album.view('BestIncubusAlbums', function (err, albums) {
			// do something with the albums
		});
		
	

	

		
