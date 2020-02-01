module.exports = function (app) {

    //Modules

    const axios = require('axios').default
    const getPlayer = require("../Controls/Middleware/GetPlayer")
    const getTournamentsList = require("../Controls/Middleware/getTournamentList").getTournamentsList
    const smashgg = require("../../node_modules/smashgg.js")
    var getYoutube = require('../Controls/Middleware/GetYoutube').MatchSelector
    const Tournament = smashgg.Tournament


    //Find player's informations and events where he applied
    // string name: name of the player

    app.route('/playerFinder/player')
        .get(async function (req, res) {
            // let list = []
            // list = await getTournamentsList()
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
                    "error": "400",
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
                let matches = []
                matches = await getPlayer.getPlayerMatchesSMASHbySmashTag(req.query.slug, req.query.game, req.query.name)
                res.json({
                    "success": true,
                    "message": "Matches for that event found.",
                    "error": "400",
                    "data": { matches }
                })
            } catch (error) {
                res.json({
                    "success": false,
                    "message": "No matches for that event found.",
                    "error": "400",
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
                    "error": "400",
                    "data": {
                        "link": null
                    }
                })
            }
        })


    //ONLY FOR TESTING
    app.route('/players/:name')
        .get(async function (req, res) {
            let matches = await getPlayer.getPlayerMatchesSMASHbySmashTag('the-colosseum-spring-2018', 'dragon ball fighterz', req.params.name)
            res.json(matches)
        }
        )
}
