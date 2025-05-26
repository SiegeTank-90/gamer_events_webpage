var express = require('express');
var finalhandler = require('finalhandler');
var http = require('http');
var Router = require('router');
var compression = require('compression');
var bodyParser = require('body-parser');
const { Server } = require('https');

var expServer = express();
// initialize the router & server and add a final callbacj
var router = Router();


// wire-up routes to
expServer.get('/', function (req, res) {
    res.send("Welcome to the Express Server!");
})

// initialize the CORS middleware
expServer.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});


expServer.listen(8000, () => {
    console.log("Server is running on port 8000");
})
