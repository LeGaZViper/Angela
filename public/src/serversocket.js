const socket = io();
let multiplayer = false;

//https://socket.io/docs/rooms-and-namespaces/#Rooms -- imporant!

function sendData(data) {
  socket.emit("data", data);
}

socket.on("data", receiveData);
function receiveData(data) {
  player2.x = data.x * screenratio + player.earthX;
  player2.y = data.y * screenratio + player.earthY;
  player2.angle = data.angle;
  player2.speed = data.speed;
}

function start() {
  multiplayer = true;
}

class Data {
  constructor() {
    this.x = (player.coordX - player.spaceSize / 2) / screenratio;
    this.y = (player.coordY - player.spaceSize / 2) / screenratio;
    this.angle = player.angle;
    this.speed = player.speed;
  }
}
