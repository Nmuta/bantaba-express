var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
var authQ=require('../queries/auth.js')
var bcrypt=require('bcrypt')
/* GET home page. */
router.get('/', function(req, res, next){
  Events.getAll().then(function(results){
    res.send(results  )
  })
})
router.post('/create', function(req, res, next){
    //do a bunch of shit
    //ignore hours and seconds
    //parse input, validate thing, make sure it's an admin account..........
    //in post request- token, specs for new event
    console.log(req.body);
    console.log(req.body.startDate);
    var date=new Date(req.body.startDate);
    console.log(date);
    try{
      var parsed=authQ.verifyToken(req.body.token)
      console.log(parsed);
      authQ.isAdmin(parsed.body.sub).then(function(matches){
        if(matches.length>=1){
          Events.create(req.body).then(function(){
            res.send('created')
          })
        }
        else{
          res.send('not an admin')
        }
      })
    }
    catch(e){
      console.log(e);
      res.send('invalid')
    }
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
router.post('/update/:eventId/:token', function(req, res,next){
  try{
    var parsed=authQ.verifyToken(req.params.token)
    console.log(parsed);
    authQ.isAdmin(parsed.body.sub).then(function(matches){
      if(matches.length>=1){
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          Events.update(req.body, req.params.eventId).then(function(results){
            res.send('words')
          })
        })

      }
      else{
        res.send('not an admin')
      }
    })
  }
  catch(e){
    console.log(e);
    res.send('invalid')
  }
})
//get all events for a user

//get all events with a given performer

//create route (maybe need some sort of verification or something to avoid pointless entries? def something... might be too much with such a small userbase though (maybe use how may events are being stored in the database? -no validation required if very few (because why bother right), but dont let it get to much)) what about spamming with dummy accounts? captcha or something
module.exports = router;
