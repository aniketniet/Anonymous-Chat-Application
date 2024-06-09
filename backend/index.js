const { restrictToLoggedInUsersOnly } = require("./middlewares/auth");
const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const cors = require("cors");
const { connect } = require("./connection");
const apiRouter = require("./routes/apiRouter");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const PORT = 8081 || process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is running");
});
app.use("/api", apiRouter);

app.post("/changepassword", async (req, res) => {
  const { password } = req.body;
  const user = await console.log(password);
  return res.status(200);
});

const chatSchema = new mongoose.Schema({
  group: String,
  message: String,
  user: String,
  timestamp: { type: Date, default: Date.now },
});

const Chat = mongoose.model("Chat", chatSchema);

let users = [];
let connections = {};

io.on("connection", (socket) => {
  console.log("a user connected" + socket.id);

  // Existing chat feature
  users.push(socket);

  socket.on("start_chat", () => {
    if (users.length > 1) {
      const randomUser = getRandomUser(socket);
      connections[socket.id] = randomUser.id;
      connections[randomUser.id] = socket.id;
      socket.emit("chat_connected", randomUser.id);
      randomUser.emit("chat_connected", socket.id);
      users = users.filter(
        (user) => user.id !== socket.id && user.id !== randomUser.id
      );
    }
  });

  socket.on("send_message", (message) => {
    const recipientId = connections[socket.id];
    if (recipientId) {
      const messageObject = { text: message.text, sender: "user" };
      io.to(recipientId).emit("receive_message", messageObject);
    }
  });

  // Group chat feature
  socket.on("joinGroup", (group) => {
    socket.join(group);
    io.to(group).emit("message", {
      user: "system",
      message: `${socket.id} has joined the group ${group}`,
    });
  });

  socket.on("leaveGroup", (group) => {
    socket.leave(group);
    io.to(group).emit("message", {
      user: "system",
      message: `${socket.id} has left the group ${group}`,
    });
  });

  socket.on("sendMessage", (data) => {
    const { group, message, user } = data;
    const chatMessage = new Chat({ group, message, user });
    chatMessage.save().then(() => {
      io.to(group).emit("message", data);
    });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
    const userId = socket.id;
    if (connections[userId]) {
      const recipientId = connections[userId];
      delete connections[userId];
      delete connections[recipientId];
      io.to(recipientId).emit("chat_disconnected");
    }
    users = users.filter((user) => user.id !== userId);
  });
});

connect()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

function getRandomUser(socket) {
  const availableUsers = users.filter((user) => user.id !== socket.id);
  return availableUsers[Math.floor(Math.random() * availableUsers.length)];
}
