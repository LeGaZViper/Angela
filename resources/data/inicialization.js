//First inicialization
if (localStorage.ship == undefined) {
  resetLocalStorage();
}

window.onload = () => {
  loadTheGame(gameLoop);
};

//Sleep function | used in: cooldowns
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
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
  player.inicialize();
  camera.inicialize();
  backgroundParticles.set();
  UI.levelDisplayCheck = true;
  player.HP = [player.maxHP[0], player.maxHP[1]];
  bulletList = [];
  enemyList = [];
  enemyBulletList = [];
  randomDropList = [];
  weaponDuration = 0;
  canvas.style.cursor = "none";
  UI.inMenu = false;
  spawn(levels_handler.levelCreator());
}

//Main Inicialization
var canvas;
var ctx;
function loadTheGame(callback) {
  canvas = document.getElementById("canvas");
  canvas.addEventListener("click", function() {
    UI.click();
  });
  canvas.addEventListener("mousedown", function() {
    userInput(event, 1);
  });
  canvas.addEventListener("mouseup", function() {
    userInput(event, 2);
  });
  canvas.addEventListener("mousemove", function() {
    userInput(event, 0);
  });
  ctx = canvas.getContext("2d");
  //Setting path
  for (let index in sprite) {
    let precursor = index.split("_");
    if (precursor[0] == "UI" || precursor[0] == "projectile")
      sprite[index].src =
        "./resources/sprites/" + precursor[0] + "/" + precursor[1] + ".png";
    else
      sprite[index].src =
        "./resources/sprites/" +
        precursor[0] +
        "/" +
        precursor[1] +
        "/" +
        precursor[1] +
        ".png";
  }
  scale();
  backgroundParticles.set();
  ship = JSON.parse(localStorage.ship);
  camera.inicialize();
  player.inicialize();
  UI.inicialize();
  //Disabling rightclick popup
  $("#canvas").bind("contextmenu", function() {
    return false;
  });
  callback();
}

//Dynamic resolution scaling function  | used in: rendering
var screenratio;
function scale() {
  screenratio = 1;
  canvas.width = 1100 * screenratio;
  canvas.height = 900 * screenratio;
  while (
    $(window).height() < canvas.height ||
    $(window).width() < canvas.width
  ) {
    screenratio -= 0.1;
    canvas.width = 1100 * screenratio;
    canvas.height = 900 * screenratio;
  }
  canvas.style.marginLeft = -canvas.width / 2 + "px";
}
