const express = require("express");
const Order = require("../models/orderModel");
const router = express.Router();
router.post("/", async (req, res) => {
  const newOrder = await Order({
    orderItems: req.body.orderItems.map((item) => ({
      ...item,
      product: item._id,
    })),
    shippingAdress: req.body.shippingAdress,
    paymentMethod: req.body.paymentMethod,
    itemsPrice: req.body.itemsPrice,
    shippingPrice: req.body.shippingPrice,
    taxPrice: req.body.taxPrice,
    totalPrice: req.body.totalPrice,
    user: req.body.userId,
  });
  const order = await newOrder.save();
  res.status(201).send(order);
});
router.get("/", async (req, res) => {
  const orders = await Order.find({});
  res.send(orders);
});
router.get("/:_id", async (req, res) => {
  const order = await Order.findOne({ _id: req.params._id });
  res.send(order);
});
module.exports = router;
