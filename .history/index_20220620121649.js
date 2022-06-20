const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected ${socket.id}`);

  socket.on("join_room", (data) => {
    socket.join(data.room);

    socket.to(data.room).emit("set_player", { player1: true });

    console.log(`User ${data.id} joined room ${data.room}`);
  });

  socket.on("disconnected", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER IS RUNNING");
});
