const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const mongoose = require("mongoose");
const Place = require("../models/place");

mongoose.connect(
  "mongodb+srv://shrimaliaditya013:C1YScslESNFEnkWq@cluster0.dejhjin.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Place.deleteMany({});
};

seedDB().then(() => {
  mongoose.connection.close();
});
