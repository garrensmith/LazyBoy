var describe = require('Jody').describe,
    assert = require('assert'),
    Model = require('../lib/index');

describe("Removing item").
  beforeAll(function (done) {
    Model.define('Car',{name: String, max_speed: Number});
    Model.load();
    done();
  }).
it("Should remove document from db", function (async) {
  var Car = Model('Car');

  var car = Car.create({name: "ford", max_speed: 45});
  
  car.save(async(function (err, saved_car) {
    saved_car.remove(async (function (err) {
      Car.where("name","ford", async(function (err, removed_cars) {
        removed_cars.length.should().beEqual(0); 
      }));
    }));
  }));

}).
it("Should fail to remove just un saved object", function (async) {
  var Car = Model('Car');

  var car = Car.create({name: "honda", max_speed: 25});
  
  car.remove(function (err) {
    err.message.should().beEqual("rev needs to be supplied");
  });

}).
it("Should not be able to remove object twice", function (async) {
var Car = Model('Car');

  var car = Car.create({name: "ford", max_speed: 45});
  
  car.save(async(function (err, saved_car) {
    saved_car.remove(async (function (err) {
      saved_car.remove(async(function (err) {
        err.reason.should().beEqual("deleted");
      }));
    }));
  }));

});

