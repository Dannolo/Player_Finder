hero = require('../../Models/Hero')

exports.compareHeroes = async function(hero_1, hero_2){

  let points = [0, 0, 0, 0];

  for (var i = 0; i < hero_1.roles.length; i++) {
    points[0] += 50;
  }

  points[0] += hero_1.pro_ban;
  points[0] += hero_1.pro_win;
  points[0] += hero_1.pro_pick;
  points[0] += hero_1.top_pick/10;
  points[0] += hero_1.top_win/10;

  for (var i = 0; i < hero_2.roles.length; i++) {
    points[1] += 10;
  }

  points[1] += hero_2.pro_ban;
  points[1] += hero_2.pro_win;
  points[1] += hero_2.pro_pick;
  points[1] += hero_2.top_pick/10;
  points[1] += hero_2.top_win/10;

  points[2] = calcPercentage(points[0], points[1])
  points[3] = calcPercentage(points[1], points[0])

  points[0] = points[0].toFixed(2);
  points[1] = points[1].toFixed(2);

  return points;

}

function calcPercentage(a, b){
  if(a <= 0)
    return 0.01;

  if(b <= 0)
    return 99.99

  return ((a*100)/(a+b)).toFixed(2);
}
