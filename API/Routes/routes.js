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

    //Lista dei pro player
    app.route('/proPlayers')
      .get(async function(req, res){
        try {

          proPlayers = await initializeProPlayers.initializeProPlayers();
          res.json(proPlayers);

        } catch (error) {
          console.log('\nError in retrieving informations about proplayers')
        }
      });

    //Lista degli eroi
    app.route('/heroes')
      .get(async function(req, res){
        try{

          allHeroes = await initializeHeroes.initializeHeroes();
          res.json(allHeroes);

        } catch (error) {
          console.log('\nError in retrieving informations about heroes')
        }
      });

    //Ottenimento varie info player: winrate, ...
    app.route('/foreseeMatch')
      .get(async function(req, res){
        try{

          //Ottieni giocatori pro se non ci sono ancora
          if(proPlayers.length === 0){
            proPlayers = await initializeProPlayers.initializeProPlayers();
          }

          //Ottieni gli eroi se non ci sono ancora
          if(allHeroes.length === 0){
            allHeroes = await initializeHeroes.initializeHeroes();
          }

          //Variabili di supporto
          var player_1 = proPlayers.find(o => o.name === req.query.player_1);
          var actualHero_1 = allHeroes.find(o => o.name === req.query.hero_1);
          var player_2 = proPlayers.find(o => o.name === req.query.player_2);
          var actualHero_2 = allHeroes.find(o => o.name === req.query.hero_2);

          //Raccolta dati player_1
          player_1 = await getCompleteInfo.getCompleteInfo(player_1, actualHero_1, actualHero_2);

          //Raccolta dati player_2
          player_2 = await getCompleteInfo.getCompleteInfo(player_2, actualHero_2, actualHero_1);

          let playersPoints = await comparePlayers.comparePlayers(player_1, player_2);
          let heroesPoints = await compareHeroes.compareHeroes(actualHero_1, actualHero_2);

          res.json({
                    "player_1" : player_1,
                    "player_2" : player_2,
                    "player_1_points" : playersPoints[0],
                    "player_2_points" : playersPoints[1],
                    "player_1_percentage" : playersPoints[2],
                    "player_2_percentage" : playersPoints[3],
                    "hero_1" : actualHero_1,
                    "hero_2" : actualHero_2,
                    "hero_1_points" : heroesPoints[0],
                    "hero_2_points" : heroesPoints[1]
                  });

        } catch (error) {
          console.log('\n' + error)
        }
      });
}
