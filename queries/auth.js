var knex=require('../db/knex');
var bcrypt=require('bcrypt')
module.exports={
  createUser: function(username, hash, accountType){
    return knex('users').insert({username:username, password:hash, account_type:accountType})
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
  }
}
