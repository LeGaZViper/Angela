const gameAudio = {
  player_BASIC: new Audio("./audio/player_BASIC.ogg"),
  player_CHAKRAM: new Audio("./audio/player_CHAKRAM.ogg"),
  player_LASER_start: new Audio("./audio/player_LASER_start.ogg"),
  player_LASER_loop: new Audio("./audio/player_LASER_loop.ogg"),
  player_getDrop: new Audio("./audio/player_getDrop.ogg"),
  player_hit: new Audio("./audio/player_hit.ogg"),
  enemy_hit: new Audio("./audio/enemy_hit.ogg"),
  enemy_death: new Audio("./audio/enemy_death.ogg"),
  enemy_BASIC: new Audio("./audio/enemy_BASIC.ogg"),
  enemy_MINIBASIC: new Audio("./audio/enemy_MINIBASIC.ogg"),
  system_warning: new Audio("./audio/system_warning.ogg"),
  typing_system: new Audio("./audio/typing_system.ogg"),
  typing_enemy: new Audio("./audio/typing_enemy.ogg"),
  typing_angela: new Audio("./audio/typing_angela.ogg"),
  typing_angela_2: new Audio("./audio/typing_angela_2.ogg"),
  music_level_0: new Audio("./audio/music_level_0.ogg"),
  music_menu: new Audio("./audio/music_menu.ogg"),
  currentMusic: null,
  setVolume: function () {
    this.player_BASIC.volume = 0.05 * playerData.soundMultiplier;
    this.player_CHAKRAM.volume = 0.06 * playerData.soundMultiplier;
    this.player_LASER_start.volume = 0.03 * playerData.soundMultiplier;
    this.player_LASER_loop.volume = 0.01 * playerData.soundMultiplier;
    this.player_getDrop.volume = 0.01 * playerData.soundMultiplier;
    this.player_hit.volume = 0.05 * playerData.soundMultiplier;
    this.system_warning.volume = 0.03 * playerData.soundMultiplier;
    this.enemy_hit.volume = 0.05 * playerData.soundMultiplier;
    this.enemy_death.volume = 0.05 * playerData.soundMultiplier;
    this.enemy_BASIC.volume = 0.02 * playerData.soundMultiplier;
    this.enemy_MINIBASIC.volume = 0.02 * playerData.soundMultiplier;
    this.typing_system.volume = 0.01 * playerData.soundMultiplier;
    this.typing_enemy.volume = 0.01 * playerData.soundMultiplier;
    this.typing_angela.volume = 0.01 * playerData.soundMultiplier;
    this.typing_angela_2.volume = 0.01 * playerData.soundMultiplier;
    this.music_level_0.volume = 0.03 * playerData.musicMultiplier;
    this.music_menu.volume = 0.05 * playerData.musicMultiplier;
  },
  playSound: function (sound) {
    let copyAudio = this[sound].cloneNode();
    copyAudio.volume = this[sound].volume;
    copyAudio.play();
  },
  playMusic: function (music) {
    try {
      this.currentMusic = this[music].cloneNode();
      this.currentMusic.volume = this[music].volume;
    } catch (er) {
      this.currentMusic = this["music_level_0"].cloneNode();
      this.currentMusic.volume = this["music_level_0"].volume;
    }
    this.currentMusic.loop = true;
    this.currentMusic.play();
  },
  resumeMusic: function () {
    this.currentMusic.play();
  },
  stopMusic: function () {
    if (!this.currentMusic.paused && this.currentMusic != null) {
      this.currentMusic.pause();
    }
  },
  changeVolumeOfMusic: function (value) {
    try {
      this.currentMusic.volume = value * playerData.musicMultiplier;
    } catch (err) {
      console.log("No current music.");
    }
  },
};
