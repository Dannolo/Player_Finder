var mongoose = require('mongoose');

// Schema for our only important resource to be cached

var eventSchema = mongoose.Schema({
    name: String,
    slug: String,
    game: String,
    sets: [{
        displayScore: String,
        fullRoundText: String
    }]
  })
  // compile schema to model
  exports.Event = mongoose.model('Event', eventSchema, 'Even&Sets');