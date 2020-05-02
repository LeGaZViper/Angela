//spawner of enemies
async function spawn() {
  UI.levelDisplay.text = ship.section + "-" + ship.level;
  for (let i = 1; i <= 400; i++) {
    if (i <= 100) {
      UI.levelDisplay.opacity = i / 100;
    } else if (i > 300 && i <= 370) {
      UI.levelDisplay.opacity = (370 - i) / 70;
    }
    await sleep(10);
  }

  UI.levelDisplayCheck = false;
  for (let i = 0; i < enemySpawnList.length; i++) {
    enemyList.push(
      enemyCharacter({
        x: enemySpawnList[i].x * screenratio + player.earthX,
        y: enemySpawnList[i].y * screenratio + player.earthY,
        randomDrop: enemySpawnList[i].randromDrop,
        spawnCD: enemySpawnList[i].spawnCD,
        ...enemyDatabase[enemySpawnList[i].type],
      })
    );
    await sleep(enemySpawnList[i].spawnCD);
  }
}

let enemySpawnList = [];
var levels_handler = {
  level: {},
  levelCreator: function () {
    this.level = levelLayout({});
    let detMatrix = [
      [-1, 0, 0, 1],
      [0, -1, 1, 0],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ];
    for (index in this.level) {
      for (let i = 0; i < this.level[index][0]; i++) {
        let randomPosArray = detMatrix[Math.floor(Math.random() * 4)];
        let det_x =
          (randomPosArray[0] * player.spaceSize) / screenratio / 2 +
          randomPosArray[2] *
            (((Math.random() < 0.5 ? -1 : 1) *
              Math.random() *
              player.spaceSize) /
              screenratio /
              2);

        let det_y =
          (randomPosArray[1] * player.spaceSize) / screenratio / 2 +
          randomPosArray[3] *
            (((Math.random() < 0.5 ? -1 : 1) *
              Math.random() *
              player.spaceSize) /
              2);
        let randomDrop;
        if (Math.round(Math.random() * 1) == 1) randomDrop = true;
        else randomDrop = false;
        enemySpawnList.push({
          x: det_x,
          y: det_y,
          type: index,
          randromDrop: randomDrop,
          spawnCD: this.level[index][1],
        });
      }
    }
    this.level.total = enemySpawnList.length;
    enemySpawnList.sort(function () {
      return 0.5 - Math.random();
    });
  },
};

function levelLayout(L) {
  if (ship.section == 1) {
    //L.smallCube = [5 + ship.level, 1];
    L.largeCube = [1 + ship.level, 1];
    //L.test = [5, 1];
  }
  return L;
}
