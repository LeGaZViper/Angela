var dialogueList = [];
class Dialogue {
  constructor(
    text = "A:>This is a very long text that#I just wrote but that's okay#cuz I'm the best.".split(
      ""
    ),
    startingIndex = 0,
    color = "white"
  ) {
    dialogueList.forEach((index) => {
      index.y -= 50 * screenratio;
      if (index.opacity >= 0.2) index.opacity -= 0.2;
      else index.opacity = 0;
    });
    this.text = text;
    this.displayText = [""];
    this.stringIndex = startingIndex;
    this.ttl = 420;
    this.timeToType = 1;
    this.opacity = 0.8;
    this.y = canvas.height - 150 * screenratio;
    this.leadingElement = true;
    this.color = color;
  }
  update_render = function () {
    this.ttl--;
    if (this.ttl < 100 && this.opacity > 0)
      this.opacity = Math.floor((this.opacity - 0.01) * 100) / 100;
    if (this.text[this.stringIndex] == "#" && this.leadingElement) {
      this.leadingElement = false;
      this.displayText.splice(this.displayText.length - 1, 1);
      dialogueList.push(new Dialogue(this.text, this.stringIndex + 1));
    } else if (this.leadingElement) {
      this.typingSequence();
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.font = 40 * screenratio + "px Consolas";
    ctx.textAlign = "left";
    ctx.globalAlpha = this.opacity;
    ctx.fillText(this.displayText.join(""), 10, this.y);
    ctx.closePath();
  };
  typingSequence = function () {
    if (this.stringIndex < this.text.length) {
      this.timeToType--;
      if (this.timeToType == 0) {
        this.displayText[this.stringIndex] = this.text[this.stringIndex];
        this.displayText.push("|");
        this.timeToType = 5;
        this.stringIndex++;
      }
    } else {
      this.timeToType--;
      if (this.timeToType == 0) {
        this.displayText.splice(this.displayText.length - 1, 1);
      }
    }
  };
}
