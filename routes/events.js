var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
/* GET home page. */
router.get('/', function(req, res, next){
  Events.getAll().then(function(results){
    res.send(results  )
  })
})
router.get('/performers/:eventId', function(req, res, next){
  Events.getPerformers(req.params.eventId).then(function(results){
    res.send(results)
  })
})
router.get('/followers/:eventId', function(req, res, next){
  Events.getFollowers(req.params.eventId).then(function(results){
    res.send(results)
  })
})
router.get('/state/:stateId', function(req, res, next){
  Events.getInState(req.params.stateId).then(function(results){
    res.send(results)
  })
})

//get all events for a user

//get all events with a given performer

//create route (maybe need some sort of verification or something to avoid pointless entries? def something... might be too much with such a small userbase though (maybe use how may events are being stored in the database? -no validation required if very few (because why bother right), but dont let it get to much)) what about spamming with dummy accounts? captcha or something
module.exports = router;
