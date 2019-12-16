// package needed

const { orderBy } = require('natural-orderby')
const models = require("./tournament")
const Tournament = models.Tournament

// constructor function for creatingList cronologically tournaments
function creatingList(list) {
    let tournaments = []
    list.forEach(element => {
        let tourney = new Tournament(element)
        tournaments.push(tourney)
    })
    orderBy(tournaments,[v => v.date],['desc'])
    console.log(tournaments)
    return tournaments
}

// constructor function for the Player class
function Player(player) {
    this.name = player.name
    this.country = player.country
    this.realname = player.realname
    this.smashId = player.smashId
    this.team = player.teams[0]
    this.results = creatingList(player.results)
}

 
// now we export the class so other modules can create Player objects
module.exports = {
    Player: Player
}