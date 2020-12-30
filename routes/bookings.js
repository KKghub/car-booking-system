const express = require("express");
const moment = require("moment");
const router = express.Router();
const Booking = require("../models/Booking");
const Car = require("../models/Car");

router.get("/bookings", async (req, res) => {
  try {
    const results = await Booking.find(req.query);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/bookings/:id", async (req, res) => {
  try {
    const results = await Booking.findById(req.params._id);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/bookings", async (req, res) => {
  try {
    const issue_date = moment(req.body.issue_date, "YYYYMMDD").toDate();
    const return_date = moment(req.body.return_date, "YYYYMMDD").toDate();
    if (issue_date > return_date) {
      return res
        .status(500)
        .send("issue date cannot be greater than return date");
    }

    const booking_filter = {
      car_id: req.body.car_id,
      $and: [
        {
          issue_date: { $lte: return_date },
        },
        {
          return_date: { $gte: issue_date },
        },
      ],
    };

    const carExist = await Car.findById(req.body.car_id);
    const bookingClashCount = await Booking.countDocuments(booking_filter);
    console.log(bookingClashCount);
    console.log(carExist);
    if (!carExist) {
      return res.status(500).send("Car does not exist!");
    }
    if (bookingClashCount == 0) {
      const booking = new Booking({
        _id: req.body._id,
        cust_name: req.body.cust_name,
        cust_phn: req.body.cust_phn,
        issue_date: moment(req.body.issue_date, "YYYYMMDD").toDate(),
        return_date: moment(req.body.return_date, "YYYYMMDD").toDate(),
        car_id: req.body.car_id,
      });
      const results = await booking.save();
      res.status(201).send(results);
    } else {
      res.status(500).send("Could not find Booking date");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/bookings/:id", async (req, res) => {
  try {
    const result = await Booking.findByIdAndDelete(req.params.id);
    if (result) {
      res.send(result);
    } else {
      res.status(500).send("No Booking Found");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
