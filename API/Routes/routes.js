//ONLY FOR DEBUG RIGHT NOW

module.exports = function (app) {

    const axios = require('axios').default

    const moment = require('moment')
    const getPlayer = require("../Controls/Middleware/GetPlayer")
    const getTournamentsList = require("../Controls/Middleware/getTournamentList").getTournamentsList
    const smashgg = require("../../node_modules/smashgg.js")
    const Tournament = smashgg.Tournament

    const proPlayer = require('../Models/ProPlayer')
    const playerHero = require('../Models/PlayerHero')
    const hero = require('../Models/Hero')

    const initializeProPlayers = require('../Controls/Middleware/initializeProPlayers');
    const initializeHeroes = require('../Controls/Middleware/initializeHeroes');
    const getCompleteInfo = require('../Controls/Middleware/getCompleteInfo');
    const comparePlayers = require('../Controls/BusinessLogic/comparePlayers');
    const compareHeroes = require('../Controls/BusinessLogic/compareHeroes');

    let proPlayers = new Array();
    let allHeroes = new Array();
    let data = null;
    let parsed_data = null;

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

    //Resource for the "Foresee the Match" API
    //Retrieve specific informations about all the pro-players of the game (Dota2)
    app.route('/proPlayers')
      .get(async function(req, res){
        try {

          proPlayers = await initializeProPlayers.initializeProPlayers();
          res.json({"success" : true,
                    "message" : "Pro-players found.",
                    "data" : proPlayers});

        } catch (error) {
            res.json({"success" : false,
                      "message" : "Pro-players not found",
                      "error" : 404,
                      "data" : {}})
        }
      });

    //Resource for the "Foresee the Match" API
    //Retrieve specific informations about all the heroes of the game (Dota2)
    app.route('/heroes')
      .get(async function(req, res){
        try{

          allHeroes = await initializeHeroes.initializeHeroes();
          res.json({"success" : true,
                    "messagge" : "Heroes found.",
                    "data" : allHeroes});

        } catch (error) {
            res.json({"success" : false,
                      "messagge" : "Heroes not found.",
                      "error" : 404,
                      "data" : allHeroes})
        }
      });

    //Resource for the "Foresee the Match" API
    //Compare two pro-players considering the hero that both of them are using and the hero they have as opponent
    //We use player_1, player_2, hero_1 and hero_2 as query parameters
    //player_1 and player_2: name (in-game) of the player
    //hero_1 and hero_2: name of the hero
    app.route('/foreseeMatch')
      .get(async function(req, res){
        try{

          //Stop if trying to compare a player with him/herslef
          if(req.query.player_1 === req.query.player_2){

            res.json({"success" : false,
                      "message" : "Bad Request: it is not allowed to compare a player with him/herself",
                      "error" : 400,
                      "data" : {}})

          } else {

            //if players are not initialized yet, initialize them
            if(proPlayers.length === 0){
              proPlayers = await initializeProPlayers.initializeProPlayers();
            }

            //if heroes are not initialized yet, initialize them
            if(allHeroes.length === 0){
              allHeroes = await initializeHeroes.initializeHeroes();
            }

            //auxiliary variables
            var player_1 = proPlayers.find(o => o.name === req.query.player_1);
            var actualHero_1 = allHeroes.find(o => o.name === req.query.hero_1);
            var player_2 = proPlayers.find(o => o.name === req.query.player_2);
            var actualHero_2 = allHeroes.find(o => o.name === req.query.hero_2);

            //Getting informations about player_1
            player_1 = await getCompleteInfo.getCompleteInfo(player_1, actualHero_1, actualHero_2);

            //Getting informations about player_2
            player_2 = await getCompleteInfo.getCompleteInfo(player_2, actualHero_2, actualHero_1);

            //Getting informations about the comparison
            let playersPoints = await comparePlayers.comparePlayers(player_1, player_2);
            let heroesPoints = await compareHeroes.compareHeroes(actualHero_1, actualHero_2);

            //Send back all the informations
            res.json({"success" : true,
                     "message" : "Comparison done.",
                     "data" : {
                                "player_1" : player_1,
                                "player_2" : player_2,
                                "player_1_points" : playersPoints[0],
                                "player_2_points" : playersPoints[1],
                                "player_1_percentage" : playersPoints[2],
                                "player_2_percentage" : playersPoints[3],
                                "hero_1" : actualHero_1,
                                "hero_2" : actualHero_2,
                                "hero_1_points" : heroesPoints[0],
                                "hero_2_points" : heroesPoints[1],
                                "hero_1_percentage" : heroesPoints[2],
                                "hero_2_percentage" : heroesPoints[3]
                              }
                  });
          }
        } catch (error) {
            res.json({"success" : false,
                      "message" : "Unable to compare players.",
                      "error" : 404,
                      "data" : {}});
        }

    });
}
