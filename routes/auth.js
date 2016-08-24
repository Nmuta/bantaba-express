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
            console.log(user);
            var token=randToken.generate(20);
            var date = dateSplit(Date());

            authQ.createSession(user[0], token, date).then(function(){
              res.send({token:token, username:user[0].username, id:user[0].id, accountType:user[0].account_type})
            })
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
        var token=randToken.generate(20);
        var date = dateSplit(Date());

        authQ.createSession(match[0], token, date).then(function(){
          res.send({token:token, username:match[0].username, id:match[0].id, accountType:match[0].account_type})
        })
      }
      else{
        res.send({error:true, message:'password doesnt match'})
      }

    }
  })
})
router.post('/logout', function(req, res, next){
  authQ.clearSession(req.body.token).then(function(){
    res.send('logged out')

  });
})
router.post('/getUser', function(req, res, next){
  if(req.body.token){
    authQ.getSession(req.body.token).then(function(session){
      if(session.length===0){
        res.send({error:true, message:'not logged in'})
      }
      else{
        authQ.getUserById(session[0].user_id).then(function(match){
          res.send({token:req.body.token, username:match[0].username, id:match[0].id, accountType:match[0].account_type})
        })
      }
    })
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
