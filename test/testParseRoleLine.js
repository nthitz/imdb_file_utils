var _ = require('lodash')
var chai = require('chai')
var assert = chai.assert;
var expect = chai.expect;
var dataDir = './data/test/'
var imdb = require('../imdb.js')(dataDir)
describe('roleParseLine', function() {
  var lines = {
    '\t\t\tGhetto Physics (2010)':
      {
        name: 'Ghetto Physics',
        year: '2010'
      },
    "\t\t\tBigkis (2014)  <24>":
      {
        name: "Bigkis",
        year: "2014"
      },
    "\t\t\tAnass (2005)  [Himself]":
      {
        name: "Anass",
        year: "2005",
        role: "Himself"
      },
    '\t\t\t"Supervivientes: Perdidos en el Caribe" (2006) {(2009-05-07)}  [Himself]':
      {
        name: '"Supervivientes: Perdidos en el Caribe"',
        year: "2006",
        episodeNumber: "2009-05-07",
        role: "Himself"
      },
    '\t\t\t"Wansapanataym" (2010) {Trick or Trixie (#1.107)}  [Young Trixie\'s Dad]  <11>':
      {
        name: '"Wansapanataym"',
        year: "2010",
        episode: "Trick or Trixie",
        role: "Young Trixie's Dad",
        episodeNumber: "#1.107"
      },
    '\t\t\tE.R. Sluts (2003) (V)  <12>':
      {
        name: 'E.R. Sluts',
        year: '2003'
      },
    "\t\t\tSuperman Returns (2006)  [15-Year-Old Clark\t]  <18>":
      {
        name: "Superman Returns",
        year: "2006",
        role: "15-Year-Old Clark"
      },
    "\t\t\tOMG Zombies!! :( (2007)  [Sergio]":
      {
        name: "OMG Zombies!! :(",
        year: "2007",
        role: "Sergio"

      }
  }
  _.each(lines, function(role, line) {
    // TODO should allow for more customizable message
    it('should parse line ' + line, function() {
      expect(imdb.parseRoleLine(line)).to.deep.equal(role)
    })
  })
})