var UI = {
  inMenu: true,
  currentMenu: 0,
  inicialize: function() {
    this.mainMenu_b0 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "NEW GAME",
      textSize: 30 * screenratio,
      button: "NEW GAME",
      opacity: 1,
      color: ["grey", "black", "white"]
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
      color: ["grey", "black", "white"]
    };
    this.mainMenu_b2 = {
      width: 300 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 150 * screenratio,
      y: canvas.height / 2 - 10 * screenratio,
      text: "UPGRADES",
      textSize: 30 * screenratio,
      button: "UPGRADES",
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.mainMenu = [this.mainMenu_b0, this.mainMenu_b1, this.mainMenu_b2];

    this.upgradesMenu_PARTS = {
      width: 250 * screenratio,
      height: 75 * screenratio,
      x: canvas.width / 2 + 200 * screenratio,
      y: canvas.height / 2 - 370 * screenratio,
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["grey", "black", "black"]
    };
    this.upgradesMenu_b0 = {
      width: 300 * screenratio,
      height: 60 * screenratio,
      x: canvas.width / 2 + 150 * screenratio,
      y: canvas.height / 2 + 300 * screenratio,
      text: "CONTINUE",
      textSize: 30 * screenratio,
      button: "CONTINUE",
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    //Ship
    this.upgradesMenu_b1 = {
      width: 264 * screenratio,
      height: 264 * screenratio,
      x: canvas.width / 2 + 150 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      sprite: sprite.UI_scout,
      color: ["grey", "black", "white"],
      opacity: 1
    };

    this.upgradesMenu_b2 = {
      width: 100 * screenratio,
      height: 36 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 - 195 * screenratio,
      upgrade: ship.maxShield[1] - defaultShip.maxShield[1],
      maxUpgrade: 5,
      button: "maxShield",
      text: 40,
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_b3 = {
      width: 100 * screenratio,
      height: 36 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 - 130 * screenratio,
      upgrade: ship.maxHP[1] - defaultShip.maxHP[1],
      maxUpgrade: 5,
      button: "maxHP",
      text: 0,
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_b4 = {
      width: 100 * screenratio,
      height: 36 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 - 66 * screenratio,
      upgrade: ship.speed - defaultShip.speed,
      maxUpgrade: 10,
      button: "speed",
      text: 0,
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_b5 = {
      width: 100 * screenratio,
      height: 36 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 - 1 * screenratio,
      upgrade: player.weaponDuration - defaultShip.weaponDuration,
      maxUpgrade: 5,
      button: "weaponDuration",
      text: 0,
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_b6 = {
      width: 100 * screenratio,
      height: 36 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 + 64 * screenratio,
      upgrade: 0,
      maxUpgrade: 0,
      button: "E.SHIELDS",
      text: "TBA",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_b7 = {
      width: 100 * screenratio,
      height: 36 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 + 129 * screenratio,
      upgrade: 0,
      maxUpgrade: 0,
      button: "E.WEAPONS",
      text: "TBA",
      textSize: 20 * screenratio,
      opacity: 1,
      color: ["grey", "black", "white"]
    };

    this.upgradesMenu_t0 = {
      width: 75 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 390 * screenratio,
      y: canvas.height / 2 - 195 * screenratio,
      text: "Shield",
      textSize: 30 * screenratio,
      textOnly: true,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_t1 = {
      width: 75 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 370 * screenratio,
      y: canvas.height / 2 - 129 * screenratio,
      text: "Health",
      textSize: 30 * screenratio,
      textOnly: true,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_t2 = {
      width: 75 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 390 * screenratio,
      y: canvas.height / 2 - 65 * screenratio,
      text: "Speed",
      textSize: 30 * screenratio,
      textOnly: true,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_t3 = {
      width: 75 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 390 * screenratio,
      y: canvas.height / 2 - 1 * screenratio,
      text: "W. Duration",
      textSize: 30 * screenratio,
      textOnly: true,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_t4 = {
      width: 75 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 390 * screenratio,
      y: canvas.height / 2 + 64 * screenratio,
      text: "E. Shields",
      textSize: 30 * screenratio,
      textOnly: true,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_t5 = {
      width: 75 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 390 * screenratio,
      y: canvas.height / 2 + 129 * screenratio,
      text: "E. Weapons",
      textSize: 30 * screenratio,
      textOnly: true,
      opacity: 1,
      color: ["grey", "black", "white"]
    };
    this.upgradesMenu_t6 = {
      width: 0 * screenratio,
      height: 0 * screenratio,
      x: canvas.width / 2,
      y: canvas.height / 2 + 250 * screenratio,
      opacity: 0,
      text: "Insufficient parts!",
      textOnly: true,
      cooldown: 3000,
      textSize: 35 * screenratio,
      color: ["red", "red", "red"]
    };

    this.upgradesMenu_sl0 = {
      width:
        ((this.upgradesMenu_b2.upgrade * 190) /
          this.upgradesMenu_b2.maxUpgrade) *
        screenratio,
      height: 35 * screenratio,
      x: canvas.width / 2 - 217 * screenratio,
      y: canvas.height / 2 - 194 * screenratio,
      slider: "maxShield",
      opacity: 1,
      color: ["green", "green", "green"]
    };
    this.upgradesMenu_sl1 = {
      width:
        ((this.upgradesMenu_b3.upgrade * 190) /
          this.upgradesMenu_b3.maxUpgrade) *
        screenratio,
      height: 35 * screenratio,
      x: canvas.width / 2 - 217 * screenratio,
      y: canvas.height / 2 - 129 * screenratio,
      slider: "maxHP",
      opacity: 1,
      color: ["green", "green", "green"]
    };
    this.upgradesMenu_sl2 = {
      width:
        ((this.upgradesMenu_b4.upgrade * 190) /
          this.upgradesMenu_b4.maxUpgrade) *
        screenratio,
      height: 35 * screenratio,
      x: canvas.width / 2 - 217 * screenratio,
      y: canvas.height / 2 - 65 * screenratio,
      slider: "speed",
      opacity: 1,
      color: ["green", "green", "green"]
    };
    this.upgradesMenu_sl3 = {
      width:
        ((this.upgradesMenu_b5.upgrade * 190) /
          this.upgradesMenu_b5.maxUpgrade) *
        screenratio,
      height: 35 * screenratio,
      x: canvas.width / 2 - 217 * screenratio,
      y: canvas.height / 2 - 1 * screenratio,
      slider: "weaponDuration",
      opacity: 1,
      color: ["green", "green", "green"]
    };
    this.upgradesMenu_sl4 = {
      width:
        ((this.upgradesMenu_b6.upgrade * 190) /
          this.upgradesMenu_b6.maxUpgrade) *
        screenratio,
      height: 35 * screenratio,
      x: canvas.width / 2 - 217 * screenratio,
      y: canvas.height / 2 + 65 * screenratio,
      slider: true,
      opacity: 1,
      color: ["green", "green", "green"]
    };
    this.upgradesMenu_sl5 = {
      width: 190 * screenratio,
      height: 38 * screenratio,
      x: canvas.width / 2 - 217 * screenratio,
      y: canvas.height / 2 + 130 * screenratio,
      slider: true,
      opacity: 1,
      color: ["green", "green", "green"]
    };

    this.upgradesMenuWindow = {
      width: 1000 * screenratio,
      height: 800 * screenratio,
      x: canvas.width / 2 - 500 * screenratio,
      y: canvas.height / 2 - 400 * screenratio,
      opacity: 0,
      color: ["grey", "black", "white"],
      sprite: sprite.UI_shopBG
    };
    this.upgradesMenu = [
      this.upgradesMenuWindow,
      this.upgradesMenu_PARTS,
      this.upgradesMenu_b0,
      this.upgradesMenu_b1,
      this.upgradesMenu_b2,
      this.upgradesMenu_b3,
      this.upgradesMenu_b4,
      this.upgradesMenu_b5,
      this.upgradesMenu_b6,
      this.upgradesMenu_b7,
      this.upgradesMenu_t0,
      this.upgradesMenu_t1,
      this.upgradesMenu_t2,
      this.upgradesMenu_t3,
      this.upgradesMenu_t4,
      this.upgradesMenu_t5,
      this.upgradesMenu_t6,
      this.upgradesMenu_sl0,
      this.upgradesMenu_sl1,
      this.upgradesMenu_sl2,
      this.upgradesMenu_sl3,
      this.upgradesMenu_sl4,
      this.upgradesMenu_sl5
    ];
    this.upgradesMenu_sliders = [
      this.upgradesMenu_sl0,
      this.upgradesMenu_sl1,
      this.upgradesMenu_sl2,
      this.upgradesMenu_sl3,
      this.upgradesMenu_sl4,
      this.upgradesMenu_sl5
    ];

    this.gameOverMenuWindow = {
      width: 550 * screenratio,
      height: 250 * screenratio,
      x: canvas.width / 2 - 275 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "GAME OVER",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["#4C4C4C", "black", "black"]
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
      color: ["grey", "black", "black"]
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
      color: ["grey", "black", "black"]
    };
    this.gameOverMenu = [
      this.gameOverMenuWindow,
      this.gameOverMenu_b0,
      this.gameOverMenu_b1
    ];

    this.youWinMenuWindow = {
      width: 550 * screenratio,
      height: 250 * screenratio,
      x: canvas.width / 2 - 275 * screenratio,
      y: canvas.height / 2 - 150 * screenratio,
      text: "YOU WIN!",
      textSize: 30 * screenratio,
      opacity: 1,
      color: ["#4C4C4C", "black", "black"]
    };
    this.youWinMenu_b0 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 - 265 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "UPGRADES",
      textSize: 30 * screenratio,
      button: "UPGRADES",
      opacity: 1,
      color: ["grey", "black", "black"]
    };
    this.youWinMenu_b1 = {
      width: 250 * screenratio,
      height: 50 * screenratio,
      x: canvas.width / 2 + 15 * screenratio,
      y: canvas.height / 2 + 40 * screenratio,
      text: "CONTINUE",
      textSize: 30 * screenratio,
      button: "CONTINUE",
      opacity: 1,
      color: ["grey", "black", "black"]
    };
    this.youWinMenu = [
      this.youWinMenuWindow,
      this.youWinMenu_b0,
      this.youWinMenu_b1
    ];

    this.levelDisplay = {
      x: canvas.width / 2,
      y: 300 * screenratio,
      textSize: 120 * screenratio,
      opacity: 0,
      color: "white"
    };
    this.levelDisplayCheck = false;
    this.UIColors = {
      fill: "grey",
      stroke: "#333333",
      fontFill: "white",
      fontStroke: "black",
      hoverFill: "blue",
      hoverStroke: "blue",
      hoverFontFill: "white",
      hoverFontStroke: "blue",
      selectedFill: "grey",
      selectedStroke: "white",
      selectedFontFill: "white",
      selectedFontStroke: "blue",
      sliderFill: "#40FF40",
      sliderStroke: "#414141"
    };
    //Gameplay UI
    this.HPbar_player = { color: "" };
    this.HPbar_earth = { color: "" };
    this.HPpanel = {
      width: 250 * screenratio,
      height: 96 * screenratio,
      x: 0,
      y: canvas.height - 96 * screenratio,
      sprite: sprite.UI_HPpanel
    };

    this.dangerLight_0 = {
      width: 10 * screenratio,
      height: 10 * screenratio,
      x: 10 * screenratio,
      y: canvas.height - 31 * screenratio
    };
    this.dangerLight_1 = {
      width: 10 * screenratio,
      height: 10 * screenratio,
      x: 10 * screenratio,
      y: canvas.height - 61 * screenratio
    };

    this.duration_panel = {
      width: 240 * screenratio,
      height: 55 * screenratio,
      x: canvas.width - 240 * screenratio,
      y: canvas.height - 55 * screenratio,
      sprite: sprite.UI_durationPanel
    };

    this.minimapLayer = {
      width: 200 * screenratio,
      height: 200 * screenratio,
      x: 2,
      y: 2,
      color: ["#193019", "#353535"]
    };
    this.menuList = [
      this.mainMenu,
      this.upgradesMenu,
      this.gameOverMenu,
      this.youWinMenu
    ];
  },
  menu_render: function(menu) {
    this.upgradesMenu_PARTS.text = "Parts: " + localStorage.PARTS;
    this.hover();
    if (ship.section > 1 || ship.level > 1) {
      this.mainMenu_b1.opacity = 1;
    } else {
      this.mainMenu_b1.opacity = 0.5;
    }
    menu.forEach(index => {
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
  game_render: function() {
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
    let x1_player = parseInt(
      -(player.HP[1] / player.maxHP[1] - 1) * 255
    ).toString(16);
    let x2_player = parseInt((player.HP[1] / player.maxHP[1]) * 255).toString(
      16
    );
    if (x1_player.length == 1) x1_player = "0" + x1_player;
    if (x2_player.length == 1) x2_player = "0" + x2_player;
    this.HPbar_player.color = "#" + x1_player + x2_player + "00";

    let x1_earth = parseInt(
      -(player.HP[0] / player.maxHP[0] - 1) * 255
    ).toString(16);
    let x2_earth = parseInt((player.HP[0] / player.maxHP[0]) * 255).toString(
      16
    );
    if (x1_earth.length == 1) x1_earth = "0" + x1_earth;
    if (x2_earth.length == 1) x2_player = "0" + x2_earth;
    this.HPbar_earth.color = "#" + x1_earth + x2_earth + "00";

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
      ctx.fillStyle = "#00FF00";
      ctx.drawImage(
        this.duration_panel.sprite,
        this.duration_panel.x,
        this.duration_panel.y,
        this.duration_panel.width,
        this.duration_panel.height
      );
      try {
        ctx.drawImage(
          sprite["UI_" + player.weapon.name],
          0,
          100,
          100,
          100,
          this.duration_panel.x + 40 * screenratio,
          this.duration_panel.y + 15 * screenratio,
          40 * screenratio,
          40 * screenratio
        );
      } catch (err) {
        ctx.drawImage(
          sprite["UI_DOUBLE"],
          0,
          100,
          100,
          100,
          this.duration_panel.x + 40 * screenratio,
          this.duration_panel.y + 15 * screenratio,
          40 * screenratio,
          40 * screenratio
        );
      }
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
    }
    ctx.drawImage(
      this.HPpanel.sprite,
      this.HPpanel.x,
      this.HPpanel.y,
      this.HPpanel.width,
      this.HPpanel.height
    );
    ctx.drawImage(sprite.UI_cursor, xMousePos - 25, yMousePos - 25, 50, 50); //cursor

    if (UI.levelDisplayCheck) {
      ctx.globalAlpha = UI.levelDisplay.opacity;
      ctx.textAlign = "center";
      ctx.font = UI.levelDisplay.textSize + "px FFFFORWA";
      ctx.fillStyle = UI.levelDisplay.color;
      ctx.fillText(UI.levelDisplay.text, UI.levelDisplay.x, UI.levelDisplay.y); //text on screen
      ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 0.5;
    ctx.strokeStyle = this.minimapLayer.color[1];
    ctx.lineWidth = 3;
    ctx.strokeRect(
      this.minimapLayer.x,
      this.minimapLayer.y,
      this.minimapLayer.width,
      this.minimapLayer.height
    );
    ctx.fillStyle = this.minimapLayer.color[0];
    ctx.fillRect(
      this.minimapLayer.x,
      this.minimapLayer.y,
      this.minimapLayer.width,
      this.minimapLayer.height
    );
    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
    ctx.closePath();
    ctx.beginPath();
    ctx.arc(
      100 * screenratio,
      100 * screenratio,
      5 * screenratio,
      0,
      2 * Math.PI,
      false
    );
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();

    ctx.fillStyle = "red";
    enemyList.forEach(e => {
      if (!e.deathAnimation)
        ctx.fillRect(
          e.coordX / (player.spaceSize / (200 * screenratio)) - 2.5,
          e.coordY / (player.spaceSize / (200 * screenratio)) - 2.5,
          5,
          5
        );
    });

    ctx.fillStyle = "green";
    ctx.strokeStyle = "green";
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
    ctx.closePath();
    ctx.globalAlpha = 1;
  },
  click: function() {
    if (this.currentMenu == 0 && this.inMenu) {
      this.mainMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
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
      this.upgradesMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
          }) &&
          index.button != undefined
        ) {
          if (index.button == "CONTINUE") {
            if (ship.section > 1 || ship.level > 1) {
              continueTheGame();
            }
          } else {
            if (
              parseInt(localStorage.PARTS) >= index.text &&
              index.maxUpgrade > index.upgrade
            ) {
              UI.upgradesMenu_t6.opacity = 0;
              localStorage.PARTS = parseInt(localStorage.PARTS) - index.text;
              index.upgrade++;
              if (index.button == "maxHP" || index.button == "maxShield") {
                ship[index.button][1] += 1;
                this.upgradesMenu_sliders.forEach(slider => {
                  if (slider.slider == index.button) {
                    slider.width =
                      (((ship[index.button][1] - defaultShip[index.button][1]) *
                        190) /
                        index.maxUpgrade) *
                      screenratio;
                  }
                });
              } else {
                ship[index.button] += 1;
                this.upgradesMenu_sliders.forEach(slider => {
                  if (slider.slider == index.button) {
                    slider.width =
                      (((ship[index.button] - defaultShip[index.button]) *
                        190) /
                        index.maxUpgrade) *
                      screenratio;
                  }
                });
              }
              saveLocalStorage();
            } else if (parseInt(localStorage.PARTS) < index.text) {
              this.cooldown(UI.upgradesMenu_t6);
            }
          }
        }
      });
    } else if (this.currentMenu == 2 && this.inMenu) {
      this.gameOverMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
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
      this.youWinMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
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
  hover: function() {
    if (this.currentMenu == 0) {
      this.mainMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
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
      this.upgradesMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
          }) &&
          index.button != undefined
        ) {
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        } else if (index.slider == undefined) {
          if (index.text == "Insufficient parts!") {
            index.color[0] = "red";
            index.color[1] = "black";
            index.color[2] = "red";
          } else {
            index.color[0] = this.UIColors.fill;
            index.color[1] = this.UIColors.stroke;
            index.color[2] = this.UIColors.fontFill;
          }
        } else {
          index.color[0] = this.UIColors.sliderFill;
          index.color[1] = this.UIColors.sliderStroke;
          index.color[2] = this.UIColors.slider;
        }
      });
    } else if (this.currentMenu == 2) {
      this.gameOverMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
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
      this.youWinMenu.forEach(index => {
        if (
          collides_UI(index, {
            x: xMousePos - 5,
            y: yMousePos - 5,
            width: 1,
            height: 1
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
  cooldown: async function(object) {
    object.opacity = 1;
    for (let i = 1; i <= object.cooldown / 10; i++) {
      await sleep(10);
      if (i == object.cooldown / 10) object.opacity = 0;
      if (object.opacity == 0) break;
    }
  }
};
