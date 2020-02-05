var xMousePos;
var yMousePos;
var leftMouseDown = false;
var rightMouseDown = false;
async function userInput(event, which) {
  //0 == mousemove, 1 == mousedown, 2 == mouseup
  if (which == 0) {
    xMousePos = Math.abs(event.clientX) - ($(document).width() - canvas.width) / 2;
    yMousePos = Math.abs(event.clientY) - parseInt($("#canvas").css("marginTop"));
  } else if (which == 1) {
    if (event.which == 1) leftMouseDown = true;
    else if (event.which == 3) rightMouseDown = true;
  } else if (which == 2) {
    if (event.which == 1) leftMouseDown = false;
    else if (event.which == 3) rightMouseDown = false;
  }
}
