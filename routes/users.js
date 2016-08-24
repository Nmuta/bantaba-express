var express = require('express');
var router = express.Router();
var authQ= require('../queries/auth.js')
var Users= require('../queries/users.js')
var Events= require('../queries/events.js')
/* GET users listing. */
router.get('/following/:id/', function(req, res, next) {
  Users.getFollowedEvents(req.params.id).then(function(results){
    res.send(results)
  })
});
router.get('/follow/:token/:userId/:eventId', function(req, res, next){
  checkMatch(req, res, next, follow)
})
router.get('/unfollow/:token/:userId/:eventId', function(req, res, next){
  checkMatch(req, res, next, unfollow)
})
function checkMatch(req, res, next, callback){
  authQ.getSession(req.params.token).then(function(session){
    if(session.length===0){
      res.send({error:true, message:'not logged in'})
    }
    else if(session[0].user_id!=req.params.userId){
      res.send({error:true, message:'logged in as the wrong account'})
    }
    else{
      callback(req, res, next)
    }
  })
}
function follow(req, res, next){
  Events.follow(req.params.userId, req.params.eventId).then(function(results){
    if(results===false){
      res.send('Already following')
    }
    else{
      Users.getFollowedEvents(req.params.userId).then(function(results){
        res.send(results)
      })
    }
  })
}
function unfollow(req, res, next){
  console.log("here");
  Events.unfollow(req.params.userId, req.params.eventId).then(function(results){
    Users.getFollowedEvents(req.params.userId).then(function(results){
      res.send(results)
    })
  })
}
module.exports = router;
// router.get('/follow/:token/:userId/:eventId', function(req, res, next){
//   authQ.getSession(req.params.token).then(function(session){
//     if(session.length===0){
//       res.send({error:true, message:'not logged in'})
//     }
//     else if(session[0].user_id!=req.params.userId){
//       res.send({error:true, message:'logged in as the wrong account'})
//     }
//     else{
//       Events.follow(req.params.userId, req.params.eventId).then(function(results){
//         if(results===false){
//           res.send('Already following')
//         }
//         else{
//           Users.getFollowedEvents(req.params.userId).then(function(results){
//
//             res.send(results)
//
//           })
//         }
//       })
//     }
//   })
// })
