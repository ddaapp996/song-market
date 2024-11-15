const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const Song = require("./models/Song");
const Banner = require("./models/Banner");
const connectDB = require("./config/database");
const fakeSongsData = require("./data/songs");

dotenv.config();

connectDB();

const users = [
  {
    username: "admin",
    email: "admin@gmail.com",
    password: "admin@123",
    role: "admin",
  },
  {
    username: "user1",
    email: "user1@example.com",
    password: "user1234",
    role: "user",
  },
];

const songs = fakeSongsData(2000);

const banners = [
  {
    title: "Summer Hits",
    imageUrl: "/images/banners/1.png",
    linkTo: "/song/1",
    isActive: true,
  },
  {
    title: "Top Charts",
    imageUrl: "/images/banners/3.png",
    linkTo: "/song/2",
    isActive: true,
  },
  {
    title: "New Releases",
    imageUrl: "/images/banners/3.png",
    linkTo: "/song/3",
    isActive: true,
  },
];

const seedData = async () => {
  try {
    await User.deleteMany({});
    await Song.deleteMany({});
    await Banner.deleteMany({});

    for (let user of users) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    }

    await User.insertMany(users);
    await Song.insertMany(songs);
    await Banner.insertMany(banners);

    console.log("Data seeded successfully");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding data:", error.message);
    mongoose.connection.close();
    process.exit(1);
  }
};

seedData();
