var imdb = require('../imdb.js');
imdb('imdb_data/');
imdb.findCommonCast([
  '"Seinfeld"',
  '"Jake and the Fatman"'
], function(err, results) {
  if(err) throw err;
  console.log(results)
})
