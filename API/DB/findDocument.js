var Event = require('../DB/eventSchema').Event
const {MongoClient} = require('mongodb');

// Standard find method for the resource cached. We need the name and the game

exports.findDocuments = async function (name, game) {
  const uri = "mongodb://davideSchmidt:playerfinder@playerfinder-shard-00-00-umz1y.mongodb.net:27017,playerfinder-shard-00-01-umz1y.mongodb.net:27017,playerfinder-shard-00-02-umz1y.mongodb.net:27017/test?ssl=true&replicaSet=PlayerFinder-shard-0&authSource=admin&retryWrites=true&w=majority";

  MongoClient.connect(uri, function (err, client) {
    console.log("Connected successfully to server")
  })

  return await Event.findOne({ 'name': name, 'game': game }, function (err) {
    if (err) return handleError(err)
  })
}

