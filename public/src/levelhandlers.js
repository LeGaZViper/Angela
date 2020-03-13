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
    enemyList.push(enemyCharacter(enemySpawnList[i]));
    await sleep(enemySpawnList[i].spawnCD);
  }
}

let enemySpawnList = [];
var levels_handler = {
  level: {},
  levelCreator: function() {
    this.level = levelLayout({});
    for (index in this.level) {
      for (let i = 0; i < this.level[index][0]; i++) {
        enemySpawnList.push(enemyDatabase[index]);
        let det_x = Math.floor(Math.random() * 4);
        let det_y;
        let randomDrop;
        if (det_x == 0) {
          det_x = player.earthX - player.spaceSize / 2;
          det_y =
            player.earthY +
            ((Math.random() < 0.5 ? -1 : 1) *
              Math.random() *
              player.spaceSize) /
              2;
        } else if (det_x == 1) {
          det_x =
            player.earthX +
            ((Math.random() < 0.5 ? -1 : 1) *
              Math.random() *
              player.spaceSize) /
              2;
          det_y = player.earthY - player.spaceSize / 2;
        } else if (det_x == 2) {
          det_x = player.earthX + player.spaceSize / 2;
          det_y =
            player.earthY +
            ((Math.random() < 0.5 ? -1 : 1) *
              Math.random() *
              player.spaceSize) /
              2;
        } else {
          det_x =
            player.earthX +
            ((Math.random() < 0.5 ? -1 : 1) *
              Math.random() *
              player.spaceSize) /
              2;
          det_y = player.earthY + player.spaceSize / 2;
        }
        if (Math.round(Math.random() * 10) == 1) randomDrop = true;
        else randomDrop = false;
        enemySpawnList[i].x = det_x;
        enemySpawnList[i].y = det_y;
        enemySpawnList[i].randomDrop = randomDrop;
        enemySpawnList[i].spawnCD = this.level[index][1];
      }
    }
    this.level.total = enemySpawnList.length;
    return enemySpawnList.sort(function() {
      return 0.5 - Math.random();
    });
  }
};

function levelLayout(L) {
  if (ship.section == 1) {
    //  L.pirateRaider = [25 + ship.level, 500];
    //   L.pirateTiger = [25 + ship.level, 1000];
    L.test = [1, 1];
    if (ship.level > 2) {
      L.pirateMinedropper = [25 + ship.level, 1000];
    }
    if (ship.level > 4) {
      L.pirateVessel = [3 + (ship.level - 1) * 2, 5000];
    }
  } else if (ship.section == 2) {
    L.voidDrone = [40 + ship.level * 2, 250];
    L.voidChaser = [10 + ship.level, 500];
    if (ship.level > 4) {
      L.voidSpherefighter = [5 + ship.level, 1000];
    }
  }
  return L;
}
