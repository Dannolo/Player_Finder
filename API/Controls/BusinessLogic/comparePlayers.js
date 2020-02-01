playerHero = require('../../Models/PlayerHero')

exports.comparePlayers = async function(player_1, player_2){

    let points = [0, 0];

    points[0] += calcWinRate(player_1);
    points[0] += calcNumberGames(player_1);
    points[0] += calcUsedHero(player_1);
    points[0] += calcAgainstHero(player_1);

    points[1] += calcWinRate(player_2);
    points[1] += calcNumberGames(player_2);
    points[1] += calcUsedHero(player_2);
    points[1] += calcAgainstHero(player_2);

    console.log(points);
    return points;

}

function calcWinRate(player){
  return (player.winrate - 0.50)*100;
}

function calcNumberGames(player){
  return (player.numberOfGames)/100;
}

function calcUsedHero(player){

  if(player.usedHero.games === 0)
    return 0

  return (((player.usedHero.win/player.usedHero.games)-0.50)*100)+(player.usedHero.games / 100);
}

function calcAgainstHero(player){

  if(player.againstHero.against_games === 0)
    return 0

  return (((player.againstHero.against_win/player.againstHero.against_games)-0.50)*100)+(player.againstHero.against_games / 100);
}
