var express = require('express');
var router = express.Router();

const movieDetails = require('../data/movieDetails');

router.param(('movieId'), (req, res, next) => {
    //update the db with analytics data
    next()
})
/* GET home page. */
// GET /movie/movieId

function requireJSON(req, res, next) {
    if (!req.is('application/json')) {
        res.json({ msg: "content type must be application/json" });
    } else {
        next()
    }
}
router.get('/top_rated', (req, res, next) => {
    let page = req.query.page;
    if (!page) {page =1;}
    const results = movieDetails.sort((movie1, movie2) => {
        return movie2.vote_average - movie1.vote_average
    });
    let indexToStart = (page - 1) * 20
    res.json(results.slice(indexToStart, indexToStart*20))
})

router.get('/:movieId', (req, res, next) => {
    const movieId = req.params.movieId;
    const results = movieDetails.find((movie) => {
        return movie.id === Number(movieId)
    })

    if(!results) {
        res.json({})
    } else {
        res.json(results)
    }
    res.json(results)
})

router.post('/:movieId/rating', requireJSON, (req,res, next) => {
    const movieId = req.params.movie_id
    const userRating = req.body.value;
    if((userRating < .5) || (userRating > 10)) {
        res.json({msg: "rating must be between 0.5 and 10"});
    } else {
        res.json({
            msg: "thanks for submitting"
        })
    }
})

router.delete('/:movieId/rating', requireJSON, (req, res, next) => {
    res.json({msg: "Rating Deleted"})
})
module.exports = router;
