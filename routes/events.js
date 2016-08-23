var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
/* GET home page. */
router.get('/', function(req, res, next) {
  //get all events
  knex.raw('SELECT * FROM notes;').then(function(value){
    res.send(value.rows)
  })
});
//get all events for a user

//get all events with a given performer
module.exports = router;
