//Weapon choosing function | used in weapons
function chooseWeapon(name) {
  for (var index in weaponDatabase) {
    if (weaponDatabase[index].name == name) {
      ship.weapon = weaponDatabase[index];
      weaponDuration =
        ship.weapon.duration + (ship.weapon.duration * ship.weaponDuration) / 5;
      saveLocalStorage();
      break;
    }
  }
}

var randomDropList = [];
function randomDrop(R) {
  R.width = 75 * screenratio;
  R.height = 75 * screenratio;
  R.hitBoxWidth = (R.width / 3) * 2;
  R.hitBoxHeight = (R.height / 3) * 2;
  R.hitBoxX = R.x - R.hitBoxWidth / 2;
  R.hitBoxY = R.y - R.hitBoxHeight / 2;
  let choose = Math.floor(Math.random() * 6) + 1;
  for (let index in weaponDatabase) {
    if (choose == weaponDatabase[index].index) {
      R.name = weaponDatabase[index].name;
    }
  }
  R.update = function() {
    R.x -= player.xspeed;
    R.y -= player.yspeed;
    R.hitBoxX = R.x - R.hitBoxWidth / 2;
    R.hitBoxY = R.y - R.hitBoxHeight / 2;
  };
  R.render = function() {
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
var weaponDuration = 0;
function bullet(B, name, numberOfBullets) {
  B.killed = false;
  B.name = name;
  B.damage = ship.weapon.damage;
  B.speed = ship.weapon.speed * screenratio;
  B.width = ship.weapon.width * screenratio;
  B.height = ship.weapon.height * screenratio;
  B.piercing = ship.weapon.piercing;
  B.color = ship.weapon.color;
  B.opacity = 1;
  if (name == "BASIC") {
  } else if (name == "DOUBLE") {
    if (numberOfBullets == 2) {
      B.dirx = Math.cos(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) + (1 / 180) * Math.PI
      );
      B.diry = Math.sin(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) + (1 / 180) * Math.PI
      );
    } else if (numberOfBullets == 1) {
      B.dirx = Math.cos(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) - (1 / 180) * Math.PI
      );
      B.diry = Math.sin(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) - (1 / 180) * Math.PI
      );
    }
    if (numberOfBullets > 1) {
      bulletList.push(bullet({ x: player.x, y: player.y }, name, numberOfBullets - 1));
    }
  } else if (name == "SPRAY") {
    if (numberOfBullets == 3) {
      B.dirx = xMousePos - player.x;
      B.diry = yMousePos - player.y;
    } else if (numberOfBullets == 2) {
      B.dirx = Math.cos(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) + (3 / 180) * Math.PI
      );
      B.diry = Math.sin(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) + (3 / 180) * Math.PI
      );
    } else if (numberOfBullets == 1) {
      B.dirx = Math.cos(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) - (3 / 180) * Math.PI
      );
      B.diry = Math.sin(
        Math.atan2(yMousePos - player.y, xMousePos - player.x) - (3 / 180) * Math.PI
      );
    }
    if (numberOfBullets > 1) {
      bulletList.push(bullet({ x: player.x, y: player.y }, name, numberOfBullets - 1));
    }
  } else if (name == "ROCKET") {
    B.sprite = sprite.projectile_rocket;
    B.explosive = true;
    B.explosion_radius = 150 * screenratio;
    B.explosion_triggered = false;
    B.explosion_countdown = 0;
    B.explosion_index = 0;
    B.explosion_angle = Math.random() * 2 * Math.PI;
  } else if (name == "GIANT") {
  } else if (name == "SPREADER") {
    B.sprite = sprite.projectile_spread;
  } else if (name == "SPREADER_PROJECTILE") {
    B.sprite = sprite.projectile_spreadProjectile;
  }
  B.hitBoxWidth = (B.width / 3) * 2;
  B.hitBoxHeight = (B.height / 3) * 2;
  B.hitBoxX = B.x - B.hitBoxWidth / 2;
  B.hitBoxY = B.y - B.hitBoxHeight / 2;
  B.update = function() {
    if (name == "LASER") {
      let hitDetectionX = player.x;
      let hitDetectionY = player.y;
      B.dirx = xMousePos - player.x;
      B.diry = yMousePos - player.y;
      let ratio = 6 / (Math.abs(B.dirx) + Math.abs(B.diry));
      for (let i = 0; i < 200; i++) {
        hitDetectionX += B.dirx * ratio;
        hitDetectionY += B.diry * ratio;
        enemyList.forEach(e => {
          if (
            !e.piercingCD &
            collides(e, {
              hitBoxX: hitDetectionX - 3,
              hitBoxY: hitDetectionY - 3,
              hitBoxWidth: 6,
              hitBoxHeight: 6
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
      bulletList = bulletList.filter(
        check =>
          !(
            check.x < -canvas.width ||
            check.x > canvas.width * 2 ||
            check.y < -canvas.height ||
            check.y > canvas.height * 2
          )
      );

      let ratio = B.speed / (Math.abs(B.dirx) + Math.abs(B.diry));
      B.xspeed = ratio * B.dirx;
      B.yspeed = ratio * B.diry;

      B.x += B.xspeed - player.xspeed;
      B.y += B.yspeed - player.yspeed;
      B.hitBoxX = B.x - B.hitBoxWidth / 2;
      B.hitBoxY = B.y - B.hitBoxHeight / 2;
    }
  };
  B.render = function() {
    if (name == "LASER") {
      ctx.beginPath();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = B.color;
      ctx.lineWidth = 6 * screenratio;
      ctx.moveTo(player.x, player.y);
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
  B.explode = function() {
    B.explosion_triggered = true;
    B.speed = 0;
    enemyList.forEach(e => {
      if (
        collides(e, {
          hitBoxX: B.x - B.explosion_radius / 2,
          hitBoxY: B.y - B.explosion_radius / 2,
          hitBoxWidth: B.explosion_radius,
          hitBoxHeight: B.explosion_radius
        })
      ) {
        e.HP -= B.damage;
        e.hitCDstart();
        checkDeath(e, "ROCKET");
      }
    });
  };
  B.explosion_render = function() {
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
  return B;
}
