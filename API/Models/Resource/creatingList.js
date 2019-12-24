const Tournament = require("../tournament").Tournament
const { orderBy } = require('natural-orderby')

// constructor function for creatingList cronologically tournaments
function creatingList(list) {
    let tournaments = []
    list.forEach(element => {
        let tourney = new Tournament(element)
        if(tourney.game == 'dragon ball fighterz' || tourney.game == '"street fighter v arcade edition 1' || tourney.game == 'tekken 7'){
            tournaments.push(tourney)
        }
    })
    orderBy(tournaments, [v => v.date], ['desc'])
    return tournaments
}

// now we export the class so other modules can create Tournament objects
exports.creatingList = creatingList