console.log("before");
var knex=require('../db/knex');

module.exports={
  getFollowedEvents:function(userId){
    return knex('event_followers').where({user_id:userId}).join('events', "events.id", "event_followers.event_id")
  }

}
