import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // When a user joins
  socket.on("join", (username) => {
    socket.username = username;
    socket.broadcast.emit("notification", `${username} joined the chat`);
  });

  // When a message is sent
  socket.on("chatMessage", (msgData) => {
    console.log("📨 Received message from", socket.username, ":", msgData);
    socket.broadcast.emit("chatMessage", msgData); // send to all others
  });

  // Typing indicator
  socket.on("userTyping", (user) => {
    socket.broadcast.emit("userTyping", user);
  });

  // On disconnect
  socket.on("disconnect", () => {
    if (socket.username) {
      io.emit("notification", `${socket.username} left the chat`);
    }
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 5000;
server.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
