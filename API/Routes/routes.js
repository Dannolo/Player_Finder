//ONLY FOR DEBUG RIGHT NOW

module.exports = function (app) {

    const axios = require('axios').default
//mfopwmfpe
    const moment = require('moment')
    const getPlayer = require("../Controls/Middleware/GetPlayer")
    const getTournamentsList = require("../Controls/Middleware/getTournamentList").getTournamentsList
    const smashgg = require("../../node_modules/smashgg.js")
    const Tournament = smashgg.Tournament

    app.route('/player/')
        .get(async function (req, res) {
            // let list = []
            // list = await getTournamentsList()
        
            try {
                let player = await getPlayer.getPlayerSRK(req.query.name)
                res.json(player)
            } catch (error) {
                res.json(error)
            }

        })

    //ONLY FOR TESTING
    app.route('/event/')
        .get(async function (req, res) {
            try {
                player.events[index].matches = await getPlayer.getPlayerMatchesSMASHbySmashTag(player.events[index].slug, player.events[index].game, req.params.name)
            } catch (error) {
                return error
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
