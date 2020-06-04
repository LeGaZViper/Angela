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
var playerList = [];
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
    //particle parameters
    //0 = heightOnPic, 1 = yDistanceFromShip, 2 = heightOnCanvas, 3 = particlesX add, 4 = particlesY add
    player.particles = ship.particles;
    player.particlesWidth = 1;
    player.particlesHeight = 0.2;

    player.hitBoxWidth = (player.width / 3) * 2;
    player.hitBoxHeight = (player.height / 3) * 2;
    player.hitBoxX = player.x - player.hitBoxWidth / 2;
    player.hitBoxY = player.y - player.hitBoxHeight / 2;
    player.animationX = 0;
    player.animationIndex = 0;
    player.animationFrames = 9;
    player.animationFPS = 5;
    if (host || !multiplayer)
      player.sprite = sprite["player_" + ship.name.toLowerCase()];
    else player.sprite = sprite.player_scout2;

    player.leftMouseDown = false;
    player.weapon = WeaponData.BASIC;
    player.weaponDuration = 0;
    player.inWeaponActivation = false;
    player.companions = ship.companions;
    player.companionsX = [0, 0, 0];
    player.companionsY = [0, 0, 0];
    if (player.companions == 1) player.companionsIndex = [0, 0, 0];
    else if (player.companions == 2) player.companionsIndex = [0, 180, 0];
    else player.companionsIndex = [0, 120, 240];
  },
  update: () => {
    //speed calculation
    let distance = Math.sqrt(
      Math.pow(xMousePos - canvas.width / 2, 2) +
        Math.pow(yMousePos - canvas.height / 2, 2)
    );
    player.shieldRecharge();

    if (!rightMouseDown) {
      var speedIndexX = xMousePos - player.x > 0 ? 1 : -1;
      var speedIndexY = yMousePos - player.y > 0 ? 1 : -1;
    }
    if (distance < 150 * screenratio && !rightMouseDown) {
      if (player.accelerationX > 0) {
        player.accelerationX += -1;
      } else if (player.accelerationX < 0) {
        player.accelerationX += 1;
      }
      if (player.accelerationY > 0) {
        player.accelerationY += -1;
      } else if (player.accelerationY < 0) {
        player.accelerationY += 1;
      }
    } else if (
      distance >= 150 * screenratio &&
      distance <= 200 * screenratio &&
      !rightMouseDown
    ) {
      if (player.accelerationX * speedIndexX < 48)
        player.accelerationX += 2 * speedIndexX;
      else player.accelerationX = 50 * speedIndexX;
      if (player.accelerationY * speedIndexY < 48)
        player.accelerationY += 2 * speedIndexY;
      else player.accelerationY = 50 * speedIndexY;
    } else if (!rightMouseDown) {
      if (player.accelerationX * speedIndexX < 95)
        player.accelerationX += 5 * speedIndexX;
      else player.accelerationX = 100 * speedIndexX;
      if (player.accelerationY * speedIndexY < 95)
        player.accelerationY += 5 * speedIndexY;
      else player.accelerationY = 100 * speedIndexY;
    } else {
      if (player.accelerationX > 0) {
        player.accelerationX -= 0.5;
      } else if (player.accelerationX < 0) {
        player.accelerationX += 0.5;
      }
      if (player.accelerationY > 0) {
        player.accelerationY -= 0.5;
      } else if (player.accelerationY < 0) {
        player.accelerationY += 0.5;
      }
    }
    player.speed = ship.speed * screenratio;
    let ratio =
      player.speed /
      (Math.abs(xMousePos - canvas.width / 2) +
        Math.abs(yMousePos - canvas.height / 2));
    if (player.HP[0] <= 0 || player.shipLives == 0) {
      player.speed = 0;
      player.xspeed = 0;
      player.yspeed = 0;
      if (multiplayer) loseMultiplayerGame();
      loseTheGame();
    } else if (player.HP[1] <= 0 && !player.killedCD) {
      player.killedCDstart();
    } else if (!isNaN(ratio)) {
      //player positioner
      if (!rightMouseDown) {
        player.previousDirX = Math.abs(ratio * (xMousePos - player.x));
        player.previousDirY = Math.abs(ratio * (yMousePos - player.y));
      }
      player.xspeed = (player.previousDirX * player.accelerationX) / 100;
      player.yspeed = (player.previousDirY * player.accelerationY) / 100;
      player.futureX += player.xspeed;
      player.futureY += player.yspeed;
      if (
        Math.abs(player.futureX) < player.spaceSize / 2 &&
        Math.abs(player.futureY) < player.spaceSize / 2
      ) {
        player.coordX += player.xspeed;
        player.coordY += player.yspeed;
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
        player.accelerationX = 0;
        player.accelerationY = 0;
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
    let nextIndex = Math.floor(
      60 /
        (player.animationFPS +
          (Math.abs(player.xspeed) + Math.abs(player.yspeed)) * 3)
    );
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
        player.heightOnPic, //+ player.particles[0],
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

  shieldCD: [0, 0],
  attackCD: false,
  hitCD: false,
  collisionCD: false,
  killedCD: false,
  opacity: [1, 1],
  damageOpacity: [0, 0],
  blikacky: false,
  attackCDstart: async function () {
    player.attackCD = true;
    await sleep(player.weapon.cooldown);
    player.attackCD = false;
  },
  hitCDstart: async function (which, what) {
    if (which == 1) player.shieldCD[1] = 300;
    else player.shieldCD[0] = 300;
    player.damageOpacity[which] = 101 / 100;
    for (let i = 100; i >= 0; i--) {
      if (player.damageOpacity[which] == (i + 1) / 100) {
        player.damageOpacity[which] = i / 100;
        await sleep(5);
      } else break;
    }
    if (which == 1 && what == "bullet") player.hitCD = false;
    else if (which == 1 && what == "collision") player.collisionCD = false;
  },
  shieldRecharge: function () {
    if (player.shieldCD[0] > 0) {
      player.shieldCD[0]--;
    } else if (player.shield[0] < player.maxShield[0]) {
      player.shieldCD[0] = 120;
      player.shield[0] += 1;
    }
    if (player.shieldCD[1] > 0) {
      player.shieldCD[1]--;
    } else if (player.shield[1] < player.maxShield[1]) {
      player.shieldCD[1] = 60;
      player.shield[1] += 1;
    }
  },
  killedCDstart: async function () {
    player.shipLives--;
    player.opacity[1] = 0.5;
    player.killedCD = true;
    await sleep(5000);
    player.HP[1] = player.maxHP[1];
    player.opacity[1] = 1;
    player.killedCD = false;
    player.collisionCD = false;
  },
};

var player2 = {
  inicialize: function () {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.xspeed = 0;
    this.yspeed = 0;
    this.speed = 0;
    this.angle = 0;
    this.widthOnPic = ship.widthOnPic;
    this.heightOnPic = ship.heightOnPic;
    this.width = ship.width * screenratio;
    this.height = ship.height * screenratio;
    this.particles = ship.particles;
    this.particlesWidth = 1;
    this.particlesHeight = 0.2;
    this.leftMouseDown = false;
    this.weapon = WeaponData.BASIC;
    this.maxHP = ship.maxHP;
    this.HP = [this.maxHP[0], this.maxHP[1]];
    this.attackCD = false;
    if (host) this.sprite = sprite.player_scout2;
    else this.sprite = sprite.player_scout;
  },
  update: function () {
    this.x += this.xspeed - player.xspeed - camera.offSetX;
    this.y += this.yspeed - player.yspeed - camera.offSetY;
    this.particlesHeight = this.speed / 10 + 0.1;
  },
  render: function () {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.sprite,
      0,
      this.heightOnPic,
      this.widthOnPic,
      this.particles[0],
      (-this.width / 2) * this.particlesWidth,
      this.height / 2 - this.particles[1] * screenratio,
      this.width * this.particlesWidth,
      this.particles[2] * screenratio * this.particlesHeight
    );
    ctx.drawImage(
      this.sprite,
      0,
      0,
      this.widthOnPic,
      this.heightOnPic,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    ctx.restore();
    ctx.closePath();
  },
  attackCDstart: async function () {
    this.attackCD = true;
    await sleep(this.weapon.cooldown);
    this.attackCD = false;
  },
};
