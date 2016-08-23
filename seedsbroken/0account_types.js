
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('account_types').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('account_types').insert({type: 'admin'}),
        knex('account_types').insert({type: 'standard'}),
        knex('account_types').insert({type: 'performer'})
      ]);
    });
};
