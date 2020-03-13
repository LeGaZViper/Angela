const socket = io();
let multiplayer = false;
let host = false;
var roomId;
//https://socket.io/docs/rooms-and-namespaces/#Rooms -- important!

window.onbeforeunload = function() {
  if (roomId != undefined) {
    socket.emit("disconnect_room", roomId);
    this.leaveRoom();
  }
};

function pingRoom(id) {
  socket.emit("pingRoom", id);
}

socket.on("pingRoom", () => {
  console.log("Ping!");
});

socket.on("showRoomList", roomList => {
  console.log(roomList);
});

function showRoomList(id = socket.id) {
  socket.emit("showRoomList", id);
}

function createRoom(id = socket.id) {
  if (roomId == undefined) {
    roomId = socket.id;
    host = true;
    socket.emit("createRoom", id);
  } else {
    console.log("Already in a room.");
  }
}

function joinRoom(id) {
  if (roomId == undefined) {
    roomId = id;
    socket.emit("joinRoom", id);
  } else {
    console.log("Already in a room.");
  }
}

function leaveRoom(id = roomId) {
  if (id != undefined) {
    roomId = undefined;
    host = false;
    socket.emit("leaveRoom", id);
  } else {
    console.log("No room to leave.");
  }
}

function startMultiplayer_all(id = roomId) {
  socket.emit("startGame", id);
}

socket.on("disconnect_room", id => {
  leaveRoom(id);
  loseTheGame();
});

socket.on("startGame", () => {
  if (roomId != undefined) startMultiplayer_this();
  else console.log("No current room.");
});

function sendPlayerData(playerData, id = roomId) {
  socket.emit("playerData", [playerData, id]);
}

socket.on("playerData", playerData => {
  player2.xspeed = playerData.xspeed * screenratio;
  player2.yspeed = playerData.yspeed * screenratio;
  //player2.x = playerData.x * screenratio + player.earthX;
  //player2.y = playerData.y * screenratio + player.earthY;
  player2.angle = playerData.angle;
  player2.speed = playerData.speed;
  player2.HP = playerData.HP;
  player2.leftMouseDown = playerData.leftMouseDown;
  player2.weapon = playerData.weapon;
});

class playerData {
  constructor() {
    this.xspeed = player.xspeed / screenratio;
    this.yspeed = player.yspeed / screenratio;
    //this.x = (player.coordX - player.spaceSize / 2) / screenratio;
    //this.y = (player.coordY - player.spaceSize / 2) / screenratio;
    this.angle = player.angle;
    this.speed = player.speed;
    this.HP = player.HP;
    this.leftMouseDown = player.leftMouseDown;
    this.weapon = player.weapon;
  }
}
