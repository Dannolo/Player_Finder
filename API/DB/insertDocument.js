var Event = require('../DB/eventSchema').Event

// Standard insert method for the resource cached. We need the name, the game, slug for smash.gg and the sets 

exports.insertDocuments = function(name, slug, game, sets) {
    var prova = new Event({
    name: name,
    slug: slug,
    game: game,
    sets: sets
  })
    
  prova.save(function (err) {
    if (err) return console.error(err);
  });

  }