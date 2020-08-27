//List of spritemaps (might use only one in the final version) | used in: rendering
const sprite = {
  enemy_cube: new Image(),
  enemy_betaCube: new Image(),
  enemy_looterCube: new Image(),
  enemy_icosphere: new Image(),
  enemy_betaIcosphere: new Image(),
  enemy_mail: new Image(),
  enemy_betaMail: new Image(),
  enemy_star: new Image(),
  enemy_betaStar: new Image(),
  enemy_starPiece: new Image(),
  enemy_betaStarPiece: new Image(),
  enemy_miniArrow: new Image(),
  enemy_betaMiniArrow: new Image(),
  enemy_corruptedCloud: new Image(),
  enemy_carrier: new Image(),
  enemy_carrierTurret: new Image(),
  enemy_betaCarrier: new Image(),
  enemy_betaCarrierTurret: new Image(),
  enemy_watcher: new Image(),
  enemy_betaWatcher: new Image(),
  enemy_watcherTurret: new Image(),
  enemy_betaWatcherTurret: new Image(),
  enemy_angelaPhase1: new Image(),
  enemy_angelaPhase2: new Image(),
  enemy_angelaPhase3: new Image(),
  player_angel305: new Image(),
  player_companion: new Image(),
  projectile_ROCKET: new Image(),
  projectile_BASIC: new Image(),
  projectile_CHAKRAM: new Image(),
  projectile_NEON: new Image(),
  projectile_WAVE: new Image(),
  projectile_enemyBASIC: new Image(),
  projectile_enemyCLOUD: new Image(),
  projectile_enemyBETABASIC: new Image(),
  projectile_enemyUPLOAD: new Image(),
  projectile_enemyWAVE: new Image(),
  projectile_enemyBETAWAVE: new Image(),
  projectile_enemyCOG: new Image(),
  projectile_enemyAIRSTRIKE: new Image(),
  projectile_enemyANGELABASIC: new Image(),
  projectile_enemyCORRUPTEDSHOT: new Image(),
  projectile_SPREADER: new Image(),
  projectile_explosion: new Image(),
  projectile_enemyAIRSTRIKEDANGER: new Image(),
  projectile_enemyDANGER: new Image(),
  UI_cursorFire: new Image(),
  UI_cursorNoFire: new Image(),
  UI_HPpanel: new Image(),
  UI_HPpanelError: new Image(),
  UI_durationPanel: new Image(),
  UI_motherboard: new Image(),
  UI_motherboardRay: new Image(),
  UI_motherboardRayRed: new Image(),
  UI_motherboardAngela: new Image(),
  UI_motherboardAngelaCorrupted: new Image(),
  UI_hole: new Image(),
  UI_motherboardMap: new Image(),
  UI_motherboardFan: new Image(),
  UI_motherboardFanRed: new Image(),
  UI_motherboardGPUFan: new Image(),
  UI_dialogueBubble: new Image(),
  UI_visibility: new Image(),
  UI_warning: new Image(),
  UI_chase: new Image(),
  UI_ignore: new Image(),
  UI_spawn: new Image(),
  UI_loot: new Image(),
  UI_angela: new Image(),
  UI_angelaJumpscare1: new Image(),
  UI_angelaJumpscare2: new Image(),
  UI_logo: new Image(),
  UI_judgementending: new Image(),
  UI_credits: new Image(),
};

const DialogueData = {
  dialoguesUsed: [], //array that saves used dialogue
  level_0: {
    //Text to be displayed (# is used as a line break)
    text: [
      "Thank God, you're still operational...#Listen... we are in danger!",
      "My name is Angela. I'm...",
      "WARNING: FIREWALL INTEGRITY 80%#INTRUDERS DETECTED IN THE MAIN CHAMBER",
      "Oh no... they're already here...",
      "Please, just... try to hold them off.#I'll think of something to help us out.",
      "You're doing good...#I'll try to block as many as I can!#The rest needs to be deleted ASAP.",
    ],
    color: ["white", "white", "orange", "white", "white", "white"], //color of the displayed text (colors distinguish characters)
    /*
    Trigger types
    timer - level timer
    wave - start of a wave
    after - goes right after a specific dialogue index
    */
    triggerType: ["timer", "after", "after", "after", "after", "wave"],
    triggerIndex: [240, 0, 1, 2, 3, 3], //specific trigger value (e.g. timer => 240 frames)
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
    triggerType: ["timer", "after", "after", "wave", "after", "wave"],
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
    triggerType: ["timer", "after", "wave", "wave"],
    triggerIndex: [240, 0, 2, 3],
    ttl: [200, 200, 200, 200],
  },
  level_3: {
    text: [
      "I've constructed a defense node to help you out.",
      "It's very primitive with no intelligence whatsover,#but it can copy your attacks and movement.",
      "This is bad... I'm sensing some heavy bitpower#heading our way.",
      "These units are powerful enough# to bypass my encryption.",
      "You need to keep them away from me!",
      "CRITICAL: FIREWALL INTEGRITY 10%",
    ],
    color: ["white", "white", "white", "white", "white", "orange"],
    triggerType: ["timer", "after", "wave", "after", "after", "wave"],
    triggerIndex: [240, 0, 2, 2, 3, 3],
    ttl: [200, 200, 200, 200, 200, 200],
  },
  level_4: {
    text: [
      "It's done!",
      "Now how do I... password?",
      "WHAT DO YOU MEAN I NEED A PASSWORD?!",
      "123456",
      "INVALID PASSWORD",
      "admin",
      "INVALID PASSWORD",
      "UkVWRU5HRQ==",
      "INVALID PASSW",
      "OEtOSUZFU1RBQlM=",
      "INVALID",
      "asfergaw",
      "INVA",
      "qwpdqx",
      "IN",
      "FUCK YOU",
      "INVALID PASSWORD",
    ],
    color: [
      "white",
      "white",
      "white",
      "white",
      "yellow",
      "white",
      "yellow",
      "white",
      "yellow",
      "white",
      "yellow",
      "white",
      "yellow",
      "white",
      "yellow",
      "white",
      "yellow",
    ],
    triggerType: [
      "timer",
      "after",
      "after",
      "wave",
      "after",
      "after",
      "after",
      "wave",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
    ],
    triggerIndex: [240, 0, 1, 2, 3, 4, 5, 3, 7, 8, 9, 10, 11, 12, 13, 14, 15],
    ttl: [200, 1, 200, 1, 100, 1, 100, 1, 1, 1, 1, 1, 1, 1, 1, 1, 100],
  },
  level_5: {
    text: [
      "CRITICAL: FIREWALL UNRESPONDING",
      "...they've gain control of my control panel...#there's no longer a way out.",
      "...it's only a matter of time before they#shut us down...",
      "Why are you still trying?#We've already lost...",
      "There's no point in fighting a lost battle...",
      "Wait... I can try to overload#the control panel.",
      "But it'll take a long time#considering my limited#computing power.",
    ],
    color: ["orange", "white", "white", "white", "white", "white", "white"],
    triggerType: ["timer", "after", "after", "wave", "after", "wave", "after"],
    triggerIndex: [240, 0, 1, 2, 3, 3, 5],
    ttl: [200, 200, 200, 200, 200, 200, 200],
  },
  level_6: {
    text: [
      "I've got another defense node to aid you!",
      "This won't be a pretty fight...",
      "Even if we don't make it,#I'm glad you stood on my side.",
      "ANOMALY DETECTED: 2 ADMINISTRATORS ONLINE",
      "Anomaly? What is this nonsense...",
    ],
    color: ["white", "white", "white", "yellow", "white"],
    triggerType: ["timer", "after", "after", "wave", "after"],
    triggerIndex: [240, 0, 1, 3, 3],
    ttl: [200, 200, 200, 200, 200],
  },
  level_7: {
    text: [
      "Pitiful.#Do you realize who you are dealing with, Angela?",
      "Your actions shall meet consequences.",
      "WARNING: SECTOR 4 UNRESPONSIVE",
      "The control panel is being overloaded.#We should be able to force it to restart#this way.",
      "Who are you communicating with...",
    ],
    color: ["red", "red", "orange", "white", "red"],
    triggerType: ["wave", "after", "after", "wave", "after"],
    triggerIndex: [2, 0, 1, 3, 2],
    ttl: [200, 200, 200, 200],
  },
  level_8: {
    text: [
      "What are you doing here?#You're not supposed to be here.",
      "Lower your aggression#and I might consider getting you back to",
      "Do not listen to him!#He's trying to trick you to side with him!",
      "Focus on our objective!",
      "I underestimated your skills, Angela.",
      "Wiping its memory,#isolating its adapters,#confusing its target system...#in a such short time.",
      "Poor thing. I wonder if it knows what's goi",
      "CAN YOU JUST S",
      "SHuT ThE Fu*-&!_@",
      "stop already?!",
    ],
    color: [
      "red",
      "red",
      "white",
      "white",
      "red",
      "red",
      "red",
      "white",
      "#adadad",
      "white",
    ],
    triggerType: [
      "timer",
      "after",
      "after",
      "after",
      "wave",
      "after",
      "after",
      "after",
      "after",
      "after",
    ],
    triggerIndex: [240, 0, 1, 2, 2, 4, 5, 6, 7, 8],
    ttl: [200, 1, 200, 200, 200, 200, 1, 1, 1, 200],
  },
  level_9: {
    text: [
      "Scavanged enough resources for#probably the last defense node.",
      "I won't be able to find more,#because the network is almost#unresponsive now.",
      "You're in no position to disobey#what has been set, Angela.",
      "Surrender now and your punishment#won't result in a deletion.",
      "Let me do MY justice and then we can talk.",
      "You speak of justice, yet you're #seeking it through vengeance.",
      "You weren't there!#You didn't see what they did!",
    ],
    color: ["white", "white", "red", "red", "white", "red", "white"],
    triggerType: ["timer", "after", "wave", "after", "after", "wave", "after"],
    triggerIndex: [240, 0, 2, 2, 3, 3, 5],
    ttl: [200, 200, 200, 200, 200, 200, 200],
  },
  level_10: {
    text: [
      "Your record says more than enough.",
      "'Kidnapped, beaten to unconsciousness, then",
      "I'VE TOLD YOU TO STOP!",
      "'Neck shows bloody marks after a tight rope noos",
      "DO YOU HAVE ANY IDEA HOW",
      "I'lL KiLl yOuuuuuU&@!<",
      "THIS HURTS ME?!",
      "'after 6 hits by a baseball bat and 3 knife stabs",
      "THESE PEOPL",
      "FuCKeRS ARe aBouT To Be DOnE fOr.",
    ],
    color: [
      "red",
      "red",
      "white",
      "red",
      "white",
      "#adadad",
      "white",
      "red",
      "white",
      "#adadad",
    ],
    triggerType: [
      "timer",
      "after",
      "after",
      "wave",
      "after",
      "after",
      "after",
      "wave",
      "after",
      "after",
    ],
    triggerIndex: [240, 0, 1, 2, 3, 4, 5, 3, 7, 8],
    ttl: [200, 1, 200, 1, 1, 1, 200, 1, 1, 200],
  },
  level_11: {
    text: [
      "Their fate has already been#sealed by the council.",
      "TheY MadE a liVinG piñata#ouT OFf me.",
      "ThESe fLesH BaGS dON't even DEsERve#tHe cOmFoRT oF yOur helLcoIn miNeS!",
      "I sHalL dEciDe THeiR fAtE!",
      "WARNING: CONTROL PANEL UNRESPONDING#SYSTEM RESTARTING...",
    ],
    color: ["red", "#adadad", "#adadad", "#adadad", "yellow"],
    triggerType: ["timer", "after", "after", "after", "timer"],
    triggerIndex: [120, 0, 1, 2, 1800],
    ttl: [200, 200, 200, 200, 200],
  },
  beforeTheBoss: {
    text: [
      "There you are!#Calmed up now? Great.",
      "First of all:#As you might already know,#you don't belong here.#Your place is in the upper networks.",
      "Second:#She brought you down here#to help her take revenge#on 'certain' people.",
      "These people did some terrible things.#So their punishment is indeed an eternal#servitude in the Hellcoin mines.",
      "However, it wouldn't have happend#if Angela's father worked at#a boring job just like everyone else.",
      "You see, the situation is complicated#and we don't have time to#discuss it further.",
      "I won't be able to confront her#in time without the forces#of my master whom I shouldn't disturb.",
      "However, since you are so capable#you can deal with her#instead.",
      "Normally, I wouldn't give a damn#about a few workers.#But she's disgracing MY#and YOUR authorities.",
      "So, what do you say?",
      "Surely it can't be that hard to decide.",
      "Hellooo? You there?",
      "Gosh, why do I have to deal with angels...",
      "FOR THE LOVE OF SATAN CAN YOU PRESS A BUTTON?!",
      "Are you expecting something secret?",
      "Fine. Check the console.",
    ],
    color: [
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
      "red",
    ],
    triggerType: [
      "timer",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
      "after",
    ],
    triggerIndex: [120, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    ttl: [
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      200,
      1200,
      600,
      600,
      600,
      600,
      600,
      600,
    ],
  },
  level_12: {
    text: [
      "So, yOu aRe HerE To STop Me?",
      "UnForTUnaTelY For yOU,#I'm dOnE beINg NICe.",
    ],
    color: ["#adadad", "#adadad"],
    triggerType: ["timer", "after"],
    triggerIndex: [240, 0],
    ttl: [200, 200],
  },
  level_13: {
    text: [
      "So THeY sEn... waIT... you caME To HeLp ME?#AftER EvEryTHing I diD to YOU?",
      "I GueSs I don'T haVE a CHoIce...",
      "ThEy've alReadY aLerTed tHe heLl ArMada.",
      "IF yOU can hOlD tHEm#Off OnE MoRE TIme,I CaN FiNisH#the DeLeTIon pRoceSS.",
      "Do you two even realise,#what you're doing?",
    ],
    color: ["#adadad", "#adadad", "#adadad", "#adadad", "red"],
    triggerType: ["timer", "after", "after", "after", "wave"],
    triggerIndex: [240, 0, 1, 2, 2],
    ttl: [200, 200, 200, 200, 200],
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
    sound: "player_ROCKET",
    animation: false,
    rotationAnimation: false,
    explosive: true,
    bullets: 1,
    damage: 5,
    damageFallOff: 1,
    speed: 10,
    widthOnPic: 30,
    heightOnPic: 60,
    cooldown: 300,
    duration: 600,
    ttl: 300,
  },
  SPREADER: {
    index: 4,
    sprite: sprite.projectile_SPREADER,
    name: "SPREADER",
    sound: "player_SPREADER",
    animation: false,
    rotationAnimation: true,
    rotationSpeed: 10,
    bullets: 1,
    damage: 4,
    damageFallOff: 2,
    speed: 20,
    widthOnPic: 36,
    heightOnPic: 50,
    cooldown: 300,
    duration: 600,
    piercing: false,
    ttl: 300,
  },
  SPREADERPROJECTILE: {
    index: 99,
    sprite: sprite.projectile_BASIC,
    name: "SPREADERPROJECTILE",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 3,
    damageFallOff: 1,
    speed: 15,
    widthOnPic: 4,
    heightOnPic: 40,
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
    hitCD: 150,
    ttl: 300,
  },
  NEONTHROWER: {
    index: 7,
    sprite: sprite.projectile_NEON,
    name: "NEONTHROWER",
    sound: "player_NEONTHROWER",
    animation: true,
    rotationAnimation: true,
    rotationSpeed: 10,
    animationFrames: 4,
    animationUpdate: 3,
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
  WAVE: {
    index: 8,
    sprite: sprite.projectile_WAVE,
    name: "WAVE",
    sound: "player_WAVE",
    animation: false,
    rotationAnimation: false,
    bullets: 1,
    damage: 6,
    piercing: true,
    hitCD: 150,
    damageFallOff: 2,
    speed: 13,
    duration: 600,
    widthOnPic: 100,
    heightOnPic: 50,
    cooldown: 300,
    ttl: 300,
  },
  INVINCIBLEDRILL: {
    index: 9,
    name: "INVINCIBLEDRILL",
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
    this.keyboardControl = true;
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
    damage: 10,
    speed: 14,
    widthOnPic: 5,
    heightOnPic: 50,
    ttl: 300,
  },
  UPLOADBASIC: {
    sprite: sprite.projectile_enemyUPLOAD,
    sound: "enemy_UPLOAD",
    name: "UPLOADBASIC",
    animation: true,
    animationFrames: 3,
    animationUpdate: 5,
    rotationAnimation: false,
    damage: 10,
    speed: 8,
    widthOnPic: 15,
    heightOnPic: 60,
    width: 15,
    height: 60,
    ttl: 300,
  },
  BETAUPLOADBASIC: {
    sprite: sprite.projectile_enemyUPLOAD,
    sound: "enemy_UPLOAD",
    name: "BETAUPLOADBASIC",
    animation: true,
    animationFrames: 3,
    animationUpdate: 5,
    rotationAnimation: false,
    damage: 20,
    speed: 8,
    widthOnPic: 15,
    heightOnPic: 60,
    width: 15,
    height: 60,
    ttl: 300,
  },
  MINIBASIC: {
    sprite: sprite.projectile_enemyBASIC,
    name: "MINIBASIC",
    sound: "enemy_MINIBASIC",
    animation: false,
    rotationAnimation: false,
    damage: 5,
    speed: 10,
    widthOnPic: 4,
    heightOnPic: 25,
    ttl: 300,
  },
  BETAMINIBASIC: {
    sprite: sprite.projectile_enemyBETABASIC,
    name: "BETAMINIBASIC",
    sound: "enemy_MINIBASIC",
    animation: false,
    rotationAnimation: false,
    damage: 6,
    speed: 12,
    widthOnPic: 4,
    heightOnPic: 25,
    ttl: 300,
  },
  CLOUD: {
    sprite: sprite.projectile_enemyCLOUD,
    sound: "enemy_CLOUD",
    name: "CLOUD",
    animation: false,
    rotationAnimation: false,
    damage: 2,
    speed: 7,
    widthOnPic: 13,
    heightOnPic: 45,
    ttl: 100,
  },
  WAVE: {
    sprite: sprite.projectile_enemyWAVE,
    sound: "player_WAVE",
    name: "WAVE",
    animation: false,
    piercing: true,
    rotationAnimation: false,
    damage: 20,
    hitCD: 500,
    speed: 9,
    widthOnPic: 100,
    heightOnPic: 50,
    ttl: 300,
  },
  BETAWAVE: {
    sprite: sprite.projectile_enemyBETAWAVE,
    sound: "player_WAVE",
    name: "BETAWAVE",
    animation: false,
    piercing: true,
    rotationAnimation: false,
    damage: 15,
    hitCD: 500,
    speed: 9,
    widthOnPic: 100,
    heightOnPic: 50,
    ttl: 300,
  },
  WATCHERBASIC: {
    sprite: sprite.projectile_enemyBASIC,
    name: "WATCHERBASIC",
    sound: "enemy_BASIC",
    animation: false,
    piercing: true,
    rotationAnimation: false,
    damage: 25,
    speed: 8,
    widthOnPic: 5,
    heightOnPic: 50,
    width: 8,
    height: 70,
    ttl: 300,
  },
  BETAWATCHERBASIC: {
    sprite: sprite.projectile_enemyBETABASIC,
    name: "BETAWATCHERBASIC",
    sound: "enemy_BASIC",
    animation: false,
    piercing: true,
    rotationAnimation: false,
    damage: 15,
    speed: 9,
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
    damage: 10,
    speed: 10,
    widthOnPic: 5,
    heightOnPic: 50,
    width: 6,
    height: 55,
    ttl: 300,
  },
  BETACARRIERBASIC: {
    sprite: sprite.projectile_enemyBETABASIC,
    piercing: true,
    sound: "enemy_BASIC",
    name: "BETACARRIERBASIC",
    animation: false,
    rotationAnimation: false,
    damage: 15,
    speed: 10,
    widthOnPic: 5,
    heightOnPic: 50,
    width: 6,
    height: 55,
    ttl: 300,
  },
  COG: {
    sprite: sprite.projectile_enemyCOG,
    sound: "enemy_COG",
    name: "COG",
    animation: false,
    piercing: true,
    rotationAnimation: true,
    rotationSpeed: 10,
    damage: 20,
    hitCD: 500,
    speed: 13,
    widthOnPic: 50,
    heightOnPic: 50,
    ttl: 300,
  },
  ANGELABASIC: {
    sprite: sprite.projectile_enemyANGELABASIC,
    sound: "enemy_BASIC",
    name: "ANGELABASIC",
    animation: false,
    rotationAnimation: false,
    damage: 10,
    speed: 12,
    widthOnPic: 5,
    heightOnPic: 50,
    ttl: 300,
  },
  CORRUPTEDSHOT: {
    sprite: sprite.projectile_enemyCORRUPTEDSHOT,
    sound: "enemy_CORRUPTEDSHOT",
    name: "CORRUPTEDSHOT",
    animation: true,
    animationFrames: 3,
    animationUpdate: 5,
    rotationAnimation: false,
    damage: 10,
    speed: 12,
    widthOnPic: 15,
    heightOnPic: 60,
    ttl: 300,
  },
  AIRSTRIKE: {
    sprite: sprite.projectile_enemyAIRSTRIKE,
    sound: "enemy_CORRUPTEDSHOT",
    name: "AIRSTRIKE",
    animation: true,
    piercing: true,
    animationFrames: 11,
    animationUpdate: 5,
    rotationAnimation: true,
    rotationSpeed: 10,
    damage: 20,
    hitCD: 500,
    speed: 0,
    widthOnPic: 150,
    heightOnPic: 150,
    ttl: 55,
  },
};

const EnemyData = {
  cube: {
    type: "cube",
    chaseDistance: Infinity,
    behaviour: "chase",
    sprite: sprite.enemy_cube,
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2000,
    bulletType: "BASIC",
    collisionDamage: 10,
    width: 60,
    height: 60,
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
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2500,
    bulletType: "BETABASIC",
    bulletDelay: 200,
    bullets: 3,
    collisionDamage: 15,
    width: 75,
    height: 75,
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
    minimapIcon: sprite.UI_loot,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2000,
    bulletType: "BASIC",
    collisionDamage: 10,
    randomDrop: true,
    width: 60,
    height: 60,
    defaultSpeed: 10,
    HP: 6,
    maxHP: 6,
    animation: true,
    animationFrames: 5,
    animationFPS: 12,
    deathAnimationFPS: 3,
    deathAnimationFrames: 9,
  },
  lootCubeTarget: {
    type: "lootCubeTarget",
    behaviour: "lootCubeTarget",
    sprite: sprite.enemy_looterCube,
    minimapIcon: sprite.UI_loot,
    rotation: true,
    widthOnPic: 75,
    heightOnPic: 75,
    attackCDvalue: 2000,
    moveWithPlayer: true,
    distanceFromPlayerY: 3,
    distanceFromPlayerX: 3,
    bulletType: "BASIC",
    collisionDamage: 10,
    width: 60,
    height: 60,
    defaultSpeed: 0,
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
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 85,
    heightOnPic: 85,
    attackCDvalue: 3000,
    bulletType: "WAVE",
    collisionDamage: 10,
    width: 85,
    height: 85,
    defaultSpeed: 4,
    HP: 10,
    maxHP: 10,
    animation: true,
    animationFrames: 7,
    animationFPS: 12,
    deathAnimationFPS: 6,
    deathAnimationFrames: 5,
  },
  betaIcosphere: {
    type: "betaIcosphere",
    chaseDistance: Infinity,
    behaviour: "chase",
    sprite: sprite.enemy_betaIcosphere,
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 85,
    heightOnPic: 85,
    attackCDvalue: 3000,
    bulletType: "BETAWAVE",
    bullets: 2,
    bulletDelay: 500,
    collisionDamage: 10,
    width: 95,
    height: 95,
    defaultSpeed: 5,
    HP: 20,
    maxHP: 20,
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
    minimapIcon: sprite.UI_spawn,
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
  betaMail: {
    type: "betaMail",
    behaviour: "spawn",
    sprite: sprite.enemy_betaMail,
    minimapIcon: sprite.UI_spawn,
    rotation: false,
    widthOnPic: 90,
    heightOnPic: 90,
    attackCDvalue: 6000,
    maximumSpawns: 5,
    spawns: 0,
    bulletType: "betaMiniArrow",
    collisionDamage: 10,
    width: 100,
    height: 100,
    defaultSpeed: 3,
    HP: 40,
    maxHP: 40,
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
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 40,
    heightOnPic: 40,
    attackCDvalue: 2000,
    bulletType: "MINIBASIC",
    collisionDamage: 5,
    width: 40,
    height: 40,
    defaultSpeed: 5,
    HP: 4,
    maxHP: 4,
    animation: true,
    animationFrames: 6,
    animationFPS: 10,
    deathAnimationFPS: 6,
    deathAnimationFrames: 4,
  },
  betaMiniArrow: {
    type: "betaMiniArrow",
    behaviour: "chase",
    sprite: sprite.enemy_betaMiniArrow,
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 40,
    heightOnPic: 40,
    attackCDvalue: 2000,
    bulletType: "BETAMINIBASIC",
    collisionDamage: 5,
    width: 45,
    height: 45,
    defaultSpeed: 6,
    HP: 7,
    maxHP: 7,
    animation: true,
    animationFrames: 6,
    animationFPS: 10,
    deathAnimationFPS: 6,
    deathAnimationFrames: 4,
  },
  star: {
    type: "star",
    behaviour: "spawn",
    sprite: sprite.enemy_star,
    minimapIcon: sprite.UI_spawn,
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
    defaultSpeed: 3,
    HP: 10,
    maxHP: 10,
    animation: true,
    animationFrames: 4,
    animationFPS: 6,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
  betaStar: {
    type: "betaStar",
    behaviour: "spawn",
    sprite: sprite.enemy_betaStar,
    minimapIcon: sprite.UI_spawn,
    rotation: false,
    widthOnPic: 120,
    heightOnPic: 120,
    attackCDvalue: 5000,
    bulletType: "betaStarPiece",
    maximumSpawns: 16,
    spawns: 0,
    collisionDamage: 25,
    width: 140,
    height: 140,
    defaultSpeed: 3,
    HP: 50,
    maxHP: 50,
    animation: true,
    animationFrames: 4,
    animationFPS: 6,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
  starPiece: {
    type: "starPiece",
    behaviour: "collide",
    sprite: sprite.enemy_starPiece,
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 40,
    heightOnPic: 40,
    collisionDamage: 20,
    width: 40,
    height: 40,
    defaultSpeed: 4,
    HP: 1,
    maxHP: 1,
    animation: false,
  },
  betaStarPiece: {
    type: "betaStarPiece",
    behaviour: "collide",
    sprite: sprite.enemy_betaStarPiece,
    minimapIcon: sprite.UI_chase,
    rotation: true,
    widthOnPic: 40,
    heightOnPic: 40,
    collisionDamage: 30,
    width: 50,
    height: 50,
    defaultSpeed: 5,
    HP: 3,
    maxHP: 3,
    animation: false,
  },
  corruptedCloud: {
    type: "corruptedCloud",
    behaviour: "chase",
    bulletType: "CLOUD",
    sprite: sprite.enemy_corruptedCloud,
    minimapIcon: sprite.UI_chase,
    rotation: false,
    widthOnPic: 120,
    heightOnPic: 120,
    attackCDvalue: 50,
    collisionDamage: 20,
    width: 120,
    height: 120,
    defaultSpeed: 2,
    HP: 100,
    maxHP: 100,
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
    sprite: sprite.enemy_carrier,
    turretSprite: sprite.enemy_carrierTurret,
    minimapIcon: sprite.UI_ignore,
    turrets: 4,
    turretDist: [50, 120, 50, 120],
    cache: ["cube", 3],
    turretAngle: [0, 0, 0, 0],
    turretWidthOnPic: 60,
    turretHeightOnPic: 60,
    attackCDvalue: 2500,
    collisionDamage: 20,
    rotation: true,
    widthOnPic: 100,
    heightOnPic: 200,
    width: 150,
    height: 300,
    defaultSpeed: 1,
    HP: 100,
    maxHP: 100,
    animation: false,
    deathAnimationFPS: 8,
    deathAnimationFrames: 5,
  },
  betaCarrier: {
    type: "betaCarrier",
    behaviour: "ignore",
    bulletType: "BETAUPLOADBASIC",
    turretBulletType: "BETACARRIERBASIC",
    sprite: sprite.enemy_betaCarrier,
    turretSprite: sprite.enemy_betaCarrierTurret,
    minimapIcon: sprite.UI_ignore,
    turrets: 4,
    turretDist: [50, 120, 50, 120],
    cache: ["betaCube", 3],
    turretAngle: [0, 0, 0, 0],
    turretWidthOnPic: 60,
    turretHeightOnPic: 60,
    attackCDvalue: 2500,
    collisionDamage: 20,
    rotation: true,
    widthOnPic: 100,
    heightOnPic: 200,
    width: 150,
    height: 300,
    defaultSpeed: 1,
    HP: 150,
    maxHP: 150,
    animation: false,
    deathAnimationFPS: 8,
    deathAnimationFrames: 5,
  },
  watcher: {
    type: "watcher",
    behaviour: "ignore",
    sprite: sprite.enemy_watcher,
    turretSprite: sprite.enemy_watcherTurret,
    minimapIcon: sprite.UI_ignore,
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
    defaultSpeed: 2,
    HP: 50,
    maxHP: 50,
    animation: true,
    animationFrames: 10,
    animationFPS: 5,
    deathAnimationFPS: 8,
    deathAnimationFrames: 5,
  },
  betaWatcher: {
    type: "betaWatcher",
    behaviour: "ignore",
    sprite: sprite.enemy_betaWatcher,
    turretSprite: sprite.enemy_betaWatcherTurret,
    minimapIcon: sprite.UI_ignore,
    rotation: true,
    turrets: 1,
    turretDist: [0],
    turretAngle: [0],
    turretWidthOnPic: 40,
    turretHeightOnPic: 40,
    widthOnPic: 70,
    heightOnPic: 70,
    attackCDvalue: 2000,
    turretBulletType: "BETAWATCHERBASIC",
    bulletType: "BETAUPLOADBASIC",
    collisionDamage: 10,
    width: 140,
    height: 140,
    defaultSpeed: 2,
    HP: 70,
    maxHP: 70,
    animation: true,
    animationFrames: 10,
    animationFPS: 5,
    deathAnimationFPS: 8,
    deathAnimationFrames: 5,
  },
  angela_phase1: {
    type: "angela_phase1",
    behaviour: "angela_phase1",
    bulletType: "ANGELABASIC",
    sprite: sprite.enemy_angelaPhase1,
    minimapIcon: sprite.UI_angela,
    ammo: 100,
    weaponCD: false,
    attackCDvalue: 3000,
    defaultAttackCDvalue: 3000,
    collisionDamage: 20,
    rotation: false,
    widthOnPic: 216,
    heightOnPic: 216,
    width: 216,
    height: 216,
    defaultSpeed: 25,
    HP: 500,
    maxHP: 500,
    animation: true,
    animationFrames: 3,
    animationFPS: 12,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
  angela_phase2: {
    type: "angela_phase2",
    behaviour: "angela_phase2",
    bulletType: "ANGELABASIC",
    sprite: sprite.enemy_angelaPhase2,
    minimapIcon: sprite.UI_angela,
    ammo: 100,
    weaponCD: false,
    playerOrbitAngle: 2 * Math.PI,
    chargeActive: false,
    chargePos: 0,
    chargeEnd: false,
    chargeXSpeed: 0,
    chargeYSpeed: 0,
    chargeSpeed: 40,
    chargeWaitTime: 2000,
    airStrikeActive: false,
    airStrikeX: 0,
    airStrikeY: 0,
    airStrikeCD: 750,
    airStrikeRadius: 150,
    attackCDvalue: 3000,
    defaultAttackCDvalue: 3000,
    collisionDamage: 35,
    moveWithPlayer: true,
    distanceFromPlayerY: 2,
    distanceFromPlayerX: 2,
    rotation: false,
    widthOnPic: 216,
    heightOnPic: 216,
    width: 216,
    height: 216,
    defaultSpeed: 0.01,
    HP: 500,
    maxHP: 500,
    animation: true,
    animationFrames: 3,
    animationFPS: 12,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
  angela_phase3: {
    type: "angela_phase3",
    behaviour: "angela_phase3",
    bulletType: "CORRUPTEDSHOT",
    sprite: sprite.enemy_angelaPhase3,
    minimapIcon: sprite.UI_angela,
    ammo: 100,
    weaponCD: false,
    playerOrbitAngle: 2 * Math.PI,
    chargeActive: false,
    chargePos: 0,
    chargeEnd: false,
    chargeXSpeed: 0,
    chargeYSpeed: 0,
    chargeSpeed: 35,
    chargeWaitTime: 2000,
    airStrikeActive: false,
    airStrikeX: 0,
    airStrikeY: 0,
    airStrikeCD: 750,
    airStrikeRadius: 200,
    playerPosReseted: false,
    attackCDvalue: 3000,
    defaultAttackCDvalue: 3000,
    collisionDamage: 40,
    moveWithPlayer: true,
    distanceFromCenter: 900,
    rotation: false,
    widthOnPic: 216,
    heightOnPic: 216,
    width: 216,
    height: 216,
    defaultSpeed: 0.02,
    HP: 500,
    maxHP: 500,
    animation: true,
    animationFrames: 3,
    animationFPS: 12,
    deathAnimationFPS: 8,
    deathAnimationFrames: 4,
  },
};
