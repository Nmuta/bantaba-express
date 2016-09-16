console.log("before");
var knex=require('../db/knex');

module.exports={
  getFollowedEvents:function(userId){
    return knex('event_followers').where({'event_followers.user_id':userId}).join('events', "events.id", "event_followers.event_id").then(function(events){
      return knex('performer_followers').where({'performer_followers.user_id':userId}).join('performers', 'performers.id', "performer_followers.performer_id").then(function(performers){
        return {
          performers:performers,
          events:events
        }
      })
    })
  },


}
