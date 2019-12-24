const validateName = require("./Resource/validateName").validateName
const normalize_game = require("./Resource/normalize_game").normalize_game

// constructor function for the Tournament class
function Tournament(tournament) {
    this.name = validateName(tournament.tournamentname)
    this.slug = validateName(tournament.tournamentname).toLowerCase()
    this.date = tournament.date
    this.characters = tournament.characters
    this.place = tournament.place
    this.game = normalize_game(tournament.game)
    this.matches = []
}

// now we export the class so other modules can create Tournament objects
module.exports = {
    Tournament: Tournament
}
