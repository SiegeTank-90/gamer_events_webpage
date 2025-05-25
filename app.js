var express = require('express')
var finalhandler = require('finalhandler')
var http = require('http')
var Router = require('router')
var compression = require('compression')
var bodyParser = require('body-parser')

var app = express()
// initialize the router & server and add a final callbacj
var router = Router()  
var server = http.createServer(function onRequest (req, res) {
  router(req, res, finalhandler(req, res))
})

// define routers
var adminRouter = require('./app_admin/src/index.js')

app.use('/', ./)

server.listen(3000)