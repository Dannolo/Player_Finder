module.exports = function (app) {

    //Modules

    const getPlayer = require("../Controls/Middleware/GetPlayer")
    var getYoutube = require('../Controls/Middleware/GetYoutube').MatchSelector
    let findDocument = require("../DB/findDocument").findDocuments


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

    ////////////////////////////////////

    // Player Finder //

    ///////////////////////////////////

    //Find player's informations and events where he applied
    // string name: name of the player

    app.route('/playerFinder/player/')
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
                    "error": "404",
                    "data": {}
                })
            }

        })
    // Find matches for a specified event of that game for a player
    // We use Slug, game and name as query parameters
    // string tournament: string with tournament name
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

    
    ////////////////////////////////////

    // Foresee the Match //

    ///////////////////////////////////

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
