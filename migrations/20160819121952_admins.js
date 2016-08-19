
exports.up = function(knex, Promise) {
  return knex.schema.createTable('admins', function(table){
    table.increments();
    table.integer('user_id');
    table.foreign('user_id').references('id').inTable('users');
    table.string('email');

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('admins');
};
