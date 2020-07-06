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
    this.particlesList = [
      this.fan1,
      this.fan2,
      this.GPUFan1,
      this.GPUFan2,
      this.GPUFan3,
      this.GPUFan4,
      this.angela,
    ];
  },
  update_render: function () {
    this.particlesList.forEach((el) => {
      el.animation();
      el.x += -(player.xspeed + camera.offSetX);
      el.y += -(player.yspeed + camera.offSetY);
      ctx.beginPath();
      ctx.save();
      ctx.translate(el.x, el.y);
      ctx.rotate(el.angle);
      ctx.drawImage(
        el.sprite,
        el.animationX,
        0,
        el.widthOnPic,
        el.heightOnPic,
        -el.width / 2,
        -el.height / 2,
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
      ctx.closePath();
    });
  },
};

var environment = {
  inicialize: function () {
    this.light = {
      sprite: sprite.UI_visibility,
      type: "LIGHT",
      widthOnPic: 960,
      heightOnPic: 540,
      activated: true,
      index: -1,
    };
    this.warning = {
      sprite: sprite.UI_warning,
      type: "WARNING",
      widthOnPic: 960,
      heightOnPic: 540,
      activated: false,
      index: 0,
    };
    this.envi_list = [this.light, this.warning];
  },
  update_render: function () {
    this.envi_list.forEach((el) => {
      ctx.globalAlpha = 0.7;
      if (el.type == "WARNING") {
        if (el.index > 0) {
          el.index--;
          ctx.globalAlpha = (1 / 30) * el.index;
        } else el.activated = false;
      }
      if (el.activated)
        ctx.drawImage(
          el.sprite,
          0,
          0,
          el.widthOnPic,
          el.heightOnPic,
          0,
          0,
          canvas.width,
          canvas.height
        );
    });
  },
  warning_activation: function () {
    this.warning.activated = true;
    this.warning.index = 30;
  },
};
