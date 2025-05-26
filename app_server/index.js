var express = require('express');
var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
var compression = require('compression');
var bodyParser = require('body-parser');

var app = express()
// initialize the router & server and add a final callbacj
var router = Router()  
var server = http.createServer(function onRequest (req, res) {
  router(req, res, finalhandler(req, res))
})

// define routers

// wire-up routes to
app.get('/', function(req, res) {
    res.send("demo");
}

// Enable CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/app_client/src/pages/login.js');
})

server.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});