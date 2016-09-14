var express = require('express');
var router = express.Router();
var authQ= require('../queries/auth.js')
var bcrypt=require('bcrypt')
var randToken=require('rand-token')
/* GET home page. */
router.post('/signup', function(req, res, next) {
  //validate first fyi
  console.log(req.body);
  console.log("this");
  authQ.userExists(req.body.username).then(function(match){
    console.log("2");
    if(match.rows.length===0){
      console.log("3");
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        console.log("here");
        account=req.body.account_type
        if(account===3){
          //s
        }
        else if(account===1){
        account=2
        }
        authQ.createUser(req.body.username, hash, account).then(function(){
          authQ.getUserByName(req.body.username).then(function(user){
            res.send({token:authQ.genToken(user),
              id:match[0].id,
              username:match[0].username,
              accountType:match[0].account_type,
              validated:match[0].validated
            });
          })
        })
     })
    }
    else{
      res.send({error:true, message:'username is taken'})
    }
  })
});
router.post('/login', function(req, res, nex){
  console.log(req.body);
  authQ.getUserByName(req.body.username).then(function(match){
    if(match.length===0){
      res.send({error:true, message:'no such user'});
    }
    else{
      if(bcrypt.compareSync(req.body.password, match[0].password)){
        res.send({token:authQ.genToken(match)});
      }
      else{
        res.send({error:true, message:'password doesnt match'})
      }

    }
  })
})

router.post('/getUser', function(req, res, next){
  if(req.body.token){
    try{
      var token=authQ.verifyToken(req.body.token)
      console.log(token);
      authQ.getUserById(token.body.sub).then(function(match){
        console.log(match);
          res.send({
            id:match[0].id,
            username:match[0].username,
            accountType:match[0].account_type,
            validated:match[0].validated
          })
      })


    }
    catch(e){
      console.log(e);
      res.send({error:true, message:'invalid token'})
    }
  }
  else{
    res.send({error:true, message:'not logged in'})
  }
})
function dateSplit(date){
  var res = date.split(' ')
  //5th space
  var res2 = '';
  for (var i = 0; i < 5; i++) {
    res2 += (' ' + res[i]);
    }
  return res2;
}
module.exports = router;
