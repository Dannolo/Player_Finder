hero = require('../../Models/Hero')

getRequestTo = require('./getRequestTo');


exports.initializeHeroes = async function(){
  let data = await getRequestTo.getRequestTo('http://api.opendota.com/api/heroes');
  let parsed_data = JSON.parse(data);

  let allHeroes = new Array();

  for (var i = 0; i < parsed_data.length; i++) {
    allHeroes.push(new hero(parsed_data[i].id, parsed_data[i].localized_name));
  }

  return allHeroes;
}
