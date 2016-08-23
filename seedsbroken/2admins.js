
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('admins').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries

        knex('admins').insert({user_id: 1, email: "bantabadev@gmail.com"}),
      ]);
    });
};
