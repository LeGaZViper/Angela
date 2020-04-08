var background = {
  inicialize: function () {
    this.x1 = canvas.width / 2;
    this.y1 = canvas.height / 2 - 50;
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
      this.y2 += 20 * screenratio - (player.yspeed + camera.offSetY);
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
      sprt: sprite.UI_motherboardFan,
      x: canvas.width / 2 + 643 * screenratio,
      y: canvas.height / 2 + 1312 * screenratio,
      widthOnPic: 672,
      heightOnPic: 672,
      width: 672 * screenratio,
      height: 672 * screenratio,
      angle: 0,
      animationX: 0,
      animation: function () {
        this.angle += 0.05;
        if (this.angle > Math.PI * 2) this.angle = 0;
      },
    };
    this.fan2 = {
      type: "FAN",
      sprt: sprite.UI_motherboardFan,
      x: canvas.width / 2 + 1370 * screenratio,
      y: canvas.height / 2 + 1319 * screenratio,
      widthOnPic: 672,
      heightOnPic: 672,
      width: 672 * screenratio,
      height: 672 * screenratio,
      angle: 0,
      animationX: 0,
      animation: function () {
        this.angle += 0.05;
        if (this.angle > Math.PI * 2) this.angle = 0;
      },
    };
    this.angela = {
      type: "ANGELA",
      sprt: sprite.UI_motherboardAngela,
      x: canvas.width / 2,
      y: canvas.height / 2 - 50,
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
    this.particlesList = [this.fan1, this.fan2, this.angela];
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
        el.sprt,
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
          el.sprt,
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
    this.angela.x = player.earthX;
    this.angela.y = player.earthY;
  },
};
