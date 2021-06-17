const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("connected", (name) => {
    console.log("User connected");
    socket.broadcast.emit("messages", {
      name: name,
      mensaje: `${name} ha entrado en la sala del chat`,
    });
  });

  socket.on("message", (name, message) => {
    io.emit("messages", { name, message });
  });

  socket.on("disconect", (name) => {
    io.emit("messages", {
      server: "server",
      message: `${name} Ha abandoando la sala`,
    });
  });
});

server.listen(3000, () => console.log("Server on"));
