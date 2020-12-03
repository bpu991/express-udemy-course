var express = require('express');
var router = express.Router();

const movies = require('../data/movies');

function queryRequired(req, res, next) {
    if(!searchTerm) {
        res.json({msg: "Query is required"})
    }
    res.json("Test")
}

//This middleware will be used in all routes in this router
router.use(queryRequired)
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/movie', (req, res, next) => {
    const searchTerm = req.query.query;
    const results = movies.filter((movie) => {
        let found = false;
        found = movie.overview.includes(searchTerm);
        return found
    })
})
module.exports = router;
