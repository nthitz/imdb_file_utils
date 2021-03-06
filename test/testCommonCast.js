var chai = require('chai')
var assert = chai.assert;
var expect = chai.expect;
var dataDir = './data/test/'

var imdb = require('../imdb.js')(dataDir)
describe('findCommonCast', function() {
  this.timeout(4000)
  it('should fail on non array param', function() {
    expect(function() {
      imdb.findCommonCast()
    }).to.throw(Error)
    expect(function() {
      imdb.findCommonCast(123)
    }).to.throw(Error)
    expect(function() {
      imdb.findCommonCast('hello')
    }).to.throw(Error)
    expect(function() {
      imdb.findCommonCast([], function() {
      })
    }).to.not.throw(Error)
    
  })
  it('should find two matchs', function(done) {
    var commonCastRequest = [
      "50 Cent: The New Breed",
      "A Portrait of an Artist: The Making of 'Get Rich or Die Tryin'"
    ]
    imdb.findCommonCast(commonCastRequest, function(err, results) {
      expect(results).to.include.members([
        '25 Cent (I)',
        '50 Cent'
      ])
      done(err);
    })
  })
  it('should respect file encodings', function(done) {
    imdb.findCommonCast(['"Avrupa Yakasi"'], function(err, results) {
      console.log(results)

      done(err)
    })
  })
})