var xMousePos;
var yMousePos;
var leftMouseDown = false;
var rightMouseDown = false;
async function userInput(event, eventValue) {
  //mouse movement
  if (eventValue == 0) {
    xMousePos =
      Math.abs(event.clientX) - ($(document).width() - canvas.width) / 2;
    yMousePos =
      Math.abs(event.clientY) - parseInt($("#canvas").css("marginTop"));
    //press down
  } else if (eventValue == 1) {
    if (event.which == 1) {
      leftMouseDown = true;
    } else if (event.which == 3) rightMouseDown = true;
    else if (event.which == 27 && !UI.inMenu) {
      if (!gameAudio.player_LASER_loop.paused) {
        gameAudio.player_LASER_loop.pause();
        player.LASER_firing = false;
      }
      gameAudio.stopMusic();
      getMenu(4);
    } else if (
      player.inWeaponActivation &&
      event.which != 16 &&
      event.which != 20
    ) {
      weaponActivation.checkInput(event.key);
      keyboardControler.eventHandler(event.key.toUpperCase(), "down");
    } else if (keyboardControler.active) {
      keyboardControler.eventHandler(event.key.toUpperCase(), "down");
    }
    //release
  } else if (eventValue == 2) {
    if (event.which == 1) {
      leftMouseDown = false;
    } else if (event.which == 3) rightMouseDown = false;
    else if (event.which == 122) {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
          console.log(err);
        });
      } else document.exitFullscreen();
    } else if (keyboardControler.active) {
      keyboardControler.eventHandler(event.key.toUpperCase(), "up");
    }
  }
}

document.onfullscreenchange = function () {
  scale();
  if (UI.inMenu) player.inicialize(0, 50);
  background.inicialize();
  backgroundParticles.inicialize();
  environment.inicialize();
  UI.inicialize();
};

var keyboardControler = {
  buttonsActive: 0,
  inicialize: function () {
    this.active = playerData.keyboardControl;
    this.movementVectorX = canvas.width / 2;
    this.movementVectorY = canvas.height / 2;
    this.W = {
      x: 0,
      y: -1,
      active: false,
    };
    this.A = {
      x: -1,
      y: 0,
      active: false,
    };
    this.S = {
      x: 0,
      y: 1,
      active: false,
    };
    this.D = {
      x: 1,
      y: 0,
      active: false,
    };
  },
  eventHandler: function (event, type) {
    let eventProperty = this[event];
    try {
      if (type == "down" && !eventProperty.active) {
        this.buttonsActive++;
        eventProperty.active = true;
        this.movementVectorX += eventProperty.x;
        this.movementVectorY += eventProperty.y;
        player.ratioByKeyboard(
          this.movementVectorX,
          this.movementVectorY,
          true
        );
      } else if (type == "up" && eventProperty.active) {
        eventProperty.active = false;
        this.buttonsActive--;
        this.movementVectorX -= eventProperty.x;
        this.movementVectorY -= eventProperty.y;
        player.ratioByKeyboard(
          this.movementVectorX,
          this.movementVectorY,
          true
        );
      }
    } catch (err) {}
  },
};
