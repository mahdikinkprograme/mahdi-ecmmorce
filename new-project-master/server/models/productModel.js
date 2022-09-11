const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  oldprice: String,
  newprice: String,
  image: String,
  detailsimages: [String],
});
const Product = mongoose.model("product", productSchema);
module.exports = Product;
