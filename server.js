const express = require("express");
const cors = require("cors");
const app = express();
// const multer = require("multer");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const serverConfig = require("./config/server.config");
const dbConfig = require("./config/db.config");
const cars_Router = require("./routes/cars");
const bookings_Router = require("./routes/bookings");
const availability_Router = require("./routes/availability");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", cars_Router);
app.use("/", bookings_Router);
app.use("/", availability_Router);

mongoose.connect(dbConfig.fullUrl, {
  // user: dbConfig.username,
  // pass: dbConfig.password,
  // dbName: dbConfig.db,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
let db = mongoose.connection;

// Added check for DB connection
if (!db) console.log("Error connecting db");
else console.log("Db connected successfully");
// console.log(db.db.listCollections);

const port = process.env.PORT || serverConfig.port;
app.listen(port, function (req, res) {
  console.log("server started on " + port);
});
