//Start the game function | used in: main menu
function startTheGame() {
  inicializeGame();
}

function warningClick() {
  let warn = document.getElementById("warning");
  warn.style.display = "none";
  gameAudio.playSound("click");
  gameAudio.playMusic("music_menu");
  UI.getMenuEffect(0);
}

//reset of progress
function askAboutReset() {
  if (playerData.level > 0) {
    if (
      confirm(
        "Are you sure you want to start a new game?\nYour current progress will reset!"
      )
    ) {
      resetLocalStorage();
      return true;
    } else return false;
  }
  return true;
}

function getMenu(menu) {
  canvas.style.cursor = "auto";
  UI.inMenu = true;
  UI.globalCustomAlpha = 0;
  UI.getMenuEffect(menu);
}

function closeMenu() {
  UI.inMenu = false;
}

//Lose the game function | used in: gameover
function loseTheGame() {
  gameAudio.stopMusic();
  if (!gameAudio.player_LASER_loop.paused) {
    gameAudio.player_LASER_loop.pause();
    player.LASER_firing = false;
  }
  player.inWeaponActivation = false;
  DialogueData.dialoguesUsed = [];
  timerList = [];
  player.inicialize(0, 50);
  camera.inicialize();
  background.inicialize();
  backgroundParticles.inicialize();
  environment.inicialize();
  getMenu(2);
}
//Win the game function | used in: gameloop ~ all enemies dead
function winTheLevel() {
  player.inWeaponActivation = false;
  player.HP = [player.maxHP[0], player.maxHP[1]];
  player.shield = [player.maxShield[0], player.maxShield[1]];
  player.playerLives = 3;
  player.setCompanions(Math.floor(playerData.level / 3));
  weaponActivation.inicialize();
  dialogueList = [];
  DialogueData.dialoguesUsed = [];
  textIndex = NaN;
  levelTimer = 0;
  enemySpawnList = [];
  timerList = [];
  enemyList = [];
  lootCube.active = false;
  lootCube.nextSpawn = 1300;
  if (playerData.level < 12) {
    playerData.level += 1;
    nextLevel();
  } else {
    gameAudio.stopMusic();
    player.inicialize(0, 50);
    camera.inicialize();
    background.inicialize();
    backgroundParticles.inicialize();
    environment.inicialize();
    if (playerData.level == 12) {
      getMenu(6);
    } else if (playerData.level == 13) {
      getMenu(7);
    }
    playerData.level = 11;
  }
  saveLocalStorage();
}
function nextLevel() {
  if (playerData.level % 3 == 0) {
    gameAudio.playMusic("music_level_" + Math.floor(playerData.level / 3));
  }
  levels_handler.waveCounter = 1;
  levels_handler.level = levelLayout["level_" + playerData.level];
  levels_handler.levelCreator();
  spawn();
}
