var fs = require('fs')
var _ = require('lodash')
var byline = require('byline')
var child_process = require('child_process')
var dataFiles = [
  { key: "actors", file: "actors.list" },
  { key: "actresses", file: "actresses.list"}
]

function selectActorFiles(dataFile) {
  return dataFile.exists && (dataFile.key === 'actors' || dataFile.key === 'actresses')
}

function imdb(dataPath) {
  imdb.dataPath = dataPath
  var files = fs.readdirSync(dataPath)
  _.each(dataFiles, function(dataFile) {
    dataFile.exists = false
  })
  _.each(files, function(file) {
    var dataFile = _.find(dataFiles, function(d) { return d.file === file })
    if(typeof dataFile === 'undefined') return
    dataFile.exists = true
    dataFile.path = dataPath + file
  })
  return imdb;
}
imdb.createTestFiles = function createTestFiles() {
  var testDir = this.dataPath + 'test/'
  fs.mkdir(testDir, function(err) {
    if(err) {
      console.log('remove old test data before running')
      throw err
    };
    _.each(_.select(dataFiles, function(d) { 
      return d.exists }
    ), function(d,i) {
      var inputName = d.path;
      var outputName = testDir + d.file
      var head = 'head -n 10000 ' + inputName + ' >> ' + outputName
      var tail = 'tail -n 10000 ' + inputName + ' >> ' + outputName
      child_process.exec(head, function(error, stdout, stderr) {
        if(error) throw err;
        child_process.exec(tail, function(err) {
          if(err) throw err;
        })
      })
    })
  })
}
imdb.numExistingDataFiles = function numExistingDataFiles() {
  return _.reduce(dataFiles, function(sum, dataFile) {
    return sum + dataFile.exists ? 1 : 0
  },0)
}
imdb.findCommonCast = function findCommonCast(ids,cb) {
  if( ! _.isArray(ids)) {
    throw new Error('ids must be array')
  }

  var actorDataFiles = _.select(dataFiles,selectActorFiles);
  var results = []
  nextDataFile()
  function nextDataFile() {
    if(actorDataFiles.length === 0) {
      end();
      return
    }
    dataFileCommandCast(actorDataFiles[0])
    actorDataFiles.splice(0,1)
  }
  function dataFileCommandCast(dataFile) {
    var f = byline(fs.createReadStream( dataFile.path, {
      encoding: 'utf-8'
    }))
    f.on('data', function(line) {
      // console.log(line)
    })
    f.on('end', function() {
      nextDataFile()
    })
  }
  function end() {
    console.log('end')
    cb(null, results)
  }
}

module.exports = imdb;