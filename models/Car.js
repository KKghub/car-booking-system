const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Booking = require("./Booking");
// Setup schema
const carSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  model: String,
  seating_capacity: Number,
  rent_per_day: Number,
});
// Export Contact model
const Car = (module.exports = mongoose.model("Car", carSchema));
module.exports.get = function (callback, limit) {
  Car.find(callback).limit(limit);
};
