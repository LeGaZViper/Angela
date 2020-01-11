/*
============================ WHAT TO DO LIST ===================================
SPRITES
UI for upgrades?
================================================================================

######POZNÁMKY######
NEPŘÁTELÉ:
Každý objekt má momentálně svoji individuální sprite mapu.
Mezi každým spritem je 1px mezera.
~Pokud se jedná o sprite bez trysek, dává se 2px mezera.


NÁPAD NA SYSTÉM LEVELU:
Neomezený počet levelů v sekci, přičemž levely scalují
Nová loď ==> nová sekce ==> nová planeta na obranu

*/
//Sleep function | used in: cooldowns
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function inicializeGame(){
  player.inicialize();
  UI.levelDisplayCheck = true;
  player.HP = [player.maxHP[0],player.maxHP[1]];
  bulletList = [];
  enemyList = [];
  enemyBulletList = [];
  canvas.style.cursor = "none";
  UI.inMenu = false;
  spawn(levels_handler.levelCreator());
}
function inicializeMenu(menu){
  XCOINS = 0;
  laserDuration = 300;
  canvas.style.cursor = "auto";
  UI.inMenu = true;
  UI.currentMenu = menu;
}
//Start the game function | used in: main menu
function startTheGame(){
  //Reset Progress
  if(activeShip.section>1||activeShip.level>1){
    if(confirm("Are you sure you want to start a new game?\nYour current progress will reset!")){
      resetLocalStorage();
      inicializeGame();
    }
  }
  else
  inicializeGame();
}
//Continue the game function | used in: continue
function continueTheGame(){
  inicializeGame();
}

//Lose the game function | used in: gameover
function loseTheGame(){
  resetLocalStorage();
  inicializeMenu(2);
}
//Win the game function | used in: gameloop ~ all enemies dead
function winTheGame(){
  localStorage.XCOINS = parseInt(localStorage.XCOINS) + XCOINS;
  activeShip.level += 1;
  for(index in localShipDatabase){
    if(index.name == activeShip.name) {
      index.level += 1;
    }
  }
  saveLocalStorage();
  inicializeMenu(3);
}


function saveLocalStorage(){
  localStorage.localWeaponDatabase = JSON.stringify(localWeaponDatabase);
  localStorage.localShipDatabase = JSON.stringify(localShipDatabase);
  localStorage.activeShip = JSON.stringify(activeShip);
}

function resetLocalStorage(){
  localStorage.localWeaponDatabase = JSON.stringify(defaultWeaponDatabase);
  localStorage.localShipDatabase = JSON.stringify(defaultShipDatabase);
  localStorage.activeShip = JSON.stringify(defaultShipDatabase.SCOUT);
  localStorage.XCOINS = 0;
  activeShip = JSON.parse(localStorage.activeShip);
  localWeaponDatabase = defaultWeaponDatabase;
  localShipDatabase = defaultShipDatabase;
}
//First inicialization
if(localStorage.localWeaponDatabase == undefined){
  resetLocalStorage();
}

//Weapon choosing function | used in: upgrades
var localWeaponDatabase = JSON.parse(localStorage.localWeaponDatabase);
function chooseWeapon(name,ship){
  for(var index in localWeaponDatabase){
    if(localWeaponDatabase[index].name == name&&activeShip.name == ship){
      if(localWeaponDatabase[index].status != "LOCKED"){
        activeShip.weapon = localWeaponDatabase[index];
        saveLocalStorage();
        return true;
      }
      else if (localWeaponDatabase[index].cost<=parseInt(localStorage.XCOINS)){
        console.log("Bought " + localWeaponDatabase[index].name + " for: " + localWeaponDatabase[index].cost + " XCOINS.");
        console.log("Current XCOINS balance: " + localStorage.XCOINS);
        localStorage.XCOINS = parseInt(localStorage.XCOINS) - localWeaponDatabase[index].cost;
        localWeaponDatabase[index].status = "UNLOCKED";
        localStorage.localWeaponDatabase = JSON.stringify(localWeaponDatabase);
        activeShip.weapon = localWeaponDatabase[index];
        saveLocalStorage();
        return true;
      }
      else {
        console.log("Insufficient funds.");
        return false;
      }
    }
  }
}
var activeShip = JSON.parse(localStorage.activeShip);
var localShipDatabase = JSON.parse(localStorage.localShipDatabase);
function chooseShip(name){
  for(var index in localShipDatabase){
    if(localShipDatabase[index].name == name){
      if(localShipDatabase[index].status != "LOCKED"){
        localStorage.activeShip = JSON.stringify(localShipDatabase[index]);
        activeShip = localShipDatabase[index];
        saveLocalStorage();
        return true;
      }
      else if (localShipDatabase[index].cost<=parseInt(localStorage.XCOINS)){
        console.log("Bought " + localShipDatabase[index].name + " for: " + localShipDatabase[index].cost + " XCOINS.");
        console.log("Current XCOINS balance: " + localStorage.XCOINS);
        localStorage.XCOINS = parseInt(localStorage.XCOINS) - localShipDatabase[index].cost;
        localShipDatabase[index].status = "UNLOCKED";
        localStorage.activeShip = JSON.stringify(localShipDatabase[index]);
        localStorage.localShipDatabase = JSON.stringify(localShipDatabase);
        activeShip = localShipDatabase[index];
        saveLocalStorage();
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
window.onload = ()=>{
  canvas = document.getElementById("canvas");
  canvas.addEventListener("click",function(){UI.click()});
  canvas.addEventListener("mousedown",function(){userInput(event,1);});
  canvas.addEventListener("mouseup",function(){userInput(event,2);});
  canvas.addEventListener("mousemove",function(){userInput(event,0);});
  ctx = canvas.getContext("2d");
  //Setting path
  for(let index in object){
    let precursor = index.split("_");
    if(precursor[0] == "UI"||precursor[0] == "projectile")
      object[index].src = "./resources/sprites/" + precursor[0] + "/" + precursor[1] + ".png";
    else
    object[index].src = "./resources/sprites/" + precursor[0] + "/" + precursor[1] + "/" + precursor[1] + ".png";
  }
  scale();
  player.inicialize();
  UI.inicialize();
  //Disabling rightclick popup
  $("#canvas").bind('contextmenu', function() {
    return false;
  });
  //setInterval(gameLoop,1000/120); //120 cyklů/s pro lepší detekci kolize
  //Setting time for monitor refresh rate check
  gameLoop();
}

//Dynamic resolution scaling function  | used in: rendering
var screenratio;
function scale(){
  screenratio = 1;
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
var fpsInterval = 1000/60; //60 FPS
function gameLoop(){
  requestAnimationFrame(gameLoop);
  let timeThen = 0;
  let timeNow = Date.now();
  let dif = timeNow - timeThen;
  //If for a check of the monitor refresh rate
  if(dif>fpsInterval){
    timeThen = timeNow - (dif%fpsInterval);
    ctx.clearRect(0,0,canvas.width,canvas.height); //Clearing scene
    if(UI.inMenu){ //Menu part of cycle
      switch(UI.currentMenu){
        case 0:
        UI.menu_render(UI.mainMenu);
        break;
        case 1:
        UI.menu_render(UI.upgradesMenu);
        break;
        case 2:
        UI.menu_render(UI.gameOverMenu);
        break;
        case 3:
        UI.menu_render(UI.youWinMenu);
        break;
      }
    }
    else if(levels_handler.level.total == 0){
      winTheGame();
    }
    else { //Game part
      ctx.beginPath();
      ctx.drawImage(object.UI_earth,0,0,200,200,player.earthX-100*screenratio,player.earthY-100*screenratio,200*screenratio,200*screenratio);//planet
      ctx.globalAlpha = player.damageOpacity[0];
      ctx.drawImage(object.UI_earth,0,200,200,200,player.earthX-100*screenratio,player.earthY-100*screenratio,200*screenratio,200*screenratio);//damaged planet
      ctx.globalAlpha = 1;
      ctx.strokeStyle = "red";
      ctx.lineWidth = 5;
      ctx.globalAlpha = 0.5;
      ctx.strokeRect(player.earthX-player.spaceSize/2,player.earthY-player.spaceSize/2,player.spaceSize,player.spaceSize);
      ctx.closePath();
      bulletList.forEach((b)=>{//bullets - if render check
        if(b.explosive&&b.explosion_triggered)
        b.explosion_render();
        b.update();
        if(b.x > 0 && b.x < canvas.width || b.y > 0 && b.y < canvas.height)
        b.render();
      });
      enemyBulletList.forEach((eb)=>{//enemy bullets - render
        let distance = Math.abs(eb.x-player.earthX)+Math.abs(eb.y-player.earthY);
        if(collides(eb,player)&&player.HP[1]>0&&!player.hitCD&&!player.collisionCD){
          player.HP[1] -= eb.damage;
          eb.killed = true;
          player.hitCD = true;
          player.hitCDstart(1,"bullet");
        }
        else if(distance <10){
          player.HP[0] -= eb.damage;
          eb.killed = true;
          player.hitCDstart(0,"bullet");
        }
        eb.update();
        if(eb.x > 0 && eb.x < canvas.width || eb.y > 0 && eb.y < canvas.height)
        eb.render();
        enemyBulletList = enemyBulletList.filter(check => !(check.killed));
      });
      player.update();//player pos update
      player.render();
      if(leftMouseDown){ //shooting
        if(!player.attackCD&&player.HP[1] > 0&&activeShip.weapon.name != "LASER"){
          bulletList.push(bullet({x:player.x,y:player.y,dirx:xMousePos-player.x,diry:yMousePos-player.y},activeShip.weapon.name,activeShip.weapon.bullets));
          player.attackCDstart();
        }
        else if (activeShip.weapon.name == "LASER"&&bulletList.length != 1){
          bulletList.push(bullet({x:player.x,y:player.y},activeShip.weapon.name,activeShip.weapon.bullets));
        }
      }
      else if (activeShip.weapon.name == "LASER"){
        if(laserDuration<300&&laserDuration>0&&!laserRecharging)
        laserDuration++;
        bulletList = [];
      }
      enemyList.forEach((e)=>{//enemies
        if(!e.deathAnimation){
          if(!e.killed){
            e.update();
            if(e.x > 0 && e.x < canvas.width || e.y > 0 && e.y < canvas.height)
            e.render();
          }
          bulletList.forEach((b)=>{ //Collision with enemies
            if(collides(e,b)){
              if(e.HP>0){
                if(b.explosive&&!b.explosion_triggered)
                b.explode();
                else if((!b.piercing||!e.piercingCD)&&!b.explosive) {
                  e.HP -= b.damage;
                  e.hitCDstart();
                  if(!b.piercing)
                  b.killed = true;
                }
                if(!e.piercingCD)
                e.piercingDamageCDstart();
              }
            }
            bulletList = bulletList.filter(check => !(check.killed));
          });
          if(!player.collisionCD&&!player.hitCD&&collides(e,player)&&player.HP[1]>0){ //player colision
            player.HP[1] -= 1;
            player.collisionCD = true;
            if(player.HP[1] > 0){
              player.hitCDstart(1,"collision");
            }
          }
        }
        else {
          e.deathAnimation_render();
          enemyList = enemyList.filter(check => !(check.killed));
        }
        checkTotal(e);
      });

      //UI
      ctx.beginPath();
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(10*screenratio,canvas.height-70*screenratio,190*screenratio,50*screenratio);
      //HP bars
      let x1_player = parseInt(-(player.HP[0]/player.maxHP[0]-1)*255).toString(16);
      let x2_player = parseInt(player.HP[0]/player.maxHP[0]*255).toString(16);
      if (x1_player.length == 1) x1_player = "0" + x1_player;
      if (x2_player.length == 1) x2_player = "0" + x2_player;
      let x_player = "#" + x1_player + x2_player + "00";

      let x1_earth = parseInt(-(player.HP[1]/player.maxHP[1]-1)*255).toString(16);
      let x2_earth = parseInt(player.HP[1]/player.maxHP[1]*255).toString(16);
      if (x1_earth.length == 1) x1_earth = "0" + x1_earth;
      if (x2_earth.length == 1) x2_earth = "0" + x2_earth;
      let x_earth = "#" + x1_earth + x2_earth + "00";

      ctx.fillStyle = x_earth;
      ctx.fillRect(35*screenratio,canvas.height-66*screenratio,player.HP[1]/player.maxHP[1]*120*screenratio,15*screenratio);
      ctx.fillStyle = x_player;
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
      //Panels
      if(activeShip.weapon.name == "LASER"){
        ctx.fillStyle = "#00FF00";
        if(laserRecharging)
        ctx.fillStyle = "#FF0000";
        ctx.drawImage(object.UI_LASERpanel,canvas.width-240*screenratio,canvas.height-55*screenratio,240*screenratio,55*screenratio);
        ctx.fillRect(canvas.width-155*screenratio,canvas.height-25*screenratio,laserDuration/300*120*screenratio,15*screenratio);
      }
      ctx.drawImage(object.UI_HPpanel,0,canvas.height-96*screenratio,250*screenratio,96*screenratio);
      ctx.drawImage(object.UI_cursor,xMousePos-25,yMousePos-25,50,50); //cursor
      if(UI.levelDisplayCheck){
        ctx.globalAlpha = UI.levelDisplay.opacity;
        ctx.textAlign = "center";
        ctx.font = 80*screenratio + "px FFFFORWA";
        ctx.fillStyle = UI.levelDisplay.color;
        ctx.fillText(UI.levelDisplay.text,UI.levelDisplay.x,UI.levelDisplay.y); //text on screen
        ctx.globalAlpha = 1;
      }
      ctx.globalAlpha = 0.5;
      ctx.strokeStyle = "#6B6B6B";
      ctx.lineWidth = 3;
      ctx.strokeRect(2,2,200*screenratio,200*screenratio);
      ctx.fillStyle = "#193019";
      ctx.fillRect(2,2,200*screenratio,200*screenratio);
      ctx.fillStyle = "blue";
      ctx.strokeStyle = "blue";
      ctx.closePath();
      ctx.beginPath();
      ctx.arc(100*screenratio,100*screenratio,5*screenratio,0,2*Math.PI,false);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.fillStyle = "red";
      enemyList.forEach((e)=>{
        if(!e.deathAnimation)
        ctx.fillRect(e.coordX/(player.spaceSize/(200*screenratio))-2.5,e.coordY/(player.spaceSize/(200*screenratio))-2.5,5,5);
      });
      ctx.fillStyle = "green";
      ctx.strokeStyle = "green";
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.7;
      ctx.moveTo(3,player.coordY/(player.spaceSize/(200*screenratio)));
      ctx.lineTo(player.coordX/(player.spaceSize/(200*screenratio)),player.coordY/(player.spaceSize/(200*screenratio)));
      ctx.moveTo(player.coordX/(player.spaceSize/(200*screenratio)),3);
      ctx.lineTo(player.coordX/(player.spaceSize/(200*screenratio)),player.coordY/(player.spaceSize/(200*screenratio)));
      ctx.moveTo(200*screenratio,player.coordY/(player.spaceSize/(200*screenratio)));
      ctx.lineTo(player.coordX/(player.spaceSize/(200*screenratio)),player.coordY/(player.spaceSize/(200*screenratio)));
      ctx.moveTo(player.coordX/(player.spaceSize/(200*screenratio)),200*screenratio);
      ctx.lineTo(player.coordX/(player.spaceSize/(200*screenratio)),player.coordY/(player.spaceSize/(200*screenratio)));
      ctx.stroke();
      ctx.fillRect(player.coordX/(player.spaceSize/(200*screenratio))-2.5,player.coordY/(player.spaceSize/(200*screenratio))-2.5,5,5);
      ctx.closePath();
      ctx.globalAlpha = 1;
    }
  }
}

//UI
var UI = {
  inMenu : true,
  currentMenu : 0,
  inicialize : function(){
    this.mainMenu_b0 = {width:300*screenratio,height:50*screenratio,x:400*screenratio,y:300*screenratio,text:"NEW GAME",button:"NEW GAME",opacity:1,color:["grey","black","white"]};
    this.mainMenu_b1 = {width:300*screenratio,height:50*screenratio,x:400*screenratio,y:370*screenratio,text:"CONTINUE",button:"CONTINUE",opacity:0.5,color:["grey","black","white"]};
    this.mainMenu_b2 = {width:300*screenratio,height:50*screenratio,x:400*screenratio,y:440*screenratio,text:"UPGRADES",button:"UPGRADES",opacity:1,color:["grey","black","white"]};
    this.mainMenu = [this.mainMenu_b0,this.mainMenu_b1,this.mainMenu_b2];

    this.upgradesMenu_XCOINS = {width:250*screenratio,height:75*screenratio,x:773*screenratio,y:77*screenratio,opacity:1,color:["grey","black","black"]};
    this.upgradesMenu_b0 = {width:300*screenratio,height:50*screenratio,x:723*screenratio,y:773*screenratio,text:"CONTINUE",button:"CONTINUE",opacity:1,color:["grey","black","white"]};
    this.upgradesMenu_b1 = {width:300*screenratio,height:50*screenratio,x:canvas.width/2-150*screenratio,y:390*screenratio,text:"WEAPONS",button:"WEAPONS",opacity:1,color:["grey","black","white"]};
    this.upgradesMenu_b2 = {width:300*screenratio,height:50*screenratio,x:canvas.width/2-150*screenratio,y:460*screenratio,text:"SHIPS",button:"SHIPS",opacity:1,color:["grey","black","white"]};
    this.upgradesMenu_b3 = {width:50*screenratio,height:50*screenratio,x:627*screenratio,y:520*screenratio,button:"CHANGE_L",text:"<-",opacity:1,color:["grey","black","white"]};
    this.upgradesMenu_b4 = {width:50*screenratio,height:50*screenratio,x:727*screenratio,y:520*screenratio,button:"CHANGE_R",text:"->",opacity:1,color:["grey","black","white"]};
    this.upgradesMenuWindow = {width:1000*screenratio,height:800*screenratio,x:canvas.width/2-500*screenratio,y:canvas.height/2-400*screenratio,opacity:0,color:["grey","black","white"],sprite:object.UI_shopBG};
    this.upgradesMenu = [this.upgradesMenuWindow,this.upgradesMenu_XCOINS,this.upgradesMenu_b0,this.upgradesMenu_b3,this.upgradesMenu_b4];

    this.weaponsUpgradesMenu_b0 = {width:284*screenratio,height:100*screenratio,x:80*screenratio,y:81*screenratio,cost:defaultWeaponDatabase["BASIC"].cost,button:"BASIC",toShip:"SCOUT",opacity:1,color:["grey","black","white"],sprite:object.UI_BASIC,selected:false};
    this.weaponsUpgradesMenu_b1 = {width:284*screenratio,height:100*screenratio,x:80*screenratio,y:188*screenratio,cost:defaultWeaponDatabase["DOUBLE"].cost,button:"DOUBLE",toShip:"SLUG",opacity:1,color:["grey","black","white"],sprite:object.UI_DOUBLE,selected:false};
    this.weaponsUpgradesMenu_b2 = {width:284*screenratio,height:100*screenratio,x:80*screenratio,y:293*screenratio,cost:defaultWeaponDatabase["SPRAY"].cost,button:"SPRAY",toShip:"SCOUT",opacity:1,color:["grey","black","white"],sprite:object.UI_SPRAY,selected:false};
    this.weaponsUpgradesMenu_b3 = {width:284*screenratio,height:100*screenratio,x:81*screenratio,y:81*screenratio,cost:defaultWeaponDatabase["ROCKET"].cost,button:"ROCKET",toShip:"ORBITER",opacity:1,color:["grey","black","white"],sprite:object.UI_ROCKET,selected:false};
    this.weaponsUpgradesMenu_b4 = {width:284*screenratio,height:100*screenratio,x:81*screenratio,y:188*screenratio,cost:defaultWeaponDatabase["GIANT"].cost,button:"GIANT",toShip:"ORBITER",opacity:1,color:["grey","black","white"],selected:false};
    this.weaponsUpgradesMenu_b5 = {width:284*screenratio,height:100*screenratio,x:81*screenratio,y:293*screenratio,cost:defaultWeaponDatabase["LASER"].cost,button:"LASER",toShip:"ORBITER",opacity:1,color:["grey","black","white"],sprite:object.UI_LASER,selected:false};
    this.weaponsUpgradesMenu_b6 = {width:284*screenratio,height:100*screenratio,x:81*screenratio,y:398*screenratio,cost:defaultWeaponDatabase["SPREADER"].cost,button:"SPREADER",toShip:"ORBITER",opacity:1,color:["grey","black","white"],selected:false};
    this.weaponsUpgradesMenu = [this.weaponsUpgradesMenu_b0,this.weaponsUpgradesMenu_b1,this.weaponsUpgradesMenu_b2,this.weaponsUpgradesMenu_b3,this.weaponsUpgradesMenu_b4,this.weaponsUpgradesMenu_b5,this.weaponsUpgradesMenu_b6];

    this.displayShip = activeShip.name;
    this.shipsUpgradesMenu_b0 = {width:176*screenratio,height:176*screenratio,x:614*screenratio,y:310*screenratio,button:"SCOUT",ship:"SCOUT",sprite:object.player_scout,color:["grey","black","white"],opacity:0};
    this.shipsUpgradesMenu_b1 = {width:176*screenratio,height:176*screenratio,x:614*screenratio,y:310*screenratio,button:"SLUG",ship:"SLUG",sprite:object.player_slug,color:["grey","black","white"],opacity:0};
    this.shipsUpgradesMenu_b2 = {width:176*screenratio,height:176*screenratio,x:614*screenratio,y:310*screenratio,button:"ORBITER",ship:"ORBITER",sprite:object.player_orbiter,color:["grey","black","white"],opacity:0};

    this.shipsUpgradesMenu = [this.shipsUpgradesMenu_b0,this.shipsUpgradesMenu_b1,this.shipsUpgradesMenu_b2];

    this.upgradesMenu = this.upgradesMenu.concat(this.weaponsUpgradesMenu,this.shipsUpgradesMenu);

    this.gameOverMenuWindow = {width:550*screenratio,height:250*screenratio,x:275*screenratio,y:canvas.height/2-150*screenratio,text:"GAME OVER",opacity:1,color:["#4C4C4C","black","black"]};
    this.gameOverMenu_b0 = {width:250*screenratio,height:50*screenratio,x:290*screenratio,y:470*screenratio,text:"RESTART",button:"RESTART",opacity:1,color:["grey","black","black"]};
    this.gameOverMenu_b1 = {width:250*screenratio,height:50*screenratio,x:560*screenratio,y:470*screenratio,text:"BACK",button:"BACK",opacity:1,color:["grey","black","black"]};
    this.gameOverMenu = [this.gameOverMenuWindow,this.gameOverMenu_b0,this.gameOverMenu_b1];

    this.youWinMenuWindow = {width:550*screenratio,height:250*screenratio,x:275*screenratio,y:canvas.height/2-150*screenratio,text:"YOU WIN!",opacity:1,color:["#4C4C4C","black","black"]};
    this.youWinMenu_b0 = {width:250*screenratio,height:50*screenratio,x:290*screenratio,y:470*screenratio,text:"UPGRADES",button:"UPGRADES",opacity:1,color:["grey","black","black"]};
    this.youWinMenu_b1 = {width:250*screenratio,height:50*screenratio,x:560*screenratio,y:470*screenratio,text:"CONTINUE",button:"CONTINUE",opacity:1,color:["grey","black","black"]};
    this.youWinMenu = [this.youWinMenuWindow,this.youWinMenu_b0,this.youWinMenu_b1];

    this.weaponsUpgradesMenu.forEach((index)=>{
      if(activeShip.weapon.name == index.button){
        index.selected = true;
      }
    });
    this.shipsUpgradesMenu.forEach((index)=>{
      if(activeShip.name == index.button){
        index.selected = true;
      }
    });
    this.levelDisplay = {x:canvas.width/2,y:300*screenratio,opacity:0,color:"white"};
    this.levelDisplayCheck = false;
    this.UIColors = {fill:"grey",stroke:"#333333",fontFill:"white",fontStroke:"black",hoverFill:"blue",hoverStroke:"blue",hoverFontFill:"white",hoverFontStroke:"blue",selectedFill:"grey",selectedStroke:"white",selectedFontFill:"white",selectedFontStroke:"blue"};
  },
  menu_render : function(menu){
    this.upgradesMenu_XCOINS.text = "XCOINS: " + localStorage.XCOINS;
    this.hover();
    if(activeShip.section>1||activeShip.level>1){
      this.mainMenu_b1.opacity = 1;
    }
    else {
      this.mainMenu_b1.opacity = 0.5;
    }
    menu.forEach((index)=>{
      if((index.ship == undefined&&index.toShip == undefined)||index.ship == this.displayShip||index.toShip == this.displayShip){
        ctx.fillStyle = index.color[0];
        ctx.strokeStyle = index.color[1];
        ctx.lineWidth = 5;
        ctx.globalAlpha = index.opacity;
        ctx.strokeRect(index.x,index.y,index.width,index.height);
        ctx.fillRect(index.x,index.y,index.width,index.height);
        ctx.fillStyle = index.color[2];
        if(index.text != undefined){
          ctx.font = 30*screenratio + "px FFFFORWA";
          ctx.textAlign = "center";
          ctx.strokeText(index.text,index.x+index.width/2,index.y+index.height/2+19*screenratio);
          ctx.fillText(index.text,index.x+index.width/2,index.y+index.height/2+19*screenratio); //text on screen
        }
        if(index.sprite != undefined){
          ctx.globalAlpha = 1;
          if(index.button == undefined){
            ctx.drawImage(index.sprite,0,0,index.width/screenratio,index.height/screenratio,index.x,index.y,index.width,index.height);
          }
          else {
            if(index.toShip == undefined){
              if(localShipDatabase[index.button].status == "LOCKED")
              ctx.drawImage(index.sprite,0,0,index.width/screenratio/2,index.height/screenratio/2,index.x,index.y,index.width,index.height);
              else
              ctx.drawImage(index.sprite,0,0,index.width/screenratio/2,index.height/screenratio/2,index.x,index.y,index.width,index.height);
            }
            else {
              if(localWeaponDatabase[index.button].status == "LOCKED")
              ctx.drawImage(index.sprite,0,0,index.width/screenratio,index.height/screenratio,index.x,index.y,index.width,index.height);
              else
              ctx.drawImage(index.sprite,0,100,index.width/screenratio,index.height/screenratio,index.x,index.y,index.width,index.height);
            }
          }
        }
        if(index.cost != undefined&&JSON.parse(localStorage.localWeaponDatabase)[index.button].status == "LOCKED"){
          ctx.font = 20*screenratio + "px FFFFORWA";
          ctx.textAlign = "center";
          ctx.strokeText(index.cost,index.x+3*index.width/4,index.y+index.height-30*screenratio);
          ctx.fillText(index.cost,index.x+3*index.width/4,index.y+index.height-30*screenratio);
        }
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
            if(activeShip.section>1||activeShip.level>1){
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
          if(index.button != "CONTINUE"){
            if(index.button == "CHANGE_L"){
              for(let i=this.shipsUpgradesMenu.length-1;i>0;i--){
                if(this.shipsUpgradesMenu[i].ship == this.displayShip){
                  this.displayShip = this.shipsUpgradesMenu[i-1].ship;
                  if(localShipDatabase[this.displayShip].status == "UNLOCKED"){
                    chooseShip(this.displayShip);
                }
                break;
                }
              }
            }
            else if (index.button == "CHANGE_R"){
              for(let i=0;i<this.shipsUpgradesMenu.length-1;i++){
                if(this.shipsUpgradesMenu[i].ship == this.displayShip){
                  this.displayShip = this.shipsUpgradesMenu[i+1].ship;
                  if(localShipDatabase[this.displayShip].status == "UNLOCKED"){
                    chooseShip(this.displayShip);
                  }
                  break;
                }
              }
            }
            else if (index.ship != undefined&&index.ship == this.displayShip&&localShipDatabase[this.displayShip].status == "LOCKED"){
              chooseShip(index.button);
              activeShip.weapon.status = "UNLOCKED";
              localWeaponDatabase[activeShip.weapon.name].status = "UNLOCKED";
              saveLocalStorage();
            }
            else if(chooseWeapon(index.button,index.toShip)){
              for(var i=0;i<this.weaponsUpgradesMenu.length;i++){
                  this.weaponsUpgradesMenu[i].selected = false;
              }
                index.selected = true;
            }
          }
          else {
            continueTheGame();
          }
        }
      });
    }
    else if (this.currentMenu == 2&&this.inMenu){
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
    else if (this.currentMenu == 3&&this.inMenu){
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
          if(index.button == "CONTINUE"&&(activeShip.section>1||activeShip.level>1)){
            index.color[0] = this.UIColors.hoverFill;
            index.color[1] = this.UIColors.hoverStroke;
            index.color[2] = this.UIColors.hoverFontFill;
          }
          else if (index.button != "CONTINUE") {
            index.color[0] = this.UIColors.hoverFill;
            index.color[1] = this.UIColors.hoverStroke;
            index.color[2] = this.UIColors.hoverFontFill;
          }
        }
        else {
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    }
    else if (this.currentMenu == 1){
      this.upgradesMenu.forEach((index)=>{
        if(index.button == "CHANGE_L"&&this.displayShip == "SCOUT"){
          index.opacity = 0.5;
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
        else if (index.button == "CHANGE_R"&&this.displayShip == "ORBITER"){
          index.opacity = 0.5;
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
        else if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&!index.selected&&index.button!=undefined){
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        }
        else if (activeShip.weapon.name == index.button){
          index.color[0] = this.UIColors.selectedFill;
          index.color[1] = this.UIColors.selectedStroke;
          index.color[2] = this.UIColors.selectedFontFill;
        }
        else {
          if(index.ship == undefined)
          index.opacity = 1;
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    }
    else if (this.currentMenu == 2){
      this.gameOverMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        }
        else {
          if(index.text != "GAME OVER")
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    }
    else if (this.currentMenu == 3){
      this.youWinMenu.forEach((index)=>{
        if(collides_UI(index,{x:xMousePos-5,y:yMousePos-5,width:1,height:1})&&index.button!=undefined){
          index.color[0] = this.UIColors.hoverFill;
          index.color[1] = this.UIColors.hoverStroke;
          index.color[2] = this.UIColors.hoverFontFill;
        }
        else {
          if(index.text != "YOU WIN!")
          index.color[0] = this.UIColors.fill;
          index.color[1] = this.UIColors.stroke;
          index.color[2] = this.UIColors.fontFill;
        }
      });
    }
  }
};

//bullets
var bulletList = [];
var laserDuration = 300;
var laserRecharging = false;
function bullet(B,name,numberOfBullets){
  B.killed = false;
  B.damage = localWeaponDatabase[name].damage;
  B.speed = localWeaponDatabase[name].speed*screenratio;
  B.width = localWeaponDatabase[name].width*screenratio;
  B.height = localWeaponDatabase[name].height*screenratio;
  B.piercing = localWeaponDatabase[name].piercing;
  B.color = localWeaponDatabase[name].color;
  B.opacity = 1;
  if(name == "BASIC"){
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
      bulletList.push(bullet({x:player.x,y:player.y},name,numberOfBullets-1))
    }
  }
  else if(name == "SPRAY") {
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
      bulletList.push(bullet({x:player.x,y:player.y},name,numberOfBullets-1));
    }
  }
  else if (name == "ROCKET"){
    B.sprite = object.projectile_rocket;
    B.explosive = true;
    B.explosion_radius = 150*screenratio;
    B.explosion_triggered = false;
    B.explosion_countdown = 0;
    B.explosion_index = 0;
    B.explosion_angle = Math.random()*2*Math.PI;
  }
  else if (name == "GIANT"){

  }
  else if (name == "SPREADER"){
    B.sprite = object.projectile_spread;
  }
  else if (name == "SPREADER_PROJECTILE"){
    B.sprite = object.projectile_spreadProjectile;
  }
  B.hitBoxWidth = B.width/3*2;
  B.hitBoxHeight = B.height/3*2;
  B.hitBoxX = B.x-B.hitBoxWidth/2;
  B.hitBoxY = B.y-B.hitBoxHeight/2;
  B.update = function(){
    if(name == "LASER"&&B.laserDurationCheck()){
      let hitDetectionX = player.x;
      let hitDetectionY = player.y;
      B.dirx = xMousePos-player.x;
      B.diry = yMousePos-player.y;
      let ratio = 6/(Math.abs(B.dirx)+Math.abs(B.diry));
      for(let i=0;i<200;i++){
        hitDetectionX += B.dirx*ratio;
        hitDetectionY += B.diry*ratio;
        enemyList.forEach((e)=>{
          if(!e.piercingCD&collides(e,{hitBoxX:hitDetectionX-3,hitBoxY:hitDetectionY-3,hitBoxWidth:6,hitBoxHeight:6})){
            e.piercingDamageCDstart();
            e.HP -= B.damage;
            e.hitCDstart();
            checkTotal(e);
          }
        });
      }
      B.x = hitDetectionX;
      B.y = hitDetectionY;
    }
    else if(!B.explosion_triggered){
      bulletList = bulletList.filter(check => !(check.x < -canvas.width||check.x > canvas.width*2||check.y < -canvas.height||check.y > canvas.height*2));

      let ratio = B.speed/(Math.abs(B.dirx)+Math.abs(B.diry));
      B.xspeed = ratio*B.dirx;
      B.yspeed = ratio*B.diry;

      B.x += B.xspeed-player.xspeed;
      B.y += B.yspeed-player.yspeed;
      B.hitBoxX = B.x-B.hitBoxWidth/2;
      B.hitBoxY = B.y-B.hitBoxHeight/2;
    }
  }
  B.render = function(){
    if(name == "LASER"&&B.laserDurationCheck()){
      ctx.beginPath();
      ctx.save();
      ctx.globalAlpha = 1;
      ctx.strokeStyle = B.color;
      ctx.lineWidth = 6*screenratio;
      ctx.moveTo(player.x,player.y);
      ctx.lineTo(B.x,B.y);
      ctx.stroke();
      ctx.restore();
      ctx.closePath();
    }
    else if(!B.explosion_triggered){
      ctx.beginPath();
      ctx.save();
      ctx.translate(B.x,B.y);
      ctx.rotate(Math.atan2(B.diry,B.dirx)+Math.PI/2);
      ctx.globalAlpha = B.opacity;
      if(B.color == undefined){
        ctx.drawImage(B.sprite,0,0,B.width/screenratio,B.height/screenratio,-B.width/2,-B.height/2,B.width,B.height);
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
  B.explode = function(){
    B.explosion_triggered = true;
    enemyList.forEach((e)=>{
      if(collides(e,{hitBoxX:B.x-B.explosion_radius/2,hitBoxY:B.y-B.explosion_radius/2,hitBoxWidth:B.explosion_radius,hitBoxHeight:B.explosion_radius})){
        e.HP -= B.damage;
        e.hitCDstart();
        checkTotal(e);
      }
    });
  }
  B.explosion_render = function(){
    if(!B.killed){
      B.explosion_countdown += 1;
      if(B.explosion_countdown%5 == 0){
        B.explosion_angle = Math.random()*2*Math.PI;
        B.explosion_index += 1;
      }
      ctx.beginPath();
      ctx.save();
      ctx.translate(B.x,B.y);
      ctx.rotate(B.explosion_angle);
      ctx.drawImage(object.projectile_explosion,0,B.explosion_radius/screenratio*B.explosion_index,150,150,-75*screenratio,-75*screenratio,B.explosion_radius,B.explosion_radius);
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if(B.explosion_index==11)B.killed = true;
    }
  }
  B.laserDurationCheck = function(){
    if(laserDuration>0&&!laserRecharging){
      laserDuration--;
      return true;
    }
    else if(!laserRecharging){
      laserRecharging = true;
      B.laserCDstart();
      return false;
    }
    else {
      return false;
    }
  }
  B.laserCDstart = async function(){
    for(let i=0;i<activeShip.weapon.cooldown/10;i++){
      laserDuration += 1.5;
      await sleep(10);
    }
    laserRecharging = false;
  }
  return B;
}

//player object
var player = {
  inicialize : ()=>{
    player.spaceSize = 4000*screenratio;
    player.x = canvas.width/2;
    player.y = canvas.height/2;
    player.coordX = player.spaceSize/2;
    player.coordY = player.spaceSize/2;
    player.earthX = canvas.width/2;
    player.earthY = canvas.height/2;
    player.futureX = 0;
    player.futureY = 0;
    player.speed = activeShip.speed*screenratio;
    player.xspeed = 0;
    player.yspeed = 0;
    player.width = activeShip.width*screenratio;
    player.height = activeShip.height*screenratio;
    player.widthOnPic = activeShip.widthOnPic;
    player.heightOnPic = activeShip.heightOnPic;
    player.animationX = 0;
    player.animationY = 0;
    //0 = Earth, 1 = Ship
    player.maxHP = activeShip.maxHP;
    player.HP = [player.maxHP[0],player.maxHP[1]];
    //particle parameters
    //0 = heightOnPic, 1 = yDistanceFromShip, 2 = heightOnCanvas, 3 = particlesX add, 4 = particlesY add
    player.particles = activeShip.particles;
    player.particlesWidth = 1;
    player.particlesHeight = 0.2;

    player.hitBoxWidth = player.width/3*2;
    player.hitBoxHeight = player.height/3*2;
    player.hitBoxX = player.x-player.hitBoxWidth/2;
    player.hitBoxY = player.y-player.hitBoxHeight/2;
    player.sprite = object["player_" + activeShip.name.toLowerCase()];
  },
  update : ()=>{
    //thruster animation
    if(!player.xspeed == 0&&!player.yspeed == 0&&player.particlesHeight<1){
    player.particlesWidth += player.particles[3];
    player.particlesHeight += player.particles[4];
  }

    else if(player.xspeed == 0&&player.yspeed == 0&&player.particlesHeight>0.2){
    player.particlesWidth -= player.particles[3];
    player.particlesHeight -= player.particles[4];
  }
    let ratio = player.speed/((Math.abs(xMousePos-player.x)+Math.abs(yMousePos-player.y)));
    if(player.HP[0] <= 0){
      loseTheGame();
    }
    if(player.HP[1] <= 0&&!player.killedCD){
      player.killedCDstart();
    }
    else if(!isNaN(ratio)&&!rightMouseDown){
      if(Math.sqrt(Math.pow(xMousePos-player.x,2)+Math.pow(yMousePos-player.y,2))>50*screenratio){
        player.xspeed = ratio*(xMousePos-player.x);
        player.yspeed = ratio*(yMousePos-player.y);
        player.futureX += player.xspeed;
        player.futureY += player.yspeed;
        if(Math.abs(player.futureX) < player.spaceSize/2&&Math.abs(player.futureY) < player.spaceSize/2){
          player.coordX += player.xspeed;
          player.coordY += player.yspeed;
          player.hitBoxX = player.x-player.hitBoxWidth/2;
          player.hitBoxY = player.y-player.hitBoxHeight/2;
        }
        else {
          player.futureX -= player.xspeed;
          player.futureY -= player.yspeed;
          player.xspeed = 0;
          player.yspeed = 0;
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
    player.earthX -= player.xspeed;
    player.earthY -= player.yspeed;
  },
  render : ()=> {
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
    //Normal Scout
    ctx.globalAlpha = player.opacity[1];
    ctx.drawImage(player.sprite,0,player.heightOnPic,player.widthOnPic,player.particles[0],-player.width/2*player.particlesWidth,player.height/2-player.particles[1]*screenratio,player.width*player.particlesWidth,player.particles[2]*screenratio*player.particlesHeight);
    ctx.drawImage(player.sprite,0,0,player.widthOnPic,player.heightOnPic,-player.width/2,-player.height/2,player.width,player.height);
    //Damaged Scout #RED
    if(player.HP[1] > 0){
      ctx.globalAlpha = player.damageOpacity[1];
      ctx.drawImage(player.sprite,0,2*player.heightOnPic+player.particles[0],player.widthOnPic,player.particles[0],-player.width/2*player.particlesWidth,player.height/2-player.particles[1]*screenratio,player.width*player.particlesWidth,player.particles[2]*screenratio*player.particlesHeight);
      ctx.drawImage(player.sprite,0,player.heightOnPic+player.particles[0],player.widthOnPic,player.heightOnPic,-player.width/2,-player.height/2,player.width,player.height);
    }
    ctx.restore();
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.closePath();
  },

  attackCD : false,
  hitCD : false,
  collisionCD : false,
  killedCD : false,
  opacity : [1,1],
  damageOpacity : [0,0],
  blikacky : false,
  attackCDstart : async function() {
    player.attackCD = true;
    await sleep(activeShip.weapon.cooldown);
    player.attackCD = false;
  },
  hitCDstart : async function(which,what) {
    player.damageOpacity[which] = 51/100;
    for(let i=50;i>=0;i--){
      if(player.damageOpacity[which] == (i+1)/100){
        player.damageOpacity[which] = i/100;
        await sleep(20);
      }
      else break;
    }
    if(which == 1&& what == "bullet")
    player.hitCD = false;
    else if (which == 1 && what == "collision") player.collisionCD = false;
  },
  killedCDstart : async function() {
    //EXPLOSION
    player.opacity[1] = 0.5;
    player.killedCD = true;
    await sleep(5000);
    player.HP[1] = player.maxHP[1];
    player.opacity[1] = 1;
    player.killedCD = false;
  }
};

//Check for total of enemies on the map | used in: win condition
var XCOINS = 0;
async function checkTotal(enemy){
  if(enemy.HP <= 0&&!enemy.deathAnimation){
    enemy.deathAnimation = true;
    if(activeShip.weapon.name == "SPREADER"){
      for(let i=0;i<16;i++){
        bulletList.push(bullet({x:enemy.x,y:enemy.y,dirx:Math.cos(Math.PI/8*i),diry:Math.sin(Math.PI/8*i)},"SPREADER_PROJECTILE",1));
      }
    }
    if(levels_handler.level.total == 1&&enemy.sprite != object.enemy_pirateMine){
      await sleep(2000);
      levels_handler.level.total -= 1;
    }
    else if (enemy.sprite != object.enemy_pirateMine) {
      levels_handler.level.total -= 1;
    }
    XCOINS += enemy.XCOINS;
  }
}
var enemyBulletList = [];
function enemyBullet(B,type){
  B.killed = false;
  B.damage = 1;
  B.speed = 15*screenratio;
  B.color = "#FF0000";
  if(type == "BASIC"){
    B.dirx = player.earthX-B.x;
    B.diry = player.earthY-B.y;
    B.width = 4*screenratio;
    B.height = 25*screenratio;
  }
  B.update = function(){
    let ratio = B.speed/(Math.abs(B.dirx)+Math.abs(B.diry));
    B.xspeed = ratio*B.dirx;
    B.yspeed = ratio*B.diry;

    B.x += B.xspeed-player.xspeed;
    B.y += B.yspeed-player.yspeed;
    B.hitBoxWidth = B.width/3*2;
    B.hitBoxHeight = B.height/3*2;
    B.hitBoxX = B.x-B.hitBoxWidth/2;
    B.hitBoxY = B.y-B.hitBoxHeight/2;
  }
  B.render = function(){
    ctx.beginPath();
    ctx.save();
    ctx.translate(B.x,B.y);
    ctx.rotate(Math.atan2(B.diry,B.dirx)+Math.PI/2);
    ctx.globalAlpha = B.opacity;
    if(B.color == undefined){
      ctx.drawImage(B.sprite,0,0,B.width,B.height,-B.width/2,-B.height/2,B.width,B.height);
    }
    else {
      ctx.fillStyle = B.color;
      ctx.fillRect(-B.width/2,-B.height/2,B.width,B.height);
      ctx.fill();
    }
    ctx.restore();
    ctx.stroke();
    ctx.closePath();
  }
  return B;
}
//enemy objects
var enemyList = [];
function enemyCharacter(E,type){
  E.appearOpacity = 0;
  E.appear = async function(){
    for(let i=1;i<=100;i++){
      E.appearOpacity = i/100;
      await sleep(10);
    }
  }
  E.appear();
  E.animation = false;
  E.attackCDvalue = 2000;
  if (type == "buzz"){
    E.sprite = object.enemy_buzz;
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
    E.particles = [10,10*screenratio,-1*screenratio,0,0.1];
  }
  else if (type == "tooth"){
    E.sprite = object.enemy_tooth;
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
    E.particles = [10,10*screenratio,-1*screenratio,0,0.1];
  }
  else if (type == "sharkfin"){// 1 - sharkfin
    E.sprite = object.enemy_sharkfin;
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
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [10,10*screenratio,-12*screenratio,0,0.1];
  }
  else if(type == "goblin"){// 2 - goblin
    E.sprite = object.enemy_goblin;
    E.widthOnPic = 76;
    E.heightOnPic = 100;
    //Ingame stats
    E.width = 76*screenratio;
    E.height = 100*screenratio;
    E.speed = 1*screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.XCOINS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [22,22*screenratio,-1*screenratio,0,0.1];
  }
  else if(type == "SG40"){// 2 - goblin
    E.sprite = object.enemy_SG40;
    E.widthOnPic = 48;
    E.heightOnPic = 50;
    //Ingame stats
    E.width = 48*screenratio;
    E.height = 50*screenratio;
    E.speed = 1*screenratio;
    E.HP = 10;
    E.maxHP = 10;
    E.XCOINS = 10;
    E.particles = [0,0*screenratio,0*screenratio,0,0];
  }
  else if (type == "pirateRaider"){
    E.sprite = object.enemy_pirateRaider;
    E.widthOnPic = 60;
    E.heightOnPic = 32;
    //Ingame stats
    E.width = 60*screenratio;
    E.height = 32*screenratio;
    E.speed = 1.5*screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.XCOINS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [10,10*screenratio,-1*screenratio,0,0.1];
  }
  else if (type == "pirateMinedropper"){
    E.sprite = object.enemy_pirateMinedropper;
    E.widthOnPic = 56;
    E.heightOnPic = 74;
    //Ingame stats
    E.width = 56*screenratio;
    E.height = 74*screenratio;
    E.speed = 1*screenratio;
    E.HP = 15;
    E.maxHP = 15;
    E.XCOINS = 10;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship, 3 = particlesX add, 4 = particlesY add
    E.particles = [10,10*screenratio,-6*screenratio,0,0.1];
  }
  else if (type == "pirateMine"){
    E.sprite = object.enemy_pirateMine;
    E.widthOnPic = 44;
    E.heightOnPic = 44;
    //Ingame stats
    E.width = 44*screenratio;
    E.height = 44*screenratio;
    E.speed = 0.5*screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.XCOINS = 0;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [0,0*screenratio,0*screenratio,0,0];
  }
  else if (type == "pirateTiger"){
    E.sprite = object.enemy_pirateTiger;
    E.widthOnPic = 70;
    E.heightOnPic = 70;
    //Ingame stats
    E.width = 70*screenratio;
    E.height = 70*screenratio;
    E.speed = 2*screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.XCOINS = 0;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [18,18*screenratio,-13*screenratio,0,0.1];
  }
  else if (type == "pirateVessel"){
    E.sprite = object.enemy_pirateVessel;
    E.widthOnPic = 76;
    E.heightOnPic = 158;
    //Ingame stats
    E.width = 76*screenratio;
    E.height = 158*screenratio;
    E.speed = 3*screenratio;
    E.HP = 50;
    E.maxHP = 50;
    E.XCOINS = 0;
    E.angle = Math.atan2(player.earthX-E.y,player.earthY-E.x)+Math.PI/2;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = heightOnCanvas, 2 = distance from ship
    E.particles = [46,46*screenratio,-79*screenratio,0,0.1];
    E.orbit = true;
    E.inOrbit = false;
  }
  else if (type == "voidDrone"){
    E.sprite = object.enemy_voidDrone;
    E.widthOnPic = 60;
    E.heightOnPic = 60;
    //Ingame stats
    E.width = 45*screenratio;
    E.height = 45*screenratio;
    E.speed = 1*screenratio;
    E.HP = 5;
    E.maxHP = 5;
    E.XCOINS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0,0*screenratio,0*screenratio,0];
  }
  else if (type == "voidChaser"){
    E.sprite = object.enemy_voidChaser;
    E.widthOnPic = 48;
    E.heightOnPic = 62;
    //Ingame stats
    E.width = 48*screenratio;
    E.height = 62*screenratio;
    E.speed = 1*screenratio;
    E.HP = 20;
    E.maxHP = 20;
    E.XCOINS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0,0*screenratio,0*screenratio,0];
  }
  else if (type == "voidSpherefighter"){
    E.sprite = object.enemy_voidSpherefighter;
    E.widthOnPic = 64;
    E.heightOnPic = 64;
    //Ingame stats
    E.width = 64*screenratio;
    E.height = 64*screenratio;
    E.speed = 1*screenratio;
    E.HP = 20;
    E.maxHP = 20;
    E.XCOINS = 15;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0,0*screenratio,0*screenratio,0];
    E.animation = true;
    E.animationFrames = 8;
    E.animationFPS = 5;
  }
  else if (type == "voidChakram"){
    E.sprite = object.enemy_voidChakram;
    E.widthOnPic = 180;
    E.heightOnPic = 180;
    //Ingame stats
    E.width = 180*screenratio;
    E.height = 180*screenratio;
    E.speed = 0.5*screenratio;
    E.HP = 50;
    E.maxHP = 50;
    E.XCOINS = 50;
    //Custom thruster fire parameters
    //0 = heightOnPic, 1 = widthOnCanvas, 2 = YdistanceFromShip, 3 = heightOnCanvas
    E.particles = [0,0*screenratio,0*screenratio,0];
    E.animation = true;
    E.animationFrames = 4;
    E.animationFPS = 12;
  }
  E.coordX = player.spaceSize/2 + E.x - player.earthX;
  E.coordY = player.spaceSize/2 + E.y - player.earthY;
  E.deathAnimation = false;
  E.deathAnimation_angle = Math.random()*2*Math.PI;
  E.deathAnimation_index = 0;
  E.deathAnimation_countdown = 0;
  E.killed = false;
  E.animationX = 0;
  E.animationY = 0;
  E.animationIndex = 0;
  E.counter = 0;
  E.arrival = false;
  E.particlesWidth = 1;
  E.particlesHeight = 0.2;
  if(E.hitBoxWidth == undefined){
    E.hitBoxWidth = E.width/3*2;
    E.hitBoxHeight = E.height/3*2;
    E.hitBoxX = E.x-E.hitBoxWidth/2;
    E.hitBoxY = E.y-E.hitBoxHeight/2;
  }
  E.update = function(){
    if(E.speed != 0&&E.particlesHeight<1){
      E.particlesWidth += E.particles[3];
      E.particlesHeight += E.particles[4];
    }
    else if(E.speed == 0&&E.particlesHeight>0.2){
      E.particlesWidth -= E.particles[3];
      E.particlesHeight -= E.particles[4];
    }
    let distance = Math.abs(player.earthX-E.x)+Math.abs(player.earthY-E.y);
    if(E.orbit&&distance<500*screenratio&&!E.inOrbit){
      E.inOrbit = true;
    }
    else if (E.inOrbit&&!E.arrival){
      E.arrival = true;
      E.attackCDstart();
    }
    else if (E.inOrbit&&E.arrival&&!E.attackCD){
      if(type == "pirateVessel"){
        E.attackCDstart();
        if(Math.random()<0.5)
        enemyBulletList.push(enemyBullet({x:E.cannon1X,y:E.cannon1Y},"BASIC"));
        else
        enemyBulletList.push(enemyBullet({x:E.cannon2X,y:E.cannon2Y},"BASIC"));
      }
      else {
        enemyBulletList.push(enemyBullet({x:E.x,y:E.y},"BASIC"));
        E.attackCDstart();
      }
    }
    else if(distance < 140*screenratio&&(type != "pirateMine"&&type != "pirateMinedropper")&&!E.orbit){
      E.speed = 0;
      if(!E.arrival){
        E.arrival = true;
        E.attackCDstart();
      }
      else if(!E.attackCD){
        enemyBulletList.push(enemyBullet({x:E.x,y:E.y},"BASIC"));
        E.attackCDstart();
      }
    }
    else if ((type == "pirateMine"||type == "pirateMinedropper")&&distance<40){
      E.HP = 0;
      player.HP[0] -= 2;
    }
    else if (!E.inOrbit){
      let ratio = E.speed/(Math.abs(player.earthX-E.x)+Math.abs(player.earthY-E.y));
      E.xspeed = ratio*(player.earthX-E.x);
      E.yspeed = ratio*(player.earthY-E.y);

      E.x += E.xspeed;
      E.y += E.yspeed;
      E.coordX += E.xspeed;
      E.coordY += E.yspeed;
      E.hitBoxX = E.x-E.hitBoxWidth/2;
      E.hitBoxY = E.y-E.hitBoxHeight/2;
    }
    else {
      E.angle-=0.01*screenratio;
      E.x += E.speed*Math.cos(E.angle);
      E.y += E.speed*Math.sin(E.angle);
      E.coordX += E.xspeed;
      E.coordY += E.yspeed;
      E.hitBoxX = E.x-E.hitBoxWidth/2;
      E.hitBoxY = E.y-E.hitBoxHeight/2;
    }
    E.x -= player.xspeed;
    E.y -= player.yspeed;
  };
  E.render = function(){
    let x1 = parseInt(-(E.HP/E.maxHP-1)*255).toString(16);
    let x2 = parseInt(E.HP/E.maxHP*255).toString(16);
    if (x1.length == 1) x1 = "0" + x1;
    if (x2.length == 1) x2 = "0" + x2;
    let x = "#" + x1 + x2 + "00";
    if(E.animation){
      E.animationIndex += 1;
      if(E.animationIndex == 60/E.animationFPS){
        E.animationIndex = 0;
        if(E.animationX < E.widthOnPic*(E.animationFrames-1))
        E.animationX += E.widthOnPic;
        else E.animationX = 0;
      }
    }
    ctx.beginPath();
    ctx.save();
    ctx.translate(E.x,E.y);
    if(!E.inOrbit)
    ctx.rotate(Math.atan2(player.earthY-E.y,player.earthX-E.x)+Math.PI/2);
    else
    ctx.rotate(Math.atan2(player.earthY-E.y,player.earthX-E.x)-Math.PI);
    //normal enemy ship
    ctx.globalAlpha = E.appearOpacity;
    ctx.drawImage(E.sprite,0+E.animationX,E.heightOnPic+1,E.widthOnPic,E.particles[0],-E.width/2,E.height/2+E.particles[2],E.width*E.particlesWidth,E.particles[1]*E.particlesHeight);
    ctx.drawImage(E.sprite,0+E.animationX,0,E.widthOnPic,E.heightOnPic,-E.width/2,-E.height/2,E.width,E.height);
    //damaged enemy ship
    ctx.globalAlpha = E.opacity;
    ctx.drawImage(E.sprite,0+E.animationX,2*E.heightOnPic+E.particles[0]+3,E.widthOnPic,E.particles[0],-E.width/2,E.height/2+E.particles[2],E.width*E.particlesWidth,E.particles[1]*E.particlesHeight);
    ctx.drawImage(E.sprite,0+E.animationX,E.heightOnPic+E.particles[0]+2,E.widthOnPic,E.heightOnPic,-E.width/2,-E.height/2,E.width,E.height);
    ctx.restore();
    if(type == "pirateVessel"){
      ctx.save();
      ctx.globalAlpha = E.appearOpacity;
      if(!E.inOrbit){
        E.cannon1X = -(32*screenratio)*Math.cos(Math.atan2(player.earthY-E.y,player.earthX-E.x)+Math.PI)+E.x;
        E.cannon1Y = -(32*screenratio)*Math.sin(Math.atan2(player.earthY-E.y,player.earthX-E.x)+Math.PI)+E.y;
        E.cannon2X = (35*screenratio)*Math.cos(Math.atan2(player.earthY-E.y,player.earthX-E.x)+Math.PI)+E.x;
        E.cannon2Y = (35*screenratio)*Math.sin(Math.atan2(player.earthY-E.y,player.earthX-E.x)+Math.PI)+E.y;
        ctx.translate(E.cannon1X,E.cannon1Y);
        ctx.rotate(Math.atan2(player.earthY-E.cannon1Y,player.earthX-E.cannon1X)+Math.PI/2);
        ctx.drawImage(object.enemy_pirateVesselturret,0,0,24,36,-12*screenratio,-26*screenratio,24*screenratio,36*screenratio);
        ctx.restore();
        ctx.save();
        ctx.translate(E.cannon2X,E.cannon2Y);
        ctx.rotate(Math.atan2(player.earthY-E.cannon2Y,player.earthX-E.cannon2X)-Math.PI/2);
        ctx.drawImage(object.enemy_pirateVesselturret,0,0,24,36,-12*screenratio,-26*screenratio,24*screenratio,36*screenratio);
      }
      else {
        E.cannon1X = -(32*screenratio)*Math.cos(Math.atan2(player.earthY-E.y,player.earthX-E.x)-Math.PI/2)+E.x;
        E.cannon1Y = -(32*screenratio)*Math.sin(Math.atan2(player.earthY-E.y,player.earthX-E.x)-Math.PI/2)+E.y;
        E.cannon2X = (35*screenratio)*Math.cos(Math.atan2(player.earthY-E.y,player.earthX-E.x)-Math.PI/2)+E.x;
        E.cannon2Y = (35*screenratio)*Math.sin(Math.atan2(player.earthY-E.y,player.earthX-E.x)-Math.PI/2)+E.y;
        ctx.translate(E.cannon1X,E.cannon1Y);
        ctx.rotate(Math.atan2(player.earthY-E.cannon1Y,player.earthX-E.cannon1X)+Math.PI/2);
        ctx.drawImage(object.enemy_pirateVesselturret,0,0,24,36,-12*screenratio,-26*screenratio,24*screenratio,36*screenratio);
        ctx.restore();
        ctx.save();
        ctx.translate(E.cannon2X,E.cannon2Y);
        ctx.rotate(Math.atan2(player.earthY-E.cannon2Y,player.earthX-E.cannon2X)+Math.PI/2);
        ctx.drawImage(object.enemy_pirateVesselturret,0,0,24,36,-12*screenratio,-26*screenratio,24*screenratio,36*screenratio);
      }
      ctx.restore();
    }
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = "#606060";
    ctx.fillRect(E.x-15,E.y-25,30,5);
    ctx.fillStyle = x;
    ctx.fillRect(E.x-15,E.y-25,E.HP/E.maxHP*30,5);
    ctx.strokeStyle = "#000000";
    ctx.globalAlpha = 1;
    ctx.lineWidth = 1;
    ctx.strokeRect(E.x-15,E.y-25,30,5);
    ctx.stroke();
    ctx.closePath();
  };
  E.deathAnimation_render = function(){
    E.x -= player.xspeed; //So that explosions won't move with the player
    E.y -= player.yspeed;
    if(!E.killed){
      E.deathAnimation_countdown += 1;
      if(E.deathAnimation_countdown%5 == 0){
        let distance = Math.abs(player.earthX-E.x)+Math.abs(player.earthY-E.y);
        E.deathAnimation_angle = Math.random()*2*Math.PI;
        E.deathAnimation_index += 1;
        if(E.deathAnimation_index==1&&type == "pirateMinedropper"&&distance>=40)
        enemyList.push(enemyCharacter({x:E.x,y:E.y},"pirateMine"));
      }
      ctx.beginPath();
      ctx.save();
      ctx.translate(E.x,E.y);
      ctx.rotate(E.deathAnimation_angle);
      ctx.drawImage(object.projectile_explosion,0,150*E.deathAnimation_index,150,150,-(E.width+20)/2,-(E.width+20)/2,E.width+20,E.width+20);
      ctx.restore();
      ctx.stroke();
      ctx.closePath();
      if(E.deathAnimation_index==11)
      E.killed = true;
    }
  }
  //Cooldowns
  E.attackCD = false;
  E.piercingCD = false;
  E.opacity = 0;
  E.attackCDstart = async function() {
    E.attackCD = true;
    await sleep(E.attackCDvalue);
    E.attackCD = false;
  };
  E.hitCDstart = async function() {
    E.opacity = 0.51;
    for(let i=50;i>=0;i--){
      if(E.opacity!=(i+1)/100){
        break;
      }
      else {
        E.opacity = i/100;
        await sleep(10);
      }
    }
  };
  E.piercingDamageCDstart = async function(){
    E.piercingCD = true;
    await sleep(activeShip.weapon.hitCD);
    E.piercingCD = false;
  }
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
  return a.hitBoxX< b.hitBoxX + b.hitBoxWidth &&
  a.hitBoxX + a.hitBoxWidth > b.hitBoxX &&
  a.hitBoxY < b.hitBoxY + b.hitBoxHeight &&
  a.hitBoxY + a.hitBoxHeight > b.hitBoxY;
}

//spawner of enemies
async function spawn(level_layout){
  UI.levelDisplay.text = activeShip.section + "-" + activeShip.level;
  for(let i=1;i<=400;i++){
    if(i<=100){
      UI.levelDisplay.opacity = i/100;
    }
    else if (i>300&&i<=370){
      UI.levelDisplay.opacity = (370-i)/70;
    }
    await sleep(10);
  }
  UI.levelDisplayCheck = false;
  for(var i=0;i<level_layout.length;i++){
    let det_x = Math.floor(Math.random()*4);
    let det_y;
    if(UI.inMenu)break;
    else if(det_x == 0){det_x = player.earthX-player.spaceSize/2;det_y = player.earthY+(Math.random() < 0.5 ? -1 : 1)*Math.random()*player.spaceSize/2;}
    else if(det_x == 1){det_x = player.earthX+(Math.random() < 0.5 ? -1 : 1)*Math.random()*player.spaceSize/2;det_y = player.earthY-player.spaceSize/2;}
    else if(det_x == 2){det_x = player.earthX+player.spaceSize/2;det_y = player.earthY+(Math.random() < 0.5 ? -1 : 1)*Math.random()*player.spaceSize/2;}
    else {det_x = player.earthX+(Math.random() < 0.5 ? -1 : 1)*Math.random()*player.spaceSize/2;det_y = player.earthY+player.spaceSize/2;}
    enemyList.push(enemyCharacter({x:det_x,y:det_y},level_layout[i]));
    await sleep(levels_handler.level[level_layout[i]][1]);
  }
}

var levels_handler = {
  level : {},
  levelCreator : function(){
    this.level = levelLayout({});
    let enemyArray = [];
    for(index in this.level){
      for(var i=0;i<this.level[index][0];i++){
        enemyArray.push("" + index);
      }
    }
    this.level.total = enemyArray.length;
    return enemyArray.sort(function(){return 0.5 - Math.random()});
  }
};

function levelLayout(L){
  if(activeShip.section>0){
      L.pirateRaider = [6+activeShip.level,500];
      L.pirateTiger = [6+activeShip.level,1000];
    if(activeShip.level>2){
      L.pirateMinedropper = [3+activeShip.level,1000];
    }
    if(activeShip.level>5){
      L.pirateVessel = [1+(activeShip.level-1)*2,5000];
    }
  }
  return L;
}
