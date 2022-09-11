const express = require("express");
const bcrypt = require("bcrypt");
const validatePhoneNumber = require("validate-phone-number-node-js");
const User = require("../models/userModel");
const generateToken = require("../utils");
const router = express.Router();
router.get("/register", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});
router.post("/register", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) res.status(401).send("This Email Is Already Used");
  else {
    const phoneValidator = await validatePhoneNumber.validate(req.body.phone);
    if (!phoneValidator) res.status(401).send("Invalid Phone Number");
    else {
      const newUser = await new User({
        username: req.body.username,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
      });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(newUser.password, salt);
      const saveUser = await newUser.save();
      res.send(saveUser._id);
    }
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) res.status(401).send("Username Or Password Is Wrong");
  else {
    let isValid = await bcrypt.compare(req.body.password, user.password);
    if (!isValid) res.status(401).send("Username Or Password Is Wrong...");
    else {
      const token = await generateToken(user);
      res.send({
        _id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
      });
    }
  }
});

module.exports = router;
