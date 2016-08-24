var chai           = require('chai'),
    chaiAsPromised = require('chai-as-promised'),
    should         = chai.should(),
    expected      =require('./expected/events.js')
    Events        = require('../queries/events.js');
chai.use(chaiAsPromised);
describe('Events Queries', function () {
  describe('#hooked up', function () {
    it('test returns true', function () {
      return Events.test().should.eventually.equal(true);
    });
  });
  describe('#get all events', function(){
    it('should return all events', function(){
      return Events.getAll().should.eventually.equal(expected.allEvents)
    })
  })
});
