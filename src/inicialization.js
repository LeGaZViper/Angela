//First inicialization
if (localStorage.playerData == undefined) {
  newLocalStorage();
}

document.onreadystatechange = () => {
  if (document.readyState == "complete") {
    loadTheGame();
  }
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

function hideMenuLinks() {
  let array = document.querySelectorAll(".link");
  for (let i = 0; i < array.length; i++) {
    array[i].style.display = "none";
  }
}

function showMenuLinks() {
  let array = document.querySelectorAll(".link");
  for (let i = 0; i < array.length; i++) {
    array[i].style.display = "";
  }
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
    a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y
  );
}

function _305() {
  console.log(`${window.location.href}sprites/enemy/angelaPhase2/chatlog_2.log`);
}

function inicializeGame() {
  if (playerData.level < 13)
    gameAudio.playMusic("music_level_" + Math.floor(playerData.level / 3));
  else gameAudio.stopMusic();
  hideMenuLinks();
  UI.levelDisplayCheck = true;
  DialogueData.dialoguesUsed = [];
  levelTimer = 0;
  savedTimer = 0;
  textIndex = undefined;
  dialogueList = [];
  bulletList = [];
  enemyList = [];
  enemyBulletList = [];
  timerList = [];
  lootCube.active = false;
  lootCube.nextSpawn = 1300;
  UI.beforeTheBossMenuTimer = 0;
  weaponActivation.inicialize();
  canvas.style.cursor = "none";
  UI.inMenu = false;
  player.inicialize(0, 50);
  if (playerData.level < 9) player.setCompanions(Math.floor(playerData.level / 3));
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
async function loadTheGame() {
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
  //Disabling rightclick popup
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
  document.addEventListener("keydown", function () {
    userInput(event, 1);
  });
  document.addEventListener("keyup", function () {
    userInput(event, 2);
  });
  loadGameAssets(gameLoop);
}

function loadGameAssets(callback) {
  let spritesLoaded = 0;
  let loadingArray = [];
  let loadingText = document.querySelector(".loadingText");
  let loadingBar = document.querySelector(".loadingBar");
  let nOfSprites = 0;
  loadingText.innerHTML = "Inicializing...";
  for (index in sprite) {
    nOfSprites++;
  }
  let nOfSounds = 0;
  for (index in gameAudio.gameAudioFiles) {
    nOfSounds++;
  }
  let nOfAssets = nOfSprites + nOfSounds;
  for (let index in sprite) {
    let precursor = index.split("_");
    if (precursor[0] == "UI" || precursor[0] == "projectile")
      sprite[index].src = "./sprites/" + precursor[0] + "/" + precursor[1] + ".png";
    else
      sprite[index].src =
        "./sprites/" + precursor[0] + "/" + precursor[1] + "/" + precursor[1] + ".png";
    loadingArray.push(precursor[1]);
    sprite[index].onload = function () {
      loadingArray.splice(0, 1);
      if (loadingArray[0] != undefined) loadingText.innerHTML = loadingArray[0];
      spritesLoaded++;
      loadingBar.style.width = (14 / nOfAssets) * spritesLoaded + "vw";
      if (spritesLoaded == nOfSprites) {
        let soundsLoaded = 0;
        for (let index in gameAudio.gameAudioFiles) {
          gameAudio.gameAudioFiles[index].src = "./audio/" + index + ".ogg";
          loadingArray.push(index);
          gameAudio.gameAudioFiles[index].onloadeddata = function () {
            soundsLoaded++;
            loadingBar.style.width = (14 / nOfAssets) * (spritesLoaded + soundsLoaded) + "vw";
            loadingArray.splice(0, 1);
            if (loadingArray[0] != undefined) loadingText.innerHTML = loadingArray[0];
            if (soundsLoaded == nOfSounds) {
              scale();
              playerData = JSON.parse(localStorage.playerData);
              playerData.level = 13;
              keyboardControler.inicialize();
              player.inicialize(0, 50);
              background.inicialize();
              backgroundParticles.inicialize();
              environment.inicialize();
              camera.inicialize();
              gameAudio.setVolume();
              UI.inicialize();
              let loading = document.getElementById("loading");
              loading.style.display = "none";
              callback();
            }
          };
        }
      }
    };
  }
}

//Dynamic resolution scaling function  | used in: rendering
var screenratio;
function scale() {
  screenratio = 1;
  canvas.width = 1100;
  canvas.height = 900;
  while (window.innerHeight < canvas.height || window.innerWidth < canvas.width) {
    screenratio -= 0.1;
    canvas.width = 1100 * screenratio;
    canvas.height = 900 * screenratio;
  }
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

var timerList = [];
function setTimer(ms, reference, attributeName, inMenu = UI.inMenu) {
  let ticks = Math.round((ms * 60) / 1000);
  reference[attributeName] = true;
  timerList.push(new Timer(ticks, reference, attributeName, inMenu));
}

function setCallbackTimer(ms, callback, inMenu = UI.inMenu) {
  let ticks = Math.round((ms * 60) / 1000);
  timerList.push(new CallbackTimer(ticks, callback, inMenu));
}

class Timer {
  constructor(value, reference, attributeName, createdInMenu) {
    this.value = value;
    this.reference = reference;
    this.attributeName = attributeName;
    this.createdInMenu = createdInMenu;
  }
  timerEnd() {
    this.reference[this.attributeName] = false;
  }
}

class CallbackTimer {
  constructor(value, callback, createdInMenu) {
    this.value = value;
    this.callback = callback;
    this.createdInMenu = createdInMenu;
  }
  timerEnd() {
    this.callback();
  }
}