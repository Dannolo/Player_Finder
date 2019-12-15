// constructor function for the Player class
function Player(player) {
    this.name = player.name
    this.country = player.country
    this.realname = player.realname
    this.smashId = player.smashId
    this.team = player.teams[0]
    this.results = player.results
}

// constructor function for reordering cronologically tournaments
function reordering(list) {
    this.name = player.name
    this.country = player.country
    this.realname = player.realname
    this.smashId = player.smashId
    this.team = player.teams[0]
    this.results = player.results
}

 
// now we export the class so other modules can create Player objects
module.exports = {
    Player: Player
}