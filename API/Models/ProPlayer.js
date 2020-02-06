//Pro-player model
module.exports = function(id, name){
  this.id = id;
  this.name = name;
  this.winrate = 0;
  this.numberOfGames = 0;
  this.usedHero = null;
  this.againstHero = null;
}
