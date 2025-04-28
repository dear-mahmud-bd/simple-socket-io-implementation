const express = require("express");
const http = require("http");
const app = express();

const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  // console.log("User - ", socket.id);
  // socket.on("btn_click", (data) => {
  // console.log('clicked');
  // io.emit("do_som")
  // })

  socket.on("send_message", (msg) => {
    console.log(msg);
    socket.broadcast.emit("recieve_message", msg);
  });

  socket.on("user_typing", (data) => {
    console.log(data);
    socket.broadcast.emit("user_typing", data);
  });

  socket.on("new_user", (data) => {
    console.log(data);
    socket.broadcast.emit("new_user", data.user);
  });
});

server.listen(5000, () => {
  console.log("Server is running on port 5000");
});
