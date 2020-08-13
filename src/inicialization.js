//First inicialization
if (localStorage.playerData == undefined) {
  newLocalStorage();
}

window.onload = () => {
  loadTheGame(gameLoop);
};

//Sleep function | used in: cooldowns
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function saveLocalStorage() {
  localStorage.playerData = JSON.stringify(playerData);
}

function resetLocalStorage() {
  let sound = playerData.soundMultiplier;
  let music = playerData.musicMultiplier;
  playerData = new DefaultSetup();
  playerData.soundMultiplier = sound;
  playerData.musicMultiplier = music;
  localStorage.playerData = JSON.stringify(playerData);
}

function newLocalStorage() {
  playerData = new DefaultSetup();
  localStorage.playerData = JSON.stringify(playerData);
}

function killAll() {
  enemyList = [];
  enemySpawnList = [];
  levels_handler.level.total = 0;
}

//collision; adjusted for translated objects
function collides(a, b) {
  return (
    a.hitBoxX < b.hitBoxX + b.hitBoxWidth &&
    a.hitBoxX + a.hitBoxWidth > b.hitBoxX &&
    a.hitBoxY < b.hitBoxY + b.hitBoxHeight &&
    a.hitBoxY + a.hitBoxHeight > b.hitBoxY
  );
}
//collision; normal one; for UI
function collides_UI(a, b) {
  return (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  );
}

function inicializeGame() {
  gameAudio.playMusic("music_level_" + Math.floor(playerData.level / 3));
  xMousePos =
    Math.abs(event.clientX) - ($(document).width() - canvas.width) / 2;
  yMousePos = Math.abs(event.clientY) - parseInt($("#canvas").css("marginTop"));
  UI.levelDisplayCheck = true;
  DialogueData.dialoguesUsed = [];
  levelTimer = 0;
  textIndex = undefined;
  dialogueList = [];
  bulletList = [];
  enemyList = [];
  enemyBulletList = [];
  lootCube.active = false;
  lootCube.nextSpawn = 1300;
  weaponActivation.inicialize();
  canvas.style.cursor = "none";
  UI.inMenu = false;
  player.inicialize(0, 50);
  if (playerData.level < 9)
    player.setCompanions(Math.floor(playerData.level / 3));
  else player.setCompanions(3);
  enemySpawnList = [];
  levels_handler.waveCounter = 1;
  levels_handler.level = levelLayout["level_" + playerData.level];
  levels_handler.levelCreator();
  background.inicialize();
  backgroundParticles.inicialize();
  environment.inicialize();
  spawn();
  camera.inicialize();
}

//Main Inicialization
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function loadTheGame(callback) {
  canvas.addEventListener("click", function () {
    UI.click();
  });
  canvas.addEventListener("mousedown", function () {
    userInput(event, 1);
  });
  canvas.addEventListener("mouseup", function () {
    userInput(event, 2);
  });
  canvas.addEventListener("mousemove", function () {
    userInput(event, 0);
  });
  document.addEventListener("keydown", function () {
    userInput(event, 1);
  });
  document.addEventListener("keyup", function () {
    userInput(event, 2);
  });
  //Setting path
  for (let index in sprite) {
    let precursor = index.split("_");
    if (precursor[0] == "UI" || precursor[0] == "projectile")
      sprite[index].src =
        "./sprites/" + precursor[0] + "/" + precursor[1] + ".png";
    else
      sprite[index].src =
        "./sprites/" +
        precursor[0] +
        "/" +
        precursor[1] +
        "/" +
        precursor[1] +
        ".png";
  }
  scale();
  playerData = JSON.parse(localStorage.playerData);
  playerData.level = 12;
  player.inicialize(0, 50);
  background.inicialize();
  backgroundParticles.inicialize();
  environment.inicialize();
  camera.inicialize();
  gameAudio.setVolume();
  UI.inicialize();
  //Disabling rightclick popup
  $("#canvas").bind("contextmenu", function () {
    return false;
  });
  callback();
}

//Dynamic resolution scaling function  | used in: rendering
var screenratio;
function scale() {
  screenratio = 1;
  canvas.width = 1100;
  canvas.height = 900;
  while (
    $(window).height() < canvas.height ||
    $(window).width() < canvas.width
  ) {
    screenratio -= 0.1;
    canvas.width = 1100 * screenratio;
    canvas.height = 900 * screenratio;
  }
  canvas.width = $(window).width();
  canvas.height = $(window).height();
}

var timerList = [];
function setTimer(ms, reference, attributeName) {
  let ticks = Math.round((ms * 60) / 1000);
  reference[attributeName] = true;
  timerList.push(new Timer(ticks, reference, attributeName));
}

class Timer {
  constructor(value, reference, attributeName) {
    this.value = value;
    this.reference = reference;
    this.attributeName = attributeName;
  }
}
