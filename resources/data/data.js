//List of spritemaps (might use only one in the final version) | used in: rendering
var object = {
  enemy_goblin : new Image(),
  enemy_tooth : new Image(),
  enemy_buzz : new Image(),
  enemy_sharkfin : new Image(),
  enemy_SG40 : new Image(),
  enemy_pirateRaider : new Image(),
  enemy_pirateMinedropper : new Image(),
  enemy_pirateMine : new Image(),
  enemy_pirateTiger : new Image(),
  enemy_pirateVessel : new Image(),
  enemy_pirateVesselturret : new Image(),
  enemy_voidDrone : new Image(),
  enemy_voidChaser : new Image(),
  enemy_voidSpherefighter : new Image(),
  enemy_voidChakram : new Image(),
  player_scout : new Image(),
  player_orbiter : new Image(),
  player_slug : new Image(),
  projectile_rocket : new Image(),
  projectile_spread : new Image(),
  projectile_spreadProjectile : new Image(),
  projectile_explosion : new Image(),
  UI_earth : new Image(),
  UI_cursor : new Image(),
  UI_HPpanel : new Image(),
  UI_durationPanel : new Image(),
  UI_scout : new Image(),
  UI_slug : new Image(),
  UI_shopBG : new Image(),
  UI_BASIC : new Image(),
  UI_DOUBLE : new Image(),
  UI_SPRAY : new Image(),
  UI_ROCKET : new Image(),
  UI_LASER : new Image(),
};

//Default database for ingame weapons | used in: first inicialization
var weaponDatabase = {
  BASIC:{index:0,name:"BASIC",bullets:1,damage:1,speed:15,width:4,height:25,cooldown:150,duration:0,color:"#00FF00",status:"DEFAULT"},
  DOUBLE:{index:1,name:"DOUBLE",bullets:2,damage:1,speed:15,width:4,height:25,cooldown:150,duration:600,color:"#00FF00",status:"LOCKED"},
  SPRAY:{index:2,name:"SPRAY",bullets:3,damage:1,speed:15,width:4,height:25,cooldown:150,duration:600,color:"#00FF00",status:"LOCKED"},
  ROCKET:{index:3,name:"ROCKET",bullets:1,damage:5,speed:7,width:12,height:33,cooldown:300,duration:600,status:"LOCKED"},
  GIANT:{index:4,name:"GIANT",bullets:1,damage:2,speed:7,width:10,height:50,cooldown:300,duration:600,piercing:true,hitCD:500,color:"#00FF00",status:"LOCKED"},
  LASER:{index:5,name:"LASER",bullets:1,damage:4,speed:0,width:1,height:1,cooldown:2000,duration:600,piercing:true,hitCD:200,color:"#00FF00",status:"LOCKED"},
  SPREADER:{index:6,name:"SPREADER",bullets:1,damage:2,speed:8,width:14,height:30,cooldown:300,duration:600,piercing:false,status:"LOCKED"},
  SPREADER_PROJECTILE:{index:7,name:"SPREADER_PROJECTILE",bullets:1,damage:2,speed:15,width:7,height:13,piercing:false,status:"UNAVAILABLE"}
};
var defaultShip = {
  name:"SCOUT",
  speed:10,
  width:66,
  height:66,
  widthOnPic:88,
  heightOnPic:88,
  duration:600,
  particles:[22,2,30,0,0.1],
  maxShield:[0,1],
  maxHP:[10,5],
  section:1,
  level:1,
  weapon:weaponDatabase.BASIC
};
