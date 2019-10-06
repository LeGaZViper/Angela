var levels_handler = {
  level : {},
  levelCreator : function(){
    this.level = this.levelPlanner({});
    let enemyArray = [];
    let totalEn = 0;
    for(index in this.level){
      totalEn += this.level[index][0];
      for(var i=0;i<this.level[index][0];i++){
        if(index != "total"){
          enemyArray.push("" + index);
        }
        else {
          continue;
        }
      }
    }
    this.level.total = totalEn;
    return enemyArray.sort(function(a, b){return 0.5 - Math.random()});
  },
  levelPlanner : function(L){
    L.buzz = [2,30];
    if(parseInt(localStorage.level)>= 3){
      L.tooth = [2,30];
    }
    if(parseInt(localStorage.level)>= 5){
      L.sharkfin = [2,30];
    }
    if (parseInt(localStorage.level)>= 7){
      L.goblin = [2,30];
    }
    return L;
  }
};
