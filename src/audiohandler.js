const gameAudio = {
  player_BASIC: new Audio("./audio/player_BASIC.ogg"),
  player_hit: new Audio("./audio/player_hit.ogg"),
  enemy_hit: new Audio("./audio/enemy_hit.ogg"),
  enemy_death: new Audio("./audio/enemy_death.ogg"),
  enemy_bullet: new Audio("./audio/enemy_bullet.ogg"),
  typing_system: new Audio("./audio/typing_system.ogg"),
  typing_angela: new Audio("./audio/typing_angela.ogg"),
  setVolume: function () {
    gameAudio.player_BASIC.volume = 0.05 * ship.soundMultiplier;
    gameAudio.player_hit.volume = 0.1 * ship.soundMultiplier;
    gameAudio.enemy_hit.volume = 0.05 * ship.soundMultiplier;
    gameAudio.enemy_death.volume = 0.05 * ship.soundMultiplier;
    gameAudio.enemy_bullet.volume = 0.02 * ship.soundMultiplier;
    gameAudio.typing_system.volume = 0.01 * ship.soundMultiplier;
    gameAudio.typing_angela.volume = 0.01 * ship.soundMultiplier;
  },
};
