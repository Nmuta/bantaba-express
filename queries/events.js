console.log("before");
var knex=require('../db/knex');

module.exports={
  test:function(){
    return new Promise(function(resolve, reject){
      resolve(true)
    })
  },
  getAll:function(){
    return knex('events')
  },
  follow:function(user_id, event_id){
    return knex('event_followers').where({event_id:event_id, user_id:user_id}).then(function(res){
      if(res.length===0){
        return knex('event_followers').insert({event_id:event_id, user_id:user_id})
      }
      else{
        return false
      }
    })
  },
  unfollow:function(user_id, event_id){
    return knex('event_followers').where({event_id:event_id, user_id:user_id}).del()
  },
  getFollowers:function(event_id){
    return knex('event_followers').where({event_id:event_id}).join('users', 'users.id', 'event_followers.user_id').select('user_id','username')
  }
}
