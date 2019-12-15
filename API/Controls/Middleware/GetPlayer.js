//All methods necessaries to take players Informations

const axios = require('axios').default
const models = require('../../Models/player')
const model = models.Player
//const reorderTournaments = models.reordering
const smashgg = require('smashgg.js');
const {Event} = smashgg;

//AuthS Key
smashgg.initialize('371d53adec5bb1afdc3537835d792c19');

////////////////////////////////////

// FIGHTING GAME PART //

///////////////////////////////////


//Getting data player from Shoryuken.com
exports.getPlayerSRK = async function(name) { 
  try {
    var url = 'http://rank.shoryuken.com/api/player/name/'+name
    var response = await axios.get(url)
    var player = new model(response.data)
    //reorderTournaments(player.results)
    return player      
  } catch (error) {
    console.error(error);
  }
}

//Getting tournament datas from Smash.gg
exports.getPlayerMatchesSMASH = async function(tournament, event){
  let tournamentSlug = tournament;
  let eventSlug = event;
  let tourney = await Event.get(tournamentSlug, eventSlug);
  let sets = []
  let phases = await tourney.getPhases()

  for (const phase of phases) {
    //Need to be revised
    if(phase.numSeeds <= 48){
    const set = await phase.getSets()
    sets.push(set)
    }
  }
  console.log(sets);
  return sets
}
  