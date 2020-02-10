//Check for total of enemies on the map | used in: win condition
var PARTS = 0;
async function checkDeath(enemy, bulletName) {
  if (enemy.HP <= 0 && !enemy.deathAnimation) {
    enemy.deathAnimation = true;
    if (Math.round(Math.random() * 10) == 1) {
      randomDropList.push(randomDrop({ x: enemy.x, y: enemy.y }));
    }
    if (bulletName == "SPREADER" && bulletList.length < 300) {
      for (let i = 0; i < 16; i++) {
        bulletList.push(
          bullet(
            {
              x: enemy.x,
              y: enemy.y,
              dirx: Math.cos((Math.PI / 8) * i),
              diry: Math.sin((Math.PI / 8) * i)
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
    } else if (enemy.sprite != sprite.enemy_pirateMine) {
      levels_handler.level.total -= 1;
    }
    PARTS += enemy.PARTS;
  }
}
var enemyBulletList = [];
function enemyBullet(B, type) {
  B.killed = false;
  B.damage = 1;
  B.speed = 15 * screenratio;
  B.color = "#FF0000";
  if (type == "BASIC") {
    B.dirx = player.earthX - B.x;
    B.diry = player.earthY - B.y;
    B.width = 4 * screenratio;
    B.height = 25 * screenratio;
  }
  B.hitBoxWidth = (B.width / 3) * 2;
  B.hitBoxHeight = (B.height / 3) * 2;
  B.update = function() {
    let ratio = B.speed / (Math.abs(B.dirx) + Math.abs(B.diry));
    B.xspeed = ratio * B.dirx;
    B.yspeed = ratio * B.diry;

    B.x += B.xspeed - player.xspeed;
    B.y += B.yspeed - player.yspeed;
    B.hitBoxX = B.x - B.hitBoxWidth / 2;
    B.hitBoxY = B.y - B.hitBoxHeight / 2;
  };
  B.render = function() {
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
  return B;
}
//enemy objects
var enemyList = [];
function enemyCharacter(E, type) {
  E.appearOpacity = 0;
  E.appear = async function() {
    for (let i = 1; i <= 100; i++) {
      E.appearOpacity = i / 100;
      await sleep(10);
    }
  };
  E.appear();
  E.animation = false;
  E.attackCDvalue = 2000;
  if (type == "buzz") {
    E.sprite = sprite.enemy_buzz;
    E.widthOnPic = 56;
    E.heightOnPic = 62;
    E.hit = 0;
    //Ingame stats
    E.width = 45 * screenratio;
    E.height = 50 * screenratio;
    E.speed = 2 * screenratio;
    E.HP = 6;
    E.maxHP = 6;
    E.PARTS = 15;
    E.particles = [10, 10 * screenratio, -1 * screenratio, 0, 0.1];
  } else if (type == "tooth") {
    E.sprite = sprite.enemy_tooth;
    E.widthOnPic = 64;
    E.heightOnPic = 64;
    E.hit = 0;
    //Ingame stats
    E.width = 75 * screenratio;
    E.height = 75 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.PARTS = 15;
    E.particles = [10, 10 * screenratio, -1 * screenratio, 0, 0.1];
  } else if (type == "sharkfin") {
    // 1 - sharkfin
    E.sprite = sprite.enemy_sharkfin;
    E.widthOnPic = 64;
    E.heightOnPic = 60;
    E.hit = 0;
    //Ingame stats
    E.width = 50 * screenratio;
    E.height = 45 * screenratio;
    E.speed = 3 * screenratio;
    E.HP = 3;
    E.maxHP = 3;
    E.PARTS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [10, 10 * screenratio, -12 * screenratio, 0, 0.1];
  } else if (type == "goblin") {
    // 2 - goblin
    E.sprite = sprite.enemy_goblin;
    E.widthOnPic = 76;
    E.heightOnPic = 100;
    //Ingame stats
    E.width = 76 * screenratio;
    E.height = 100 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.PARTS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [22, 22 * screenratio, -1 * screenratio, 0, 0.1];
  } else if (type == "SG40") {
    // 2 - goblin
    E.sprite = sprite.enemy_SG40;
    E.widthOnPic = 48;
    E.heightOnPic = 50;
    //Ingame stats
    E.width = 48 * screenratio;
    E.height = 50 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.PARTS = 10;
    E.particles = [0, 0 * screenratio, 0 * screenratio, 0, 0];
  } else if (type == "pirateRaider") {
    E.sprite = sprite.enemy_pirateRaider;
    E.widthOnPic = 60;
    E.heightOnPic = 32;
    //Ingame stats
    E.width = 60 * screenratio;
    E.height = 32 * screenratio;
    E.speed = 1.5 * screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.PARTS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [10, 10 * screenratio, -1 * screenratio, 0, 0.1];
  } else if (type == "pirateMinedropper") {
    E.sprite = sprite.enemy_pirateMinedropper;
    E.widthOnPic = 56;
    E.heightOnPic = 74;
    //Ingame stats
    E.width = 56 * screenratio;
    E.height = 74 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 15;
    E.maxHP = 15;
    E.PARTS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship, 3 = particlesX add, 4 = particlesY add
    E.particles = [10, 10 * screenratio, -6 * screenratio, 0, 0.1];
  } else if (type == "pirateMine") {
    E.sprite = sprite.enemy_pirateMine;
    E.widthOnPic = 44;
    E.heightOnPic = 44;
    //Ingame stats
    E.width = 44 * screenratio;
    E.height = 44 * screenratio;
    E.speed = 0.5 * screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.PARTS = 0;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [0, 0 * screenratio, 0 * screenratio, 0, 0];
  } else if (type == "pirateTiger") {
    E.sprite = sprite.enemy_pirateTiger;
    E.widthOnPic = 70;
    E.heightOnPic = 70;
    //Ingame stats
    E.width = 70 * screenratio;
    E.height = 70 * screenratio;
    E.speed = 2 * screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.PARTS = 0;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [18, 18 * screenratio, -13 * screenratio, 0, 0.1];
  } else if (type == "pirateVessel") {
    E.sprite = sprite.enemy_pirateVessel;
    E.widthOnPic = 76;
    E.heightOnPic = 158;
    //Ingame stats
    E.width = 76 * screenratio;
    E.height = 158 * screenratio;
    E.speed = 3 * screenratio;
    E.HP = 50;
    E.maxHP = 50;
    E.PARTS = 0;
    E.angle =
      Math.atan2(player.earthX - E.y, player.earthY - E.x) + Math.PI / 2;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [46, 46 * screenratio, -79 * screenratio, 0, 0.1];
    E.orbit = true;
    E.inOrbit = false;
  } else if (type == "voidDrone") {
    E.sprite = sprite.enemy_voidDrone;
    E.widthOnPic = 60;
    E.heightOnPic = 60;
    //Ingame stats
    E.width = 30 * screenratio;
    E.height = 30 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 2;
    E.maxHP = 2;
    E.PARTS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0, 0 * screenratio, 0 * screenratio, 0];
  } else if (type == "voidChaser") {
    E.sprite = sprite.enemy_voidChaser;
    E.widthOnPic = 48;
    E.heightOnPic = 62;
    //Ingame stats
    E.width = 48 * screenratio;
    E.height = 62 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 7;
    E.maxHP = 7;
    E.PARTS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0, 0 * screenratio, 0 * screenratio, 0];
  } else if (type == "voidSpherefighter") {
    E.sprite = sprite.enemy_voidSpherefighter;
    E.widthOnPic = 64;
    E.heightOnPic = 64;
    //Ingame stats
    E.width = 128 * screenratio;
    E.height = 128 * screenratio;
    E.speed = 1 * screenratio;
    E.HP = 20;
    E.maxHP = 20;
    E.PARTS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0, 0 * screenratio, 0 * screenratio, 0];
    E.animation = true;
    E.animationFrames = 8;
    E.animationFPS = 5;
  } else if (type == "voidChakram") {
    E.sprite = sprite.enemy_voidChakram;
    E.widthOnPic = 180;
    E.heightOnPic = 180;
    //Ingame stats
    E.width = 180 * screenratio;
    E.height = 180 * screenratio;
    E.speed = 0.5 * screenratio;
    E.HP = 50;
    E.maxHP = 50;
    E.PARTS = 50;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0, 0 * screenratio, 0 * screenratio, 0];
    E.animation = true;
    E.animationFrames = 4;
    E.animationFPS = 12;
  }
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
  if (E.hitBoxWidth == undefined) {
    E.hitBoxWidth = (E.width / 3) * 2;
    E.hitBoxHeight = (E.height / 3) * 2;
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;
  }
  E.update = function() {
    if (E.speed != 0 && E.particlesHeight < 1) {
      E.particlesWidth += E.particles[3];
      E.particlesHeight += E.particles[4];
    } else if (E.speed == 0 && E.particlesHeight > 0.2) {
      E.particlesWidth -= E.particles[3];
      E.particlesHeight -= E.particles[4];
    }
    let distance =
      Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y);
    if (E.orbit && distance < 500 * screenratio && !E.inOrbit) {
      E.inOrbit = true;
    } else if (E.inOrbit && !E.arrival) {
      E.arrival = true;
      E.attackCDstart();
    } else if (E.inOrbit && E.arrival && !E.attackCD) {
      if (type == "pirateVessel") {
        E.attackCDstart();
        if (Math.random() < 0.5)
          enemyBulletList.push(
            enemyBullet({ x: E.cannon1X, y: E.cannon1Y }, "BASIC")
          );
        else
          enemyBulletList.push(
            enemyBullet({ x: E.cannon2X, y: E.cannon2Y }, "BASIC")
          );
      } else {
        enemyBulletList.push(enemyBullet({ x: E.x, y: E.y }, "BASIC"));
        E.attackCDstart();
      }
    } else if (
      distance < 140 * screenratio &&
      type != "pirateMine" &&
      type != "pirateMinedropper" &&
      !E.orbit
    ) {
      E.speed = 0;
      if (!E.arrival) {
        E.arrival = true;
        E.attackCDstart();
      } else if (!E.attackCD) {
        enemyBulletList.push(enemyBullet({ x: E.x, y: E.y }, "BASIC"));
        E.attackCDstart();
      }
    } else if (
      (type == "pirateMine" || type == "pirateMinedropper") &&
      distance < 40
    ) {
      E.HP = 0;
      player.HP[0] -= 2;
    } else if (!E.inOrbit) {
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
      E.angle -= 0.01 * screenratio;
      E.x += E.speed * Math.cos(E.angle);
      E.y += E.speed * Math.sin(E.angle);
      E.coordX += E.xspeed;
      E.coordY += E.yspeed;
    }
    E.x -= player.xspeed;
    E.y -= player.yspeed;
    E.hitBoxX = E.x - E.hitBoxWidth / 2;
    E.hitBoxY = E.y - E.hitBoxHeight / 2;
  };
  E.render = function() {
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
    if (!E.inOrbit)
      ctx.rotate(
        Math.atan2(player.earthY - E.y, player.earthX - E.x) + Math.PI / 2
      );
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
    if (type == "pirateVessel") {
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
  E.deathAnimation_render = function() {
    E.x -= player.xspeed; //So that explosions won't move with the player
    E.y -= player.yspeed;
    if (!E.killed) {
      E.deathAnimation_countdown += 1;
      if (E.deathAnimation_countdown % 5 == 0) {
        let distance =
          Math.abs(player.earthX - E.x) + Math.abs(player.earthY - E.y);
        E.deathAnimation_angle = Math.random() * 2 * Math.PI;
        E.deathAnimation_index += 1;
        if (
          E.deathAnimation_index == 1 &&
          type == "pirateMinedropper" &&
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
  E.attackCDstart = async function() {
    E.attackCD = true;
    await sleep(E.attackCDvalue);
    E.attackCD = false;
  };
  E.hitCDstart = async function() {
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
  E.piercingDamageCDstart = async function() {
    E.piercingCD = true;
    await sleep(ship.weapon.hitCD);
    E.piercingCD = false;
  };
  return E;
}
