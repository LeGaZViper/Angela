const gameAudio = {
  player_BASIC: new Audio("./audio/player_BASIC.ogg"),
  player_CHAKRAM: new Audio("./audio/player_CHAKRAM.ogg"),
  player_LASER_start: new Audio("./audio/player_LASER_start.ogg"),
  player_LASER_loop: new Audio("./audio/player_LASER_loop.ogg"),
  player_getDrop: new Audio("./audio/player_getDrop.ogg"),
  player_hit: new Audio("./audio/player_hit.ogg"),
  enemy_hit: new Audio("./audio/enemy_hit.ogg"),
  enemy_death: new Audio("./audio/enemy_death.ogg"),
  enemy_bullet: new Audio("./audio/enemy_bullet.ogg"),
  typing_system: new Audio("./audio/typing_system.ogg"),
  typing_angela: new Audio("./audio/typing_angela.ogg"),
  setVolume: function () {
    gameAudio.player_BASIC.volume = 0.05 * ship.soundMultiplier;
    gameAudio.player_CHAKRAM.volume = 0.06 * ship.soundMultiplier;
    gameAudio.player_LASER_start.volume = 0.03 * ship.soundMultiplier;
    gameAudio.player_LASER_loop.volume = 0.01 * ship.soundMultiplier;
    gameAudio.player_getDrop.volume = 0.01 * ship.soundMultiplier;
    gameAudio.player_hit.volume = 0.1 * ship.soundMultiplier;
    gameAudio.enemy_hit.volume = 0.05 * ship.soundMultiplier;
    gameAudio.enemy_death.volume = 0.05 * ship.soundMultiplier;
    gameAudio.enemy_bullet.volume = 0.02 * ship.soundMultiplier;
    gameAudio.typing_system.volume = 0.01 * ship.soundMultiplier;
    gameAudio.typing_angela.volume = 0.01 * ship.soundMultiplier;
  },
  playSound: function (sound) {
    let copyAudio = gameAudio[sound].cloneNode();
    copyAudio.volume = gameAudio[sound].volume;
    copyAudio.play();
  },
};
