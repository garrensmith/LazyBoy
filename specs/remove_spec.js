var db = require('./spec_helper').db,
    assert = require('assert'),
    Model = require('../lib/index');

describe("Removing item", function () {

  before(function (done) {
    Model.define('Car',{name: String, max_speed: Number});
    Model.load(function () {
      done();
    });
  })

  it("Should remove document from db", function (done) {
    var Car = Model('Car');

    var car = Car.create({name: "ford", max_speed: 45});

    car.save(function (err, saved_car) {
      saved_car.remove(function (err) {
        Car.where("name","ford", function (err, removed_cars) {
          removed_cars.length.should.equal(0); 
          done();
        });
      });
    });

  })

  it("Should call Before Remove Callback", function (done) {
    var called = false;

    var Car = Model('Car');
    Car.beforeRemove(function () {
      called = true;
    });

    var car = Car.create({name: "Audi", max_speed: 35});

    car.save(function (err, saved_car) {
      saved_car.remove(function (err) {
        if (err) throw err;

        called.should.be.true;
        done();

      });
    });

  });

  it("Should call After Remove Callback", function (done) {
    var called = false;

    var Car = Model('Car');
    Car.afterRemove(function () {
      called = true;
    });

    var car = Car.create({name: "Audi", max_speed: 35});

    car.save(function (err, saved_car) {
      saved_car.remove(function (err) {
        if (err) throw err;

        called.should.be.true;
        done();

      });
    });

  });


  it("Should fail to remove just un saved object", function () {
    var Car = Model('Car');

    var car = Car.create({name: "honda", max_speed: 25});

    car.remove(function (err) {
      err.message.should.equal("rev needs to be supplied");
    });

  })

  it("Should not be able to remove object twice", function (done) {
    var Car = Model('Car');

    var car = Car.create({name: "ford", max_speed: 45});

    car.save(function (err, saved_car) {
      saved_car.remove(function (err) {
        saved_car.remove(function (err) {
          err.reason.should.be.equal("deleted");
          done();
        });
      });
    });

  });

});


