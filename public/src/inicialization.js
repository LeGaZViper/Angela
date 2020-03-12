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
  xMousePos = canvas.width / 2;
  yMousePos = canvas.height / 2;
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
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
function loadTheGame(callback) {
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
  document.addEventListener("keydown", function() {
    userInput(event, 1);
  });
  document.addEventListener("keyup", function() {
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
  backgroundParticles.set();
  ship = JSON.parse(localStorage.ship);
  camera.inicialize();
  player.inicialize();
  player2.inicialize();
  defineEnemyDatabase();
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
