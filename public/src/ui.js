var UI = {
  inMenu: true,
  currentMenu: 0,
  inicialize: function () {
    this.mainMenu_b0 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "NEW GAME",
      textSize: 30 * screenratio,
      button: "NEW GAME",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.mainMenu_b1 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 80 * screenratio,
      text: "CONTINUE",
      textSize: 30 * screenratio,
      button: "CONTINUE",
      opacity: 0.5,
      color: ["grey", "black", "white"],
    };
    this.mainMenu_b2 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 10 * screenratio,
      text: "MULTIPLAYER",
      textSize: 30 * screenratio,
      button: "MULTIPLAYER",
      opacity: 0.5,
      color: ["grey", "black", "white"],
    };
    this.mainMenu = [this.mainMenu_b0, this.mainMenu_b1, this.mainMenu_b2];

    this.gameOverMenuWindow = {
      width: 550 * screenratio,
      height: 250 * screenratio,
      x: canvas.width / 2 - 275 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "GAME OVER",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["#4C4C4C", "black", "white"],
    };
    this.gameOverMenu_b0 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 265 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "RESTART",
      textSize: 30 * screenratio,
      button: "RESTART",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.gameOverMenu_b1 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 + 15 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "BACK",
      textSize: 30 * screenratio,
      button: "BACK",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.gameOverMenu = [
      this.gameOverMenuWindow,
      this.gameOverMenu_b0,
      this.gameOverMenu_b1,
    ];

    this.youWinMenuWindow = {
      width: 550 * screenratio,
      height: 250 * screenratio,
      x: canvas.width / 2 - 275 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "Level completed!",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["#4C4C4C", "black", "white"],
    };
    this.youWinMenu_b0 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 + 15 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "CONTINUE",
      textSize: 30 * screenratio,
      button: "CONTINUE",
      opacity: 1,
      color: ["grey", "black", "white"],
    };
    this.youWinMenu = [this.youWinMenuWindow, this.youWinMenu_b0];

    this.levelDisplay = {
      x: canvas.width / 2,
      y: 300 * screenratio,
      textSize: 120 * screenratio,
      opacity: 0,
      color: "white",
    };
    this.levelDisplayCheck = false;
    this.UIColors = {
      fill: "grey",
      stroke: "#333333",
      fontFill: "white",
      fontStroke: "black",
      hoverFill: "red",
      hoverStroke: "red",
      hoverFontFill: "white",
      hoverFontStroke: "red",
      selectedFill: "grey",
      selectedStroke: "white",
      selectedFontFill: "white",
      selectedFontStroke: "red",
      sliderFill: "#40FF40",
      sliderStroke: "#414141",
    };
    //Gameplay UI
    this.HPbar_player = { color: "" };
    this.HPbar_earth = { color: "" };
    this.HPpanel = {
      width: 250 * screenratio,
      height: 96 * screenratio,
      x: 0,
      y: canvas.height - 96 * screenratio,
      sprite: sprite.UI_HPpanel,
    };

    this.dangerLight_0 = {
      width: 10 * screenratio,
      height: 10 * screenratio,
      x: 10 * screenratio,
      y: canvas.height - 31 * screenratio,
    };
    this.dangerLight_1 = {
      width: 10 * screenratio,
      height: 10 * screenratio,
      x: 10 * screenratio,
      y: canvas.height - 61 * screenratio,
    };

    this.duration_panel = {
      width: 240 * screenratio,
      height: 55 * screenratio,
      x: canvas.width - 240 * screenratio,
      y: canvas.height - 55 * screenratio,
      sprite: sprite.UI_durationPanel,
    };

    this.minimapLayer = {
      width: 200 * screenratio,
      height: 200 * screenratio,
      x: 2,
      y: 2,
      color: ["#686C70", "#353535"],
    };
    this.menuList = [
      this.mainMenu,
      this.multiplayerMenu,
      this.gameOverMenu,
      this.youWinMenu,
    ];
    this.cursorIndex = 0;
  },
  menu_render: function (menu) {
    this.hover();
    if (ship.section > 1 || ship.level > 1) {
      this.mainMenu_b1.opacity = 1;
    } else {
      this.mainMenu_b1.opacity = 0.5;
    }
    menu.forEach((index) => {
      if (
        (index.ship == undefined && index.toShip == undefined) ||
        index.ship == this.displayShip ||
        index.toShip == this.displayShip
      ) {
        ctx.fillStyle = index.color[0];
        ctx.strokeStyle = index.color[1];
        if (index.textSize != undefined) ctx.lineWidth = 6;
        ctx.globalAlpha = index.opacity;
        if (index.sprite == undefined && index.textOnly == undefined) {
          ctx.strokeRect(index.x, index.y, index.width, index.height);
          ctx.fillRect(index.x, index.y, index.width, index.height);
        }
        ctx.fillStyle = index.color[2];
        if (index.text != undefined) {
          ctx.font = index.textSize + "px FFFFORWA";
          ctx.textAlign = "center";
          ctx.strokeText(
            index.text,
            index.x + index.width / 2,
            index.y + index.height / 2 + index.textSize / 2 + index.height / 14
          );
          ctx.fillText(
            index.text,
            index.x + index.width / 2,
            index.y + index.height / 2 + index.textSize / 2 + index.height / 14
          ); //text on screen
        }
        if (index.sprite != undefined) {
          ctx.globalAlpha = 1;
          if (index.button == undefined) {
            ctx.drawImage(
              index.sprite,
              0,
              0,
              index.width / screenratio,
              index.height / screenratio,
              index.x,
              index.y,
              index.width,
              index.height
            );
          }
        }
      }
    });
  },
  game_render: function () {
    //UI
    ctx.beginPath();
    ctx.fillStyle = "#0A0A0A";
    ctx.fillRect(
      10 * screenratio,
      canvas.height - 70 * screenratio,
      190 * screenratio,
      50 * screenratio
    );
    //HP bars
    /* let x1_player = parseInt(
      (1-player.HP[1] / player.maxHP[1]) * 255
    ).toString(16); */
    let x2_player = parseInt((player.HP[1] / player.maxHP[1]) * 255).toString(
      16
    );
    //if (x1_player.length == 1) x1_player = "0" + x1_player;
    if (x2_player.length == 1) x2_player = "0" + x2_player;
    this.HPbar_player.color = "#F1" + x2_player + x2_player;

    /* let x1_earth = parseInt(
      -(player.HP[0] / player.maxHP[0] - 1) * 255
    ).toString(16); */
    let x2_earth = parseInt((player.HP[0] / player.maxHP[0]) * 255).toString(
      16
    );
    //if (x1_earth.length == 1) x1_earth = "0" + x1_earth;
    if (x2_earth.length == 1) x2_player = "0" + x2_earth;
    this.HPbar_earth.color = "#F1" + x2_earth + x2_earth;

    ctx.fillStyle = this.HPbar_player.color;
    ctx.fillRect(
      35 * screenratio,
      canvas.height - 66 * screenratio,
      (player.HP[1] / player.maxHP[1]) *
        ((player.maxHP[1] * 120) / (player.maxHP[1] + player.maxShield[1])) *
        screenratio,
      15 * screenratio
    );
    ctx.fillStyle = "#008FFF";
    ctx.fillRect(
      35 * screenratio +
        (player.HP[1] / player.maxHP[1]) *
          ((player.maxHP[1] * 120) / (player.maxHP[1] + player.maxShield[1])) *
          screenratio,
      canvas.height - 66 * screenratio,
      (player.shield[1] / player.maxShield[1]) *
        ((player.maxShield[1] * 120) /
          (player.maxHP[1] + player.maxShield[1])) *
        screenratio,
      15 * screenratio
    );

    ctx.fillStyle = this.HPbar_earth.color;
    ctx.fillRect(
      35 * screenratio,
      canvas.height - 36 * screenratio,
      (player.HP[0] / player.maxHP[0]) * 160 * screenratio,
      15 * screenratio
    );
    //Danger light
    ctx.fillStyle = "black";
    if (player.HP[0] < player.maxHP[0] / 3) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.dangerLight_0.x,
      this.dangerLight_0.y,
      this.dangerLight_0.width,
      this.dangerLight_0.height
    );
    ctx.fillStyle = "black";
    if (player.HP[1] < player.maxHP[1] / 3) {
      ctx.fillStyle = "red";
    }
    ctx.fillRect(
      this.dangerLight_1.x,
      this.dangerLight_1.y,
      this.dangerLight_1.width,
      this.dangerLight_1.height
    );

    //Panels
    if (player.weapon.name != "BASIC") {
      ctx.fillStyle = "black";
      ctx.fillRect(
        canvas.width - 155 * screenratio,
        canvas.height - 30 * screenratio,
        120 * screenratio,
        20 * screenratio
      );
      ctx.fillStyle = "#DCE6EE";
      ctx.fillRect(
        canvas.width - 155 * screenratio,
        canvas.height - 25 * screenratio,
        (player.weaponDuration /
          (player.weapon.duration +
            (player.weapon.duration * ship.weaponDuration) / 5)) *
          120 *
          screenratio,
        15 * screenratio
      );
      ctx.drawImage(
        this.duration_panel.sprite,
        this.duration_panel.x,
        this.duration_panel.y,
        this.duration_panel.width,
        this.duration_panel.height
      );
    }
    ctx.drawImage(
      this.HPpanel.sprite,
      this.HPpanel.x,
      this.HPpanel.y,
      this.HPpanel.width,
      this.HPpanel.height
    );
    this.cursorIndex +=
      0.001 *
        Math.sqrt(
          Math.pow(player.accelerationX, 2) + Math.pow(player.accelerationY, 2)
        ) +
      0.02;
    ctx.save();
    ctx.translate(xMousePos, yMousePos);
    ctx.rotate(this.cursorIndex);
    if (player.leftMouseDown)
      ctx.drawImage(sprite.UI_cursorFire, -30, -30, 60, 60);
    //cursor
    else ctx.drawImage(sprite.UI_cursorNoFire, -30, -30, 60, 60); //cursor
    ctx.restore();
    if (this.cursorIndex == 6) {
      this.cursorIndex = 0;
    }

    if (UI.levelDisplayCheck) {
      ctx.globalAlpha = UI.levelDisplay.opacity;
      ctx.textAlign = "center";
      ctx.font = UI.levelDisplay.textSize + "px FFFFORWA";
      ctx.fillStyle = UI.levelDisplay.color;
      ctx.fillText(UI.levelDisplay.text, UI.levelDisplay.x, UI.levelDisplay.y); //text on screen
      ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = this.minimapLayer.color[1];
    ctx.lineWidth = 3;
    ctx.strokeRect(
      this.minimapLayer.x,
      this.minimapLayer.y,
      this.minimapLayer.width,
      this.minimapLayer.height
    );
    ctx.fillStyle = this.minimapLayer.color[0];
    ctx.drawImage(
      sprite.UI_motherboardMap,
      this.minimapLayer.x,
      this.minimapLayer.y,
      this.minimapLayer.width,
      this.minimapLayer.height
    );
    ctx.fillStyle = "#DCE6EE";
    ctx.strokeStyle = "#DCE6EE";
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(
      101 * screenratio,
      101 * screenratio,
      5 * screenratio,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();

    ctx.fillStyle = "red";
    enemyList.forEach((e) => {
      if (!e.deathAnimation)
        if (e.behaviour == "chase") {
          ctx.save();
          ctx.translate(
            e.coordX / (player.spaceSize / (200 * screenratio)),
            e.coordY / (player.spaceSize / (200 * screenratio))
          );
          ctx.rotate(e.angle);
          ctx.drawImage(sprite.UI_ignore, -3.5, -3.5, 7, 7);
          ctx.restore();
        } else {
          ctx.fillRect(
            e.coordX / (player.spaceSize / (200 * screenratio)) - 3.5,
            e.coordY / (player.spaceSize / (200 * screenratio)) - 3.5,
            7,
            7
          );
        }
    });

    ctx.fillStyle = "#DCE6EE";
    ctx.strokeStyle = "#DCE6EE";
    ctx.lineWidth = 1;
    ctx.moveTo(3, player.coordY / (player.spaceSize / (200 * screenratio)));
    ctx.lineTo(
      200 * screenratio,
      player.coordY / (player.spaceSize / (200 * screenratio))
    );

    ctx.moveTo(player.coordX / (player.spaceSize / (200 * screenratio)), 3);
    ctx.lineTo(
      player.coordX / (player.spaceSize / (200 * screenratio)),
      200 * screenratio
    );
    ctx.stroke();
    ctx.fillRect(
      player.coordX / (player.spaceSize / (200 * screenratio)) - 2.5,
      player.coordY / (player.spaceSize / (200 * screenratio)) - 2.5,
      5,
      5
    );
    if (player.inWeaponActivation) {
      weaponActivation.render_update();
    }
    dialogueList = dialogueList.filter(
      (index) => index.ttl > 0 && index.opacity > 0
    );
    dialogueList.forEach((dia) => {
      dia.update_render();
    });
    dialogueHandler();
    ctx.closePath();
  },
  click: function () {
    if (this.currentMenu == 0 && this.inMenu) {
      this.mainMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          if (index.button == "NEW GAME") {
            startTheGame();
          } else if (index.button == "CONTINUE") {
            if (ship.section > 1 || ship.level > 1) {
              continueTheGame();
            }
          } else if (index.button == "UPGRADES") {
            this.currentMenu = 1;
          }
        }
      });
    } else if (this.currentMenu == 1 && this.inMenu) {
      //multiplayer
    } else if (this.currentMenu == 2 && this.inMenu) {
      this.gameOverMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          if (index.button == "BACK") {
            this.currentMenu = 0;
          } else if (index.button == "RESTART") {
            startTheGame();
          }
        }
      });
    } else if (this.currentMenu == 3 && this.inMenu) {
      this.youWinMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          if (index.button == "UPGRADES") {
            this.currentMenu = 1;
          } else if (index.button == "CONTINUE") {
            continueTheGame();
          }
        }
      });
    }
  },
  hover: function () {
    if (this.currentMenu == 0) {
      this.mainMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          if (
            index.button == "CONTINUE" &&
            (ship.section > 1 || ship.level > 1)
          ) {
            index.color[0] = this.UIColors.hoverFill;
            index.color[1] = this.UIColors.hoverStroke;
            index.color[2] = this.UIColors.hoverFontFill;
          } else if (index.button == "MULTIPLAYER") {
          } else if (index.button != "CONTINUE") {
            index.color[0] = this.UIColors.hoverFill;
            index.color[1] = this.UIColors.hoverStroke;
            index.color[2] = this.UIColors.hoverFontFill;
          }
        } else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 1) {
      //multiplayer
    } else if (this.currentMenu == 2) {
      this.gameOverMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          if (index.text != "GAME OVER") index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    } else if (this.currentMenu == 3) {
      this.youWinMenu.forEach((index) => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1,
          }) &&
          index.button != undefined
        ) {
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else {
          if (index.text != "YOU WIN!") index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    }
  },
  cooldown: async function (object) {
    object.opacity = 1;
    for (let i = 1; i <= object.cooldown / 10; i++) {
      await sleep(10);
      if (i == object.cooldown / 10) object.opacity = 0;
      if (object.opacity == 0) break;
    }
  },
};
