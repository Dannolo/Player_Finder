//All methods necessaries to take players Informations

const TournamentsList = require('../../Models/tournamentsList').TournamentsList
const Tournament = require('smashgg.js').Tournament

////////////////////////////////////

// FIGHTING GAME PART //

///////////////////////////////////


//Getting all tournaments for the game we are interested aka TEKKEN, Street Fighter V and Dragonball FighterZ
exports.getTournamentsList = async function () {
  try {
    
    let list = []
    let tourney = new Tournament()
    let lists = [await tourney.getTourneyByGame(287), await tourney.getTourneyByGame(17), await tourney.getTourneyByGame(7)]
    let dragonballTourneys = new TournamentsList(lists[0])
    let tekkenTourneys = new TournamentsList(lists[1])
    let sfvTourneys =  new TournamentsList(lists[2])
    list.push(dragonballTourneys, tekkenTourneys, sfvTourneys)
    return list
  } catch (error) {
    console.error(error);
  }
}

////////////////////////////////////

// WE WILL BE IMPLEMENTED MAYBE IN THE FUTURE, RIGHT NOW IMPOSSIBLE //

///////////////////////////////////

