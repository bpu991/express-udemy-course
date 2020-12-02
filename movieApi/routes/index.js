var express = require('express');
var router = express.Router();

const movies = require('../data/movies');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/most_popular', (req, res, next) => {
  let page = req.query.page;
  if (page === undefined) {page = 1}
  if(req.query.api.key != 123456789) {
    res.json("Invalid KEy");
  } else {
      const results = movies.filter((movie) => {
        return movie.most_popular
      })
      results = results.slice(( page-1 ) * 20, ( page-1 ) * 20 + 19)
      res.json({results});
    }
})
module.exports = router;
