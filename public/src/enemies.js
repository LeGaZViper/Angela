//Check for total of enemies on the map | used in: win condition
var PARTS = 0;
async function checkDeath(enemy, bulletName) {
  if (enemy.HP <= 0 && !enemy.deathAnimation) {
    enemy.deathAnimation = true;
    if (enemy.randomDrop) {
      randomDropList.push(randomDrop({ x: enemy.x, y: enemy.y }));
    }
    if (enemy.type == "pirateMineDropper" && enemy.distance > 40) {
      enemyList.push(
        enemyCharacter({
          x: enemy.x,
          y: enemy.y,
          randomDrop: false,
          spawnCD: 0,
          ...enemyDatabase["pirateMine"],
        })
      );
    }
    if (bulletName == "SPREADER" && bulletList.length < 300) {
      for (let i = 0; i < 16; i++) {
        bulletList.push(
          bullet(
            {
              x: enemy.x,
              y: enemy.y,
              dirx: Math.cos((Math.PI / 8) * i),
              diry: Math.sin((Math.PI / 8) * i),
            },
            "SPREADER_PROJECTILE",
            1
          )
        );
      }
    }
    if (
      levels_handler.level.total == 1 &&
      enemy.sprite != sprite.enemy_pirateMine
    ) {
      await sleep(2000);
      levels_handler.level.total -= 1;
    } else if (enemy.type != "pirateMine") {
      levels_handler.level.total -= 1;
    }
    PARTS += enemy.PARTS;
  }
}
var enemyBulletList = [];
function enemyBullet(B, type, target) {
  B.ttl = 300;
  B.killed = false;
  B.damage = 1;
  B.speed = 15 * screenratio;
  B.color = "#FF0000";
  if (type == "BASIC") {
    if (target == "none") {
      B.dirx = player.earthX - B.x;
      B.diry = player.earthY - B.y;
    } else {
      B.dirx = target.x - B.x;
      B.diry = target.y - B.y;
    }
    B.width = 4 * screenratio;
    B.height = 25 * screenratio;
  }
  B.hitBoxWidth = (B.width / 3) * 2;
  B.hitBoxHeight = (B.height / 3) * 2;
  B.update = function () {
    let ratio = B.speed / (Math.abs(B.dirx) + Math.abs(B.diry));
    B.xspeed = ratio * B.dirx;
    B.yspeed = ratio * B.diry;

    B.x += B.xspeed - player.xspeed - camera.offSetX;
    B.y += B.yspeed - player.yspeed - camera.offSetY;
    B.hitBoxX = B.x - B.hitBoxWidth / 2;
    B.hitBoxY = B.y - B.hitBoxHeight / 2;
    B.calcTTL();
  };
  B.render = function () {
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
        B.width,
        B.height,
        -B.width / 2,
        -B.height / 2,
        B.width,
        B.height
      );
    } else {
      ctx.fillStyle = B.color;
      ctx.fillRect(-B.width / 2, -B.height / 2, B.width, B.height);
      ctx.fill();
    }
    ctx.restore();
    ctx.stroke();
    ctx.closePath();
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
//enemy objects
var enemyList = [];
function enemyCharacter(E) {
  E.appearOpacity = 0;
  E.appear = async function () {
    for (let i = 1; i <= 100; i++) {
      E.appearOpacity = i / 100;
      await sleep(10);
    }
  };
  E.animation = false;
  E.attackCDvalue = 2000;
  E.coordX = player.spaceSize / 2 + E.x - player.earthX;
  E.coordY = player.spaceSize / 2 + E.y - player.earthY;
  E.deathAnimation = false;
  E.deathAnimation_angle = Math.random() * 2 * Math.PI;
  E.deathAnimation_index = 0;
  E.deathAnimation_countdown = 0;
  E.killed = false;
  E.animationX = 0;
  E.animationY = 0;
  E.animationIndex = 0;
  E.counter = 0;
  E.arrival = false;
  E.particlesWidth = 1;
  E.particlesHeight = 0.2;
  E.target = "none";
  E.orbitAngle =
    Math.atan2(player.earthX - E.y, player.earthY - E.x) + Math.PI / 2;
  E.angle = Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI / 2;
  if (E.hitBoxWidth == undefined) {
    E.hitBoxWidth = (E.width / 3) * 2;
    E.hitBoxHeight = (E.height / 3) * 2;
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;
  }
  E.update = function () {
    if (E.appearOpacity == 0) E.appear();
    if (E.speed != 0 && E.particlesHeight < 1) {
      E.particlesWidth += E.particles[3];
      E.particlesHeight += E.particles[4];
    } else if (E.speed == 0 && E.particlesHeight > 0.2) {
      E.particlesWidth -= E.particles[3];
      E.particlesHeight -= E.particles[4];
    }
    E.attack();
    if (!E.inOrbit && E.target == "none") {
      if (
        E.behaviour != "chase" ||
        ((Math.abs(E.x - player.earthX) > player.spaceSize / 2 ||
          Math.abs(E.y - player.earthY) > player.spaceSize / 2) &&
          E.behaviour == "chase")
      ) {
        E.randomDirCDcounter = 120;
        E.randomDirX = Math.cos(Math.random() * 2 * Math.PI);
        E.randomDirY = Math.sin(Math.random() * 2 * Math.PI);
        let ratio =
          E.speed /
          (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
        E.xspeed = ratio * (player.earthX - E.x);
        E.yspeed = ratio * (player.earthY - E.y);

        E.x += E.xspeed;
        E.y += E.yspeed;
        E.coordX += E.xspeed;
        E.coordY += E.yspeed;
      } else {
        E.randomDirCD();
        E.angle = Math.atan2(E.randomDirY, E.randomDirX) + Math.PI / 2;
        let ratio = E.speed / (Math.abs(E.randomDirX) + Math.abs(E.randomDirY));
        E.xspeed = ratio * E.randomDirX;
        E.yspeed = ratio * E.randomDirY;

        E.x += E.xspeed;
        E.y += E.yspeed;
        E.coordX += E.xspeed;
        E.coordY += E.yspeed;
      }
    } else if (E.inOrbit && E.target == "none") {
      E.orbitAngle -= 0.01;
      E.x += E.speed * Math.cos(E.orbitAngle);
      E.y += E.speed * Math.sin(E.orbitAngle);
      E.coordX += E.xspeed;
      E.coordY += E.yspeed;
    } else {
      let ratio =
        E.speed / (Math.abs(E.target.x - E.x) + Math.abs(E.target.y - E.y));

      E.xspeed = ratio * (E.target.x - E.x);
      E.yspeed = ratio * (E.target.y - E.y);
      E.x += E.xspeed;
      E.y += E.yspeed;
      E.coordX += E.xspeed;
      E.coordY += E.yspeed;
    }
    E.x += -player.xspeed - camera.offSetX;
    E.y += -player.yspeed - camera.offSetY;
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;
  };
  E.render = function () {
    let x1 = parseInt(-(E.HP / E.maxHP - 1) * 255).toString(16);
    let x2 = parseInt((E.HP / E.maxHP) * 255).toString(16);
    if (x1.length == 1) x1 = "0" + x1;
    if (x2.length == 1) x2 = "0" + x2;
    let x = "#" + x1 + x2 + "00";
    if (E.animation) {
      E.animationIndex += 1;
      if (E.animationIndex == 60 / E.animationFPS) {
        E.animationIndex = 0;
        if (E.animationX < E.widthOnPic * (E.animationFrames - 1))
          E.animationX += E.widthOnPic;
        else E.animationX = 0;
      }
    }
    ctx.beginPath();
    ctx.save();
    ctx.translate(E.x, E.y);
    if (!E.inOrbit) ctx.rotate(E.angle);
    else
      ctx.rotate(
        Math.atan2(player.earthY - E.y, player.earthX - E.x) - Math.PI
      );
    //normal enemy ship
    ctx.globalAlpha = E.appearOpacity;
    ctx.drawImage(
      E.sprite,
      0 + E.animationX,
      E.heightOnPic + 1,
      E.widthOnPic,
      E.particles[0],
      -E.width / 2,
      E.height / 2 + E.particles[2],
      E.width * E.particlesWidth,
      E.particles[1] * E.particlesHeight
    );
    ctx.drawImage(
      E.sprite,
      0 + E.animationX,
      0,
      E.widthOnPic,
      E.heightOnPic,
      -E.width / 2,
      -E.height / 2,
      E.width,
      E.height
    );
    //damaged enemy ship
    ctx.globalAlpha = E.opacity;
    ctx.drawImage(
      E.sprite,
      0 + E.animationX,
      2 * E.heightOnPic + E.particles[0] + 3,
      E.widthOnPic,
      E.particles[0],
      -E.width / 2,
      E.height / 2 + E.particles[2],
      E.width * E.particlesWidth,
      E.particles[1] * E.particlesHeight
    );
    ctx.drawImage(
      E.sprite,
      0 + E.animationX,
      E.heightOnPic + E.particles[0] + 2,
      E.widthOnPic,
      E.heightOnPic,
      -E.width / 2,
      -E.height / 2,
      E.width,
      E.height
    );
    ctx.restore();
    if (E.type == "pirateVessel") {
      ctx.save();
      ctx.globalAlpha = E.appearOpacity;
      if (!E.inOrbit) {
        E.cannon1X =
          -(32 * screenratio) *
            Math.cos(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI
            ) +
          E.x;
        E.cannon1Y =
          -(32 * screenratio) *
            Math.sin(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI
            ) +
          E.y;
        E.cannon2X =
          35 *
            screenratio *
            Math.cos(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI
            ) +
          E.x;
        E.cannon2Y =
          35 *
            screenratio *
            Math.sin(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI
            ) +
          E.y;
        ctx.translate(E.cannon1X, E.cannon1Y);
        ctx.rotate(
          Math.atan2(player.earthY - E.cannon1Y, player.earthX - E.cannon1X) +
            Math.PI / 2
        );
        ctx.drawImage(
          sprite.enemy_pirateVesselturret,
          0,
          0,
          24,
          36,
          -12 * screenratio,
          -26 * screenratio,
          24 * screenratio,
          36 * screenratio
        );
        ctx.restore();
        ctx.save();
        ctx.translate(E.cannon2X, E.cannon2Y);
        ctx.rotate(
          Math.atan2(player.earthY - E.cannon2Y, player.earthX - E.cannon2X) -
            Math.PI / 2
        );
        ctx.drawImage(
          sprite.enemy_pirateVesselturret,
          0,
          0,
          24,
          36,
          -12 * screenratio,
          -26 * screenratio,
          24 * screenratio,
          36 * screenratio
        );
      } else {
        E.cannon1X =
          -(32 * screenratio) *
            Math.cos(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) - Math.PI / 2
            ) +
          E.x;
        E.cannon1Y =
          -(32 * screenratio) *
            Math.sin(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) - Math.PI / 2
            ) +
          E.y;
        E.cannon2X =
          35 *
            screenratio *
            Math.cos(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) - Math.PI / 2
            ) +
          E.x;
        E.cannon2Y =
          35 *
            screenratio *
            Math.sin(
              Math.atan2(player.earthY - E.y, player.earthX - E.x) - Math.PI / 2
            ) +
          E.y;
        ctx.translate(E.cannon1X, E.cannon1Y);
        ctx.rotate(
          Math.atan2(player.earthY - E.cannon1Y, player.earthX - E.cannon1X) +
            Math.PI / 2
        );
        ctx.drawImage(
          sprite.enemy_pirateVesselturret,
          0,
          0,
          24,
          36,
          -12 * screenratio,
          -26 * screenratio,
          24 * screenratio,
          36 * screenratio
        );
        ctx.restore();
        ctx.save();
        ctx.translate(E.cannon2X, E.cannon2Y);
        ctx.rotate(
          Math.atan2(player.earthY - E.cannon2Y, player.earthX - E.cannon2X) +
            Math.PI / 2
        );
        ctx.drawImage(
          sprite.enemy_pirateVesselturret,
          0,
          0,
          24,
          36,
          -12 * screenratio,
          -26 * screenratio,
          24 * screenratio,
          36 * screenratio
        );
      }
      ctx.restore();
    }
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#606060";
    ctx.fillRect(E.x - 15, E.y - 25, 30, 5);
    ctx.fillStyle = x;
    ctx.fillRect(E.x - 15, E.y - 25, (E.HP / E.maxHP) * 30, 5);
    ctx.strokeStyle = "#000000";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeRect(E.x - 15, E.y - 25, 30, 5);
    ctx.stroke();
    ctx.closePath();
  };
  E.deathAnimation_render = function () {
    E.x += -player.xspeed - camera.offSetX; //So that explosions won't move with the player
    E.y += -player.yspeed - camera.offSetY;
    if (!E.killed) {
      E.deathAnimation_countdown += 1;
      if (E.deathAnimation_countdown % 5 == 0) {
        let distance =
          Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y);
        E.deathAnimation_angle = Math.random() * 2 * Math.PI;
        E.deathAnimation_index += 1;
        if (
          E.deathAnimation_index == 1 &&
          E.type == "pirateMinedropper" &&
          distance >= 40
        )
          enemyList.push(enemyCharacter({ x: E.x, y: E.y }, "pirateMine"));
      }
      ctx.beginPath();
      ctx.save();
      ctx.translate(E.x, E.y);
      ctx.rotate(E.deathAnimation_angle);
      ctx.drawImage(
        sprite.projectile_explosion,
        0,
        150 * E.deathAnimation_index,
        150,
        150,
        -(E.width + 20) / 2,
        -(E.width + 20) / 2,
        E.width + 20,
        E.width + 20
      );
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if (E.deathAnimation_index == 11) E.killed = true;
    }
  };
  //Cooldowns
  E.attackCD = false;
  E.piercingCD = false;
  E.opacity = 0;
  E.attack = function () {
    E.distance = Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y);
    if (E.behaviour == "orbit") {
      if (E.distance < 500 * screenratio && !E.inOrbit) {
        E.inOrbit = true;
        E.arrival = true;
        E.attackCDstart();
      } else if (E.inOrbit && !E.attackCD) {
        E.attackCDstart();
        if (E.type == "pirateVessel") {
          if (Math.random() < 0.5)
            enemyBulletList.push(
              enemyBullet({ x: E.cannon1X, y: E.cannon1Y }, "BASIC")
            );
          else
            enemyBulletList.push(
              enemyBullet({ x: E.cannon2X, y: E.cannon2Y }, "BASIC")
            );
        } else enemyBulletList.push(enemyBullet({ x: E.x, y: E.y }, "BASIC"));
      }
    } else if (E.behaviour == "mine") {
      if (E.distance < 40 * screenratio && E.HP > 0) {
        E.HP = 0;
        player.HP[0] -= 2;
        checkDeath(E, "BASIC");
      }
    } else if (E.behaviour == "ignore") {
      if (E.distance < 240 * screenratio && !E.arrival) {
        E.speed = 0;
        E.arrival = true;
        E.attackCDstart();
      } else if (E.arrival && !E.attackCD) {
        E.attackCDstart();
        enemyBulletList.push(enemyBullet({ x: E.x, y: E.y }, "BASIC", "none"));
      }
    } else if (E.behaviour == "chase") {
      playerList.forEach((p) => {
        E.chaseDistance = Math.abs(p.x - E.x) + Math.abs(p.y - E.y);
        if (
          E.chaseDistance < 800 * screenratio &&
          E.target == "none" &&
          p.HP[1] > 0
        ) {
          E.target = p;
        }
      });
      if (E.target != "none") {
        E.chaseDistance =
          Math.abs(E.target.x - E.x) + Math.abs(E.target.y - E.y);
        E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
        if (E.chaseDistance > 800 * screenratio || E.target.HP[1] == 0) {
          E.randomDirX = E.target.x - E.x;
          E.randomDirY = E.target.y - E.y;
          E.target = "none";
          E.speed = E.defaultSpeed;
          E.randomDirCDcounter = 120;
        } else if (E.chaseDistance < 200 * screenratio) {
          E.speed = 0;
          if (!E.attackCD) {
            E.attackCDstart();
            enemyBulletList.push(
              enemyBullet({ x: E.x, y: E.y }, "BASIC", E.target)
            );
          }
        } else {
          E.speed = E.defaultSpeed;
        }
      }
    }
  };
  E.attackCDstart = async function () {
    E.attackCD = true;
    await sleep(E.attackCDvalue);
    E.attackCD = false;
  };
  E.hitCDstart = async function () {
    E.opacity = 0.51;
    for (let i = 50; i >= 0; i--) {
      if (E.opacity != (i + 1) / 100) {
        break;
      } else {
        E.opacity = i / 100;
        await sleep(10);
      }
    }
  };
  E.piercingDamageCDstart = async function (cd) {
    E.piercingCD = true;
    await sleep(cd);
    E.piercingCD = false;
  };
  E.randomDirCDcounter = 1;
  E.randomDirCD = function () {
    E.randomDirCDcounter -= 1;
    if (E.randomDirCDcounter === 0) {
      E.randomDirCDcounter = 120;
      E.randomDirX = Math.cos(Math.random() * 2 * Math.PI);
      E.randomDirY = Math.sin(Math.random() * 2 * Math.PI);
    }
  };
  return E;
}
