var fs = require('fs')
var _ = require('lodash')
var byline = require('byline')
var dataFiles = [
  { key: "actors", file: "actors.list" },
  { key: "actresses", file: "actresses.list"}
]

function selectActorFiles(dataFile) {
  return dataFile.key === 'actors' || dataFile.key === 'actresses'  
}

function imdb(dataPath) {
  this.dataPath = dataPath
  var files = fs.readdirSync(this.dataPath)
  _.each(dataFiles, function(dataFile) {
    dataFile.exists = false
  })
  _.each(files, function(file) {
    var dataFile = _.find(dataFiles, function(d) { return d.file === file })
    if(typeof dataFile === 'undefined') return
    dataFile.exists = true
  })
}
imdb.numExistingDataFiles = function numExistingDataFiles() {
  return _.reduce(dataFiles, function(sum, dataFile) {
    return sum + dataFile.exists ? 1 : 0
  },0)
}
imdb.findCommonCast = function findCommonCast(ids,cb) {
  if( ! _.isArray(ids)) {
    return cb({error: "ids must be error"}, false)
  }

  var actorDataFiles = dataFiles.select(selectActorFiles);
  _.each(actorDataFiles, findCommonCast)

  function findCommonCast(dataFile) {
    var f = byline(fs.createReadStream( this.dataPath + dataFile, {
      encoding: 'utf-8'
    }))
    f.on('data', function(line) {
      console.log(line)
    })
  }
}

module.exports = imdb;