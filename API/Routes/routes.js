module.exports = function (app) {

    //Modules

    const getPlayer = require("../Controls/Middleware/GetPlayer")
    var getYoutube = require('../Controls/Middleware/GetYoutube').MatchSelector
    let findDocument = require("../DB/findDocument").findDocuments

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


    //Find player's informations and events where he applied
    // string name: name of the player

    app.route('/playerFinder/player')
        .get(async function (req, res) {
            try {
                let player = await getPlayer.getPlayerSRK(req.query.name)
                res.json({
                    "success": true,
                    "message": "Player found.",
                    "data": { player }
                })
            } catch (error) {
                res.json({
                    "success": false,
                    "message": "No player with this name has been found, please be sure to have typed it right.",
                    "error": "404",
                    "data": {}
                })
            }

        })
    // Find matches for a specified event of that game for a player
    // We use Slug, game and name as query parameters
    // string Slug: string needed to fetch a call to Smash.gg site
    // string game: specifies which game for the tournament to choose
    // string name: name of the player

    app.route('/playerFinder/event')
        .get(async function (req, res) {
            try {
                let playerSets = await findDocument(req.query.tournament, req.query.game)
                let matches = []
                if (playerSets == null) {
                     matches = await getPlayer.getPlayerMatchesSMASHbySmashTag(req.query.tournament,req.query.slug, req.query.game, req.query.name.toLowerCase())
                }
                else {
                    for (let set of playerSets.sets) {
                        let displayscore = set.displayScore
                        let players = []
                        if (displayscore != "DQ") {
                            players = divide(displayscore)
                            players[0] = validateName(players[0]).toLowerCase()
                            players[1] = validateName(players[1]).toLowerCase()

                            for (let player of players) {
                                if (player == req.query.name.toLowerCase()) {
                                    matches.push(set)
                                }
                            }
                        }
                    }
                }
                    res.json({
                        "success": true,
                        "message": "Matches for that event found.",
                        "data": { matches }
                    })
                 
            }   catch (error) {
                    res.json({
                        "success": false,
                        "message": "No matches for that event found.",
                        "error": "404",
                        "data": {}
                    })
                }
            })

    // Find youtube match for a specified match of that game for a player, otherwise it will return an error or a null value
    // We use tourney, game, phase and displayscore as query parameters
    // string tourney: name of the tourney
    // string game: specifies which game for the tournament to choose
    // string phase: which phase the match we are searching for
    // string displayScore: the score of the match

    app.route('/playerFinder/match')
        .get(async function (req, res) {
            try {
                let id = await getYoutube(req.query.tourney, req.query.game, req.query.phase, req.query.displayScore)
                console.log(id)
                if (id === null) {
                    res.json('No matching video for the match, sorry.')
                }
                else {
                    res.json({
                        "success": true,
                        "message": "Video for that match found.",
                        "data": {
                            "link": "https://www.youtube.com/watch?v=" + id
                        }
                    })
                }
            } catch (error) {
                res.json({
                    "success": false,
                    "message": "No video for that match found.",
                    "error": "404",
                    "data": {
                        "link": null
                    }
                })
            }
        })

}
