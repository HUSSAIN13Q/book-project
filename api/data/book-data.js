const mongoose = require("mongoose");

async function connectDB() {
  const connection = await mongoose.connect(
    "mongodb+srv://HUSSAIN:npqSTU789@cluster0.sn1la.mongodb.net/"
  );
  console.log(`Mongo connected ${connection.connection.host}`);
}

module.exports = connectDB;
