var dialogueList = [];
class Dialogue {
  constructor(text, color, ttl, startingIndex = 0, part = 0) {
    if (startingIndex == 0) this.text = text.split("");
    else this.text = text;
    this.displayText = [""];
    this.stringIndex = startingIndex;
    this.ttl = ttl;
    this.timeToType = 1;
    this.opacity = 1;
    this.y = canvas.height / 2 + 200 * screenratio + 40 * part * screenratio;
    this.leadingRow = true;
    this.color = color;
    this.part = part;
  }
  update_render = function () {
    if (!this.leadingRow || this.text.length < this.stringIndex) this.ttl--;
    if (this.ttl < 100 && this.ttl > 1 && this.opacity > 0)
      this.opacity = Math.floor((this.opacity - 0.02) * 100) / 100;
    if (this.text[this.stringIndex] == "#" && this.leadingRow) {
      this.leadingRow = false;
      dialogueList.push(
        new Dialogue(
          this.text,
          this.color,
          this.ttl,
          this.stringIndex + 1,
          ++this.part
        )
      );
    } else if (this.leadingRow && this.text.length >= this.stringIndex) {
      this.typingSequence();
    }
    if (this.color == "grey") ctx.font = 40 * screenratio + "px Glitch";
    else ctx.font = 20 * screenratio + "px FFFFORWA";
    ctx.textAlign = "center";
    ctx.globalAlpha = this.opacity;
    ctx.strokeStyle = "black";
    ctx.strokeText(this.displayText.join(""), canvas.width / 2, this.y);
    ctx.fillStyle = this.color;
    ctx.fillText(this.displayText.join(""), canvas.width / 2, this.y);
  };
  typingSequence = function () {
    this.timeToType--;
    if (this.timeToType == 0) {
      if (this.color == "white") {
        gameAudio.playSound("typing_angela");
      } else if (this.color == "grey") {
        gameAudio.playSound("typing_angela_2");
      } else if (this.color == "red") {
        gameAudio.playSound("typing_enemy");
      } else {
        if (this.color == "orange") environment.warningLong_activation();
        gameAudio.playSound("typing_system");
      }
      this.displayText.push(this.text[this.stringIndex]);
      this.timeToType = 5;
      this.stringIndex++;
    }
  };
}

var textIndex;
function pushDialogue(index) {
  let dialogueLevel = DialogueData["level_" + playerData.level];
  textIndex = index;
  DialogueData.dialoguesUsed[index] = true;
  dialogueList.push(
    new Dialogue(
      dialogueLevel.text[index],
      dialogueLevel.color[index],
      dialogueLevel.ttl[index]
    )
  );
}

function dialogueHandler() {
  let dialogueLevel = DialogueData["level_" + playerData.level];
  for (let i = 0; i < dialogueLevel.triggerType.length; i++) {
    if (DialogueData.dialoguesUsed[i]) continue;
    else if (dialogueLevel.triggerType[i] == "timer") {
      if (dialogueLevel.triggerIndex[i] == levelTimer) pushDialogue(i);
    } else if (dialogueLevel.triggerType[i] == "enemyKilled") {
      if (dialogueLevel.triggerIndex[i] == levels_handler.level.total)
        pushDialogue(i);
    } else if (dialogueLevel.triggerType[i] == "wave") {
      if (dialogueLevel.triggerIndex[i] == levels_handler.waveCounter)
        pushDialogue(i);
    } else if (
      dialogueLevel.triggerType[i] == "after" &&
      dialogueList.length == 0
    ) {
      if (dialogueLevel.triggerIndex[i] == textIndex) {
        pushDialogue(i);
      }
    }
  }
}
