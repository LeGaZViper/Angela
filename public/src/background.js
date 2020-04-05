var background = {
  inicialize: function () {
    this.x1 = canvas.width / 2;
    this.y1 = canvas.height / 2;
  },
  update_render: function () {
    this.x1 += -(player.xspeed + camera.offSetX);
    this.y1 += -(player.yspeed + camera.offSetY);
    ctx.beginPath();
    ctx.drawImage(
      sprite.UI_motherboard,
      this.x1 - 2000 * screenratio,
      this.y1 - 2000 * screenratio,
      4000 * screenratio,
      4000 * screenratio
    );
    ctx.fill();
    ctx.closePath();
  },
};

var backgroundParticles = {
  inicialize: function () {
    this.fan1 = {
      type: "FAN",
      x: canvas.width / 2 + 645 * screenratio,
      y: canvas.height / 2 + 1362 * screenratio,
      widthOnPic: 672,
      heightOnPic: 672,
      width: 672 * screenratio,
      height: 672 * screenratio,
      angle: 0,
    };
    this.fan2 = {
      type: "FAN",
      x: canvas.width / 2 + 1372 * screenratio,
      y: canvas.height / 2 + 1369 * screenratio,
      widthOnPic: 672,
      heightOnPic: 672,
      width: 672 * screenratio,
      height: 672 * screenratio,
      angle: 0,
    };
    this.particlesList = [this.fan1, this.fan2];
  },
  update_render: function () {
    this.particlesList.forEach((el) => {
      if (el.type == "FAN") el.angle += 0.05;
      if (el.angle > Math.PI * 2) el.angle = 0;
      el.x += -(player.xspeed + camera.offSetX);
      el.y += -(player.yspeed + camera.offSetY);
      ctx.beginPath();
      ctx.save();
      ctx.translate(el.x, el.y);
      ctx.rotate(el.angle);
      ctx.drawImage(
        sprite.UI_motherboardFan,
        0,
        0,
        el.widthOnPic,
        el.heightOnPic,
        -el.width / 2,
        -el.height / 2,
        el.width,
        el.height
      );
      ctx.restore();
      ctx.closePath();
    });
  },
};
