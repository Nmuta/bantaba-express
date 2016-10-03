
exports.up = function(knex, Promise) {
  return knex.schema.createTable('event_notifications', function(table){
    table.increments();
    table.dateTime('posted')
    table.string('text');
    table.integer('event_id');
    table.foreign('event_id').references('id').inTable('events');

  }).createTable('performer_notifications', function(table){
    table.increments();
    table.dateTime('posted')
    table.string('text');
    table.integer('performer_id');
    table.foreign('performer_id').references('id').inTable('performers');
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('event_notifications').dropTableIfExists('performer_notifications')
};
