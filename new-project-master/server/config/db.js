const mongoose = require("mongoose");
const url = process.env.DB_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo DB Connection Success..."))
  .catch((err) => console.log("Mongo DB Connection Failed..."));
