/*
============================ WHAT TO DO LIST ===================================
levels
Shop
Text font
LASER - new weapon (problém s x,y pozicí)
================================================================================

######POZNÁMKY######
NEPŘÁTELÉ:
Každý objekt má momentálně svoji individuální sprite mapu.
Mezi každým spritem je 1px mezera.
~Pokud se jedná o sprite bez trysek, dává se 2px mezera.

*/
//Sleep function | used in: cooldowns
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Start the game function | used in: main menu
function startTheGame(){
  //Reset Progress
  if(parseInt(localStorage.level)>1){
    if(confirm("Are you sure you want to start a new game?\nYour current progress will reset!")){
      localStorage.level = 1;
      localStorage.XCOINS = 0;
      canvas.style.cursor = "none";
      // xMousePos = canvas.width/2;
      // yMousePos = canvas.height/2;
      player.HP = [player.maxHP[0],player.maxHP[1]];
      XCOINS = 0;
      UI.inMenu = false;
      spawn(levels_handler.levelCreator());
    }
  }
  else {
    localStorage.level = 1;
    localStorage.XCOINS = 0;
    canvas.style.cursor = "none";
    // xMousePos = canvas.width/2;
    // yMousePos = canvas.height/2;
    player.HP = [player.maxHP[0],player.maxHP[1]];
    XCOINS = 0;
    UI.inMenu = false;
    spawn(levels_handler.levelCreator());
  }
}
//Continue the game function | used in: continue
function continueTheGame(){
  UI.inMenu = false;
  canvas.style.cursor = "none";
  // xMousePos = canvas.width/2;
  // yMousePos = canvas.height/2;
  player.HP = [player.maxHP[0],player.maxHP[1]];
  XCOINS = 0;
  spawn(levels_handler.levelCreator());
}

//Lose the game function | used in: gameover
function loseTheGame(){
  localStorage.level = 1;
  localStorage.XCOINS = 0;
  canvas.style.cursor = "auto";
  bulletList = [];
  enemyList = [];
  XCOINS = 0;
  UI.currentMenu = 4;
  UI.inMenu = true;
}
//Win the game function | used in: gameloop ~ all enemies dead
function winTheGame(){
  canvas.style.cursor = "auto";
  bulletList = [];
  enemyList = [];
  localStorage.XCOINS = parseInt(localStorage.XCOINS) + XCOINS;
  XCOINS = 0;
  UI.currentMenu = 5;
  UI.inMenu = true;
}
//List of spritemaps (might use only one in the final version) | used in: rendering
var object = {
  scout : new Image(),
  goblin : new Image(),
  tooth : new Image(),
  buzz : new Image(),
  sharkfin : new Image(),
  earth : new Image(),
  cursor : new Image(),
  HP_panel : new Image(),
  scout_icon : new Image(),
  earth_icon : new Image(),
  rocket : new Image(),
  explosion : new Image(),
  BASIC : new Image(),
  DOUBLE : new Image(),
  SPRAY : new Image()
};

//Default database for ingame weapons | used in: first inicialization
var defaultWeaponDatabase = {
  BASIC:{name:"BASIC",bullets:1,damage:1,speed:10,width:4,height:25,cooldown:150,color:"#00FF00",status:"UNLOCKED",cost:0},
  DOUBLE:{name:"DOUBLE",bullets:2,damage:1,speed:10,width:4,height:25,cooldown:150,color:"#00FF00",status:"LOCKED",cost:0},
  SPRAY:{name:"SPRAY",bullets:3,damage:1,speed:10,width:4,height:25,cooldown:150,color:"#00FF00",status:"LOCKED",cost:0},
  ROCKET:{name:"ROCKET",bullets:1,damage:5,speed:7,width:12,height:33,cooldown:300,status:"LOCKED",cost:0},
  GIANT:{name:"GIANT",bullets:1,damage:2,speed:7,width:10,height:50,cooldown:300,color:"#FFFFFF",status:"LOCKED",cost:0}
};

//First inicialization
if(localStorage.localWeaponDatabase == undefined){
  localStorage.localWeaponDatabase = JSON.stringify(defaultWeaponDatabase);
  localStorage.activeWeapon = JSON.stringify(defaultWeaponDatabase.BASIC);
  localStorage.level = 1;
  localStorage.XCOINS = 0;
}

//Weapon choosing function | used in: upgrades
var activeWeapon = JSON.parse(localStorage.activeWeapon);
function chooseWeapon(name){
  let precursor = JSON.parse(localStorage.localWeaponDatabase);
  for(var index in precursor){
    if(precursor[index].name == name){
      if(precursor[index].status != "LOCKED"){
        localStorage.activeWeapon = JSON.stringify(precursor[index]);
        activeWeapon = precursor[index];
        return true;
      }
      else if (precursor[index].cost<=parseInt(localStorage.XCOINS)){
        console.log("Bought " + precursor[index].name + " for: " + precursor[index].cost + " XCOINS.");
        console.log("Current XCOINS balance: " + localStorage.XCOINS);
        localStorage.XCOINS = parseInt(localStorage.XCOINS) - precursor[index].cost;
        precursor[index].status = "UNLOCKED";
        localStorage.activeWeapon = JSON.stringify(precursor[index]);
        localStorage.localWeaponDatabase = JSON.stringify(precursor);
        activeWeapon = precursor[index];
        return true;
      }
      else {
        console.log("Insufficient funds.");
        return false;
      }
    }
  }
}



//Inicialization
var canvas;
var ctx;
var screenratio = 1;
window.onload = ()=>{
  canvas = document.getElementById("canvas");
  canvas.addEventListener("click",function(){UI.click()});
  canvas.addEventListener("mousedown",function(){userInput(event,1);});
  canvas.addEventListener("mouseup",function(){userInput(event,2);});
  canvas.addEventListener("mousemove",function(){userInput(event,0);});
  ctx = canvas.getContext("2d");
  object.scout.src = "./resources/sprites/player_ships/scout/scout.png";
  object.goblin.src = "./resources/sprites/enemy_ships/goblin/goblin.png";
  object.tooth.src = "./resources/sprites/enemy_ships/tooth/tooth.png";
  object.sharkfin.src = "./resources/sprites/enemy_ships/sharkfin/sharkfin.png";
  object.buzz.src = "./resources/sprites/enemy_ships/buzz/buzz.png";
  object.cursor.src = "./resources/sprites/cursor-pixelated.png";
  object.earth.src = "./resources/sprites/earth.png";
  object.HP_panel.src = "./resources/sprites/UI/HP_panel.png";
  object.scout_icon.src = "./resources/sprites/UI/scout_icon.png";
  object.earth_icon.src = "./resources/sprites/UI/earth_icon.png";
  object.explosion.src = "./resources/sprites/explosion.png";
  object.rocket.src = "./resources/sprites/player_ships/rocket.png";
  object.BASIC.src = "./resources/sprites/player_weapons/BASIC.png";
  object.DOUBLE.src = "./resources/sprites/player_weapons/DOUBLE.png";
  object.SPRAY.src = "./resources/sprites/player_weapons/SPRAY.png";
  scale();
  player.inicialize();
  UI.inicialize();
  //Disabling rightclick popup
  $("#canvas").bind('contextmenu', function(e) {
    return false;
  });
  //  setInterval(gameLoop,1000/120); //120 cyklů/s pro lepší detekci kolize
  //Setting time for monitor refresh rate check
  timeThen = Date.now();
  gameLoop();
}

//Dynamic resolution scaling function  | used in: rendering
function scale(){
  canvas.width = 1100*screenratio;
  canvas.height = 900*screenratio;
  while($(window).height()<canvas.height||$(window).width()<canvas.width){
    screenratio -= 0.1;
    canvas.width = 1100*screenratio;
    canvas.height = 900*screenratio;
  }
  canvas.style.marginLeft = -canvas.width/2 + "px";
}

//Event listener | used in: user input
var xMousePos;
var yMousePos;
var leftMouseDown = false;
var rightMouseDown = false;
async function userInput(event,which){
  //0 == mousemove, 1 == mousedown, 2 == mouseup
  if(which == 0){
    xMousePos = Math.abs(event.clientX)-($(document).width()-canvas.width)/2;
    yMousePos = Math.abs(event.clientY)-parseInt($("#canvas").css("marginTop"));
  }
  else if (which == 1){
    if(event.which == 1)leftMouseDown = true;
    else if(event.which == 3)rightMouseDown = true;
  }
  else if (which == 2){
    if(event.which == 1)leftMouseDown = false;
    else if(event.which == 3)rightMouseDown = false;
  }
}

//Game cycle
var timeNow;
var timeThen;
var dif;
var fpsInterval = 1000/60; //60 FPS
function gameLoop(){
  requestAnimationFrame(gameLoop);
  timeNow = Date.now();
  dif = timeNow - timeThen;
  //If for a check of the monitor refresh rate
  if(dif>fpsInterval){
    timeThen = timeNow - (dif%fpsInterval);
    ctx.clearRect(0,0,canvas.width,canvas.height); //Clearing scene
    if(UI.inMenu){ //Menu part of cycle
      if(UI.currentMenu == 0){
        UI.menu_render(UI.mainMenu);
      }
      else if (UI.currentMenu == 1){
        UI.menu_render(UI.upgradesMenu);
      }
      else if (UI.currentMenu == 2){
        UI.menu_render(UI.weaponsUpgradesMenu);
      }
      else if (UI.currentMenu == 3){
        UI.menu_render(UI.shipsUpgradesMenu);
      }
      else if (UI.currentMenu == 4){
        UI.menu_render(UI.gameOverMenu);
      }
      else if (UI.currentMenu == 5){
        UI.menu_render(UI.youWinMenu);
      }
    }
    else if(levels_handler.level.total == 0){
      localStorage.level = parseInt(localStorage.level) + 1;
      winTheGame();
    }
    else { //Game part
      ctx.beginPath();
      ctx.drawImage(object.earth,canvas.width/2-100*screenratio,canvas.height/2-100*screenratio,200*screenratio,200*screenratio);//planet
      bulletList.forEach((b)=>{//bullets - if render check
        if(b.explosive&&b.explosion_triggered)
        b.explosion_render();
        if(!b.killed)b.update();
      });
      player.update();//player pos update
      player.render();
      if(leftMouseDown){ //shooting
        if(!player.attackCD&&player.HP[1] > 0){
          bulletList.push(bullet({},activeWeapon.name,activeWeapon.bullets));
          player.attackCDstart();
        }
      }
      enemyList.forEach((e)=>{//enemies
        if(!e.deathAnimation){
          if(!e.killed){
            e.update();
            e.render();
          }
          bulletList.forEach((b)=>{ //Collision with enemies
            if(collides(e,b)){
              if(e.HP>0){
                if(b.explosive&&!b.explosion_triggered)
                b.explode();
                else if((!b.piercing||!e.attackCD)&&!b.explosive) {
                  e.HP -= b.damage;
                  e.hitCDstart();
                  checkTotal(e);
                  if(!b.piercing)
                  b.killed = true;
                }
                if(!e.attackCD)
                e.attackCDstart();
              }
            }
            bulletList = bulletList.filter(check => !(check.killed));
          });
          if(!player.hitCD&&collides(e,player)&&player.HP[1]>0){ //player colision
            player.HP[1] -= 1;
            if(player.HP[1] > 0){
              player.hitCDstart();
            }
          }
        }
        else {
          e.deathAnimation_render();
          enemyList = enemyList.filter(check => !(check.killed));
        }
      });

      //UI
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(10*screenratio,canvas.height-70*screenratio,190*screenratio,50*screenratio);
      //HP bars
      ctx.fillStyle = "#00FF00";
      ctx.fillRect(35*screenratio,canvas.height-66*screenratio,player.HP[1]/player.maxHP[1]*120*screenratio,15*screenratio);
      ctx.fillRect(35*screenratio,canvas.height-36*screenratio,player.HP[0]/player.maxHP[0]*160*screenratio,15*screenratio);
      //Blikačky
      if(player.HP[0]<player.maxHP[0]/3){
        ctx.fillStyle = "red";
        ctx.fillRect(10*screenratio,canvas.height-31*screenratio,10*screenratio,10*screenratio);
      }
      else {
        ctx.fillStyle = "black";
        ctx.fillRect(10*screenratio,canvas.height-31*screenratio,10*screenratio,10*screenratio);
      }
      if(player.HP[1]<player.maxHP[1]/3){
        ctx.fillStyle = "red";
        ctx.fillRect(10*screenratio,canvas.height-61*screenratio,10*screenratio,10*screenratio);
      }
      else {
        ctx.fillStyle = "black";
        ctx.fillRect(10*screenratio,canvas.height-61*screenratio,10*screenratio,10*screenratio);
      }
      //Panel
      ctx.drawImage(object.HP_panel,0,canvas.height-96*screenratio,250*screenratio,96*screenratio);
      ctx.drawImage(object.scout_icon,165*screenratio,canvas.height-70*screenratio,20*screenratio,20*screenratio);
      ctx.drawImage(object.earth_icon,205*screenratio,canvas.height-37*screenratio,20*screenratio,20*screenratio);

      ctx.drawImage(object.cursor,xMousePos-24,yMousePos-24,48,48); //cursor
      ctx.stroke();
      ctx.closePath();
    }
  }
}

//UI
var UI = {
  inMenu : true,
  currentMenu : 0,
  inicialize : function(){
    this.mainMenu_b0 = {width:300*screenratio,height:50*screenratio,x:400*screenratio,y:300*screenratio,text:"NEW GAME",button:"NEW GAME",opacity:1,color:["grey","black","black"]};
    this.mainMenu_b1 = {width:300*screenratio,height:50*screenratio,x:400*screenratio,y:370*screenratio,text:"CONTINUE",button:"CONTINUE",opacity:0.5,color:["grey","black","black"]};
    this.mainMenu_b2 = {width:300*screenratio,height:50*screenratio,x:400*screenratio,y:440*screenratio,text:"UPGRADES",button:"UPGRADES",opacity:1,color:["grey","black","black"]};
    this.mainMenu = [this.mainMenu_b0,this.mainMenu_b1,this.mainMenu_b2];

    this.upgradesMenu_XCOINS = {width:250*screenratio,height:75*screenratio,x:850*screenratio,y:0*screenratio,opacity:1,color:["grey","black","black"]};

    this.upgradesMenu_b0 = {width:200*screenratio,height:50*screenratio,x:850*screenratio,y:800*screenratio,text:"CONTINUE",button:"CONTINUE",opacity:1,color:["grey","black","black"]};
    this.upgradesMenu_b1 = {width:250*screenratio,height:75*screenratio,x:250*screenratio,y:350*screenratio,text:"WEAPONS",button:"WEAPONS",opacity:1,color:["grey","black","black"]};
    this.upgradesMenu_b2 = {width:250*screenratio,height:75*screenratio,x:600*screenratio,y:350*screenratio,text:"SHIPS",button:"SHIPS",opacity:1,color:["grey","black","black"]};
    this.upgradesMenu = [this.upgradesMenu_b0,this.upgradesMenu_b1,this.upgradesMenu_b2,this.upgradesMenu_XCOINS];

    this.weaponsUpgradesMenu_b0 = {width:200*screenratio,height:50*screenratio,x:850*screenratio,y:800*screenratio,text:"BACK",button:"BACK",opacity:1,color:["grey","black"],selected:false};
    this.weaponsUpgradesMenu_b1 = {width:100*screenratio,height:100*screenratio,x:100*screenratio,y:200*screenratio,cost:defaultWeaponDatabase["BASIC"].cost,button:"BASIC",opacity:1,color:["grey","black","black"],sprite:object.BASIC,selected:false};
    this.weaponsUpgradesMenu_b2 = {width:100*screenratio,height:100*screenratio,x:300*screenratio,y:200*screenratio,cost:defaultWeaponDatabase["DOUBLE"].cost,button:"DOUBLE",opacity:1,color:["grey","black","black"],sprite:object.DOUBLE,selected:false};
    this.weaponsUpgradesMenu_b3 = {width:100*screenratio,height:100*screenratio,x:500*screenratio,y:200*screenratio,cost:defaultWeaponDatabase["SPRAY"].cost,button:"SPRAY",opacity:1,color:["grey","black","black"],sprite:object.SPRAY,selected:false};
    this.weaponsUpgradesMenu_b4 = {width:100*screenratio,height:100*screenratio,x:700*screenratio,y:200*screenratio,cost:defaultWeaponDatabase["ROCKET"].cost,button:"ROCKET",opacity:1,color:["grey","black","black"],selected:false};
    this.weaponsUpgradesMenu_b5 = {width:100*screenratio,height:100*screenratio,x:900*screenratio,y:200*screenratio,cost:defaultWeaponDatabase["GIANT"].cost,button:"GIANT",opacity:1,color:["grey","black","black"],selected:false};
    this.weaponsUpgradesMenu = [this.weaponsUpgradesMenu_b0,this.weaponsUpgradesMenu_b1,this.weaponsUpgradesMenu_b2,this.weaponsUpgradesMenu_b3,this.weaponsUpgradesMenu_b4,this.weaponsUpgradesMenu_b5,this.upgradesMenu_XCOINS];

    this.shipsUpgradesMenu_b0 = {width:200*screenratio,height:50*screenratio,x:850*screenratio,y:800*screenratio,text:"BACK",button:"BACK",opacity:1,color:["grey","black","black"]};
    this.shipsUpgradesMenu_XCOINS = {width:250*screenratio,height:75*screenratio,x:850*screenratio,y:0*screenratio,opacity:1,color:["grey","black","black"]}
    this.shipsUpgradesMenu = [this.shipsUpgradesMenu_b0,this.upgradesMenu_XCOINS];

    this.gameOverMenuWindow = {width:550*screenratio,height:400*screenratio,x:275*screenratio,y:250*screenratio,text:"GAMEOVER",opacity:1,color:["grey","black","black"]};
    this.gameOverMenu_b0 = {width:200*screenratio,height:50*screenratio,x:300*screenratio,y:570*screenratio,text:"RESTART",button:"RESTART",opacity:1,color:["grey","black","black"]};
    this.gameOverMenu_b1 = {width:200*screenratio,height:50*screenratio,x:600*screenratio,y:570*screenratio,text:"BACK",button:"BACK",opacity:1,color:["grey","black","black"]};
    this.gameOverMenu = [this.gameOverMenuWindow,this.gameOverMenu_b0,this.gameOverMenu_b1];

    this.youWinMenuWindow = {width:550*screenratio,height:400*screenratio,x:275*screenratio,y:250*screenratio,text:"YOU WIN!",opacity:1,color:["grey","black","black"]};
    this.youWinMenu_b0 = {width:200*screenratio,height:50*screenratio,x:300*screenratio,y:570*screenratio,text:"UPGRADES",button:"UPGRADES",opacity:1,color:["grey","black","black"]};
    this.youWinMenu_b1 = {width:200*screenratio,height:50*screenratio,x:600*screenratio,y:570*screenratio,text:"CONTINUE",button:"CONTINUE",opacity:1,color:["grey","black","black"]};
    this.youWinMenu = [this.youWinMenuWindow,this.youWinMenu_b0,this.youWinMenu_b1];

    this.weaponsUpgradesMenu.forEach((index)=>{
      if(activeWeapon.name == index.button){
        index.selected = true;
      }
    })
  },
  menu_render : function(menu){
    this.hover();
    if(parseInt(localStorage.level)>1){
      this.mainMenu_b1.opacity = 1;
    }
    menu.forEach((index)=>{
      this.upgradesMenu_XCOINS.text = "XCOINS: " + localStorage.XCOINS;
      ctx.fillStyle = index.color[0];
      ctx.strokeStyle = index.color[1];
      ctx.lineWidth = 5;
      ctx.strokeRect(index.x,index.y,index.width,index.height);
      ctx.font = 30*screenratio + "px Arial";
      ctx.globalAlpha = index.opacity;
      ctx.fillRect(index.x,index.y,index.width,index.height);
      ctx.fillStyle = index.color[2];
      if(index.text != undefined){
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(index.text,index.x+index.width/2,index.y+index.height/2); //text on screen
      }
      if(index.sprite != undefined){
        ctx.drawImage(index.sprite,0,0,100,100,index.x,index.y,index.width,index.height);
      }
      if(index.cost != undefined&&JSON.parse(localStorage.localWeaponDatabase)[index.button].status == "LOCKED"){
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(index.cost,index.x+index.width/2,index.y+index.height/2+25*screenratio);
      }
    });
  },
  click : function(){
    if(this.currentMenu == 0&&this.inMenu){
      this.mainMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          if(index.button == "NEW GAME"){
            startTheGame();
          }
          else if (index.button == "CONTINUE"){
            if(parseInt(localStorage.level)>1){
              continueTheGame();
            }
          }
          else if (index.button == "UPGRADES"){
            this.currentMenu = 1;
          }
        }
      });
    }
    else if (this.currentMenu == 1&&this.inMenu){
      this.upgradesMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&!index.selected&&index.button!=undefined){
          if(index.button == "CONTINUE"){
            continueTheGame();
          }
          else if (index.button == "WEAPONS") {
            this.currentMenu = 2;
          }
          else if (index.button == "SHIPS"){
            this.currentMenu = 3;
          }
        }
      });
    }
    else if (this.currentMenu == 2&&this.inMenu){
      this.weaponsUpgradesMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&!index.selected&&index.button!=undefined){
          if(index.button != "BACK"){
            if(chooseWeapon(index.button)){
              for(var i=1;i<this.weaponsUpgradesMenu.length;i++){
                this.weaponsUpgradesMenu[i].selected = false;
              }
              index.selected = true;
            }
          }
          else {
            this.currentMenu = 1;
          }
        }
      });
    }
    else if (this.currentMenu == 3&&this.inMenu){
      this.shipsUpgradesMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          if(index.button != "BACK"){
            for(var i=1;i<this.shipsUpgradesMenu.length;i++){
              this.shipsUpgradesMenu[i].selected = false;
            }
            index.selected = true;
          }
          else {
            this.currentMenu = 1;
          }
        }
      });
    }
    else if (this.currentMenu == 4&&this.inMenu){
      this.gameOverMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          if(index.button == "BACK"){
            this.currentMenu = 0;
          }
          else if (index.button == "RESTART"){
            startTheGame();
          }
        }
      });
    }
    else if (this.currentMenu == 5&&this.inMenu){
      this.youWinMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          if(index.button == "UPGRADES"){
            this.currentMenu = 1;
          }
          else if (index.button == "CONTINUE"){
            continueTheGame();
          }
        }
      });
    }
  },
  hover : function(){
    if(this.currentMenu == 0){
      this.mainMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          if(index.button == "CONTINUE"&&parseInt(localStorage.level)>1){
            index.color[0] = "blue";
            index.color[1] = "blue";
            index.color[2] = "white";
          }
          else if (index.button != "CONTINUE") {
            index.color[0] = "blue";
            index.color[1] = "blue";
            index.color[2] = "white";
          }
        }
        else {
          index.color[0] = "grey";
          index.color[1] = "black";
          index.color[2] = "black";
        }
      });
    }
    else if (this.currentMenu == 1){
      this.upgradesMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&!index.selected&&index.button!=undefined){
          index.color[0] = "blue";
          index.color[1] = "blue";
          index.color[2] = "white";
        }
        else {
          index.color[0] = "grey";
          index.color[1] = "black";
          index.color[2] = "black";
        }
      });
    }
    else if (this.currentMenu == 2){
      this.weaponsUpgradesMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&!index.selected&&index.button!=undefined){
          index.color[0] = "blue";
          index.color[1] = "blue";
          index.color[2] = "white";
        }
        else {
          if(!index.selected){
            index.color[0] = "grey";
            index.color[1] = "black";
            index.color[2] = "black";
          }
          else {
            index.color[0] = "grey";
            index.color[1] = "white";
            index.color[2] = "black";
          }
        }
      });
    }
    else if (this.currentMenu == 3){
      this.shipsUpgradesMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&!index.selected&&index.button!=undefined){
          index.color[0] = "blue";
          index.color[1] = "blue";
          index.color[2] = "white";
        }
        else {
          if(!index.selected){
            index.color[0] = "grey";
            index.color[1] = "black";
            index.color[2] = "black";
          }
          else {
            index.color[0] = "grey";
            index.color[1] = "white";
            index.color[2] = "black";
          }
        }
      });
    }
    else if (this.currentMenu == 4){
      this.gameOverMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          index.color[0] = "blue";
          index.color[1] = "blue";
          index.color[2] = "white";
        }
        else {
          index.color[0] = "grey";
          index.color[1] = "black";
          index.color[2] = "black";
        }
      });
    }
    else if (this.currentMenu == 5){
      this.youWinMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          index.color[0] = "blue";
          index.color[1] = "blue";
          index.color[2] = "white";
        }
        else {
          index.color[0] = "grey";
          index.color[1] = "black";
          index.color[2] = "black";
        }
      });
    }
  }
};

//bullets
var bulletList = [];
function bullet(B,name,numberOfBullets){
  B.killed = false;
  B.damage = activeWeapon.damage;
  B.speed = activeWeapon.speed*screenratio;
  B.width = activeWeapon.width*screenratio;
  B.height = activeWeapon.height*screenratio;
  B.color = activeWeapon.color;
  B.opacity = 1;
  B.x = player.x;
  B.y = player.y;
  if(name == "BASIC"){
    B.dirx = xMousePos-player.x;
    B.diry = yMousePos-player.y;
  }
  else if(name == "DOUBLE") {
    if (numberOfBullets == 2){
      B.dirx = Math.cos(Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2+(3/180*Math.PI)-Math.PI/2);
      B.diry = Math.sin(Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2+(3/180*Math.PI)-Math.PI/2);
    }
    else if (numberOfBullets == 1){
      B.dirx = Math.cos((Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2-(3/180)*Math.PI)-Math.PI/2);
      B.diry = Math.sin((Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2-(3/180)*Math.PI)-Math.PI/2);
    }
    if(numberOfBullets>1){
      bulletList.push(bullet({},name,numberOfBullets-1))
    }
  }
  else if(name == "SPRAY") {
    // if(numberOfBullets == 2)B.bulletNumber = 1;
    // else B.bulletNumber = -1;
    // if(numberOfBullets>=1&&numberOfBullets<3){
    //   B.dirx = (xMousePos-player.x)+10*B.bulletNumber;
    //   B.diry = (yMousePos-player.y)+10*B.bulletNumber;
    //   if((Math.sign(B.dirx)==-1&&Math.sign(B.diry)==-1)){
    //     B.dirx = (xMousePos-player.x)-10*B.bulletNumber;
    //     B.diry = (yMousePos-player.y)+10*B.bulletNumber;
    //   }
    //   else if((Math.sign(B.dirx)==1&&Math.sign(B.diry)==1)){
    //     B.dirx = (xMousePos-player.x)-10*B.bulletNumber;
    //     B.diry = (yMousePos-player.y)+10*B.bulletNumber;
    //   }
    //   if(numberOfBullets !=1){
    //     bulletList.push(bullet({},name,numberOfBullets-1));
    //   }
    // }
    // else if(numberOfBullets == 3) {
    //   B.dirx = xMousePos-player.x;
    //   B.diry = yMousePos-player.y;
    //   bulletList.push(bullet({},name,numberOfBullets-1));
    // }
    if(numberOfBullets == 3){
      B.dirx = xMousePos-player.x;
      B.diry = yMousePos-player.y;
    }
    else if (numberOfBullets == 2){
      B.dirx = Math.cos(Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2+(3/180*Math.PI)-Math.PI/2);
      B.diry = Math.sin(Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2+(3/180*Math.PI)-Math.PI/2);
    }
    else if (numberOfBullets == 1){
      B.dirx = Math.cos((Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2-(3/180)*Math.PI)-Math.PI/2);
      B.diry = Math.sin((Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2-(3/180)*Math.PI)-Math.PI/2);
    }
    if(numberOfBullets>1){
      bulletList.push(bullet({},name,numberOfBullets-1));
    }
  }
  else if (name == "ROCKET"){
    B.dirx = xMousePos-player.x;
    B.diry = yMousePos-player.y;
    B.sprite = object.rocket;
    B.explosive = true;
    B.explosion_radius = 150*screenratio;
    B.explosion_triggered = false;
    B.explosion_countdown = 0;
    B.explosion_index = 0;
    B.explosion_angle = Math.random()*2*Math.PI;
  }
  else if (name == "GIANT"){
    B.dirx = xMousePos-player.x;
    B.diry = yMousePos-player.y;
    B.piercing = true;
  }
  B.update = function(){
    if(!B.explosion_triggered){
      bulletList = bulletList.filter(check => !(check.x < 0||check.x > canvas.width||check.y < 0||check.y > canvas.height));

      let ratio = B.speed/(Math.abs(B.dirx)+Math.abs(B.diry));
      B.xspeed = ratio*B.dirx;
      B.yspeed = ratio*B.diry;

      B.x += B.xspeed;
      B.y += B.yspeed;
      ctx.beginPath();
      ctx.save();
      ctx.translate(B.x,B.y);
      ctx.rotate(Math.atan2(B.diry,B.dirx)+Math.PI/2);
      ctx.globalAlpha = B.opacity;
      if(B.color == undefined){
        ctx.drawImage(B.sprite,0,0,activeWeapon.width,activeWeapon.height,-B.width/2,-B.height/2,B.width,B.height);
      }
      else  {
        ctx.fillStyle = B.color;
        ctx.fillRect(-B.width/2,-B.height/2,B.width,B.height);
      }
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
    }
  }
  B.explode = async function(){
    B.explosion_triggered = true;
    enemyList.forEach((e)=>{
      if(collides(e,{x:B.x,y:B.y,width:B.explosion_radius,height:B.explosion_radius})){
        e.HP -= B.damage;
        e.hitCDstart();
        checkTotal(e);
      }
    });
  }
  B.explosion_render = async function(){
    if(!B.killed){
      B.explosion_countdown += 1;
      if(B.explosion_countdown%6 == 0){
        B.explosion_angle = Math.random()*2*Math.PI;
        B.explosion_index = B.explosion_countdown/6;
      }
      ctx.beginPath();
      ctx.save();
      ctx.translate(B.x,B.y);
      ctx.rotate(B.explosion_angle);
      ctx.drawImage(object.explosion,0,B.explosion_radius/screenratio*B.explosion_index,150,150,-75*screenratio,-75*screenratio,B.explosion_radius,B.explosion_radius);
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if(B.explosion_index==6)B.killed = true;
    }
  }
  return B;
}

//player object
var player = {
  inicialize : ()=>{
    player.x = 1100/2*screenratio;
    player.y = 900/2*screenratio;
    player.futureX = 1100/2*screenratio;
    player.futureY = 900/2*screenratio;
    player.speed = 5*screenratio;
    player.xspeed = 0;
    player.yspeed = 0;
    player.width = 60*screenratio;
    player.height = 60*screenratio;
    player.widthOnPic = 88;
    player.heightOnPic = 88;
    player.animationX = 0;
    player.animationY = 0;
    player.fireCounter = 0;
    //0 = Earth, 1 = Ship
    player.maxHP = [10,5];
    player.HP = [player.maxHP[0],player.maxHP[1]];
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = yDistanceFromShip, 2 = heightOnCanvas
    player.thrusterFire = [22,2*screenratio,30*screenratio];
  },
  update : ()=>{
    let ratio = player.speed/((Math.abs(xMousePos-player.x)+Math.abs(yMousePos-player.y)));
    if(player.HP[0] <= 0){
      loseTheGame();
    }
    else if(!isNaN(ratio)&&!rightMouseDown){
      if(player.HP[1] <= 0&&!player.killedCD){
        player.killedCDstart();
      }
      if(Math.sqrt(Math.pow(xMousePos-player.x,2)+Math.pow(yMousePos-player.y,2))>50*screenratio){
        player.xspeed = ratio*(xMousePos-player.x);
        player.yspeed = ratio*(yMousePos-player.y);
        player.futureX += player.xspeed;
        player.futureY += player.yspeed;
        let futureplayerDirFromCenter = Math.sqrt(Math.pow(player.futureX-canvas.width/2,2)+Math.pow(player.futureY-canvas.height/2,2));
        if(Math.floor(futureplayerDirFromCenter)>=150*screenratio){
          player.futureX -= player.xspeed;
          player.futureY -= player.yspeed;
          player.xspeed = 0;
          player.yspeed = 0;
        }
        else {
          player.x += player.xspeed;
          player.y += player.yspeed;
        }
      }
      else {
        player.xspeed = 0;
        player.yspeed = 0;
      }
    }
    else {
      player.xspeed = 0;
      player.yspeed = 0;
    }
  },
  render : ()=> {
    //fire animation
    if(!player.xspeed == 0&&!player.yspeed == 0&&player.fireCounter<1)
    player.fireCounter += 0.1;
    else if(player.xspeed == 0&&player.yspeed == 0&&player.fireCounter>0.2)
    player.fireCounter -= 0.1;
    // if(player.counter == 30){
    //   player.counter = 0;
    //   if(player.animationX<96){
    //     player.animationX += 96;
    //   }
    //   else {
    //     player.animationX = 0;
    //   }
    // }
    ctx.beginPath();
    ctx.save();
    ctx.translate(player.x,player.y);
    ctx.rotate(Math.atan2(yMousePos-player.y,xMousePos-player.x)+Math.PI/2);
    //context.drawImage(scout,sx,sy,swidth,sheight,x,y,width,height);
    // scout	Specifies the image, canvas, or video element to use
    // sx	Optional. - Kde začít clipovat
    // sy	Optional. -||-
    // swidth	Optional. - Šířka výřezu na obrázku
    // sheight	Optional. - Výška výřezu na obrázku
    // x - Kam ho dát v canvasu
    // y	-||-
    // width - roztažení/zmenšení obrázku v canvasu
    // height	-||-

    //Damaged Scout #RED
    if(player.HP[1] > 0){
      ctx.drawImage(object.scout,0,player.heightOnPic+player.thrusterFire[0],player.widthOnPic,player.heightOnPic,-player.width/2,-player.height/2,player.width,player.height);
      ctx.drawImage(object.scout,0,2*player.heightOnPic+player.thrusterFire[0],player.widthOnPic,player.thrusterFire[0],-player.width/2,player.height/2-player.thrusterFire[1],player.width,player.thrusterFire[2]*player.fireCounter);
    }
    ctx.globalAlpha = player.opacity;
    //Normal Scout
    ctx.drawImage(object.scout,0,0,player.widthOnPic,player.heightOnPic,-player.width/2,-player.height/2,player.width,player.height);
    ctx.drawImage(object.scout,0,player.heightOnPic,player.widthOnPic,player.thrusterFire[0],-player.width/2,player.height/2-player.thrusterFire[1],player.width,player.thrusterFire[2]*player.fireCounter);
    ctx.restore();
    ctx.stroke();
    ctx.closePath();
  },

  attackCD : false,
  hitCD : false,
  killedCD : false,
  opacity : 1,
  blikacky : false,
  attackCDstart : async function() {
    player.attackCD = true;
    await sleep(activeWeapon.cooldown);
    player.attackCD = false;
  },
  hitCDstart : async function() {
    player.hitCD = true;
    for(var i=30;i<130;i++){
      player.opacity = (i)/100;
      await sleep(10);
    }
    player.hitCD = false;
  },
  killedCDstart : async function() {
    //EXPLOSION
    player.opacity = 0.5;
    player.killedCD = true;
    await sleep(5000);
    player.HP[1] = player.maxHP[1];
    player.opacity = 1;
    player.killedCD = false;
  }
};

//Check for total of enemies on the map | used in: win condition
var XCOINS = 0;
async function checkTotal(enemy){
  if(enemy.HP <= 0&&!enemy.deathAnimation){
    enemy.deathAnimation = true;
    if(levels_handler.level.total == 1){
      await sleep(2000);
      levels_handler.level.total -= 1;
    }
    else {
      levels_handler.level.total -= 1;
    }
    XCOINS += enemy.XCOINS;
  }
}
//enemy objects
var enemyList = [];
function enemyCharacter(E,type){
  if (type == "buzz"){
    E.sprite = object.buzz;
    E.widthOnPic = 56;
    E.heightOnPic = 62;
    E.hit = 0;
    //Ingame stats
    E.width = 45*screenratio;
    E.height = 50*screenratio;
    E.speed = 2*screenratio;
    E.HP = 6;
    E.maxHP = 6;
    E.XCOINS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.thrusterFire = [0,0*screenratio,0*screenratio,0*screenratio];
  }
  else if (type == "tooth"){
    E.sprite = object.tooth;
    E.widthOnPic = 64;
    E.heightOnPic = 64;
    E.hit = 0;
    //Ingame stats
    E.width = 75*screenratio;
    E.height = 75*screenratio;
    E.speed = 1*screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.XCOINS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.thrusterFire = [8,0*screenratio,30*screenratio,8*screenratio];
  }
  else if (type == "sharkfin"){// 1 - sharkfin
    E.sprite = object.sharkfin;
    E.widthOnPic = 64;
    E.heightOnPic = 60;
    E.hit = 0;
    //Ingame stats
    E.width = 50*screenratio;
    E.height = 45*screenratio;
    E.speed = 3*screenratio;
    E.HP = 3;
    E.maxHP = 3;
    E.XCOINS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.thrusterFire = [10,-5*screenratio,9*screenratio,10*screenratio];
  }
  else if(type == "goblin"){// 2 - goblin
    E.sprite = object.goblin;
    E.widthOnPic = 76;
    E.heightOnPic = 100;
    //Ingame stats
    E.width = 51*screenratio;
    E.height = 67*screenratio;
    E.speed = 1*screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.XCOINS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.thrusterFire = [22,10*screenratio,2*screenratio,20*screenratio];
  }
  E.deathAnimation = false;
  E.deathAnimation_angle = Math.random()*2*Math.PI;
  E.deathAnimation_index = 0;
  E.deathAnimation_countdown = 0;
  E.killed = false;
  E.animationX = 0;
  E.animationY = 0;
  E.counter = 0;
  E.update = function(){
    let ratio = E.speed/(Math.abs(canvas.width/2-E.x)+Math.abs(canvas.height/2-E.y));
    if(ratio > 0.05){
      E.deathAnimation = true;
      player.HP[0] -= 1;
      levels_handler.level.total -= 1;
    }
    else {
      E.xspeed = ratio*(canvas.width/2-E.x);
      E.yspeed = ratio*(canvas.height/2-E.y);

      E.x += E.xspeed;
      E.y += E.yspeed;
    }
  };
  E.render = function(){
    ctx.beginPath();
    ctx.save();
    ctx.translate(E.x,E.y);
    ctx.rotate(Math.atan2(canvas.height/2-E.y,canvas.width/2-E.x)+Math.PI/2);
    //damage enemy ship
    ctx.drawImage(E.sprite,0,2*E.heightOnPic+E.thrusterFire[0]+3,E.heightOnPic,E.thrusterFire[0],-E.width/2+E.thrusterFire[1],E.height/2-E.thrusterFire[2],E.width-E.thrusterFire[1],E.thrusterFire[3]);
    ctx.drawImage(E.sprite,0,E.heightOnPic+E.thrusterFire[0]+2,E.widthOnPic,E.heightOnPic,-E.width/2,-E.height/2,E.width,E.height);
    ctx.globalAlpha = E.opacity;
    //normal enemy ship
    ctx.drawImage(E.sprite,0,E.heightOnPic+1,E.heightOnPic,E.thrusterFire[0],-E.width/2+E.thrusterFire[1],E.height/2-E.thrusterFire[2],E.width-E.thrusterFire[1],E.thrusterFire[3]);
    ctx.drawImage(E.sprite,0,0,E.widthOnPic,E.heightOnPic,-E.width/2,-E.height/2,E.width,E.height);
    ctx.globalAlpha = 1;
    ctx.restore();
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(E.x-E.width/4,E.y-25,E.HP/E.maxHP*30,5);
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 1;
    ctx.strokeRect(E.x-E.width/4,E.y-25,E.HP/E.maxHP*30,5);
    ctx.stroke();
    ctx.closePath();
  };
  E.deathAnimation_render = function(){
    if(!E.killed){
      E.deathAnimation_countdown += 1;
      if(E.deathAnimation_countdown%6 == 0){
        E.deathAnimation_angle = Math.random()*2*Math.PI;
        E.deathAnimation_index = E.deathAnimation_countdown/6;
      }
      ctx.beginPath();
      ctx.save();
      ctx.translate(E.x,E.y);
      ctx.rotate(E.deathAnimation_angle);
      ctx.drawImage(object.explosion,0,150*E.deathAnimation_index,150,150,-(E.width+20)/2,-(E.width+20)/2,E.width+20,E.width+20);
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if(E.deathAnimation_index==6)E.killed = true;
    }
  }
  //Cooldowns
  E.attackCD = false;
  E.opacity = 1;
  E.attackCDstart = async function() {
    E.attackCD = true;
    await sleep(150);
    E.attackCD = false;
  };
  E.hitCDstart = async function() {
    E.opacity = 49/100;
    for(var i=50;i<150;i++){
      if(E.opacity!=(i-1)/100){
        break;
      }
      else {
        E.opacity = i/100;
        await sleep(10);
      }
    }
  };
  return E;
}

//collision; normal one; for UI
function collides_UI(a, b) {
  return a.x < b.x + b.width &&
  a.x + a.width > b.x &&
  a.y < b.y + b.height &&
  a.y + a.height > b.y;
}

//collision; adjusted for translated objects
function collides(a, b) {
  return a.x-a.width/2 < b.x + b.width/2&&
  a.x + a.width/2 > b.x - b.width/2 &&
  a.y-a.height/2 < b.y + b.height/2 &&
  a.y + a.height/2 > b.y - b.height/2;
}

//spawner of enemies
async function spawn(level_layout){
  await sleep(2000);
  for(var i=0;i<level_layout.length;i++){
    let det_x = Math.floor(Math.random()*4);
    let det_y;
    if(UI.inMenu)break;
    else if(det_x == 0){det_x = -50;det_y = Math.random()*canvas.height;}
    else if(det_x == 1){det_x = Math.random()*canvas.width;det_y = -50;}
    else if(det_x == 2){det_x = canvas.width+50;det_y = Math.random()*canvas.height}
    else {det_x = Math.random()*canvas.width;det_y = canvas.height+50;}
    enemyList.push(enemyCharacter({x:det_x,y:det_y},level_layout[i]));
    await sleep(levels_handler.level[level_layout[i]][1]);
  }
}
