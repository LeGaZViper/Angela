//Weapon choosing function | used in weapons
function chooseWeapon(name) {
  for (var index in weaponDatabase) {
    if (weaponDatabase[index].name == name) {
      player.weapon = weaponDatabase[index];
      player.weaponDuration =
        player.weapon.duration +
        (player.weapon.duration * ship.weaponDuration) / 5;
      saveLocalStorage();
      break;
    }
  }
}

var weaponActivation = {
  currentIndex: 0,
  currentWord: "STRING",
  currentlyTyped: "",
  wordList: [
    "hello",
    "hOnza",
    "PLEASEGIVEMEFOOD",
    "VERYLONGTEXT",
    "windowsSUX",
  ],
  lives: 3,
  weaponName: "DOUBLE",
  checkInput: function (input) {
    console.log(input);
    if (input == this.currentWord[this.currentIndex]) {
      this.currentlyTyped += this.currentWord[this.currentIndex];
      this.currentIndex++;
      if (this.currentIndex == this.currentWord.length) {
        console.log("done!", this.weaponName);
        player.inWeaponActivation = false;
        this.lives = 3;
        this.currentIndex = 0;
        chooseWeapon(this.weaponName);
      }
    } else if (this.lives > 0) {
      this.lives--;
      console.log("-1 life");
    } else {
      console.log("fail!");
      player.inWeaponActivation = false;
      this.lives = 3;
      this.currentIndex = 0;
    }
  },
};

var randomDropList = [];
function randomDrop(R) {
  R.width = 75 * screenratio;
  R.height = 75 * screenratio;
  R.hitBoxWidth = (R.width / 3) * 2;
  R.hitBoxHeight = (R.height / 3) * 2;
  R.hitBoxX = R.x - R.hitBoxWidth / 2;
  R.hitBoxY = R.y - R.hitBoxHeight / 2;
  let choose = Math.floor(Math.random() * 5) + 1;
  for (let index in weaponDatabase) {
    if (choose == weaponDatabase[index].index) {
      R.name = weaponDatabase[index].name;
    }
  }
  R.update = function () {
    R.x += -player.xspeed - camera.offSetX;
    R.y += -player.yspeed - camera.offSetY;
    R.hitBoxX = R.x - R.hitBoxWidth / 2;
    R.hitBoxY = R.y - R.hitBoxHeight / 2;
  };
  R.render = function () {
    ctx.beginPath();
    try {
      ctx.drawImage(
        sprite["UI_" + R.name],
        0,
        100,
        100,
        100,
        R.x - R.width / 2,
        R.y - R.height / 2,
        R.width,
        R.height
      );
    } catch (error) {
      ctx.drawImage(
        sprite["UI_" + "DOUBLE"],
        0,
        100,
        100,
        100,
        R.x - R.width / 2,
        R.y - R.height / 2,
        R.width,
        R.height
      );
    }
    ctx.stroke();
    ctx.closePath();
  };
  return R;
}

//bullets
var bulletList = [];
function bullet(B, who, numberOfBullets) {
  B.x = who.x + 25 * screenratio * Math.cos(who.angle - Math.PI / 2);
  B.y = who.y + 25 * screenratio * Math.sin(who.angle - Math.PI / 2);
  B.ttl = 300;
  B.killed = false;
  B.name = who.weapon.name;
  B.damage = who.weapon.damage;
  B.speed =
    who.weapon.speed * screenratio +
    Math.abs(who.xspeed) +
    Math.abs(who.yspeed);
  B.width = who.weapon.width * screenratio;
  B.height = who.weapon.height * screenratio;
  B.piercing = who.weapon.piercing;
  B.color = who.weapon.color;
  B.hitCD = who.weapon.hitCD;
  B.opacity = 1;
  if (who.weapon.name == "BASIC") {
    B.dirx = Math.cos(who.angle - Math.PI / 2);
    B.diry = Math.sin(who.angle - Math.PI / 2);
  } else if (who.weapon.name == "DOUBLE") {
    if (numberOfBullets == 2) {
      B.dirx = Math.cos(who.angle - Math.PI / 2 + (1 / 180) * Math.PI);
      B.diry = Math.sin(who.angle - Math.PI / 2 + (1 / 180) * Math.PI);
    } else if (numberOfBullets == 1) {
      B.dirx = Math.cos(who.angle - Math.PI / 2 - (1 / 180) * Math.PI);
      B.diry = Math.sin(who.angle - Math.PI / 2 - (1 / 180) * Math.PI);
    }
    if (numberOfBullets > 1) {
      bulletList.push(bullet({ x: who.x, y: who.y }, who, numberOfBullets - 1));
    }
  } else if (who.weapon.name == "SPRAY") {
    if (numberOfBullets == 3) {
      B.dirx = Math.cos(who.angle - Math.PI / 2);
      B.diry = Math.sin(who.angle - Math.PI / 2);
    } else if (numberOfBullets == 2) {
      B.dirx = Math.cos(who.angle - Math.PI / 2 + (3 / 180) * Math.PI);
      B.diry = Math.sin(who.angle - Math.PI / 2 + (3 / 180) * Math.PI);
    } else if (numberOfBullets == 1) {
      B.dirx = Math.cos(who.angle - Math.PI / 2 - (3 / 180) * Math.PI);
      B.diry = Math.sin(who.angle - Math.PI / 2 - (3 / 180) * Math.PI);
    }
    if (numberOfBullets > 1) {
      bulletList.push(bullet({ x: who.x, y: who.y }, who, numberOfBullets - 1));
    }
  } else if (who.weapon.name == "ROCKET") {
    B.dirx = Math.cos(who.angle - Math.PI / 2);
    B.diry = Math.sin(who.angle - Math.PI / 2);
    B.sprite = sprite.projectile_rocket;
    B.explosive = true;
    B.explosion_radius = 150 * screenratio;
    B.explosion_triggered = false;
    B.explosion_countdown = 0;
    B.explosion_index = 0;
    B.explosion_angle = Math.random() * 2 * Math.PI;
  } else if (who.weapon.name == "GIANT") {
    B.dirx = Math.cos(who.angle - Math.PI / 2);
    B.diry = Math.sin(who.angle - Math.PI / 2);
  } else if (who.weapon.name == "SPREADER") {
    B.dirx = Math.cos(who.angle - Math.PI / 2);
    B.diry = Math.sin(who.angle - Math.PI / 2);
    B.sprite = sprite.projectile_spread;
  } else if (who.weapon.name == "SPREADER_PROJECTILE") {
    B.sprite = sprite.projectile_spreadProjectile;
  }
  B.hitBoxWidth = (B.width / 3) * 2;
  B.hitBoxHeight = (B.height / 3) * 2;
  B.hitBoxX = B.x - B.hitBoxWidth / 2;
  B.hitBoxY = B.y - B.hitBoxHeight / 2;
  B.update = function () {
    if (who.weapon.name == "LASER") {
      let hitDetectionX = who.x;
      let hitDetectionY = who.y;
      B.dirx = Math.cos(who.angle - Math.PI / 2);
      B.diry = Math.sin(who.angle - Math.PI / 2);
      let ratio = 6 / (Math.abs(B.dirx) + Math.abs(B.diry));
      for (let i = 0; i < 200; i++) {
        hitDetectionX += B.dirx * ratio;
        hitDetectionY += B.diry * ratio;
        enemyList.forEach((e) => {
          if (
            !e.piercingCD &
            collides(e, {
              hitBoxX: hitDetectionX - 3,
              hitBoxY: hitDetectionY - 3,
              hitBoxWidth: 6,
              hitBoxHeight: 6,
            })
          ) {
            e.piercingDamageCDstart();
            e.HP -= B.damage;
            e.hitCDstart();
            checkDeath(e, "LASER");
          }
        });
      }
      B.x = hitDetectionX;
      B.y = hitDetectionY;
    } else {
      let ratio = B.speed / (Math.abs(B.dirx) + Math.abs(B.diry));
      B.xspeed = ratio * B.dirx;
      B.yspeed = ratio * B.diry;

      B.x += B.xspeed - player.xspeed - camera.offSetX;
      B.y += B.yspeed - player.yspeed - camera.offSetY;
      B.hitBoxX = B.x - B.hitBoxWidth / 2;
      B.hitBoxY = B.y - B.hitBoxHeight / 2;
      B.calcTTL();
    }
  };
  B.render = function () {
    if (who.weapon.name == "LASER") {
      ctx.beginPath();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = B.color;
      ctx.lineWidth = 6 * screenratio;
      ctx.moveTo(who.x, who.y);
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    } else if (!B.explosion_triggered) {
      ctx.beginPath();
      ctx.save();
      ctx.translate(B.x, B.y);
      ctx.rotate(Math.atan2(B.diry, B.dirx) + Math.PI / 2);
      ctx.globalAlpha = B.opacity;
      if (B.color == undefined) {
        ctx.drawImage(
          B.sprite,
          0,
          0,
          B.width / screenratio,
          B.height / screenratio,
          -B.width / 2,
          -B.height / 2,
          B.width,
          B.height
        );
      } else {
        ctx.fillStyle = B.color;
        ctx.fillRect(-B.width / 2, -B.height / 2, B.width, B.height);
      }
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
    }
  };
  B.explode = function () {
    B.explosion_triggered = true;
    B.speed = 0;
    enemyList.forEach((e) => {
      if (
        collides(e, {
          hitBoxX: B.x - B.explosion_radius / 2,
          hitBoxY: B.y - B.explosion_radius / 2,
          hitBoxWidth: B.explosion_radius,
          hitBoxHeight: B.explosion_radius,
        })
      ) {
        e.HP -= B.damage;
        e.hitCDstart();
        checkDeath(e, "ROCKET");
      }
    });
  };
  B.explosion_render = function () {
    if (!B.killed) {
      B.explosion_countdown += 1;
      if (B.explosion_countdown % 5 == 0) {
        B.explosion_angle = Math.random() * 2 * Math.PI;
        B.explosion_index += 1;
      }
      ctx.beginPath();
      ctx.globalAlpha = 1;
      ctx.save();
      ctx.translate(B.x, B.y);
      ctx.rotate(B.explosion_angle);
      ctx.drawImage(
        sprite.projectile_explosion,
        0,
        (B.explosion_radius / screenratio) * B.explosion_index,
        150,
        150,
        -75 * screenratio,
        -75 * screenratio,
        B.explosion_radius,
        B.explosion_radius
      );
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if (B.explosion_index == 11) B.killed = true;
    }
  };
  B.calcTTL = function () {
    if (B.ttl > 0) {
      B.ttl -= 1;
    } else {
      B.killed = true;
    }
  };
  return B;
}
