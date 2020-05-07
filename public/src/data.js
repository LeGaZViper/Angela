//List of spritemaps (might use only one in the final version) | used in: rendering
const sprite = {
  enemy_smallCube: new Image(),
  enemy_largeCube: new Image(),
  enemy_buzz: new Image(),
  player_scout: new Image(),
  player_scout2: new Image(),
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
  UI_dialogueBG: new Image(),
  UI_dialogueBGgrill: new Image(),
  UI_motherboard: new Image(),
  UI_motherboardRay: new Image(),
  UI_motherboardAngela: new Image(),
  UI_motherboardMap: new Image(),
  UI_motherboardFan: new Image(),
  UI_ignore: new Image(),
  UI_drop: new Image(),
};

//Default database for ingame weapons | used in: first inicialization
const weaponDatabase = {
  BASIC: {
    index: 0,
    sprite: sprite.projectile_BASIC,
    name: "BASIC",
    bullets: 1,
    damage: 3,
    speed: 15,
    width: 5,
    height: 50,
    cooldown: 150,
    duration: 0,
    color: "#5C7CFF",
    status: "DEFAULT",
  },
  DOUBLE: {
    index: 1,
    sprite: sprite.projectile_BASIC,
    name: "DOUBLE",
    bullets: 2,
    damage: 3,
    speed: 15,
    width: 5,
    height: 50,
    cooldown: 150,
    duration: 600,
    color: "#5C7CFF",
    status: "LOCKED",
  },
  SPRAY: {
    index: 2,
    sprite: sprite.projectile_BASIC,
    name: "SPRAY",
    bullets: 3,
    damage: 3,
    speed: 15,
    width: 5,
    height: 50,
    cooldown: 150,
    duration: 600,
    color: "#B2B5FF",
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
    color: "#B2B5FF",
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
  LASER: {
    index: 6,
    name: "LASER",
    bullets: 1,
    damage: 1,
    speed: 0,
    width: 1,
    height: 1,
    cooldown: 1,
    duration: 600,
    piercing: true,
    hitCD: 200,
    color: "#B2B5FF",
    status: "LOCKED",
  },
};

class DefaultShip {
  constructor() {
    this.name = "SCOUT";
    this.speed = 10;
    this.width = 75;
    this.height = 75;
    this.widthOnPic = 150;
    this.heightOnPic = 150;
    this.weaponDuration = 0;
    this.particles = [22, 2, 30, 0, 0.05];
    this.maxShield = [0, 1];
    this.maxHP = [10, 5];
    this.section = 1;
    this.level = 1;
  }
}

/*
ENEMY IDEAS:
  ball
  cell
*/

const enemyDatabase = {
  test: {
    type: "buzz",
    behaviour: "ignore",
    sprite: sprite.enemy_buzz,
    widthOnPic: 56,
    heightOnPic: 62,
    //Ingame stats
    width: 45,
    height: 50,
    speed: 0,
    HP: 6,
    maxHP: 6,
    particles: [10, 10, -1, 0, 0.1],
  },
  smallCube: {
    type: "smallCube",
    chaseDistance: Infinity,
    behaviour: "chase",
    sprite: sprite.enemy_smallCube,
    widthOnPic: 75,
    heightOnPic: 75,
    width: 60,
    height: 60,
    speed: 5,
    defaultSpeed: 5,
    HP: 6,
    maxHP: 6,
    particles: [0, 0, 0, 0, 0],
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFrames: 9,
  },
  largeCube: {
    type: "largeCube",
    behaviour: "ignore",
    sprite: sprite.enemy_largeCube,
    cache: ["smallCube", 3],
    widthOnPic: 150,
    heightOnPic: 150,
    width: 150,
    height: 150,
    speed: 2,
    defaultSpeed: 2,
    HP: 10,
    maxHP: 10,
    particles: [0, 0, 0, 0, 0],
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFrames: 9,
  },
};
