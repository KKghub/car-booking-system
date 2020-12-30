const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const Car = require('./models/Car');

async function main() {
    mongoose.connect(dbConfig.fullUrl, {
        // user: dbConfig.username,
        // pass: dbConfig.password,
        // dbName: dbConfig.db,
        // db: dbConfig.db,
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      let db = mongoose.connection;
      console.log(db);
      // Added check for DB connection
      if(!db) {
          console.log("Error connecting db")
      } else {
          console.log("Db connected successfully")
        //   console.log(db.collections);
          // console.log("some ops");
          console.log("Closing db...");
          let car = new Car({
              _id: '7',
              model: "XXX",
              seating_capacity: 9,
              rent_per_day: 90789
          });

          const s = await car.save();
          
          const res = await Car.create
          res.forEach(data => {
              console.log(data);
          })
          db.close();
      }
      
}

main();