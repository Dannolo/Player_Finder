// package needed

const Node = require("./node").Node
const validateSlug = require("./Resource/validateName").validateSlug


function getEventsNames(events) {
    let names = []
    for (let node of events) {
        node.slug = validateSlug(node.slug)
        names.push(node.slug)
    }
    return names
}

function getEvents(tournamentsList){
    let events = []
    for (const tournament of tournamentsList.tournaments.nodes) {
        let node = new Node(tournament)
        events.push(node)
    }
    return events
}

// constructor function for the List class
function TournamentsList(tournamentsList) {
    this.events = getEvents(tournamentsList)
    this.names = getEventsNames(this.events)
}


// now we export the class so other modules can create TournamentsList objects
module.exports = {
    TournamentsList: TournamentsList
}