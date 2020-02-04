// Standardisation of the data taken from Shoryuken so we can work with them in Smash.gg 

exports.normalize_game = function normalize_game(game){
  switch(game){
      case "SF5":
          game = "street fighter v arcade edition 1"
          return game
      case "DBFZ":
          game = "dragon ball fighterz"
          return game        
      case "T7":
          game = "tekken 7"
          return game
      default:
          return game
  }
}