const express = require("express");
const moment = require("moment");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");

router.get("/availability", async (req, res) => {
  try {
    let car_filter = {};
    let booking_filter = {};
    if (!req.query.date)
      return res.status(500).send("Booking Date is mandatory!");

    let booking_date = moment(req.query.date, "YYYYMMDD").toDate();
    console.log(`booking date: ${booking_date}`);
    booking_filter["$and"] = [
      {
        issue_date: { $lte: booking_date },
      },
      {
        return_date: { $gte: booking_date },
      },
    ];
    if (req.query.model) {
      car_filter["model"] = req.query.model;
    }
    if (req.query.seating_capacity) {
      car_filter["seating_capacity"] = req.query.seating_capacity;
    }

    let availableCarList = [];
    const carList = await Car.find(car_filter);
    for (const car of carList) {
      console.log(car._id);
      booking_filter["car_id"] = car._id;
      console.log(JSON.stringify(booking_filter));
      // const results = await Booking.find(filter);
      const bookingClashCount = await Booking.countDocuments(booking_filter);
      console.log("booking clash count " + bookingClashCount);
      if (bookingClashCount == 0) {
        availableCarList.push(car);
      }
    }
    res.send(availableCarList);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
