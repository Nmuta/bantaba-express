
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('events').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('events').insert({name:'test event1', start:'2016-11-04 03:23:40',  end:'2016-11-14 03:23:40', state:'CO', city:'Denver', address:'1234 place street'}),
        knex('event_performers').insert({event_id: 1, performer_id: 1}),
        knex('events').insert({name:'test event2', start:'2016-12-04 03:23:40',  end:'2016-12-14 03:23:40', state:'KS', city:'wichita', address:'1234 place street'}),
        knex('event_performers').insert({event_id: 2, performer_id: 2}),
        knex('events').insert({name:'test event3', start:'2017-01-04 03:23:40',  end:'2017-02-14 03:23:40', state:'CO', city:'Boulder', address:'1234 place street'}),
        knex('event_performers').insert({event_id: 3, performer_id: 1}),
        knex('event_performers').insert({event_id: 3, performer_id: 2}),
      ]);
    });
};
// table.string('state');
// table.string('city');
// table.string('address');
