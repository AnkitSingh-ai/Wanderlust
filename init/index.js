const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () => {
  try {
      await Listing.deleteMany({});
      const initData = initdata.data.map((obj) => ({ ...obj , owner: "6810b677af257c87a51dfcbb" })); 
      await Listing.insertMany(initData);
      console.log("Data was initialized");
  } catch (err) {
      console.error("Error initializing database:", err);
  }
};
initDB();
