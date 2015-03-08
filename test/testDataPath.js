
var chai = require('chai')
var assert = chai.assert;
var expect = chai.expect;
var imdb = require('../imdb.js')
var dataDir = './imdb_data/'

describe('dataPath', function() {
  describe('dataPathExists', function() {
    it('should accept a data path', function() {
      expect(function() {
        imdb(dataDir)
      }).to.not.throw(Error)
    })
    it('should fail on invalid data path', function() {
      expect(function() {
        imdb(dataDir + 'blah1234')
      }).to.throw(Error)
    })
  })
  describe('atLeastOneDataFileExists', function() {
    it('should find at least one data file', function() {
      assert(imdb.numExistingDataFiles() > 0)
    })
  })

})