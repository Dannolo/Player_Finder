//Hero model
module.exports = function(id, name){
  this.id = id;
  this.name = name;
  this.roles = [];
  this.pro_ban = 0;
  this.pro_win = 0;
  this.pro_pick = 0;
  this.top_pick = 0;
  this.top_win = 0;
  this.img = "";
}
