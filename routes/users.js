var express = require('express');
var router = express.Router();
var authQ= require('../queries/auth.js')
var Users= require('../queries/users.js')
var Events= require('../queries/events.js')
var Performers= require('../queries/performers.js')
/* GET users listing. */
router.get('/following/:id/', function(req, res, next) {
  Users.getFollowedEvents(req.params.id).then(function(results){
    res.send(results)
  })
});
router.get('/followE/:token/:eventId', function(req, res, next){
  checkMatch(req, res, next, followE)
})
router.get('/unfollowE/:token/:eventId', function(req, res, next){
  checkMatch(req, res, next, unfollowE)
})
router.get('/followP/:token/:performerId', function(req, res, next){
  checkMatch(req, res, next, followP)
})
router.get('/unfollowP/:token/:performerId', function(req, res, next){
  checkMatch(req, res, next, unfollowP)
})
router.get('/profile/:token', function(req, res, next){
  checkMatch(req, res, next, sendProfile);
})
router.get('/addPerformance/:token/:eventId', function(req,res, next){
  checkMatch(req, res, next, addPerformance);
})
router.get('/removePerformance/:token/:eventId', function(req,res, next){
  checkMatch(req, res, next, removePerformance);
})
function checkMatch(req, res, next, callback){
  try{
    var parsed=authQ.verifyToken(req.params.token)
    callback(req, res, next, parsed.body.sub)
  }
  catch(e){
    console.log(e);
    res.send('invalid')
  }
}
function addPerformance(req, res, next, parsed){
  Performers.getFromUser(parsed).then(function(results){
    Performers.addPerformance(results[0].id, req.params.eventId).then(function(results){
      res.send('added')
    })
  })
}
function removePerformance(req, res, next, parsed){
  Performers.getFromUser(parsed).then(function(results){
    Performers.removePerformance(results[0].id, req.params.eventId).then(function(results){
      res.send('added')
    })
  })
}
function sendProfile(req, res, next, parsed){
  Performers.getFromUser(parsed).then(function(results){
    res.send(results)
  })
}
function followE(req, res, next, parsed){
  Events.follow(parsed, req.params.eventId).then(function(results){
    if(results===false){
      res.send('Already following')
    }
    else{
      Users.getFollowedEvents(parsed).then(function(results){
        res.send(results)
      })
    }
  })
}
function unfollowE(req, res, next, parsed){
  console.log("here");
  Events.unfollow(parsed, req.params.eventId).then(function(results){
    Users.getFollowedEvents(parsed).then(function(results){
      res.send(results)
    })
  })
}
function followP(req, res, next, parsed){
  Performers.follow(parsed, req.params.performerId).then(function(results){
    if(results===false){
      res.send('Already following')
    }
    else{
      Users.getFollowedEvents(parsed).then(function(results){
        res.send(results)
      })
    }
  })
}
function unfollowP(req, res, next, parsed){
  console.log("here");
  Performers.unfollow(parsed, req.params.performerId).then(function(results){
    Users.getFollowedEvents(parsed).then(function(results){
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
