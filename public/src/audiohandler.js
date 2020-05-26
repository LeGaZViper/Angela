const gameAudio = {
  BASIC: new Audio("./audio/BASIC.ogg"),
  enemy_hit: new Audio("./audio/enemy_hit.ogg"),
  enemy_death: new Audio("./audio/enemy_death.ogg"),
  typing_system: new Audio("./audio/typing_system.ogg"),
  typing_angela: new Audio("./audio/typing_angela.ogg"),
  setVolume: function () {
    gameAudio.BASIC.volume = 0.1 * ship.soundMultiplier;
    gameAudio.enemy_hit.volume = 0.02 * ship.soundMultiplier;
    gameAudio.enemy_death.volume = 0.02 * ship.soundMultiplier;
    gameAudio.typing_system.volume = 0.02 * ship.soundMultiplier;
    gameAudio.typing_angela.volume = 0.02 * ship.soundMultiplier;
  },
};
