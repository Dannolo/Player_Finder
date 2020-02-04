var Event = require('../DB/eventSchema').Event

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