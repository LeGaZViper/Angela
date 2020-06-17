//Check for total of enemies on the map | used in: win condition
async function checkDeath(enemy, bulletType = "none") {
  if (enemy.HP <= 0 && !enemy.deathAnimation) {
    gameAudio.playSound("enemy_death");
    enemy.deathAnimation = true;
    if (enemy.cache != undefined) {
      for (let i = 0; i < enemy.cache[1]; i++) {
        enemyList.push(
          enemyCharacter({
            randomDirCDcounter: 120,
            x:
              enemy.x +
              Math.cos((2 * Math.PI) / enemy.cache[1]) *
                (i + 1) *
                20 *
                (Math.random() >= 0.5 ? 1 : -1),
            y:
              enemy.y +
              Math.sin((2 * Math.PI) / enemy.cache[1]) *
                (i + 1) *
                20 *
                (Math.random() >= 0.5 ? 1 : -1),
            randomDrop: false,
            spawnCD: 0,
            ...EnemyData[enemy.cache[0]],
          })
        );
        levels_handler.level.total += 1;
      }
    }
    if (bulletType == "SPREADER" && bulletList.length < 300) {
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
    if (levels_handler.level.total == 1) {
      await sleep(2000);
      if (levels_handler.level.total == 1) levels_handler.level.total -= 1;
    } else {
      levels_handler.level.total -= 1;
    }
  }
}
var enemyBulletList = [];
function enemyBullet(B, type, target) {
  B.ttl = 300;
  B.killed = false;
  B.speed = 15 * screenratio;
  B.opacity = 1;
  if (type == "BASIC") {
    B.damage = 20;
    B.speed = 15 * screenratio;
    B.sprite = sprite.projectile_enemyBASIC;
    if (target == "none") {
      B.dirx = player.earthX - B.x;
      B.diry = player.earthY - B.y;
    } else {
      B.dirx = target.x - B.x;
      B.diry = target.y - B.y;
    }
    B.width = 5 * screenratio;
    B.height = 50 * screenratio;
  } else if (type == "MINIBASIC") {
    B.damage = 10;
    B.speed = 10 * screenratio;
    B.sprite = sprite.projectile_enemyBASIC;
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
    if (B.sprite != undefined) {
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
  E.width *= screenratio;
  E.height *= screenratio;
  E.speed *= screenratio;
  E.defaultSpeed *= screenratio;
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
  E.arrival = false;
  E.acceleration = 100;
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
    E.checkBehaviour();
    if (
      Math.abs(E.x - player.earthX) > player.spaceSize / 2 ||
      Math.abs(E.y - player.earthY) > player.spaceSize / 2
    ) {
      //check for miss position
      E.randomDirCDCounter = 300;
      E.randomDirX = Math.cos(Math.random() * 2 * Math.PI);
      E.randomDirY = Math.sin(Math.random() * 2 * Math.PI);
      let ratio =
        E.speed /
        (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
      E.xspeed = ratio * (player.earthX - E.x);
      E.yspeed = ratio * (player.earthY - E.y);
    } else {
      if (E.behaviour == "ignore") {
        let ratio =
          E.speed /
          (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
        E.xspeed = ratio * (player.earthX - E.x);
        E.yspeed = ratio * (player.earthY - E.y);
      } else if (E.behaviour == "orbit") {
        if (E.inOrbit) {
          E.orbitAngle -= 0.01;

          E.xspeed = E.speed * Math.cos(E.orbitAngle);
          E.yspeed = E.speed * Math.sin(E.orbitAngle);
        } else {
          let ratio =
            E.speed /
            (Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y));
          E.xspeed = ratio * (player.earthX - E.x);
          E.yspeed = ratio * (player.earthY - E.y);
        }
      } else if (
        E.behaviour == "spawn" ||
        (E.target == "none" && E.behaviour == "chase")
      ) {
        E.randomDirCD();
        E.angle = Math.atan2(E.randomDirY, E.randomDirX) + Math.PI / 2;
        let ratio = E.speed / (Math.abs(E.randomDirX) + Math.abs(E.randomDirY));
        E.xspeed = ratio * E.randomDirX;
        E.yspeed = ratio * E.randomDirY;
      } else {
        E.randomDirCDcounter = 300;
        let ratio =
          E.speed / (Math.abs(E.target.x - E.x) + Math.abs(E.target.y - E.y));
        E.xspeed = (ratio * (E.target.x - E.x) * E.acceleration) / 100;
        E.yspeed = (ratio * (E.target.y - E.y) * E.acceleration) / 100;
      }
    }

    E.x += E.xspeed - player.xspeed - camera.offSetX;
    E.y += E.yspeed - player.yspeed - camera.offSetY;
    E.coordX += E.xspeed;
    E.coordY += E.yspeed;
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;
  };
  E.render = function () {
    if (E.animation && !E.spawning) {
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
    if (!E.inOrbit && E.type != "mail" && E.type != "star") ctx.rotate(E.angle);
    else if (E.type != "mail" && E.type != "star")
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
      2 * E.heightOnPic + E.particles[0],
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
      E.heightOnPic + E.particles[0],
      E.widthOnPic,
      E.heightOnPic,
      -E.width / 2,
      -E.height / 2,
      E.width,
      E.height
    );
    ctx.restore();
    //let colorHPbar_1 = parseInt((E.HP / E.maxHP) * 255).toString(16);
    //if (colorHPbar_1.length == 1) colorHPbar_1 = "0" + colorHPbar_1;
    let colorHPbar = "white";
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#606060";
    ctx.fillRect(E.x - 15, E.y + E.height / 2, 30, 5);
    ctx.fillStyle = colorHPbar;
    ctx.fillRect(E.x - 15, E.y + E.height / 2, (E.HP / E.maxHP) * 30, 5);
    ctx.strokeStyle = "#000000";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeRect(E.x - 15, E.y + E.height / 2, 30, 5);
    ctx.stroke();
    ctx.closePath();
  };
  E.deathAnimation_render = function () {
    E.x += -player.xspeed - camera.offSetX; //So that explosions won't move with the player
    E.y += -player.yspeed - camera.offSetY;
    if (!E.killed) {
      E.deathAnimation_countdown += 1;
      if (E.deathAnimation_countdown % E.deathAnimationFPS == 0) {
        E.deathAnimation_angle = Math.random() * 2 * Math.PI;
        E.deathAnimation_index += 1;
      }
      ctx.beginPath();
      ctx.save();
      ctx.translate(E.x, E.y);
      if (E.type == "smallCube" || E.type == "largeCube")
        ctx.rotate(E.deathAnimation_angle);
      ctx.drawImage(
        E.sprite,
        E.widthOnPic * E.deathAnimation_index,
        2 * E.heightOnPic,
        E.widthOnPic,
        E.heightOnPic,
        -E.width / 2,
        -E.height / 2,
        E.width,
        E.height
      );
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if (E.deathAnimation_index == E.deathAnimationFrames) {
        E.killed = true;
        E.deathAnimation = false;
        if (E.randomDrop) {
          randomDropList.push(randomDrop({ x: E.x, y: E.y }));
        }
      }
    }
  };
  //Cooldowns
  E.attackCD = false;
  E.piercingCD = false;
  E.opacity = 0;
  E.checkBehaviour = function () {
    E.distance = Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y);
    if (E.behaviour == "orbit") {
      if (E.distance < 500 * screenratio && !E.inOrbit) {
        E.inOrbit = true;
        E.arrival = true;
        E.attackCDstart();
      } else if (E.inOrbit && !E.attackCD) {
        E.attackCDstart();
        gameAudio.playSound("enemy_bullet");
        enemyBulletList.push(enemyBullet({ x: E.x, y: E.y }, E.bulletType));
      }
    } else if (E.behaviour == "mine") {
      if (E.distance < 40 * screenratio && E.HP > 0) {
        E.HP = 0;
        if (player.shield[0] >= 2) player.shield[0] -= 2;
        else if (player.shield[0] == 1) {
          player.shield[0] -= 1;
          player.HP[0] -= 1;
        } else {
          player.HP[0] -= 2;
        }
        checkDeath(E);
      }
    } else if (E.behaviour == "ignore") {
      if (E.distance < 240 * screenratio && !E.arrival) {
        E.speed = 0;
        E.arrival = true;
        E.attackCDstart();
      } else if (E.arrival && !E.attackCD) {
        E.attackCDstart();
        gameAudio.playSound("enemy_bullet");
        enemyBulletList.push(
          enemyBullet({ x: E.x, y: E.y }, E.bulletType, "none")
        );
      }
    } else if (E.behaviour == "chase") {
      E.chaseDistance = Math.abs(player.x - E.x) + Math.abs(player.y - E.y);
      if (
        E.chaseDistance < 800 * screenratio &&
        E.target == "none" &&
        player.HP[1] > 0
      ) {
        E.target = player;
      }
      if (E.target != "none") {
        E.chaseDistance =
          Math.abs(E.target.x - E.x) + Math.abs(E.target.y - E.y);
        E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
        if (E.chaseDistance > 900 * screenratio || E.target.HP[1] == 0) {
          if (E.acceleration <= 99) E.acceleration += 1;
          else E.acceleration = 100;
          E.randomDirX = E.target.x - E.x;
          E.randomDirY = E.target.y - E.y;
          E.target = "none";
          E.speed = E.defaultSpeed;
          E.randomDirCDcounter = 120;
        } else if (E.chaseDistance < 650 * screenratio) {
          if (E.acceleration >= 1) E.acceleration -= 1;
          else E.acceleration = 0;
          if (!E.attackCD) {
            E.attackCDstart();
            gameAudio.playSound("enemy_bullet");
            enemyBulletList.push(
              enemyBullet({ x: E.x, y: E.y }, E.bulletType, E.target)
            );
          }
        } else {
          E.speed = E.defaultSpeed;
        }
      } else {
        if (E.acceleration <= 99) E.acceleration += 1;
        else E.acceleration = 100;
      }
    } else if (E.behaviour == "spawn") {
      if (E.spawning) E.spawnSummonTick();
      E.spawnDistance = Math.abs(player.x - E.x) + Math.abs(player.y - E.y);
      if (E.spawnDistance < 450 * screenratio && !E.spawning && !E.attackCD) {
        E.spawning = true;
        if (E.type == "mail") E.speed = 0;
        E.attackCDstart();
      } else {
        E.speed = E.defaultSpeed;
      }
    } else if (E.behaviour == "collide") {
      E.target = player;
      E.angle = Math.atan2(E.target.y - E.y, E.target.x - E.x) + Math.PI / 2;
    }
  };
  E.spawnSummonTick = function () {
    if (E.type == "mail") {
      E.spawnAnimationIndex += 1;
      if (E.spawnAnimationIndex == 60 / E.spawnAnimationFPS) {
        E.spawnAnimationIndex = 0;
        if (E.animationX < E.widthOnPic * (E.spawnAnimationFrames - 1))
          E.animationX += E.widthOnPic;
        else {
          E.spawning = false;
          enemyList.push(
            enemyCharacter({
              randomDirCDcounter: 120,
              x: E.x,
              y: E.y,
              randomDrop: false,
              spawnCD: 0,
              ...EnemyData[E.bulletType],
            })
          );
          levels_handler.level.total += 1;
          E.animationX = 0;
        }
      }
    } else if (E.type == "star") {
      for (let i = 0; i < 7; i++) {
        let angle = (Math.PI / 4) * i;
        enemyList.push(
          enemyCharacter({
            randomDirCDcounter: 120,
            x: E.x + Math.cos(angle) * 100 * screenratio,
            y: E.y + Math.sin(angle) * 100 * screenratio,
            randomDrop: false,
            spawnCD: 0,
            ...EnemyData[E.bulletType],
          })
        );
        levels_handler.level.total += 1;
      }
      E.spawning = false;
    }
  };
  E.attackCDstart = async function () {
    E.attackCD = true;
    await sleep(E.attackCDvalue);
    E.attackCD = false;
  };
  E.attackCDstart();
  E.hitCDstart = async function () {
    E.opacity = 0.71;
    for (let i = 70; i >= 0; i--) {
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
      E.randomDirCDcounter = 300;
      E.randomDirX = Math.cos(Math.random() * 2 * Math.PI);
      E.randomDirY = Math.sin(Math.random() * 2 * Math.PI);
    }
  };
  if (E.appearOpacity == 0) E.appear();
  return E;
}

var damageNumberList = [];
class DamageNumber {
  constructor(amount, x, y) {
    this.text = amount;
    this.x =
      x + Math.floor(Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1));
    this.y =
      y + Math.floor(Math.random() * 20 * (Math.random() > 0.5 ? 1 : -1));
    this.ttl = 60;
  }
  update_render() {
    this.x += 1;
    this.y -= 1;
    this.x += -(player.xspeed + camera.offSetX);
    this.y += -(player.yspeed + camera.offSetY);
    this.ttl--;
    ctx.fillStyle = "#8C95FF";
    ctx.globalAlpha = 0.6;
    ctx.font = 20 * screenratio + "px FFFFORWA";
    ctx.fillText(this.text, this.x, this.y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "black";
    ctx.strokeText(this.text, this.x, this.y);
  }
}
