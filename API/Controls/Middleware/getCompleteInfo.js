playerHero = require('../../Models/PlayerHero')

getRequestTo = require('./getRequestTo')

exports.getCompleteInfo = async function(player, myHero, enemyHero){
  
  let data = await getRequestTo.getRequestTo('http://api.opendota.com/api/players/' + player.id + '/wl');
  let parsed_data = JSON.parse(data);

  player.numberOfGames = (parsed_data.win + parsed_data.lose);
  player.winrate = (parsed_data.win / player.numberOfGames).toFixed(3);

  data = await getRequestTo.getRequestTo('http://api.opendota.com/api/players/' + player.id + '/heroes')
  parsed_data = JSON.parse(data);


  for (var i = 0; i < parsed_data.length; i++) {
    if(parsed_data[i].hero_id == myHero.id)
      player.usedHero = new playerHero(parsed_data[i].hero_id, parsed_data[i].games, parsed_data[i].win, parsed_data[i].against_games, parsed_data[i].against_win);
    if(parsed_data[i].hero_id == enemyHero.id)
      player.againstHero = new playerHero(parsed_data[i].hero_id, parsed_data[i].games, parsed_data[i].win, parsed_data[i].against_games, parsed_data[i].against_win);
  }

  return player;
}
