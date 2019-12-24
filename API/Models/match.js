// constructor function for the Tournament class
function Match(match) {
    this.displayScore = match.displayScore
    this.fullRoundText = match.fullRoundText
    this.startedAt = match.startedAt
    this.completedAt = match.completedAt
    this.player1 = match.player1.tag
    this.player2 = match.player2.tag
    this.score1 = match.score1
    this.score2 = match.score2
}

// now we export the class so other modules can create Tournament objects
module.exports = {
    Match: Match
}
