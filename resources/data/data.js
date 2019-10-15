var levels_handler = {
  level : {},
  levelCreator : function(){
    this.level = this.levelPlanner({});
    let enemyArray = [];
    for(index in this.level){
      for(var i=0;i<this.level[index][0];i++){
        if(index != "total"){
          enemyArray.push("" + index);
        }
        else {
          continue;
        }
      }
    }
    this.level.total = enemyArray.length;
    return enemyArray.sort(function(a, b){return 0.5 - Math.random()});
  },
  levelPlanner : function(L){
    if(parseInt(localStorage.level)<5){
      L.buzz = [10+parseInt(localStorage.level),Math.round((Math.random()*5000))];
    }
    if(parseInt(localStorage.level)>= 3){
      L.tooth = [10+parseInt(localStorage.level),Math.round((Math.random()*5000))];
    }
    if(parseInt(localStorage.level)>= 5){
      L.sharkfin = [3+parseInt(localStorage.level),Math.round((Math.random()*5000))];
    }
    if (parseInt(localStorage.level)>= 7){
      L.goblin = [3+parseInt(localStorage.level),Math.round((Math.random()*5000))];
    }
    L.void_chaser = [3+parseInt(localStorage.level),Math.round((Math.random()*5000))];
    L.void_chakram = [1,30];
    return L;
  }
};
