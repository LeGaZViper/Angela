//Start the game function | used in: main menu
function startTheGame() {
  //Reset Progress
  if (ship.level > 0) {
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
  gameAudio.stopMusic();
  if (!gameAudio.player_LASER_loop.paused) {
    gameAudio.player_LASER_loop.pause();
    player.LASER_firing = false;
  }
  player.inWeaponActivation = false;
  player.inicialize(0, 50);
  camera.inicialize();
  background.inicialize();
  backgroundParticles.inicialize();
  environment.inicialize();
  resetLocalStorage();
  getMenu(2);
}
//Win the game function | used in: gameloop ~ all enemies dead
function winTheLevel() {
  gameAudio.stopMusic();
  player.inWeaponActivation = false;
  ship.level += 1;
  player.HP = player.maxHP;
  player.shield = player.maxShield;
  player.shipLives = 3;
  if (ship.level % 3 == 0) {
    ship.companions++;
    player.setCompanions(ship.companions);
  }
  saveLocalStorage();
  weaponActivation.inicialize();
  randomDropList = [];
  dialogueList = [];
  textIndex = NaN;
  levelTimer = 0;
  enemySpawnList = [];
  nextLevel();
}

function nextLevel() {
  gameAudio.playMusic();
  UI.levelDisplayCheck = true;
  levels_handler.waveCounter = 1;
  levels_handler.level = levelLayout({});
  levels_handler.levelCreator();
  spawn();
}

function saveLocalStorage() {
  localStorage.ship = JSON.stringify(ship);
}

function resetLocalStorage() {
  let sound = ship.soundMultiplier;
  let music = ship.musicMultiplier;
  ship = new DefaultSetup();
  ship.soundMultiplier = sound;
  ship.musicMultiplier = music;
  localStorage.ship = JSON.stringify(ship);
}

function newLocalStorage() {
  ship = new DefaultSetup();
  localStorage.ship = JSON.stringify(ship);
}
