const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Setup schema
const bookingSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  cust_name: {
    type: String,
    required: true,
  },
  cust_phn: {
    type: String,
  },
  issue_date: {
    type: Date,
    required: true,
  },
  return_date: {
    type: Date,
    required: true,
  },
  car_id: {
    type: String,
    required: true,
  },
});
// Export Contact model
const Booking = (module.exports = mongoose.model("Booking", bookingSchema));
module.exports.get = function (callback, limit) {
  Booking.find(callback).limit(limit);
};
