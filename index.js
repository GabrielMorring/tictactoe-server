const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin:
      "https://62c760798bb9fd00af6bf0b7--chic-sunburst-93eaaa.netlify.app",
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

  socket.on("do_move", (data) => {
    socket.to(data.room).emit("receive_move", { squares: data.squares });
  });

  socket.on("send_restart", (data) => {
    console.log("restart");
    socket.to(data.room).emit("receive_restart", {});
  });

  socket.on("disconnected", () => {
    console.log("User Disconnected", socket.id);
  });
});

server.listen(process.env.PORT || PORT, () => {
  console.log("SERVER IS RUNNING");
});
