var knex=require('../db/knex');
var bcrypt=require('bcrypt')
var uuid = require('node-uuid');
var nJwt = require('njwt');

var secretKey = uuid.v4();

module.exports={
  createUser: function(username, hash, accountType){
    return knex('users').insert({username:username, password:hash, account_type:accountType}).returning('id')
  },
  userExists: function(username){
    return knex.raw(`SELECT * FROM users WHERE username ='${username}' LIMIT 1;`)
  },
  getUserById: function(id){
    return knex('users').where({id:id}).select()
  },
  getUserByName: function(username){
    return knex('users').where({username:username}).select()
  },
  login: function(user, req){
    req.session.loggedin=true;
    req.session.id=user.rows[0].id
  },
  createSession: function(user, token, date){
    return knex('sessions').where({user_id:user.id}).del().then(function(){
      return knex('sessions').insert({token:token, user_id:user.id, created:date})})
  },
  clearSession: function(token){
    console.log(token);
    return knex('sessions').where({token:token}).del()
  },
  getSession: function(token){
    return knex('sessions').where({token:token}).select()
  },
  genToken:function(user){
    console.log(user);
    var claims = {
      sub: user.id,
      iss: 'bantaba-server',
      permissions: user.account_type
    }
    var jwt = nJwt.create(claims,secretKey);
    console.log(jwt);
    return jwt.compact();
  },
  verifyToken:function(token){

    return nJwt.verify(token,secretKey)
  },
  isAdmin:function(id){
    return knex('admins').where({user_id:id}).select();
  }
}
