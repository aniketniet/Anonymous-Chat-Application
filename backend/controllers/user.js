const UserData = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../Services/auth");

async function handleSignup(req, res) {
  const { name, gender, email, password } = req.body;
  const user = await UserData.create({ name, gender, email, password });
  if (!user) {
    return res.status(400).json({ message: "User not created" });
  }
  res.status(201).json({ message: "User created" });
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await UserData.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid password" });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uId", sessionId);
  return res.status(200).json({ message: "Success", email: user.email });
}

async function handleChat(req, res) {
  console.log(req.body);
  res.status(200).json({ message: "Success" });
}

module.exports = { handleSignup, handleLogin, handleChat };
