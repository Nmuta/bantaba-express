
exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(table){
    table.increments();
    table.string('token');
    table.index('token')
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.dateTime('created')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('sessions');
};
