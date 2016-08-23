
exports.up = function(knex, Promise) {
  return knex.schema.createTable('account_types', function(table){
    table.increments();
    table.string('type')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('account_types');
};
