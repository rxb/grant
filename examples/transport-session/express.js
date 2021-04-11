var https = require('https');
var fs = require("fs");
var express = require('express')
var session = require('express-session')
var grant = require('../../').express()

var app = express()
  .use(session({secret: 'grant', saveUninitialized: true, resave: false}))
  .use(express.json({limit: '5mb'}))
  .use(express.urlencoded({ limit: '5mb', extended: true }))
  .use(grant(require('./config.js')))
  .get('/hello', (req, res) => {
    res.end(JSON.stringify(req.session.grant.response, null, 2))
  })
  .get('/hi', (req, res) => {
    res.end(JSON.stringify(req.session.grant.response, null, 2))
  });

var server = https.createServer({
  key: fs.readFileSync('/Users/Richard/localhost.key'),
  cert: fs.readFileSync('/Users/Richard/localhost.crt')
}, app).listen(443);



