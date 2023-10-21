const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const mongoose = require("mongoose");
const Campground = require("../models/campground");

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
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6523d1bce27a8acd630651a7",
      location: `${cities[random1000].city},${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci nesciunt, voluptatibus sint debitis in qui quae ea id architecto unde dolorem impedit facilis assumenda! Nihil quaerat tempore architecto numquam amet.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dxrqlovbo/image/upload/v1697920661/TourTales/lwfbahqgmwprduatfbod.jpg",
          filename: "TourTales/yqvjwt41k1kplsltkuny",
        },
        {
          url: "https://res.cloudinary.com/dxrqlovbo/image/upload/v1697915167/TourTales/friluslblzdafj2tensu.jpg",
          filename: "TourTales/subn4fg9tg5xyn3fwnrw",
        },
        {
          url: "https://res.cloudinary.com/dxrqlovbo/image/upload/v1697919896/TourTales/xoswwrbxpn0q5tkvojxc.jpg",
          filename: "TourTales/dsyvqe3urfgsmhhtxrpl",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
