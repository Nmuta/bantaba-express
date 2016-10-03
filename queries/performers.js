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
  },
  getEvents:function(performer_id){
    return knex('event_performers').where({performer_id:performer_id}).join('events', 'events.id', 'event_performers.event_id').select()
  },
  create:function(specs, user_id){
    return knex('performers').insert({name:specs.name, user_id:user_id[0], state:specs.state, bio:specs.bio});
  },
  update:function(specs, performer_id){
    return knex('performers').update({name:specs.name, bio:specs.bio, state:specs.state}).where({id:performer_id});
  },
  delete:function(id){
    return knex('event_performers').del().where({performer_id:id}).then(function(){
      return knex('performer_followers').del().where({performer_id:id}).then(function(){
        return knex('performers').del().where({id:id})
      })
    })
  },
  getFromUser:function(user_id){
    return knex('performers').where({user_id:user_id})
  },
  addPerformance:function(performer_id, event_id){
    return knex('event_performers').insert({performer_id:performer_id, event_id:event_id})
  },
  removePerformance:function(performer_id, event_id){
    return knex('event_performers').del().where({performer_id:performer_id, event_id:event_id})
  },

}
