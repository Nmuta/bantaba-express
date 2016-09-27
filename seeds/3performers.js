
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('performers').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('performers').insert({name: 'test performer', user_id:3,  validated:true}),
        knex('performers').insert({name: 'test performer2', user_id:4,  validated:true}),

      ]);
    });
};
