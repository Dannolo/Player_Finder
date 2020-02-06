const proPlayer = require('../../Models/ProPlayer')

const getRequestTo = require('./getRequestTo');

//Function used to initialize all the pro-players! Usefull if used when the web page is loading
// REMEMBER: this function does not fill up all the fileds!
exports.initializeProPlayers = async function(){
  let data = await getRequestTo.getRequestTo('http://api.opendota.com/api/proPlayers');
  let parsed_data = JSON.parse(data);

  let proPlayers = new Array();

  for (var i = 0; i < parsed_data.length; i++) {
    proPlayers.push(new proPlayer(parsed_data[i].account_id, parsed_data[i].name));
  }

  return proPlayers;
}
