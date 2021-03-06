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
  },
  getPerformers:function(event_id){
    return knex('event_performers').where({event_id:event_id}).join('performers', 'performers.id', 'event_performers.performer_id').select()
  },
  getInState:function(stateId){
    return knex('events').where({state:stateId}).select();
  },
  create:function(specs){
    var startDate=new Date(specs.startDate);
    var endDate=new Date(specs.endDate);

    return knex('events').insert({name:specs.name, start:startDate,  end:endDate, state:specs.state, city:specs.city, address:specs.address})
  },
  update:function(specs, id){
    var startDate=new Date(specs.startDate);
    var endDate=new Date(specs.endDate);

    return knex('events').update({name:specs.name, start:startDate,  end:endDate, state:specs.state, city:specs.city, address:specs.address}).where({id:id});
  },
  delete:function(id){
    return knex('event_performers').del().where({event_id:id}).then(function(){
      //need to send alert here somehow or something....... (tricky but def doable)
      return knex('event_followers').del().where({event_id:id}).then(function(){
        return knex('events').del().where({id:id})

      })
    })
  }
}
