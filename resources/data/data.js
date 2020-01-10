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
  UI_LASERpanel : new Image(),
  UI_shopBG : new Image(),
  UI_BASIC : new Image(),
  UI_DOUBLE : new Image(),
  UI_SPRAY : new Image(),
  UI_ROCKET : new Image(),
  UI_LASER : new Image(),
};

//Default database for ingame weapons | used in: first inicialization
var defaultWeaponDatabase = {
  BASIC:{name:"BASIC",bullets:1,damage:1,speed:15,width:4,height:25,cooldown:150,color:"#00FF00",status:"UNLOCKED",cost:"DEFAULT"},
  DOUBLE:{name:"DOUBLE",bullets:2,damage:1,speed:15,width:4,height:25,cooldown:150,color:"#04F7FF",status:"LOCKED",cost:200},
  SPRAY:{name:"SPRAY",bullets:3,damage:1,speed:15,width:4,height:25,cooldown:150,color:"#00FF00",status:"LOCKED",cost:1000},
  ROCKET:{name:"ROCKET",bullets:1,damage:5,speed:7,width:12,height:33,cooldown:300,status:"LOCKED",cost:"DEFAULT"},
  GIANT:{name:"GIANT",bullets:1,damage:2,speed:7,width:10,height:50,cooldown:300,piercing:true,hitCD:500,color:"#00FF00",status:"LOCKED",cost:0},
  LASER:{name:"LASER",bullets:1,damage:4,speed:0,width:1,height:1,cooldown:2000,piercing:true,hitCD:200,color:"#00FF00",status:"LOCKED",cost:99999},
  SPREADER:{name:"SPREADER",bullets:1,damage:2,speed:8,width:14,height:30,cooldown:300,piercing:false,status:"LOCKED",cost:0},
  SPREADER_PROJECTILE:{name:"SPREADER_PROJECTILE",bullets:1,damage:2,speed:15,width:7,height:13,piercing:false},
};
var defaultShipDatabase = {
  SCOUT:{name:"SCOUT",speed:5,width:60,height:60,widthOnPic:88,heightOnPic:88,particles:[22,2,30,0,0.1],maxHP:[10,5],status:"UNLOCKED",cost:0,section:1,level:1,weapon:defaultWeaponDatabase.BASIC},
  SLUG:{name:"SLUG",speed:5,width:88,height:88,widthOnPic:88,heightOnPic:88,particles:[23,45,23,0,0.1],maxHP:[10,10],status:"LOCKED",cost:0,section:2,level:1,weapon:defaultWeaponDatabase.DOUBLE},
  ORBITER:{name:"ORBITER",speed:6,width:55,height:83,widthOnPic:55,heightOnPic:83,particles:[0,0,0,0,0],maxHP:[10,5],status:"LOCKED",cost:0,section:3,level:1,weapon:defaultWeaponDatabase.ROCKET}
};
