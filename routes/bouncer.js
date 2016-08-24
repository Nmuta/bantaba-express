

var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var authQ= require('../queries/auth.js')
module.exports={
  loggedIn: function(req, res, next){
    console.log(req.params);
    authQ.getSession(req.params.token).then(function(session){
      if(session.length===0){
        res.send({error:true, message:'not logged in'})
      }
      else{
        next()
      }
    })
  }
}
