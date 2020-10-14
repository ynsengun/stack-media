const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ msg: "Hi! I am coming from server." });
});

module.exports = router;
