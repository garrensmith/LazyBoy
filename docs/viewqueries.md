---
layout: default
title: Queries
---

Querying
========

LazyBoy supports multiple ways of finding a specified document or documents for model.

## Find All 

Find All will return all documents for a specified model. It will return an array with all the documents contained inside.

      User.all(function (err, users) {
        // all users
      });

## Find by Id

Finding by the Id will return only one document with the specified document or null if no documents match that Id.

      Blog.find("12345", function (err, blog_post) {
        // do something with the blog post
      });

## Find by property

LazyBoy creates some generic views to be used with each model. These can be accessed via the `.where` property on each model.
It takes two arguments the propery to search by and the value of the propery to group by. This method always returns an array of the results.

      Album.where("band","coldplay", function (err, albums) {
        albums.forEach(....
      });

## Custom views

It is also possible to create custom views for a specific require of a model. This is done when defining a model.

      var Album = Model.define("Album",{band: String, title: String, rating: Number});

      Album.addView('BestIncubusAlbums',{ 
        map: function (doc) {
          if (doc.model_type === 'Album' && doc.band === 'Incubus' && doc.rating === 5) {
            emit(null,doc);
          }
        }
      });

Then to query that view

      Album.view('BestIncubusAlbums', function (err, albums) {

      
      });

