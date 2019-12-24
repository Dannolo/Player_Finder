// package needed

const creatingList = require("./Resource/creatingList").creatingList

// constructor function for the Player class
function Player(player) {
    this.name = player.name
    this.country = player.country
    this.realname = player.realname
    this.smashId = player.smashId
    this.team = player.teams[0]
    this.events = creatingList(player.results)

    getName = () => {return this.name} 
}


// now we export the class so other modules can create Player objects
module.exports = {
    Player: Player
}