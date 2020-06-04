var xMousePos;
var yMousePos;
var leftMouseDown = false;
var rightMouseDown = false;
async function userInput(event, which) {
  //mouse movement
  if (which == 0) {
    xMousePos =
      Math.abs(event.clientX) - ($(document).width() - canvas.width) / 2;
    yMousePos =
      Math.abs(event.clientY) - parseInt($("#canvas").css("marginTop"));
    //press down
  } else if (which == 1) {
    if (event.which == 1) {
      leftMouseDown = true;
      player.leftMouseDown = true;
    } else if (event.which == 3) rightMouseDown = true;
    //release
  } else if (which == 2) {
    if (event.which == 1) {
      leftMouseDown = false;
      player.leftMouseDown = false;
    } else if (event.which == 3) rightMouseDown = false;
    else if (event.which == 122) {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen().catch((err) => {
          console.log(err);
        });
      } else document.exitFullscreen();
    } else if (event.which == 27 && !UI.inMenu) {
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
