const express = require("express");
const router = express.Router();
const {
  handleSignup,
  handleLogin,
  handleChat,
} = require("../controllers/user");

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/chat", handleChat);

module.exports = router;
