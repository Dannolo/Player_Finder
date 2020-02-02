const proPlayer = require('../../Models/ProPlayer')

const getRequestTo = require('./getRequestTo');


exports.initializeProPlayers = async function(){
  let data = await getRequestTo.getRequestTo('http://api.opendota.com/api/proPlayers');
  let parsed_data = JSON.parse(data);

  let proPlayers = new Array();

  for (var i = 0; i < parsed_data.length; i++) {
    proPlayers.push(new proPlayer(parsed_data[i].account_id, parsed_data[i].name));
  }

  return proPlayers;
}
