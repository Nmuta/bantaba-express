var express = require('express');
var router = express.Router();
var authQ= require('../queries/auth.js')
var bcrypt=require('bcrypt')

/* GET home page. */
router.post('/signup', function(req, res, next) {
  //validate first fyi
  console.log("this");
  authQ.userExists(req.body.username).then(function(match){
    console.log("2");
    if(match.rows.length===0){
      console.log("3");
      bcrypt.hash(req.body.password, 10, function(err, hash) {
        console.log("here");
        authQ.createUser(req.body.username, hash, req.body.accountType).then(function(){
          authQ.getUserByName(req.body.username).then(function(user){
            console.log(user);
            req.session.loggedin=true;
            req.session.id=user[0].id
            res.send({id:user[0].id, username:user[0].username, accountType:user[0].account_type})
          })
        })
     })
    }
    else{
      res.send('username is taken')
    }
  })
});
router.post('/login', function(req, res, nex){
  authQ.getUserByName(req.body.username).then(function(match){
    if(match.length===0){
      res.send('no such user');
    }
    else{
      if(bcrypt.compareSync(req.body.password, match[0].password)){
        req.session.loggedin=true;
        req.session.id=match[0].id
        res.send({id:match[0].id, username:match[0].username, accountType:match[0].account_type})
      }
      else{
        res.send('password doesnt match')
      }

    }
  })
})
router.get('/logout', function(req, res, next){
  req.session= null;
  res.send('logged out')
})

module.exports = router;
