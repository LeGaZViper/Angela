//Weapon choosing function | used in weapons
function chooseWeapon(name) {
  for (var index in WeaponData) {
    if (WeaponData[index].name == name) {
      player.weapon = WeaponData[index];
      player.weaponDuration =
        player.weapon.duration +
        (player.weapon.duration * ship.weaponDuration) / 5;
      break;
    }
  }
}

var weaponActivation = {
  inicialize: function () {
    this.currentIndex = 0;
    this.currentWord = "";
    this.currentlyTyped = "";
    this.lives = 3;
    this.weaponName = "DOUBLE";
    this.failTimeIndex = 0;
    this.successTimeIndex = 0;
    this.timerIndex = 0;
  },
  wordList: [
    "hello",
    "hOnza",
    "PLEASEGIVEMEFOOD",
    "VERYLONGTEXT",
    "windowsSUX",
  ],
  defaultTimerIndex: 600,
  checkInput: function (input) {
    if (this.failTimeIndex < 1) {
      if (input == this.currentWord[this.currentIndex]) {
        this.currentlyTyped += this.currentWord[this.currentIndex];
        this.currentIndex++;
        if (this.currentIndex == this.currentWord.length) {
          this.successTimeIndex = 120;
          chooseWeapon(this.weaponName);
        }
      } else if (this.lives > 1) {
        this.lives--;
        this.failTimeIndex = 20;
      } else {
        this.lives--;
        this.failTimeIndex = 120;
      }
    }
  },
  render_update: function () {
    this.timerIndex--;
    if (this.timerIndex == 0) {
      this.failTimeIndex = 120;
      this.lives = 0;
    }
    if (this.lives > 0 && this.successTimeIndex == 0) {
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.font = 50 * screenratio + "px Consolas";
      ctx.beginPath();
      ctx.fillText(
        `Attempts: ${this.lives}`,
        canvas.width / 2 - 50 * screenratio,
        canvas.height / 6
      );
      ctx.arc(
        canvas.width / 2 + 175 * screenratio,
        canvas.height / 6 - 15 * screenratio,
        20 * screenratio,
        0,
        (this.timerIndex / this.defaultTimerIndex) * 2 * Math.PI,
        false
      );
      let colorHPbar_1 = parseInt(
        (this.timerIndex / this.defaultTimerIndex) * 255
      ).toString(16);
      if (colorHPbar_1.length == 1) colorHPbar_1 = "0" + colorHPbar_1;
      ctx.strokeStyle = "#FF" + colorHPbar_1 + colorHPbar_1;
      ctx.lineWidth = 10;
      ctx.stroke();
      ctx.closePath();

      ctx.textAlign = "left";
      ctx.font = `bold ${60 * screenratio}px Consolas`;
      ctx.fillStyle = "red";
      let width = ctx.measureText(this.currentWord).width;
      ctx.fillText(
        this.currentWord,
        canvas.width / 2 - width / 2,
        canvas.height / 4
      );
      ctx.fillStyle = "#8C95FF";
      ctx.fillText(
        this.currentlyTyped,
        canvas.width / 2 - width / 2,
        canvas.height / 4
      );
    }
    if (this.failTimeIndex > 0) {
      this.fail_render();
    }
    if (this.successTimeIndex > 0) {
      this.success_render();
    }
  },
  fail_render: function () {
    this.failTimeIndex--;
    if (this.lives > 0) {
      ctx.fillStyle = "red";
      ctx.globalAlpha = this.failTimeIndex / 120;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
    } else if (this.failTimeIndex == 1) {
      player.inWeaponActivation = false;
      this.lives = 3;
      this.currentIndex = 0;
    } else {
      ctx.fillStyle = "red";
      ctx.globalAlpha = this.failTimeIndex / this.defaultTimerIndex;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.fillStyle = "red";
      ctx.font = 70 * screenratio + "px Consolas";
      ctx.globalAlpha = 1;
      ctx.fillText(`FAIL`, canvas.width / 2, canvas.height / 4);
    }
  },
  success_render: function () {
    this.successTimeIndex--;
    ctx.fillStyle = "white";
    ctx.globalAlpha = this.successTimeIndex / (2 * this.defaultTimerIndex);
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.font = 70 * screenratio + "px Consolas";
    ctx.globalAlpha = 1;
    ctx.fillText(
      `SUCCESS: ${this.weaponName}`,
      canvas.width / 2,
      canvas.height / 4
    );
    if (this.successTimeIndex == 0) {
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
  R.animationX = 0;
  R.animationIndex = 0;
  R.timeIndex = 0;
  let choose = Math.floor(Math.random() * 8) + 1;
  for (let index in WeaponData) {
    if (choose == WeaponData[index].index) {
      R.name = WeaponData[index].name;
    }
  }
  R.update = function () {
    R.x += -player.xspeed - camera.offSetX;
    R.y += -player.yspeed - camera.offSetY;
    R.hitBoxX = R.x - R.hitBoxWidth / 2;
    R.hitBoxY = R.y - R.hitBoxHeight / 2;
    R.timeIndex++;
    R.animationIndex++;

    if (R.timeIndex == 200) {
      R.timeIndex = 0;
      R.animationIndex = 0;
    }
    if (R.timeIndex < 50 && R.animationIndex == 10) {
      R.animationX += 150;
      R.animationIndex = 0;
    } else if (R.timeIndex >= 50) {
      R.animationX = 0;
    }
  };
  R.render = function () {
    ctx.beginPath();
    ctx.drawImage(
      sprite.UI_drop,
      R.animationX,
      0,
      150,
      150,
      R.x - R.width / 2,
      R.y - R.height / 2,
      R.width,
      R.height
    );
    ctx.stroke();
    ctx.closePath();
  };
  return R;
}

//bullets
var bulletList = [];
function bullet(B, numberOfBullets) {
  if (B.x == undefined) {
    B.x = player.x + 25 * screenratio * Math.cos(player.angle - Math.PI / 2);
    B.y = player.y + 25 * screenratio * Math.sin(player.angle - Math.PI / 2);
  }
  B.ttl = 300;
  B.killed = false;
  B.damage = Math.round(player.weapon.damage * (B.companion ? 0.5 : 1));
  B.angle = Math.atan2(B.diry, B.dirx) + Math.PI / 2;
  B.name = player.weapon.name;
  B.speed =
    player.weapon.speed * screenratio +
    Math.abs(player.xspeed) +
    Math.abs(player.yspeed);
  B.width = player.weapon.width * screenratio * (B.companion ? 0.5 : 1);
  B.height = player.weapon.height * screenratio * (B.companion ? 0.5 : 1);
  B.piercing = player.weapon.piercing;
  B.color = player.weapon.color;
  B.hitCD = player.weapon.hitCD;
  B.opacity = 1;
  B.animation = player.weapon.animation;
  B.rotationAnimation = player.weapon.rotationAnimation;
  B.rotationAngle = 0;
  B.rotationSpeed = player.weapon.rotationSpeed;
  if (B.animation) {
    B.animationFrames = player.weapon.animationFrames;
    B.animationUpdate = player.weapon.animationUpdate;
  }
  B.animationX = 0;
  B.animationIndex = 0;
  B.animationAngle = 0;
  B.sprite = player.weapon.sprite;
  if (player.weapon.name == "BASIC") {
    B.damage = Math.floor(B.damage * Math.random()) + 1;
    B.dirx = Math.cos(player.angle - Math.PI / 2);
    B.diry = Math.sin(player.angle - Math.PI / 2);
  } else if (player.weapon.name == "DOUBLE") {
    B.damage = Math.floor(B.damage * Math.random()) + 1;
    if (numberOfBullets == 2) {
      B.dirx = Math.cos(player.angle - Math.PI / 2 + (1 / 180) * Math.PI);
      B.diry = Math.sin(player.angle - Math.PI / 2 + (1 / 180) * Math.PI);
    } else if (numberOfBullets == 1) {
      B.dirx = Math.cos(player.angle - Math.PI / 2 - (1 / 180) * Math.PI);
      B.diry = Math.sin(player.angle - Math.PI / 2 - (1 / 180) * Math.PI);
    }
    if (numberOfBullets > 1) {
      bulletList.push(
        bullet({ x: B.x, y: B.y, companion: B.companion }, numberOfBullets - 1)
      );
    }
  } else if (player.weapon.name == "SPRAY") {
    B.damage = Math.floor(B.damage * Math.random()) + 1;
    if (numberOfBullets == 3) {
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
    } else if (numberOfBullets == 2) {
      B.dirx = Math.cos(player.angle - Math.PI / 2 + (3 / 180) * Math.PI);
      B.diry = Math.sin(player.angle - Math.PI / 2 + (3 / 180) * Math.PI);
    } else if (numberOfBullets == 1) {
      B.dirx = Math.cos(player.angle - Math.PI / 2 - (3 / 180) * Math.PI);
      B.diry = Math.sin(player.angle - Math.PI / 2 - (3 / 180) * Math.PI);
    }
    if (numberOfBullets > 1) {
      bulletList.push(
        bullet({ x: B.x, y: B.y, companion: B.companion }, numberOfBullets - 1)
      );
    }
  } else if (player.weapon.name == "ROCKET") {
    B.dirx = Math.cos(player.angle - Math.PI / 2);
    B.diry = Math.sin(player.angle - Math.PI / 2);
    B.explosive = true;
    B.explosion_radius = 150 * screenratio;
    B.explosion_triggered = false;
    B.explosion_countdown = 0;
    B.explosion_index = 0;
    B.explosion_angle = Math.random() * 2 * Math.PI;
  } else if (player.weapon.name == "GIANT") {
    B.dirx = Math.cos(player.angle - Math.PI / 2);
    B.diry = Math.sin(player.angle - Math.PI / 2);
  } else if (player.weapon.name == "SPREADER") {
    B.dirx = Math.cos(player.angle - Math.PI / 2);
    B.diry = Math.sin(player.angle - Math.PI / 2);
    B.sprite = sprite.projectile_spread;
  } else if (player.weapon.name == "SPREADER_PROJECTILE") {
  } else if (player.weapon.name == "LASER") {
    B.shootingPointX = B.x;
    B.shootingPointY = B.y;
    B.ttl = 0;
  } else if (player.weapon.name == "CHAKRAM") {
    B.damage = Math.floor(B.damage * Math.random()) + 1;
    B.dirx = Math.cos(player.angle - Math.PI / 2);
    B.diry = Math.sin(player.angle - Math.PI / 2);
  } else if (player.weapon.name == "NEONTHROWER") {
    B.ttl = 70;
    B.damage = Math.floor(B.damage * Math.random()) + 1;
    B.dirx = Math.cos(
      player.angle - Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 6
    );
    B.diry = Math.sin(
      player.angle - Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 6
    );
  }
  B.hitBoxWidth = (B.width / 3) * 2;
  B.hitBoxHeight = (B.height / 3) * 2;
  B.hitBoxX = B.x - B.hitBoxWidth / 2;
  B.hitBoxY = B.y - B.hitBoxHeight / 2;
  B.update = function () {
    if (B.name == "LASER") {
      let hitDetectionX = B.x;
      let hitDetectionY = B.y;
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
      let ratio = 9 / (Math.abs(B.dirx) + Math.abs(B.diry));
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
            e.piercingDamageCDstart(B.hitCD / (player.companions + 1));
            damageNumberList.push(new DamageNumber(B.damage, e.x, e.y));
            e.HP -= B.damage;
            e.hitCDstart();
            checkDeath(e, B.name);
          }
        });
      }
      B.x = hitDetectionX;
      B.y = hitDetectionY;
    } else {
      if (B.rotationAnimation) {
        B.rotationAngle += (B.rotationSpeed / 180) * Math.PI;
        if (B.rotationAngle > 2 * Math.PI) {
          B.rotationAngle = 0;
          if (B.name == "CHAKRAM" && B.speed > 0) {
            B.damage = Math.floor(B.damage * Math.random()) + 1;
            B.speed -= 1;
          }
          if (B.speed < 0) {
            B.speed = 0;
          }
        }
      }
      if (B.animation) {
        B.animationIndex++;
        if (B.animationIndex % B.animationUpdate == 0) {
          B.animationIndex = 0;
          B.animationX++;
        }
        if (B.animationX == B.animationFrames) B.animationX = 0;
      }
      let ratio = B.speed / (Math.abs(B.dirx) + Math.abs(B.diry));
      B.xspeed = ratio * B.dirx;
      B.yspeed = ratio * B.diry;

      B.hitBoxWidth = Math.abs(
        (B.width / 3) * 2 * Math.pow(Math.cos(B.angle), 2) +
          (B.height / 3) * 2 * Math.pow(Math.sin(B.angle), 2)
      );
      B.hitBoxHeight = Math.abs(
        (B.width / 3) * 2 * Math.pow(Math.sin(B.angle), 2) +
          (B.height / 3) * 2 * Math.pow(Math.cos(B.angle), 2)
      );
      B.x += B.xspeed - player.xspeed - camera.offSetX;
      B.y += B.yspeed - player.yspeed - camera.offSetY;
      B.hitBoxX = B.x - B.hitBoxWidth / 2;
      B.hitBoxY = B.y - B.hitBoxHeight / 2;
    }
    B.calcTTL();
  };
  B.render = function () {
    if (B.name == "LASER") {
      ctx.beginPath();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = B.color;
      ctx.lineWidth = 6 * screenratio;
      ctx.moveTo(
        B.shootingPointX +
          Math.cos(player.angle - Math.PI / 2) * 20 * screenratio,
        B.shootingPointY +
          Math.sin(player.angle - Math.PI / 2) * 20 * screenratio
      );
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    } else if (!B.explosion_triggered) {
      ctx.beginPath();
      ctx.save();
      ctx.translate(B.x, B.y);
      B.angle = Math.atan2(B.diry, B.dirx) + Math.PI / 2 + B.rotationAngle;
      ctx.rotate(B.angle);
      ctx.globalAlpha = B.opacity;
      if (B.sprite != undefined) {
        ctx.drawImage(
          B.sprite,
          0 + (B.width / screenratio) * B.animationX,
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
