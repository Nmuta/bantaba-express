var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
/* GET home page. */

router.get('/followers/:eventId', function(req, res, next){
  Events.getFollowers(req.params.eventId).then(function(results){
    res.send(results)
  })
})
//get all events for a user

//get all events with a given performer


module.exports = router;
