var _ = require('lodash')
var chai = require('chai')
var assert = chai.assert;
var expect = chai.expect;
var dataDir = './imdb_data/test/'
var imdb = require('../imdb.js')(dataDir)
describe('roleParseLine', function() {
  var lines = {
    "Bigkis (2014)  <24>":
      {
        name: "Bigkis",
        year: "2014"
      },
      "Anass (2005)  [Himself]":
        {
          name: "Anass",
          year: "2005",
          role: "Himself"
        },
    '"Supervivientes: Perdidos en el Caribe" (2006) {(2009-05-07)}  [Himself]':
      {
        name: '"Supervivientes: Perdidos en el Caribe"',
        year: "2006",
        episodeNumber: "2009-05-07",
        role: "Himself"
      },
    '"Wansapanataym" (2010) {Trick or Trixie (#1.107)}  [Young Trixie\'s Dad]  <11>':
      {
        name: '"Wansapanataym"',
        year: "2010",
        episode: "Trick or Trixie",
        role: "Young Trixie's Dad",
        episodeNumber: "#1.107"
      }
  }
  _.each(lines, function(role, line) {
    it('should parse line ' + line, function() {
      expect(imdb.parseRoleLine(line)).to.deep.equal(role)
    })
  })
})