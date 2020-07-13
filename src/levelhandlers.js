//spawner of enemies
async function spawn() {
  if (levelTimer == 0) {
    UI.levelDisplay.text =
      Math.floor(ship.level / 3) + 1 + "-" + ((ship.level % 3) + 1);
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

function levelLayout(L) {
  if (ship.level == 0) {
    // type, number, spawnCD, wave
    L.waves = 3;
    L.startTime = 13000;
    L.miniArrow1 = ["miniArrow", 5, 1000, 1];

    L.miniArrow2 = ["miniArrow", 5, 1000, 2];
    L.cube1 = ["cube", 3, 2000, 2];

    L.cube2 = ["cube", 5, 2000, 3];
  } else if (ship.level == 1) {
    L.waves = 3;
    L.startTime = 6000;
    L.cube1 = ["cube", 8, 1000, 1];

    L.mail1 = ["mail", 2, 2500, 2];
    L.cube2 = ["cube", 5, 1000, 2];

    L.cube3 = ["cube", 4, 1000, 3];
    L.mail2 = ["mail", 3, 2500, 3];
  } else if (ship.level == 2) {
    L.waves = 3;
    L.startTime = 3000;
    L.cube1 = ["cube", 5, 1000, 1];
    L.mail1 = ["mail", 2, 2500, 1];

    L.mail2 = ["mail", 3, 2500, 1];
    L.icosphere1 = ["icosphere", 5, 2000, 2];

    L.icosphere2 = ["icosphere", 10, 2000, 3];
  }
  //L.test = [5, 1];
  return L;
}
