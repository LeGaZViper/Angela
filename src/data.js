//List of spritemaps (might use only one in the final version) | used in: rendering
const sprite = {
  enemy_cube: new Image(),
  enemy_betaCube: new Image(),
  enemy_looterCube: new Image(),
  enemy_largeCube: new Image(),
  enemy_icosphere: new Image(),
  enemy_mail: new Image(),
  enemy_star: new Image(),
  enemy_starPiece: new Image(),
  enemy_miniArrow: new Image(),
  enemy_corruptedCloud: new Image(),
  enemy_carrier: new Image(),
  enemy_carrierTurret: new Image(),
  enemy_watcher: new Image(),
  enemy_watcherTurret: new Image(),
  player_scout: new Image(),
  player_companion: new Image(),
  projectile_ROCKET: new Image(),
  projectile_BASIC: new Image(),
  projectile_CHAKRAM: new Image(),
  projectile_NEON: new Image(),
  projectile_enemyBASIC: new Image(),
  projectile_enemyCLOUD: new Image(),
  projectile_enemyBETABASIC: new Image(),
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
  UI_motherboardGPUFan: new Image(),
  UI_dialogueBubble: new Image(),
  UI_visibility: new Image(),
  UI_warning: new Image(),
  UI_chase: new Image(),
  UI_ignore: new Image(),
  UI_spawn: new Image(),
  UI_loot: new Image(),
  UI_drop: new Image(),
};

const DialogueData = {
  dialoguesUsed: [],
  level_0: {
    text: [
      "Thank God, you're still operational...#Listen... we are in danger!",
      "My name is Angela. I'm...",
      "WARNING: FIREWALL INTEGRITY 80%#INTRUDERS DETECTED IN THE MAIN CHAMBER",
      "Oh no... they're already here...",
      "Please, just... try to hold them off.#I'll think of something to help us out.",
      "You're doing good...#I'll try to block as many as I can!#The rest needs to be deleted ASAP.",
    ],
    color: ["white", "white", "orange", "white", "white", "white"],
    triggerType: ["timer", "after", "after", "after", "after", "wave"], //timer - level timer, wave - start of a wave, after - goes right after a specific dialogue index
    triggerIndex: [240, 0, 1, 2, 3, 3],
    ttl: [200, 1, 200, 200, 200, 200], //ttl - time to stay on the screen after typing is done
  },
  level_1: {
    text: [
      "Adjacent networks are full of them!",
      "It's... scary... we need to get rid of them!",
      "I've managed to corrupt some of them.#See if you can salvage their remains!",
      "Maybe if we somehow disconnect from# the main network...",
      "If I'd take a guess I'd say# there are network drivers for this...",
      "WARNING: FIREWALL INTEGRITY 60%",
    ],
    color: ["white", "white", "white", "white", "white", "orange"],
    triggerType: ["timer", "after", "after", "wave", "after", "wave"], //timer - level timer, wave - start of a wave, after - goes right after a specific dialogue index
    triggerIndex: [240, 0, 1, 2, 3, 3],
    ttl: [200, 200, 200, 200, 200, 200],
  },
  level_2: {
    text: [
      "I've found the drivers!#I need to access them!",
      "Stall for more time or we're doomed!",
      "WARNING: FIREWALL INTEGRITY 30%",
      "Just a little longer!#Gosh, I wish drivers weren't so complicated.",
    ],
    color: ["white", "white", "orange", "white"],
    triggerType: ["timer", "after", "wave", "wave"], //timer - level timer, wave - start of a wave, after - goes right after a specific dialogue index
    triggerIndex: [240, 0, 2, 3],
    ttl: [200, 200, 200, 200],
  },
  level_3: {
    text: [
      "I've found another defense node to help us out.",
      "It's very primitive with no intelligence whatsover,#but it can copy your attacks and movement.",
      "This is bad... I'm sensing some heavy bitpower#heading our way.",
      "These units are powerful enough# to bypass my encryption.",
      "You need to keep them away from me!",
      "CRITICAL: FIREWALL INTEGRITY 10%",
    ],
    color: ["white", "white", "white", "white", "white", "orange"],
    triggerType: ["timer", "after", "wave", "after", "after", "wave"], //timer - level timer, wave - start of a wave, after - goes right after a specific dialogue index
    triggerIndex: [240, 0, 2, 2, 3, 3],
    ttl: [200, 200, 200, 200, 200, 200],
  },
  level_4: {
    text: [
      "It's done!",
      "Now how do I... password?#WHAT DO YOU MEAN I NEED A PASSWORD?!",
      "123456",
      "INVALID PASSWORD",
      "admin",
      "INVALID PASSWORD",
    ],
    color: ["white", "white", "white", "yellow", "white", "yellow"],
    triggerType: ["timer", "after", "wave", "after", "after", "after"], //timer - level timer, wave - start of a wave, after - goes right after a specific dialogue index
    triggerIndex: [240, 0, 2, 2, 3, 4],
    ttl: [200, 200, 1, 100, 1, 100],
  },
};

//Default database for ingame weapons | used in: first inicialization
const WeaponData = {
  BASIC: {
    index: 0,
    sprite: sprite.projectile_BASIC,
    name: "BASIC",
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 3,
    damageFallOff: 1,
    speed: 20,
    widthOnPic: 5,
    heightOnPic: 50,
    cooldown: 200,
    ttl: 300,
  },
  DOUBLE: {
    index: 1,
    sprite: sprite.projectile_BASIC,
    name: "DOUBLE",
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 2,
    damage: 3,
    damageFallOff: 2,
    speed: 20,
    widthOnPic: 5,
    heightOnPic: 50,
    cooldown: 200,
    duration: 600,
    ttl: 300,
  },
  SPRAY: {
    index: 2,
    sprite: sprite.projectile_BASIC,
    name: "SPRAY",
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 3,
    damage: 3,
    damageFallOff: 2,
    speed: 20,
    widthOnPic: 5,
    heightOnPic: 50,
    cooldown: 200,
    duration: 600,
    ttl: 300,
  },
  ROCKET: {
    index: 3,
    sprite: sprite.projectile_ROCKET,
    name: "ROCKET",
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: false,
    explosive: true,
    bullets: 1,
    damage: 5,
    damageFallOff: 1,
    speed: 7,
    widthOnPic: 12,
    heightOnPic: 33,
    cooldown: 300,
    duration: 600,
    ttl: 300,
  },
  SPREADER: {
    index: 4,
    sprite: sprite.projectile_SPREADER,
    name: "SPREADER",
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 2,
    damageFallOff: 1,
    speed: 8,
    widthOnPic: 14,
    heightOnPic: 30,
    cooldown: 300,
    duration: 600,
    piercing: false,
    ttl: 300,
  },
  SPREADER_PROJECTILE: {
    index: 99,
    sprite: sprite.projectile_spreadProjectile,
    name: "SPREADER_PROJECTILE",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 2,
    speed: 15,
    widthOnPic: 7,
    heightOnPic: 13,
    piercing: false,
    ttl: 300,
  },
  LASER: {
    index: 5,
    name: "LASER",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 3,
    damageFallOff: 1,
    speed: 0,
    widthOnPic: 6,
    heightOnPic: 6,
    cooldown: 1,
    duration: 600,
    piercing: true,
    hitCD: 150,
    color: "#B2B5FF",
    ttl: 0,
  },
  CHAKRAM: {
    index: 6,
    sprite: sprite.projectile_CHAKRAM,
    name: "CHAKRAM",
    sound: "player_CHAKRAM",
    animation: false,
    rotationAnimation: true,
    rotationSpeed: 20,
    bullets: 1,
    damage: 5,
    damageFallOff: 3,
    speed: 15,
    widthOnPic: 70,
    heightOnPic: 70,
    cooldown: 300,
    duration: 600,
    piercing: true,
    hitCD: 200,
    ttl: 300,
  },
  NEONTHROWER: {
    index: 7,
    sprite: sprite.projectile_NEON,
    name: "NEONTHROWER",
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: true,
    rotationSpeed: 10,
    bullets: 1,
    damage: 4,
    damageFallOff: 2,
    speed: 7,
    widthOnPic: 50,
    heightOnPic: 50,
    cooldown: 25,
    duration: 600,
    piercing: true,
    hitCD: 200,
    ttl: 70,
  },
  INVICIBLEDRILL: {
    index: 8,
    name: "INVICIBLEDRILL",
    sprite: sprite.projectile_BASIC,
    sound: "player_BASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 3,
    damageFallOff: 1,
    speed: 15,
    widthOnPic: 5,
    duration: 600,
    heightOnPic: 50,
    cooldown: 200,
    ttl: 0,
  },
};

class DefaultSetup {
  constructor() {
    this.level = 0;
    this.musicMultiplier = 5;
    this.soundMultiplier = 5;
  }
}

const enemyWeaponData = {
  BASIC: {
    sprite: sprite.projectile_enemyBASIC,
    sound: "enemy_BASIC",
    name: "BASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 15,
    speed: 15,
    widthOnPic: 5,
    heightOnPic: 50,
    ttl: 300,
  },
  BETABASIC: {
    sprite: sprite.projectile_enemyBETABASIC,
    sound: "enemy_BASIC",
    name: "BETABASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 10,
    speed: 14,
    widthOnPic: 5,
    heightOnPic: 50,
    ttl: 300,
  },
  UPLOADBASIC: {
    sprite: sprite.projectile_enemyBASIC,
    sound: "enemy_BASIC",
    name: "UPLOADBASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 10,
    speed: 8,
    widthOnPic: 5,
    heightOnPic: 50,
    width: 10,
    height: 100,
    ttl: 300,
  },
  MINIBASIC: {
    sprite: sprite.projectile_enemyBASIC,
    name: "MINIBASIC",
    sound: "enemy_MINIBASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 5,
    speed: 10,
    widthOnPic: 4,
    heightOnPic: 25,
    ttl: 300,
  },
  CLOUD: {
    sprite: sprite.projectile_enemyCLOUD,
    name: "CLOUD",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 2,
    speed: 7,
    widthOnPic: 13,
    heightOnPic: 45,
    ttl: 100,
  },
  WATCHERBASIC: {
    sprite: sprite.projectile_enemyBASIC,
    piercing: true,
    name: "WATCHERBASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 20,
    speed: 8,
    widthOnPic: 5,
    heightOnPic: 50,
    width: 8,
    height: 70,
    ttl: 300,
  },
  CARRIERBASIC: {
    sprite: sprite.projectile_enemyBASIC,
    piercing: true,
    sound: "enemy_BASIC",
    name: "CARRIERBASIC",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 10,
    speed: 10,
    widthOnPic: 5,
    heightOnPic: 50,
    width: 6,
    height: 55,
    ttl: 300,
  },
};

/*
ENEMY IDEAS:
  ball
  cell
*/

const EnemyData = {
  cube: {
    type: "cube",
    chaseDistance: Infinity,
    behaviour: "chase",
    sprite: sprite.enemy_cube,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2000,
    bulletType: "BASIC",
    collisionDamage: 10,
    width: 60,
    height: 60,
    speed: 5,
    defaultSpeed: 5,
    HP: 8,
    maxHP: 8,
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFPS: 3,
    deathAnimationFrames: 9,
  },
  betaCube: {
    type: "betaCube",
    chaseDistance: Infinity,
    behaviour: "chase",
    sprite: sprite.enemy_betaCube,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2500,
    bulletType: "BETABASIC",
    bullets: 3,
    collisionDamage: 15,
    width: 75,
    height: 75,
    speed: 6,
    defaultSpeed: 6,
    HP: 13,
    maxHP: 13,
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFPS: 3,
    deathAnimationFrames: 9,
  },
  lootCube: {
    type: "lootCube",
    behaviour: "loot",
    sprite: sprite.enemy_looterCube,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2000,
    bulletType: "BASIC",
    collisionDamage: 10,
    randomDrop: true,
    width: 60,
    height: 60,
    speed: 10,
    defaultSpeed: 10,
    HP: 6,
    maxHP: 6,
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFPS: 3,
    deathAnimationFrames: 9,
  },
  icosphere: {
    type: "icosphere",
    chaseDistance: Infinity,
    behaviour: "chase",
    sprite: sprite.enemy_icosphere,
    rotation: true,
    widthOnPic: 85,
    heightOnPic: 85,
    attackCDvalue: 2000,
    bulletType: "BASIC",
    collisionDamage: 10,
    width: 85,
    height: 85,
    speed: 5,
    defaultSpeed: 5,
    HP: 10,
    maxHP: 10,
    animation: true,
    animationFrames: 7,
    animationFPS: 12,
    deathAnimationFPS: 6,
    deathAnimationFrames: 5,
  },
  mail: {
    type: "mail",
    behaviour: "spawn",
    sprite: sprite.enemy_mail,
    rotation: false,
    widthOnPic: 90,
    heightOnPic: 90,
    attackCDvalue: 6000,
    maximumSpawns: 4,
    spawns: 0,
    bulletType: "miniArrow",
    collisionDamage: 10,
    width: 90,
    height: 90,
    speed: 3,
    defaultSpeed: 3,
    HP: 20,
    maxHP: 20,
    animation: false,
    spawnAnimationFrames: 5,
    spawnAnimationFPS: 6,
    spawnAnimationIndex: 0,
    deathAnimationFPS: 6,
    deathAnimationFrames: 6,
  },
  miniArrow: {
    type: "miniArrow",
    behaviour: "chase",
    sprite: sprite.enemy_miniArrow,
    rotation: true,
    widthOnPic: 40,
    heightOnPic: 40,
    attackCDvalue: 2000,
    bulletType: "MINIBASIC",
    collisionDamage: 5,
    width: 40,
    height: 40,
    speed: 5,
    defaultSpeed: 5,
    HP: 4,
    maxHP: 4,
    animation: true,
    animationFrames: 6,
    animationFPS: 10,
    deathAnimationFPS: 6,
    deathAnimationFrames: 4,
  },
  largeCube: {
    type: "largeCube",
    behaviour: "ignore",
    sprite: sprite.enemy_largeCube,
    rotation: true,
    cache: ["cube", 3],
    widthOnPic: 150,
    heightOnPic: 150,
    attackCDvalue: 2000,
    bulletType: "UPLOADBASIC",
    collisionDamage: 10,
    width: 150,
    height: 150,
    speed: 2,
    defaultSpeed: 2,
    HP: 10,
    maxHP: 10,
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFPS: 3,
    deathAnimationFrames: 9,
  },
  star: {
    type: "star",
    behaviour: "spawn",
    sprite: sprite.enemy_star,
    rotation: false,
    widthOnPic: 120,
    heightOnPic: 120,
    attackCDvalue: 5000,
    bulletType: "starPiece",
    maximumSpawns: 16,
    spawns: 0,
    collisionDamage: 25,
    width: 120,
    height: 120,
    speed: 3,
    defaultSpeed: 3,
    HP: 10,
    maxHP: 10,
    animation: true,
    animationFrames: 4,
    animationFPS: 6,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
  starPiece: {
    type: "starPiece",
    behaviour: "collide",
    collisionDamage: 20,
    sprite: sprite.enemy_starPiece,
    rotation: true,
    widthOnPic: 40,
    heightOnPic: 40,
    width: 40,
    height: 40,
    speed: 4,
    defaultSpeed: 4,
    HP: 1,
    maxHP: 1,
    animation: false,
  },
  corruptedCloud: {
    type: "corruptedCloud",
    behaviour: "chase",
    bulletType: "CLOUD",
    attackCDvalue: 50,
    collisionDamage: 20,
    sprite: sprite.enemy_corruptedCloud,
    rotation: false,
    widthOnPic: 120,
    heightOnPic: 120,
    width: 120,
    height: 120,
    speed: 2,
    defaultSpeed: 2,
    HP: 50,
    maxHP: 50,
    animation: true,
    animationFrames: 4,
    animationFPS: 6,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
  carrier: {
    type: "carrier",
    behaviour: "ignore",
    bulletType: "UPLOADBASIC",
    turretBulletType: "CARRIERBASIC",
    turrets: 4,
    turretDist: [50, 120, 50, 120],
    cache: ["miniArrow", 5],
    turretAngle: [0, 0, 0, 0],
    turretWidthOnPic: 60,
    turretHeightOnPic: 60,
    attackCDvalue: 2500,
    collisionDamage: 20,
    sprite: sprite.enemy_carrier,
    rotation: true,
    turretSprite: sprite.enemy_carrierTurret,
    widthOnPic: 100,
    heightOnPic: 200,
    width: 150,
    height: 300,
    speed: 1,
    defaultSpeed: 1,
    HP: 50,
    maxHP: 50,
    animation: false,
    deathAnimationFPS: 8,
    deathAnimationFrames: 5,
  },
  watcher: {
    type: "watcher",
    behaviour: "ignore",
    sprite: sprite.enemy_watcher,
    turretSprite: sprite.enemy_watcherTurret,
    rotation: true,
    turrets: 1,
    turretDist: [0],
    turretAngle: [0],
    turretWidthOnPic: 40,
    turretHeightOnPic: 40,
    widthOnPic: 70,
    heightOnPic: 70,
    attackCDvalue: 2000,
    turretBulletType: "WATCHERBASIC",
    bulletType: "UPLOADBASIC",
    collisionDamage: 10,
    width: 120,
    height: 120,
    speed: 2,
    defaultSpeed: 2,
    HP: 50,
    maxHP: 50,
    animation: true,
    animationFrames: 10,
    animationFPS: 5,
    deathAnimationFPS: 8,
    deathAnimationFrames: 5,
  },
};
