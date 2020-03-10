const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/public", (req, res) => {
  res.sendFile(__dirname + "/public/" + "index.html");
});

io.on("connection", socket => {
  //při spojení
  console.log("user connected");
  socket.on("click", click); //Doráží mi socket od klienta
  function click(data) {
    socket.broadcast.emit("click", data); //Posílám socket všem ostatním klientům
    //io.sockets.emit("click",data); //Posílám všem i sobě
    console.log(data);
  }
});

http.listen(3000);
console.log("I'm running!");
