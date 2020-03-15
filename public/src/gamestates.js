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
  PARTS = 0;
  canvas.style.cursor = "auto";
  UI.inMenu = true;
  UI.currentMenu = menu;
}

//Lose the game function | used in: gameover
function loseTheGame() {
  player.inicialize();
  camera.inicialize();
  resetLocalStorage();
  getMenu(2);
}
//Win the game function | used in: gameloop ~ all enemies dead
function winTheGame() {
  camera.inicialize();
  localStorage.PARTS = parseInt(localStorage.PARTS) + PARTS;
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
  localStorage.ship = JSON.stringify(defaultShip);
  ship = defaultShip;
  localStorage.PARTS = 0;
}
