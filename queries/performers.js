console.log("before");
var knex=require('../db/knex');

module.exports={
  test:function(){
    return new Promise(function(resolve, reject){
      resolve(true)
    })
  },
  getAll:function(){
    return knex('performers')
  },
  follow:function(user_id, performer_id){
    return knex('performer_followers').where({performer_id:performer_id, user_id:user_id}).then(function(res){
      if(res.length===0){
        return knex('performer_followers').insert({performer_id:performer_id, user_id:user_id})
      }
      else{
        return false
      }
    })
  },
  unfollow:function(user_id, performer_id){
    return knex('performer_followers').where({performer_id:performer_id, user_id:user_id}).del()
  },
  getFollowers:function(performer_id){
    return knex('performer_followers').where({performer_id:performer_id}).join('users', 'users.id', 'performer_followers.user_id').select('user_id','username')
  },
  getWithUsers:function(){
    return knex('performers').join('users', 'users.id', 'performers.id').select('performers.id', 'performers.name', 'users.validated', 'users.state')
  }
}
