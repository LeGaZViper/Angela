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
  inicialize: function (starterX, starterY) {
    // in order to change player default pos one needs to change this.coord, this.earth, this.future accordingly
    this.shipLives = 3;
    this.starterPosX = starterX * screenratio;
    this.starterPosY = starterY * screenratio;
    this.spaceSize = 4000 * screenratio;
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.coordX = this.spaceSize / 2 + this.starterPosX;
    this.coordY = this.spaceSize / 2 + this.starterPosY;
    this.earthX = canvas.width / 2 - this.starterPosX;
    this.earthY = canvas.height / 2 - this.starterPosY;
    this.futureX = this.starterPosX;
    this.futureY = this.starterPosY;
    this.accelerationX = 0;
    this.accelerationY = 0;
    this.speed = 0;
    this.xspeed = 0;
    this.yspeed = 0;
    this.width = ship.width * screenratio;
    this.height = ship.height * screenratio;
    this.widthOnPic = ship.widthOnPic;
    this.heightOnPic = ship.heightOnPic;
    this.animationX = 0;
    this.animationY = 0;
    //0 = Earth, 1 = Ship
    this.maxHP = ship.maxHP;
    this.HP = [this.maxHP[0], this.maxHP[1]];
    this.maxShield = ship.maxShield;
    this.shield = [ship.maxShield[0], ship.maxShield[1]];
    this.angle = 0;

    this.hitBoxWidth = (this.width / 3) * 2;
    this.hitBoxHeight = (this.height / 3) * 2;
    this.hitBoxX = this.x - this.hitBoxWidth / 2;
    this.hitBoxY = this.y - this.hitBoxHeight / 2;
    this.animationX = 0;
    this.animationIndex = 0;
    this.animationFrames = 9;
    this.animationFPS = 5;
    this.sprite = sprite.player_scout;

    this.weapon = WeaponData.BASIC;
    this.weaponDuration = 0;
    this.inWeaponActivation = false;
    this.companions = ship.companions;
    this.companionsX = [0, 0, 0];
    this.companionsY = [0, 0, 0];
    this.companionsIndex = [
      0,
      360 / this.companions,
      (2 * 360) / this.companions,
    ];
    this.shieldCD = [0, 0];
    this.attackCD = false;
    this.hitCD = false;
    this.collisionCD = false;
    this.killedCD = false;
    this.opacity = [1, 1];
    this.damageOpacity = [0, 0];
  },
  update: function () {
    //speed calculation
    let distance = Math.sqrt(
      Math.pow(xMousePos - canvas.width / 2, 2) +
        Math.pow(yMousePos - canvas.height / 2, 2)
    );
    this.shieldRecharge();
    if (distance < 160 * screenratio && !rightMouseDown) {
      if (this.accelerationX >= 2) {
        this.accelerationX -= 2;
      } else this.accelerationX = 0;
      if (this.accelerationY >= 2) {
        this.accelerationY -= 2;
      } else this.accelerationY = 0;
    } else if (
      distance >= 160 * screenratio &&
      distance <= 210 * screenratio &&
      !rightMouseDown
    ) {
      if (this.accelerationX >= 1) {
        this.accelerationX -= 1;
      } else this.accelerationX = 0;
      if (this.accelerationY >= 1) {
        this.accelerationY -= 1;
      } else this.accelerationY = 0;
    } else if (!rightMouseDown) {
      if (this.accelerationX <= 98) {
        this.accelerationX += 2;
      } else this.accelerationX = 100;
      if (this.accelerationY <= 98) {
        this.accelerationY += 2;
      } else this.accelerationY = 100;
    } else {
      if (this.accelerationX >= 0.2) {
        this.accelerationX -= 0.2;
      } else this.accelerationX = 0;
      if (this.accelerationY >= 0.2) {
        this.accelerationY -= 0.2;
      } else this.accelerationY = 0;
    }

    this.speed = ship.speed * screenratio;
    if (!rightMouseDown) {
      this.ratio =
        this.speed /
        (Math.abs(xMousePos - canvas.width / 2) +
          Math.abs(yMousePos - canvas.height / 2));
      this.lastRatioX = xMousePos - this.x;
      this.lastRatioY = yMousePos - this.y;
    }
    this.targetxspeed =
      (this.ratio * this.lastRatioX * this.accelerationX) / 100;
    this.targetyspeed =
      (this.ratio * this.lastRatioY * this.accelerationY) / 100;
    if (this.HP[0] <= 0 || this.shipLives == 0) {
      this.speed = 0;
      this.xspeed = 0;
      this.yspeed = 0;
      loseTheGame();
    } else if (this.HP[1] <= 0 && !this.killedCD) {
      this.killedCD = true;
      this.killedCDstart();
    } else if (!isNaN(this.ratio)) {
      //player positioner
      if (
        Math.abs(this.xspeed) >= Math.abs(this.targetxspeed) &&
        (this.xspeed >= 0 ? 1 : -1) == (this.targetxspeed >= 0 ? 1 : -1)
      ) {
        this.xspeed = this.targetxspeed;
      } else if (this.targetxspeed != 0) {
        this.xspeed +=
          ((this.targetxspeed >= 0 ? 1 : -1) * (this.accelerationX / 100)) / 3;
      } else {
        this.xspeed = 0;
      }
      if (
        Math.abs(this.yspeed) >= Math.abs(this.targetyspeed) &&
        (this.yspeed >= 0 ? 1 : -1) == (this.targetyspeed >= 0 ? 1 : -1)
      ) {
        this.yspeed = this.targetyspeed;
      } else if (this.targetyspeed != 0) {
        this.yspeed +=
          ((this.targetyspeed >= 0 ? 1 : -1) * (this.accelerationY / 100)) / 3;
      } else {
        this.yspeed = 0;
      }

      this.futureX += this.xspeed;
      this.futureY += this.yspeed;
      if (
        Math.abs(this.futureX) < this.spaceSize / 2 &&
        Math.abs(this.futureY) < this.spaceSize / 2
      ) {
        this.coordX += this.xspeed;
        this.coordY += this.yspeed;
        this.hitBoxWidth = Math.abs(
          (this.width / 3) * 2 * Math.pow(Math.cos(this.angle), 2) +
            (this.height / 3) * 2 * Math.pow(Math.sin(this.angle), 2)
        );
        this.hitBoxHeight = Math.abs(
          (this.width / 3) * 2 * Math.pow(Math.sin(this.angle), 2) +
            (this.height / 3) * 2 * Math.pow(Math.cos(this.angle), 2)
        );
        this.hitBoxX = this.x - this.hitBoxWidth / 2;
        this.hitBoxY = this.y - this.hitBoxHeight / 2;
        this.earthX -= this.xspeed;
        this.earthY -= this.yspeed;
      } else {
        this.futureX -= this.xspeed;
        this.futureY -= this.yspeed;
        this.speed = 0;
        this.xspeed = 0;
        this.yspeed = 0;
      }
    }
    this.earthX -= camera.offSetX;
    this.earthY -= camera.offSetY;
    this.x -= camera.offSetX;
    this.y -= camera.offSetY;

    this.companionsIndex.forEach((_random, i) => {
      this.companionsIndex[i]++;
      if (this.companionsIndex[i] == 360) this.companionsIndex[i] = 0;
    });
    let companionDistance = this.weapon.name != "INVICIBLEDRILL" ? 50 : 100;
    for (let i = 0; i < this.companions; i++) {
      this.companionsX[i] =
        this.x +
        companionDistance *
          screenratio *
          Math.cos((this.companionsIndex[i] / 180) * Math.PI);
      this.companionsY[i] =
        this.y +
        companionDistance *
          screenratio *
          Math.sin((this.companionsIndex[i] / 180) * Math.PI);
    }
  },
  render: function () {
    this.animationIndex += 1;
    let nextIndex = Math.round(
      300 /
        this.animationFPS /
        ((60 * (this.accelerationX + this.accelerationY)) / 200)
    );

    if (nextIndex == 0) nextIndex = 1;
    if (nextIndex == Infinity) nextIndex = 60 / this.animationFPS;

    if (this.animationIndex == nextIndex) {
      this.animationIndex = 0;
      if (this.animationX < this.widthOnPic * (this.animationFrames - 1))
        this.animationX += this.widthOnPic;
      else this.animationX = 0;
    }
    if (this.animationIndex > nextIndex) this.animationIndex = 0;

    ctx.save();
    ctx.translate(this.x, this.y);
    this.angle =
      Math.atan2(yMousePos - this.y, xMousePos - this.x) + Math.PI / 2;
    ctx.rotate(this.angle);
    ctx.globalAlpha = this.opacity[1] - this.damageOpacity[1];
    ctx.drawImage(
      this.sprite,
      this.animationX,
      0,
      this.widthOnPic,
      this.heightOnPic,
      -this.width / 2,
      -this.height / 2,
      this.width,
      this.height
    );
    if (this.HP[1] > 0 && this.weapon.name == "INVICIBLEDRILL") {
      ctx.globalAlpha = (this.dodgeMeter / 100) * 5;
      ctx.drawImage(
        this.sprite,
        this.animationX,
        this.heightOnPic * 2,
        this.widthOnPic,
        this.heightOnPic,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }
    //Damaged Scout #RED
    if (this.HP[1] > 0) {
      ctx.globalAlpha = this.damageOpacity[1];
      ctx.drawImage(
        this.sprite,
        this.animationX,
        this.heightOnPic,
        this.widthOnPic,
        this.heightOnPic,
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height
      );
    }
    ctx.restore();
    ctx.globalAlpha = 1;
    for (let i = 0; i < this.companions; i++) {
      ctx.save();
      ctx.translate(this.companionsX[i], this.companionsY[i]);
      ctx.rotate(this.angle);
      if (this.weapon.name != "INVICIBLEDRILL")
        ctx.drawImage(sprite.player_companion, 0, 0, 30, 30, -15, -15, 30, 30);
      else
        ctx.drawImage(sprite.player_companion, 0, 30, 30, 30, -30, -30, 60, 60);
      ctx.restore();
    }
  },
  attackCDstart: async function () {
    this.attackCD = true;
    await sleep(this.weapon.cooldown);
    this.attackCD = false;
  },
  hitCDstart: async function (playerEntity, event) {
    if (playerEntity == 1) this.shieldCD[1] = 300;
    else this.shieldCD[0] = 300;
    this.damageOpacity[playerEntity] = 101 / 100;
    for (let i = 100; i >= 0; i--) {
      if (playerEntity == 1 && event == "bullet" && i == 50) this.hitCD = false;
      if (this.damageOpacity[playerEntity] == (i + 1) / 100) {
        this.damageOpacity[playerEntity] = i / 100;
        await sleep(1);
      } else break;
    }
    if (playerEntity == 1 && event == "bullet") this.hitCD = false;
    else if (playerEntity == 1 && event == "collision")
      this.collisionCD = false;
  },
  shieldRecharge: function () {
    if (this.shieldCD[0] > 0) {
      this.shieldCD[0]--;
    } else if (this.shield[0] < this.maxShield[0]) {
      this.shieldCD[0] = 12;
      this.shield[0] += 1;
    }
    if (this.shieldCD[1] > 0) {
      this.shieldCD[1]--;
    } else if (this.shield[1] < this.maxShield[1]) {
      this.shieldCD[1] = 6;
      this.shield[1] += 1;
    }
  },
  killedCDstart: async function () {
    this.shipLives--;
    this.opacity[1] = 0.5;
    await sleep(5000);
    this.HP[1] = this.maxHP[1];
    this.opacity[1] = 1;
    this.killedCD = false;
    this.collisionCD = false;
  },
  setCompanions: function (c) {
    this.companions = c;
    this.companionsIndex = [0, 360 / c, (2 * 360) / c];
  },
};
