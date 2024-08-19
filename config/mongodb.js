const mongoose = require("mongoose");
const url = process.env.MONGODB_URL;
const dbConnection = async () => {
  await mongoose.connect(url).then(() => {
    console.log("Connected");
  });
};

module.exports = {
  dbConnection,
};
