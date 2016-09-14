var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
var Performers= require('../queries/performers.js')
/* GET home page. */
router.get('/', function(req, res, next){
  Performers.getAll().then(function(results){
    res.send(results  )
  })
})
router.get('/followers/:performerId', function(req, res, next){
  Performers.getFollowers(req.params.performerId).then(function(results){
    res.send(results)
  })
})

//get all events for a user

//get all events with a given performer

//create route (maybe need some sort of verification or something to avoid pointless entries? def something... might be too much with such a small userbase though (maybe use how may events are being stored in the database? -no validation required if very few (because why bother right), but dont let it get to much)) what about spamming with dummy accounts? captcha or something
module.exports = router;
