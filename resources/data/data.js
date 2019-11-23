function levelLayout(L){
  // if(parseInt(localStorage.level)<5){
  //   L.buzz = [10+parseInt(localStorage.level),Math.round((Math.random()*5000))];
  // }
  // if(parseInt(localStorage.level)>= 3){
  //   L.tooth = [10+parseInt(localStorage.level),Math.round((Math.random()*5000))];
  // }
  // if(parseInt(localStorage.level)>= 5){
  //   L.sharkfin = [3+parseInt(localStorage.level),Math.round((Math.random()*5000))];
  // }
  // if (parseInt(localStorage.level)>= 7){
  //   L.goblin = [3+parseInt(localStorage.level),Math.round((Math.random()*5000))];
  // }
  // L.void_chaser = [3+parseInt(localStorage.level),Math.round((Math.random()*5000))];
  //L.SG_40 = [5,30];
  //L.pirate_vessel = [2,30];
  //L.void_chaser = [5,30];
  if(activeShip.section>0){
      L.pirate_raider = [6+activeShip.level,500];
    if(activeShip.level>2){
      L.pirate_minedropper = [3+activeShip.level,1000];
    }
    if(activeShip.level>0){
      L.pirate_vessel = [1+(activeShip.level-1)*2,5000];
    }
  }
  // L.void_drone = [10,30];
  // L.void_spherefighter = [5,30];
  return L;
}
