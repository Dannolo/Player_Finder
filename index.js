//Defining core variables for the server to start
//ONLY FOR DEBUG RIGHT NOW

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000

//Declaring a parser for request
const bodyParser = require('body-parser')

app.use('*', function(req, res, next) {
  //replace localhost:8080 to the ip address:port of your server
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next(); 
  });
  
//enable pre-flight
app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const routes = require('./API/Routes/routes')
routes(app)

app.use(function (req, res) {
  res.status(404).send('Ouch, that is hell you are walking to.')
})

app.listen(port)

console.log('It works')

