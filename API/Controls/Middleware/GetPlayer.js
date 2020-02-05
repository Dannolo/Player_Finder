//All methods necessaries to take players Informations

const axios = require('axios').default
const Player = require('../../Models/player').Player
const Match = require('../../Models/match').Match
const smashgg = require('smashgg.js')
const { Event } = smashgg;
const Tournament = smashgg.Tournament
const { MongoClient } = require('mongodb')
let insertDocuments = require("../../DB/insertDocument").insertDocuments

const smashKEY = process.env.SMASH_KEY

//AuthS Key
smashgg.initialize(smashKEY);

////////////////////////////////////

// Auxiliary functions //

///////////////////////////////////

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

// DB CALL FOR CACHING //

///////////////////////////////////

const usernameDB = process.env.DB_USER
const passwordDB = process.env.DB_PASS

async function addSets(name, slug, game, set) {
  const uri = "mongodb://"+ usernameDB +":" + passwordDB + "@playerfinder-shard-00-00-umz1y.mongodb.net:27017,playerfinder-shard-00-01-umz1y.mongodb.net:27017,playerfinder-shard-00-02-umz1y.mongodb.net:27017/test?ssl=true&replicaSet=PlayerFinder-shard-0&authSource=admin&retryWrites=true&w=majority";

  MongoClient.connect(uri, function (err, client) {
      console.log("Connected successfully to server")

      insertDocuments(name, slug, game, set)
  })
}

////////////////////////////////////

// FIGHTING GAME PART //

///////////////////////////////////


//Getting data player from Shoryuken.com
exports.getPlayerSRK = async function (name) {
  try {
    var url = 'http://rank.shoryuken.com/api/player/name/' + name
    var response = await axios.get(url)
    var player = new Player(response.data)
    return player
  } catch (error) {
    return res.json({
      "success": false,
      "message": "No player with this name has been found, please be sure to have typed it right.",
      "error": "400",
      "data": { }
  })
  }
}

//Getting tournament datas from Smash.gg
exports.getPlayerMatchesSMASHbySmashTag = async function (tournament, slug, genre, name) {
  try {
  let playerSets = []
  let eventSets = []
  let tourney
  let attends
  let attend

  try {
    tourney = await Tournament.get(slug)
  } catch (error) {
    return res.json({
      "success": false,
      "message": "No tournament with this name has been found, please be sure to have typed it right.",
      "error": "400",
      "data": {}
    })
  }
  
  let events = await tourney.getEvents()
  
  try {
    attends = await tourney.searchAttendees(name)
    attend = attends[0]
  } catch (error) {
    return res.json({
      "success": false,
      "message": "No player with this name in this event has been found, please be sure to have typed it right.",
      "error": "400",
      "data": {}
    })
  }
  
  let id = attend.getId()
  
  for (const event of events) {
    if(event.videogamename.toLowerCase() == genre){
      let phases = await event.getPhases()
      for (const phase of phases) {
        
        //Cycling on Phases(Pools, TOP48 ecc..)
        if (phase.numSeeds <= 64) {
          const sets = await phase.getSets()

          //Cycling on Sets(Every match done in that phase) and taking only where player is
          for (const set of sets) {
            eventSets.push(set)
            let displayscore = set.displayScore
            let players = []
              players[0] = set.player1.attendeeIds[0]
              players[1] = set.player2.attendeeIds[0]
                          
            for (const player of players) {
              if (player == id) {
                let match = new Match(set)
                playerSets.push(match)
            }

            }
          }
        }
      }
    }
  }

  await addSets(tournament, slug, genre, eventSets)

  return playerSets
  } catch (error) {
    return res.json({
      "success": false,
      "message": "Something went wrong",
      "error": "400",
      "data": {}
    })
  }

  
}

//Getting tournament datas from Smash.gg
exports.getPlayerMatchesSMASHbyDisplayName = async function (tournament, event, name) {
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
          if(displayscore != "DQ"){
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
    }
    return playerSets

  } catch (error) {
    return null
  }
}