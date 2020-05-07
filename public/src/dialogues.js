var dialogueList = [];
class Dialogue {
  constructor(
    text = "A:>This is a very long text that#I just wrote but that's okay#cuz I'm the best.",
    color = "white",
    startingIndex = 0
  ) {
    dialogueList.forEach((index) => {
      index.y -= 50 * screenratio;
      if (index.opacity >= 0.2) index.opacity -= 0.2;
      else index.opacity = 0;
    });
    if (startingIndex == 0) this.text = text.split("");
    else this.text = text;
    this.displayText = [""];
    this.stringIndex = startingIndex;
    this.ttl = 420;
    this.timeToType = 1;
    this.opacity = 0.8;
    this.y = canvas.height - 120 * screenratio;
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
      dialogueList.push(
        new Dialogue(this.text, this.color, this.stringIndex + 1)
      );
    } else if (this.leadingElement) {
      this.typingSequence();
    }
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.font = 28 * screenratio + "px Consolas";
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

const defaultDialogueData = {
  level_1: {
    text: [
      "INTRUDERS DETECTED.#DEFENCES ONLINE.#TASK: PROTECT THE CORE.",
      "A>More of them are coming.#Brace yourself,Defender.",
    ],
    color: ["yellow", "white"],
    triggerType: ["timer", "wave"],
    triggerIndex: [240, 1],
  },
};

function pushDialogue(index) {
  let dialogueLevel = dialogueData["level_" + ship.level];
  dialogueList.push(
    new Dialogue(
      dialogueLevel.text.splice(index, 1)[0],
      dialogueLevel.color.splice(index, 1)[0]
    )
  );
  dialogueLevel.triggerType.splice(index, 1);
  dialogueLevel.triggerIndex.splice(index, 1);
}

var dialogueData;
function dialogueHandler() {
  let dialogueLevel = dialogueData["level_" + ship.level];
  for (let i = 0; i < dialogueLevel.triggerType.length; i++) {
    if (dialogueLevel.triggerType[i] == "timer") {
      if (dialogueLevel.triggerIndex[i] == levelTimer) pushDialogue(i);
    } else if (dialogueLevel.triggerType[i] == "enemyKilled") {
      if (dialogueLevel.triggerIndex[i] == levels_handler.level.total)
        pushDialogue(i);
    } else if (dialogueLevel.triggerType[i] == "wave") {
      if (dialogueLevel.triggerIndex[i] == levels_handler.level.waves)
        pushDialogue(i);
    }
  }
}
