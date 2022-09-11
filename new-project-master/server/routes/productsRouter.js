const express = require("express");
const Product = require("../models/productModel");
const router = express.Router();
router.get("/", async (req, res) => {
  const products = await Product.find({});
  res.send(products);
});
router.post("/", async (req, res) => {
  const product = await new Product({
    name: req.body.name,
    description: req.body.description,
    category: req.body.category,
    oldprice: req.body.oldprice,
    newprice: req.body.newprice,
    image: req.body.image,
    detailsimages: req.body.detailsimages,
  });
  const saveProduct = await product.save();
  res.send(saveProduct);
});

router.get("/:_id", async (req, res) => {
  const product = await Product.findOne({ _id: req.params._id });
  res.send(product);
});

module.exports = router;
