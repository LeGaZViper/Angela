const gameAudio = {
  gameAudioFiles: {
    click: new Audio(),
    player_BASIC: new Audio(),
    player_SPREADER: new Audio(),
    player_SPREADERPROJECTILE: new Audio(),
    player_CHAKRAM: new Audio(),
    player_NEONTHROWER: new Audio(),
    player_WAVE: new Audio(),
    player_ROCKET: new Audio(),
    player_LASER_start: new Audio(),
    player_LASER_loop: new Audio(),
    player_getDrop: new Audio(),
    player_loseWeapon: new Audio(),
    player_getWeapon: new Audio(),
    explosion: new Audio(),
    player_hit: new Audio(),
    enemy_hit: new Audio(),
    enemy_death: new Audio(),
    enemy_BASIC: new Audio(),
    enemy_MINIBASIC: new Audio(),
    enemy_CLOUD: new Audio(),
    enemy_COG: new Audio(),
    enemy_CORRUPTEDSHOT: new Audio(),
    system_warning: new Audio(),
    typing_system: new Audio(),
    typing_infernus: new Audio(),
    typing_angela: new Audio(),
    typing_angela_2: new Audio(),
    angelaJumpscare1: new Audio(),
    angelaJumpscare2: new Audio(),
    music_level_0: new Audio(),
    music_level_1: new Audio(),
    music_level_2: new Audio(),
    music_level_3: new Audio(),
    music_level_4: new Audio(),
    music_level_4_2: new Audio(),
    music_level_5: new Audio(),
    music_menu: new Audio(),
  },
  currentMusic: null,
  activatedSounds: [],
  setVolume: function () {
    this.gameAudioFiles.click.volume = 0.02 * playerData.soundMultiplier;
    this.gameAudioFiles.player_BASIC.volume = 0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_SPREADER.volume =
      0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_SPREADERPROJECTILE.volume =
      0.02 * playerData.soundMultiplier;
    this.gameAudioFiles.player_CHAKRAM.volume =
      0.06 * playerData.soundMultiplier;
    this.gameAudioFiles.player_NEONTHROWER.volume =
      0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_WAVE.volume = 0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_ROCKET.volume =
      0.03 * playerData.soundMultiplier;
    this.gameAudioFiles.player_LASER_start.volume =
      0.03 * playerData.soundMultiplier;
    this.gameAudioFiles.player_LASER_loop.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.player_getDrop.volume =
      0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_loseWeapon.volume =
      0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_getWeapon.volume =
      0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.explosion.volume = 0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.player_hit.volume = 0.05 * playerData.soundMultiplier;
    this.gameAudioFiles.system_warning.volume =
      0.03 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_hit.volume = 0.02 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_death.volume = 0.02 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_BASIC.volume = 0.02 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_MINIBASIC.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_CLOUD.volume = 0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_COG.volume = 0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_CORRUPTEDSHOT.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.enemy_MINIBASIC.volume =
      0.02 * playerData.soundMultiplier;
    this.gameAudioFiles.typing_system.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.typing_infernus.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.typing_angela.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.typing_angela_2.volume =
      0.01 * playerData.soundMultiplier;
    this.gameAudioFiles.angelaJumpscare1.volume =
      0.1 * playerData.soundMultiplier;
    this.gameAudioFiles.angelaJumpscare2.volume =
      0.1 * playerData.soundMultiplier;
    this.gameAudioFiles.music_level_0.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_level_1.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_level_2.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_level_3.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_level_4.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_level_4_2.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_level_5.volume =
      0.03 * playerData.musicMultiplier;
    this.gameAudioFiles.music_menu.volume = 0.03 * playerData.musicMultiplier;
  },
  playSound: function (sound) {
    let copyAudio = this.gameAudioFiles[sound].cloneNode();
    copyAudio.volume = this.gameAudioFiles[sound].volume;
    this.activatedSounds.push(copyAudio);
    copyAudio.play();
  },
  playMusic: function (music) {
    if (this.currentMusic != null) this.stopMusic();
    try {
      this.currentMusic = this.gameAudioFiles[music].cloneNode();
      this.currentMusic.volume = this.gameAudioFiles[music].volume;
    } catch (er) {
      this.currentMusic = this.gameAudioFiles["music_level_0"].cloneNode();
      this.currentMusic.volume = this.gameAudioFiles["music_level_0"].volume;
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
    this.setVolume();
    try {
      this.currentMusic.volume = value * playerData.musicMultiplier;
    } catch (err) {
      console.log("No current music.");
    }
  },
  checkPausedSounds: function () {
    //garbage collector?
    this.activatedSounds.forEach((el, index) => {
      if (el.paused) {
        this.activatedSounds.splice(index, 1);
        el.remove();
      }
    });
  },
};
