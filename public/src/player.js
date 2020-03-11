var backgroundParticles = {
  set: function() {
    this.x1 = canvas.width / 2;
    this.y1 = canvas.height / 2;

    this.x2 = canvas.width / 2;
    this.y2 = canvas.height / 2;
  },
  update_render: function() {
    this.x1 += -(player.xspeed + camera.offSetX) / 8;
    this.y1 += -(player.yspeed + camera.offSetY) / 8;
    this.x2 += -(player.xspeed + camera.offSetX) / 10;
    this.y2 += -(player.yspeed + camera.offSetY) / 10;

    ctx.beginPath();
    ctx.drawImage(
      sprite.UI_stars1,
      this.x1 - 1500 * screenratio,
      this.y1 - 1000 * screenratio,
      3000 * screenratio,
      2000 * screenratio
    );
    ctx.drawImage(
      sprite.UI_stars2,
      this.x2 - 1500 * screenratio,
      this.y2 - 1000 * screenratio,
      3000 * screenratio,
      2000 * screenratio
    );
    ctx.fill();
    ctx.closePath();
  }
};

var camera = {
  inicialize: function() {
    this.x = 0;
    this.y = 0;
    this.offSetX = 0;
    this.offSetY = 0;
    this.offSetXNew = 0;
    this.offSetYNew = 0;
    this.offSetXOld = 0;
    this.offSetYOld = 0;
    this.offSetStorageX = 0;
    this.offSetStorageY = 0;
  },
  update: function() {
    let point = Math.atan2(
      yMousePos - canvas.height / 2,
      xMousePos - canvas.width / 2
    );
    let distance =
      (2 *
        (Math.sqrt(
          Math.pow(xMousePos - canvas.width / 2, 2) +
            Math.pow(yMousePos - canvas.height / 2, 2)
        ) *
          player.acceleration)) /
      100;
    this.x = distance * Math.cos(point) + canvas.width / 2;
    this.y = distance * Math.sin(point) + canvas.height / 2;
    this.offSetXNew = this.x - canvas.width / 2;
    this.offSetYNew = this.y - canvas.height / 2;
  },
  check: function() {
    this.offSetX =
      (Math.round((this.offSetXNew - this.offSetXOld) * 10) / 50) * screenratio;
    this.offSetXOld = this.offSetXNew;
    this.offSetY =
      (Math.round((this.offSetYNew - this.offSetYOld) * 10) / 50) * screenratio;
    this.offSetYOld = this.offSetYNew;
  }
};

//player object
var ship;
var player = {
  inicialize: () => {
    player.spaceSize = 4000 * screenratio;
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.coordX = player.spaceSize / 2;
    player.coordY = player.spaceSize / 2;
    player.earthX = canvas.width / 2;
    player.earthY = canvas.height / 2;
    player.futureX = 0;
    player.futureY = 0;
    player.acceleration = 0;
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
    player.shield = [player.maxShield[0], player.maxShield[1]];
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
    player.sprite = sprite["player_" + ship.name.toLowerCase()];
  },
  update: () => {
    //speed calculation
    let distance = Math.sqrt(
      Math.pow(xMousePos - canvas.width / 2, 2) +
        Math.pow(yMousePos - canvas.height / 2, 2)
    );
    if (distance > 300 * screenratio) {
      if (player.acceleration < 100 && !rightMouseDown)
        if (player.acceleration <= 97) player.acceleration += 3;
        else player.acceleration += 1;
    } else if (distance < 170 * screenratio && player.acceleration > 0) {
      if (player.acceleration >= 3) player.acceleration -= 3;
      else player.acceleration -= 1;
    } else if (distance < 300 * screenratio && distance > 170 * screenratio) {
      if (player.acceleration < 50) player.acceleration += 1;
      else if (player.acceleration > 0) player.acceleration -= 1;
    }

    if (!player.collisionCD) player.shieldRecharge();
    if (rightMouseDown && player.acceleration > 0) {
      if (player.acceleration >= 3) player.acceleration -= 3;
      else player.acceleration -= 1;
    }
    player.speed = ((ship.speed * player.acceleration) / 100) * screenratio;
    let ratio =
      player.speed /
      (Math.abs(xMousePos - canvas.width / 2) +
        Math.abs(yMousePos - canvas.height / 2));
    if (player.HP[0] <= 0) {
      player.speed = 0;
      player.xspeed = 0;
      player.yspeed = 0;
      loseTheGame();
    } else if (player.HP[1] <= 0 && !player.killedCD) {
      player.killedCDstart();
    } else if (!isNaN(ratio)) {
      //player positioner
      player.xspeed = ratio * (xMousePos - player.x);
      player.yspeed = ratio * (yMousePos - player.y);
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
      }
    }
    player.earthX -= camera.offSetX;
    player.earthY -= camera.offSetY;
    player.x -= camera.offSetX;
    player.y -= camera.offSetY;

    //New thruster sprite control
    player.particlesHeight = player.acceleration / 100 + 0.1;
  },
  render: () => {
    ctx.beginPath();
    ctx.save();
    ctx.translate(player.x, player.y);
    player.angle =
      Math.atan2(yMousePos - player.y, xMousePos - player.x) + Math.PI / 2;
    ctx.rotate(player.angle);
    //Normal Scout
    ctx.globalAlpha = player.opacity[1];
    ctx.drawImage(
      player.sprite,
      0,
      player.heightOnPic,
      player.widthOnPic,
      player.particles[0],
      (-player.width / 2) * player.particlesWidth,
      player.height / 2 - player.particles[1] * screenratio,
      player.width * player.particlesWidth,
      player.particles[2] * screenratio * player.particlesHeight
    );
    ctx.drawImage(
      player.sprite,
      0,
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
        0,
        2 * player.heightOnPic + player.particles[0],
        player.widthOnPic,
        player.particles[0],
        (-player.width / 2) * player.particlesWidth,
        player.height / 2 - player.particles[1] * screenratio,
        player.width * player.particlesWidth,
        player.particles[2] * screenratio * player.particlesHeight
      );
      ctx.drawImage(
        player.sprite,
        0,
        player.heightOnPic + player.particles[0],
        player.widthOnPic,
        player.heightOnPic,
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
      );
    }
    ctx.restore();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.closePath();
  },

  shieldCD: 0,
  attackCD: false,
  hitCD: false,
  collisionCD: false,
  killedCD: false,
  opacity: [1, 1],
  damageOpacity: [0, 0],
  blikacky: false,
  attackCDstart: async function() {
    player.attackCD = true;
    await sleep(ship.weapon.cooldown);
    player.attackCD = false;
  },
  hitCDstart: async function(which, what) {
    if (which == 1) player.shieldCD = 300;
    player.damageOpacity[which] = 51 / 100;
    for (let i = 50; i >= 0; i--) {
      if (player.damageOpacity[which] == (i + 1) / 100) {
        player.damageOpacity[which] = i / 100;
        await sleep(20);
      } else break;
    }
    if (which == 1 && what == "bullet") player.hitCD = false;
    else if (which == 1 && what == "collision") player.collisionCD = false;
  },
  shieldRecharge: function() {
    if (player.shieldCD > 0) {
      player.shieldCD--;
    } else if (player.shield[1] < player.maxShield[1]) {
      player.shieldCD = 60;
      player.shield[1] += 1;
    }
  },
  killedCDstart: async function() {
    //EXPLOSION
    player.opacity[1] = 0.5;
    player.killedCD = true;
    await sleep(5000);
    player.HP[1] = player.maxHP[1];
    player.opacity[1] = 1;
    player.killedCD = false;
    player.collisionCD = false;
  }
};

var player2 = {
  inicialize: function() {
    this.x = 0;
    this.y = 0;
    this.speed = 0;
    this.angle = 0;
    this.widthOnPic = ship.widthOnPic;
    this.heightOnPic = ship.heightOnPic;
    this.width = ship.width * screenratio;
    this.height = ship.height * screenratio;
    this.particles = ship.particles;
    this.particlesWidth = 1;
    this.particlesHeight = 0.2;
  },
  update: function() {
    this.particlesHeight = this.speed / 10 + 0.1;
  },
  render: function() {
    ctx.beginPath();
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      sprite.player_scout2,
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
      sprite.player_scout2,
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
  }
};
