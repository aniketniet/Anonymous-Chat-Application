const mongoose = require("mongoose");

async function connect() {
  try {
    await mongoose.connect(
      "mongodb+srv://aniketniet:aniket@cluster0.gsuu7od.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
  } catch (err) {
    console.log("Error connecting to MongoDB");
    console.log(err);
  }
}

module.exports = { connect };
