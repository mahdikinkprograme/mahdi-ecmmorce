const express = require("express");
const router = express.Router();
const data = require("../data");
router.get("/", async (req, res) => {
  res.send(data.categoryItems);
});
module.exports = router;
