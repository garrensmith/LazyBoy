var db = require('./spec_helper').db,
    Model = require('../lib/index');

describe("Custom views", function () {

  before(function (done) {
    var Album = Model.define("Album",{band: String, title: String, rating: Number});

    Album.addView('BestIncubusAlbums',{ 
      map: function (doc) {
        if (doc.model_type === 'Album' && doc.band === 'Incubus' && doc.rating === 5) {
          emit(null,doc);
        }
      }
    });


    Album.addView('ByRatingAndBand',{ 
      map: function (doc) {
        if (doc.model_type === 'Album' && doc.band === 'Incubus') {
          emit([doc.rating, doc.band],1);
        }
      }
    });


    Model.load(function () {

      var Album = Model('Album');
      Album.create({band: "Incubus", rating: 5, title: "Fungus Amongus"}).save();
      Album.create({band: "Incubus", rating: 3, title: "S.C.I.E.N.C.E."}).save(); 
      Album.create({band: "Incubus", rating: 3, title: "Make Yourself"}).save();
      Album.create({band: "Incubus", rating: 5, title: "Morning View"}).save();
      Album.create({band: "Incubus", rating: 2, title: "A Crow Left of the Murder..."}).save(); 
      Album.create({band: "Incubus", rating: 3, title: "Light Grenades"}).save();
      Album.create({band: "Incubus", rating: 5, title: "If Not Now, When?"}).save(function () {
        done();

      });
    });

  });

  it("Should be able to define custom view for model", function (done) {
    var Album = Model('Album');
    Album.view('BestIncubusAlbums', function (err, albums) {
      albums.length.should.equal(3);
      done();
    });
  });


});

