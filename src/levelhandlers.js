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
  },
};
