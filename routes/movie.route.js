let express = require('express')
let router = express.Router()
let movies = require('../movies.json')

router.get('/', function (req, res, next) {
  console.log("========무비 인덱스===========")
  res.send(movies)
})

router.get('/:id', function (req, res, next) {
  let id = parseInt(req.params.id, 10)
  console.log("========무비 쇼=========== id:"+ id)
  let movie = movies.filter(function (movie) {
    return movie.id === id
  })
  console.dir(movie)
  res.send(movie)
})

module.exports = router