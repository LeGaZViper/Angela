//makes sure gameLoop always runs 60 times per second even on higher refresh rate monitors
function checkRefreshRate() {
  let fpsInterval = 1000 / 60;
  let timeThen = 0;
  let timeNow = Date.now();
  let dif = timeNow - timeThen;
  if (dif > fpsInterval) {
    timeThen = timeNow - (dif % fpsInterval);
    return true;
  }
  return false;
}

//updates/checks game data and renders graphics
//split into UI and game sectors
var levelTimer = 0;
function gameLoop() {
  ctx.globalAlpha = 1;
  //menu sector
  if (UI.inMenu) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (UI.currentMenu < 4) background.update_render();
    if (UI.currentMenu == 5) {
      dialogueHandler();
      if (dialogueList.length > 0) {
        gameAudio.changeVolumeOfMusic(0.01);
        dialogueList = dialogueList.filter(
          (index) => index.ttl > 0 && index.opacity > 0
        );
        dialogueList.forEach((dia) => {
          dia.update_render();
        });
      } else {
        gameAudio.changeVolumeOfMusic(0.03);
      }
    }
    environment.update_render();
    UI.menu_render();
  } else if (levels_handler.level.total == 0) {
    if (levels_handler.level.waves >= levels_handler.waveCounter) {
      dialogueList = [];
      textIndex = undefined;
      levels_handler.waveCounter++;
      levels_handler.levelCreator();
      spawn();
    } else {
      winTheLevel();
    }
    //game sector
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    levelTimer++;
    ctx.beginPath();
    camera.update();
    camera.check();
    player.update(); //player pos update - needs to be done as soon as possible to set correct positions for other objects
    background.update_render();
    backgroundParticles.update_render();
    player.render();
    //game space borders
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "#5C7CFF";
    ctx.lineWidth = 5;
    ctx.globalAlpha = 0.7;
    ctx.strokeRect(
      player.earthX - player.spaceSize / 2,
      player.earthY - player.spaceSize / 2,
      player.spaceSize,
      player.spaceSize
    );
    environment.update_render();
    //update & render of player bullets
    bulletList.forEach((b, bindex) => {
      if (b.killed) bulletList.splice(bindex, 1);
      else {
        //bullets - if render check
        if (b.explosive && b.explosion_triggered) b.explosion_render();
        b.update();
        if (
          (b.x > -50 &&
            b.x < canvas.width + 50 &&
            b.y > -50 &&
            b.y < canvas.height + 50) ||
          b.name == "LASER"
        )
          b.render();
      }
    });
    //update & render of enemy bullets
    enemyBulletList.forEach((eb, index) => {
      //enemy bullets - render
      if (eb.target == "none") {
        var distance = Math.sqrt(
          Math.pow(eb.x - player.earthX, 2) + Math.pow(eb.y - player.earthY, 2)
        );
      }
      if (collides(eb, player)) {
        if (
          player.HP[1] > 0 &&
          !player.hitCD &&
          !player.collisionCD &&
          player.weapon.name != "INVICIBLEDRILL"
        ) {
          if (!eb.piercing || !player.piercingCD) {
            if (player.shield[1] >= eb.damage) player.shield[1] -= eb.damage;
            else {
              player.HP[1] += -(eb.damage - player.shield[1]);
              player.shield[1] = 0;
            }
            gameAudio.playSound("player_hit");
            if (!eb.piercing) eb.killed = true;
            else setTimer(eb.hitCD, player, "piercingCD"); //player.piercingHitCDstart(eb.hitCD);
            player.hitCD = true;
            player.hitCDstart(1, "bullet");
          }
        }
      } else if (distance < 20 && eb.target == "none") {
        if (player.shield[0] >= eb.damage) player.shield[0] -= eb.damage;
        else {
          player.HP[0] += -(eb.damage - player.shield[0]);
          player.shield[0] = 0;
        }
        eb.killed = true;
        environment.warning_activation();
        player.hitCDstart(0, "bullet");
      }
      eb.update();
      if (
        eb.x > -50 &&
        eb.x < canvas.width + 50 &&
        eb.y > -50 &&
        eb.y < canvas.height + 50
      )
        eb.render();
      if (eb.killed) {
        enemyBulletList.splice(index, 1);
      }
    });
    //check for weapon firing
    if (player.weaponDuration == 0) {
      player.speed = 12;
      player.animationFPS = 5;
      player.width = 75 * screenratio;
      player.height = 75 * screenratio;
      chooseWeapon("BASIC");
      if (!gameAudio.player_LASER_loop.paused) {
        gameAudio.player_LASER_loop.pause();
        player.LASER_firing = false;
      }
      player.weaponDuration--;
    } else if (player.weaponDuration > 0) player.weaponDuration--;
    if (leftMouseDown) {
      //shooting
      if (!player.attackCD && player.HP[1] > 0) {
        if (player.weapon.name != "LASER") {
          try {
            gameAudio.playSound(player.weapon.sound);
          } catch (err) {
            console.error("Missing an audio file.");
          }
        } else if (
          player.LASER_firing == false ||
          player.LASER_firing == undefined
        ) {
          player.LASER_firing = true;
          gameAudio.playSound("player_LASER_start");
        } else {
          gameAudio.player_LASER_loop.loop = true;
          gameAudio.player_LASER_loop.play();
        }
        bulletList.push(bullet({ ...player.weapon }, player.weapon.bullets));
        setTimer(player.weapon.cooldown, player, "attackCD");
        //player.attackCDstart();
        for (let i = 0; i < player.companions; i++) {
          bulletList.push(
            bullet(
              {
                x: player.companionsX[i],
                y: player.companionsY[i],
                companion: true,
                ...player.weapon,
              },
              player.weapon.bullets
            )
          );
        }
      }
    } else if (!gameAudio.player_LASER_loop.paused) {
      gameAudio.player_LASER_loop.pause();
      player.LASER_firing = false;
    }
    //update & render for enemies
    enemyList.forEach((e, eindex) => {
      //enemies
      if (!e.deathAnimation && !e.killed) {
        e.update();
        //render inside of player view/canvas
        if (
          e.x > -100 &&
          e.x < canvas.width + 100 &&
          e.y > -100 &&
          e.y < canvas.height + 100
        ) {
          e.render();
          if (collides(e, player)) {
            if (!player.collisionCD && !player.hitCD && player.HP[1] > 0) {
              //player collision
              if (playerData.level < 12) {
                if (e.HP > 1) {
                  e.HP--;
                  e.hitCDstart();
                } else {
                  e.HP = 0;
                  checkDeath(e);
                }
              }
              if (player.weapon.name != "INVICIBLEDRILL") {
                player.collisionCD = true;
                if (player.shield[1] >= e.collisionDamage)
                  player.shield[1] -= e.collisionDamage;
                else {
                  player.HP[1] += -(e.collisionDamage - player.shield[1]);
                  player.shield[1] = 0;
                }
                gameAudio.playSound("player_hit");
                if (player.HP[1] > 0) {
                  player.hitCDstart(1, "collision");
                }
              }
            }
          }
        }
        //check collision with enemies and bullets
        bulletList.forEach((b) => {
          //Collision with enemies
          if (collides(e, b)) {
            if (e.HP > 0 && !b.killed) {
              if (
                e.behaviour == "spawn" &&
                !e.spawning &&
                !e.attackCD &&
                e.HP > b.damage &&
                e.spawns < e.maximumSpawns
              ) {
                e.spawning = true;
                if (e.type == "mail") e.speed = 0;
                e.attackCDstart();
                //setTimer(e.attackCDvalue, e, "attackCD");
              }
              if (b.explosive && !b.explosion_triggered) b.explode();
              else if ((!b.piercing || !e.piercingCD) && !b.explosive) {
                e.HP -= b.damage;
                gameAudio.playSound("enemy_hit");
                damageNumberList.push(new DamageNumber(b.damage, e.x, e.y));
                e.hitCDstart();
                if (!b.piercing) b.killed = true;
              }
              if (!e.piercingCD)
                e.piercingDamageCDstart(b.hitCD / (player.companions + 1));
              if (b.name == "CHAKRAM" && b.speed >= 5) {
                b.speed -= 5;
              } else if (b.name == "CHAKRAM") {
                b.speed = 0;
              }
            }
            checkDeath(e, b.name);
          }
        });
      } else if (e.killed) {
        enemyList.splice(eindex, 1);
      } else {
        e.deathAnimation_render();
      }
    });
    damageNumberList.forEach((num, index) => {
      num.update_render();
      if (num.ttl <= 0) {
        damageNumberList.splice(index, 1);
      }
    });
    if (
      !lootCube.active &&
      levelTimer - lootCube.nextSpawn == 0 &&
      playerData.level > 0
    ) {
      lootCube.active = true;
      spawnAnEnemy("lootCube");
    }
    UI.game_render();
    if (playerData.level >= 11) lastLevelHandler();
  }
  timerList.forEach((el, index) => {
    if (el.value > 0) {
      el.value--;
    } else {
      timerList.splice(index, 1);
      el.reference[el.attributeName] = false;
    }
  });
  let loading = document.getElementById("loading");
  if (loading.style.display != "none") {
    $(document).ready(function () {
      loading.style.display = "none";
    });
  }

  //call for the next iteration of gameLoop
  ctx.closePath();
  gameAudio.checkPausedSounds();
  if (checkRefreshRate()) requestAnimationFrame(gameLoop);
}
