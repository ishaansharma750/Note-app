const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log("Mongo Connected"))
  .catch((err) => console.log(err.message));
