var camera = {
  inicialize: function () {
    this.x = 0;
    this.y = 0;
    this.offSetX = 0;
    this.offSetY = 0;
    this.offSetXNew = 0;
    this.offSetYNew = 0;
    this.offSetXOld = 0;
    this.offSetYOld = 0;
  },
  update: function () {
    let point = Math.atan2(
      yMousePos - canvas.height / 2,
      xMousePos - canvas.width / 2
    );
    let distance =
      2 *
      Math.sqrt(
        Math.pow(xMousePos - canvas.width / 2, 2) +
          Math.pow(yMousePos - canvas.height / 2, 2)
      );
    this.x = distance * Math.cos(point) + canvas.width / 2;
    this.y = distance * Math.sin(point) + canvas.height / 2;
    this.offSetXNew = this.x - canvas.width / 2;
    this.offSetYNew = this.y - canvas.height / 2;
  },
  check: function () {
    this.offSetX =
      (Math.round((this.offSetXNew - this.offSetXOld) * 10) / 50) * screenratio;
    this.offSetXOld = this.offSetXNew;
    this.offSetY =
      (Math.round((this.offSetYNew - this.offSetYOld) * 10) / 50) * screenratio;
    this.offSetYOld = this.offSetYNew;
  },
};

//player object
var ship;
var player = {
  inicialize: (starterX, starterY) => {
    // in order to change player default pos one needs to change player.coord, player.earth, player.future accordingly
    player.shipLives = 3;
    player.starterPosX = starterX * screenratio;
    player.starterPosY = starterY * screenratio;
    player.spaceSize = 4000 * screenratio;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.coordX = player.spaceSize / 2 + player.starterPosX;
    player.coordY = player.spaceSize / 2 + player.starterPosY;
    player.earthX = canvas.width / 2 - player.starterPosX;
    player.earthY = canvas.height / 2 - player.starterPosY;
    player.futureX = player.starterPosX;
    player.futureY = player.starterPosY;
    player.accelerationX = 0;
    player.accelerationY = 0;
    player.speed = 0;
    player.xspeed = 0;
    player.yspeed = 0;
    player.width = ship.width * screenratio;
    player.height = ship.height * screenratio;
    player.widthOnPic = ship.widthOnPic;
    player.heightOnPic = ship.heightOnPic;
    player.animationX = 0;
    player.animationY = 0;
    //0 = Earth, 1 = Ship
    player.maxHP = ship.maxHP;
    player.HP = [player.maxHP[0], player.maxHP[1]];
    player.maxShield = ship.maxShield;
    player.shield = [ship.maxShield[0], ship.maxShield[1]];
    player.angle = 0;

    player.hitBoxWidth = (player.width / 3) * 2;
    player.hitBoxHeight = (player.height / 3) * 2;
    player.hitBoxX = player.x - player.hitBoxWidth / 2;
    player.hitBoxY = player.y - player.hitBoxHeight / 2;
    player.animationX = 0;
    player.animationIndex = 0;
    player.animationFrames = 9;
    player.animationFPS = 5;
    player.sprite = sprite.player_scout;

    player.weapon = WeaponData.BASIC;
    player.weaponDuration = 0;
    player.inWeaponActivation = false;
    player.companions = ship.companions;
    player.companionsX = [0, 0, 0];
    player.companionsY = [0, 0, 0];
    player.companionsIndex = [
      0,
      360 / player.companions,
      (2 * 360) / player.companions,
    ];
    player.shieldCD = [0, 0];
    player.attackCD = false;
    player.hitCD = false;
    player.collisionCD = false;
    player.killedCD = false;
    player.opacity = [1, 1];
    player.damageOpacity = [0, 0];
  },
  update: () => {
    //speed calculation
    let distance = Math.sqrt(
      Math.pow(xMousePos - canvas.width / 2, 2) +
        Math.pow(yMousePos - canvas.height / 2, 2)
    );
    player.shieldRecharge();

    if (distance < 250 * screenratio && !rightMouseDown) {
      if (player.accelerationX > 0) {
        player.accelerationX -= 1;
      }
      if (player.accelerationY > 0) {
        player.accelerationY -= 1;
      }
    } else if (distance >= 250 && distance <= 300 && !rightMouseDown) {
      if (player.accelerationX < 100) {
        player.accelerationX += 1;
      }
      if (player.accelerationY < 100) {
        player.accelerationY += 1;
      }
    } else if (!rightMouseDown) {
      if (player.accelerationX < 100) {
        player.accelerationX += 2;
      }
      if (player.accelerationY < 100) {
        player.accelerationY += 2;
      }
    }
    if (player.accelerationX > 100) player.accelerationX = 100;
    if (player.accelerationY > 100) player.accelerationY = 100;

    player.speed = ship.speed * screenratio;
    if (!rightMouseDown) {
      player.ratio =
        player.speed /
        (Math.abs(xMousePos - canvas.width / 2) +
          Math.abs(yMousePos - canvas.height / 2));
      player.lastRatioX = xMousePos - player.x;
      player.lastRatioY = yMousePos - player.y;
    }
    player.targetxspeed =
      (player.ratio * player.lastRatioX * player.accelerationX) / 100;
    player.targetyspeed =
      (player.ratio * player.lastRatioY * player.accelerationY) / 100;
    if (player.HP[0] <= 0 || player.shipLives == 0) {
      player.speed = 0;
      player.xspeed = 0;
      player.yspeed = 0;
      loseTheGame();
    } else if (player.HP[1] <= 0 && !player.killedCD) {
      player.killedCD = true;
      player.killedCDstart();
    } else if (!isNaN(player.ratio)) {
      //player positioner
      if (
        Math.abs(player.xspeed) >= Math.abs(player.targetxspeed) &&
        (player.xspeed >= 0 ? 1 : -1) == (player.targetxspeed >= 0 ? 1 : -1)
      ) {
        player.xspeed = player.targetxspeed;
      } else {
        player.xspeed +=
          0.3 *
          (player.targetxspeed >= 0 ? 1 : -1) *
          (player.accelerationX / 100);
      }
      if (
        Math.abs(player.yspeed) >= Math.abs(player.targetyspeed) &&
        (player.yspeed >= 0 ? 1 : -1) == (player.targetyspeed >= 0 ? 1 : -1)
      ) {
        player.yspeed = player.targetyspeed;
      } else {
        player.yspeed +=
          0.3 *
          (player.targetyspeed >= 0 ? 1 : -1) *
          (player.accelerationY / 100);
      }

      player.futureX += player.xspeed;
      player.futureY += player.yspeed;
      if (
        Math.abs(player.futureX) < player.spaceSize / 2 &&
        Math.abs(player.futureY) < player.spaceSize / 2
      ) {
        player.coordX += player.xspeed;
        player.coordY += player.yspeed;
        player.hitBoxWidth = Math.abs(
          (player.width / 3) * 2 * Math.pow(Math.cos(player.angle), 2) +
            (player.height / 3) * 2 * Math.pow(Math.sin(player.angle), 2)
        );
        player.hitBoxHeight = Math.abs(
          (player.width / 3) * 2 * Math.pow(Math.sin(player.angle), 2) +
            (player.height / 3) * 2 * Math.pow(Math.cos(player.angle), 2)
        );
        player.hitBoxX = player.x - player.hitBoxWidth / 2;
        player.hitBoxY = player.y - player.hitBoxHeight / 2;
        player.earthX -= player.xspeed;
        player.earthY -= player.yspeed;
      } else {
        player.futureX -= player.xspeed;
        player.futureY -= player.yspeed;
        player.speed = 0;
        player.xspeed = 0;
        player.yspeed = 0;
      }
    }
    player.earthX -= camera.offSetX;
    player.earthY -= camera.offSetY;
    player.x -= camera.offSetX;
    player.y -= camera.offSetY;

    player.companionsIndex.forEach((_random, i) => {
      player.companionsIndex[i]++;
      if (player.companionsIndex[i] == 360) player.companionsIndex[i] = 0;
    });

    for (let i = 0; i < player.companions; i++) {
      player.companionsX[i] =
        player.x +
        50 *
          screenratio *
          Math.cos((player.companionsIndex[i] / 180) * Math.PI);
      player.companionsY[i] =
        player.y +
        50 *
          screenratio *
          Math.sin((player.companionsIndex[i] / 180) * Math.PI);
    }
  },
  render: () => {
    player.animationIndex += 1;
    let nextIndex = Math.round(
      60 / ((60 * (player.accelerationX + player.accelerationY)) / 200)
    );

    if (nextIndex == 0) nextIndex = 1;
    if (nextIndex == Infinity) nextIndex = 60 / player.animationFPS;

    if (player.animationIndex == nextIndex) {
      player.animationIndex = 0;
      if (player.animationX < player.widthOnPic * (player.animationFrames - 1))
        player.animationX += player.widthOnPic;
      else player.animationX = 0;
    }
    if (player.animationIndex > nextIndex) player.animationIndex = 0;

    ctx.beginPath();
    ctx.save();
    ctx.translate(player.x, player.y);
    player.angle =
      Math.atan2(yMousePos - player.y, xMousePos - player.x) + Math.PI / 2;
    ctx.rotate(player.angle);
    ctx.globalAlpha = player.opacity[1] - player.damageOpacity[1];
    ctx.drawImage(
      player.sprite,
      player.animationX,
      0,
      player.widthOnPic,
      player.heightOnPic,
      -player.width / 2,
      -player.height / 2,
      player.width,
      player.height
    );
    //Damaged Scout #RED
    if (player.HP[1] > 0) {
      ctx.globalAlpha = player.damageOpacity[1];
      ctx.drawImage(
        player.sprite,
        player.animationX,
        player.heightOnPic,
        player.widthOnPic,
        player.heightOnPic,
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
      );
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    for (let i = 0; i < player.companions; i++) {
      ctx.save();
      ctx.translate(player.companionsX[i], player.companionsY[i]);
      ctx.rotate(player.angle);
      ctx.drawImage(sprite.player_companion, 0, 0, 30, 30, -15, -15, 30, 30);
      ctx.restore();
    }
    ctx.stroke();
    ctx.closePath();
  },
  attackCDstart: async function () {
    player.attackCD = true;
    await sleep(player.weapon.cooldown);
    player.attackCD = false;
  },
  hitCDstart: async function (playerEntity, event) {
    if (playerEntity == 1) player.shieldCD[1] = 300;
    else player.shieldCD[0] = 300;
    player.damageOpacity[playerEntity] = 101 / 100;
    for (let i = 100; i >= 0; i--) {
      if (playerEntity == 1 && event == "bullet" && i == 50)
        player.hitCD = false;
      if (player.damageOpacity[playerEntity] == (i + 1) / 100) {
        player.damageOpacity[playerEntity] = i / 100;
        await sleep(1);
      } else break;
    }
    if (playerEntity == 1 && event == "bullet") player.hitCD = false;
    else if (playerEntity == 1 && event == "collision")
      player.collisionCD = false;
  },
  shieldRecharge: function () {
    if (player.shieldCD[0] > 0) {
      player.shieldCD[0]--;
    } else if (player.shield[0] < player.maxShield[0]) {
      player.shieldCD[0] = 12;
      player.shield[0] += 1;
    }
    if (player.shieldCD[1] > 0) {
      player.shieldCD[1]--;
    } else if (player.shield[1] < player.maxShield[1]) {
      player.shieldCD[1] = 6;
      player.shield[1] += 1;
    }
  },
  killedCDstart: async function () {
    player.shipLives--;
    player.opacity[1] = 0.5;
    await sleep(5000);
    player.HP[1] = player.maxHP[1];
    player.opacity[1] = 1;
    player.killedCD = false;
    player.collisionCD = false;
  },
  setCompanions: function (c) {
    player.companions = c;
    player.companionsIndex = [0, 360 / c, (2 * 360) / c];
  },
};
