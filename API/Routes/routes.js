//ONLY FOR DEBUG RIGHT NOW

module.exports = function (app) {

    const axios = require('axios').default
    const getPlayer = require("../Controls/Middleware/GetPlayer")


    app.route('/player/:name')
        .get(async function (req, res) {
            let player = await getPlayer.getPlayerSRK(req.params.name)
            player.matches = await getPlayer.getPlayerMatchesSMASHbySmashTag('the-colosseum-spring-2018', 'dragon ball fighterz', req.params.name)
            res.json(player)
        })

//ONLY FOR TESTING
    app.route('/playersi/:name')
        .get(async function (req,res){
            let matches = await getPlayer.getPlayerMatchesSMASHbyDisplayName('the-colosseum-spring-2018', 'dgb-dragon-ball-fighterz', req.params.name)
            res.json(matches)
        })


//ONLY FOR TESTING
    app.route('/players/:name')
        .get(async function (req,res){
            let matches = await getPlayer.getPlayerMatchesSMASHbySmashTag('the-colosseum-spring-2018','dragon ball fighterz', req.params.name)
            res.json(matches)
        }
        )
    }
