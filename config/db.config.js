module.exports = {
  url: "mongodb+srv://cluster0.wrnoy.mongodb.net?retryWrites=true&w=majority",
  db: "CarRentalSystem",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  fullUrl: `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wrnoy.mongodb.net/CarRentalSystem?retryWrites=true&w=majority`
};