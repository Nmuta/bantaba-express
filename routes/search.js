var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
var Performers= require('../queries/performers.js')
/* GET home page. */
router.get('/:searchType/:searchText', function(req, res, next){
  //2 cases: name, city
  //do filter and stuff on this end, send back matches (only problem is more rescourse intensive on backend, but less data sent)
  switch(req.params.searchType){
    case ('name'):
      Events.getAll().then(function(events){
        Performers.getAll().then(function(performers){
          res.send({
            events:events.filter(function(input){
              return input.name.toLowerCase().indexOf(req.params.searchText.toLowerCase())!=-1

            }),
            performers:performers.filter(function(input){
              return input.name.toLowerCase().indexOf(req.params.searchText.toLowerCase())!=-1

            })
          })
        })
      })
      break;
    case ('state'):
      console.log('this');
      Events.getAll().then(function(events){
        Performers.getWithUsers().then(function(performers){
          res.send({
            events:events.filter(function(input){
              return input.state===req.params.searchText

            }),
            performers:performers.filter(function(input){
              return input.state===req.params.searchText
            })
          })
        })
      })
      break;
  }
})

module.exports = router;
