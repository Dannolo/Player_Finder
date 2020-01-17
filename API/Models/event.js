const validateName = require("./Resource/validateName").validateName
const validateComma = require("./Resource/validateName").validateComma
const normalize_game = require("./Resource/normalize_game").normalize_game
var stringSimilarity = require('string-similarity')
var example = require("../Models/listTournamentEXAMPLE").listanomi


// constructor function for the Event class
function Event(tournament) {
    this.name = validateComma(tournament.tournamentname)
    this.slug = validateName(tournament.tournamentname).toLowerCase()
    this.slugAdjusted = checkName(validateName(tournament.tournamentname).toLowerCase(), example)
    this.date = tournament.date
    this.characters = tournament.characters
    this.place = tournament.place

    if(tournament.game != null){
        this.game = normalize_game(tournament.game)
    }
    else
    {
        this.game = []
    }
    this.matches = []
}

function checkName(name, list){
    let similarity = 0
    let slug = name
    for (let index = 0; index < 3000; index++){
        var similarity2 = stringSimilarity.compareTwoStrings(name, list[index])
        if(similarity < similarity2){
            similarity = similarity2
            slug = list[index]
        }
    }
    if(similarity > 0.8){
        return slug
    }
    else{
        return name
    }
}

// now we export the class so other modules can create Event objects
module.exports = {
    Event: Event
}
