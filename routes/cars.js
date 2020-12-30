const express = require("express");
// const axios = require("axios").default;
const router = express.Router();
const Car = require("../models/Car");
const Booking = require("../models/Booking");

router.get("/cars", async (req, res) => {
  try {
    const results = await Car.find(req.query);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.get("/cars/:id", async (req, res) => {
  try {
    const results = await Car.findById(req.params.id);
    res.send(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.post("/cars", async (req, res) => {
  try {
    let car = new Car({
      _id: req.body._id,
      model: req.body.model,
      seating_capacity: req.body.seating_capacity,
      rent_per_day: req.body.rent_per_day,
      bookings: [],
    });
    const result = await car.save();
    res.status(201).send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.delete("/cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const booking_filter = {
      car_id: id,
    };
    const bookingCount = await Booking.countDocuments(booking_filter);
    // console.log(bookingCount);
    if (bookingCount == 0) {
      const result = await Car.findByIdAndDelete(id);
      res.send(result);
    } else {
      res.status(500).send("This car is already booked, cannot delete!");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

router.put("/cars/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const update = req.body;
    // const filter = {
    //     bookings: {
    //         $not: { $size: 0 }
    //     }
    // }
    const booking_filter = {
      car_id: id,
    };
    const bookingCount = await Booking.countDocuments(booking_filter);
    // console.log(bookingCount);
    if (bookingCount == 0) {
      const result = await Car.findByIdAndUpdate(id, update, {new: true});
      if (result) {
        res.send(result);
      } else {
        res.status(500).send("Could not update the Car!");
      }
    } else {
      res.status(500).send("This car is already booked, cannot update!");
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
