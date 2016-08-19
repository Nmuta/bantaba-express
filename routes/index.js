var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
/* GET home page. */
router.get('/', function(req, res, next) {
  knex.raw('SELECT * FROM notes;').then(function(value){
    res.send(value.rows)
  })
});

module.exports = router;
