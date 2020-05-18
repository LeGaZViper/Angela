var dialogueList = [];
class Dialogue {
  constructor(
    text = "A:>This is a very long text that#I just wrote but that's okay#cuz I'm the best.",
    color = "white",
    startingIndex = 0,
    part = 0
  ) {
    if (startingIndex == 0) this.text = text.split("");
    else this.text = text;
    this.displayText = [""];
    this.stringIndex = startingIndex;
    this.ttl = 420;
    this.timeToType = 1;
    this.opacity = 1;
    this.y = canvas.height / 2 + 200 * screenratio + 35 * part;
    this.leadingRow = true;
    this.color = color;
    this.part = part;
  }
  update_render = function () {
    this.ttl--;
    if (this.ttl < 100 && this.opacity > 0)
      this.opacity = Math.floor((this.opacity - 0.01) * 100) / 100;
    if (this.text[this.stringIndex] == "#" && this.leadingRow) {
      this.leadingRow = false;
      dialogueList.push(
        new Dialogue(this.text, this.color, this.stringIndex + 1, ++this.part)
      );
    } else if (this.leadingRow) {
      this.typingSequence();
    }
    ctx.beginPath();

    ctx.font = 20 * screenratio + "px FFFFORWA";
    ctx.textAlign = "center";
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = "black";
    ctx.strokeText(this.displayText.join(""), canvas.width / 2, this.y);
    ctx.fillStyle = this.color;
    ctx.fillText(this.displayText.join(""), canvas.width / 2, this.y);
    ctx.closePath();
  };
  typingSequence = function () {
    this.timeToType--;
    if (this.timeToType == 0) {
      this.displayText.push(this.text[this.stringIndex]);
      this.timeToType = 5;
      this.stringIndex++;
    }
  };
}

const defaultDialogueData = {
  level_1: {
    text: [
      "INTRUDERS DETECTED.#DEFENCES ONLINE.#TASK: PROTECT THE CORE.",
      "A>More of them are coming.#Brace yourself, Defender.",
    ],
    color: ["yellow", "white"],
    triggerType: ["timer", "splice"], //timer - level timer, wave - start of a wave, splice - goes right after a specific dialogue
    triggerIndex: [240, "I"],
  },
};

var splicedText = "";
function pushDialogue(index) {
  let dialogueLevel = dialogueData["level_" + ship.level];
  splicedText = dialogueLevel.text[index];
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
    } else if (
      dialogueLevel.triggerType[i] == "splice" &&
      dialogueList.length == 0
    ) {
      if (splicedText.charAt(0) == dialogueLevel.triggerIndex) {
        pushDialogue(i);
      }
    }
  }
}
