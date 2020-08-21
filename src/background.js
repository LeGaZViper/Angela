var background = {
  inicialize: function () {
    this.x1 = player.earthX;
    this.y1 = player.earthY;
    this.x2 = canvas.width / 2 - 2000 * screenratio;
    this.y2 = canvas.height / 2 - 2000 * screenratio;
    this.timeIndex = 0;
  },
  update_render: function () {
    this.timeIndex++;
    if (this.timeIndex == 0) {
      this.y2 = player.earthY - 2000 * screenratio;
      this.x2 = player.earthX - 2000 * screenratio;
    } else {
      this.x2 += -(player.xspeed + camera.offSetX);
      this.y2 += 15 * screenratio - (player.yspeed + camera.offSetY);
      ctx.drawImage(
        sprite.UI_motherboardRay,
        this.x2,
        this.y2,
        4000 * screenratio,
        87 * screenratio
      );
    }
    if (this.y2 > player.earthY + (2000 * screenratio - 87 * screenratio)) {
      this.timeIndex = -1;
    }
    this.x1 += -(player.xspeed + camera.offSetX);
    this.y1 += -(player.yspeed + camera.offSetY);
    ctx.drawImage(
      sprite.UI_motherboard,
      this.x1 - 2000 * screenratio,
      this.y1 - 2000 * screenratio,
      4000 * screenratio,
      4000 * screenratio
    );
  },
};

var backgroundParticles = {
  inicialize: function () {
    this.fan1 = {
      type: "FAN",
      sprite: sprite.UI_motherboardFan,
      x: player.earthX + 640 * screenratio,
      y: player.earthY + 1360 * screenratio,
      widthOnPic: 672,
      heightOnPic: 672,
      width: 672 * screenratio,
      height: 672 * screenratio,
      angle: 0,
      animationX: 0,
      visible: true,
      animation: function () {
        this.angle += 0.02;
        if (this.angle > Math.PI * 2) this.angle = 0;
      },
    };
    this.fan2 = {
      type: "FAN",
      sprite: sprite.UI_motherboardFan,
      x: player.earthX + 1370 * screenratio,
      y: player.earthY + 1370 * screenratio,
      widthOnPic: 672,
      heightOnPic: 672,
      width: 672 * screenratio,
      height: 672 * screenratio,
      angle: 0,
      animationX: 0,
      visible: true,
      animation: function () {
        this.angle += 0.02;
        if (this.angle > Math.PI * 2) this.angle = 0;
      },
    };
    this.GPUFan1 = {
      type: "GPUFAN",
      sprite: sprite.UI_motherboardGPUFan,
      x: player.earthX - 1600 * screenratio,
      y: player.earthY - 1550 * screenratio,
      widthOnPic: 36,
      heightOnPic: 630,
      width: 36 * screenratio,
      height: 630 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      visible: true,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex % 10 == 0) {
          this.animationX += this.widthOnPic;
        }
        if (this.timeIndex == 50) {
          this.animationX = 0;
          this.timeIndex = 0;
        }
      },
    };
    this.GPUFan2 = {
      type: "GPUFAN",
      sprite: sprite.UI_motherboardGPUFan,
      x: player.earthX - 1600 * screenratio,
      y: player.earthY - 780 * screenratio,
      widthOnPic: 36,
      heightOnPic: 630,
      width: 36 * screenratio,
      height: 630 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      visible: true,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex % 10 == 0) {
          this.animationX += this.widthOnPic;
        }
        if (this.timeIndex == 50) {
          this.animationX = 0;
          this.timeIndex = 0;
        }
      },
    };
    this.GPUFan3 = {
      type: "GPUFAN",
      sprite: sprite.UI_motherboardGPUFan,
      x: player.earthX - 1150 * screenratio,
      y: player.earthY - 1550 * screenratio,
      widthOnPic: 36,
      heightOnPic: 630,
      width: 36 * screenratio,
      height: 630 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      visible: true,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex % 10 == 0) {
          this.animationX += this.widthOnPic;
        }
        if (this.timeIndex == 50) {
          this.animationX = 0;
          this.timeIndex = 0;
        }
      },
    };
    this.GPUFan4 = {
      type: "GPUFAN",
      sprite: sprite.UI_motherboardGPUFan,
      x: player.earthX - 1150 * screenratio,
      y: player.earthY - 780 * screenratio,
      widthOnPic: 36,
      heightOnPic: 630,
      width: 36 * screenratio,
      height: 630 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      visible: true,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex % 10 == 0) {
          this.animationX += this.widthOnPic;
        }
        if (this.timeIndex == 50) {
          this.animationX = 0;
          this.timeIndex = 0;
        }
      },
    };
    this.angela = {
      type: "ANGELA",
      sprite: sprite.UI_motherboardAngela,
      x: player.earthX + 2,
      y: player.earthY,
      widthOnPic: 250,
      heightOnPic: 250,
      width: 250 * screenratio,
      height: 250 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 15,
      visible: true,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex == 240) {
          this.timeIndex = 0;
        }
        if (this.timeIndex < 15) {
          this.animationX =
            (Math.floor(this.timeIndex / 2) + 1) * this.widthOnPic;
        } else {
          this.animationX = 0;
        }
      },
    };
    this.angelaCorrupted = {
      type: "ANGELA",
      sprite: sprite.UI_motherboardAngelaCorrupted,
      x: player.earthX + 2,
      y: player.earthY,
      widthOnPic: 250,
      heightOnPic: 250,
      width: 250 * screenratio,
      height: 250 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 15,
      visible: false,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex == 240) {
          this.timeIndex = 0;
        }
        if (this.timeIndex < 15) {
          this.animationX =
            (Math.floor(this.timeIndex / 2) + 1) * this.widthOnPic;
        } else {
          this.animationX = 0;
        }
      },
    };
    this.hole = {
      type: "HOLE",
      sprite: sprite.UI_hole,
      x: player.earthX + 2,
      y: player.earthY,
      widthOnPic: 250,
      heightOnPic: 250,
      width: 250 * screenratio,
      height: 250 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 15,
      visible: false,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex == 240) {
          this.timeIndex = 0;
        }
        if (this.timeIndex < 8) {
          this.animationX = this.widthOnPic;
        } else if (this.timeIndex > 120 && this.timeIndex <= 128) {
          this.animationX = this.widthOnPic * 2;
        } else {
          this.animationX = 0;
        }
      },
    };

    this.angelaDialogueBubble = {
      type: "ANGELADIALOGUE",
      sprite: sprite.UI_dialogueBubble,
      x: player.earthX + 100 * screenratio,
      y: player.earthY - 100 * screenratio,
      widthOnPic: 77,
      heightOnPic: 75,
      width: 77 * screenratio,
      height: 75 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      visible: false,
      animation: function () {
        this.timeIndex++;
        if (this.timeIndex % 15 == 0) {
          this.animationX += this.widthOnPic;
        }
        if (this.timeIndex == 60) {
          this.animationX = 0;
          this.timeIndex = 0;
        }
      },
    };
    this.particlesList = [
      this.fan1,
      this.fan2,
      this.GPUFan1,
      this.GPUFan2,
      this.GPUFan3,
      this.GPUFan4,
      this.angela,
      this.angelaDialogueBubble,
      this.angelaCorrupted,
      this.hole,
    ];
  },
  update_render: function () {
    this.particlesList.forEach((el) => {
      el.x += -(player.xspeed + camera.offSetX);
      el.y += -(player.yspeed + camera.offSetY);
      if (el.visible) {
        el.animation();
        ctx.save();
        ctx.translate(el.x, el.y);
        ctx.rotate(el.angle);
        ctx.drawImage(
          el.sprite,
          el.animationX,
          0,
          el.widthOnPic,
          el.heightOnPic,
          -Math.round(el.width / 2),
          -Math.round(el.height / 2),
          el.width,
          el.height
        );
        if (el.type == "ANGELA") {
          //damaged main objective
          ctx.globalAlpha = player.damageOpacity[0];
          ctx.drawImage(
            el.sprite,
            el.animationX,
            el.heightOnPic,
            el.widthOnPic,
            el.heightOnPic,
            -el.width / 2,
            -el.height / 2,
            el.width,
            el.height
          );
        }
        ctx.restore();
      }
    });
  },
};

var environment = {
  inicialize: function () {
    this.light = {
      sprite: sprite.UI_visibility,
      type: "LIGHT",
      x: 0,
      y: 0,
      widthOnPic: 960,
      heightOnPic: 540,
      width: canvas.width,
      height: canvas.height,
      activated: true,
      index: -1,
      opacity: 0.7,
      animationX: 0,
    };
    this.warning = {
      sprite: sprite.UI_warning,
      type: "WARNING",
      x: 0,
      y: 0,
      widthOnPic: 960,
      heightOnPic: 540,
      width: canvas.width,
      height: canvas.height,
      activated: false,
      maxIndex: 0,
      index: 0,
      opacity: 0.7,
      animationX: 0,
    };
    this.angelaJumpscare1 = {
      type: "ANGELAJUMPSCARE1",
      sprite: sprite.UI_angelaJumpscare1,
      x: canvas.width / 2 - 425 * screenratio,
      y: canvas.height / 2 - 500 * screenratio,
      widthOnPic: 600,
      heightOnPic: 800,
      width: 750 * screenratio,
      height: 1000 * screenratio,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      activated: false,
      opacity: 1,
      animation: function () {
        if (!UI.inMenu) {
          this.timeIndex++;
          if (this.timeIndex % 2 == 0) {
            this.animationX += this.widthOnPic;
          }
          if (this.timeIndex % 6 == 0) {
            this.animationX = 0;
          }
          if (this.timeIndex == 50) {
            Dialogue.stopDialogues = false;
            this.activated = false;
            this.animationX = 0;
            this.timeIndex = 0;
          }
        }
      },
    };
    this.angelaJumpscare2 = {
      type: "ANGELAJUMPSCARE2",
      sprite: sprite.UI_angelaJumpscare2,
      x: canvas.width / 2 - (131 * screenratio * 5) / 2,
      y: canvas.height / 2 - (180 * screenratio * 5) / 2,
      widthOnPic: 131,
      heightOnPic: 185,
      width: 131 * screenratio * 5,
      height: 185 * screenratio * 5,
      angle: 0,
      animationX: 0,
      timeIndex: 0,
      activated: false,
      opacity: 1,
      animation: function () {
        if (!UI.inMenu) {
          this.timeIndex++;
          if (this.timeIndex % 3 == 0) {
            this.animationX += this.widthOnPic;
          }
          if (this.timeIndex % 9 == 0) {
            this.animationX = 0;
          }
          if (this.timeIndex == 30) {
            this.activated = false;
            this.animationX = 0;
            this.timeIndex = 0;
          }
        }
      },
    };
    this.envi_list = [
      this.light,
      this.warning,
      this.angelaJumpscare1,
      this.angelaJumpscare2,
    ];
  },
  update_render: function () {
    this.envi_list.forEach((el) => {
      ctx.globalAlpha = el.opacity;
      if (el.type == "WARNING") {
        if (el.index > 0) {
          el.index--;
          ctx.globalAlpha = (1 / el.maxIndex) * el.index;
        } else el.activated = false;
      }
      if (el.activated) {
        ctx.drawImage(
          el.sprite,
          el.animationX,
          0,
          el.widthOnPic,
          el.heightOnPic,
          el.x,
          el.y,
          el.width,
          el.height
        );
        if (el.animation != undefined) el.animation();
      }
    });
  },
  warning_activation: function () {
    if (!this.warning.activated) {
      this.warning.activated = true;
      this.warning.maxIndex = 30;
      this.warning.index = 30;
    }
  },
  warningLong_activation: function () {
    if (!this.warning.activated) {
      gameAudio.playSound("system_warning");
      this.warning.activated = true;
      this.warning.maxIndex = 70;
      this.warning.index = 70;
    }
  },
};
