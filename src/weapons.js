//Weapon choosing function | used in weapons
function chooseWeapon(name) {
  player.weapon = WeaponData[name];
  player.weaponDuration = player.weapon.duration;
  if (player.weapon.name == "INVINCIBLEDRILL") {
    player.speed = 20;
    player.animationFPS = 60;
    player.width = 150 * screenratio;
    player.height = 150 * screenratio;
  }
}

var weaponActivation = {
  inicialize: function () {
    this.weaponName = "DOUBLE";
    this.failTimeIndex = 0;
    this.successTimeIndex = 0;
    this.timerIndex = 0;
    this.targets = 0;
  },
  defaultTimerIndex: 660,
  render_update: function () {
    this.timerIndex--;
    if (this.timerIndex == 0 && this.successTimeIndex == 0) {
      gameAudio.playSound("player_loseWeapon");
      this.failTimeIndex = 120;
      this.targets = -1;
    } else if (this.targets == 0 && this.successTimeIndex == 0) {
      this.successTimeIndex = 120;
      gameAudio.playSound("player_getWeapon");
      chooseWeapon(this.weaponName);
    } else if (this.timerIndex > 0 && this.successTimeIndex == 0) {
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.font = 50 * screenratio + "px Consolas";
      ctx.fillText(
        `Targets: ${this.targets}`,
        canvas.width / 2 - 50 * screenratio,
        canvas.height / 6
      );
      ctx.beginPath();
      ctx.arc(
        canvas.width / 2 + 175 * screenratio,
        canvas.height / 6 - 15 * screenratio,
        20 * screenratio,
        0,
        (this.timerIndex / this.defaultTimerIndex) * 2 * Math.PI,
        false
      );

      let colorHPbar_1 = parseInt((this.timerIndex / this.defaultTimerIndex) * 255).toString(
        16
      );
      if (colorHPbar_1.length == 1) colorHPbar_1 = "0" + colorHPbar_1;
      ctx.strokeStyle = "#FF" + colorHPbar_1 + colorHPbar_1;
      ctx.lineWidth = 10;
      ctx.stroke();
      ctx.closePath();
    } else if (this.failTimeIndex > 0) {
      this.fail_render();
    } else if (this.successTimeIndex > 0) {
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
      this.failTimeIndex = 0;
      player.inWeaponActivation = false;
      this.targets = 0;
    } else {
      ctx.fillStyle = "red";
      ctx.globalAlpha = this.failTimeIndex / this.defaultTimerIndex;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.globalAlpha = 1;
      ctx.textAlign = "center";
      ctx.fillStyle = "red";
      ctx.font = 30 * screenratio + "px FFFFORWA";
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
    ctx.font = 30 * screenratio + "px FFFFORWA";
    ctx.globalAlpha = 1;
    ctx.fillText(`SUCCESS: ${this.weaponName}`, canvas.width / 2, canvas.height / 4);
    if (this.successTimeIndex == 0) {
      player.inWeaponActivation = false;
    }
  },
};

//bullets
var bulletList = [];
function bullet(B, numberOfBullets) {
  if (B.x == undefined) {
    B.x = player.x + 8 * screenratio * Math.cos(player.angle - Math.PI / 2);
    B.y = player.y + 8 * screenratio * Math.sin(player.angle - Math.PI / 2);
  }
  B.dirx;
  B.killed = false;
  B.angle = Math.atan2(B.diry, B.dirx) + Math.PI / 2;
  B.speed = B.speed * screenratio + Math.abs(player.xspeed) + Math.abs(player.yspeed);
  B.damage = Math.round(B.damage * (B.companion ? 0.5 : 1));
  B.damageFallOff = Math.round(B.damageFallOff * (B.companion ? 0.5 : 1));
  B.width = B.widthOnPic * screenratio * (B.companion ? 0.5 : 1);
  B.height = B.heightOnPic * screenratio * (B.companion ? 0.5 : 1);
  B.opacity = 1;
  B.rotationAngle = 0;
  B.animationX = 0;
  B.animationIndex = 0;
  B.animationAngle = 0;
  B.damage = B.damage - Math.round(Math.random() * B.damageFallOff);
  switch (B.index) {
    case 0: //BASIC
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
      break;
    case 1: //DOUBLE
      if (numberOfBullets == 2) {
        B.dirx = Math.cos(player.angle - Math.PI / 2 + (1 / 180) * Math.PI);
        B.diry = Math.sin(player.angle - Math.PI / 2 + (1 / 180) * Math.PI);
      } else if (numberOfBullets == 1) {
        B.dirx = Math.cos(player.angle - Math.PI / 2 - (1 / 180) * Math.PI);
        B.diry = Math.sin(player.angle - Math.PI / 2 - (1 / 180) * Math.PI);
      }
      if (numberOfBullets > 1) {
        bulletList.push(
          bullet(
            {
              x: B.x,
              y: B.y,
              companion: B.companion,
              ...player.weapon,
            },
            numberOfBullets - 1
          )
        );
      }
      break;
    case 2: //SPRAY
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
          bullet(
            {
              x: B.x,
              y: B.y,
              companion: B.companion,
              ...player.weapon,
            },
            numberOfBullets - 1
          )
        );
      }
      break;
    case 3: //ROCKET
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
      B.explosion_radius = 150 * screenratio;
      B.explosion_triggered = false;
      B.explosion_countdown = 0;
      B.explosion_index = 0;
      B.explosion_angle = Math.random() * 2 * Math.PI;
      break;
    case 4: //SPREADER
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
      break;
    case 5: //LASER
      B.shootingPointX = B.x;
      B.shootingPointY = B.y;
      break;
    case 6: //CHAKRAM
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
      break;
    case 7: //NEONTHROWER
      B.dirx = Math.cos(player.angle - Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 6);
      B.diry = Math.sin(player.angle - Math.PI / 2 + ((Math.random() - 0.5) * Math.PI) / 6);
      break;
    case 8: //WAVE
      B.dirx = Math.cos(player.angle - Math.PI / 2);
      B.diry = Math.sin(player.angle - Math.PI / 2);
      break;
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
              hitBoxX: hitDetectionX - B.width / 2,
              hitBoxY: hitDetectionY - B.height / 2,
              hitBoxWidth: B.width,
              hitBoxHeight: B.height,
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
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = B.color;
      ctx.lineWidth = B.width * screenratio;
      ctx.moveTo(
        B.shootingPointX + Math.cos(player.angle - Math.PI / 2) * 20 * screenratio,
        B.shootingPointY + Math.sin(player.angle - Math.PI / 2) * 20 * screenratio
      );
      ctx.lineTo(B.x, B.y);
      ctx.stroke();
      ctx.restore();
    } else if (!B.explosion_triggered) {
      ctx.save();
      ctx.translate(B.x, B.y);
      B.angle = Math.atan2(B.diry, B.dirx) + Math.PI / 2 + B.rotationAngle;
      ctx.rotate(B.angle);
      ctx.globalAlpha = B.opacity;
      if (B.sprite != undefined) {
        ctx.drawImage(
          B.sprite,
          0 + B.widthOnPic * B.animationX,
          0,
          B.widthOnPic,
          B.heightOnPic,
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
    }
  };
  B.explode = function () {
    B.explosion_triggered = true;
    gameAudio.playSound("explosion");
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
