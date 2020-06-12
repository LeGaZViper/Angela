//makes sure gameLoop always runs 60 times/s even on higher refresh rate monitors
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
    if (UI.currentMenu != 4) background.update_render();
    UI.menu_render(UI.menuList[UI.currentMenu]);
  } else if (levels_handler.level.total == 0) {
    if (levels_handler.level.waves >= levels_handler.waveCounter) {
      levels_handler.waveCounter++;
      levels_handler.levelCreator();
      spawn();
    } else {
      winTheLevel();
    }
    //game sector
  } else if ((!multiplayer || frame) && (multiplayer || !frame)) {
    levelTimer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //Game part
    ctx.beginPath();
    camera.update();
    camera.check();
    player.update(); //player pos update - needs to be done as soon as possible to set correct positions for other objects
    background.update_render();
    backgroundParticles.update_render();
    if (multiplayer) {
      frame = false;
      player2.update();
      player2.render();
      sendPlayerData(new playerData());
    }
    //game space borders
    ctx.globalAlpha = 1;
    ctx.strokeStyle = "red";
    ctx.lineWidth = 5;
    ctx.globalAlpha = 0.5;
    ctx.strokeRect(
      player.earthX - player.spaceSize / 2,
      player.earthY - player.spaceSize / 2,
      player.spaceSize,
      player.spaceSize
    );
    ctx.closePath();
    //update & render of player bullets
    bulletList.forEach((b) => {
      //bullets - if render check
      if (b.explosive && b.explosion_triggered) b.explosion_render();
      b.update();
      if (
        (b.x > 0 && b.x < canvas.width) ||
        (b.y > 0 && b.y < canvas.height) ||
        b.name == "LASER"
      )
        b.render();
    });
    //update & render of enemy bullets
    enemyBulletList.forEach((eb) => {
      //enemy bullets - render
      let distance =
        Math.abs(eb.x - player.earthX) + Math.abs(eb.y - player.earthY);
      if (
        collides(eb, player) &&
        player.HP[1] > 0 &&
        !player.hitCD &&
        !player.collisionCD
      ) {
        if (player.shield[1] > 0) player.shield[1] -= eb.damage;
        else player.HP[1] -= eb.damage;
        gameAudio.player_hit.load();
        gameAudio.player_hit.play();
        eb.killed = true;
        player.hitCD = true;
        player.hitCDstart(1, "bullet");
      } else if (distance < 20) {
        if (player.shield[0] > 0) player.shield[0] -= eb.damage;
        else player.HP[0] -= eb.damage;
        eb.killed = true;
        player.hitCDstart(0, "bullet");
      }
      eb.update();
      if (
        (eb.x > 0 && eb.x < canvas.width) ||
        (eb.y > 0 && eb.y < canvas.height)
      )
        eb.render();
      enemyBulletList = enemyBulletList.filter((check) => !check.killed);
    });
    //check for weapon firing
    player.render();
    if (player.weaponDuration == 0) {
      chooseWeapon("BASIC");
      player.weaponDuration--;
    } else if (player.weaponDuration > 0) player.weaponDuration--;
    playerList.forEach((p) => {
      if (p.leftMouseDown) {
        //shooting
        if (!p.attackCD && p.HP[1] > 0) {
          try {
            gameAudio["player_" + p.weapon.name].load();
            gameAudio["player_" + p.weapon.name].play();
          } catch (err) {
            console.error("Missing an audio file.");
          }
          bulletList.push(bullet({}, p, p.weapon.bullets));
          p.attackCDstart();
          for (let i = 0; i < player.companions; i++) {
            bulletList.push(
              bullet(
                {
                  x: player.companionsX[i],
                  y: player.companionsY[i],
                  companion: true,
                },
                p
              )
            );
          }
        }
      }
    });
    //update & render for enemies
    enemyList.forEach((e) => {
      //enemies
      if (!e.deathAnimation) {
        if (!e.killed) {
          e.update();
          //render inside of player view/canvas
          if (
            (e.x > 0 && e.x < canvas.width) ||
            (e.y > 0 && e.y < canvas.height)
          ) {
            e.render();
            if (
              !player.collisionCD &&
              !player.hitCD &&
              collides(e, player) &&
              player.HP[1] > 0
            ) {
              //player collision
              if (e.HP > 0) {
                e.HP--;
                e.hitCDstart();
              } else e.killed = true;
              if (player.shield[1] > 0) player.shield[1] -= 1;
              else player.HP[1] -= 1;
              player.collisionCD = true;
              gameAudio.player_hit.load();
              gameAudio.player_hit.play();
              if (player.HP[1] > 0) {
                player.hitCDstart(1, "collision");
              }
            }
          }
        }
        //check collision with enemies and bullets
        bulletList.forEach((b) => {
          //Collision with enemies
          if (collides(e, b)) {
            if (e.HP > 0 && !b.killed) {
              if (b.explosive && !b.explosion_triggered) b.explode();
              else if ((!b.piercing || !e.piercingCD) && !b.explosive) {
                e.HP -= b.damage;
                gameAudio.enemy_hit.load();
                gameAudio.enemy_hit.play();
                damageNumberList.push(new DamageNumber(b.damage, e.x, e.y));
                e.hitCDstart();
                if (!b.piercing) b.killed = true;
              }
              if (!e.piercingCD) e.piercingDamageCDstart(b.hitCD);
              if (b.name == "CHAKRAM" && b.speed > 0) {
                b.speed -= 4;
              }
              if (b.speed < 0) {
                b.speed = 0;
              }
            }
          }
          checkDeath(e, b.name);
        });
      } else {
        e.deathAnimation_render();
        enemyList = enemyList.filter((check) => !check.killed);
      }
    });
    bulletList = bulletList.filter((check) => !check.killed);
    //update & render of random drops
    randomDropList.forEach((r, i) => {
      r.update();
      if ((r.x > 0 && r.x < canvas.width) || (r.y > 0 && r.y < canvas.height)) {
        r.render();
        playerList.forEach((p, pindex) => {
          if (collides(r, p)) {
            if (!p.inWeaponActivation) randomDropList.splice(i, 1);
            if (pindex == 0 && !player.inWeaponActivation) {
              weaponActivation.currentWord =
                weaponActivation.wordList[
                  Math.floor(Math.random() * weaponActivation.wordList.length)
                ];
              weaponActivation.currentlyTyped = "";
              console.log(
                `Trying to activate ${r.name} with word ${weaponActivation.currentWord}`
              );
              p.inWeaponActivation = true;
              weaponActivation.timerIndex = weaponActivation.defaultTimerIndex;
              weaponActivation.weaponName = r.name;
            }
          }
        });
      }
    });
    damageNumberList.forEach((num, index) => {
      num.update_render();
      if (num.ttl <= 0) {
        damageNumberList.splice(index, 1);
      }
    });
    UI.game_render();
  }
  //call for next iteration of gameLoop
  if (checkRefreshRate()) requestAnimationFrame(gameLoop);
}
