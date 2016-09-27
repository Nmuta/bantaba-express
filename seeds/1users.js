
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
          knex('users').insert({username: 'amedmin', password: '$2a$10$Jy1lxXDTntXLoBmcu1Gn9OOd4EfG5cDOmB4rvkKmDPI/Q0VHIFJtu', account_type:'1', state:'CO'}),
          knex('users').insert({username: 'tests', password: '$2a$10$NX5Fj7vDUgkd4aC5AuRS5.wY906a2O14MhpjhdQ50LCTdcOND7nWq', account_type:'2', state:'CO'}),
          knex('users').insert({username: 'testp', password: '$2a$10$NX5Fj7vDUgkd4aC5AuRS5.wY906a2O14MhpjhdQ50LCTdcOND7nWq', account_type:'3',}),
          knex('users').insert({username: 'testp2', password: '$2a$10$NX5Fj7vDUgkd4aC5AuRS5.wY906a2O14MhpjhdQ50LCTdcOND7nWq', account_type:'3'}),

      ]);
    });
};
