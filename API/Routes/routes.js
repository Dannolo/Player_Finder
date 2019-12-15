//ONLY FOR DEBUG RIGHT NOW

module.exports = function(app) {

    const axios = require('axios').default
    const getPlayer = require("../Controls/Middleware/GetPlayer")
    



    

    app.route('/player')
       .get(async function(req, res){
        var player = await getPlayer.getPlayerSRK(req.body.name)
        res.json(player)
        });

  app.route('/players')
      .get(async function(req, res){
        var player = await getPlayer.getPlayerMatchesSMASH('combo-breaker-2018', 'dragon-ball-fighterz')
        res.json(player)
        })
    }
  