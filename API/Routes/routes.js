//ONLY FOR DEBUG RIGHT NOW

module.exports = function (app) {

    const axios = require('axios').default
    const getPlayer = require("../Controls/Middleware/GetPlayer")
    const getTournamentsList = require("../Controls/Middleware/getTournamentList").getTournamentsList
    const smashgg = require("../../node_modules/smashgg.js")
    const Tournament = smashgg.Tournament



    app.route('/player/:name')
        .get(async function (req, res) {
            let player = await getPlayer.getPlayerSRK(req.params.name)
            for (let index = 0; index < 10; index++) {
                player.events[index].matches = await getPlayer.getPlayerMatchesSMASHbySmashTag(player.events[index].slug, player.events[index].game, req.params.name)
            }
            res.json(player)
        })

    //ONLY FOR TESTING
    app.route('/playersi/:name')
        .get(async function (req, res) {
            let list = []
            list = await getTournamentsList()
            res.json(list[0].names)
        })


    //ONLY FOR TESTING
    app.route('/players/:name')
        .get(async function (req, res) {
            let matches = await getPlayer.getPlayerMatchesSMASHbySmashTag('the-colosseum-spring-2018', 'dragon ball fighterz', req.params.name)
            res.json(matches)
        }
        )
}
