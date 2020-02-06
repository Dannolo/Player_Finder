playerHero = require('../../Models/PlayerHero')
player = require('../../Models/ProPlayer')

getRequestTo = require('./getRequestTo')

//Function that completes the informations about the two chosen players
exports.getCompleteInfo = async function(player, myHero, enemyHero){

  //Request for wins an losses
  let data = await getRequestTo.getRequestTo('http://api.opendota.com/api/players/' + player.id + '/wl');
  let parsed_data = JSON.parse(data);

  //Calculating win rate and number of games
  player.numberOfGames = (parsed_data.win + parsed_data.lose);
  player.winrate = (parsed_data.win / player.numberOfGames).toFixed(3);

  //Request for informations about how they played all the heroes
  data = await getRequestTo.getRequestTo('http://api.opendota.com/api/players/' + player.id + '/heroes')
  parsed_data = JSON.parse(data);

  //Filling the data
  for (var i = 0; i < parsed_data.length; i++) {
    if(parsed_data[i].hero_id == myHero.id)
      player.usedHero = new playerHero(parsed_data[i].hero_id, parsed_data[i].games, parsed_data[i].win, parsed_data[i].against_games, parsed_data[i].against_win);
    if(parsed_data[i].hero_id == enemyHero.id)
      player.againstHero = new playerHero(parsed_data[i].hero_id, parsed_data[i].games, parsed_data[i].win, parsed_data[i].against_games, parsed_data[i].against_win);
  }

  return player;
}
