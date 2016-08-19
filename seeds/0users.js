
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
          knex('users').insert({username: 'amedmin', password: '$2a$10$Jy1lxXDTntXLoBmcu1Gn9OOd4EfG5cDOmB4rvkKmDPI/Q0VHIFJtu', account_type:'admin'}),
      ]);
    });
};
