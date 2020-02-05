var Event = require('../DB/eventSchema').Event
const {MongoClient} = require('mongodb');

const usernameDB = process.env.DB_USER
const passwordDB = process.env.DB_PASS

// Standard find method for the resource cached. We need the name and the game

exports.findDocuments = async function (name, game) {
  const uri = "mongodb://"+ usernameDB +":" + passwordDB + "@playerfinder-shard-00-00-umz1y.mongodb.net:27017,playerfinder-shard-00-01-umz1y.mongodb.net:27017,playerfinder-shard-00-02-umz1y.mongodb.net:27017/test?ssl=true&replicaSet=PlayerFinder-shard-0&authSource=admin&retryWrites=true&w=majority";

  MongoClient.connect(uri, function (err, client) {
    console.log("Connected successfully to server")
  })

  return await Event.findOne({ 'name': name, 'game': game }, function (err) {
    if (err) return handleError(err)
  })
}

