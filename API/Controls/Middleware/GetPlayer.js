//All methods necessaries to take players Informations

const axios = require('axios').default
const models = require('../../Models/player')
const model = models.Player
//const reorderTournaments = models.reordering
const smashgg = require('smashgg.js');
const { Event } = smashgg;

//AuthS Key
smashgg.initialize('371d53adec5bb1afdc3537835d792c19');

function validateName(name) {
  for (let index = 0; index < name.length; index++) {
    if (name[index] == "|") {
      name = name.substring(index + 1, name.length)
      return name.trim()
    }
  }
  return name
}

function divide(displayName) {
  for (let index = 0; index < displayName.length; index++) {
    let names = []
    if (displayName[index] == "-") {
      names.push(displayName.substring(0, index - 3))
      names.push(displayName.substring(index + 2, displayName.length - 2))

      return names
    }
  }
  return names
}

////////////////////////////////////

// FIGHTING GAME PART //

///////////////////////////////////


//Getting data player from Shoryuken.com
exports.getPlayerSRK = async function (name) {
  try {
    var url = 'http://rank.shoryuken.com/api/player/name/' + name
    var response = await axios.get(url)
    var player = new model(response.data)
    return player
  } catch (error) {
    console.error(error);
  }
}

//Getting tournament datas from Smash.gg
exports.getPlayerMatchesSMASH = async function (tournament, event, name) {
  try {
    let playerSets = []
    let tourney = await Event.get(tournament, event)
    let phases = await tourney.getPhases()


    for (const phase of phases) {
      //Cycling on Phases(Pools, TOP48 ecc..)
      if (phase.numSeeds <= 48) {
        const sets = await phase.getSets()

        //Cycling on Sets(Every match done in that phase) and taking only where player is
        for (const set of sets) {
          let displayscore = set.displayScore
          let players = []
          players = divide(displayscore)
          players[0] = validateName(players[0]).toLowerCase()
          players[1] = validateName(players[1]).toLowerCase()

          for (const player of players) {
            if (player == name) {
              playerSets.push(set)
            }
          }
        }
      }
    }
    console.log(playerSets)
    return playerSets

  } catch (error) {
    return null
  }
}