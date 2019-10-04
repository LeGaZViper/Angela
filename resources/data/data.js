var levels_database = {
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
    console.log(enemyArray);
    return enemyArray.sort(function(a, b){return 0.5 - Math.random()});
  },
  levelPlanner : function(L){
    L.goblin = [10,30];
    L.sharkfin = [10,30];
    L.tooth = [10,30];
    L.buzz = [10,30];
    L.total = L.goblin[0] + L.sharkfin[0] + L.tooth[0] + L.buzz[0];
    return L;
  }
};
