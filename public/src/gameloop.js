//makes sure gameLoop always runs 60 times/s even on higher refresh rate monitors
function checkRefreshRate() {
  var fpsInterval = 1000 / 60;
  let timeThen = 0;
  let timeNow = Date.now();
  let dif = timeNow - timeThen;
  if (dif > fpsInterval) {
    timeThen = timeNow - (dif % fpsInterval);
    return true;
  } else return false;
}

//updates/checks game data and renders graphics
//split into UI and game sectors
function gameLoop() {
  ctx.globalAlpha = 1;
  //menu sector
  if (UI.inMenu) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.update_render();
    UI.menu_render(UI.menuList[UI.currentMenu]);
    //getting into menu after win??? -- needs to be worked on
  } else if (levels_handler.level.total == 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.update_render();
    winTheGame();
    //game sector
  } else if ((!multiplayer || frame) && (multiplayer || !frame)) {
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
        eb.killed = true;
        player.hitCD = true;
        player.hitCDstart(1, "bullet");
      } else if (distance < 20) {
        player.HP[0] -= eb.damage;
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
      if (player.weapon.name == "LASER")
        bulletList = bulletList.filter((check) => check.name != "LASER");
      chooseWeapon("BASIC");
      player.weaponDuration--;
    } else if (player.weaponDuration > 0) player.weaponDuration--;
    playerList.forEach((p) => {
      if (p.leftMouseDown) {
        //shooting
        if (!p.attackCD && p.HP[1] > 0) {
          if (
            p.weapon.name == "LASER" &&
            bulletList.filter((check) => check.name == "LASER").length < 1
          ) {
            bulletList.push(bullet({ x: p.x, y: p.y }, p, p.weapon.bullets));
          } else if (p.weapon.name != "LASER") {
            bulletList.push(bullet({}, p, p.weapon.bullets));
            p.attackCDstart();
          }
        }
      } else if (p.weapon.name == "LASER") {
        bulletList = bulletList.filter((check) => check.name != "LASER");
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
              //player colision
              if (player.shield[1] > 0) player.shield[1] -= 1;
              else player.HP[1] -= 1;
              player.collisionCD = true;
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
            if (e.HP > 0) {
              if (b.explosive && !b.explosion_triggered) b.explode();
              else if ((!b.piercing || !e.piercingCD) && !b.explosive) {
                e.HP -= b.damage;
                e.hitCDstart();
                if (!b.piercing) b.killed = true;
              }
              if (!e.piercingCD) e.piercingDamageCDstart(b.hitCD);
            }
          }
          bulletList = bulletList.filter((check) => !check.killed);
          checkDeath(e, b.name);
        });
      } else {
        e.deathAnimation_render();
        enemyList = enemyList.filter((check) => !check.killed);
      }
    });
    //update & render of random drops
    randomDropList.forEach((r, i) => {
      r.update();
      if ((r.x > 0 && r.x < canvas.width) || (r.y > 0 && r.y < canvas.height)) {
        r.render();
        playerList.forEach((p, pindex) => {
          if (collides(r, p)) {
            if (p.weapon.name == "LASER" && r.name != "LASER")
              bulletList = bulletList.filter((check) => check.name != "LASER");
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
              weaponActivation.weaponName = r.name;
            }
          }
        });
      }
    });
    UI.game_render();
  }
  //call for next iteration of gameLoop
  if (checkRefreshRate()) requestAnimationFrame(gameLoop);
}
