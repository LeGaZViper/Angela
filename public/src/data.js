//List of spritemaps (might use only one in the final version) | used in: rendering
var sprite = {
  enemy_cube: new Image(),
  enemy_goblin: new Image(),
  enemy_tooth: new Image(),
  enemy_buzz: new Image(),
  enemy_sharkfin: new Image(),
  enemy_SG40: new Image(),
  enemy_pirateRaider: new Image(),
  enemy_pirateMinedropper: new Image(),
  enemy_pirateMine: new Image(),
  enemy_pirateTiger: new Image(),
  enemy_pirateVessel: new Image(),
  enemy_pirateVesselturret: new Image(),
  enemy_voidDrone: new Image(),
  enemy_voidChaser: new Image(),
  enemy_voidSpherefighter: new Image(),
  enemy_voidChakram: new Image(),
  player_scout: new Image(),
  player_scout2: new Image(),
  player_orbiter: new Image(),
  player_slug: new Image(),
  projectile_ROCKET: new Image(),
  projectile_BASIC: new Image(),
  projectile_enemyBASIC: new Image(),
  projectile_SPREAD: new Image(),
  projectile_spreadProjectile: new Image(),
  projectile_explosion: new Image(),
  UI_cursorFire: new Image(),
  UI_cursorNoFire: new Image(),
  UI_HPpanel: new Image(),
  UI_durationPanel: new Image(),
  UI_motherboard: new Image(),
  UI_motherboardRay: new Image(),
  UI_motherboardAngela: new Image(),
  UI_motherboardMap: new Image(),
  UI_motherboardFan: new Image(),
  UI_ignore: new Image(),
  UI_scout: new Image(),
  UI_slug: new Image(),
  UI_shopBG: new Image(),
  UI_drop: new Image(),
};

//Default database for ingame weapons | used in: first inicialization
var weaponDatabase = {
  BASIC: {
    index: 0,
    sprite: sprite.projectile_BASIC,
    name: "BASIC",
    bullets: 1,
    damage: 1,
    speed: 15,
    width: 5,
    height: 50,
    cooldown: 150,
    duration: 0,
    color: "#DCE6EE",
    status: "DEFAULT",
  },
  DOUBLE: {
    index: 1,
    sprite: sprite.projectile_BASIC,
    name: "DOUBLE",
    bullets: 2,
    damage: 1,
    speed: 15,
    width: 5,
    height: 50,
    cooldown: 150,
    duration: 600,
    color: "#DCE6EE",
    status: "LOCKED",
  },
  SPRAY: {
    index: 2,
    sprite: sprite.projectile_BASIC,
    name: "SPRAY",
    bullets: 3,
    damage: 1,
    speed: 15,
    width: 5,
    height: 50,
    cooldown: 150,
    duration: 600,
    color: "#DCE6EE",
    status: "LOCKED",
  },
  ROCKET: {
    index: 3,
    sprite: sprite.projectile_ROCKET,
    name: "ROCKET",
    bullets: 1,
    damage: 5,
    speed: 7,
    width: 12,
    height: 33,
    cooldown: 300,
    duration: 600,
    status: "LOCKED",
  },
  GIANT: {
    index: 4,
    name: "GIANT",
    bullets: 1,
    damage: 2,
    speed: 7,
    width: 10,
    height: 50,
    cooldown: 300,
    duration: 600,
    piercing: true,
    hitCD: 500,
    color: "#DCE6EE",
    status: "LOCKED",
  },
  SPREADER: {
    index: 5,
    sprite: sprite.projectile_SPREADER,
    name: "SPREADER",
    bullets: 1,
    damage: 2,
    speed: 8,
    width: 14,
    height: 30,
    cooldown: 300,
    duration: 600,
    piercing: false,
    status: "LOCKED",
  },
  SPREADER_PROJECTILE: {
    index: 99,
    sprite: sprite.projectile_spreadProjectile,
    name: "SPREADER_PROJECTILE",
    bullets: 1,
    damage: 2,
    speed: 15,
    width: 7,
    height: 13,
    piercing: false,
    status: "UNAVAILABLE",
  },
  /* LASER: {
    index: 6,
    name: "LASER",
    bullets: 1,
    damage: 4,
    speed: 0,
    width: 1,
    height: 1,
    cooldown: 2000,
    duration: 600,
    piercing: true,
    hitCD: 200,
    color: "#00FF00",
    status: "LOCKED" 
  },*/
};

class DefaultShip {
  constructor() {
    this.name = "SCOUT";
    this.speed = 10;
    this.width = 75;
    this.height = 75;
    this.widthOnPic = 300;
    this.heightOnPic = 300;
    this.weaponDuration = 0;
    this.particles = [22, 2, 30, 0, 0.05];
    this.maxShield = [0, 1];
    this.maxHP = [10, 5];
    this.section = 1;
    this.level = 1;
  }
}

var enemyDatabase;
function defineEnemyDatabase() {
  enemyDatabase = {
    test: {
      type: "buzz",
      behaviour: "ignore",
      sprite: sprite.enemy_buzz,
      widthOnPic: 56,
      heightOnPic: 62,
      //Ingame stats
      width: 45 * screenratio,
      height: 50 * screenratio,
      speed: 0 * screenratio,
      HP: 6,
      maxHP: 6,
      particles: [10, 10 * screenratio, -1 * screenratio, 0, 0.1],
    },
    cube: {
      type: "cube",
      chaseDistance: Infinity,
      behaviour: "chase",
      sprite: sprite.enemy_cube,
      widthOnPic: 300,
      heightOnPic: 300,
      width: 60 * screenratio,
      height: 60 * screenratio,
      speed: 5 * screenratio,
      defaultSpeed: 5 * screenratio,
      HP: 6,
      maxHP: 6,
      particles: [0, 0, 0, 0, 0],
      animation: true,
      animationFrames: 5,
      animationFPS: 12,
    },
    buzz: {
      type: "buzz",
      behaviour: "ignore",
      sprite: sprite.enemy_buzz,
      widthOnPic: 56,
      heightOnPic: 62,
      //Ingame stats
      width: 45 * screenratio,
      height: 50 * screenratio,
      speed: 2 * screenratio,
      HP: 6,
      maxHP: 6,
      particles: [10, 10 * screenratio, -1 * screenratio, 0, 0.1],
    },
    tooth: {
      type: "tooth",
      behaviour: "ignore",
      sprite: sprite.enemy_tooth,
      widthOnPic: 64,
      heightOnPic: 64,
      //Ingame stats
      width: 75 * screenratio,
      height: 75 * screenratio,
      speed: 1 * screenratio,
      HP: 10,
      maxHP: 10,
      particles: [10, 10 * screenratio, -1 * screenratio, 0, 0.1],
    },
    sharkfin: {
      // 1 - sharkfin
      type: "sharkfin",
      behaviour: "ignore",
      sprite: sprite.enemy_sharkfin,
      widthOnPic: 64,
      heightOnPic: 60,
      //Ingame stats
      width: 50 * screenratio,
      height: 45 * screenratio,
      speed: 3 * screenratio,
      HP: 3,
      maxHP: 3,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship
      particles: [10, 10 * screenratio, -12 * screenratio, 0, 0.1],
    },
    goblin: {
      // 2 - goblin
      type: "goblin",
      behaviour: "ignore",
      sprite: sprite.enemy_goblin,
      widthOnPic: 76,
      heightOnPic: 100,
      //Ingame stats
      width: 76 * screenratio,
      height: 100 * screenratio,
      speed: 1 * screenratio,
      HP: 10,
      maxHP: 10,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship
      particles: [22, 22 * screenratio, -1 * screenratio, 0, 0.1],
    },
    SG40: {
      // 2 - goblin
      type: "SG40",
      behaviour: "ignore",
      sprite: sprite.enemy_SG40,
      widthOnPic: 48,
      heightOnPic: 50,
      //Ingame stats
      width: 48 * screenratio,
      height: 50 * screenratio,
      speed: 1 * screenratio,
      HP: 10,
      maxHP: 10,
      particles: [0, 0 * screenratio, 0 * screenratio, 0, 0],
    },
    pirateRaider: {
      type: "pirateRaider",
      behaviour: "chase",
      sprite: sprite.enemy_pirateRaider,
      chaseDistance: Infinity,
      widthOnPic: 60,
      heightOnPic: 32,
      //Ingame stats
      width: 60 * screenratio,
      height: 32 * screenratio,
      speed: 5 * screenratio,
      defaultSpeed: 5 * screenratio,
      HP: 5,
      maxHP: 5,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship
      particles: [10, 10 * screenratio, -1 * screenratio, 0, 0.1],
    },
    pirateMineDropper: {
      type: "pirateMineDropper",
      behaviour: "mine",
      sprite: sprite.enemy_pirateMinedropper,
      widthOnPic: 56,
      heightOnPic: 74,
      //Ingame stats
      width: 56 * screenratio,
      height: 74 * screenratio,
      speed: 1 * screenratio,
      HP: 15,
      maxHP: 15,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship, 3 : particlesX add, 4 : particlesY add
      particles: [10, 10 * screenratio, -6 * screenratio, 0, 0.1],
    },
    pirateMine: {
      type: "pirateMine",
      behaviour: "mine",
      sprite: sprite.enemy_pirateMine,
      widthOnPic: 44,
      heightOnPic: 44,
      //Ingame stats
      width: 44 * screenratio,
      height: 44 * screenratio,
      speed: 0.5 * screenratio,
      HP: 5,
      maxHP: 5,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship
      particles: [0, 0 * screenratio, 0 * screenratio, 0, 0],
    },
    pirateTiger: {
      type: "pirateTiger",
      behaviour: "ignore",
      sprite: sprite.enemy_pirateTiger,
      widthOnPic: 70,
      heightOnPic: 70,
      //Ingame stats
      width: 70 * screenratio,
      height: 70 * screenratio,
      speed: 2 * screenratio,
      HP: 5,
      maxHP: 5,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship
      particles: [18, 18 * screenratio, -13 * screenratio, 0, 0.1],
    },
    pirateVessel: {
      type: "pirateVessel",
      behaviour: "orbit",
      sprite: sprite.enemy_pirateVessel,
      widthOnPic: 76,
      heightOnPic: 158,
      //Ingame stats
      width: 76 * screenratio,
      height: 158 * screenratio,
      speed: 3 * screenratio,
      HP: 50,
      maxHP: 50,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : heightOnCanvas, 2 : distance from ship
      particles: [46, 46 * screenratio, -79 * screenratio, 0, 0.1],
      orbit: true,
      inOrbit: false,
    },
    voidDrone: {
      type: "voidDrone",
      behaviour: "ignore",
      sprite: sprite.enemy_voidDrone,
      widthOnPic: 60,
      heightOnPic: 60,
      //Ingame stats
      width: 30 * screenratio,
      height: 30 * screenratio,
      speed: 1 * screenratio,
      HP: 2,
      maxHP: 2,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : widthOnCanvas, 2 : YdistanceFromShip, 3 : heightOnCanvas
      particles: [0, 0 * screenratio, 0 * screenratio, 0],
    },
    voidChaser: {
      type: "voidChaser",
      behaviour: "ignore",
      sprite: sprite.enemy_voidChaser,
      widthOnPic: 48,
      heightOnPic: 62,
      //Ingame stats
      width: 48 * screenratio,
      height: 62 * screenratio,
      speed: 1 * screenratio,
      HP: 7,
      maxHP: 7,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : widthOnCanvas, 2 : YdistanceFromShip, 3 : heightOnCanvas
      particles: [0, 0 * screenratio, 0 * screenratio, 0],
    },
    voidSphereFighter: {
      type: "voidSphereFighter",
      behaviour: "ignore",
      sprite: sprite.enemy_voidSpherefighter,
      widthOnPic: 64,
      heightOnPic: 64,
      //Ingame stats
      width: 128 * screenratio,
      height: 128 * screenratio,
      speed: 1 * screenratio,
      HP: 20,
      maxHP: 20,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : widthOnCanvas, 2 : YdistanceFromShip, 3 : heightOnCanvas
      particles: [0, 0 * screenratio, 0 * screenratio, 0],
      animation: true,
      animationFrames: 8,
      animationFPS: 5,
    },
    voidChakram: {
      type: "voidChakram",
      behaviour: "ignore",
      sprite: sprite.enemy_voidChakram,
      widthOnPic: 180,
      heightOnPic: 180,
      //Ingame stats
      width: 180 * screenratio,
      height: 180 * screenratio,
      speed: 0.5 * screenratio,
      HP: 50,
      maxHP: 50,
      //Custom thruster fire parameters
      //0 : heightOnPic, 1 : widthOnCanvas, 2 : YdistanceFromShip, 3 : heightOnCanvas
      particles: [0, 0 * screenratio, 0 * screenratio, 0],
      animation: true,
      animationFrames: 4,
      animationFPS: 12,
    },
  };
}
