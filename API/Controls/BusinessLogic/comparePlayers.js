playerHero = require('../../Models/PlayerHero')

//Function used to compare two pro-players
//It will do the math in order to obtain a final score
exports.comparePlayers = async function(player_1, player_2){

    //Potitions 0 and 2 are for hero_1; positions 1 and 3 are for hero_2
    let points = [0, 0, 0, 0];

    points[0] += calcWinRate(player_1);
    points[0] += calcNumberGames(player_1);
    points[0] += calcUsedHero(player_1);
    points[0] += calcAgainstHero(player_1);

    points[1] += calcWinRate(player_2);
    points[1] += calcNumberGames(player_2);
    points[1] += calcUsedHero(player_2);
    points[1] += calcAgainstHero(player_2);

    points[2] = calcPercentage(parseFloat(points[0]), parseFloat(points[1]))
    points[3] = calcPercentage(parseFloat(points[1]), parseFloat(points[0]))

    points[0] = points[0].toFixed(2);
    points[1] = points[1].toFixed(2);

    return points;

}

// ==== Many auxiliary functions ====

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

function calcPercentage(a, b){
  if(a <= 0)
    return 0.01;

  if(b <= 0)
    return 99.99

  return ((a*100)/(a+b)).toFixed(2);
}
