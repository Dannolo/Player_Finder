const hero = require('../../Models/Hero')

const getRequestTo = require('./getRequestTo');


exports.initializeHeroes = async function(){
  let data = await getRequestTo.getRequestTo('http://api.opendota.com/api/heroes');
  let parsed_data = JSON.parse(data);

  let allHeroes = new Array();

  for (var i = 0; i < parsed_data.length; i++) {
    allHeroes.push(new hero(parsed_data[i].id, parsed_data[i].localized_name));
  }

  data = await getRequestTo.getRequestTo('http://api.opendota.com/api/herostats');
  parsed_data = JSON.parse(data);

  // roles, pro_ban, pro_win, pro_pick, top_pick, top_win
  for (var i = 0; i < parsed_data.length; i++) {
    allHeroes[i].roles = parsed_data[i].roles;
    allHeroes[i].pro_ban = parsed_data[i].pro_ban;
    allHeroes[i].pro_win = parsed_data[i].pro_win;
    allHeroes[i].pro_pick = parsed_data[i].pro_pick;
    allHeroes[i].top_pick = parsed_data[i]["7_pick"];
    allHeroes[i].top_win = parsed_data[i]["7_win"];
    allHeroes[i].img = parsed_data[i].img;
  }

  return allHeroes;
}
