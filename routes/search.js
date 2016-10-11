var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
var Performers= require('../queries/performers.js')
/* GET home page. */
router.post('/', function(req, res, next){
  //2 cases: name, city
  //do filter and stuff on this end, send back matches (only problem is more rescourse intensive on backend, but less data sent)
  var comparators=[];

  function state (item, state){
    return input.state===req.params.searchText
  }
  function name(item, name){
    return input.name.toLowerCase().indexOf(req.params.searchText.toLowerCase())!=-1
  }
  if(req.body.state){
    comparators.push(state)
  }
  if(req.body.name){
    comparators.push(name)
  }

  Events.getAll().then(function(events){
    Performers.getWithUsers().then(function(performers){
      res.send({
        events:events.filter(function(event){
          return comparators.reduce(function(result, next){
            return (result)? next(event) : false;
          },true)
        }),
        performers:performers.filter(function(event){
          return comparators.reduce(function(result, next){
            return (result)? next(event) : false;
          },true)
        })
      })
    })
  })

})

router.get('/list', function(req, res, next){
  Events.getAll().then(function(events){
    Performers.getAll().then(function(performers){
      res.send({
        events:events,
        performers:performers
      })
    })
  })
})
module.exports = router;
