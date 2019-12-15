//Defining core variables for the server to start
//ONLY FOR DEBUG RIGHT NOW

const express = require('express')
const  app = express ()
const  port = process.env.PORT || 3000

//Declaring a parser for request
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())



const routes = require('./API/Routes/routes')
routes(app)

app.use(function(req,res){
  res.status(404).send('Ouch, that is hell you are walking to.')
})

app.listen(port)

console.log('It works')

