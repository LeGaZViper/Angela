const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/public", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html");
});

var roomList = [];
io.on("connection", socket => {
  //při spojení
  console.log("user connected");

  socket.on("playerData", ([playerData, id]) => {
    socket.broadcast.to(id).emit("playerData", playerData); //Posílám socket všem ostatním klientům
    //io.sockets.emit("click",data); //Posílám všem i sobě
  }); //Doráží mi socket od klienta

  socket.on("createRoom", id => {
    roomList.push(id);
  });

  socket.on("joinRoom", id => {
    socket.join(id);
  });

  socket.on("leaveRoom", id => {
    if (id == socket.id) {
      roomList.splice(roomList.indexOf(socket.id), 1);
    } else {
      socket.leave(id);
    }
  });

  socket.on("startGame", id => {
    io.to(id).emit("startGame");
  });

  socket.on("showRoomList", id => {
    io.to(id).emit("showRoomList", roomList);
  });

  socket.on("pingRoom", id => {
    socket.broadcast.to(id).emit("pingRoom");
  });

  socket.on("disconnect_room", id => {
    socket.broadcast.to(id).emit("disconnect_room");
  });
});

http.listen(3000);
console.log("I'm running!");
