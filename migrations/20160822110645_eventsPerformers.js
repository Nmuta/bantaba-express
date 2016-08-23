
exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table){
    table.increments();
    table.string('name');
    table.dateTime('start')
    table.dateTime('end')
    //event type?
    //location - def necessary, not totally sure how to do it yet- use address?
      //whatevers easiest for google maps api integration
  }).createTable('performers', function(table){
    table.increments();
    table.string('name');
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users'); //lets you link
    //performer type? stuff like that (can work this in later without too much trouble) - this would be super useful, let you tell who does what, get people in touch with other types of permormers or whatever,
    //bio?
    //image (link? upload- that'd be tricky)
  }).createTable('event_performers', function(table){
    table.increments();
    table.integer('performer_id');
    table.foreign('performer_id').references('id').inTable('performers');
    table.integer('event_id');
    table.foreign('event_id').references('id').inTable('events');
  }).createTable('event_followers', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('event_id');
    table.foreign('event_id').references('id').inTable('events');
  }).createTable('performer_followers', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.integer('performer_id');
    table.foreign('performer_id').references('id').inTable('performers');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('event_performers').dropTableIfExists('event_followers').dropTableIfExists('performer_followers').dropTableIfExists('performers').dropTableIfExists('events');
};
