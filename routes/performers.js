var express = require('express');
var router = express.Router();
var knex =require('../db/knex')
var Events=require('../queries/events.js')
var Performers= require('../queries/performers.js')
var authQ=require('../queries/auth.js')
var bcrypt=require('bcrypt')

/* GET home page. */
router.get('/', function(req, res, next){
  Performers.getAll().then(function(results){
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
    try{
      var parsed=authQ.verifyToken(req.body.token)
      console.log(parsed);
      authQ.isAdmin(parsed.body.sub).then(function(matches){
        if(matches.length>=1){
          bcrypt.hash(req.body.password, 10, function(err, hash) {

            authQ.createUser(req.body.username, hash, 3).then(function(id){
              console.log(id);
              Performers.create(req.body, id).then(function(){
                res.send('created')
              })
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
router.get('/followers/:performerId', function(req, res, next){
  Performers.getFollowers(req.params.performerId).then(function(results){
    res.send(results)
  })
});
router.post('/update/:performerId/:token', function(req, res, next){
  console.log(req.body);

  try{
    var parsed=authQ.verifyToken(req.params.token)
    console.log(parsed);
    authQ.isAdmin(parsed.body.sub).then(function(matches){
      if(matches.length>=1 ){
        Performers.update(req.body, req.params.performerId).then(function(results){
          res.send('words')
        })
      }
      else{
        authQ.ownsPerformerAcc(parsed.body.sub, req.params.performerId).then(function(matches){
          if(matches.length>=1 ){
            console.log("there is a match");
            Performers.update(req.body, req.params.performerId).then(function(results){
              res.send('words')
            })

          }
          else{
            res.send('not authorized')

          }
        })
      }
    })
  }
  catch(e){
    console.log(e);
    res.send('invalid')
  }
})
router.get('/delete/:performerId/:token', function(req, res, next){
  try{
    var parsed=authQ.verifyToken(req.params.token)
    console.log(parsed);
    authQ.isAdmin(parsed.body.sub).then(function(matches){
      if(matches.length>=1){
        Performers.delete(req.params.performerId).then(function(results){
          res.send('words')
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
router.get('/performances/:performerId', function(req, res, next){
  Performers.getEvents(req.params.performerId).then(function(results){
    res.send(results);
  })
})

module.exports = router;
