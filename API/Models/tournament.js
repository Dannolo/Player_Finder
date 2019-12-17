const validateName = require("./Resource/validateName").validateName

// constructor function for the Tournament class
function Tournament(tournament) {
    // this.name = validateName(tournament.tournamentname)
    this.name = validateName(tournament.tournamentname)
    this.date = tournament.date
    this.characters = tournament.characters
    this.place = tournament.place
    this.game = tournament.game
    this.matches = []
}

// now we export the class so other modules can create Tournament objects
module.exports = {
    Tournament: Tournament
}
