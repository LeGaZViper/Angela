//spawner of enemies
async function spawn() {
  if (levelTimer == 0 && playerData.level != 11) {
    UI.levelDisplayCheck = true;
    if (playerData.level < 12)
      UI.levelDisplay.text =
        Math.floor(playerData.level / 3) + 1 + "-" + ((playerData.level % 3) + 1);
    else UI.levelDisplay.text = "??-??";
    for (let i = 1; i <= 400; i++) {
      if (i <= 100) {
        UI.levelDisplay.opacity = i / 100;
      } else if (i > 300 && i <= 370) {
        UI.levelDisplay.opacity = (370 - i) / 70;
      }
      await sleep(10);
    }
    UI.levelDisplayCheck = false;
  }
  if (levels_handler.level.startTime == undefined)
    setCallbackTimer(
      levels_handler.level["startTimeWave" + levels_handler.waveCounter],
      spawner,
      false
    );
  else setCallbackTimer(levels_handler.level.startTime, spawner, false);
}

function spawner() {
  if (enemySpawnList.length > 0) {
    enemyList.push(
      enemyCharacter({
        x: enemySpawnList[0].x * screenratio + player.earthX,
        y: enemySpawnList[0].y * screenratio + player.earthY,
        ...EnemyData[enemySpawnList[0].type],
      })
    );
    setCallbackTimer(enemySpawnList[0].spawnCD, spawner, false);
    enemySpawnList.splice(0, 1);
  }
}

let enemySpawnList = [];
var levels_handler = {
  waveCounter: 1,
  level: {},
  levelCreator: function () {
    for (index in this.level) {
      if (
        index != "waves" &&
        index != "startTime" &&
        this.level[index][3] == this.waveCounter
      ) {
        for (let i = 0; i < this.level[index][1]; i++) {
          let pos = generateRandomSpawnPos();
          enemySpawnList.push({
            x: pos[0],
            y: pos[1],
            type: this.level[index][0],
            spawnCD: this.level[index][2],
          });
        }
      }
    }
    this.level.total = enemySpawnList.length;
    enemySpawnList.sort(function () {
      return 0.5 - Math.random();
    });
  },
};

function generateRandomSpawnPos() {
  let detMatrix = [
    [-1, 0, 0, 1],
    [0, -1, 1, 0],
    [1, 0, 0, 1],
    [0, 1, 1, 0],
  ];
  let randomPosArray = detMatrix[Math.floor(Math.random() * 4)];
  let det_x =
    (randomPosArray[0] * player.spaceSize) / screenratio / 2 +
    randomPosArray[2] *
      (((Math.random() < 0.5 ? -1 : 1) * Math.random() * player.spaceSize) / screenratio / 2);

  let det_y =
    (randomPosArray[1] * player.spaceSize) / screenratio / 2 +
    randomPosArray[3] *
      (((Math.random() < 0.5 ? -1 : 1) * Math.random() * player.spaceSize) / 2);
  return [det_x, det_y];
}

let lootCube = {
  active: false,
  nextSpawn: 1300,
};

function spawnAnEnemy(enemy, x = -1, y = -1, orbitAngle = 2 * Math.PI * Math.random()) {
  let pos;
  if (x == -1 && y == -1) {
    pos = generateRandomSpawnPos();
  } else {
    pos = [x, y];
  }
  if (enemy == "lootCubeTarget") {
    let randomDistance = 3 * Math.random();
    enemyList.push(
      enemyCharacter({
        x: pos[0] * screenratio + player.earthX,
        y: pos[1] * screenratio + player.earthY,
        ...EnemyData[enemy],
        playerOrbitAngle: orbitAngle,
        defaultSpeed: (0.005 * Math.random() + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        distanceFromPlayerX: randomDistance + 2.5,
        distanceFromPlayerY: randomDistance + 2.5,
      })
    );
  } else {
    enemyList.push(
      enemyCharacter({
        x: pos[0] * screenratio + player.earthX,
        y: pos[1] * screenratio + player.earthY,
        ...EnemyData[enemy],
        playerOrbitAngle: orbitAngle,
      })
    );
  }
}

var levelLayout = {
  level_0: {
    // [type, number, spawnCD, wave]
    waves: 3,
    startTimeWave1: 30000,
    startTimeWave2: 100,
    startTimeWave3: 13000,

    miniArrow1: ["miniArrow", 5, 1000, 1],

    miniArrow2: ["miniArrow", 5, 1000, 2],
    cube1: ["cube", 3, 2000, 2],

    cube2: ["cube", 5, 2000, 3],
  },
  level_1: {
    waves: 3,
    startTimeWave1: 6000,
    startTimeWave2: 5000,
    startTimeWave3: 4500,

    cube1: ["cube", 8, 1000, 1],

    mail1: ["mail", 2, 2500, 2],
    cube2: ["cube", 5, 1000, 2],

    cube3: ["cube", 4, 1000, 3],
    mail2: ["mail", 3, 2500, 3],
  },
  level_2: {
    waves: 3,
    startTimeWave1: 10000,
    startTimeWave2: 2000,
    startTimeWave3: 6000,

    cube1: ["cube", 5, 1000, 1],
    mail1: ["mail", 2, 2500, 1],

    mail2: ["mail", 3, 2500, 2],
    icosphere1: ["icosphere", 5, 2000, 2],

    icosphere2: ["icosphere", 10, 2000, 3],
  },
  level_3: {
    waves: 3,
    startTimeWave1: 14000,
    startTimeWave2: 20000,
    startTimeWave3: 3000,

    cube1: ["cube", 5, 1000, 1],
    betaCube1: ["betaCube", 5, 2000, 1],

    cube2: ["cube", 6, 1000, 2],
    betaCube2: ["betaCube", 5, 2000, 2],
    watcher1: ["watcher", 2, 4000, 2],

    icosphere3: ["icosphere", 8, 1500, 3],
    betaCube3: ["betaCube", 8, 2000, 3],
    watcher2: ["watcher", 3, 4000, 3],
  },
  level_4: {
    waves: 3,
    startTimeWave1: 10000,
    startTimeWave2: 3000,
    startTimeWave3: 7000,

    betaMiniArrow1: ["betaMiniArrow", 8, 1000, 1],
    betaCube1: ["betaCube", 5, 2000, 1],
    watcher1: ["watcher", 5, 3500, 1],

    cube1: ["cube", 4, 500, 2],
    betaCube2: ["betaCube", 2, 2000, 2],
    betaMail1: ["betaMail", 3, 4000, 2],

    cube2: ["cube", 5, 500, 3],
    watcher2: ["watcher", 3, 3500, 3],
    icosphere1: ["icosphere", 5, 1500, 3],
    betaCube3: ["betaCube", 5, 2000, 3],
    mail1: ["mail", 2, 1000, 3],
    betaMail2: ["betaMail", 2, 4000, 3],
  },
  level_5: {
    waves: 3,
    startTimeWave1: 20000,
    startTimeWave2: 11000,
    startTimeWave3: 12000,

    cube1: ["cube", 5, 500, 1],
    betaCube1: ["betaCube", 4, 2000, 1],
    watcher1: ["watcher", 3, 3000, 1],

    betaCube2: ["betaCube", 8, 2000, 2],
    watcher2: ["watcher", 3, 3000, 2],

    icosphere: ["icosphere", 3, 1500, 3],
    betaCube3: ["betaCube", 7, 3],
    star1: ["star", 3, 3000, 3],
  },
  level_6: {
    waves: 3,
    startTimeWave1: 18000,
    startTimeWave2: 100,
    startTimeWave3: 9000,

    star1: ["star", 3, 3000, 1],
    betaCube1: ["betaCube", 8, 1500, 1],
    watcher1: ["watcher", 3, 1500, 1],

    betaIcosphere1: ["betaIcosphere", 3, 1500, 2],
    betaCube1: ["betaCube", 5, 1500, 2],
    watcher2: ["watcher", 1, 2500, 2],
    star2: ["star", 3, 3000, 2],

    betaIcosphere2: ["betaIcosphere", 6, 1500, 3],
    betaCube2: ["betaCube", 6, 1500, 3],
    cube1: ["cube", 6, 500, 3],
    icosphere1: ["icosphere", 6, 500, 3],
  },
  level_7: {
    waves: 3,
    startTimeWave1: 100,
    startTimeWave2: 17500,
    startTimeWave3: 10000,

    betaMail1: ["betaMail", 6, 1500, 1],
    watcher1: ["watcher", 2, 2000, 1],

    cube1: ["cube", 30, 500, 2],
    betaWatcher1: ["betaWatcher", 3, 3000, 2],

    betaCube1: ["betaCube", 4, 3],
    betaIcosphere1: ["betaIcosphere", 4, 3],
    star1: ["star", 3, 3],
    betaWatcher2: ["betaWatcher", 3, 3000, 3],
  },
  level_8: {
    waves: 3,
    startTimeWave1: 22000,
    startTimeWave2: 33000,
    startTimeWave3: 100,

    betaWatcher1: ["betaWatcher", 10, 4000, 1],

    betaIcosphere1: ["betaIcosphere", 7, 2000, 2],
    betaWatcher2: ["betaWatcher", 3, 3000, 2],
    betaStar1: ["betaStar", 3, 4000, 2],

    betaMail1: ["betaMail", 3, 3000, 3],
    betaStar2: ["betaStar", 3, 4000, 3],
    betaCube1: ["betaCube", 10, 2000, 3],
  },
  level_9: {
    waves: 3,
    startTimeWave1: 16000,
    startTimeWave2: 18000,
    startTimeWave3: 12500,

    betaWatcher1: ["betaWatcher", 5, 2500, 1],
    betaCube1: ["betaCube", 10, 1000, 1],
    betaMail1: ["betaMail", 3, 1500, 1],
    betaIcosphere1: ["betaIcosphere", 6, 1000, 1],

    carrier1: ["carrier", 2, 300, 2],
    betaCube2: ["betaCube", 10, 1000, 2],
    betaIcosphere2: ["betaIcosphere", 10, 1000, 2],

    carrier2: ["carrier", 3, 300, 3],
    betaMail2: ["betaMail", 6, 1500, 3],
    betaCube3: ["betaCube", 10, 1000, 3],
    betaStar1: ["betaStar", 5, 1500, 3],
  },
  level_10: {
    waves: 3,
    startTimeWave1: 12000,
    startTimeWave2: 11500,
    startTimeWave3: 9000,

    carrier1: ["carrier", 5, 3000, 1],
    betaCube1: ["betaCube", 20, 1000, 1],
    betaIcosphere1: ["betaIcosphere", 5, 1000, 1],

    betaCarrier1: ["betaCarrier", 2, 3000, 2],
    betaCube2: ["betaCube", 5, 1000, 2],
    carrier2: ["carrier", 4, 3000, 2],

    betaIcosphere2: ["betaIcosphere", 5, 1000, 3],
    betaStar1: ["betaStar", 5, 2000, 3],
    betaCarrier2: ["betaCarrier", 5, 3000, 3],
  },
  level_11: {
    waves: 1,
    startTime: 100000,
    cube1: ["cube", 1, 1, 1],
  },
  level_12: {
    waves: 3,
    startTimeWave1: 12500,
    startTimeWave2: 3000,
    startTimeWave3: 3000,

    angela1: ["angela_phase1", 1, 1, 1],
    angela2: ["angela_phase2", 1, 1, 2],
    angela3: ["angela_phase3", 1, 1, 3],
  },
  level_13: {
    waves: 15,
    startTimeWave1: 11500, //
    startTimeWave2: 5000, //
    startTimeWave3: 5000, //
    startTimeWave4: 100,
    startTimeWave5: 100,
    startTimeWave6: 9000, //
    startTimeWave7: 100,
    startTimeWave8: 100,
    startTimeWave9: 100,
    startTimeWave10: 100,
    startTimeWave11: 3000, //
    startTimeWave12: 100,
    startTimeWave13: 100,
    startTimeWave14: 100,
    startTimeWave15: 6000, //

    miniArrow1: ["miniArrow", 5, 200, 1],
    betaMiniArrow1: ["betaMiniArrow", 5, 200, 2],
    cube1: ["cube", 20, 500, 3],
    betaCube1: ["betaCube", 20, 500, 4],
    icosphere1: ["icosphere", 20, 500, 5],
    betaIcosphere1: ["betaIcosphere", 20, 500, 6],
    mail1: ["mail", 10, 500, 7],
    betaMail1: ["betaMail", 10, 500, 8],
    watcher1: ["watcher", 10, 1000, 9],
    betaWatcher1: ["betaWatcher", 10, 1000, 10],
    star1: ["star", 15, 3000, 11],
    betaStar1: ["betaStar", 15, 3000, 12],
    carrier1: ["carrier", 15, 5000, 13],
    betaCarrier1: ["betaCarrier", 15, 5000, 14],
    corruptedCloud1: ["corruptedCloud", 10, 1000, 15],
  },
};

var savedTimer = 0;
function levelEffectsHandler() {
  if (playerData.level > 4 && playerData.level < 12 && levelTimer == 1) {
    backgroundParticles.fan1.sprite = sprite.UI_motherboardFanRed;
    backgroundParticles.fan2.sprite = sprite.UI_motherboardFanRed;
  }
  if (playerData.level == 10) {
    if (levels_handler.waveCounter == 2 && savedTimer == 0) {
      savedTimer = levelTimer;
    } else if (savedTimer + 420 == levelTimer && savedTimer != 0) {
      Dialogue.stopDialogues = true;
      environment.angelaJumpscare1.activated = true;
      gameAudio.playSound("angelaJumpscare1");
    }
  } else if (playerData.level == 11) {
    if (levelTimer == 1) {
      backgroundParticles.angelaCorrupted.visible = true;
      backgroundParticles.angela.visible = false;
    } else if (levelTimer == 2200) {
      environment.angelaJumpscare2.activated = true;
      gameAudio.playSound("angelaJumpscare2");
    } else if (levelTimer == 2230) {
      levelTimer++;
      gameAudio.stopMusic();
      if (!gameAudio.gameAudioFiles.player_LASER_loop.paused) {
        gameAudio.gameAudioFiles.player_LASER_loop.pause();
        player.LASER_firing = false;
      }
      saveLocalStorage();
      player.inWeaponActivation = false;
      textIndex = NaN;
      DialogueData.dialoguesUsed = [];
      player.inicialize(0, 50);
      camera.inicialize();
      background.inicialize();
      backgroundParticles.inicialize();
      environment.inicialize();
      getMenu(5);
    }
  } else if (playerData.level == 12) {
    if (levelTimer == 1) {
      environment.light.opacity = 1;
      backgroundParticles.hole.visible = true;
      backgroundParticles.angela.visible = false;
    } else if (levelTimer == 1000) {
      gameAudio.stopMusic();
      gameAudio.playMusic("music_level_4_2");
      gameAudio.currentMusic.currentTime = 3.1;
    }
  } else if (playerData.level == 13) {
    if (levelTimer == 1) {
      backgroundParticles.angelaCorrupted.visible = true;
      backgroundParticles.angela.visible = false;
    } else if (levels_handler.waveCounter == 3 && gameAudio.currentMusic.paused) {
      gameAudio.playMusic("music_level_5");
    } else if (levels_handler.waveCounter == 15) {
      gameAudio.stopMusic();
    }
  }
}
