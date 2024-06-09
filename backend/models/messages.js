const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
    },
    sender: {
      type: String,
    },
  },
  { timestamps: true }
);

const message = mongoose.model("Message", userSchema);
module.exports = message;
