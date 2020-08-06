//Start the game function | used in: main menu
function startTheGame() {
  //Reset Progress
  if (playerData.level > 0) {
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
  DialogueData.dialoguesUsed = [];
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
  playerData.level += 1;
  player.HP = [player.maxHP[0], player.maxHP[1]];
  player.shield = [player.maxShield[0], player.maxShield[1]];
  player.playerLives = 3;
  player.setCompanions(Math.floor(playerData.level / 3));
  saveLocalStorage();
  weaponActivation.inicialize();
  dialogueList = [];
  DialogueData.dialoguesUsed = [];
  textIndex = NaN;
  levelTimer = 0;
  enemySpawnList = [];
  enemyList = [];
  lootCube.active = false;
  lootCube.nextSpawn = 1300;
  nextLevel();
}

function nextLevel() {
  if (playerData.level % 3 == 0) {
    gameAudio.stopMusic();
    gameAudio.playMusic("music_level_" + Math.floor(playerData.level / 3));
  }
  levels_handler.waveCounter = 1;
  levels_handler.level = levelLayout["level_" + playerData.level];
  levels_handler.levelCreator();
  spawn();
}
