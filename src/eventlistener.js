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
    } else if (event.which == 27 && !UI.inMenu) {
      if (!gameAudio.player_LASER_loop.paused) {
        gameAudio.player_LASER_loop.pause();
        player.laser_firing = false;
      }
      getMenu(4);
    } else if (
      player.inWeaponActivation &&
      event.which != 16 &&
      event.which != 20
    ) {
      weaponActivation.checkInput(event.key);
    }
  }
}

document.onfullscreenchange = function () {
  scale();
  UI.inicialize();
};
