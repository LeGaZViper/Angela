//Start the game function | used in: main menu
function startTheGame() {
  //Reset Progress
  if (ship.section > 1 || ship.level > 1) {
    if (
      confirm(
        "Are you sure you want to start a new game?\nYour current progress will reset!"
      )
    ) {
      resetLocalStorage();
      inicializeGame();
    }
  } else inicializeGame();
}

function startMultiplayer_this() {
  if (host) sendSpawnList();
  multiplayer = true;
  frame = true;
  startTheGame();
}
//Continue the game function | used in: continue
function continueTheGame() {
  inicializeGame();
}

function getMenu(menu) {
  canvas.style.cursor = "auto";
  UI.inMenu = true;
  UI.currentMenu = menu;
}

//Lose the game function | used in: gameover
function loseTheGame() {
  player.inWeaponActivation = false;
  player.inicialize(0, 50);
  camera.inicialize();
  background.inicialize();
  backgroundParticles.inicialize();
  resetLocalStorage();
  getMenu(2);
}
//Win the game function | used in: gameloop ~ all enemies dead
function winTheGame() {
  player.inWeaponActivation = false;
  player.inicialize(0, 50);
  camera.inicialize();
  background.inicialize();
  backgroundParticles.inicialize();
  if (ship.level < 6) ship.level += 1;
  else {
    ship.level = 1;
    ship.section += 1;
  }
  saveLocalStorage();
  getMenu(3);
}

function saveLocalStorage() {
  localStorage.ship = JSON.stringify(ship);
}

function resetLocalStorage() {
  ship = new DefaultShip();
  localStorage.ship = JSON.stringify(ship);
}
