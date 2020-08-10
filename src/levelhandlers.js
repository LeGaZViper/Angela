//spawner of enemies
async function spawn() {
  if (levelTimer == 0 && playerData.level != 11) {
    UI.levelDisplayCheck = true;
    if (playerData.level > 12)
      UI.levelDisplay.text =
        Math.floor(playerData.level / 3) +
        1 +
        "-" +
        ((playerData.level % 3) + 1);
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
    await sleep(levels_handler.level.startTime);
  }
  for (let i = 0; i < enemySpawnList.length; i++) {
    if (enemySpawnList.length == 0) break;

    enemyList.push(
      enemyCharacter({
        x: enemySpawnList[i].x * screenratio + player.earthX,
        y: enemySpawnList[i].y * screenratio + player.earthY,
        ...EnemyData[enemySpawnList[i].type],
      })
    );
    await sleep(enemySpawnList[i].spawnCD);
  }
  enemySpawnList = [];
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
      (((Math.random() < 0.5 ? -1 : 1) * Math.random() * player.spaceSize) /
        screenratio /
        2);

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
function spawnAnEnemy(enemy) {
  let pos = generateRandomSpawnPos();
  enemyList.push(
    enemyCharacter({
      x: pos[0] * screenratio + player.earthX,
      y: pos[1] * screenratio + player.earthY,
      ...EnemyData[enemy],
    })
  );
}

var levelLayout = {
  level_0: {
    // [type, number, spawnCD, wave]
    waves: 3,
    startTime: 13000,
    miniArrow1: ["miniArrow", 5, 1000, 1],

    miniArrow2: ["miniArrow", 5, 1000, 2],
    cube1: ["cube", 3, 2000, 2],

    cube2: ["cube", 5, 2000, 3],
  },
  level_1: {
    waves: 3,
    startTime: 6000,
    cube1: ["cube", 8, 1000, 1],

    mail1: ["mail", 2, 2500, 2],
    cube2: ["cube", 5, 1000, 2],

    cube3: ["cube", 4, 1000, 3],
    mail2: ["mail", 3, 2500, 3],
  },
  level_2: {
    waves: 3,
    startTime: 3000,
    cube1: ["cube", 5, 1000, 1],
    mail1: ["mail", 2, 2500, 1],

    mail2: ["mail", 3, 2500, 1],
    icosphere1: ["icosphere", 5, 2000, 2],

    icosphere2: ["icosphere", 10, 2000, 3],
  },
  level_3: {
    waves: 3,
    startTime: 3000,
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
    startTime: 6000,
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
    startTime: 8000,
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
    startTime: 8000,
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
    startTime: 100,
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
    startTime: 3000,
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
    startTime: 3000,
    betaWatcher1: ["betaWatcher", 5, 2500, 1],
    betaCube1: ["betaCube", 15, 1000, 1],
    betaMail1: ["betaMail", 3, 1500, 1],
    betaIcosphere1: ["betaIcosphere", 6, 1000, 1],

    carrier1: ["carrier", 5, 2500, 2],
    betaCube2: ["betaCube", 10, 1000, 2],
    betaIcosphere2: ["betaIcosphere", 10, 1000, 2],

    carrier2: ["carrier", 6, 2500, 3],
    betaMail2: ["betaMail", 6, 1500, 3],
    betaCube3: ["betaCube", 10, 1000, 3],
    betaStar1: ["betaStar", 5, 1500, 3],
  },
  level_10: {
    waves: 3,
    startTime: 3000,
    carrier1: ["carrier", 5, 2000, 1],
    betaCube1: ["betaCube", 20, 1000, 1],
    betaIcosphere: ["betaIcosphere", 5, 1000, 1],

    corruptedCloud1: ["corruptedCloud", 5, 2000, 2],
    betaCube2: ["betaCube", 5, 1500, 2],
    carrier2: ["carrier", 3, 2000, 2],

    corruptedCloud2: ["corruptedCloud", 20, 1000, 3],
  },
  level_11: {
    waves: 1,
    startTime: 10000,
    cube1: ["cube", 1, 1, 1],
  },
  level_12: {
    waves: 3,
    startTime: 10,
    angela: ["angela_phase2", 1, 1, 1],
    cube2: ["cube", 1, 1, 2],
    cube3: ["cube", 1, 1, 3],
  },
};

function lastLevelHandler() {
  if (playerData.level == 11) {
    backgroundParticles.angelaCorrupted.visible = true;
    backgroundParticles.angela.visible = false;
    if (levelTimer == 2170) {
      environment.angelaJumpscare.activated = true;
      //gameAudio.playSound("angelaJumpscare");
    } else if (levelTimer == 2200) {
      levelTimer++;
      gameAudio.stopMusic();
      if (!gameAudio.player_LASER_loop.paused) {
        gameAudio.player_LASER_loop.pause();
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
    backgroundParticles.angelaCorrupted.visible = true;
    backgroundParticles.angela.visible = false;
    if (levelTimer == 1) gameAudio.playMusic("music_level_4");
    if (levelTimer == 1000) {
      gameAudio.stopMusic();
      gameAudio.playMusic("music_level_4_2");
      gameAudio.currentMusic.currentTime = 3.4;
    }
  }
}
