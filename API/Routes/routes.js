//ONLY FOR DEBUG RIGHT NOW

module.exports = function (app) {

    const axios = require('axios').default
    const getPlayer = require("../Controls/Middleware/GetPlayer")


    app.route('/player/:name')
        .get(async function (req, res) {
            let player = await getPlayer.getPlayerSRK(req.params.name)
            res.json(player)
        })

//ONLY FOR TESTING
    app.route('/players/:name')
        .get(async function (req,res){
            let matches = await getPlayer.getPlayerMatchesSMASH('PUT TOURNEY NAME HERE', 'dragon-ball-fighterz', 'PUT PLAYER NAME HERE')
            if (matches != null) {
            player.results[index].matches.push(matches)
        }
        })
    }
